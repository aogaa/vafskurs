import { copyFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "..", "..");
const distDir = path.join(repoRoot, "dist");
const indexPath = path.join(distDir, "index.html");

const fallbackRoutes = [
  "404.html",
  "trygg-som-frivillig/index.html",
  "trygg-som-frivillig/deler/index.html",
  "trygg-som-frivillig/deler/modul-1/index.html",
  "trygg-som-frivillig/deler/modul-2/index.html",
  "trygg-som-frivillig/deler/modul-3/index.html",
  "trygg-som-frivillig/deler/modul-4/index.html",
  "spraakkafe/index.html",
  "spraakkafe/deler/index.html",
  "spraakkafe/deler/del-1/index.html",
  "spraakkafe/deler/del-2/index.html",
  "spraakkafe/deler/del-3/index.html",
  "spraakkafe/deler/del-4/index.html",
  "spraakkafe/deler/del-5/index.html",
  "moduler/index.html",
  "moduler/modul-1/index.html",
  "moduler/modul-2/index.html",
  "moduler/modul-3/index.html",
  "moduler/modul-4/index.html",
  "ukrainsk/index.html",
  "ukrainsk/trygg-som-frivillig/index.html",
  "ukrainsk/trygg-som-frivillig/deler/index.html",
  "ukrainsk/trygg-som-frivillig/deler/modul-1/index.html",
  "ukrainsk/trygg-som-frivillig/deler/modul-2/index.html",
  "ukrainsk/trygg-som-frivillig/deler/modul-3/index.html",
  "ukrainsk/trygg-som-frivillig/deler/modul-4/index.html",
  "engelsk/index.html",
  "engelsk/trygg-som-frivillig/index.html",
  "engelsk/trygg-som-frivillig/deler/index.html",
  "engelsk/trygg-som-frivillig/deler/modul-1/index.html",
  "engelsk/trygg-som-frivillig/deler/modul-2/index.html",
  "engelsk/trygg-som-frivillig/deler/modul-3/index.html",
  "engelsk/trygg-som-frivillig/deler/modul-4/index.html",
];

async function ensureIndexExists() {
  try {
    const indexStats = await stat(indexPath);

    if (!indexStats.isFile()) {
      throw new Error();
    }
  } catch {
    throw new Error(
      `Cannot create GitHub Pages fallbacks because ${indexPath} does not exist. Run vite build first.`,
    );
  }
}

await ensureIndexExists();

for (const route of fallbackRoutes) {
  const targetPath = path.join(distDir, route);

  await mkdir(path.dirname(targetPath), { recursive: true });
  await copyFile(indexPath, targetPath);

  console.log(`Created GitHub Pages fallback: dist/${route}`);
}
