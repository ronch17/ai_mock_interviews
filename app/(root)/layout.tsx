import { ReactNode } from "react";
import Link from "next/link";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { LogoutButton } from "@/components/LogoutButton";

const layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  const getUser = await getCurrentUser();
  const user = JSON.parse(JSON.stringify(getUser));

  return (
    <div className="root-layout">
      <nav className="flex flex-row justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        <div className="flex flex-row gap-2 items-center">
          <h3 className="capitalize">Welcome, {user.name} 👾 </h3>
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default layout;
