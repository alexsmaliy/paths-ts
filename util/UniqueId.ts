import { customRandom, random } from "nanoid"

const generateId = customRandom("abcdefghijklmnopqrstuvwxyz", 4, random)

export type UniqueId = string & { _brand: "UniqueId" }

export function uniqueId() {
    return generateId() as unknown as UniqueId
}
