const cardsArray = [
  {
    name: "fire",
    img: "./img/fire.png",
  },
  {
    name: "youtube",
    img: "./img/youtube.png",
  },
  {
    name: "flash",
    img: "./img/flash.png",
  },
  {
    name: "gift",
    img: "./img/gift.png",
  },
  {
    name: "tron",
    img: "./img/tron.png",
  },
  {
    name: "ufo",
    img: "./img/ufo.png",
  },
  {
    name: "plant",
    img: "./img/plant.png",
  },
  {
    name: "burger",
    img: "./img/burger.png",
  },
];

const grid = document.querySelector(".grid");
function generate() {
  grid.innerHTML = "";
  const cardArrayRandom = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());
  cardArrayRandom.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.name = item.name;
    const front = document.createElement("div");
    front.className = "front";
    const back = document.createElement("div");
    back.className = "back";
    back.style.backgroundImage = `url(${item.img})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}
//create generate so that we can create it again after game done
generate();
const cards = document.querySelectorAll(".card");
let count = 0;
let firstClick = "";
let secondClick = "";
let delay = 1000;
//matching function when matched
function matchingCard() {
  const selectedItems = grid.querySelectorAll(".selected");
  selectedItems.forEach((item) => item.classList.add("matched"));
}

//after 2 clicks we reset the beginning status of card
function reset() {
  count = 0;
  firstClick = "";
  secondClick = "";
  const selectedItems = grid.querySelectorAll(".selected");
  selectedItems.forEach((item) => item.classList.remove("selected"));
  const matchedItems = grid.querySelectorAll(".matched");
  if (matchedItems.length === cards.length) {
    setTimeout(generate, 800);
  }
}

grid.addEventListener("click", function (e) {
  const clicked = e.target;
  const cardParent = clicked.parentNode;
  if (
    clicked.nodeName === "SECTION" ||
    cardParent.classList.contains("selected") || //which card has selected / matched, cannot click again
    cardParent.classList.contains("matched")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstClick = cardParent.dataset.name;
    } else {
      secondClick = cardParent.dataset.name;
    }
    cardParent.classList.add("selected");

    if (firstClick && secondClick) {
      firstClick === secondClick
        ? setTimeout(matchingCard, delay)
        : setTimeout(reset, delay);
      setTimeout(reset, delay);
    }
  }
});
