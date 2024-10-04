import type { UniqueId } from "../util/UniqueId.ts"

export interface PriorityQueue<T, C> {
    getTop(): T | undefined
    peekTop(): T | undefined
    push(task: T, cost: C): UniqueId
    update(taskId: UniqueId, updatedCost: C): boolean
    remove(taskId: UniqueId): T | undefined
    size(): number
}
