import { ReactNode } from 'react'
import Link from "next/link";
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";


const layout = async ({children}: {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2" >
          <img src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default layout