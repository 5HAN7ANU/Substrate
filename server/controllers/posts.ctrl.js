var express = require('express');
var procedures = require('../procedures/posts.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();

//  = /api/posts 
router.route('/')
    .get(function (req, res) {
        procedures.procAll().then(function (posts) {
            res.send(posts);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function (req, res) {
        var p = req.body;
        procedures.procCreate(p.title, p.userid, p.content, p.imageurl)
            .then(function (id) {
                res.status(201).send(id);
            }, function (err) {
                console.log(err);
                res.sendStatus(500);
            });
    });


//this may or may not work
router.route('/unpublished')   //getting unpublished Posts
    .get(function (req, res) {
        procedures.procGetUnpublishedPosts().then(function (posts) {
            res.send(posts);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

// /api/posts/user/:id          //getting posts by user
router.get('/user/:id', function (req, res) {
    procedures.procGetPostsByUser(req.params.id).then(function (posts) {
        res.send(posts);
    }, function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});

// = /api/posts/:id
router.route('/:id')
    .get(function (req, res) {
        procedures.procRead(req.params.id).then(function (post) {
            console.log(post);
            res.send(post);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    .put(function (req, res) {
        var p = req.body;
        procedures.procUpdate(req.params.id, p.title, p.content, p.publish, p.imageurl)
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



module.exports = router;