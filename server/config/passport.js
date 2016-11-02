var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;
var utils = require('../utils');

function configurePassport(app){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        userProc.procReadByEmail(email)
        .then(function(user) {
            console.log('got user for authenticate');
            console.log(user);
            if(!user){
                return done(null, false, { message: 'Incorrect Login!' });
            }
            console.log('checking password');
            utils.checkPassword(password, user.password)
            .then(function(passwordMatches){
                console.log('password checked!');
                console.log(passwordMatches);
                if (passwordMatches) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect Login!'});
                }
            }, console.log);
        }, function(err){
            return done(err); 
        });
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        userProc.procRead(id).then(function(user) {
            done(null, user);
        }, function(err){
            done(err);
        });
    });

    var sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, pool);

    app.use(session({
        secret: 'u6hK5Zx2lx1N',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configurePassport;