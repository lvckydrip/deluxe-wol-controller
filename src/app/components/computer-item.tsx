'use client'

import {computers} from "@prisma/client";
import {byteArrayToHexString} from "@/app/utils/hex-utils";
import {IoCaretForwardOutline, IoPencilOutline} from "react-icons/io5";
import {sendWakeOnLan} from "@/app/utils/sendWakeOnLan";
import Link from "next/link";

export interface ComputerItemProps {
  item: computers;
}

export function ComputerItem(props: ComputerItemProps) {
  const item = props.item;

  return (
    <div className="m-4" key={item.id}>
      <ul className="bg-zinc-800 rounded-2xl p-4">
        <li className="text-2xl font-bold pb-2">{item.name}</li>
        <li className="pb-2">
          <a>{"Mac Address: " + byteArrayToHexString(item.macAddress)}</a>
        </li>
        <div className="flex flex-row justify-around p-2">
          <a onClick={async () => {
            await sendWakeOnLan(byteArrayToHexString(item.macAddress))
          }}
             className="w-28 rounded-full border border-solid border-transparent transition-colors bg-zinc-50 text-background text-center items-center flex hover:bg-zinc-400 h-10 p-2 mr-4">
            <IoCaretForwardOutline className="size-5"/>
            <label>Wake up</label>
          </a>
          <Link href={"edit/" + item.id} className="w-28 rounded-full border border-solid border-transparent transition-colors bg-foreground text-background text-center items-center flex hover:bg-zinc-400 h-10 p-2">
            <IoPencilOutline className="size-5"/>
            <label>Edit</label>
          </Link>
        </div>
      </ul>
    </div>
  )
}