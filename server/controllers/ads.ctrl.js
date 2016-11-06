var express = require('express');
var procedures = require('../procedures/ads.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

 
router.route('/')
    .get(function (req, res) {
        procedures.procAll().then(function (ads) {
            res.send(ads);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function (req, res) {
        var a = req.body;
        procedures.procCreate(a.adName, a.imageurl, a.adLink, a.publish)
            .then(function (id) {
                res.status(201).send(id);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });

// =========== get unpublished ads here  ======== //


//=====================================================//


router.route('/:id')
    .get(function (req, res) {
        procedures.procRead(req.params.id).then(function (ad) {
            console.log(ad);
            res.send(ad);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function (req, res) {
        var a = req.body;
        procedures.procUpdate(req.params.id, a.adName, a.imageurl, a.adLink, a.publish)
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