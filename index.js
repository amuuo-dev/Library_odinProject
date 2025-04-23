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
console.log(myLibrary);
