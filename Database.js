const books = [{
    ISBN: "12345Book",
    title: "The story of Rapunzel",
    pubDate: "2021-06-06",
    language: "en",
    numPage: 500,
    author: [1, 2],
    publications: [1],
    category: ["Fantasy", "Romcom"]
    
},
];

const author = [
    {
        id:1,
        name: "Harshu",
        books: ["12345Book"],
    },
    {
        id:2,
        name : "Aki",
        books:["12345Book"]
    },

];

const publication = [
    {
      id: 1,
      name: "writex",
      books: ["12345Book"],
    },
  ];

  module.exports= {books,author,publication};
  