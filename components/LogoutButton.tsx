"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  const router = useRouter();

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.nextAuthLogout) {
        // התחברות דרך גוגל => נעשה signOut דרך NextAuth
        signOut({ callbackUrl: "/sign-in" });
      } else {
        // התחברות רגילה => רק לנווט חזרה
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button variant="outline" className="btn-secondary" onClick={logoutUser}>
      Log out
    </Button>
  );
}
