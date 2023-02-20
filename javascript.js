let myLibrary = [
  {'title': 'White Oleander', 'author': 'Janet Fitch', 'pages': '446'},
  {'title': 'Me Talk Pretty One Day', 'author': 'David Sedaris', 'pages': '402'},
  {'title': 'White Oleander', 'author': 'Janet Fitch', 'pages': '446'},
  {'title': 'Me Talk Pretty One Day', 'author': 'David Sedaris', 'pages': '402'},
];


function addBookToLibrary(book) {
}



function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;

  const obj = {'title': this.title, 'author': this.author, 'pages': this.pages, 'read': read, 'id': this.id};
  myLibrary.push(obj);
  console.log(myLibrary);
}

myLibrary.forEach((book) => addBookToLibrary(book));

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const bookTitle = document.getElementById('title').value;
  console.log(bookTitle);

  const bookAuthor = document.getElementById('author').value;
  console.log(bookAuthor);

  const bookPages = document.getElementById('pages').value;
  console.log(bookPages);

  const bookRead = document.getElementById('read');
  console.log(bookRead.checked);

  let readIndicator = "";

  if(bookRead.checked === true) {
    readIndicator = "Read";
    console.log(readIndicator);
  } 
  else {
    readIndicator = "Not Read";
    console.log(readIndicator);
  }

  const bookId = myLibrary.length + 1;

  const book = new Book(bookTitle, bookAuthor, bookPages, readIndicator, bookId);

  form.reset();
})


