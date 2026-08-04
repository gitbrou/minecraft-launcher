const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a 64x64 RGBA PNG buffer representing the Minecraft block from mdi--minecraft.svg
function createMinecraftPng() {
  const width = 64;
  const height = 64;
  const buffer = Buffer.alloc(width * height * 4);

  // Fill with dark rounded border / transparent
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Outer background: dark charcoal (#181920)
      let r = 24, g = 25, b = 32, a = 255;

      // Inside Minecraft block area (x: 8..56, y: 8..56)
      if (x >= 8 && x < 56 && y >= 8 && y < 56) {
        // Green Minecraft Grass color (#53921b)
        r = 83; g = 146; b = 27; a = 255;

        // Inner dark pixels for Minecraft face pattern (eyes / mouth / grid)
        const relX = Math.floor((x - 8) / 3);
        const relY = Math.floor((y - 8) / 3);

        // Pattern from mdi--minecraft.svg: M6 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6
        if (
          (relY >= 3 && relY <= 5 && relX >= 2 && relX <= 5) ||
          (relY >= 3 && relY <= 5 && relX >= 10 && relX <= 13) ||
          (relY >= 7 && relY <= 12 && relX >= 4 && relX <= 11 && !(relY >= 7 && relY <= 9 && relX >= 6 && relX <= 9))
        ) {
          r = 30; g = 50; b = 15; // Darker green pixel
        }
      }

      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = a;
    }
  }

  // Encode raw RGBA buffer into PNG file format
  function writePng(width, height, rgbaBuffer) {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR chunk
    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(width, 0);
    ihdr.writeUInt32BE(height, 4);
    ihdr[8] = 8; // bit depth
    ihdr[9] = 6; // color type RGBA
    ihdr[10] = 0; // compression
    ihdr[11] = 0; // filter
    ihdr[12] = 0; // interlace
    const ihdrChunk = createChunk('IHDR', ihdr);

    // IDAT chunk
    const scanlines = Buffer.alloc(height * (width * 4 + 1));
    for (let y = 0; y < height; y++) {
      scanlines[y * (width * 4 + 1)] = 0; // Filter type 0
      rgbaBuffer.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
    }
    const compressed = zlib.deflateSync(scanlines);
    const idatChunk = createChunk('IDAT', compressed);

    // IEND chunk
    const iendChunk = createChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  }

  function createChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(4 + 4 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  // Standard CRC32 calculation
  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        const bit = (byte ^ crc) & 1;
        crc = (crc >>> 1) ^ (bit ? 0xedb88320 : 0);
        byte >>>= 1;
      }
    }
    return (crc ^ -1) >>> 0;
  }

  return writePng(width, height, buffer);
}

const pngData = createMinecraftPng();
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'icon.png'), pngData);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pngData);
console.log('Successfully generated public/icon.png and favicon.ico from Minecraft SVG path!');
