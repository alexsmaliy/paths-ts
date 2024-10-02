import { customRandom, random } from "nanoid"

// Alphabet of length 64.
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789<>~"
const idSize = 8
const generateId = customRandom(alphabet, idSize, random)

export type UniqueId = string & { _brand: "UniqueId" }

export function uniqueId() {
    return generateId() as unknown as UniqueId
}
