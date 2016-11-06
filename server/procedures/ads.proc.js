
var db = require('../config/db');

exports.procGetAds = function() {
    return db.fnRows('procGetAds');
}
exports.procInsertAds = function(adName, imageurl, adLink, publish){
    return db.fnRow('procInsertUser', [adName, imageurl, adLink, publish])
}

exports.procUpdateAds = function(adName, imageurl, adLink, publish){
    return db.fnEmpty('procUpdateUser', [adName, imageurl, adLink, publish]);
}

exports.procDeleteAds = function(id){
   return db.fnEmpty('procDeleteUser', [id]);
}