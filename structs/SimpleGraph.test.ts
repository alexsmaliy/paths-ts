import { assertEquals } from "jsr:@std/assert/equals"
import { SimpleGraph } from "./SimpleGraph.ts"

Deno.test(function simpleGraphTest1() {
    const g = new SimpleGraph()
    assertEquals(g.nodeCount(), 0)
    assertEquals(g.edgeCount(), 0)

    g.addWeightedEdge("node1", "node2", 5)
    g.addWeightedEdge("node2", "node1", 6)
    assertEquals(g.nodeCount(), 2)
    assertEquals(g.edgeCount(), 1)

    g.addNode("node3")

    const id1 = g.getNodeId("node1") as unknown as number
    const id2 = g.getNodeId("node2") as unknown as number
    const id3 = g.getNodeId("node3") as unknown as number

    assertEquals([...g.neighborsOf(id1)], [id2])
    assertEquals([...g.neighborsOf(id2)], [id1])
    assertEquals([...g.edgesOf(id1)], [[id2, 6]])
    assertEquals([...g.edgesOf(id2)], [[id1, 6]])
    assertEquals([...g.neighborsOf(id3)], [])
    assertEquals([...g.edgesOf(id3)], [])
})
