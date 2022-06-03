/** @param {NS} ns */
export async function main(ns) {
	//this is my big wombo combo
	//it nukes all avalible servers depending on how much hacks u have
	//and also autohacks
	//BTW THIS IS PRETTY TRASH SINCE ITS SO LONG .. 
	
	//best if you run twice since first time will be a console blurb
	
	
	//GET ALL SERVERS
	var list = ['home'];
	for (let i = 0; i < list.length; i++)
		list.push(...ns.scan(list[i]).filter(hostname => !list.includes(hostname)))
	ns.tprint(list)
	
	let num = list.length

	var sQLI = false
	var hTTP = false
	var relay = false
	var ftp = false
	var ssh = false

	var usedhacks = [];

	//HACK CHECK
	let hacks = [];
	if (ns.fileExists('SQLInject.exe', 'home') == true) {
		hacks.push('SQLInject.exe');
		sQLI = true;
	}
	if (ns.fileExists('HTTPWorm.exe', 'home') == true) {
		hacks.push('HTTPWorm.exe');
		hTTP = true;
	}
	if (ns.fileExists('relaySMTP.exe', 'home') == true) {
		hacks.push('relaySMTP.exe');
		relay = true;
	}
	if (ns.fileExists('FTPCrack.exe', 'home') == true) {
		hacks.push('FTPCrack.exe');
		ftp = true;
	}
	if (ns.fileExists('BruteSSH.exe', 'home') == true) {
		hacks.push('BruteSSH.exe');
		ssh = true;
	}




	// CHECK / NUKE

	for (let curr = 0; curr < num; curr++) {
		if(ns.hasRootAccess(list[curr]) == true){
			ns.tprint('INFO ', list[curr], " HAS ROOT")
		}
		if (ns.hasRootAccess(list[curr]) == false) {
			try {
				ns.nuke(list[curr]);
			} catch (error) {
				ns.tprint('ERROR ON SERVER: ', list[curr], " : ", error.substring(56));
				let trouble = error.includes("Not enough ports opened to use NUKE.exe virus");
				if (trouble == true) {
					ns.tprint('WARN LACK OF PORTS DETECTED, ATTEMPTING TO OPEN PORTS');
					ns.tprint('WARN ', hacks.length, " hacks detected", " (", hacks, ")")
					if (ns.getServerNumPortsRequired(list[curr]) <= hacks.length) {
						ns.tprint('INFO - Sufficient hacks detected running hacks now... ')
						if (sQLI == true) {
							ns.sqlinject(list[curr])
							usedhacks.push('SQLInjection.exe')
						}
						if (hTTP == true) {
							ns.httpworm(list[curr])
							usedhacks.push('HttpWorm.exe')
						}
						if (relay == true) {
							ns.relaysmtp(list[curr])
							usedhacks.push('RelaySMTP.exe')
						}
						if (ftp == true) {
							ns.ftpcrack(list[curr])
							usedhacks.push('FTPCrack.exe')
						}
						if (ssh == true) {
							ns.brutessh(list[curr])
							usedhacks.push('BruteSSH.exe')
						}
						if (sQLI == false && hTTP == false && relay == false && ftp == false && ssh == false) {
							ns.tprint('ERROR OCCURED (can be caused to already attempting to crack server please do manually)')
						}
						try {
							ns.nuke(list[curr])
							
						} catch (error){
								ns.tprint('ERROR NOT ENOUGH AVALIABLE HACKS USED HACKS: ', usedhacks)
						}
						ns.tprint('INFO NUKED AND HACKED ', list[curr])

					}
					else {
						ns.tprint("ERROR NOT ENOUGH HACKS TO NUKE")
					}
				}
			}
		}
	};
}
