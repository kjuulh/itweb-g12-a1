"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
// tslint:disable-next: no-require-imports
var app = require('./config/express').default();
// Configure server
var server = new http.Server(app);
var port = process.env.PORT;
if (port == null || port == '') {
    port = '8080';
}
server.listen(parseInt(port));
server.on('error', function (e) { return console.log('Error starting server: ' + e); });
server.on('listening', function () {
    console.log("Server started on port 8080 on env " + process.env.NODE_ENV);
});
//# sourceMappingURL=index.js.map