var db = require('../config/db');

exports.procAllUnpublished = function (){
    return db.fnRows('procGetUnpublishedPosts');
}