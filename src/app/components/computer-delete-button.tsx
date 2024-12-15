'use client'

import {deleteComputer} from "@/app/utils/computer-actions";

export interface ComputerDeleteButtonProps {
  computerId: string;
}

export function ComputerDeleteButton(props: ComputerDeleteButtonProps) {
  return (
    <button type="button" onClick={() => deleteComputer(props.computerId)} className="justify-self-start rounded-full bg-red-500 hover:bg-red-400 text-zinc-950 p-2 w-max">Delete</button>
  )
}