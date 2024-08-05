const drawingBoard = document.querySelector("#drawing-board");
const gridSize = document.getElementById("grid-size");
const gridSizeNumber = document.querySelector("#grid-size-number");
const colorPicker = document.querySelector("#color-picker");
const eraser = document.querySelector("#eraser-button");
const paint = document.querySelector("#paint-button");
const rainbow = document.querySelector("#rainbow-button");
const clear = document.querySelector("#clear-button");
const black = document.querySelector("#black-button");

var eraserClicked = false;
var paintClicked = true;
var rainbowClicked = false;
var blackClicked = false;

const hexCharacters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

function getCharacter(index) {
	return hexCharacters[index]
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function generateNewColor() {
	let hexColorRep = "#"

	for (let index = 0; index < 6; index++){
		const randomPosition = getRandomInt(0, 15);
    hexColorRep += getCharacter( randomPosition )
	}
	
	return hexColorRep
}

function windowLoad(divNum) {
  const newDivSide = drawingBoard.offsetHeight / divNum - 1;
  drawingBoard.innerHTML = '';
  for (let i = 0; i < divNum ** 2; i++) {
    const newDiv = document.createElement("div");
    newDiv.style.height = `${newDivSide}px`;
    newDiv.style.width = `${newDivSide}px`;
    newDiv.dataset.hoverCount = 3;
    newDiv.style.transition = "background-color 0.2s, opacity 0.2s";
    
    newDiv.addEventListener("mouseover", () => {
      const color = colorPicker.value;
      
      if (eraserClicked) {
        newDiv.style.backgroundColor = "#eee";
        newDiv.style.opacity = 1;
      } else if(paintClicked){
        newDiv.style.backgroundColor = color;
        let hoverCount = parseInt(newDiv.dataset.hoverCount, 10);
        hoverCount++;
        newDiv.dataset.hoverCount = hoverCount;
        let newOpacity = Math.min(1, hoverCount * 0.1);
        newDiv.style.opacity = newOpacity;
      } else if(rainbowClicked){
        colorPicker.value = generateNewColor();
        newDiv.style.backgroundColor = colorPicker.value;
        let hoverCount = parseInt(newDiv.dataset.hoverCount, 10);
        hoverCount++;
        newDiv.dataset.hoverCount = hoverCount;
        let newOpacity = Math.min(1, hoverCount * 0.1);
        newDiv.style.opacity = newOpacity;
      } else if(blackClicked){
        colorPicker.value = "#000000";
        newDiv.style.backgroundColor = colorPicker.value;
        let hoverCount = parseInt(newDiv.dataset.hoverCount, 10);
        hoverCount++;
        newDiv.dataset.hoverCount = hoverCount;
        let newOpacity = Math.min(1, hoverCount * 0.1);
        newDiv.style.opacity = newOpacity;
      }
    });

    drawingBoard.appendChild(newDiv);
  }
}

windowLoad(16);

gridSize.addEventListener("input", () => {
  const gridval = gridSize.value;
  gridSizeNumber.textContent = gridval + "x" + gridval;
  windowLoad(gridval);
});

eraser.addEventListener("focus", () => {
  eraserClicked = true;
});

eraser.addEventListener("blur", () => {
  eraserClicked = false;
});

paint.addEventListener("focus", () => {
  paintClicked = true;
});

paint.addEventListener("blur", () => {
  paintClicked = false;
});

rainbow.addEventListener("focus", () => {
  rainbowClicked = true;
});

rainbow.addEventListener("blur", () => {
  rainbowClicked = false;
});

clear.addEventListener("click", () => {
  const gridval = gridSize.value;
  windowLoad(gridval);
});

black.addEventListener("focus", () => {
  blackClicked = true;
  colorPicker.value = "#000000";
});

black.addEventListener("blur", () => {
  blackClicked = false;
});