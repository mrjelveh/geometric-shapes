

/**
 * Represents a point in 2D space.
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Draws a point on the canvas.
 * @param ctx - The canvas rendering context.
 * @param x - The x-coordinate of the point.
 * @param y - The y-coordinate of the point.
 */
export function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 5.5, 0, 2 * Math.PI);
  ctx.fillStyle = "#e74c3c";
  ctx.fill();
  drawPointCoordinates(ctx, x, y);
  ctx.restore();
}

/**
 * Draws a parallelogram on the canvas using the selected points.
 * @param ctx - The canvas rendering context.
 * @param selectedPoints - An array of three points representing the vertices of the parallelogram.
 */
export function drawParallelogram(
  ctx: CanvasRenderingContext2D,
  selectedPoints: Point[]
): void {
  ctx.save();
  const [p1, p2, p3] = selectedPoints;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.closePath();
  ctx.strokeStyle = "#3498db";
  ctx.stroke();
  ctx.restore();
}

/**
 * Draws the coordinates of a point next to the point on the canvas.
 * @param ctx - The canvas rendering context.
 * @param x - The x-coordinate of the point.
 * @param y - The y-coordinate of the point.
 */
export function drawPointCoordinates(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.font = "12px Roboto";
  ctx.fillStyle = "white";
  const text = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
  const offsetX = 5; // Adjust this value to position the text
  const offsetY = 15; // Adjust this value to position the text

  // Draw the text slightly above and to the right of the point
  ctx.fillText(text, x + offsetX, y - offsetY);
  ctx.restore();
}

/**
 * Draws a circle on the canvas using the selected points.
 * @param ctx - The canvas rendering context.
 * @param selectedPoints - An array of three points representing the vertices of the parallelogram.
 */
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  selectedPoints: Point[]
): void {
  const [p1, p2, p3] = selectedPoints;
  const parallelogramArea = calculateParallelogramArea(p1, p2, p3);
  const centerX = (p1.x + p2.x + p3.x) / 3;
  const centerY = (p1.y + p2.y + p3.y) / 3;
  const radius = Math.sqrt(parallelogramArea / Math.PI);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#f1c40f";
  ctx.stroke();
}

/**
 * Calculates the area of a parallelogram given three points.
 * @param p1 - The first point.
 * @param p2 - The second point.
 * @param p3 - The third point.
 * @returns The area of the parallelogram.
 */
export function calculateParallelogramArea(
  p1: Point,
  p2: Point,
  p3: Point
): number {
  const a = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  const b = Math.sqrt(Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2));
  const c = Math.sqrt(Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2));
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

/**
 * Sets the size of the canvas based on the size of the container element.
 * @param containerRef - The reference to the container element.
 * @param canvas - The HTML canvas element.
 */
export function setCanvasSize(
  containerRef: HTMLElement,
  canvas: HTMLCanvasElement
) {
  const container = containerRef;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  canvas.width = containerWidth;
  canvas.height = containerHeight;
}
