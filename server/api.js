var express = require('express');
var posts = require('./controllers/posts.ctrl');
var users = require('./controllers/users.ctrl');
var contact = require('./controllers/contact.ctrl');

var router = express.Router();

router
    .use('/posts', posts)
    .use('/users', users)
    .use('/login', users)
    .use('/contact', contact);

module.exports = router;