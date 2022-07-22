// your code goes here
import { Consumable } from './Consumable'

export class Pizza extends Consumable {
    numberOfSlices: number
    slicesEaten: number

    constructor(numberOfSlices: number, spoiled: boolean) {
        super(numberOfSlices, 'pizza', numberOfSlices, spoiled)
        this.numberOfSlices = numberOfSlices
        this.slicesEaten = 0
    }
    
    eat(): string {
        if (this.slicesEaten < this.numberOfSlices) {
            this.slicesEaten++;

            if (this.slicesEaten >= this.numberOfSlices) {
                this.setConsumed(true);
            }

            return this.use();
        } else {
            return '';
        }
    }
}