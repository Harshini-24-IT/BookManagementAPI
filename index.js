require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");

// Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initializing express
const shapeAI = express();

// Configurations
shapeAI.use(express.json());

console.log(process.env.MONGO_URL);

// Establish Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Ayaana!connection established!"));

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/is/:isbn", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
});

/*
Route           /c
Description     get list of books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
shapeAI.get("/c/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});
/*
Route           /auth
Description     get list of books based on an author id
Access          PUBLIC
Parameters      author id
Method          GET
*/
shapeAI.get("/auth/:author", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    authors: req.params.author,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the author ${req.params.author}`,
    });
  }

  return res.json({ books: getSpecificBooks });
});




/*
Route           /author
Description     get all authors
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors });
});
/*
Route           /author/id
Description     get specific author based on id
Access          PUBLIC
Parameters      id
Method          GET
*/
shapeAI.get("/author/:id", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({
    id: parseInt(req.params.id),
  });
  if (!getSpecificAuthor) {
    return res.json({
      error: `No author found for the id ${req.params.id}`,
    });
  }
  return res.json({ authors: getSpecificAuthor });
});


/*
Route           /autho/isbn
Description     get a list of authors based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/autho/:books", async(req, res) => {
  const getSpecificAuthors = await AuthorModel.find({
    books: req.params.books,
 });
 if(!getSpecificAuthors){
   return res.json({
    error: `No author found for the book ${req.params.books}`,
   });
 }

  return res.json({ authors: getSpecificAuthors });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
shapeAI.get("/publications", async(req, res) => {
  const getAllPublications =  await PublicationModel.find();
  return res.json({ publications: getAllPublications });
});
/*
Route           /publications/id
Description     get specific publication based on id
Access          PUBLIC
Parameters      id
Method          GET
*/
shapeAI.get("/publications/:id", async (req, res) => {
  const getSpecificPublication = await PublicationModel.findOne({
    id: req.params.id,
  });
  if (!getSpecificPublication) {
    return res.json({
      error: `No publication found for the id ${req.params.id}`,
    });
  }
  return res.json({ authors: getSpecificPublication });
});
/*
Route           /public/isbn
Description     get a list of publications based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
shapeAI.get("/public/:isbn", async(req, res) => {
  const getSpecificPublication = await PublicationModel.find({
    books: (req.params.isbn),
 });
 if(!getSpecificPublication){
   return res.json({
    error: `No publication found for the book ${req.params.books}`,
   });
 }

  return res.json({ authors: getSpecificPublication });
});

/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/book/new", async (req, res) => {
  const { newBook } = req.body;

  BookModel.create(newBook);

  return res.json({ message: "book was added!" });
});

/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
shapeAI.post("/author/new", async (req, res) => {
  const { newAuthor } = req.body;

  AuthorModel.create(newAuthor);

  return res.json({ message: "author was added!" });
});
/*
Route           /publication/new
Description     add new publication 
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
shapeAI.post("/publication/new", async (req,res) =>
{
   const { newPublic } = req.body;
   PublicationModel.create(newPublic);
   return res.json ({message : "Publication was added"});
});


/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/book/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true, // to get updated data
    }
  );
  return res.json({ books: updatedBook });
});
/*
Route           /author/up/id
Description     update author name using id
Access          PUBLIC
Parameters      id
Method          PUT
*/
shapeAI.put("/author/up/:id", async (req, res) => {
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.params.id,
    },
    {
      name: req.body.aname,
    },
    {
      new: true, // to get updated data
    }
  );
  return res.json({ public: updatedAuthor });
});

/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/book/author/update/:isbn", async (req, res) => {
  // update the book database
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );
  // update the author database

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );
  return res.json({
    books: updatedBook,
    authors: updatedAuthor,
    message: "New author was added 🚀",
  });
});
/*
Route           /publication/up/id
Description     update publication name using id
Access          PUBLIC
Parameters      id
Method          PUT
*/
shapeAI.put("/publication/up/:id", async (req, res) => {
  const updatedPublic = await PublicationModel.findOneAndUpdate(
    {
      id: req.params.id,
    },
    {
      name: req.body.pubname,
    },
    {
      new: true, // to get updated data
    }
  );
  return res.json({ public: updatedPublic });
});

/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/publication/update/book/:isbn", (req, res) => {
  // update the publication database
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });
  //--------------------------------------------------------------------------------------------------------------------------------------

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
shapeAI.delete("/book/delete/:isbn", async (req, res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete({
    ISBN: req.params.isbn,
  });
  return res.json({ books: updatedBookDatabase });
});

/*
Route           /book/delete/author
Description     delete an author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
shapeAI.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
  // update the book database

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $pull: {
        authors: parseInt(req.params.authorId),
      },
    },
    { new: true }
  );

  // update the author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(req.params.authorId),
    },
    {
      $pull: {
        books: req.params.isbn,
      },
    },
    { new: true }
  );
  return res.json({
    message: "author was deleted!!!!!!😪",
    book: updatedBook,
    author: updatedAuthor,
  });
});
/*
Route           /a/delete/id
Description     delete a publication 
Access          PUBLIC
Parameters      id
Method          DELETE
*/
shapeAI.delete("/a/delete/:id", async (req, res) => {
  const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({
    id: req.params.id,
  });
  return res.json({ books: updatedAuthorDatabase });
});
/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });
 //-------------------------------------------------------------------------------------------------------------------------------------
  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});
/*
Route           /p/delete/id
Description     delete a publication 
Access          PUBLIC
Parameters      id
Method          DELETE
*/
shapeAI.delete("/p/delete/:id", async (req, res) => {
  const updatedPublicDatabase = await PublicationModel.findOneAndDelete({
    id: req.params.id,
  });
  return res.json({ books: updatedPublicDatabase });
});
shapeAI.listen(3000, () => console.log("Hey Ayaana! We did it!"));
