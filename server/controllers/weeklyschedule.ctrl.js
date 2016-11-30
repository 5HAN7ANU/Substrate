var express = require('express');
var procedures = require('../procedures/weeklyschedule.proc');
var auth = require('../middleware/auth.mw');
var utils = require('../utils');

var router = express.Router();

//really /api/weeklyschedule
router.get('/', function (req, res) {
    procedures.procGetWeeklySchedule().then(function (schedule) {
        res.send(schedule);
    }, function (err) {
        res.status(500).send(err);
    });
});

router.get('/:weekday', function (req, res) {
    console.log('weeklyschedule.ctrl.js');
    console.log(req.params.weekday);
    procedures.procGetDailySchedule(req.params.weekday).then(function (weekdaySchedule) {
        console.log('Daily Schedule acquired');
        res.send(weekdaySchedule);
    }, function (err) {
        console.log(err);
        res.status(500).send(err);
    });
});

router.put('/:weekday', auth.isAdmin, function(req, res){
    // console.log('weeklyschedule.ctrl.js/update function');
    // console.log(req.params);
    // console.log(req.body);
    procedures.procUpdateWeeklySchedule(req.body.showOne, req.body.showOneTime, req.body.showOneDjs, req.body.showTwo, req.body.showTwoTime, req.body.showTwoDjs, req.body.showThree, req.body.showThreeTime, req.body.showThreeDjs, req.params.id).then(function(){
        res.sendStatus(204);
    }, function(err){
        res.status(500).send(err);
    });
});

module.exports = router;