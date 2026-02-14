
const quotes = [
	"You got to motivate yourself! Nobody else is going to do it for you!",
	"Don’t let anybody tell you you can’t do something. If you got a dream, protect it.",
	"Every setback is a setup for a comeback!",
	"Stay positive, stay motivated, and keep hustling!",
	"If you want something, go get it. Period.",
	"Success doesn’t come to you, you go to it!"
];

const quoteEl = document.getElementById('meme-quote');
const btn = document.getElementById('new-quote-btn');

btn.addEventListener('click', () => {
	let newQuote;
	do {
		newQuote = quotes[Math.floor(Math.random() * quotes.length)];
	} while (quoteEl.textContent.trim() === newQuote && quotes.length > 1);
	quoteEl.textContent = newQuote;
});
