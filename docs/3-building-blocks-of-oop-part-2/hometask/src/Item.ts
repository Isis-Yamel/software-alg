import { Comparable } from './Comparable';

let id = 0;
let counter = 0;

export abstract class Item implements Comparable<Item> {
    private numberOfItems: number
    private itemId: number
    private value: number
    private itemName: string
    private weigth: number

    constructor(value: number, itemName: string, weigth: number) {
        this.numberOfItems = counter++
        this.itemId = id++
        this.value = value
        this.itemName = itemName
        this.weigth = weigth
    } 

    use(): void {}

    compareTo(other: Item): number {
        if (this.value > other.value) return 1
        if (this.value < other.value) return -1

        if (this.value === other.value) {
            if (this.itemName.toLowerCase() === other.itemName.toLowerCase()) {
                return 1
            } else return -1
        }

        return -1
    }

    toString(): string {
        return `${this.itemName} - Value: ${this.value}, Weight: ${this.weigth}`
    }

    getId(): number {
        return this.itemId
    }

    getValue(): number {
        return this.value
    }

    getName(): string {
        return this.itemName
    }

    getWeigth(): number {
        return this.weigth
    }

    setValue(value: number): void {
        this.value = value
    }

    setName(itemName: string): void {
        this.itemName = itemName
    }

    setWeigth(weigth: number): void {
        this.weigth = weigth
    }

    reset(): void {
        id = 0
        counter = 0
    }
}
