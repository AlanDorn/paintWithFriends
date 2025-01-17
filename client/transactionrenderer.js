import {
  decodeLargeNumber,
  decodePosition,
  TOOLCODEINDEX,
} from "./transaction.js";
import { centerToBrushSize, splinePixels } from "./util2d.js";

const doNothing = () => {};

export default function buildRenderTask(virtualCanvas, transaction) {
  switch (transaction[TOOLCODEINDEX]) {
    case 0:
      return renderPixel(virtualCanvas, transaction);
    case 1:
      return renderPencil(virtualCanvas, transaction);
    case 2:
      return renderFill(virtualCanvas, transaction);
    case 5:
      return renderResize(virtualCanvas, transaction);
    case 6:
      return renderEraser(virtualCanvas, transaction);
  }

  return [doNothing];
}

function renderPixel(virtualCanvas, transaction) {
  const color = transaction.subarray(15, 18);
  const brushsize = decodeLargeNumber(transaction.subarray(18, 20));
  const pixel = decodePosition(transaction.subarray(20, 24));

  const task = [
    () => virtualCanvas.setPixel(pixel[0], pixel[1], color, brushsize),
  ];

  return task;
}

function renderPencil(virtualCanvas, transaction) {
  const color = transaction.subarray(15, 18);
  const brushsize = decodeLargeNumber(transaction.subarray(18, 20));
  const pixels = splinePixels(
    decodePosition(transaction.subarray(20, 24)),
    decodePosition(transaction.subarray(24, 28)),
    decodePosition(transaction.subarray(28, 32)),
    decodePosition(transaction.subarray(32, 36))
  );

  //CALM: benchmark this so you can figure out what is a good number for this.
  const chunkSize = Math.ceil(100000); // Number of pixels to process per chunk
  const task = [
    () => virtualCanvas.setPixel(pixels[0][0], pixels[0][1], color, brushsize),
  ]; // Array to store the lambdas

  for (let index = 0; index < pixels.length; index += chunkSize) {
    const start = index;
    const end = Math.min(index + chunkSize, pixels.length);

    task.push(() => {
      for (let i = start; i < end; i++) {
        const [x, y] = pixels[i];
        if (brushsize <= 2) {
          virtualCanvas.setPixel(x, y, color, brushsize);
        }
        virtualCanvas.setPixelOutline(x, y, color, brushsize);
      }
    });
  }

  return task;
}

function renderFill(virtualCanvas, transaction) {
  const color = transaction.subarray(15, 18);
  const [x, y] = decodePosition(transaction.subarray(18, 22));

  const stack = [[x, y]];
  const width = virtualCanvas.virtualWidth;
  const height = virtualCanvas.virtualHeight;

  if (
    x < 0 ||
    x >= width ||
    y < 0 ||
    y >= height ||
    colorsMatch(virtualCanvas.virtualCanvas[y][x], color)
  ) {
    return [doNothing];
  }

  const targetColor = virtualCanvas.virtualCanvas[y][x];
  virtualCanvas.setPixel(x, y, targetColor, 1);

  const nextRender = () => {
    const startTime = performance.now();
    while (performance.now() - startTime < 3 && stack.length > 0) {
      for (let fast = 0; fast < 10000 && stack.length > 0; fast++) {
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

        virtualCanvas.setPixel(curX, curY, color, 1);

        const neighbors = [
          [curX + 1, curY],
          [curX - 1, curY],
          [curX, curY + 1],
          [curX, curY - 1],
        ];

        if (Math.random() < 1 / 3)
          // mixture of bfs and dfs looks cool
          for (let i = 0; i < neighbors.length; i++) {
            // bfs
            const pos = Math.floor(Math.random() * stack.length);
            stack.push(stack[pos]);
            stack[pos] = neighbors[i];
          }
        else
          for (let i = neighbors.length; i > 0; ) {
            // dfs
            const rand = Math.floor(Math.random() * i);
            stack.push(neighbors[rand]);
            neighbors[rand] = neighbors[--i];
          }
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

function renderResize(virtualCanvas, transaction) {
  const [newWidth, newHeight] = decodePosition(transaction.subarray(15, 19));

  return [
    () => {
      virtualCanvas.setSize(newWidth, newHeight);
      virtualCanvas.viewport.setAdjusters();
    },
  ];
}

function renderEraser(virtualCanvas, transaction) {
  const color = transaction.subarray(15, 18);
  const primarycolor = transaction.subarray(18, 21); // to make things more complicated i spliced and changed vals for rest when i coulda put primarycolor at the back
  const brushsize = decodeLargeNumber(transaction.subarray(21, 23));
  const pixels = splinePixels(
    decodePosition(transaction.subarray(23, 27)),
    decodePosition(transaction.subarray(27, 31)),
    decodePosition(transaction.subarray(31, 35)),
    decodePosition(transaction.subarray(35, 39))
  );
  const mode = transaction[39];

  //CALM: benchmark this so you can figure out what is a good number for this.
  const chunkSize = Math.ceil(100000); // Number of pixels to process per chunk

  const task = [() => processPixel(pixels[0][0], pixels[0][1])];

  function processPixel(x, y) {
    if (mode === 1) {
      // Right-click => Eraser logic with subpixel checks
      const halfThickness = Math.floor(brushsize / 2);
      for (let dy = 0; dy < brushsize; dy++) {
        for (let dx = 0; dx < brushsize; dx++) {
          const newX = x - halfThickness + dx;
          const newY = y - halfThickness + dy;
  
          if (
            newX >= 0 &&
            newY >= 0 &&
            newX < virtualCanvas.virtualWidth &&
            newY < virtualCanvas.virtualHeight
          ) {
            const existingColor = virtualCanvas.getPixelColor(newX, newY);
            if (colorsMatch(existingColor, primarycolor)) {
              // Overwrite single subpixel
              virtualCanvas.setPixel(newX, newY, color, 1);
            }
          }
        }
      }
    } else {
      // Left-click => Just do one call that draws the entire brush area
      // No need to check existing color for each subpixel.
      virtualCanvas.setPixel(x, y, color, brushsize);
    }
  }
  

  for (let index = 0; index < pixels.length; index += chunkSize) {
    const start = index;
    const end = Math.min(index + chunkSize, pixels.length);

    task.push(() => {
      for (let i = start; i < end; i++) {
        const [x, y] = pixels[i];

        processPixel(x, y);

        // virtualCanvas.setPixelOutline(x, y, color, brushsize);
      }
    });
  }

  return task;
}
