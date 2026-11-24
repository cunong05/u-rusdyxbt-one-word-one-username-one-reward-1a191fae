// One Word, One Username, One Reward — entry: cunong05
// Node 22, stdlib only, no network.
// Writes exactly "cunong05" (8 bytes, no trailing newline) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "cunong05";
const OUTPUT_PATH = "/output/entry.txt";

// Guard: one word, 1-30 characters, no whitespace, letters and digits only.
if (ENTRY.length < 1 || ENTRY.length > 30) {
  throw new Error(`entry length must be 1-30 characters, got ${ENTRY.length}`);
}
if (/\s/.test(ENTRY)) {
  throw new Error("entry must not contain whitespace");
}
if (!/^[A-Za-z0-9]+$/.test(ENTRY)) {
  throw new Error("entry must contain only letters and digits");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} bytes to ${OUTPUT_PATH}`);
