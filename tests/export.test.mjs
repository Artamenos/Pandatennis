import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("static export contains the home and 404 pages", async () => {
  const [home, notFound] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/404.html", import.meta.url), "utf8"),
  ]);

  assert.match(home, /<main/);
  assert.match(home, /lang="ru"/);
  assert.match(notFound, /404/);
});
