var db = require('../config/db');

exports.procGetUsers = function() {
    return db.fnRows('select id, firstname, lastname, email, role FROM Users;', []);
}

exports.procReadByEmail = function(email){
    return db.fnRow('select u.* FROM Users u WHERE u.email = ?;',[email]);
}

exports.procGetUser = function(id){
    return db.fnRow('select u.id, u.email, u.firstname, u.lastname, u.role, u.dj, u.imageurl, u.bio from Users u where u.id = ?;', [id]);
}

exports.procInsertUser = function(firstname, lastname, email, password, role, dj, imageurl, bio){
    return db.fnRow('INSERT INTO Users(firstName, lastName, email, password, role, dj, imageurl, bio) VALUES(?, ?, ?, ?, ?, ?, ?, ?); SELECT LAST_INSERT_ID() AS id;', [firstname, lastname, email, password, role, dj, imageurl, bio])
}

exports.procUpdateUser = function(firstname, lastname, email, password, role, dj, imageurl, bio, id){
    return db.fnEmpty('UPDATE Users SET firstname = ?, lastname = ?, email = ?, password = ?, role = ?, dj = ?, imageUrl = ?, bio = ? WHERE id = ?;', [firstname, lastname, email, password, role, dj, imageurl, bio, id]);
}

exports.procDeleteUser = function(id){
   return db.fnEmpty('DELETE FROM Users WHERE id = ?;', [id]);
}

exports.procUserDj = function(){
    return db.fnRows('SELECT u.firstname, u.lastname, u.imageurl, u.bio from Users u where dj=1;', []);
}