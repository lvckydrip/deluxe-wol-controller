'use server'

export async function sendWakeOnLan(macAddress: string) {
  await fetch('http://localhost:187', {
    method: "POST",
    body: "wol:" + macAddress
  });
}