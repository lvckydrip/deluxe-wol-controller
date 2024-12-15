import Link from "next/link";
import {ReactNode} from "react";

interface NavbarItem {
  name: string,
  href: string,
}

const NavbarItems: NavbarItem[] = [
  {
    name: "Home",
    href: "/",
  }
]

export interface NavbarProps {
  children: ReactNode
}

export function Navbar(props: NavbarProps) {
  return (
    <div className="h-full w-full">
      <div className="h-max flex text-foreground items-center justify-center border-b border-solid border-zinc-700  p-1">
        <div className="h-max w-[90%] flex justify-start items-center">
          <label className="font-light text-2xl pr-6">Deluxe WakeOnLan Controller</label>
          {NavbarItems.map((item) => (
            <Link className="pr-3 pl-3 pt-1 pb-1 m-1 rounded-full hover:text-zinc-500 text-zinc-400" href={item.href} key={item.href}>{item.name}</Link>))}
        </div>
      </div>
      <div className="h-full bg-zinc-900">{props.children}</div>
    </div>
  )
}