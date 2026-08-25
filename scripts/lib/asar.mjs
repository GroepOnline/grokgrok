// Minimal ASAR reader/writer — stdlib only, no `asar` dependency.
// Format: [u32 pickleSize=4][u32 headerSize][u32 objSize][u32 jsonLen][json...][file bytes...]
import fs from "node:fs";

/**
 * @typedef {object} AsarNode
 * @property {Record<string, AsarNode>=} files
 * @property {number=} size
 * @property {string=} offset   // string in the shipped format
 * @property {boolean=} unpacked
 */

export function readAsarHeader(buf) {
  const pickleSize = buf.readUInt32LE(4);
  const jsonLen = buf.readUInt32LE(12);
  const json = buf.subarray(16, 16 + jsonLen).toString("utf8");
  return { header: JSON.parse(json), contentBase: 8 + pickleSize };
}

export function* walkFiles(node, prefix = "") {
  if (!node.files) return;
  for (const [name, child] of Object.entries(node.files)) {
    const p = prefix ? `${prefix}/${name}` : name;
    if (child.files) yield* walkFiles(child, p);
    else yield {
      path: p,
      size: child.size ?? 0,
      offset: child.unpacked ? null : Number(child.offset ?? NaN),
      unpacked: Boolean(child.unpacked),
    };
  }
}

/** Extract one file from an asar into a destination path. */
export function extractFile(asarPath, innerPath, destPath) {
  const fd = fs.openSync(asarPath, "r");
  try {
    const head = Buffer.alloc(1024 * 1024);
    fs.readSync(fd, head, 0, head.length, 0);
    const { header, contentBase } = readAsarHeader(head);
    let target = header;
    for (const part of innerPath.split("/")) {
      target = target?.files?.[part];
      if (!target) throw new Error(`not found in asar: ${innerPath}`);
    }
    if (target.files) throw new Error(`is a directory: ${innerPath}`);
    const size = target.size ?? 0;
    const out = Buffer.alloc(size);
    if (target.unpacked) {
      // lives next to asar under <name>.unpacked/
      const src = asarPath + ".unpacked/" + innerPath;
      fs.copyFileSync(src, destPath);
    } else {
      fs.readSync(fd, out, 0, size, contentBase + Number(target.offset));
      if (destPath === "-" || destPath === "/dev/stdout") fs.writeSync(1, out);
      else fs.writeFileSync(destPath, out);
    }
  } finally {
    fs.closeSync(fd);
  }
}
