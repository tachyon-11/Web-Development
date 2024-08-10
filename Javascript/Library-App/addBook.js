import Book from "./book.js";

let books = [
  new Book(
    "Harry Potter and the Order of the Phoenix",
    "J.K. Rowling",
    "978-0439358071",
    "Bloomsbury",
    "2003-06-21",
    "https://example.com/harry-potter-order-of-phoenix-cover.jpg",
    false,
    "Harry Potter returns to Hogwarts for his fifth year and faces new challenges, including a dark conspiracy against him."
  ),
  new Book(
    "The Da Vinci Code",
    "Dan Brown",
    "978-0307474278",
    "Doubleday",
    "2003-03-18",
    "https://example.com/da-vinci-code-cover.jpg",
    false,
    "A symbologist and a cryptologist unravel clues in the works of Leonardo da Vinci to solve a murder and uncover a secret society."
  ),
  new Book(
    "Percy Jackson & the Olympians: The Lightning Thief",
    "Rick Riordan",
    "978-0786838653",
    "Disney-Hyperion",
    "2005-07-01",
    "https://example.com/percy-jackson-lightning-thief-cover.jpg",
    false,
    "A twelve-year-old boy discovers he is the son of Poseidon and embarks on a quest to prevent a war among the gods."
  ),
  new Book(
    "Steve Jobs",
    "Walter Isaacson",
    "978-1451648539",
    "Simon & Schuster",
    "2011-10-24",
    "https://example.com/steve-jobs-cover.jpg",
    false,
    "A biography of Steve Jobs, the co-founder of Apple Inc., detailing his life, work, and the impact he had on the technology industry."
  ),
  new Book(
    "Sapiens: A Brief History of Humankind",
    "Yuval Noah Harari",
    "978-0062316097",
    "Harper",
    "2015-02-10",
    "https://example.com/sapiens-cover.jpg",
    false,
    "An exploration of the history of humankind, examining how Homo sapiens came to dominate the world."
  )
];

console.log(books);

const addBookButton = document.querySelector(".add-book-button");
const formPopup = document.querySelector("dialog");
const viewBooks = document.querySelector(".view-books");

addBookButton.addEventListener("click", () => {
  formPopup.replaceChildren();
  const formContainer = document.createElement("div");
  formContainer.id = "form-container";
  formContainer.className = "form-container";
  let form = document.createElement("form");
  form.id = "book-form";

  const fields = [
    { label: "Title:", type: "text", id: "title", name: "title" },
    { label: "Author:", type: "text", id: "author", name: "author" },
    { label: "ISBN:", type: "text", id: "isbn", name: "isbn" },
    { label: "Publisher:", type: "text", id: "publisher", name: "publisher" },
    {
      label: "Published Date:",
      type: "date",
      id: "publishedDate",
      name: "publishedDate",
    },
    {
      label: "Book Cover URL:",
      type: "url",
      id: "bookCoverURL",
      name: "bookCoverURL",
    },
    { label: "Summary:", type: "textarea", id: "summary", name: "summary" },
  ];

  fields.forEach((field) => {
    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label;
    form.appendChild(label);

    let input;
    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 4;
    } else {
      input = document.createElement("input");
      input.type = field.type;
    }
    input.id = field.id;
    input.name = field.name;
    input.required = true;
    form.appendChild(input);
  });

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.textContent = "Read:";
  form.appendChild(readLabel);

  const readCheckbox = document.createElement("input");
  readCheckbox.type = "checkbox";
  readCheckbox.id = "read";
  readCheckbox.name = "read";
  form.appendChild(readCheckbox);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Add Book";

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    const publisher = document.getElementById("publisher").value;
    const publishedDate = document.getElementById("publishedDate").value;
    const bookCoverURL = document.getElementById("bookCoverURL").value;
    const summary = document.getElementById("summary").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(
      title,
      author,
      isbn,
      publisher,
      publishedDate,
      bookCoverURL,
      read,
      summary
    );

    console.log(newBook);
    books.push(newBook);

    const newCard = document.createElement("div");
    newCard.className = "book-card";

    const bookTitle = document.createElement("div");
    bookTitle.className = "book-title";
    bookTitle.textContent = title;
    newCard.appendChild(bookTitle);

    const bookAuthor = document.createElement("div");
    bookAuthor.className = "book-info";
    bookAuthor.textContent = `Author: ${author}`;
    newCard.appendChild(bookAuthor);

    const bookYear = document.createElement("div");
    bookYear.className = "book-info";
    bookYear.textContent = `Published Date: ${publishedDate}`;
    newCard.appendChild(bookYear);

    viewBooks.appendChild(newCard);
    
    formPopup.close();
  });

  form.appendChild(submitButton);
  formContainer.appendChild(form);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    formPopup.close();
  });

  formContainer.appendChild(closeBtn);
  formPopup.appendChild(formContainer);
  formPopup.showModal();
});
