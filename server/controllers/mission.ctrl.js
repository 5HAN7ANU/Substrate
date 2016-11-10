var express = require('express');
var passport = require('passport');
var procedures = require('../procedures/mission.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');

var router = express.Router();

router.get('/', function (req, res) {//includes isAdmin, i.e. you can only view all users if you are an admin
    procedures.procGetMissionStatements().then(function (statements) {
        res.send(statements);
    }, function (err) {
        res.status(500).send(err);
    });
});

router.post('/', auth.isAdmin, function (req, res) {//you can only create a statement if you are an admin //post = create in this case
    var m = req.body;
    return procedures.procInsertMissionStatement(m.statement, m.publish)// calls mission.proc.js specifically the create function
        .then(function (id) {
            console.log(id);
            res.status(201).send(id);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
});

router.route('/unpublished')   //getting unpublished Posts
    .get(function (req, res) {
        procedures.procGetUnpublishedMissionStatements().then(function (statements) {
            res.send(posts);
        }, function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

router.get('/:id', auth.isAdmin, function (req, res) {
    procedures.procGetMissionStatement(req.params.id).then(function (user) {
        res.send(user);
    }, function (err) {
        res.status(500).send(err);
    });
});

router.put('/:id', auth.isAdmin, function (req, res) {
    var m = req.body;
    return procedures.procUpdateMissionStatement(req.params.id, m.statement, m.publish)
        .then(function () {
            res.sendStatus(204);
        }, function (err) {
            res.status(500).send(err);
        });
});


router.delete('/:id', auth.isAdmin, function (req, res, next) {
    var sure = alert('Are you sure you want to delete this mission statement?');
    if (sure) {
        next();
    }
}, function (req, res) {
    procedures.procDeleteMissionStatement(req.params.id)
        .then(function () {
            res.sendStatus(204);
        }, function (err) {
            res.status(500);
        });
});


module.exports = router;