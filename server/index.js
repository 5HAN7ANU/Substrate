var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var utils = require('./utils');
var configurePassport = require('./config/passport');
var api = require('./api');
var fs = require('fs');  // do we need?  INSTALL!!
var prerender = require('prerender-node');


var app = express();
var clientPath = path.join(__dirname, '../client');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
app.use(prerender);

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);

app.get('*', function(req, res, next) {
    if (utils.isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});

app.listen(process.env.PORT || 3000);
console.log("server listening on port 3000");


//================== moved 'isAsset' to utils.js
