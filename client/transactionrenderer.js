import {
  decodeColor,
  decodeLargeNumber,
  decodePosition,
} from "./transaction.js";
import { splinePixels } from "./util2d.js";

export default function buildRenderTask(virtualCanvas, transaction) {
  switch (transaction[10]) {
    case 0:
      return renderPixel(virtualCanvas, transaction);
    case 1:
      return renderPencil(virtualCanvas, transaction);
    case 2:
      return renderFill(virtualCanvas, transaction);
  }
}

function renderPixel(virtualCanvas, transaction) {
  const color = decodeColor(transaction.slice(11, 14));
  const brushsize = decodeLargeNumber(transaction.slice(14, 16));
  const pixel = decodePosition(transaction.slice(16, 20));

  const task = [
    () => {
      for (let dx = 0; dx < brushsize; dx++) {
        for (let dy = 0; dy < brushsize; dy++) {
          virtualCanvas.setPixel(pixel[0] + dx, pixel[1] + dy, color);
        }
      }
    },
  ];

  return task;
}

function renderPencil(virtualCanvas, transaction) {
  const color = decodeColor(transaction.slice(11, 14));
  const brushsize = decodeLargeNumber(transaction.slice(14, 16));
  const pixels = splinePixels([
    decodePosition(transaction.slice(16, 20)),
    decodePosition(transaction.slice(20, 24)),
    decodePosition(transaction.slice(24, 28)),
    decodePosition(transaction.slice(28, 32)),
  ]);

  const chunkSize = Math.ceil((2 * 400 * 400) / brushsize / brushsize); // Number of pixels to process per chunk
  const task = []; // Array to store the lambdas

  for (let index = 0; index < pixels.length; index += chunkSize) {
    const start = index;
    const end = Math.min(index + chunkSize, pixels.length);

    // Create a lambda for this chunk
    task.push(() => {
      for (let i = start; i < end; i++) {
        const [x, y] = pixels[i];
        for (let dx = 0; dx < brushsize; dx++) {
          for (let dy = 0; dy < brushsize; dy++) {
            virtualCanvas.setPixel(x + dx, y + dy, color);
          }
        }
      }
    });
  }

  return task;
}

function renderFill(virtualCanvas, transaction) {
  const color = decodeColor(transaction.slice(11, 14));
  const [x, y] = decodePosition(transaction.slice(14, 18));

  virtualCanvas.resizeVirtualIfNeeded(x, y);
  const targetColor = virtualCanvas.virtualCanvas[y][x];

  if (colorsMatch(targetColor, color)) return [() => {}];

  const stack = [[x, y]];
  const width = virtualCanvas.virtualWidth;
  const height = virtualCanvas.virtualHeight;

  const nextRender = () => {
    const startTime = performance.now();
    while (performance.now() - startTime < 32 && stack.length > 0) {
      const [curX, curY] = stack.pop();

      if (
        curX < 0 ||
        curX >= width ||
        curY < 0 ||
        curY >= height ||
        !colorsMatch(virtualCanvas.virtualCanvas[curY][curX], targetColor)
      ) {
        continue;
      }

      virtualCanvas.setPixel(curX, curY, color);

      const neighbors = [
        [curX + 1, curY],
        [curX - 1, curY],
        [curX, curY + 1],
        [curX, curY - 1],
      ];

      if (Math.random() < 1/64)
        for (let i = 0; i < neighbors.length; i++) {
          const pos = Math.floor(Math.random() * stack.length);
          stack.push(stack[pos]);
          stack[pos] = neighbors[i];
        }
      else
        for (let i = neighbors.length; i > 0; ) {
          const rand = Math.floor(Math.random() * i);
          stack.push(neighbors[rand]);
          neighbors[rand] = neighbors[--i];
        }
    }

    const stackIsNotEmpty = stack.length > 0;
    if (stackIsNotEmpty) return nextRender;
  };

  const task = [nextRender];
  return task;
}

function colorsMatch(first, second) {
  return (
    first[0] === second[0] && first[1] === second[1] && first[2] === second[2]
  );
}
