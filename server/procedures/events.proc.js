var db = require('../config/db');

exports.procGetFeaturedEvents = function() {
    return db.fnRows('SELECT * FROM FeaturedEvents WHERE publish = 1;', []);
}
exports.procInsertFeaturedEvent = function(eventName, eventDate, eventDescription, imageurl, publish){
    return db.fnRow('INSERT INTO FeaturedEvents (eventName, eventDate, eventDescription, imageurl, publish) VALUES (?,?,?,?,?); SELECT last_insert_id() as id;', [eventName, eventDate, eventDescription, imageurl, publish])
}

exports.procUpdateFeaturedEvent = function(eventName, eventDate, eventDescription, imageurl, publish, id){
    return db.fnEmpty('UPDATE FeaturedEvents SET eventName = ?, eventDate = ?, eventDescription = ?, imageurl = ?, publish = ? WHERE id = ?;', [eventName, eventDate, eventDescription, imageurl, publish, id]);
}

exports.procGetFeaturedEvent = function(id){
    return db.fnRow('SELECT * FROM FeaturedEvents WHERE id = ?;', [id]);
}

exports.procDeleteFeaturedEvent = function(id){
   return db.fnEmpty('DELETE FROM FeaturedEvents WHERE id = ?;', [id]);
}

exports.procGetUnpublishedFeaturedEvents = function(){
    return db.fnRows('SELECT * FROM FeaturedEvents WHERE publish = 0;', []);
}