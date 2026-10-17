// SPDX-License-Identifier: Apache-2.0

export const STATE_I18N: Record<
	string,
	{ label: string; type: "success" | "warning" | "danger" | "info" | "neutral" }
> = {
	ready: { label: "就绪", type: "success" },
	online: { label: "在线", type: "success" },
	success: { label: "成功", type: "success" },
	offline: { label: "离线", type: "danger" },
	error: { label: "异常", type: "danger" },
	failed: { label: "失败", type: "danger" },
	timeout: { label: "超时", type: "warning" },
	pending: { label: "待处理", type: "warning" },
	running: { label: "执行中", type: "info" },
	unavailable: { label: "不可用", type: "neutral" },
	disabled: { label: "已禁用", type: "neutral" },
	enabled: { label: "已启用", type: "success" },
};

export const I18N_DICT: Record<string, string> = {
	"HL202 sub-gateway management": "HL202 子网关管理",
	"HL202 device": "HL202 设备",
	"Refresh devices": "刷新设备列表",
	"Select a device to inspect reports and run operations.": "选择一个子网关设备以查看遥测报告和执行运维指令。",
	"No HL202 optical devices were found.": "未发现 HL202 光设备。",
	"Loading devices…": "正在加载设备列表…",
	"Invalid device list": "设备列表格式无效",
	"Invalid device identity": "设备标识信息无效",
	"MQTT ready": "MQTT 就绪",
	"MQTT unavailable": "MQTT 不可用",
	"Optical online": "光纤在线",
	"Optical offline": "光纤离线",
	"Invalid binding generation": "绑定代数无效",
	"MQTT source identity": "MQTT 数据源身份诊断",
	"Read-only MQTT source": "只读 MQTT 源",
	"Inspect source report (read-only)": "查看源报告（只读）",
	"Invalid source observation": "源观测数据无效",
	"Open optical status and ONU/MIB details": "打开光模块状态与 ONU/MIB 详情",
	"This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.":
		"该光设备没有最新且确定的 MQTT 绑定，运维指令暂不可用。",
	"MQTT report": "MQTT 遥测报告",
	"Read MQTT report": "读取 MQTT 报告",
	"No MQTT report has been parsed yet.": "尚未解析到任何 MQTT 报告数据。",
	Revision: "修订版本",
	"Last received": "最后接收时间",
	"Last good report": "最后正常报告时间",
	"Latest report error": "最新报告错误",
	Field: "指标字段",
	Value: "数值",
	"Source member": "来源组件",
	"Text omitted at the shared byte limit.": "文本超过共享字节上限已省略。",
	"Binary member; text is unavailable.": "二进制数据，无法显示纯文本。",
	"User management": "用户管理",
	"Read users": "读取用户列表",
	"Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.":
		"密码写入由设备接受并保存；这并不证明具备 Web 登录权限，现有权限掩码予以保留。",
	"Invalid account metadata": "用户元数据无效",
	"New password": "新密码",
	"Set password": "修改密码",
	Disable: "禁用",
	Enable: "启用",
	Enabled: "已启用",
	Disabled: "已禁用",
	"Refresh users to read the current state.": "请刷新用户列表以读取最新状态。",
	"Raw command console": "原生命令控制台",
	"Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.":
		"Shell 脚本直接在所选 ONU 上执行。超时不会取消执行。原始输出可能包含敏感信息。",
	Target: "目标设备",
	"Remote shell command": "远程 Shell 脚本",
	"Timeout in seconds": "超时时间（秒）",
	"Execute on selected HL202": "在所选 HL202 上执行",
	"Timeout must be 1–300 seconds.": "超时时间必须在 1–300 秒之间。",
	"Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.":
		"请输入 64 KiB 以内、不含 NUL 空字符的非空 UTF-8 脚本。",
	"Waiting for device result…": "正在等待设备返回结果…",
	"Another operation is in progress.": "另一个操作正在进行中，请稍候。",
	"Request failed": "请求失败",
	Unknown: "未知",
	State: "状态",
	"Exit code": "退出码",
	"Request ID": "请求 ID",
	"Device binding changed after submission. This result belongs to the original target.":
		"提交后设备绑定已发生变化，此结果属于原目标设备。",
	"Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.":
		"执行结果未知。超时不会中断远端命令；请勿自动重试。",
	"Output was truncated at the byte limit.": "输出内容已达到字节上限并被截断。",
	"Copy output": "复制输出",
	"Clear output": "清空输出",
	"Copied to clipboard": "已复制到剪贴板",
	"Quick diagnostic commands": "快捷诊断命令",
	Execution: "执行结果",
	Duration: "执行耗时",
	"Copy member text": "复制文本",
	"Password updated successfully": "密码修改成功",
	"Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.":
		"查看未绑定或未选定设备的只读 MQTT 遥测报告与数据源诊断。",
	"Raw source observations (JSON)": "原始源观测数据 (JSON)",
};

export function tr(key: string): string {
	const translated = _(key);
	const isZh = /zh/i.test(
		document.documentElement.getAttribute("lang") ||
			(window as unknown as { L?: { env?: { lang?: string } } }).L?.env?.lang ||
			navigator.language ||
			"",
	);
	if (isZh && I18N_DICT[key]) return I18N_DICT[key];
	return translated || key;
}

export const text = (value: unknown): string =>
	value === null || value === undefined || value === "" ? "—" : String(value);

export const date = (value?: number): string => (value ? new Date(value * 1000).toLocaleString() : "—");

export function formatUptime(seconds?: number): string {
	if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return "—";
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	const parts: string[] = [];
	if (days > 0) parts.push(`${days}天`);
	if (hours > 0 || days > 0) parts.push(`${hours}小时`);
	if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}分钟`);
	parts.push(`${secs}秒`);
	return `${parts.join(" ")} (${seconds} s)`;
}

export function renderBadge(
	type: "success" | "warning" | "danger" | "info" | "neutral",
	label: string,
	title?: string,
): HTMLElement {
	return (
		<span class={`hl202-badge hl202-badge-${type}`} title={title}>
			{label}
		</span>
	);
}
