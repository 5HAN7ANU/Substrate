var db = require('../config/db');

exports.procAll = function (){
    return db.fnRows('select Posts.*, Users.firstname as authorfirstname, Users.lastname as authorlastname from Posts inner join Users ON Posts.userid = Users.id WHERE publish = 1;', []);
}
exports.procGetUnpublishedPosts = function (){
    return db.fnRows('select Posts.*, Users.firstname as authorfirstname, Users.lastname as authorlastname from Posts inner join Users ON Posts.userid = Users.id WHERE publish = 0;', []);
}
exports.procRead = function(id) {
    return db.fnRow('SELECT p.*, u.firstName, u.lastName FROM Posts p inner join Users u on p.userid = u.id WHERE p.id = ?;', [id]);
}

exports.procCreate = function(title, userid, content, imageurl) {
    return db.fnRow('INSERT INTO Posts(title, userid, content, imageurl, createdAt) VALUES (?, ?, ?, ?, NOW());', [title, userid, content, imageurl]);
}

exports.procUpdate = function(title, content, publish, imageurl, id) {
    return db.fnEmpty('UPDATE Posts SET title = ?, content = ?, publish = ?, imageurl = ? where id = ?;', [title, content, publish, imageurl, id]);
}

exports.procDestroy = function(id) {
    return db.fnEmpty('DELETE FROM Posts WHERE id = ?;', [id]);
}

exports.procGetPostsByUser = function(id) {
    return db.fnRows('SELECT p.*, u.firstname, u.lastname FROM Posts p LEFT JOIN Users u ON p.userid = u.id WHERE u.id = ?;', [id]);
}