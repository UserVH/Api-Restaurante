
const controllerPedidos =  require('../controllers/pedidos');
var bodyParser = require('body-parser');
const verificaToken = require('../config/autenticacaoConfig') 

module.exports = function(app) {
     
     var jsonParser = bodyParser.json();

     app.post('/criar-pedido',jsonParser, controllerPedidos.criarPedido);
     app.get('/listar-pedidos',jsonParser, verificaToken, controllerPedidos.listarPedidos);
     app.get('/listar-pedido/:id',jsonParser, verificaToken, controllerPedidos.listarPedido);
}