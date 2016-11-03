var express = require('express');
var calendarSvc = require('../services/calendar.svc');

var router = express.Router();

router.get('/events', function(req, res) {
    calendarSvc.getEventList()
    .then(function(events) {
        console.log('done');
        console.log(events);
        res.send(events);
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;
