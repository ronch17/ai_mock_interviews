import React, { ReactNode } from 'react'
import {isAuthenticated} from "@/lib/auth.action";
import {redirect} from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  console.log(isUserAuthenticated);

  if (isUserAuthenticated) redirect('/');

  return (
    <div className="auth-layout">
      {children}
    </div>
  )
}

export default layout