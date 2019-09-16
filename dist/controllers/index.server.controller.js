"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var example_model_1 = require("../models/example.model");
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res, next) {
        console.log('Saving message to db');
        var request = new example_model_1.Example({
            name: req.url,
        });
        request.save();
        res.render('index', { title: 'Workout program' });
    };
    return IndexController;
}());
exports.default = IndexController;
exports.indexController = new IndexController();
//# sourceMappingURL=index.server.controller.js.map