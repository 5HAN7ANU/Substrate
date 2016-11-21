var express = require('express');
var mixcloud = require('mixcloud');


var router = express.Router();

router.get('/', function(req, res){
    mixcloud.cloudcasts('substrateradio',{ limit: 6 })
    .then(function(casts) {
        res.send(casts.results);
    }, function(err) {
        console.log(err);
        res.sendStatus(500);
    });
})


module.exports = router;