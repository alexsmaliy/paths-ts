import { assertEquals } from "jsr:@std/assert/equals"
import { Heap } from "./Heap.ts"

Deno.test(function heapBasic() {
    const h1 = new Heap()
    assertEquals(h1.peekTop(), undefined)

    const h2 = new Heap()
    assertEquals(h2.getTop(), undefined)

    const h3 = new Heap()
    h3.push(1, 1)
    assertEquals(h3.peekTop(), 1)
    assertEquals(h3.getTop(), 1)
    assertEquals(h3.peekTop(), undefined)
})

Deno.test(function heapSortAscDesc() {
    const length = 30
    const upperBound = 20
    const unsorted = Array.from({length}, _ => (Math.random() * upperBound) | 0)
    const sorted = Array.from(unsorted).sort((a, b) => a - b)
    const reversed = Array.from(unsorted).sort((a, b) => b - a)
    
    const h1 = new Heap<number, number>((a, b) => a < b)
    
    for (const i of unsorted) {
        h1.push(i, i)
    }
    
    for (let i = 0; i <= length + 20; i++) {
        assertEquals(h1.getTop(), sorted.at(i))
    }

    const h2 = new Heap<number, number>((a, b) => b < a)

    for (const i of unsorted) {
        h2.push(i, i)
    }

    for (let i = 0; i <= length + 20; i++) {
        assertEquals(h2.getTop(), reversed.at(i))
    }
})

Deno.test(function heapUpdate() {
    const length = 30
    const upperBound = 30
    const unsorted = Array.from({length}, _ => (Math.random() * upperBound) | 0)

    const h1 = new Heap<number, number>((a, b) => a < b)
    const ids = []
    
    // Push unsorted items. This sorts them in order of magnitude.
    for (const i of unsorted) {
        ids.push(h1.push(i, i))
    }

    // Update each item's cost to be the same as its insertion order.
    // This sorts them in order of insertion.
    for (let i = 0; i < ids.length; i++) {
        h1.update(ids[i], i)
    }

    // Ensure items come out in insertion order, not magnitude order.
    for (let i = 0; i < ids.length; i++) {
        assertEquals(h1.getTop(), unsorted[i])
    }
})

Deno.test(function heapRemove() {
    const length = 20
    const upperBound = 10
    const unsorted = Array.from({length}, _ => (Math.random() * upperBound) | 0)

    const h1 = new Heap<number, number>((a, b) => a < b)
    const ids = []

    for (const i of unsorted) {
        ids.push(h1.push(i, i))
    }

    assertEquals(h1.remove(ids[0]), unsorted[0])
    assertEquals(h1.remove(ids[1]), unsorted[1])
    assertEquals(h1.remove(ids[2]), unsorted[2])

    assertEquals(h1.remove(ids[0]), undefined)
    assertEquals(h1.remove(ids[1]), undefined)
    assertEquals(h1.remove(ids[2]), undefined)

    assertEquals(h1.size(), length - 3)

    const remaining = unsorted.slice(3)
    const remainingSorted = remaining.sort((a, b) => a - b)

    for (let i = 0; i < length; i++) {
        assertEquals(h1.getTop(), remainingSorted[i])
    }
})
