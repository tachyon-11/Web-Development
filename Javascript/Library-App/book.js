export default class Book {
  constructor(title, author, ISBN, publisher, publishedDate, bookCoverURL, read, summary) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.publisher = publisher;
    this.publishedDate = publishedDate;
    this.bookCoverURL = bookCoverURL;
    this.read = read;
    this.summary = summary;
  }
}