
var db = require('../config/db');

exports.procGetAds= function(){
    return db.fnRows('procGetAds');
}

exports.procGetOddAds = function() {
    return db.fnRows('procGetOddAds');
}
exports.procGetEvenAds = function() {
    return db.fnRows('procGetEvenAds');
}

exports.procGetAd = function(id){
    return db.fnRow('procGetAd', [id]);
}

exports.procInsertAd = function(adName, imageurl, adLink, publish){
    return db.fnRow('procInsertAd', [adName, imageurl, adLink, publish])
}

exports.procGetAd = function(id){
    return db.fnRow('procGetAd', [id]);
}

exports.procUpdateAd = function(id, adName, imageurl, adLink, publish){
    return db.fnEmpty('procUpdateAd', [id, adName, imageurl, adLink, publish]);
}

exports.procDeleteAd = function(id){
   return db.fnEmpty('procDeleteAd', [id]);
}

exports.procGetUnpublishedAds = function(){
    return db.fnRows('procGetUnpublishedAds');
}