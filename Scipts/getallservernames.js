/** @param {NS} ns */
export async function main(ns) {
	let servers = [];
	let notscanned = ['home'];
	while (notscanned.length != 0) {
		await ns.sleep(50)
		if (servers.includes(notscanned[0]) == false){
			servers.push(notscanned[0]);
			let dynamic = ns.scan(notscanned[0])
			dynamic.shift()
			notscanned = notscanned.concat(dynamic)
			notscanned.shift()
		} else {
			notscanned.shift()
		}
	}
	ns.tprint(servers)
}
