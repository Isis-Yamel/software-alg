// your code goes here
import { Item } from './Item';

// here I have to split damage and durability modifiers
export abstract class Weapon extends Item {
    baseDamage: number
    baseDurability: number
    damage: number
    durability: number
    MODIFIER_CHANGE_RATE: number

    constructor(value: number, itemName: string, weigth: number, baseDamage: number, baseDurability: number) {
        super(value, itemName, weigth)
        this.baseDamage = baseDamage
        this.baseDurability = baseDurability
        this.MODIFIER_CHANGE_RATE = 0.05
        this.damage = this.MODIFIER_CHANGE_RATE + this.baseDamage
        this.durability = this.MODIFIER_CHANGE_RATE + this.baseDurability
    }

    polish(): void {}

    getBaseDamage(): number {
        return this.baseDamage
    }

    getDamage(): number {
        return this.damage
    }

    getBaseDurability(): number {
        return this.baseDurability
    }

    getDurability(): number {
        return this.durability
    }

    toString(): string {
        return `${this.getName()} - Value: ${this.getValue}, Weight: ${this.getWeigth}, Damage: ${this.damage}, Durability: ${this.durability}`
    }

    setBaseDamage(damage: number): void {
        this.baseDamage = damage
    }

    setBaseDurability(durability: number): void {
        this.baseDurability = durability
    }

    use(): string {
        if (this.durability <= 0) {
            return "You can't use the hammer, it is broken."
        }
        
        this.durability = this.durability - this.MODIFIER_CHANGE_RATE

        return `You use the ${this.getName()}, dealing ${this.getDamage()} of damage ${this.durability >= 0 ? 'The hammer breaks' : '.'}`
    }
}