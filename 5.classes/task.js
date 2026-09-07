class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;      
    this.type = null;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value < 0) {
      this._state = 0;
    } else if (value > 100) {
      this._state = 100;
    } else {
      this._state = value;
    }
  }

  fix() {
    this.state *= 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}


class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }


  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }


  findBookBy(type, value) {
    const found = this.books.find(item => item[type] === value);
    return found || null;
  }

  
  giveBookByName(bookName) {
    const index = this.books.findIndex(book => book.name === bookName);
    if (index === -1) return null;
    return this.books.splice(index, 1)[0];
  }
}

const library = new Library('Библиотека имени Ленина');

library.addBook(
  new DetectiveBook(
    'Артур Конан Дойл',
    'Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе',
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    'Аркадий и Борис Стругацкие',
    'Пикник на обочине',
    1972,
    168
  )
);
library.addBook(new NovelBook('Герберт Уэллс', 'Машина времени', 1895, 138));
library.addBook(new Magazine('Мурзилка', 1924, 60));

console.log(library.findBookBy('name', 'Властелин колец'));
console.log(library.findBookBy('releaseDate', 1924).name);

console.log('Книг до выдачи:', library.books.length); 
const given = library.giveBookByName('Машина времени');
console.log('Выдана:', given.name);
console.log('Книг после выдачи:', library.books.length);

const book1919 = new Book('Неизвестный автор', 'Тайна 1919 года', 1919, 200);
library.addBook(book1919);
console.log('Добавили книгу 1919, всего:', library.books.length); 

const issued = library.giveBookByName('Тайна 1919 года');
issued.state = 20;                 
console.log('Состояние после повреждения:', issued.state); 
issued.fix();                      
console.log('Состояние после восстановления:', issued.state); 
library.addBook(issued);           
console.log('После попытки возврата (не добавлена):', library.books.length); 

issued.state = 40;
library.addBook(issued);
console.log('После исправления state на 40 и возврата:', library.books.length); 