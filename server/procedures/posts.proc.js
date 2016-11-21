var db = require('../config/db');

exports.procAll = function (){
    return db.fnRows('procGetPosts');
}
exports.procGetUnpublishedPosts = function (){
    return db.fnRows('procGetUnpublishedPosts')
}
exports.procRead = function(id) {
    return db.fnRow('procGetPost', [id]);
}

exports.procCreate = function(title, userid, content, imageurl) {
    return db.fnRow('procInsertPost', [title, userid, content, imageurl]);
}

exports.procUpdate = function(id, title, content, publish, imageurl) {
    return db.fnEmpty('procUpdatePost', [id, title, content, publish, imageurl]);
}

exports.procDestroy = function(id) {
    return db.fnEmpty('procDeletePost', [id]);
}

exports.procGetPostsByUser = function(id) {
    return db.fnRows('procGetPostsByUser', [id]);
}

exports.procGetEvenAds = function(id) {
    return db.fnRows('procGetEvenAds', [id] )
}