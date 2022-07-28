interface NewPoint {
    x: number
    y: number 
}

export class Point {
    x: number
    y: number

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

    distance(): number 
    distance(other: NewPoint): number
    distance(point: NewPoint): number

    distance(newPoint?:NewPoint ) {
        let result: number;
        if (newPoint) {
            result = Math.sqrt(Math.pow((newPoint.y - this.y), 2) + Math.pow((newPoint.x - this.x), 2))
        } else {
            result = 0
        }
        
        return result;
    }
}
