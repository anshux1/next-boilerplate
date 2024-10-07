'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export function AvatarDowpdown() {
  const router = useRouter();
  const { data, status } = useSession();
  console.log(data?.user)
  if(status === "unauthenticated"){
    return (
      <Link href='/login'>
        <Button>Sign In</Button>
      </Link>
    )
  }
  console.log(data)
  if(!data?.user) return null;

  const { image, name, username } = data.user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 border cursor-pointer p-[1px] border-dashed border-orange-500">
          <AvatarImage src={image ?? ""} alt="Profile" className="rounded-full dark:backdrop-invert" />
          <AvatarFallback className="p-[1px]">{name?.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div>
          <DropdownMenuLabel className="pb-0">{name}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs text-gray-600 font-medium mt-0">{username}</DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard')}>
            Overview
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/transactions')}>
            Transactions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
           signOut()
           router.replace('/')
        }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
