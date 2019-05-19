const express = require('express'); // Holds EXPRESS app
const path = require('path'); // Allows construction of paths
const mongoose = require('mongoose'); // mongoose is a helper package for working with MongoDB
const postRoutes = require('./routes/posts'); // Holds connection to router(for routes)
const authRoutes = require('./routes/auth');

const app = express(); // returns the express app by executing the express function

// Create connection to database
//IMPORTANT: MongoDB: danny - 7Fq8YvA2PntcSCss
mongoose.connect('mongodb+srv://danny:7Fq8YvA2PntcSCss@cluster0-sls8z.mongodb.net/node-angular?retryWrites=true\n',
    {useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        console.log('Connected to Database')
    })
    .catch(() => {
        console.log('Connection Failed')
    });

// These act as 'middleware', a series of actions that act upon a request before
// calling 'next' to let the request continue it's journey


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/images', express.static(path.join('backend/images'))); // grant access to images folder

//IMPORTANT: Prevent CORS (Cross-Origin Resource Sharing) error - Allow cross server communication
app.use((req, res, next) => {
    // Allow all domains to access (denoted with '*')
    res.setHeader("Access-Control-Allow-Origin",
        "*");
    // Allow communication with headers from the below
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Allow control from http words (get, delete, put etc)
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

// Make sure express uses the routes in the routes folder/file
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Export the app to be able to use it with our node server
// including all the middleware we write
module.exports = app;
