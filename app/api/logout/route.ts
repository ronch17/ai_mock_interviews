import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // מחיקת session של Firebase
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

  return NextResponse.json({
    message: "Logged out successfully",
    ...(hasNextAuthSession && {
      nextAuthLogout: "/api/auth/signout?callbackUrl=/sign-in",
    }),
  });
}
