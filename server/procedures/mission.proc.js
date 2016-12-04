var db = require('../config/db');

exports.procGetMissionStatements = function() {
    return db.fnRows('procGetMissionStatements');
}

exports.procGetMissionStatement = function(id){
    return db.fnRow('procGetMissionStatement', [id]);
}

exports.procInsertMissionStatement = function(statement, publish){
    return db.fnRow('procInsertMissionStatement', [statement, publish])
}

exports.procUpdateMissionStatement = function(id, statement, publish){
    return db.fnEmpty('procUpdateMissionStatement', [id, statement, publish]);
}

exports.procDeleteMissionStatement = function(id){
   return db.fnEmpty('procDeleteMissionStatement', [id]);
}

exports.procGetUnpublishedMissionStatements = function(){
    return db.fnRows('procGetUnpublishedMissionStatements');
}