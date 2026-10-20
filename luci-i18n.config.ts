import { defineConfig } from "@lazulikao/luci-types/i18n";

export default defineConfig({
	packageName: "luci-app-fttr",
	input: ["src/view"],
	pot: "package/luci-app-fttr/po/templates/fttr.pot",
	extractPot: true,
	merge: true,

	translate: {
		enabled: false,
		translator: "openai",
		batchSize: 20,
	},

	headers: {
		languageTeam: "ai",
	},

	locales: [
		{
			locale: "zh_Hans",
			po: "package/luci-app-fttr/po/zh_Hans/fttr.po",
			headers: {
				languageTeam: "LazuliKao",
			}
		},
	],
});
