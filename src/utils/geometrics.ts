

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
  ctx.lineTo(p1.x + (p3.x - p2.x), p1.y + (p3.y - p2.y));
  ctx.closePath();
  ctx.strokeStyle = '#3498db';
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
  // Calculate the offset of the text based on the point's position and avoiding overlapping text
  const offsetX = x > ctx.canvas.width / 2 ? -ctx.measureText(text).width - 5 : 5;
  const offsetY = y < ctx.canvas.height / 4 ? 25 : -5;
  

  // Draw the text slightly above and to the right/left of the point
  ctx.fillText(text, x + offsetX, y + offsetY);
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
  const p4 = { x: p1.x + p3.x - p2.x, y: p1.y + p3.y - p2.y };
  const centerX = (p1.x + p2.x + p3.x + p4.x) / 4;
  const centerY = (p1.y + p2.y + p3.y + p4.y) / 4;
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
  const p4 = { x: p1.x + p3.x - p2.x, y: p1.y + p3.y - p2.y };
  const base = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  const height = Math.abs((p2.x - p1.x) * (p4.y - p1.y) - (p4.x - p1.x) * (p2.y - p1.y)) / base;
  const area = base * height;
  return area;
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
