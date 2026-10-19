import { defineConfig, rspack } from "@rsbuild/core";

export default defineConfig({
	source: {
		entry: {
			index: "./src/view/index.tsx",
			config: "./src/view/config.tsx",
			hardware: "./src/view/hardware.tsx",
			sync: "./src/view/sync.tsx",
			hl202: "./src/view/hl202.tsx",
		},
		tsconfigPath: "./tsconfig.json",
	},
	output: {
		module: true,
		charset: "ascii",
		distPath: { root: "./package/luci-app-fttr/htdocs/luci-static/resources/view/fttr", js: "." },
		filename: { js: "[name].js" },
		assetPrefix: "",
		minify: true,
		cleanDistPath: false,
	},
	tools: {
		htmlPlugin: false,
		swc: {
			jsc: {
				parser: { syntax: "typescript", tsx: true },
				transform: {
					react: { runtime: "automatic", importSource: "@lazulikao/luci-types" },
					optimizer: {
						simplify: true,
					},
				},
				minify: {
					compress: true,
					// The LuCI footer references this name outside the module transform.
					mangle: { reserved: ["main"] },
				},
			},
		},
		rspack: (config) => {
			config.output = config.output || {};
			config.optimization = config.optimization || {};
			config.optimization.splitChunks = false;
			config.optimization.runtimeChunk = false;
			config.optimization.minimize = true;
			config.optimization.minimizer = [
				new rspack.SwcJsMinimizerRspackPlugin({
					minimizerOptions: {
						module: false, 
						minify: false,
						compress: { toplevel: true, top_retain: ["main"] },
						mangle: { toplevel: true, reserved: ["main"] },
					},
				}),
			];
			config.optimization.avoidEntryIife = true;
			config.plugins = config.plugins || [];
			config.plugins.push(
				new rspack.BannerPlugin({
					// LuCI injects dependency aliases as parameters; avoid bundled local names.
					banner: [
						"'use strict';",
						...["view", "rpc", "ui", "uci", "form", "poll", "dom"].map(
							(name) => `'require ${name} as __fttr_${name}';`,
						),
					].join("\n"),
					raw: true,
					entryOnly: true,
					// Add LuCI directives and the top-level return only after minification.
					stage: rspack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
				}),
				new rspack.BannerPlugin({
					banner: "return main;",
					raw: true,
					entryOnly: true,
					footer: true,
					stage: rspack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
				}),
			);
			return config;
		},
	},
	performance: { chunkSplit: { strategy: "all-in-one" } },
});
