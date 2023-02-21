let myLibrary = [];

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
  if (book.read === true) {
    readButton.innerText = "Read";
  } else {
    readButton.innerText = "Not Read";
  }
  
  // Add delete button with trash icon
  const deleteButton = document.createElement("button");
  buttonsDiv.appendChild(deleteButton);
  deleteButton.classList.add("delete");
  deleteButton.setAttribute("id", `delete-${book.id}`);
  const deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "images/trash-can-regular.png");
  deleteButton.appendChild(deleteIcon);
  deleteIcon.classList.add("delete-img");
  deleteIcon.setAttribute("id", `delete-img-${book.id}`);
}

// Create object with book info to add to library and myLibrary array
function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;

  const obj = {'title': this.title, 'author': this.author, 'pages': this.pages, 'read': read, 'id': this.id};
  myLibrary.push(obj);
  addBookToLibrary(obj);
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

  if(bookRead.checked === true) {
    isRead = true;
  } 
  else {
    isRead = false;
  }

  const bookId = myLibrary.length + 1;

  const book = new Book(bookTitle, bookAuthor, bookPages, isRead, bookId);

  form.reset();
})

// Delete book card when delete button or trash can icon is clicked
const container = document.querySelector('#book-cards');
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete') || e.target.classList.contains('delete-img')) {
    console.log(e.target.id);

    e.target.closest('.book-card').remove();
  }
});


