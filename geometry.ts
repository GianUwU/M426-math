export interface Shape {
  circumference(): number;
  area(): number;
  encompasses(other: Shape): boolean;
}

export class Point2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  distanceTo(other: Point2D): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  isBetweenX(p: Point2D, q: Point2D): boolean {
    return Point2D.isBetween(this.x, p.x, q.x);
  }

  isBetweenY(p: Point2D, q: Point2D): boolean {
    return Point2D.isBetween(this.y, p.y, q.y);
  }

  private static isBetween(value: number, a: number, b: number): boolean {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return value >= min && value <= max;
  }
}

export class Circle implements Shape {
  constructor(
    private center: Point2D,
    private radius: number,
  ) {}

  circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  encompasses(other: Shape): boolean {
    if (!(other instanceof Rectangle)) {
      return false;
    }

    const corners = [
      other.bottomLeftPoint(),
      other.topLeft(),
      other.topRightPoint(),
      other.bottomRight(),
    ];

    return corners.every((point) => this.containsPoint(point));
  }

  diameter(): number {
    return 2 * this.radius;
  }

  north(): Point2D {
    return new Point2D(this.center.x, this.center.y + this.radius);
  }

  east(): Point2D {
    return new Point2D(this.center.x + this.radius, this.center.y);
  }

  south(): Point2D {
    return new Point2D(this.center.x, this.center.y - this.radius);
  }

  west(): Point2D {
    return new Point2D(this.center.x - this.radius, this.center.y);
  }

  centerPoint(): Point2D {
    return new Point2D(this.center.x, this.center.y);
  }

  private containsPoint(point: Point2D): boolean {
    return this.center.distanceTo(point) <= this.radius;
  }
}

export class Rectangle implements Shape {
  constructor(
    private bottomLeft: Point2D,
    private topRight: Point2D,
  ) {}

  circumference(): number {
    return 2 * (this.width() + this.height());
  }

  area(): number {
    return this.width() * this.height();
  }

  encompasses(other: Shape): boolean {
    if (!(other instanceof Circle)) {
      return false;
    }

    const points = [
      other.centerPoint(),
      other.north(),
      other.east(),
      other.south(),
      other.west(),
    ];

    return points.every((point) => this.containsPoint(point));
  }

  diagonal(): number {
    return this.bottomLeft.distanceTo(this.topRight);
  }

  bottomLeftPoint(): Point2D {
    return new Point2D(this.bottomLeft.x, this.bottomLeft.y);
  }

  topRightPoint(): Point2D {
    return new Point2D(this.topRight.x, this.topRight.y);
  }

  topLeft(): Point2D {
    return new Point2D(this.bottomLeft.x, this.topRight.y);
  }

  bottomRight(): Point2D {
    return new Point2D(this.topRight.x, this.bottomLeft.y);
  }

  private width(): number {
    return this.topRight.x - this.bottomLeft.x;
  }

  private height(): number {
    return this.topRight.y - this.bottomLeft.y;
  }

  private containsPoint(point: Point2D): boolean {
    return point.isBetweenX(this.bottomLeft, this.topRight) &&
      point.isBetweenY(this.bottomLeft, this.topRight);
  }
}
