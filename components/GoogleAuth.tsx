import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleAuth() {
  return (
    <Button
      onClick={() => signIn("google")}
      className="bg-white border px-4 py-2 rounded shadow"
    >
      <Image src="/google.svg" alt="google" height={30} width={30} />
      Sign in with Google
    </Button>
  );
}
