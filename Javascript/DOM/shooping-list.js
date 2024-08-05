const list = document.querySelector("ul");
const input = document.querySelector("input");
const btn = document.querySelector("button");


btn.addEventListener("click", addItem);

function addItem(){
  inputText = input.value;
  if(inputText!=""){
    var listItem = document.createElement("li");
    list.setAttribute("id", inputText);
    listItem.appendChild(document.createTextNode(inputText));
    
    var deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    deleteButton.addEventListener('click', () => {
      list.removeChild(listItem);
    });

    input.value='';
    input.focus();
  }
}

