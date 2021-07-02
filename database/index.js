let books = [
    {
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1,
    },
    {
      ISBN: "12345Two",
      title: "Getting started with Python",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "tech", "web dev"],
      publication: 1,
    },
  ];
  
  const authors = [
    {
      id: 1,
      name: "harshu",
      books: ["12345ONE", "12345Two"],
    },
    {
      id: 2,
      name: "aki",
      books: ["12345ONE"],
    },
  ];
  
  const publications = [
    {
      id: 1,
      name: "Harshu Publications",
      books: ["12345ONE"],
    },
    {
      id: 2,
      name: "Shan Publications",
      books: ["12345TWO"],
    },
  ];
  
  module.exports = { books, authors, publications };