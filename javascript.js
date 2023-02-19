let myLibrary = [
  {'title': 'White Oleander', 'author': 'Janet Fitch', 'pages': '446'},
  {'title': 'Me Talk Pretty One Day', 'author': 'David Sedaris', 'pages': '402'},
  {'title': 'White Oleander', 'author': 'Janet Fitch', 'pages': '446'},
  {'title': 'Me Talk Pretty One Day', 'author': 'David Sedaris', 'pages': '402'},
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(data) {
  for (let i = 0; i < data.length; i++) {

    const cardDiv = document.createElement('div');
    document.getElementById('book-cards').appendChild(cardDiv);
    cardDiv.classList.add('book-card');
    cardDiv.setAttribute('id', `card-${i}`);

    const card = document.getElementById(`card-${i}`);
    const bookTitle = document.createElement('div');
    card.appendChild(bookTitle);
    bookTitle.textContent = `${data[i].title}`;
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('div');
    card.appendChild(bookAuthor);
    bookAuthor.textContent = `${data[i].author}`;
    bookAuthor.classList.add('book-author');

    const bookPages = document.createElement('div');
    card.appendChild(bookPages);
    bookPages.textContent = `${data[i].pages} pages`;
    bookPages.classList.add('book-pages');

    const buttonsDiv = document.createElement('div');
    card.appendChild(buttonsDiv);
    buttonsDiv.classList.add('book-card-buttons')

    const readButton = document.createElement('button');
    buttonsDiv.appendChild(readButton);
    readButton.classList.add('read-toggle');
    readButton.innerText = 'Read';

    const deleteButton = document.createElement('button');
    buttonsDiv.appendChild(deleteButton);
    deleteButton.classList.add('delete');
    
    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', 'images/trash-can-regular.png');
    deleteButton.appendChild(deleteIcon);
    deleteIcon.classList.add('delete-img')
  }
}

addBookToLibrary(myLibrary);

