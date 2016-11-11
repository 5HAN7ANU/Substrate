var express = require('express');
var procedures = require('../procedures/weeklyschedule.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');

var router = express.Router();

router.get('/logout', function (req, res) {//it could be a post request, but its a get request just so we could go to /api/users/logout to logout
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    });
});

//really /api/weeklyschedule
router.get('/', function (req, res) {
    procedures.procGetWeeklySchedule().then(function (schedule) {
        res.send(schedule);
    }, function (err) {
        res.status(500).send(err);
    });
});

router.put('/', auth.isAdmin, function (req, res) {
    procedures.procInsertUser(u.weekday, u.showOne, u.showOneTime, u.showOneDjs, u.showTwo, u.showTwoTime, u.showTwoDjs, u.showThree, u.showThreeTime, u.showThreeDjs)
        .then(function () {
            res.sendStatus(201);
        }, function (err) {
            res.status(500).send(err);
        });
});

module.exports = router;