var database = require("../database/config")

function autenticar(email, senha) {
    console.log("Autenticando o usuário:", nome);

    var instrucaoSql = `
        SELECT id, nome, email, cnpj 
        FROM Empresa 
        WHERE email = '${email}' AND senha = '${senha}';
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


function cadastrar(razao_social, nome, email, senha, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cnpj);

    var instrucaoSql = `INSERT INTO Empresa (razao_social, nome_fantasia, email, senha, cnpj) VALUES ('${razao_social}', '${nome}', '${email}', '${senha}', '${cnpj}');`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarEmail(emailInput) {
    console.log('ESTOU NO empresaModel.js || Na função verificarEmail()');

    var query = `
    SELECT email 
    FROM empresa 
    WHERE email = "${emailInput}";
    `
    
    console.log(`Executando a query SQL: \n ${query}`);
    return database.executar(query);
}

function alterarSenha(senha, email) {
    console.log('ESTOU NO empresaModel.js || Na função alterarSenha()');

    var query = `
    UPDATE empresa
    SET senha = "${senha}"
    WHERE email = "${email}";
    `
    
    console.log(`Executando a query SQL: \n ${query}`);
    return database.executar(query);
}

module.exports = {
    listar,
    autenticar,
    cadastrar,
    verificarEmail,
    alterarSenha
};