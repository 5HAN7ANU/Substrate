var express = require('express');
var procedures = require('../procedures/unpublishedPosts.proc');  //create this!
var auth = require('../middleware/auth.mw');

var router = express.Router();

router.route('/')
    .get(function (req, res) {
        procedures.procAllUnpublished().then(function (posts) {
            res.send(posts);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    });
    // .post(function (req, res) {
    //     var p = req.body;
    //     procedures.procCreate(p.title, p.userid, p.content)
    //     .then(function (id) {
    //         res.status(201).send(id);
    //     }, function (err) {
    //         console.log(err);
    //         res.sendStatus(500);
    //     });
// });
