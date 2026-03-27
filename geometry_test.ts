import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.circumference();

  // Then
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("area of a circle with radius 5 is roughtly 78.54", () => {
  // Given
  const circle = new Circle(new Point2D(3, 4), 5);

  // When
  const actual = circle.area();

  // Then
  assertAlmostEquals(actual, 78.54, 0.01);
});

Deno.test("rectangle encompasses a circle that is fully inside", () => {
  // Given
  const rectangle = new Rectangle(new Point2D(0, 0), new Point2D(10, 10));
  const circle = new Circle(new Point2D(5, 5), 2);

  // When
  const actual = rectangle.encompasses(circle);

  // Then
  assertEquals(actual, true);
});

Deno.test("rectangle does not encompass a circle that exceeds its bounds", () => {
  // Given
  const rectangle = new Rectangle(new Point2D(0, 0), new Point2D(10, 10));
  const circle = new Circle(new Point2D(9, 5), 2);

  // When
  const actual = rectangle.encompasses(circle);

  // Then
  assertEquals(actual, false);
});

Deno.test("circle encompasses a rectangle when all corners are inside", () => {
  // Given
  const circle = new Circle(new Point2D(5, 5), 10);
  const rectangle = new Rectangle(new Point2D(1, 1), new Point2D(9, 9));

  // When
  const actual = circle.encompasses(rectangle);

  // Then
  assertEquals(actual, true);
});

Deno.test("circle does not encompass a rectangle when a corner is outside", () => {
  // Given
  const circle = new Circle(new Point2D(5, 5), 5);
  const rectangle = new Rectangle(new Point2D(1, 1), new Point2D(15, 15));

  // When
  const actual = circle.encompasses(rectangle);

  // Then
  assertEquals(actual, false);
});
