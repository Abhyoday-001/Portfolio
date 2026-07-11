/**
 * Draws an image onto a canvas with CSS `object-fit: cover` behavior.
 * Centers and crops the image to fill the canvas while preserving aspect ratio.
 */
export function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
): void {
  const imgRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  let drawWidth: number;
  let drawHeight: number;
  let offsetX: number;
  let offsetY: number;

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas — crop sides equally (center horizontal)
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  } else {
    // Image is taller than canvas — crop top/bottom
    // Align closer to the top (15%) to prevent cutting off the person's head
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) * 0.15;
  }

  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}
