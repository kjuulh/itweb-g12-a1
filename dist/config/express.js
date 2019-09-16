"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var config_1 = require("./config");
function default_1() {
    var app = express();
    app.set('views', path.join(__dirname, '../../src/views'));
    app.set('view engine', 'pug');
    //app.use(bodyParser.json())
    //app.use(bodyParser.urlencoded({ extended: false }))
    //app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../../src/public')));
    for (var _i = 0, _a = config_1.default.globFiles(config_1.default.routes); _i < _a.length; _i++) {
        var route = _a[_i];
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