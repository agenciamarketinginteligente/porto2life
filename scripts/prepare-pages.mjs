import { access, readdir, readFile, rename } from 'node:fs/promises';
import path from 'node:path';

const clientDir = path.resolve('dist/client');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';

if (basePath && !/^\/[\w-]+(?:\/[\w-]+)*$/.test(basePath)) {
  throw new Error(`Invalid GitHub Pages base path: ${basePath}`);
}

// Vinext includes assetPrefix in the output directory. GitHub Pages already
// mounts this artifact at basePath, so keeping that directory doubles the URL.
if (basePath) {
  await rename(
    path.join(clientDir, basePath.slice(1), '_next'),
    path.join(clientDir, '_next'),
  );
}

async function* htmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(filename);
    else if (entry.name.endsWith('.html')) yield filename;
  }
}

// Validate the artifact as served under the repository URL, without a server
// rewriting requests. This catches missing styles, scripts, fonts and images.
const resources = new Set();
await access(path.join(clientDir, 'index.html'));
for await (const filename of htmlFiles(clientDir)) {
  const html = await readFile(filename, 'utf8');
  const pageUrl = new URL(
    `${basePath}/${path.relative(clientDir, filename).split(path.sep).join('/')}`,
    'https://pages.invalid',
  );
  for (const match of html.matchAll(/<(?:link|script|img)\b[^>]*?\b(?:href|src)=["']([^"']+)["']/gi)) {
    const url = new URL(match[1], pageUrl);
    if (url.origin !== pageUrl.origin) continue;
    if (!url.pathname.startsWith(`${basePath}/`)) {
      throw new Error(`Resource outside GitHub Pages base path: ${url.pathname}`);
    }
    resources.add(decodeURIComponent(url.pathname.slice(basePath.length + 1)));
  }
}

for (const resource of resources) {
  await access(path.join(clientDir, resource));
}
console.log(`GitHub Pages artifact ready: ${resources.size} local resources verified.`);
