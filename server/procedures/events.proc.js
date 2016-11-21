var db = require('../config/db');

exports.procGetFeaturedEvents = function() {
    return db.fnRows('procGetFeaturedEvents');
}
exports.procInsertFeaturedEvent = function(eventName, eventDate, eventDescription, imageurl, publish){
    return db.fnRow('procInsertFeaturedEvent', [eventName, eventDate, eventDescription, imageurl, publish])
}

exports.procUpdateFeaturedEvent = function(id, eventName, eventDate, eventDescription, imageurl, publish){
    return db.fnEmpty('procUpdateFeaturedEvent', [id, eventName, eventDate, eventDescription, imageurl, publish]);
}

exports.procGetFeaturedEvent = function(id){
    return db.fnRow('procGetFeaturedEvent', [id]);
}

exports.procDeleteFeaturedEvent = function(id){
   return db.fnEmpty('procDeleteFeaturedEvent', [id]);
}

exports.procGetUnpublishedFeaturedEvents = function(){
    return db.fnRows('procGetUnpublishedFeaturedEvents');
}