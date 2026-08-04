const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create exact 64x64 PNG of mdi--minecraft.svg
function createExactSvgIconPng() {
  const width = 64;
  const height = 64;
  const buffer = Buffer.alloc(width * height * 4);

  // SVG path: M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6z
  // In 24x24 viewBox:
  // Outer rounded box: x in [4..20], y in [2..22]
  // Cutout holes:
  // 1. (x: 6..10, y: 6..10)
  // 2. (x: 10..14, y: 10..12)
  // 3. (x: 8..10, y: 12..18)
  // 4. (x: 10..12, y: 14..16)
  // 5. (x: 14..18, y: 14..16)
  // 6. (x: 16..18, y: 10..16)
  // 7. (x: 14..16, y: 8..10)
  // 8. (x: 14..18, y: 6..6) -> 14..18, y:6..10
  // 9. (x: 10..14, y: 6..10)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      const vx = (x / width) * 24;
      const vy = (y / height) * 24;

      // Check outer rounded box (x: 3.5..20.5, y: 1.5..22.5)
      const inOuterBox = vx >= 3.5 && vx <= 20.5 && vy >= 1.5 && vy <= 22.5;

      if (!inOuterBox) {
        buffer[idx] = 0;
        buffer[idx + 1] = 0;
        buffer[idx + 2] = 0;
        buffer[idx + 3] = 0;
        continue;
      }

      // Check inner cutouts of mdi--minecraft.svg
      const isCutout =
        (vx >= 6 && vx <= 10 && vy >= 6 && vy <= 10) ||
        (vx >= 10 && vx <= 14 && vy >= 10 && vy <= 12) ||
        (vx >= 8 && vx <= 10 && vy >= 12 && vy <= 18) ||
        (vx >= 10 && vx <= 14 && vy >= 14 && vy <= 16) ||
        (vx >= 14 && vx <= 18 && vy >= 10 && vy <= 16) ||
        (vx >= 14 && vx <= 18 && vy >= 6 && vy <= 10);

      if (isCutout) {
        // Dark background for cutouts
        buffer[idx] = 20;
        buffer[idx + 1] = 22;
        buffer[idx + 2] = 28;
        buffer[idx + 3] = 255;
      } else {
        // Primary Prism Green (#53921b)
        buffer[idx] = 83;
        buffer[idx + 1] = 146;
        buffer[idx + 2] = 27;
        buffer[idx + 3] = 255;
      }
    }
  }

  function writePng(w, h, rgba) {
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    const ihdr = Buffer.alloc(13);
    ihdr.writeUInt32BE(w, 0);
    ihdr.writeUInt32BE(h, 4);
    ihdr[8] = 8;
    ihdr[9] = 6;
    ihdr[10] = 0;
    ihdr[11] = 0;
    ihdr[12] = 0;
    const ihdrChunk = createChunk('IHDR', ihdr);

    const scanlines = Buffer.alloc(h * (w * 4 + 1));
    for (let i = 0; i < h; i++) {
      scanlines[i * (w * 4 + 1)] = 0;
      rgba.copy(scanlines, i * (w * 4 + 1) + 1, i * w * 4, (i + 1) * w * 4);
    }
    const compressed = zlib.deflateSync(scanlines);
    const idatChunk = createChunk('IDAT', compressed);
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

const pngData = createExactSvgIconPng();
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'icon.png'), pngData);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pngData);
console.log('Successfully updated icon.png from exact mdi--minecraft.svg!');
