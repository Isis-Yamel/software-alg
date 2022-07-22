import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class Inventory {
    items: Array<Item>

    constructor() {
        this.items = []
    }

    addItem(item: Item): void {
        this.items.push(item)
    }

    sort(comparator?: ItemComparator): void | number {
        this.items.sort(comparator ? comparator.compare : (a, b) => a.getValue() - b.getValue())
    }

    toString(): string {
        return this.items.join(', ')
    }
}