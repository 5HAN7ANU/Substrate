var db = require('../config/db');

exports.procAll = function (){
    return db.fnRows('procGetPosts');
}

exports.procRead = function(id) {
    return db.fnRow('procGetPost', [id]);
}

exports.procCreate = function(title, userid, content) {
    return db.fnRow('procInsertPost', [title, userid, content]);
}

exports.procUpdate = function(id, title, content) {
    return db.fnEmpty('procUpdatePost', [id, title, content]);
}

exports.procDestroy = function(id) {
    return db.fnEmpty('procDeletePost', [id]);
}

// exports.procGetPostsByUser = function(id) {
//     return db.fnRows('procGetPostsByUser', [id]);
// }