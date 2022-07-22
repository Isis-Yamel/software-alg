// your code goes here
import { Weapon } from './Weapon'

export class Bow extends Weapon {
    constructor(value: number,  weigth: number, baseDamage: number, baseDurability: number) {
        super(value, 'bow', weigth, baseDamage, baseDurability)
    }

    polish(): void {
        this.MODIFIER_CHANGE_RATE = this.MODIFIER_CHANGE_RATE + 1
    }
}