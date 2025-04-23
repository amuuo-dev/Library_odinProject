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

Book.prototype.toggleReadStatus = function () {
  if (this.readStatus === "Not Read") {
    this.readStatus = "Read";
  } else {
    this.readStatus = "Not Read";
  }
};

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
    div.dataset.id = book.id;
    container.appendChild(div);

    for (const [key, value] of Object.entries(book)) {
      div.textContent += `${key.toUpperCase()} = ${value}\n`;
    }
  }
  addButtons();
}
displayBook();

function addButtons() {
  const divs = document.querySelectorAll(".container div");
  Array.from(
    divs.forEach((div) => {
      let removeButton = document.createElement("button");
      removeButton.classList.add("remove");
      div.appendChild(removeButton);
      removeButton.textContent = "Remove Book";

      removeButton.addEventListener("click", (event) => {
        //where the button was clicked..find the exact div
        const parentDiv = event.target.parentElement;
        const bookId = parentDiv.dataset.id;
        console.log(bookId);

        for (const book of myLibrary) {
          if (book.id === bookId) {
            myLibrary.splice(book, 1);
            displayBook();
            break;
          }
        }
      });

      let toggleBtn = document.createElement("button");
      toggleBtn.classList.add("toggle");
      toggleBtn.textContent = "Toggle Read Status";
      div.appendChild(toggleBtn);

      toggleBtn.addEventListener("click", (event) => {
        const parentDiv = event.target.parentElement;
        const bookId = parentDiv.dataset.id;

        for (const book of myLibrary) {
          if (book.id === bookId) {
            book.toggleReadStatus();
            displayBook();
            break;
          }
        }
      });
    })
  );
}

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
