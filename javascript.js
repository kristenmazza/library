let myLibrary = [];
let bookCount = 0;

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

  myLibrary.forEach(book => addBookToLibrary(book));
}

// Create new instance of a book
function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.setReadStatus = function(isRead) {
  this.read = isRead;
}

// Save book infomation from form input to create a new book
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const bookPages = document.getElementById('pages').value;
  const bookRead = document.getElementById('read');

  let isRead;

  if(bookRead.checked) {
    isRead = true;
  } 
  else {
    isRead = false;
  }

  const bookId = bookCount;
  bookCount++;

  const book = new Book(bookTitle, bookAuthor, bookPages, isRead, bookId);

  myLibrary.push(book);
  renderBooks();
  form.reset();
})

// Delete book card when delete button or trash can icon is clicked
const container = document.querySelector('#book-cards');
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete') || e.target.classList.contains('delete-img')) {
    const bookToDelete = myLibrary.findIndex(book => book.id.toString() === e.target.getAttribute("data-delete-id"));
    myLibrary.splice(bookToDelete, 1);
    renderBooks();
  }

  if (e.target.classList.contains('read-toggle')) {
    const bookToUpdate = myLibrary.find(book => book.id.toString() === e.target.getAttribute("data-id"));
    bookToUpdate.setReadStatus(!bookToUpdate.read);
    renderBooks();
  }
});

function closeModal() {
  window.location.href = "#";
}