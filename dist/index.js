"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = void 0;
var _express = _interopRequireDefault(require("express"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _socket2 = _interopRequireDefault(require("./controllers/socket.controllers"));
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
  /*socket.on('joinRoom', room => {
    socket.join(room);
    console.log(
      `El cliente con el id ${socket.id} se a unido a la sala ${room}`,
    );
  });
   //BASCULA FINAL (PC)
  //Escuchar cliente y mandar comando a bascula final (pedir peso)
  socket.on('client:weight', data => {
    console.log(data);
    scaleController.requestToScale(3, data);
  });*/
});

//BASCULAS INICIALES (Mini PC)
_scale["default"].connectScale(1, '/COM6', _socket2["default"].channelWrite); //Bascula 1 COM6
_scale["default"].connectScale(2, '/COM5', _socket2["default"].channelWrite); //Bascula 2 COM5

//BASCULA FINAL (PC)
//scaleController.connectScale(3, '/COM3', socketController.channelWrite); //Bascula 3 COM?

//Prueba Ubuntu
//scaleController.connectScale(3, '/dev/ttyACM0', socketController.channelWrite);

//BASCULA FINAL (PC)
//Escuchar cliente y mandar comando a bascula final (pedir peso)
/*socketController.channelListening(data => {
  scaleController.requestToScale(3, data);
});*/

server.listen(app.get('port'), function () {
  console.log('Server on port', app.get('port'));
});
app.use(_index["default"]);