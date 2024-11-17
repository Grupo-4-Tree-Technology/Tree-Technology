    var express = require("express");
    var router = express.Router();

    var funcionarioController = require("../controllers/funcionarioController");

    //Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
    router.post("/cadastrar", function (req, res) {
        funcionarioController.cadastrar(req, res);
    })

    // router.post("/autenticar", function (req, res) {
    //     empresaController.autenticar(req, res);
    // });

    router.get("/listar", function (req, res) {
        funcionarioController.listar(req, res);
    });

    router.delete("/deletar/:id", function (req, res) {
        funcionarioController.deletar(req, res);
    });

    module.exports = router;