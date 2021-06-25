const express = require("express");

//Database
const database = require("./Database");

//Initialization
const booky = express();

/*
Route                 /
Description           Get all books
Access                Public
Parameter             NONE
Methods               GET
*/
booky.get("/",(req,res) => {
    return res.json({books: database.books});
});


/*
Route                 /
Description           Get specific book based on ISBN
Access                Public
Parameter             ISBN
Methods               GET
*/

booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) =>book.ISBN === req.params.isbn
);

if (getSpecificBook.length === 0)
{
    return res.json({
        error: `No book found for the ISBN of ${req.params.isbn}`,
});
}
  return res.json({book: getSpecificBook});

    
});

/*
Route                 /c
Description           Get specific book based on category
Access                Public
Parameter             category
Methods               GET
*/

booky.get("/c/:category", (req,res) => {

    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)

    );

    if (getSpecificBook.length === 0)
{
    return res.json({
        error: `No book found for the category of ${req.params.category}`,
});
}
  return res.json({book: getSpecificBook});



});
/*
Route                 /c
Description           Get specific book based on category
Access                Public
Parameter             category
Methods               GET
*/
booky.get("/author",(req,res) => {
    return res.json({authors: database.author});
});
/*
Route                 /c
Description           Get specific book based on category
Access                Public
Parameter             category
Methods               GET
*/

booky.get("/author/book/:isbn", (req,res) => {

    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)

    );

    if (getSpecificBook.length === 0)
{
    return res.json({error: `No author found for the book of ${req.params.isbn}`,
});
}
  return res.json({book: getSpecificAuthor});

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







booky.listen(3000, () => console.log("Hey Ayaana! Server is running!"));