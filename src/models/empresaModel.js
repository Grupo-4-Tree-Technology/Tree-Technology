var database = require("../database/config")

function autenticar(email, senha) {

    var instrucaoSql = `
        SELECT u.id, u.email, u.senha, emp.id as idEmpresa, u.permissao, u.status
        FROM usuario as u
        INNER JOIN empresa as emp
        ON u.fkEmpresa = emp.id
        WHERE u.email = '${email}' AND u.senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar(nome, email, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():");

    var instrucaoSql = `
        SELECT * FROM empresa WHERE nome_fantasia = ${nome} AND email = ${email} AND cnpj = ${cnpj};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(razao_social, nome, email, senha, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cnpj);

    var instrucaoSql = `INSERT INTO empresa (razao_social, nome_fantasia, email, senha, cnpj) VALUES ('${razao_social}', '${nome}', '${email}', '${senha}', '${cnpj}');`;
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