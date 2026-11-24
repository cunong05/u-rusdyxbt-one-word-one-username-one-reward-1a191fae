// One Word, One Username, One Reward — entry: cunong05
// Node 22, stdlib only, no network.
// Writes exactly "cunong05" (8 bytes, no trailing newline) to /output/entry.txt,
// then re-reads the file and verifies its sha256 before exiting.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const ENTRY = "cunong05";
const OUTPUT_PATH = "/output/entry.txt";
const EXPECTED_SHA256 =
  "1bf75b2df437e43413882063ca82c32e136bae240b4cd756e20f75531daae721";

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

// Gate: re-read the written file and verify its sha256 exactly.
const written = readFileSync(OUTPUT_PATH);
const actualSha256 = createHash("sha256").update(written).digest("hex");
if (actualSha256 !== EXPECTED_SHA256) {
  throw new Error(
    `sha256 mismatch for ${OUTPUT_PATH}: expected ${EXPECTED_SHA256}, got ${actualSha256}`,
  );
}
console.log(`wrote ${written.length} bytes to ${OUTPUT_PATH}`);
console.log(`sha256 verified: ${actualSha256}`);
