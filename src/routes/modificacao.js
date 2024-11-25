var express = require("express");
var router = express.Router();


var usuarioController = require("../controllers/modificacaoController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.get("/buscarFuncionario/:idFuncionario", function (req, res) {
    usuarioController.buscarFuncionario(req, res);
});

router.post('/atualizarFuncionario/:idFuncionario', function(req, res){
    usuarioController.atualizarFuncionario(req, res);
});

router.post('/deletarFuncionario/:idFuncionario', function(req,res){
    usuarioController.deletarFuncionario(req, res)
});

module.exports = router;
