    var express = require("express");
    var router = express.Router();

    var empresaController = require("../controllers/empresaController");

    //Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
    router.post("/cadastrar", function (req, res) {
        empresaController.cadastrar(req, res);
    })

    router.post("/autenticar", function (req, res) {
        empresaController.autenticar(req, res);
    });

    router.post("/listar", function (req, res) {
        empresaController.listar(req, res);
    });
    
    router.get("/verificarEmail/:emailInput", function (req, res) {
        empresaController.verificarEmail(req, res);
    });

    router.get("/alterarSenha/:senha/:email", function (req, res) {
        empresaController.alterarSenha(req, res);
    });

    module.exports = router;