"use client";

import { logUserOut } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logoutUser = async () => {
    await logUserOut();

    router.push("sign-in");
  };

  return (
    <Button variant="outline" className="btn-secondary" onClick={logoutUser}>
      Log out
    </Button>
  );
}
