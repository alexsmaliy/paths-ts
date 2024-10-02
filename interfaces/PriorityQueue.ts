export interface PriorityQueue<T, C> {
    getTop(): T | undefined
    peekTop(): T | undefined
    push(task: T, cost: C): void
    size(): number
}
