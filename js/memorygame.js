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
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}
generate();

const cards = [...grid.querySelectorAll(".card")];

//click grid
let count = 0;
let firstCLick = "";
let secondClick = "";
let delay = 1200;
let previousCard;
//matching function when matched
function matchingCard() {
  const selectedItems = [...document.querySelectorAll(".selected")];
  selectedItems.forEach((item) => item.classList.add("matched"));
  selectedItems.forEach((item) => item.classList.remove("selected"));
}

//after 2 clicks we reset the beginning status of card
function reset() {
  count = 0;
  firstCLick = "";
  secondClick = "";
  const selectedItems = [...document.querySelectorAll(".selected")];
  selectedItems.forEach((item) => item.classList.remove("selected"));
  const matchedCardsCount = [...document.querySelectorAll(".matched")];
  if (matchedCardsCount.length === cards.length) {
    setTimeout(() => {
      matchedCardsCount.forEach((item) => item.classList.remove("matched"));
    });
    setTimeout(generate, 2000);
  }
}

grid.addEventListener("click", function (e) {
  const cliked = e.target;
  const clickedParent = cliked.parentNode;
  if (
    cliked.nodeName === "SECTION" ||
    clickedParent.classList.contains("selected") ||
    clickedParent.classList.contains("matched")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstCLick = clickedParent.dataset.name;
    } else {
      secondClick = clickedParent.dataset.name;
    }
    clickedParent.classList.add("selected");
    if (firstCLick && secondClick) {
      if (firstCLick === secondClick) {
        setTimeout(matchingCard, 1000);
      }
      setTimeout(reset, delay);
    }
    previousCard = clickedParent;
  }
});
//when finished all, we have to reset all the game
