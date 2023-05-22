// Create new instance of a book
class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  setReadStatus(isRead) {
    this.read = isRead;
  }
}

const myLibrary = [
  new Book("Me Talk Pretty One Day", "David Sedaris", "274", true, 0),
  new Book("White Oleander", "Janet Fitch", 480, false, 1),
  new Book("A Man Called Ove", "Fredrik Backman", "337", false, 2),
];
let bookCount = 3;

function addBookToLibrary(book) {
  // Create book card to display in library
  const cardDiv = document.createElement("div");
  document.getElementById("book-cards").appendChild(cardDiv);
  cardDiv.classList.add("book-card");
  cardDiv.setAttribute("id", `card-${book.id}`);
  const card = document.getElementById(`card-${book.id}`);

  // Add title to book card
  const bookTitle = document.createElement("div");
  card.appendChild(bookTitle);
  bookTitle.textContent = `${book.title}`;
  bookTitle.classList.add("book-title");

  // Add author to book card
  const bookAuthor = document.createElement("div");
  card.appendChild(bookAuthor);
  bookAuthor.textContent = `${book.author}`;
  bookAuthor.classList.add("book-author");

  // Add pages to book card
  const bookPages = document.createElement("div");
  card.appendChild(bookPages);
  bookPages.textContent = `${book.pages} pages`;
  bookPages.classList.add("book-pages");

  // Add div for buttons at bottom of card
  const buttonsDiv = document.createElement("div");
  card.appendChild(buttonsDiv);
  buttonsDiv.classList.add("book-card-buttons");

  // Add read/not read button
  const readButton = document.createElement("button");
  buttonsDiv.appendChild(readButton);
  readButton.classList.add("read-toggle");
  readButton.setAttribute("data-id", `${book.id}`);
  if (book.read) {
    readButton.innerText = "Read";
  } else {
    readButton.innerText = "Not Read";
  }

  // Add delete button with trash icon
  const deleteButton = document.createElement("button");
  buttonsDiv.appendChild(deleteButton);
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("data-delete-id", `${book.id}`);
  const deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "images/trash-can-regular.png");
  deleteButton.appendChild(deleteIcon);
  deleteIcon.classList.add("delete-img");
  deleteIcon.setAttribute("data-delete-id", `${book.id}`);
}

// Render all books in the UI, removing any existing books from the DOM first
function renderBooks() {
  const books = document.getElementById("book-cards");
  while (books.hasChildNodes()) {
    books.removeChild(books.firstChild);
  }

  myLibrary.forEach((book) => addBookToLibrary(book));
}

const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const errorTitle = title.nextElementSibling;
const errorAuthor = author.nextElementSibling;
const errorPages = pages.nextElementSibling;

// Explicitly set the valid/invalid class on the input fields
window.addEventListener("load", () => {
  const isTitleValid = title.value.length > 0;
  const isAuthorValid = author.value.length > 0;
  const isPageNumValid = pages.value.length > 0;

  title.className = isTitleValid ? "valid" : "invalid";
  author.className = isAuthorValid ? "valid" : "invalid";
  pages.className = isPageNumValid ? "valid" : "invalid";
});

// Test if the title field is empty on input
title.addEventListener("input", () => {
  const isTitleValid = title.value.length > 0;

  if (isTitleValid) {
    title.className = "valid";
    errorTitle.textContent = "";
    errorTitle.className = "error";
  } else {
    title.className = "invalid";
  }
});

// Test if the author field is empty on input
author.addEventListener("input", () => {
  const isAuthorValid = author.value.length > 0;

  if (isAuthorValid) {
    author.className = "valid";
    errorAuthor.textContent = "";
    errorAuthor.className = "error";
  } else {
    author.className = "invalid";
  }
});

// Test if the pages field is empty on input
pages.addEventListener("input", () => {
  const isPageNumValid = pages.value.length > 0;

  if (isPageNumValid) {
    pages.className = "valid";
    errorPages.textContent = "";
    errorPages.className = "error";
  } else {
    pages.className = "invalid";
  }
});

function closeModal() {
  window.location.href = "#";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Check if form input fields are valid on submit
  const isTitleValid = title.value.length > 0;
  const isAuthorValid = author.value.length > 0;
  const isPageNumValid = pages.value.length > 0;

  if (!isTitleValid || !isAuthorValid || !isPageNumValid) {
    if (!isTitleValid) {
      title.className = "invalid";
      errorTitle.textContent = "Please enter a title";
      errorTitle.className = "error active";
    }
    if (!isAuthorValid) {
      author.className = "invalid";
      errorAuthor.textContent = "Please enter the author";
      errorAuthor.className = "error active";
    }
    if (!isPageNumValid) {
      pages.className = "invalid";
      errorPages.textContent = "Please enter the number of pages";
      errorPages.className = "error active";
    }
    return;
  }

  // If fields are valid, update class name and text content accordingly
  title.className = "valid";
  errorTitle.textContent = "";
  errorTitle.className = "error";
  author.className = "valid";
  errorAuthor.textContent = "";
  errorAuthor.className = "error";
  pages.className = "valid";
  errorPages.textContent = "";
  errorPages.className = "error";

  // Save book infomation from form input to create a new book
  const bookTitle = document.getElementById("title").value;
  const bookAuthor = document.getElementById("author").value;
  const bookPages = document.getElementById("pages").value;
  const bookRead = document.getElementById("read");

  let isRead;

  if (bookRead.checked) {
    isRead = true;
  } else {
    isRead = false;
  }

  const bookId = bookCount;
  bookCount++;

  const book = new Book(bookTitle, bookAuthor, bookPages, isRead, bookId);

  myLibrary.push(book);
  renderBooks();
  closeModal();
  form.reset();
});

// Delete book card when delete button or trash can icon is clicked
const container = document.querySelector("#book-cards");
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("delete") ||
    e.target.classList.contains("delete-img")
  ) {
    const bookToDelete = myLibrary.findIndex(
      (book) => book.id.toString() === e.target.getAttribute("data-delete-id")
    );
    myLibrary.splice(bookToDelete, 1);
    renderBooks();
  }

  if (e.target.classList.contains("read-toggle")) {
    const bookToUpdate = myLibrary.find(
      (book) => book.id.toString() === e.target.getAttribute("data-id")
    );
    bookToUpdate.setReadStatus(!bookToUpdate.read);
    renderBooks();
  }
});

renderBooks();
