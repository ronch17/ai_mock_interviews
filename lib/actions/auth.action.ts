"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists, please sign in instead",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully, please sign in",
    };
  } catch (error) {
    console.log("Error creating a user", error);

    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already in use",
      };
    }
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist",
      };
    }

    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.log("Error fetching user", error);
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  // 🔹 1. ננסה דרך Firebase
  if (sessionCookie) {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

      const userRecord = await db
        .collection("users")
        .doc(decodedClaims.uid)
        .get();

      if (!userRecord.exists) return null;

      return {
        ...(userRecord.data() as User),
        id: userRecord.id,
      };
    } catch (error) {
      console.log("Error verifying Firebase session", error);
    }
  }

  // 🔹 2. ננסה דרך NextAuth (Google)
  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    try {
      // ננסה למצוא את המשתמש ב־Firestore לפי אימייל
      const userQuery = await db
        .collection("users")
        .where("email", "==", session.user.email)
        .limit(1)
        .get();

      if (userQuery.empty) return null;

      const userDoc = userQuery.docs[0];

      return {
        ...(userDoc.data() as User),
        id: userDoc.id,
      };
    } catch (error) {
      console.log("Error fetching user from NextAuth session", error);
    }
  }

  return null;
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

export async function logUserOut() {
  const cookieStore = await cookies();

  cookieStore.set("session", "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });

  const hasNextAuthSession =
    cookieStore.get("next-auth.session-token") ||
    cookieStore.get("__Secure-next-auth.session-token");

  return {
    nextAuthLogout: !!hasNextAuthSession,
  };
}
