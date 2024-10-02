import type { PriorityQueue } from "../interfaces/PriorityQueue.ts";

export class Heap<T, C> implements PriorityQueue<T, C> {
    private tasks: T[]
    private costs: C[]
    private comp: (t1: T, t2: T) => boolean
    
    constructor(comp = (t1: T, t2: T) => t1 < t2) {
        this.tasks = []
        this.costs = []
        this.comp = comp
    }

    getTop(): T | undefined {
        switch (this.tasks.length) {
            case 0:
                return undefined
            case 1:
                return this.tasks.pop()
            default: {
                const top = this.tasks[0]
                this.tasks[0] = this.tasks.pop() as unknown as T // Deno is evil.
                this.down(0)
                return top
            }
        }
    }
    
    peekTop(): T | undefined {
        return this.tasks.at(0)
    }
    
    push(task: T, cost: C): void {
        this.tasks.push(task)
        this.up(this.tasks.length - 1)
    }

    size(): number {
        return this.tasks.length
    }

    private swap(pos1: number, pos2: number) {
        const tmp = this.tasks[pos1]
        this.tasks[pos1] = this.tasks[pos2]
        this.tasks[pos2] = tmp
    }

    private up(position: number) {
        let pos = position
        while (true) {
            if (pos === 0) { return }
            const parent = ((pos - 1) / 2) | 0
            const swap = this.comp(this.tasks[pos], this.tasks[parent])
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
                const l𐰶r = this.comp(this.tasks[l], this.tasks[r])
                let parent𐰷child: boolean
                if (l𐰶r) {
                    parent𐰷child = !this.comp(this.tasks[pos], this.tasks[l])
                } else {
                    parent𐰷child = !this.comp(this.tasks[pos], this.tasks[r])
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
                const parent𐰷child = !this.comp(this.tasks[pos], this.tasks[l])
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
