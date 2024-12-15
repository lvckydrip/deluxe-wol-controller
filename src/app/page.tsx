import {computerActions} from "@/app/utils/computer-actions";
import {ComputerItem} from "@/app/components/computer-item";
import Link from "next/link";

export default async function Home() {
  const data = await computerActions();

  return (
      <main className="grid grid-cols-4">
        <div className="bg-zinc-800 rounded-2xl flex items-center justify-center m-4">
          <Link href="/create" className="w-max text-nowrap text-center rounded-full transition-colors bg-zinc-50 text-zinc-950 hover:bg-zinc-400 h-10 p-2 m-4">
            Create new Computer
          </Link>
        </div>
        {data?.map((item) => <ComputerItem key={item.id} item={item} />)}
      </main>)
}
