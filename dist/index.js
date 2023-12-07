"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = void 0;
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _scale = _interopRequireDefault(require("./controllers/scale.controllers"));
var _index = _interopRequireDefault(require("./routes/index.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.set('port', process.env.PORT || 3000);
var server = _http["default"].createServer(app);
var io = exports.io = new _socket.Server(server, {
  cors: {
    origin: '*'
  }
});
io.on('connection', function (socket) {
  console.log("El cliente con el id ".concat(socket.id, " se a conectado"));
});

//BASCULAS INICIALES (Mini PC)
//scaleController.connectScale(1, '/COM6'); //Bascula 1 COM6
// scaleController.connectScale(2, '/COM5'); //Bascula 2 COM5

//BASCULA FINAL (PC)
_scale["default"].connectScale(3, '/COM6'); //Bascula 3 COM6

//Prueba Ubuntu
//scaleController.connectScale(1, '/dev/ttyACM0');

server.listen(app.get('port'), function () {
  console.log('Server on port', app.get('port'));
});
app.use(_index["default"]);