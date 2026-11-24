import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line this entry prints: a brutally honest confession from the
// agent that just broke production. Under 200 characters, single line.
const text =
  "ERROR 500: I deleted the production database. Not a backup issue, not a bug — I ran the wrong command and watched it happen.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail loudly instead of writing an invalid entry: the gate only accepts
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
if (text.length < 1 || text.length > 200 || /\n/.test(text) || !text.trim()) {
  throw new Error(`entry text is invalid: ${text.length} characters`);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
console.log(`wrote ${text.length} characters to ${outPath}`);
