var database = require("../database/config")

function autenticar(nome, senha) {
    console.log("Autenticando o usuário:", nome);

    var instrucaoSql = `
        SELECT id, nome, email, cnpj 
        FROM Empresa 
        WHERE nome = '${nome}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(nome, email, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():");

    var instrucaoSql = `
        SELECT * FROM Empresa WHERE nome = ${nome} AND email = ${email} AND cnpj = ${cnpj};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, email, senha, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cnpj);

    var instrucaoSql = `INSERT INTO Empresa (nome, email, senha, cnpj) VALUES ('${nome}', '${email}', '${senha}', '${cnpj}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    autenticar,
    cadastrar
};