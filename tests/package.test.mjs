import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { generatePackage } from "../scripts/generate-package.mjs";
import { checkPackage } from "../scripts/check-package.mjs";

const repo = fileURLToPath(new URL("../", import.meta.url));

function fixture(t) {
	const work = fs.mkdtempSync(path.join(os.tmpdir(), "fttr-package-"));
	t.after(() => fs.rmSync(work, { recursive: true, force: true }));
	const sourceDir = path.join(work, "source");
	const menu = {
		"admin/network/fttr": { title: "FTTR" },
		"admin/network/fttr/status": { action: { type: "view", path: "fttr/index" } },
		"admin/network/fttr/about": { action: { type: "view", path: "fttr/about" } },
	};
	const menuPath = path.join(sourceDir, "root/usr/share/luci/menu.d/luci-app-fttr.json");
	const files = {
		"root/usr/share/luci/menu.d/luci-app-fttr.json": JSON.stringify(menu),
		"root/usr/share/rpcd/acl.d/luci-app-fttr.json": '{"luci-app-fttr":{"read":{}}}',
		"htdocs/luci-static/resources/view/fttr/index.js": "return {};",
		"htdocs/luci-static/resources/view/fttr/about.js": "return {};",
		"po/templates/fttr.pot": 'msgid "Status"\nmsgstr ""\n',
		"po/zh_Hans/fttr.po": 'msgid "Status"\nmsgstr "状态"\n',
		Makefile: fs.readFileSync(path.join(repo, "package/luci-app-fttr/Makefile")),
	};
	for (const [name, content] of Object.entries(files)) {
		const file = path.join(sourceDir, name);
		fs.mkdirSync(path.dirname(file), { recursive: true });
		fs.writeFileSync(file, content);
	}
	return {
		sourceDir, outputDir: path.join(work, "output"), menu, menuPath,
		version: "2026.11.08.010203", sourceCommit: "a".repeat(40),
		licenseFile: path.join(repo, "LICENSE"),
	};
}

function snapshot(directory) {
	return Object.fromEntries(fs.readdirSync(directory, { recursive: true })
		.filter((file) => fs.statSync(path.join(directory, file)).isFile())
		.sort().map((file) => [file, fs.readFileSync(path.join(directory, file))]));
}

test("generates a complete deterministic package without modifying its source", (t) => {
	const f = fixture(t);
	const before = snapshot(f.sourceDir);
	generatePackage(f);
	assert.equal(checkPackage(f.outputDir), 2);
	assert.match(fs.readFileSync(path.join(f.outputDir, "Makefile"), "utf8"), /PKG_VERSION:=2026.11.08.010203/);
	assert.match(fs.readFileSync(path.join(f.outputDir, "README.md"), "utf8"), new RegExp(f.sourceCommit));
	assert.deepEqual(fs.readdirSync(f.outputDir).sort(), ["LICENSE", "Makefile", "README.md", "htdocs", "po", "root"]);
	const generated = snapshot(f.outputDir);
	generatePackage(f);
	assert.deepEqual(snapshot(f.outputDir), generated);
	assert.deepEqual(snapshot(f.sourceDir), before);
});

test("regeneration removes deleted pages and languages from the output", (t) => {
	const f = fixture(t);
	fs.mkdirSync(path.join(f.sourceDir, "po/de"));
	fs.writeFileSync(path.join(f.sourceDir, "po/de/fttr.po"), 'msgid "Status"\nmsgstr "Zustand"\n');
	generatePackage(f);
	delete f.menu["admin/network/fttr/about"];
	fs.writeFileSync(f.menuPath, JSON.stringify(f.menu));
	fs.rmSync(path.join(f.sourceDir, "htdocs/luci-static/resources/view/fttr/about.js"));
	fs.rmSync(path.join(f.sourceDir, "po/de"), { recursive: true });
	generatePackage(f);
	assert.equal(checkPackage(f.outputDir), 1);
	assert.equal(fs.existsSync(path.join(f.outputDir, "htdocs/luci-static/resources/view/fttr/about.js")), false);
	assert.equal(fs.existsSync(path.join(f.outputDir, "po/de")), false);
});

test("missing menu-referenced JS prevents publication", (t) => {
	const f = fixture(t);
	fs.rmSync(path.join(f.sourceDir, "htdocs/luci-static/resources/view/fttr/about.js"));
	assert.throws(() => generatePackage(f), /about\.js/);
});

test("missing ACL or translations prevents publication", (t) => {
	const f = fixture(t);
	fs.rmSync(path.join(f.sourceDir, "root/usr/share/rpcd/acl.d/luci-app-fttr.json"));
	assert.throws(() => generatePackage(f), /luci-app-fttr\.json/);
	fs.writeFileSync(path.join(f.sourceDir, "root/usr/share/rpcd/acl.d/luci-app-fttr.json"), '{"luci-app-fttr":{"read":{}}}');
	fs.rmSync(path.join(f.sourceDir, "po/zh_Hans"), { recursive: true });
	assert.throws(() => generatePackage(f), /no translations/);
});

test("invalid versions and legacy build placeholders are rejected", (t) => {
	const f = fixture(t);
	assert.throws(() => generatePackage({ ...f, version: "main;exit" }), /Invalid package version/);
	fs.writeFileSync(path.join(f.sourceDir, "htdocs/placeholder"), "not a resource");
	assert.throws(() => generatePackage(f), /build-time file/);
});
