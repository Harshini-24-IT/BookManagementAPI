const mongoose = require ("mongoose");

//Creating a book schema
const BookSchema = mongoose.Schema({
      ISBN: {
            type: String,
            required : true,
            minLength : 5,
            maxLength : 10,
      },
      title: {
            
                  type: String,
                  required : true,
                  minLength : 5,
                  maxLength : 50,
            
      },
      authors: {
            type: [Number],
            required : true,
      },
      language: {
            
                  type: String,
                  required : true,
           
      },
      pubDate: {
            type: String,
            required : true,
      },
      numOfPage: {
            type: Number,
            required : true,
      },
      category: {
           
                  type: [String],
                  required : true,
          
      },
      publication: {
            type: Number,
            required : true,
      },
});

// Create a book model
const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;
