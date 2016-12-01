
var db = require('../config/db');

exports.procGetAds= function(){
    return db.fnRows('SELECT * FROM Ads WHERE publish = 1;', []);
}

exports.procGetOddAds = function() {
    return db.fnRows('SELECT * FROM Ads WHERE publish = 1 && id % 2 = 1;', []);
}
exports.procGetEvenAds = function() {
    return db.fnRows('SELECT * FROM Ads WHERE publish = 1 && id % 2 = 0;', []);
}

exports.procGetAd = function(id){
    return db.fnRow('SELECT * FROM Ads WHERE id = ?;', [id]);
}

exports.procInsertAd = function(adName, imageurl, adLink, publish){
    return db.fnRow('INSERT INTO Ads (adName, imageurl, adLink, publish) VALUES (?,?,?,?);', [adName, imageurl, adLink, publish]);
}

exports.procUpdateAd = function(adName, imageurl, adLink, publish, id){
    return db.fnEmpty('UPDATE Ads SET adName = ?, imageurl = ?, adLink = ?, publish = ? WHERE id = ?;', [adName, imageurl, adLink, publish, id]);
}

exports.procDeleteAd = function(id){
    return db.fnEmpty('DELETE FROM Ads WHERE id = ?;', [id]);
//    return db.fnEmpty('procDeleteAd', [id]);
}

exports.procGetUnpublishedAds = function(){
    return db.fnRows('SELECT * FROM Ads WHERE publish = 0;', []);
}