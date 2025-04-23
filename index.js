const myLibrary = [];

function Book(id, title, author, pages, readStatus) {
  if (!new.target) {
    throw new Error("use the new keyword when calling this constructor");
  }

  (this.id = id),
    (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.readStatus = readStatus);
}

function addBookToLibrary(title, author, pages, readStatus) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, readStatus);
  myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R Tolkein", 295, "Not read");
addBookToLibrary("The Alchemist", "Paolo Coelho", 208, "Not read");
addBookToLibrary("The Three Musketeers", "Alexandre Dumas", 398, "Not read");

let container = document.querySelector(".container");

function displayBook() {
  container.textContent = "";
  for (const book of myLibrary) {
    const div = document.createElement("div");
    div.style.whiteSpace = "pre-line";
    container.appendChild(div);

    for (const [key, value] of Object.entries(book)) {
      div.textContent += `${key.toUpperCase()} = ${value}\n`;
    }
  }
}
displayBook();

let dialog = document.querySelector("#dialog");
let newBookBtn = document.querySelector("#newbook-btn");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

const submitBtn = document.querySelector("dialog button");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, readStatus.value);
  displayBook();
  dialog.close();
});
