"use server"

import { createClothes, deleteClothes, updateClothes } from "@/utils/clothesUtil"
import { revalidateTag } from "next/cache"

export async function createAction(cloth: any) {
    await createClothes(cloth)
    revalidateTag('/')
}
export async function updateAction(cloth: any) {
    await updateClothes(cloth)
    revalidateTag('/')

}
export async function deleteAction(id: string) {
    await deleteClothes(id)
    revalidateTag('/')
}