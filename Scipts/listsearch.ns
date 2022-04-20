/** @param {NS} ns */
export async function main(ns) {
	let dynamic = ns.args[0]
	if (String(ns.args[0]) == 'undefined') {ns.tprint('No name entered'); return;}
	let path = [];
	do{
		await ns.sleep(50)
		path.unshift(ns.scan(dynamic)[0])
		dynamic = ns.scan(dynamic)[0]

	} while (dynamic != 'home')	
	ns.tprint(path.join('/') + '/' + String(ns.args[0]))
	ns.tprint(path)
		
}
