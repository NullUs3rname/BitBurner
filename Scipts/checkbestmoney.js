/** @param {NS} ns */
export async function main(ns) {
	//this checks which servers gives the most max money according to your hack lvl
  
  let list = [];
	let notscanned = ['home'];
	do {
		await ns.sleep(50)
		if (list.includes(notscanned[0]) == false){
			list.push(notscanned[0]);
			let dynamic = ns.scan(notscanned[0])
			dynamic.shift()
			notscanned = notscanned.concat(dynamic)
			notscanned.shift()
		} else {
			notscanned.shift()
		}
	} while (notscanned.length != 0)

    let topnum = 0
	let topname = '';
	for (let i = 0; i < list.length;i++){
		ns.tprint(list[i], " : ", ns.getServerMaxMoney(list[i]))
		if (ns.getServerMaxMoney(list[i]) > topnum && ns.getServerRequiredHackingLevel(list[i]) < ns.getHackingLevel()){
			topnum = ns.getServerMaxMoney(list[i])
			topname = list[i];
		}
	}
	ns.tprint("ERROR ",topnum)
	ns.tprint("ERROR ",topname)
}
