var express = require('express');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var userProc = require('../procedures/users.proc');
var pool = require('./db').pool;

var utils = require('../utils');
var loginError = 'Invalid Login Credentials'

function configurePassport(app) {
    passport.use(new LocalStrategy ({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        user.Proc.readByEmail(email).then(function(user) {
            if (!user) {
                return done(null, false);
            }
            // if (user.password !== password) {
            //     return done(null, false, { message: 'Incorrent Login Information'});
            // }
            return utils.checkPassword(password, user.password)
            .then(function(matches) {
                if (matches) {
                    delete user.password;
                    return done(null, user);
                } else {
                    return done(null, false, { message: loginError });
                }
            });
            
        }).catch(function(err) {
            return done(err);
        });
}));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        userProc.read(id).then(function(user) {
            done(null, user);
        }, function(err) {
            done(err);
        });
    });
    var sessionStore = new MySQLStore({
        createDataTable: true
    }, pool);

    app.use(session({
        secret: 'randString(n)',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    function randString(n) {
            if (!n) {
                n = 5;
            }
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (var i=0; i < n; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                } return text;
        }
}
module.exports = configurePassport;