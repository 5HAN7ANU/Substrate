var express = require('express');
var posts = require('./controllers/posts.ctrl');
var users = require('./controllers/users.ctrl');
var contact = require('./controllers/contact.ctrl');
var calendar = require('./controllers/calendar.ctrl');
var events = require('./controllers/events.ctrl');
var ads = require('./controllers/ads.ctrl');
var podcasts = require('./controllers/podcasts.ctrl');
var pods = require('./controllers/pod.ctrl');
var mission = require('./controllers/mission.ctrl');
var weeklyschedule = require('./controllers/weeklyschedule.ctrl');
var router = express.Router();

router
    .use('/posts', posts)
    .use('/users', users)
    .use('/contact', contact)
    .use('/calendar', calendar)
    .use('/featuredevents', events)
    .use('/ads', ads)
    .use('/podcasts', podcasts)
    .use('/mission', mission)
    .use('/weeklyschedule', weeklyschedule)
    .use('/pods', pods);
    

module.exports = router;