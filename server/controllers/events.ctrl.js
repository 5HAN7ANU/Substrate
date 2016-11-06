var express = require('express');
var procedures = require('../procedures/events.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

 
router.route('/')
    .get(function (req, res) {
        procedures.procAll().then(function (events) {
            res.send(events);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function (req, res) {
        var e = req.body;
        procedures.procCreate(e.eventName, e.eventDate, e.eventDescription, e.imageurl, e.publish)
            .then(function (id) {
                res.status(201).send(id);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

// =========== get unpublished events here  ======== //


//=====================================================//


router.route('/:id')
    .get(function (req, res) {
        procedures.procRead(req.params.id).then(function (event) {
            console.log(event);
            res.send(event);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function (req, res) {
        var e = req.body;
        procedures.procUpdate(req.params.id, e.eventName, e.eventDate, e.eventDescription, e.imageurl, e.publish)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })
    .delete(function (req, res) {
        procedures.procDestroy(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

