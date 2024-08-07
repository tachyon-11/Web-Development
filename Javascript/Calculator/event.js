const display = document.querySelector("#display");
const clearButton = document.querySelector(".clear");
const signButton = document.querySelector(".sign");
const operator = document.querySelectorAll(".operator");
const operand = document.querySelectorAll(".operand");
const decimal = document.querySelectorAll(".decimal");
const equalButton = document.querySelector(".equals");
const buttons = document.querySelectorAll("button");

var content = "";
var num1 = "";
var num2 = "";
var mathop = "";
var bool = true;

signButton.addEventListener("click", ()=>{
  var number = parseFloat(content);
  var negativeNumber = -number;
  content = negativeNumber.toString();
  display.textContent = content;
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

operand.forEach((button) => {
  button.addEventListener("click", () => {
    if (!bool) {
      content = "";
      bool = true;
    }
    content += button.value;
    display.textContent = content;
  });
});

operator.forEach((button) => {
  button.addEventListener("click", () => {
    bool = false;
    if (num1 === "" && num2 === "") {
      num1 = content;
      content = "";
    } else {
      num2 = content;
      content = "";
      const int1 = Number(num1);
      const int2 = Number(num2);
      content = String(solve(int1, int2, mathop));
      display.textContent = content;
      num1 = content;
      num2 = "";
    }
    mathop = button.value;
  });
});

equalButton.addEventListener("click", () => {
  num2 = content;
  content = "";
  const int1 = Number(num1);
  const int2 = Number(num2);
  content = String(solve(int1, int2, mathop));
  display.textContent = content;
  num1 = content;
  num2 = "";
  content = "";
  bool = true;
});

function solve(num1, num2, operation) {
  if (operation === "+") {
    return num1 + num2;
  } else if (operation === "-") {
    return num1 - num2;
  } else if (operation === "*") {
    return num1 * num2;
  } else if (operation === "/") {
    var numbers = num1 / num2;
    return numbers.toFixed(2)
  } else if (operation === "%") {
    return num1 % num2;
  } 
}

clearButton.addEventListener("click", () => {
  content = "";
  num1 = "";
  num2 = "";
  bool = true;
  display.textContent = "0";
});
