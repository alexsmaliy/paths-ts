import type { PriorityQueue } from "../interfaces/PriorityQueue.ts";

export class Heap<T> implements PriorityQueue<T> {
    private items: T[]
    private comp: (t1: T, t2: T) => boolean
    
    constructor(comp = (t1: T, t2: T) => t1 < t2) {
        this.items = []
        this.comp = comp
    }

    getTop(): T | undefined {
        switch (this.items.length) {
            case 0:
                return undefined
            case 1:
                return this.items.pop()
            default: {
                const top = this.items[0]
                this.items[0] = this.items.pop() as unknown as T // Deno is evil.
                this.down(0)
                return top
            }
        }
    }
    
    peekTop(): T | undefined {
        return this.items.at(0)
    }
    
    push(t: T): void {
        this.items.push(t)
        this.up(this.items.length - 1)
    }

    size(): number {
        return this.items.length
    }

    private swap(pos1: number, pos2: number) {
        const tmp = this.items[pos1]
        this.items[pos1] = this.items[pos2]
        this.items[pos2] = tmp
    }

    private up(position: number) {
        let pos = position
        while (true) {
            if (pos === 0) { return }
            const parent = ((pos - 1) / 2) | 0
            const swap = this.comp(this.items[pos], this.items[parent])
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
        const len = this.items.length
        while (true) {
            const l = (pos + 1) * 2 - 1
            const r = l + 1
            const lExists = l < len
            const rExists = r < len

            if (lExists && rExists) {
                const l𐰶r = this.comp(this.items[l], this.items[r])
                let parent𐰷child: boolean
                if (l𐰶r) {
                    parent𐰷child = !this.comp(this.items[pos], this.items[l])
                } else {
                    parent𐰷child = !this.comp(this.items[pos], this.items[r])
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
                const parent𐰷child = !this.comp(this.items[pos], this.items[l])
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
