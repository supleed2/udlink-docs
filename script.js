const prefix = document.getElementById("input-prefix");
const userInput = document.getElementById("user-input");
const exampleTexts = [
	"8bitsquid.x",
	"3blocks.x",
	"kooheji.crypto",
	"charlielowndes.nft",
	"bro.nft",
	"virtualjester.x",
	"sandy.nft",
	"0xcryptopapi.x",
];
const carousel = document.querySelector(".carousel");
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");
let currentIndex = 0;
let typing = true;
let typingIndex = 0;
let userInputClear = true;
let flashCount = 0;

scrollLeftButton.addEventListener("click", () => {
	carousel.scrollBy({
		left: -480, // Scroll 3 options to the left
		behavior: 'smooth' // Use smooth scrolling
	});
});

scrollRightButton.addEventListener("click", () => {
	carousel.scrollBy({
		left: 480, // Scroll 3 options to the right
		behavior: 'smooth' // Use smooth scrolling
	});
});

function animateGhostText() {
	if (userInput.value === "") {
		if (typing) {
			userInput.placeholder = exampleTexts[currentIndex].substring(0, typingIndex++) + "|";
			if (typingIndex > exampleTexts[currentIndex].length) {
				typing = false;
				setTimeout(() => { if (userInputClear) animateGhostText() }, 200);
			} else {
				setTimeout(() => { if (userInputClear) animateGhostText() }, 200);
			}
		} else {
			if (flashCount < 5) {
				userInput.placeholder = exampleTexts[currentIndex].substring(0, typingIndex) + ((flashCount % 2) ? "" : "|");
				flashCount++;
				setTimeout(() => { if (userInputClear) animateGhostText() }, 500);
				return;
			}
			userInput.placeholder = exampleTexts[currentIndex].substring(0, typingIndex--) + "|";
			if (typingIndex === 0) {
				typing = true;
				flashCount = 0;
				currentIndex = (currentIndex + 1) % exampleTexts.length;
				setTimeout(() => { if (userInputClear) animateGhostText() }, 200);
			} else {
				setTimeout(() => { if (userInputClear) animateGhostText() }, 100);
			}
		}
	} else {
		userInput.placeholder = "";
	}
}

userInput.addEventListener("input", () => {
	if (userInput.value === "") {
		typingIndex = 0;
		typing = true;
		flashCount = 0;
		userInputClear = true;
		animateGhostText();
	} else {
		userInput.placeholder = "";
		userInputClear = false;
	}
});

animateGhostText();

document.querySelector(".collapsible").addEventListener("click", function () {
	this.classList.toggle("active");
	carousel.style.maxHeight = carousel.style.maxHeight ? null : carousel.scrollHeight + "px";
});

Array.from(document.getElementsByClassName("option")).forEach(option => {
	option.addEventListener("click", () => {
		document.documentElement.style.setProperty("--input-prefix-width", option.getAttribute("data-prefix").length + "0px");
		prefix.textContent = option.getAttribute("data-prefix");
	});
});

async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error("Failed to copy text: ", err);
		return false;
	}
}

const inputButton = document.getElementById("copy-button");
const copyIcon = inputButton.innerHTML;
const copiedIcon = document.getElementById("copied-tick").cloneNode(true);
copiedIcon.style.display = "";
inputButton.addEventListener("click", async () => {
	if (userInput.value !== "") {
		if (await copyToClipboard(`${prefix.textContent}${userInput.value}`)) {
			// Change button content to a checkmark
			inputButton.innerHTML = copiedIcon.outerHTML;

			// Revert button content back after 1 second
			setTimeout(() => {
				inputButton.innerHTML = copyIcon;
			}, 1000);
		} else {
			alert(`Your browser does not support copying to clipboard, please copy the link below manually:\nhttps://${prefix.textContent}${userInput.value}`);
		}
	} else {
		alert("Please enter an Unstoppable Domain to link to");
	}
});

document.getElementById("go-now").addEventListener("click", () => {
	if (userInput.value !== "") {
		window.open(`https://${prefix.textContent}${userInput.value}`, "_blank");
	} else {
		alert("Please enter an Unstoppable Domain to go to");
	}
});

document.addEventListener("DOMContentLoaded", (e) => {
	const counter = document.getElementById("request-count");
	fetch("/requestcount").then(r => r.text())
		.then(r => counter.textContent = Number(r.trim()).toLocaleString());
});
