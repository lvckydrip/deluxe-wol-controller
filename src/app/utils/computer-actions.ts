'use server'

import prismaClient from "@/app/utils/prismaClient";
import {redirect} from "next/navigation";
import {hexStringToByteArray} from "@/app/utils/hex-utils";

export const computerActions = async () => {
  try {
    return await prismaClient.computers.findMany();
  }
  catch (error) {
    console.log(error);
  }
}

export const getComputerById = async (item_id: string) => {
  try {
    return await prismaClient.computers.findUnique({
      where: {
        id: item_id,
      }
    });
  }
  catch (error) {
    console.log(error);
  }
}

export async function editComputer(formData: FormData) {
  const rawFormData = {
    id: formData.get('id'),
    name: formData.get('name'),
    macAddress: formData.get('macaddress'),
  }
  if (rawFormData.id && rawFormData.name && rawFormData.macAddress ) {
    await prismaClient.computers.update({
      where: {
        id: rawFormData.id.toString(),
      },
      data: {
        name: rawFormData.name.toString(),
        macAddress: hexStringToByteArray(rawFormData.macAddress.toString()),
      }
    })
  }

  redirect("/")
}

export async function deleteComputer(id: string) {
  if (id) {
    await prismaClient.computers.delete({
      where: {
        id: id,
      }
    })
  }

  redirect("/")
}

export async function createComputer(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    macAddress: formData.get('macaddress'),
  }
  if (rawFormData.name && rawFormData.macAddress) {
    await prismaClient.computers.create({
      data: {
        name: rawFormData.name.toString(),
        macAddress: hexStringToByteArray(rawFormData.macAddress.toString()),
      }
    })
  }

  redirect("/")
}