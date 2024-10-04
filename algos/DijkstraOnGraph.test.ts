import { assertEquals } from "jsr:@std/assert/equals"
import { SimpleGraph } from "../main.ts"
import { dijkstraOnGraph } from "./DijkstraOnGraph.ts"

Deno.test(function dijkstraOnGraphTest1() {
    const g = new SimpleGraph()
    g.addWeightedEdge("A", "B", 5)
    g.addWeightedEdge("A", "C", 5)
    g.addWeightedEdge("B", "C", 6)
    g.addWeightedEdge("B", "D", 5)
    g.addWeightedEdge("C", "D", 7)

    assertEquals(dijkstraOnGraph(g, "A", "A"), [0, ["A"]])
    assertEquals(dijkstraOnGraph(g, "A", "D"), [10, ["A", "B", "D"]])
    assertEquals(dijkstraOnGraph(g, "D", "A"), [10, ["D", "B", "A"]])
})

Deno.test(function dijkstraOnGraphTest2() {
    const g = new SimpleGraph()
    g.addWeightedEdge("START", "b", 1)
    g.addWeightedEdge("b", "c", 1)
    g.addWeightedEdge("c", "d", 1)
    g.addWeightedEdge("d", "e", 1)
    g.addWeightedEdge("e", "f", 1)
    g.addWeightedEdge("f", "g", 1)
    g.addWeightedEdge("g", "GOAL", 1)
    g.addWeightedEdge("START", "i", 2)
    g.addWeightedEdge("b", "j", 2)
    g.addWeightedEdge("d", "k", 2)
    g.addWeightedEdge("f", "l", 2)
    g.addWeightedEdge("l", "GOAL", 2)
    g.addWeightedEdge("i", "j", 2)
    g.addWeightedEdge("j", "k", 2)
    g.addWeightedEdge("k", "l", 2)

    assertEquals(
        dijkstraOnGraph(g, "START", "GOAL"),
        [7, ["START", "b", "c", "d", "e", "f", "g", "GOAL"]],
    )
})

Deno.test(function dijkstraOnGraphTest3() {
    const g = new SimpleGraph()
    g.addWeightedEdge("a", "b", 1)
    g.addWeightedEdge("c", "d", 1)

    assertEquals(dijkstraOnGraph(g, "a", "c"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "a", "d"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "b", "c"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "b", "d"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "c", "a"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "c", "b"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "d", "a"), [Infinity, []])
    assertEquals(dijkstraOnGraph(g, "d", "b"), [Infinity, []])

    assertEquals(dijkstraOnGraph(g, "a", "b"), [1, ["a", "b"]])
    assertEquals(dijkstraOnGraph(g, "c", "d"), [1, ["c", "d"]])
})
