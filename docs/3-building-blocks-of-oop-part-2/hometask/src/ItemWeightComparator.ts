import { Item } from './Item';
import { ItemComparator } from './ItemComparator';

export class ItemWeightComparator implements ItemComparator {
    compare(first: Item, second: Item): number {
        if (first.getWeigth() > second.getWeigth()) {
            return 1;
        }
        if (first.getWeigth() < second.getWeigth()) {
            return -1;
        }

        return first.compareTo(second)
    }
}
