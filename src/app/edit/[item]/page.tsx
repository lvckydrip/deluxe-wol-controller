import {editComputer, getComputerById} from "@/app/utils/computer-actions";
import {byteArrayToHexString} from "@/app/utils/hex-utils";
import Form from "next/form";
import {ComputerDeleteButton} from "@/app/components/computer-delete-button";

export default async function Page({params}: {params: Promise<{ item: string }>}) {
  const item_id = (await params).item
  const item = await getComputerById(item_id)

  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="flex items-end justify-center flex-col h-max w-max bg-zinc-800 rounded-2xl p-6">
        <Form action={editComputer} className="flex items-end justify-around flex-col">
          <div className="flex justify-around flex-row">
            <div className="flex flex-col justify-around">
              <label className="pr-5 mb-2">ID</label>
              <label className="pr-5 mb-2">Name</label>
              <label className="pr-5 mb-5">MAC Address</label>
            </div>
            <div className="flex flex-col justify-around">
              <input defaultValue={item!.id} name="id" type="text"
                     className="bg-zinc-600 text-zinc-300 rounded p-1.5 mb-2" readOnly={true}/>
              <input defaultValue={item!.name} name="name" type="text" className="bg-zinc-700 rounded p-1.5 mb-2"/>
              <input maxLength={12} minLength={12} pattern={"^[0-9a-fA-F]+$"}
                     defaultValue={byteArrayToHexString(item!.macAddress)} name="macaddress" type="text"
                     className="bg-zinc-700 rounded p-1.5 mb-5"/>
            </div>
          </div>
          <div className="flex w-full flex-row justify-around">
            <ComputerDeleteButton computerId={item_id} />
            <button type="submit" className="justify-self-end rounded-full bg-zinc-100 hover:bg-zinc-400 text-zinc-950 p-2 w-max">Submit</button>
          </div>
        </Form>
      </div>
    </main>
  )
}