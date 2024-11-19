var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.get("/puxarDados/:idUsuario", function (req, res) {
    usuarioController.puxarDados(req, res);
});

router.post('/atualizarUsuario/:idUsuario', function(req, res){
    usuarioController.atualizarUsuario(req, res);
});

router.post('/deletarUsuario/:idUsuario', function(req,res){
    usuarioController.deletarUsuario(req, res)
});

module.exports = router;

