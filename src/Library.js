class Library {
    constructor() {
      this.books = [];
      this.members = [];
    }
  
    addBook(book) {
      this.books.push(book);
    }
  
    registerMember(member) {
      this.members.push(member);
    }
  
    borrowBook(memberId, bookId) {
      const member = this.members.find(member => member.id === memberId);
      if (!member) {
        throw new Error('Member not found');
      }
  
      const book = this.books.find(book => book.id === bookId);
      if (!book) {
        throw new Error('Book not found');
      }
  
      const overdueBooks = this.checkOverdueBooks(memberId);
      if (overdueBooks.length > 0) {
        throw new Error('Cannot borrow book. Member has overdue books.');
      }
  
      if (member.booksBorrowed.length >= member.maxBooksAllowed) {
        throw new Error('Maximum books borrowed reached');
      }
  
      if (book.borrowed) {
        throw new Error('Book is already borrowed');
      }
  
      book.borrowed = true;
      member.booksBorrowed.push(book);
    }
  
    returnBook(memberId, bookId) {
      const member = this.members.find(member => member.id === memberId);
      if (!member) {
        throw new Error('Member not found');
      }
  
      const book = member.booksBorrowed.find(book => book.id === bookId);
      if (!book) {
        throw new Error('Book not found in member\'s borrowed list');
      }
  
      book.borrowed = false;
      member.booksBorrowed = member.booksBorrowed.filter(b => b.id !== bookId);
    }
  
    checkOverdueBooks(memberId) {
      const member = this.members.find(member => member.id === memberId);
      if (!member) {
        throw new Error('Member not found');
      }
  
      const borrowedBooks = member.booksBorrowed.filter(book => book.dueDate < new Date());
      return borrowedBooks;
    }
  }
  
  class Book {
    constructor(id, title, author) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.borrowed = false;
      this.dueDate = null;
    }
  }
  
  class Member {
    constructor(id, name, maxBooksAllowed) {
      this.id = id;
      this.name = name;
      this.maxBooksAllowed = maxBooksAllowed;
      this.booksBorrowed = [];
    }
  }
  
  module.exports = { Library, Book, Member };
  