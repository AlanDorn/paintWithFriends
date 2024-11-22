const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Initialize an empty ImageData object
const imageData = ctx.createImageData(canvas.width, canvas.height);

// Function to set a specific pixel to blue
function setPixel(x, y) {
  const index = (y * imageData.width + x) * 4; // Calculate pixel index
  imageData.data[index] = 165; // Red
  imageData.data[index + 1] = 142; // Green
  imageData.data[index + 2] = 245; // Blue
  imageData.data[index + 3] = 255; // Alpha (fully opaque)
}

let mousedown = false;

// Set mousedown and mouseup events only on the canvas
document.addEventListener("mousedown", () => {
  mousedown = true;
});

document.addEventListener("mouseup", () => {
  mousedown = false;
});

// Function to set a line between two points (x1, y1) and (x2, y2)
function setLine(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    setPixel(x1, y1); // Set the current pixel to blue

    if (x1 === x2 && y1 === y2) break; // Break the loop when the line is complete

    const e2 = err * 2;

    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}

// Update mousemove to draw lines only when on the canvas
let lastX = null;
let lastY = null;

document.addEventListener("mousemove", (event) => {
  if (mousedown) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      if (lastX !== null && lastY !== null) {
        setLine(lastX, lastY, x, y); // Draw a line between the previous and current mouse positions
      }
      ctx.putImageData(imageData, 0, 0); // Render the changes
      lastX = x;
      lastY = y;
    }
    else {
      lastX = null;
      lastY = null;
    }
  } else {
    lastX = null;
    lastY = null;
  }
});
