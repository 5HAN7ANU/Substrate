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

exports.procCreate = function(title, userid, content) {
    return db.fnRow('procInsertPost', [title, userid, content]);
}

exports.procUpdate = function(id, title, content, publish) {
    return db.fnEmpty('procUpdatePost', [id, title, content, publish]);
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