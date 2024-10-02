export interface PriorityQueue<T> {
    getTop(): T | undefined
    peekTop(): T | undefined
    push(t: T): void
    size(): number
}
