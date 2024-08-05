const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

const paragraph = document.createElement("p");
paragraph.textContent = "This is the paragraph with red font color.";
paragraph.style.color = "red";

const paragraph1 = document.createElement("p");
paragraph1.textContent = "This is the paragraph with blue font color.";
paragraph1.style.color = "blue";

const head3 = document.createElement("h3");
head3.textContent = "This is h3 heading";
head3.style.color = "pink";

container.appendChild(head3);
container.appendChild(paragraph);
container.appendChild(paragraph1);
container.appendChild(content);


