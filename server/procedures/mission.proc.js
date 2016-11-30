var db = require('../config/db');

exports.procGetMissionStatements = function() {
    return db.fnRows('SELECT * FROM MissionStatements WHERE publish = 1;', []);
}

exports.procGetMissionStatement = function(id){
    return db.fnRow('SELECT * FROM MissionStatements WHERE id = ?;', [id]);
}

exports.procInsertMissionStatement = function(statement, publish){
    return db.fnRow('INSERT INTO MissionStatements (statement, publish) VALUES (?, ?); Select last_insert_id() as id;', [statement, publish])
}

exports.procUpdateMissionStatement = function(statement, publish, id){
    return db.fnEmpty('UPDATE MissionStatements SET statement = ?, publish = ? WHERE id = ?;', [statement, publish, id]);
}

exports.procDeleteMissionStatement = function(id){
   return db.fnEmpty('DELETE FROM MissionStatements WHERE id = ?;', [id]);
}

exports.procGetUnpublishedMissionStatements = function(){
    return db.fnRows('SELECT * FROM MissionStatements WHERE publish = 0;', []);
}