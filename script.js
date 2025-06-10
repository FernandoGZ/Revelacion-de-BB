
const phrase = "EL BEBÉ ESPERADO ES NIÑO";
const board = document.getElementById("board");
const revealedPhrase = document.getElementById("revealed-phrase");
let finalMessage = document.createElement("div");
finalMessage.id = "final-message";
document.body.appendChild(finalMessage);

const symbols = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍒", "🍉", "🍑", "🥭", "🍋"];
let cards = symbols.concat(symbols).slice(0, phrase.length).sort(() => 0.5 - Math.random());

let flipped = [];
let matched = 0;

cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = "";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
});

function flipCard(card) {
    if (flipped.length === 2 || card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    card.innerText = card.dataset.symbol;
    flipped.push(card);

    if (flipped.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [a, b] = flipped;
    if (a.dataset.symbol === b.dataset.symbol) {
        matched++;
        revealedPhrase.innerText = phrase.slice(0, matched * 2);
        if (matched * 2 >= phrase.length) {
            finalMessage.innerText = phrase;
        }
    } else {
        a.classList.remove("flipped");
        b.classList.remove("flipped");
        a.innerText = "";
        b.innerText = "";
    }
    flipped = [];
}
