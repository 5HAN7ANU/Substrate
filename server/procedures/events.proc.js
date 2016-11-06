var db = require('../config/db');

exports.procGetFeaturedEvents = function() {
    return db.fnRows('procGetFeaturedEvents');
}
exports.procInsertFeaturedEvent = function(eventName, eventDate, eventDescription, imageurl, publish){
    return db.fnRow('procInsertUser', [eventName, eventDate, eventDescription, imageurl, publish])
}

exports.procUpdateFeaturedEvent = function(eventName, eventDate, eventDescription, imageurl, publish){
    return db.fnEmpty('procUpdateUser', [eventName, eventDate, eventDescription, imageurl, publish]);
}

exports.procDeleteFeaturedEvent = function(id){
   return db.fnEmpty('procDeleteUser', [id]);
}