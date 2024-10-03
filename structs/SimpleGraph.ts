import type { Graph } from "../interfaces/Graph.ts"

function* emptyGenerator() {}

export class SimpleGraph<L> implements Graph<L> {
    private id𐙤label: Map<number, L>
    private label𐙤id: Map<L, number>
    private edges: Map<number, Map<number, number>>

    constructor() {
        this.id𐙤label = new Map()
        this.label𐙤id = new Map()
        this.edges = new Map()
    }

    addEdge(src: L, dst: L): void {
        this.addWeightedEdge(src, dst, 0)
    }

    addWeightedEdge(src: L, dst: L, weight: number): void {
        if (src === dst) return // no self-edges

        const srcExists = this.label𐙤id.has(src)
        const dstExists = this.label𐙤id.has(dst)
        
        let srcId: number
        let dstId: number

        if (srcExists) {
            srcId = this.label𐙤id.get(src)!
        } else {
            srcId = this.label𐙤id.size
            this.label𐙤id.set(src, srcId)
            this.id𐙤label.set(srcId, src)
        }

        if (dstExists) {
            dstId = this.label𐙤id.get(dst)!
        } else {
            dstId = this.label𐙤id.size
            this.label𐙤id.set(dst, dstId)
            this.id𐙤label.set(dstId, dst)
        }

        this.edges.has(srcId)
            ? this.edges.get(srcId)?.set(dstId, weight)
            : this.edges.set(srcId, new Map()).get(srcId)?.set(dstId, weight)

        this.edges.has(dstId)
            ? this.edges.get(dstId)?.set(srcId, weight)
            : this.edges.set(dstId, new Map()).get(dstId)?.set(srcId, weight)
    }

    addNode(label: L): number {
        const nodeExists = this.label𐙤id.has(label)
        let nodeId: number
        if (nodeExists) {
            nodeId = this.label𐙤id.get(label)!
        } else {
            nodeId = this.label𐙤id.size
            this.label𐙤id.set(label, nodeId)
            this.id𐙤label.set(nodeId, label)
        }
        return nodeId
    }

    nodeCount(): number {
        return this.label𐙤id.size
    }

    edgeCount(): number {
        let sum = 0
        for (const m of this.edges.values()) {
            sum += m.size
        }
        return (sum / 2) | 0 // A <-> B counts as one edge.
    }

    containsNode(label: L): boolean {
        return this.label𐙤id.has(label)
    }

    getNodes(): IterableIterator<readonly [L, number]> {
        return this.label𐙤id.entries()
    }

    getEdges(): IterableIterator<readonly [L, L, number]> {
        return this.genEdges()
    }

    private *genEdges() {
        for (const [src, es] of this.edges.entries()) {
            const srcLabel = this.id𐙤label.get(src)!
            for (const [dst, w] of es.entries()) {
                const dstLabel = this.id𐙤label.get(dst)!
                yield [srcLabel, dstLabel, w] as const
            }
        }
    }

    getNodeId(label: L): number | undefined {
        return this.label𐙤id.get(label)
    }

    getNodeLabel(id: number): L | undefined {
        return this.id𐙤label.get(id)
    }

    neighborsOf(id: number): IterableIterator<number> {
        return this.edges.get(id)?.keys() ?? emptyGenerator()
    }

    edgesOf(id: number): IterableIterator<readonly [number, number]> {
        return this.edges.get(id)?.entries() ?? emptyGenerator()
    }
}