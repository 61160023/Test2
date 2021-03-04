const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId
const express = require('express')
const app = express()

app.use(express.json())

const url = 'mongodb+srv://superadmin:bel123456@cluster0.12d6p.mongodb.net/books?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true})
let db, booksCollection

async function connect() {
    await client.connect()
    db = client.db('book')
    booksCollection = db.collection('books')
}
connect()

// POST /books
app.post('/books', (req, res) => {
    //input
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage = req.body.image_url
    // key: value
    let newBook = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image_url: newImage,
    }
    let bookID = 0
    //process
    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId
    //output
    res.status(201).json(bookID)
})

app.get('/books/:id', (req, res) => {
    //input
    let id = req.params.id

    let book = {}

    //process
    book = books[id]

    //output
    res.status(200).json(book)
})
const port = 3000
app.listen(3000, () => console.log(`Server started  again at ${port}`))