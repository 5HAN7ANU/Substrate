var db = require('../config/db');

exports.procGetWeeklySchedule = function(){
    return db.fnRows('SELECT * FROM RadioShows;', []);
}

exports.procGetDailySchedule = function(weekday){
    return db.fnRow('SELECT * FROM RadioShows WHERE weekday = ?;', [weekday]);
}

exports.procUpdateWeeklySchedule = function(showOne, showOneTime, showOneDjs, showTwo, showTwoTime, showTwoDjs, showThree, showThreeTime, showThreeDjs, weekday){
    return db.fnRows('UPDATE RadioShows SET showOne = ?, showOneTime = ?, showOneDjs = ?, showTwo = ?, showTwoTime = ?, showTwoDjs = ?, showThree = ?, showThreeTime = ?, showThreeDjs = ? WHERE weekday = ?;', [weekday, showOne, showOneTime, showOneDjs, showTwo, showTwoTime, showTwoDjs, showThree, showThreeTime, showThreeDjs]);
}