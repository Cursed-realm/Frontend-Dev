class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isIssued = false;
    this.issuedTo = null;
    this.issueDate = null;
  }

  issueBook(userName) {
    if (this.isIssued) {
      return { success: false, message: `❌ Book already issued to ${this.issuedTo}` };
    }
    this.isIssued = true;
    this.issuedTo = userName;
    this.issueDate = new Date().toLocaleDateString();
    return { success: true, message: `✅ Book issued to ${userName}` };
  }

  returnBook() {
    if (!this.isIssued) {
      return { success: false, message: "❌ Book is not issued" };
    }
    const previousUser = this.issuedTo;
    this.isIssued = false;
    this.issuedTo = null;
    this.issueDate = null;
    return { success: true, message: `✅ Book returned by ${previousUser}` };
  }

  getDetails() {
    return `"${this.title}" by ${this.author} [ISBN: ${this.isbn}]`;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(title, author, isbn) {
    const book = new Book(title, author, isbn);
    this.books.push(book);
    return book;
  }

  findBookByISBN(isbn) {
    return this.books.find(book => book.isbn === isbn);
  }
  getAvailableBooks() {
    return this.books.filter(book => !book.isIssued);
  }
  getIssuedBooks() {
    return this.books.filter(book => book.isIssued);
  }
  displayAvailableBooks() {
    console.log('\n📚 AVAILABLE BOOKS:\n');
    const available = this.getAvailableBooks(); 
    if (available.length === 0) {
      console.log('   No books available.\n');
      return;
    }
    available.forEach((book, index) => {
      console.log(`${index + 1}. ${book.getDetails()}`);
    });
    console.log('');
  }
  issueBookByISBN(isbn, userName) {
    const book = this.findBookByISBN(isbn); 
    if (!book) {
      return { success: false, message: "❌ Book not found with this ISBN" };
    }
    return book.issueBook(userName);
  }
}
console.log('═'.repeat(80));
console.log('                        LIBRARY MANAGEMENT SYSTEM');
console.log('═'.repeat(80));
const library = new Library("City Central Library");
library.addBook("To Kill a Mockingbird", "Harper Lee", "ISBN001");
library.addBook("1984", "George Orwell", "ISBN002");
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "ISBN003");
library.displayAvailableBooks();
console.log('─'.repeat(80));
console.log('                          ISSUE BOOKS');
console.log('─'.repeat(80));
console.log('\n🔍 Issuing ISBN001 to Alice...');
const result1 = library.issueBookByISBN("ISBN001", "Alice");
console.log(result1.message);
console.log('\n🔍 Trying to issue ISBN001 to Bob...');
const result2 = library.issueBookByISBN("ISBN001", "Bob");
console.log(result2.message);
console.log('\n🔍 Issuing ISBN002 to Charlie...');
const result3 = library.issueBookByISBN("ISBN002", "Charlie");
console.log(result3.message);
library.displayAvailableBooks();
console.log('─'.repeat(80));
console.log('                       ISSUED BOOKS STATUS');
console.log('─'.repeat(80));
const issuedBooks = library.getIssuedBooks();
console.log(`\n📖 Currently Issued: ${issuedBooks.length} book(s)\n`);
issuedBooks.forEach((book, index) => {
  console.log(`${index + 1}. ${book.getDetails()}`);
  console.log(`   Issued to: ${book.issuedTo} on ${book.issueDate}\n`);
});
console.log('═'.repeat(80));