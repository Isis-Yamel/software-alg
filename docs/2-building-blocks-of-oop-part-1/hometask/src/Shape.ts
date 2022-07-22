import { Point } from './Point';

export abstract class Shape extends Point {
    protected color: string
    protected filled: boolean
    points: Point[]

    constructor(color = 'green', filled = true, points: Point[]) {
        super();
        this.color = color
        this.filled = filled
        this.points = points
    }

    toString(): string {
        return  `A shape with color of ${this.color} ${this.filled ? 'and filled' : 'not filled'}`
    }

    getPerimeter(): number {
        let totalPerimeter: number = 0;

        if (this.points.length) {
            let perimeter: number[] = [];
            this.points.map(i => perimeter.push(this.distance(i)))
            totalPerimeter = perimeter.reduce((partialSum, a) => partialSum + a, 0);
        }

        return totalPerimeter
    }
}
