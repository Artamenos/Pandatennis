import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const marker = /\[\[PLACEHOLDER:[A-Z0-9_-]+\]\]/g;
const findings = [];

async function scan(relativeDir) {
  for (const entry of await readdir(path.join(process.cwd(), relativeDir), { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      await scan(relativePath);
      continue;
    }
    if (!/\.(?:html|svg)$/.test(entry.name)) continue;
    const content = await readFile(path.join(process.cwd(), relativePath), "utf8");
    const matches = content.match(marker);
    if (matches) findings.push({ file: relativePath, markers: [...new Set(matches)] });
  }
}

// Inspect the exported pages: unused local fallback data must not block a CMS site.
try {
  await readFile(path.join(process.cwd(), "out", "index.html"));
} catch {
  console.error("Run the production build before checking placeholders.");
  process.exit(1);
}
await scan("out");

if (findings.length) {
  console.error("Публикация остановлена: остались заглушки контента.");
  for (const finding of findings) console.error(`- ${finding.file}: ${finding.markers.join(", ")}`);
  process.exit(1);
}

console.log("Заглушки контента не найдены.");
