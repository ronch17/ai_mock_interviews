"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logUserOut } from "@/lib/actions/auth.action";

export function LogoutButton() {
  const router = useRouter();

  const logoutUser = async () => {
    const res = await logUserOut();

    if (res.nextAuthLogout) {
      signOut({ callbackUrl: "/sign-in" }); // ניתוק דרך NextAuth
    } else {
      router.push("/sign-in"); // ניתוק רגיל
    }
  };

  return (
    <Button variant="outline" className="btn-secondary" onClick={logoutUser}>
      Log out
    </Button>
  );
}
