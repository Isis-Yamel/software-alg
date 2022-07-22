// your code goes here
import { Item } from './Item'

export abstract class Consumable extends Item {
    consumed: boolean
    spoiled: boolean

    constructor(value: number, itemName: string, weigth: number, spoiled: boolean) {
        super(value, itemName, weigth)
        this.consumed = false
        this.spoiled = spoiled
    }

    eat(): string {
        let hasBeenEaten;
        if (this.consumed) {
            hasBeenEaten = this.spoiled ? `You eat the ${this.getName()}. 
            You feel sick.`
            :
            `You eat the ${this.getName()}`
        }
        return hasBeenEaten
    }

    use(): string  {
        if (!this.spoiled && !this.consumed) {
            return this.eat()
        }
        return `There is nothing left of the ${this.getName()} to consume.`
    }

    isConsumed(): boolean {
        return this.consumed
    }

    setConsumed(consumed: boolean): void {
        this.consumed = consumed
    }

    isSpoiled(): boolean {
        return this.spoiled
    }
}