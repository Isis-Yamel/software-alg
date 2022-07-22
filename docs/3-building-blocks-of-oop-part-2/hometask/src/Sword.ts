// your code goes here
import { Weapon } from './Weapon'

export class Sword extends Weapon {
    constructor(value: number, weigth: number, baseDamage: number, baseDurability: number) {
        super(value, 'sword', weigth, baseDamage, baseDurability)
    }

    polish(): void {
        this.MODIFIER_CHANGE_RATE = this.MODIFIER_CHANGE_RATE + 0.25
    }
}