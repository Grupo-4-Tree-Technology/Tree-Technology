var funcionarioModel = require("../models/funcionarioModel");

function listar(req, res) {
    let fkEmpresa = req.params.fkEmpresa;

    funcionarioModel.listar(fkEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (!email || !senha) {
//         return res.status(400).json({ "msg:": "erro ao cadastrar" })
//     } else {
//         empresaModel.autenticar(email, senha)
//             .then((response) => {

//                 if (response[0] == undefined) {
//                     return res.status(204).json({ "msg": "e-mail ou Senha estão incorretos!" })
//                 } else {
//                     return res.status(200).json({ "msg": "Usuário autenticado", response })
//                 }

//             })
//             .catch((error) => { return res.status(400).json({ "msg": "error ao autenticar: " + error }) })
//     }

// }

function cadastrar(req, res) {
    var fkEmpresa = req.params.fkEmpresa;
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dataNasc = req.body.dataNascServer;
    var cpfFunc = req.body.cpfFuncServer;
    var permissao = req.body.permissaoServer;
    var statusFunc = req.body.statusFuncServer;
    var dataContratacao = req.body.dataContratacaoServer;

    console.log(req.body)

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dataNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (cpfFunc == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (permissao == undefined) {
        res.status(400).send("Sua permisão está undefined!");
    } else if (statusFunc == undefined) {
        res.status(400).send("Seu status está undefined!");
    } else if (dataContratacao == undefined) {
        res.status(400).send("Sua data de contratação está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else  {

        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        funcionarioModel.cadastrar(nome, cpfFunc, email, senha, dataNasc, permissao, statusFunc, dataContratacao, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletar(req, res) {
    var id = req.params.id;

    funcionarioModel.deletar(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


// function verificarEmail(req, res) {
//     var emailInput = req.params.emailInput;

//     empresaModel.verificarEmail(emailInput)
//     .then(function (result) {
//         if (result.length > 0) {
//             res.status(200).json(result);

//         } else {
//             res.status(204).send('Nenhum resultado de e-mail encontrado!');
//         }
//     }).catch (function (erro) {
//         console.log(erro);
//         console.log(`Houve um erro ao buscar o e-mail. ${erro.sqlMessage}`)
//         res.status(500).json(erro.sqlMessage);
//     })
// }

// function alterarSenha(req, res) {
//     var senha = req.params.senha;
//     var email = req.params.email;

//     if (senha == undefined) {
//         res.status(400).send("Sua senha está undefined!")
//     } else if (email == undefined) {
//         res.status(400).send("Seu e-mail está undefined!")
//     } else {
//         // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
//         empresaModel.alterarSenha(senha, email)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar a alteração de senha! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

module.exports = {
   listar,
    cadastrar,
    deletar
}