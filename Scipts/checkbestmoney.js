/** @param {NS} ns */
export async function main(ns) {
	//this checks which servers gives the most max money according to your hack lvl
  
var list = ['home'];
for (let i = 0; i < list.length; i++)
	list.push(...ns.scan(list[i]).filter(hostname => !list.includes(hostname)))

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
