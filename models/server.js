// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const Product = require('./products');

// DATABASE CONFIGURATION
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE  & BODY PARSER
app.use(express.urlencoded({ extended: true }));
const productSeed = require('./productSeed.js');
app.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProduct) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect('/products');
    });
});
app.get('/products', (req, res) => {
    Product.find({}, (error, allProduct) => {
        res.render('index.ejs', {
            product: allProduct,
		});
	});
});
app.get('/books/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/product', (req, res) => {
 
    Product.create(req.body, (error, createdProduct) => {
        res.send(createdProduct);
    });
})
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
    
});









// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));