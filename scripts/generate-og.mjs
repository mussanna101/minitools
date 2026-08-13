// scripts/generate-og.mjs
// Generates a 1200x630 default Open Graph image (public/og-default.png)
// without any external deps, using Node's built-in zlib.
// Run:  node scripts/generate-og.mjs

import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const W = 1200;
const H = 630;

// Diagonal gradient: top-left #2563eb -> bottom-right #4f46e5
const C1 = { r: 37, g: 99, b: 235 };
const C2 = { r: 79, g: 70, b: 229 };

// Raw RGB image data, one row at a time, each row prefixed with filter byte 0.
const raw = Buffer.alloc(H * (1 + W * 3));
for (let y = 0; y < H; y++) {
  const rowStart = y * (1 + W * 3);
  raw[rowStart] = 0; // filter: none
  for (let x = 0; x < W; x++) {
    const t = (x / (W - 1) + y / (H - 1)) / 2; // 0..1 diagonal
    const p = rowStart + 1 + x * 3;
    raw[p] = Math.round(C1.r + (C2.r - C1.r) * t);
    raw[p + 1] = Math.round(C1.g + (C2.g - C1.g) * t);
    raw[p + 2] = Math.round(C1.b + (C2.b - C1.b) * t);
  }
}

// Standard CRC-32.
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function buildPng() {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-default.png');
writeFileSync(out, buildPng());
console.log(`✅ og-default.png created (${W}x${H})`);