import { assertEquals } from "jsr:@std/assert/equals";
import { Heap } from "./Heap.ts";

Deno.test(function heapTest1() {
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

Deno.test(function heapTest2() {
    const length = 30
    const unsorted = Array.from({length}, _ => Math.random())
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
