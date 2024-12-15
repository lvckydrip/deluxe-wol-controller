import {createComputer} from "@/app/utils/computer-actions";
import Form from "next/form";

export default async function Page() {
  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="flex items-end justify-center flex-col h-max w-max bg-zinc-800 rounded-2xl p-6">
        <Form action={createComputer} className="flex items-end justify-around flex-col">
          <div className="flex justify-around flex-row">
            <div className="flex flex-col justify-around">
              <label className="pr-5 mb-2">Name</label>
              <label className="pr-5 mb-5">MAC Address</label>
            </div>
            <div className="flex flex-col justify-around">
              <input name="name" type="text" className="bg-zinc-700 rounded p-1.5 mb-2"/>
              <input maxLength={12} minLength={12} pattern={"^[0-9a-fA-F]+$"} name="macaddress" type="text" className="bg-zinc-700 rounded p-1.5 mb-5"/>
            </div>
          </div>
          <button type="submit" className="rounded-full bg-zinc-100 hover:bg-zinc-400 text-zinc-950 p-2 w-max">Submit</button>
        </Form>
      </div>
    </main>
  )
}