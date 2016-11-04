var db = require('../config/db');

exports.procGetUsers = function() {
    return db.fnRows('procGetUsers');
}

exports.procReadByEmail = function(email){
        return db.fnRow('procGetByEmail',[email]);
}

exports.procGetUser = function(id){
    return db.fnRow('procGetUser', [id]);
}

exports.procInsertUser = function(firstname, lastname, email, password, role, dj){
    return db.fnRow('procInsertUser', [firstname, lastname, email, password, role, dj])
}

exports.procUpdateUser = function(id, firstname, lastname, email, password, role, dj){
    return db.fnEmpty('procUpdateUser', [id, firstname, lastname, email, password, role, dj]);
}

exports.procDeleteUser = function(id){
   return db.fnEmpty('procDeleteUser', [id]);
}

exports.procUserDj = function(){
    return db.fnRows('procUserDj');
}