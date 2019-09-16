"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var logger = require("morgan");
var config_1 = require("./config");
function default_1() {
    var app = express();
    app.set('views', path.join(__dirname, '../../src/views'));
    app.set('view engine', 'pug');
    for (var _i = 0, _a = config_1.default.globFiles(config_1.default.models); _i < _a.length; _i++) {
        var model = _a[_i];
        require(path.resolve(model));
    }
    if (config_1.default.useMongo) {
        console.log(config_1.default.mongodb);
        mongoose
            .connect(config_1.default.mongodb, {
            useNewUrlParser: true,
            dbName: 'itweb-g12',
        })
            .catch(function (err) { return console.log('Error connecting to mongo' + err); });
    }
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../src/public')));
    for (var _b = 0, _c = config_1.default.globFiles(config_1.default.routes); _b < _c.length; _b++) {
        var route = _c[_b];
        require(path.resolve(route)).default(app);
    }
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        next(err);
    });
    return app;
}
exports.default = default_1;
//# sourceMappingURL=express.js.map