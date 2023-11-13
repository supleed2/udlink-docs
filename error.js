const info = document.getElementById("error-info");
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get("e") || undefined;

if (error === undefined) {
	window.location.replace("https://docs.udl.ink/");
} else {
	if (error == "tokenid") {
		const domain = urlParams.get("domain");
		info.innerHTML =
			`The Unstoppable Domains API did not return a token ID<br>
			for that domain: ${domain}. You might want to search for the domain<br>
			directly on Etherscan / Opensea / Polygonscan.`;
	} else if (error == "gateway") {
		const gateway = urlParams.get("gateway");
		info.innerHTML =
			`Invalid IPFS Gateway selected for redirect: ${gateway}<br>
			Check available gateways on <a href="https://docs.udl.ink/">the homepage</a>.`;
	} else if (error == "tld") {
		const domain = urlParams.get("domain");
		info.innerHTML =
			`Invalid Unstoppable Domains TLD, requested domain: ${domain}<br>
			Check the domain and try again.`;
	} else if (error == "nohash") {
		const domain = urlParams.get("domain");
		info.innerHTML =
			`No linked IPFS hash for the requested domain: ${domain}<br>
			Check the domain or the Unstoppabe Dashboard and try again.`;
	} else {
		info.innerHTML =
			`Sorry, we're not sure what happened, please try again.`;
	}
}
