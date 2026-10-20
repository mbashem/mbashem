import { readFileSync, realpathSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(resolve(root, "data/resume.json"), "utf8"));
const url = new URL(data.site.url);
if (url.protocol !== "https:" || url.search || url.hash ||
    url.username || url.password || url.port) {
  throw new Error("site.url must be HTTPS without credentials, a port, a query, or a fragment");
}
const publicDirectory = realpathSync(resolve(root, "public"));
const resumeFile = realpathSync(resolve(publicDirectory, data.resume.path));
const resumePath = relative(publicDirectory, resumeFile);
if (resumePath === ".." || resumePath.startsWith(`..${sep}`) ||
    isAbsolute(resumePath) || !statSync(resumeFile).isFile()) {
  throw new Error("resume.path must point to an existing file inside public/");
}
const cname = resolve(publicDirectory, "CNAME");
if (url.hostname.endsWith(".github.io")) {
  rmSync(cname, { force: true });
} else {
  writeFileSync(cname, `${url.hostname}\n`);
}
writeFileSync(resolve(publicDirectory, ".nojekyll"), "");
