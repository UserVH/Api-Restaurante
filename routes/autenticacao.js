
const controllerAutenticacao = require('../controllers/autenticacao');
var bodyParser = require('body-parser');

const verificaToken = require('../config/autenticacaoConfig') 

module.exports = function(app) {

  var jsonParser = bodyParser.json();

    app.post('/registrar-usuario',jsonParser, verificaToken, controllerAutenticacao.registrarUsuario);
    app.post('/login-usuario',jsonParser, controllerAutenticacao.loginUsuario);
}