import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/firebase/admin";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userDoc = db.collection("users").doc(user.id);
      const userSnapshot = await userDoc.get();

      if (!userSnapshot.exists) {
        await userDoc.set({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },
    async session({ session, token }) {
      // נוכל להוסיף session.id או כל מידע אחר
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
