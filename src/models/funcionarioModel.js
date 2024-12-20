var database = require("../database/config")


function listar(fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", fkEmpresa);

    var instrucaoSql = `
        SELECT id, nome, permissao, status, data_contratacao FROM usuario WHERE fkEmpresa = ${fkEmpresa};`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, cpf, email, senha, dataNasc, permissao, status, dataContratacao, fkEmpresa) {

    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf, email, senha, dataNasc, permissao, status, dataContratacao, fkEmpresa);

    var instrucaoSql = `INSERT INTO usuario (nome, cpf, email, senha, data_nascimento, permissao, status, data_contratacao, fkEmpresa) VALUES ('${nome}', '${cpf}','${email}', '${senha}', '${dataNasc}', '${permissao}', '${status}', '${dataContratacao}', ${fkEmpresa});`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(id) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", id);
    var instrucaoSql = `
        DELETE FROM usuario WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    cadastrar,
    deletar
};