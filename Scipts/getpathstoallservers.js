/** @param {NS} ns */
export async function main(ns) {
	let servers = [];
	let notscanned = ['home'];
	do {
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
	} while (notscanned.length != 0)
	
	let path = [];
	let dynamic = '';
	for (let i = 0; i < servers.length; i++){
		path = [];
		dynamic = servers[i]
		do{
			await ns.sleep(50)
			path.unshift(ns.scan(dynamic)[0])
			dynamic = ns.scan(dynamic)[0]
		} while (dynamic != 'home')
		ns.tprint(path.join('/') + '/' + String(servers[i]))
	}
}
