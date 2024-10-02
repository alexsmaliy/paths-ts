export interface Graph<L> {
    addEdge(src: L, dst: L): void
    addWeightedEdge(src: L, dst: L, weight: number): void
    addNode(label: L): void
    nodeCount(): number
    edgeCount(): number
    getNodes(): IterableIterator<readonly [L, number]>
    getEdges(): IterableIterator<readonly [L, L, number]>
    getNodeId(label: L): number | undefined
    getNodeLabel(id: number): L | undefined
    neighborsOf(id: number): IterableIterator<number>
    edgesOf(id: number): IterableIterator<readonly [number, number]>
}
