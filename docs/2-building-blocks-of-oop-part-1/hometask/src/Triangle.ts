import { Shape } from './Shape';
import { Point } from './Point';

export class Triangle extends Shape {
  constructor(p1: Point, p2: Point, p3: Point, color: string, filled: boolean) {
    super(color, filled, [p1, p2, p3])
  }

  toString(): string {
    return `Triangle[v1=(x1, y1),v2=(x2, y2),v3=(x3, y3)]`
    // The idea here will be use the points instance ? Or stringify with template literal
    // return `Triangle[v1=(${this.p1.x}, ${this.p1.y}),v2=(${this.p2.x}, ${this.p2.y}),v3=(${this.p3.x}, ${this.p3.y})]`
  }

  getType(): string {
    let pointsValues: number[] = [];
    this.points.map(i => pointsValues.push(this.distance(i)))
    let type = pointsValues.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});

    // improve ? switch case ? validate that more than three points is no triangle
    if (Object.values(type).length === 1) {
      return 'equilateral triangle'
    } else if (Object.values(type).length === 2) {
      return 'isosceles triangle'
    } else if (Object.values(type).length === 3)  {
      return 'scalene triangle'
    } else { return 'this is not a triangle'}
  }
}
