import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function requireFile(file) {
	if (!fs.statSync(file).isFile() || fs.statSync(file).size === 0) {
		throw new Error(`Missing or empty package file: ${file}`);
	}
}

export function checkPackage(directory) {
	const root = path.join(directory, "root");
	const htdocs = path.join(directory, "htdocs");
	const menuFile = path.join(root, "usr/share/luci/menu.d/luci-app-fttr.json");
	const aclFile = path.join(root, "usr/share/rpcd/acl.d/luci-app-fttr.json");
	requireFile(menuFile);
	requireFile(aclFile);
	const menu = JSON.parse(fs.readFileSync(menuFile, "utf8"));
	const acl = JSON.parse(fs.readFileSync(aclFile, "utf8"));
	if (!menu["admin/network/fttr"] || !acl["luci-app-fttr"]) {
		throw new Error("Missing FTTR menu or ACL group");
	}
	requireFile(path.join(htdocs, "luci-static/resources/view/fttr/index.js"));
	let views = 0;
	for (const entry of Object.values(menu)) {
		if (entry.action?.type !== "view") continue;
		const view = entry.action.path;
		if (!/^fttr\/[a-zA-Z0-9_-]+$/.test(view)) throw new Error(`Invalid FTTR view: ${view}`);
		requireFile(path.join(htdocs, "luci-static/resources/view", `${view}.js`));
		views++;
	}
	if (!views) throw new Error("No FTTR views in menu");
	for (const file of fs.readdirSync(directory, { recursive: true })) {
		if (path.basename(file) === "placeholder" || file.endsWith(".js.o")) {
			throw new Error(`Unexpected build-time file: ${file}`);
		}
	}
	const makefile = fs.readFileSync(path.join(directory, "Makefile"), "utf8");
	if (!/^PKG_VERSION:=\d+(?:\.\d+)*$/m.test(makefile)) throw new Error("Invalid package version");
	const po = path.join(directory, "po");
	requireFile(path.join(po, "templates/fttr.pot"));
	const languages = fs.readdirSync(po, { withFileTypes: true })
		.filter((entry) => entry.isDirectory() && entry.name !== "templates");
	if (!languages.length) throw new Error("Package has no translations");
	for (const language of languages) requireFile(path.join(po, language.name, "fttr.po"));
	return views;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	const args = process.argv.slice(2);
	if (args.length !== 1) throw new Error("Usage: node scripts/check-package.mjs DIRECTORY");
	console.log(`[INFO] FTTR package valid: menu, ACL and ${checkPackage(args[0])} views.`);
}
