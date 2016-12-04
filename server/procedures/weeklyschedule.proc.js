var db = require('../config/db');

exports.procGetWeeklySchedule = function(){
    return db.fnRows('procGetWeeklySchedule');
}

exports.procGetDailySchedule = function(weekday){
    return db.fnRow('procGetDailySchedule', [weekday]);
}

exports.procUpdateWeeklySchedule = function(weekday, showOne, showOneTime, showOneDjs, showTwo, showTwoTime, showTwoDjs, showThree, showThreeTime, showThreeDjs){
    return db.fnRows('procUpdateWeeklySchedule', [weekday, showOne, showOneTime, showOneDjs, showTwo, showTwoTime, showTwoDjs, showThree, showThreeTime, showThreeDjs]);
}