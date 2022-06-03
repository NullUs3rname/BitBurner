/** @param {NS} ns */
export async function main(ns) {
	var list = ['home'];
	for (let i = 0; i < list.length; i++)
		list.push(...ns.scan(list[i]).filter(hostname => !list.includes(hostname)))
	let path = [];
	let dynamic = '';
	for (let i = 0; i < list.length; i++){
		path = [];
		dynamic = list[i]
		do{
			await ns.sleep(50)
			path.unshift(ns.scan(dynamic)[0])
			dynamic = ns.scan(dynamic)[0]
		} while (dynamic != 'home')
		window[list[i]] = path.concat(list[i]) 
		ns.tprint(path.join('/') + '/' + String(list[i]))
	}
	ns.tprint(window['defcomm']) //search a name and bring its path up
}
