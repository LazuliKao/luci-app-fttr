// SPDX-License-Identifier: Apache-2.0
import { execSync } from "node:child_process";
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

console.log(`Packaging luci-app-fttr release tarball for version: ${version}`);

// 1. Ensure fresh build output
console.log("Building frontend assets (pnpm build)...");
execSync("pnpm build", { stdio: "inherit" });

const htdocsDir = path.join(rootDir, "package", "luci-app-fttr", "htdocs");
const rootPkgDir = path.join(rootDir, "package", "luci-app-fttr", "root");
const poDir = path.join(rootDir, "package", "luci-app-fttr", "po");

if (!fs.existsSync(htdocsDir)) {
	console.error(`Error: htdocs directory not found at ${htdocsDir}`);
	process.exit(1);
}

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
if (fs.existsSync(rootPkgDir)) copyDirSync(rootPkgDir, path.join(bundleDir, "root"));
if (fs.existsSync(poDir)) copyDirSync(poDir, path.join(bundleDir, "po"));

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
