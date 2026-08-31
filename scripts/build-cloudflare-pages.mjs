import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "dist", "cloudflare-pages");
const relativeOutput = relative(projectRoot, outputRoot);

if (isAbsolute(relativeOutput) || relativeOutput === "" || relativeOutput.startsWith("..")) {
    throw new Error(`Refusing to replace an output outside the project: ${outputRoot}`);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const publicFiles = [
    "index.html",
    "work.html",
    "styles.css",
    "theme.js",
    "robots.txt",
    "sitemap.xml",
    "_headers"
];

for (const file of publicFiles) {
    await cp(join(projectRoot, file), join(outputRoot, file));
}

console.log(`Cloudflare Pages output: ${outputRoot}`);
