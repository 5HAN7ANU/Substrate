var express = require('express');
var posts = require('./controllers/posts.ctrl');
var users = require('./controllers/users.ctrl');
var contact = require('./controllers/contact.ctrl');
var calendar = require('./controllers/calendar.ctrl');
var events = require('./controllers/events.ctrl');
var ads = require('./controllers/ads.ctrl');

var router = express.Router();

router
    .use('/posts', posts)
    .use('/users', users)
    .use('/contact', contact)
    .use('/calendar', calendar)
    .use('/featuredevents', events)
    .use('/ads', ads);

module.exports = router;