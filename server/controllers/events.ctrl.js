var express = require('express');
var procedures = require('../procedures/events.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

 
router.route('/')
    .get(function (req, res) {
        procedures.procGetFeaturedEvents().then(function (events) {
            res.send(events);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function (req, res) {
        var e = req.body;
        procedures.procInsertFeaturedEvent(e.eventName, e.eventDate, e.eventDescription, e.imageurl, e.publish)
            .then(function (id) {
                res.status(201).send(id);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

// =========== get unpublished events here  ======== //

router.route('/unpublished')
    .get(function(req, res){
        procedures.procGetUnpublishedFeaturedEvents().then(function(events){
            res.send(events);
        }, function(err){
            console.log(err);
            res.sendStatus(500);
        });
    });

//=====================================================//


router.route('/:id')
    .get(function (req, res) {
        procedures.procGetFeaturedEvent(req.params.id).then(function (event) {
            console.log(event);
            res.send(event);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function (req, res) {
        var e = req.body;
        procedures.procUpdateFeaturedEvent(req.params.id, e.eventName, e.eventDate, e.eventDescription, e.imageurl, e.publish)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    })
    .delete(function (req, res) {
        procedures.procDeleteFeaturedEvent(req.params.id)
            .then(function () {
                res.sendStatus(204);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

module.exports = router;