'use client'
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Box } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AvatarDowpdown } from "./AvatarDropdown";
export default function Navbar(){
  const pathname = usePathname();
  const { data } = useSession();
  return (
    <div className={`max-w-7xl mx-auto h-16 ${pathname !== "/" && "border-x" } flex justify-between items-center px-3`}>
      <div className="flex items-center gap-5">
        <Link
          href='/'
          className="flex items-center gap-2">
          <Box className="size-10" />
          <h1 className="font-bold text-3xl">Website name</h1>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <DarkModeSwitch />
        <AvatarDowpdown />
      </div>
    </div>
  )
}
