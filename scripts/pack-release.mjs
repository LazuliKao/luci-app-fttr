// SPDX-License-Identifier: Apache-2.0
import { execFileSync, execSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const pkgJsonPath = path.join(rootDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));

// Determine version: CLI arg > RELEASE_VERSION > GITHUB_REF_NAME > package.json
let rawVersion = process.argv[2] || process.env.RELEASE_VERSION || process.env.GITHUB_REF_NAME || pkg.version;
if (process.env.RELEASE_TYPE === "nightly" || rawVersion === "nightly") {
	rawVersion = "nightly";
}
const version = rawVersion.replace(/^v/, "");
if (!/^(nightly|\d+(?:\.\d+)*)$/.test(version)) {
	throw new Error(`Unsupported release version: ${version}`);
}

const git = (...args) => execFileSync("git", args, { encoding: "utf-8" }).trim();
const sourceCommit = git("rev-parse", "HEAD");
const sourceTimestamp = new Date(git("show", "-s", "--format=%cI", "HEAD")).toISOString();
const packageVersion = version === "nightly"
	? sourceTimestamp.slice(0, 19).replace(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/, "$1.$2.$3.$4$5$6")
	: version;

console.log(`Packaging luci-app-fttr release tarball for version: ${version}`);

// 1. Ensure fresh build output
console.log("Building frontend assets (pnpm build)...");
execSync("pnpm build", { stdio: "inherit" });

const htdocsDir = path.join(rootDir, "package", "luci-app-fttr", "htdocs");
const rootPkgDir = path.join(rootDir, "package", "luci-app-fttr", "root");
const poDir = path.join(rootDir, "package", "luci-app-fttr", "po");

function requireFile(filePath) {
	if (!fs.statSync(filePath).isFile() || fs.statSync(filePath).size === 0) {
		throw new Error(`Missing or empty release file: ${filePath}`);
	}
}

const menuPath = path.join(rootPkgDir, "usr/share/luci/menu.d/luci-app-fttr.json");
const aclPath = path.join(rootPkgDir, "usr/share/rpcd/acl.d/luci-app-fttr.json");
requireFile(menuPath);
requireFile(aclPath);
const menu = JSON.parse(fs.readFileSync(menuPath, "utf-8"));
const acl = JSON.parse(fs.readFileSync(aclPath, "utf-8"));
if (!menu["admin/network/fttr"] || !acl["luci-app-fttr"]) {
	throw new Error("Release is missing the FTTR menu or ACL group");
}
requireFile(path.join(htdocsDir, "luci-static/resources/view/fttr/index.js"));
for (const entry of Object.values(menu)) {
	if (entry.action?.type === "view") {
		const view = entry.action.path;
		if (!/^fttr\/[a-zA-Z0-9_-]+$/.test(view)) throw new Error(`Invalid FTTR view: ${view}`);
		requireFile(path.join(htdocsDir, "luci-static/resources/view", `${view}.js`));
	}
}
requireFile(path.join(poDir, "templates/fttr.pot"));
const languages = fs.readdirSync(poDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== "templates");
if (languages.length === 0) throw new Error("Release has no translations");
for (const language of languages) requireFile(path.join(poDir, language.name, "fttr.po"));

// 2. Prepare staging directory
const distDir = path.join(rootDir, "dist");
const stagingParent = path.join(distDir, "staging");
const bundleDirName = `luci-app-fttr-${version}`;
const bundleDir = path.join(stagingParent, bundleDirName);

fs.rmSync(stagingParent, { recursive: true, force: true });
fs.mkdirSync(bundleDir, { recursive: true });

function copyDirSync(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);
		if (entry.isDirectory()) {
			copyDirSync(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

console.log("Copying package files into staging directory...");
copyDirSync(htdocsDir, path.join(bundleDir, "htdocs"));
copyDirSync(rootPkgDir, path.join(bundleDir, "root"));
copyDirSync(poDir, path.join(bundleDir, "po"));
fs.writeFileSync(path.join(bundleDir, "build-info.json"), `${JSON.stringify({
	schemaVersion: 1,
	sourceCommit,
	sourceTimestamp,
	packageVersion,
	releaseType: version === "nightly" ? "nightly" : "release",
}, null, 2)}\n`);

// 3. Create tar.gz archive using native tar (available on Linux, macOS, and modern Windows)
const tarballName = `luci-app-fttr-${version}.tar.gz`;
const tarballPath = path.join(distDir, tarballName);

if (fs.existsSync(tarballPath)) {
	fs.unlinkSync(tarballPath);
}

console.log(`Creating archive: ${tarballPath}`);
execSync(`tar -czf "${tarballPath}" -C "${stagingParent}" "${bundleDirName}"`, {
	stdio: "inherit",
});

// Clean staging directory
fs.rmSync(stagingParent, { recursive: true, force: true });

// 4. Compute SHA256 checksum
const fileBuffer = fs.readFileSync(tarballPath);
const sha256 = createHash("sha256").update(fileBuffer).digest("hex");
const sha256Path = `${tarballPath}.sha256`;
fs.writeFileSync(sha256Path, `${sha256}  ${tarballName}\n`, "utf-8");

console.log(`\nRelease tarball created successfully!`);
console.log(`File:   ${tarballPath}`);
console.log(`Size:   ${(fileBuffer.length / 1024).toFixed(1)} KiB`);
console.log(`SHA256: ${sha256}`);
console.log(`OpenWrt Makefile PKG_HASH:`);
console.log(`PKG_HASH:=${sha256}\n`);
