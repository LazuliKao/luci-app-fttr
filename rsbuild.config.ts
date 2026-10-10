import { defineConfig, rspack } from "@rsbuild/core";

export default defineConfig({
	source: {
		entry: {
			index: "./src/view/index.tsx",
			config: "./src/view/config.tsx",
			hardware: "./src/view/hardware.tsx",
		},
		tsconfigPath: "./tsconfig.json",
	},
	output: {
		module: true,
		charset: "ascii",
		distPath: { root: "./htdocs/luci-static/resources/view/fttr", js: "." },
		filename: { js: "[name].js" },
		assetPrefix: "",
		minify: false,
		cleanDistPath: false,
	},
	tools: {
		htmlPlugin: false,
		swc: {
			jsc: {
				parser: { syntax: "typescript", tsx: true },
				transform: {
					react: { runtime: "automatic", importSource: "@lazulikao/luci-types" },
				},
			},
		},
		rspack: (config) => {
			config.output = config.output || {};
			config.optimization = config.optimization || {};
			config.optimization.splitChunks = false;
			config.optimization.runtimeChunk = false;
			config.optimization.minimize = false;
			config.optimization.avoidEntryIife = true;
			config.plugins = config.plugins || [];
			config.plugins.push(
				new rspack.BannerPlugin({ banner: "return main;", raw: true, entryOnly: true, footer: true }),
			);
			return config;
		},
	},
	performance: { chunkSplit: { strategy: "all-in-one" } },
});
