import type { PriorityQueue } from "../interfaces/PriorityQueue.ts"
import { type UniqueId, uniqueId } from "../util/UniqueId.ts"

export class Heap<T, C> implements PriorityQueue<T, C> {
    private tasks: T[]
    private costs: C[]
    private ids: UniqueId[]
    private indexes: Map<UniqueId, number>
    private comp: (cost1: C, cost2: C) => boolean
    
    constructor(comp = (cost1: C, cost2: C) => cost1 < cost2) {
        this.tasks = []
        this.costs = []
        this.ids = []
        this.indexes = new Map()
        this.comp = comp
    }

    getTop(): T | undefined {
        switch (this.tasks.length) {
            case 0:
                return undefined
            case 1: {
                this.costs.pop()
                this.indexes.clear()
                return this.tasks.pop()
            }
            default: {
                const top = this.tasks[0]
                const topId = this.ids[0]
                this.tasks[0] = this.tasks.pop()!
                this.costs[0] = this.costs.pop()!
                this.ids[0] = this.ids.pop()!
                this.indexes.delete(topId)
                this.down(0)
                return top
            }
        }
    }
    
    peekTop(): T | undefined {
        return this.tasks.at(0)
    }
    
    push(task: T, cost: C): UniqueId {
        const taskId = uniqueId()
        const pos = this.tasks.length // becomes valid after push
        this.tasks.push(task)
        this.costs.push(cost)
        this.ids.push(taskId)
        this.indexes.set(taskId, pos)
        this.up(pos)
        return taskId
    }

    /**
     * Update the priority of a task that's already on the heap.
     * @param taskId the task to update
     * @param updatedCost the updated cost
     * @returns true if the task is on this heap, false otherwise
     */
    update(taskId: UniqueId, updatedCost: C): boolean {
        if (!this.indexes.has(taskId)) {
            return false
        }
        const pos = this.indexes.get(taskId)!
        const currentCost = this.costs[pos]
        this.costs[pos] = updatedCost
        if (this.comp(currentCost, updatedCost)) {
            // Current cost is better, push down.
            this.down(pos)
        } else {
            // Updated cost is better, bubble up.
            this.up(pos)
        }
        return true
    }

    remove(taskId: UniqueId): T | undefined {
        if (!this.indexes.has(taskId)) {
            return undefined
        }
        
        const pos = this.indexes.get(taskId)!
        
        if (pos === 0)
            return this.getTop()
        
        if (pos === this.tasks.length - 1) {
            const removedTask = this.tasks.pop()!
            this.costs.pop()
            const removedId = this.ids.pop()!
            this.indexes.delete(removedId)
            return removedTask
        }
        
        const removedTask = this.tasks[pos]!
        const removedId = this.ids[pos]!
        this.tasks[pos] = this.tasks.pop()!
        this.costs[pos] = this.costs.pop()!
        this.ids[pos] = this.ids.pop()!
        this.indexes.delete(removedId)
        this.indexes.set(this.ids[pos]!, pos)

        const parent = ((pos - 1) / 2) | 0
        if (this.comp(this.costs[pos], this.costs[parent])) {
            this.up(pos)
        } else {
            this.down(pos)
        }

        return removedTask
    }

    size(): number {
        return this.tasks.length
    }

    private swap(pos1: number, pos2: number) {
        const task1 = this.tasks[pos1]
        const task2 = this.tasks[pos2]
        this.tasks[pos1] = task2
        this.tasks[pos2] = task1

        const cost1 = this.costs[pos1]
        const cost2 = this.costs[pos2]
        this.costs[pos1] = cost2
        this.costs[pos2] = cost1

        const id1 = this.ids[pos1]
        const id2 = this.ids[pos2]
        this.ids[pos1] = id2
        this.ids[pos2] = id1

        this.indexes.set(id1, pos2)
        this.indexes.set(id2, pos1)
    }

    private up(position: number) {
        let pos = position
        while (true) {
            if (pos === 0) { return }
            const parent = ((pos - 1) / 2) | 0
            const swap = this.comp(this.costs[pos], this.costs[parent])
            if (swap) {
                this.swap(pos, parent)
                pos = parent
            } else {
                return
            }
        }
    }

    private down(position: number) {
        let pos = position
        const len = this.tasks.length
        while (true) {
            const l = (pos + 1) * 2 - 1
            const r = l + 1
            const lExists = l < len
            const rExists = r < len

            if (lExists && rExists) {
                const l𐰶r = this.comp(this.costs[l], this.costs[r])
                let parent𐰷child: boolean
                if (l𐰶r) {
                    parent𐰷child = !this.comp(this.costs[pos], this.costs[l])
                } else {
                    parent𐰷child = !this.comp(this.costs[pos], this.costs[r])
                }
                if (parent𐰷child) {
                    if (l𐰶r) {
                        this.swap(pos, l)
                        pos = l
                    } else {
                        this.swap(pos, r)
                        pos = r
                    }
                } else {
                    return
                }
            } else if (lExists) {
                const parent𐰷child = !this.comp(this.costs[pos], this.costs[l])
                if (parent𐰷child) {
                    this.swap(pos, l)
                    pos = l
                } else {
                    return
                }
            } else {
                return
            }
        }
    }
}
