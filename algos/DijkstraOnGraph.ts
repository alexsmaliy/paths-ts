import type { Graph } from "../interfaces/Graph.ts"
import type { PriorityQueue } from "../interfaces/PriorityQueue.ts"
import { Heap } from "../structs/Heap.ts"
import { UniqueId } from "../util/UniqueId.ts"

const sentinelNoPredecessor = -1

export function dijkstraOnGraph<L>(g: Graph<L>, src: L, dst: L) {
    if (!g.containsNode(src)) throw new Error(`Node ${src} not in graph.`)
    if (!g.containsNode(dst)) throw new Error(`Node ${dst} not in graph.`)
    
    const openNodesHeap: PriorityQueue<number, number> = new Heap()
    const closedNodes: Map<number, number> = new Map()
    const costs: Map<number, number> = new Map()
    const predecessors: Map<number, number> = new Map()
    const node𐙤heapId: Map<number, UniqueId> = new Map()
    
    let currNode = g.getNodeId(src)!
    const destNode = g.getNodeId(dst)!

    costs.set(currNode, 0)
    predecessors.set(currNode, sentinelNoPredecessor)
    let addedId = openNodesHeap.push(currNode, 0)
    node𐙤heapId.set(currNode, addedId)

    while (currNode !== destNode && openNodesHeap.size() > 0) {
        currNode = openNodesHeap.getTop()!
        const currNodeCost = costs.get(currNode)!
        const currNodeParent = predecessors.get(currNode)!
        closedNodes.set(currNode, currNodeParent)
        
        for (const [neighborId, marginalCost] of g.edgesOf(currNode)) {
            if (!closedNodes.has(neighborId)) {
                const maybeImprovedCost = currNodeCost + marginalCost
                if (costs.has(neighborId)) {
                    if (costs.get(neighborId)! > maybeImprovedCost) {
                        costs.set(neighborId, maybeImprovedCost)
                        const neighborHeapId = node𐙤heapId.get(neighborId)!
                        openNodesHeap.update(neighborHeapId, maybeImprovedCost)
                        predecessors.set(neighborId, currNode)
                    }
                } else {
                    costs.set(neighborId, maybeImprovedCost)
                    addedId = openNodesHeap.push(neighborId, maybeImprovedCost)
                    node𐙤heapId.set(neighborId, addedId)
                    predecessors.set(neighborId, currNode)
                }
            }
        }
    }

    if (currNode === destNode) {
        // Reached destination, returning cost and path.
        const finalCost = costs.get(destNode)
        const path: L[] = []
        let node = destNode
        while (node !== sentinelNoPredecessor) {
            path.push(g.getNodeLabel(node)!)
            node = predecessors.get(node)!
        }
        return [finalCost, path.reverse()]
    } else {
        // Failed to reach destination.
        return [Infinity, []]
    }
}
