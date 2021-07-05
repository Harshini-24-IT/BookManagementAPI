// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../database/books");

/*
Route           /
Description     get all books
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/", async (req, res) => {
  try{
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
  }
  catch(error){
    return res.json({ error: error.message });
  }
});

/*
Route           /is
Description     get specific book based on ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/
Router.get("/is/:isbn", async (req, res) => {
  try{
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
  }

  return res.json({ book: getSpecificBook });
}
catch(error){
  return res.json({ error: error.message });
}
});

/*
Route           /c
Description     get specific books based on a category
Access          PUBLIC
Parameters      category
Method          GET
*/
Router.get("/c/:category", async (req, res) => {
  try{
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });

  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of ${req.params.category}`,
    });
  }

  return res.json({ books: getSpecificBooks });
}
catch(error){
  return res.json({ error: error.message });
}
});

/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
Router.post("/new", async (req, res) => {
  try {
    const { newBook } = req.body;

    await BookModel.create(newBook);

    return res.json({ message: "book was added!" });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/update/:isbn", async (req, res) => {
  try{
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
}
catch(error){
  return res.json({ error: error.message });
}
});
/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Router.put("/author/update/:isbn", async (req, res) => {
  // update the book database
  try{
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
}
catch(error){
  return res.json({ error: error.message });
}
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/

Router.delete("/delete/:isbn", async (req, res) => {
  try{
  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
    ISBN: req.params.isbn,
  }
  
  );

  return res.json({ books: updatedBookDatabase });
}
catch(error){
  return res.json({ error: error.message });
}
});


/*
  Route           /book/delete/author
  Description     delete a author from a book
  Access          PUBLIC
  Parameters      isbn, author id
  Method          DELETE
  */
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
  // update the book database
 try{
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
}
catch(error){
  return res.json({ error: error.message });
}
});

module.exports = Router;
