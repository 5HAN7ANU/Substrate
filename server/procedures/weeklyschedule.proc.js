var db = require('../config/db');

exports.procGetWeeklySchedule = function(){
    return db.fnRows('procGetWeeklySchedule');
}

exports.procUpdateWeeklySchedule = function(weekday, showOne, showOneTime, showOneDjs, showTwo, showTwoTime, showTwoDjs, showThree, showThreeTime, showThreeDjs){
    return db.fnRows('procUpdateWeeklySchedule', [weekday, showOne, showOneTime, showOneDjs, showTwo, showTwoTime, showTwoDjs, showThree, showThreeTime, showThreeDjs]);
}