const express = require("express");

// Database
const database = require("./database");

// Initialization
const booky = express();

booky.use(express.json());

/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ book: getSpecificBook });
});
/*
Route           /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       language
Methods         GET
*/
booky.get("/l/:language", (req,res) => {

    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)

    );

    if (getSpecificBook.length === 0){
    return res.json({
        error: `No book found for the language of ${req.params.lang}`,
    });
  }
  return res.json({book: getSpecificBook});
});

/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});

/*
Route           /author/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No Author found for the book of ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthor });
});
/*Route           /author/id
Description     Get specific author based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/
booky.get("/author/:id", (req,res) => {

    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt((req.params.id))

    );

    if (getSpecificAuthor.length === 0){
    return res.json({
        error: `No Author found for the id of ${req.params.id}`,
    });
  }
  return res.json({author: getSpecificAuthor});
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publications", (req, res) => {
  return res.json({ publications: database.publication });
});

/*Route           /publications/id
Description     Get specific publication based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/
booky.get("/publications/:id", (req,res) => {

    const getSpecificPub = database.publication.filter(
        (publication) => publication.id == parseInt(req.params.id)

    );

    if (getSpecificPub.length === 0){
    return res.json({
        error: `No Publication found for the id of ${req.params.id}`,
    });
  }
  return res.json({publication: getSpecificPub});
});

/*
Route           /publications/book
Description     get all authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/publications/book/:isbn", (req, res) => {
    const getSpecificPub = database.publication.filter((publication) =>
      publication.books.includes(req.params.isbn)
    );
  
    if (getSpecificPub.length === 0) {
      return res.json({
        error: `No publication found for the book of ${req.params.isbn}`,
      });
    }
  
    return res.json({ publication: getSpecificPub });
  });

/*
Route           /book/add
Description     get all authors based on books
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", (req,res) => {
  const { newBook } = req.body;
  database.books.push(newBook);
  return res.json({books: database.books})
   
});
/*
Route           /author/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req,res) => {
  const { newAuthor } = req.body;
  database.author.push(newAuthor);
  return res.json({ authors: database.author});
});
/*
Route           /book/add
Description     get all authors based on books
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.put("/book/update/title/:isbn", (req,res) => {
      database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
          book.title = req.body.newBookTitle;
          return;
        }
      })
    return res.json({books: database.books})
});

/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorID", (req,res) => {

    database.books.forEach((book) => {
      if(book.ISBN === req.params.isbn){
        return book.author.push(parseInt(req.params.authorID));
      }
    });
      


    database.books.forEach((author) => {
      if(author.id === parseInt(req.params.authorID)){
        return author.books.push(req.params.isbn);
      }
    });
    return res.json({books: database.books, author:database.author})

});








  booky.listen(3000, () => console.log("Hey Ayaana! We made it!!"));
















