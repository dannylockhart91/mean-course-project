// Holds EXPRESS app
const express = require('express');

// returns the express app by executing the express function
const app = express();

// These act as 'middleware', a series of actions that act upon a request before
// calling 'next' to let the request continue it's journey

//IMPORTANT: Prevent CORS (Cross-Origin Resource Sharing) error - Allow cross server communication
app.use((req, res, next) => {
    // Allow all domains to access (denoted with '*')
    res.setHeader("Access-Control-Allow-Origin",
        "*");
    // Allow communication with headers from the below
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    // Allow control from http words (get, delete, put etc)
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'randomID',
            title: 'First Server Side Post',
            content: 'This is coming from the server',
            timeCreated: Date.now()
        },
        {
            id: 'secondRandomID',
            title: 'Second Server Side Post',
            content: 'This is coming from the server',
            timeCreated: Date.now()
        }
    ];
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    });
});


// Export the app to be able to use it with our node server
// including all the middleware we write
module.exports = app;
