import { assertEquals } from "jsr:@std/assert/equals"
import { SimpleGraph } from "../main.ts"
import { dijkstraOnGraph } from "./DijkstraOnGraph.ts"

Deno.test(function dijkstraOnGraphtest1() {
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
