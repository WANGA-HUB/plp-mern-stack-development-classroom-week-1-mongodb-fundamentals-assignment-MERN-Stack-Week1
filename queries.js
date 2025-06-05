//### Task 2: Basic CRUD Operations

//Find all books in a specific genre
use plp_bookstore
switched to db plp_bookstore
db.books.find({genre : "Fiction"})

//Find books published after a certain year
use plp_bookstore
switched to db plp_bookstore
db.books.find({published_year : {$lt : 1953}})

// Find books by a specific author
use plp_bookstore
switched to db plp_bookstore
db.books.find({author : "George Orwell"})

//Update the price of a specific book
use plp_bookstore
switched to db plp_bookstore
db.books.updateOne(
  { title: "To Kill a Mockingbird" },
  { $set: { price: 14.00 } }
)

//Delete a book by its title
use plp_bookstore
switched to db plp_bookstore
db.books.deleteOne({ title : "To Kill a Mockingbird"})


//### Task 3: Advanced Queries
// Write a query to find books that are both in stock and published after 2010
use plp_bookstore
switched to db plp_bookstore
db.books.find({ in_stock : "True" , published_year : {$gt :2010}})

//Use projection to return only the title, author, and price fields in your queries
use plp_bookstore
switched to db plp_bookstore
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

//Implement sorting to display books by price (both ascending and descending)
use plp_bookstore
switched to db plp_bookstore
db.books.find().sort({ price: 1 }) // Ascending order
db.books.find().sort({ price: -1 }) // Descending order

//Use the `limit` and `skip` methods to implement pagination (5 books per page)
use plp_bookstore
switched to db plp_bookstore
db.books.find().limit(5) // First page
db.books.find().skip(5).limit(5) // Second page

//### Task 4: Aggregation Pipeline
//Create an aggregation pipeline to calculate the average price of books by genre
use plp_bookstore
switched to db plp_bookstore
db.books.aggregate([
  {$group : {_id : "$genre", avg_price : {$avg : "$price"}}}])

//Create an aggregation pipeline to find the author with the most books in the collection
use plp_bookstore
switched to db plp_bookstore
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

//Implement a pipeline that groups books by publication decade and counts them
use plp_bookstore
switched to db plp_bookstore
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      count: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
]);

//### Task 5: Indexing
// Create an index on the `title` field for faster searches
use plp_bookstore
switched to db plp_bookstore
db.books.createIndex({ title: 1 });

//Create a compound index on `author` and `published_year`
use plp_bookstore
switched to db plp_bookstore    
db.books.createIndex({ author: 1, published_year: -1 });

//Use the `explain()` method to demonstrate the performance improvement with your indexes
use plp_bookstore
switched to db plp_bookstore    
db.books.find({ title: "1984" }).explain("executionStats");
<<<<<<< HEAD
=======







>>>>>>> 727ec36 (Complete CRUD and indexing queries)
