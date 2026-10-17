import { stdin, open } from 'fs';

let method = ARGV[0];
let path = ARGV[1];
let input = stdin.read(524289);
let body;
try { body = json(input); } catch (_) { die('Invalid request JSON\n'); }
if (length(input) > 524288 || type(body) != 'object' || type(body.target) != 'object')
	die('Invalid request envelope\n');
let target = body.target;
let source_report = method == 'hl202_report' && type(target.mqtt_mac) == 'string';
if (type(target.binding_generation) != 'string' ||
	(!source_report && (type(target.optical_sn) != 'string' || type(target.onu_id) != 'int')))
	die('Invalid target\n');
if (source_report) target = { mqtt_mac: target.mqtt_mac, binding_generation: target.binding_generation };
let action;
switch (method) {
case 'hl202_exec_start':
	if (type(body.script) != 'string' || type(body.timeout_seconds) != 'int') die('Invalid command\n');
	action = { kind: 'exec', script: body.script, timeout_seconds: body.timeout_seconds };
	break;
case 'hl202_accounts_start':
	action = { kind: 'accounts_read' };
	break;
case 'hl202_account_update':
	if (type(body.entry) != 'int') die('Invalid account\n');
	switch (body.kind) {
	case 'account_set_password':
		if (type(body.password) != 'string') die('Invalid password encoding\n');
		action = { kind: body.kind, entry: body.entry, password: body.password };
		break;
	case 'account_set_active':
		if (type(body.active) != 'bool') die('Invalid active state\n');
		action = { kind: body.kind, entry: body.entry, active: body.active };
		break;
	default: die('Unknown account action\n');
	}
	break;
case 'hl202_report': break;
default: die('Unknown method\n');
}
let request = method == 'hl202_report' ? { target } : { schema_version: 1, target, action };
let file = open(path, 'w');
if (!file || !file.write(sprintf('%J', request)) || !file.close()) die('Cannot write request\n');
