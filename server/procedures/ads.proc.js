
var db = require('../config/db');

exports.procGetAds = function() {
    return db.fnRows('procGetAds');
}
//write one for getAd
exports.procInsertAd = function(adName, imageurl, adLink, publish){
    return db.fnRow('procInsertAd', [adName, imageurl, adLink, publish])
}

exports.procGetAd = function(id){
    return db.fnRow('procGetAd', [id]);
}

exports.procUpdateAd = function(adName, imageurl, adLink, publish){
    return db.fnEmpty('procUpdateAd', [adName, imageurl, adLink, publish]);
}

exports.procDeleteAd = function(id){
   return db.fnEmpty('procDeleteAd', [id]);
}

exports.procGetUnpublishedAds = function(){
    return db.fnRows('procGetUnpublishedAds');
}