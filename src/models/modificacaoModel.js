var database = require("../database/config");

function puxarDados(idFuncionario) {
    var instrucaoSql = `
        SELECT nome, email, cpf, data_nascimento, permissao, status, data_contratacao 
        FROM usuario 
        WHERE id = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarUsuario(id) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarUsuario():", id);
    var instrucaoSql = `
        DELETE FROM usuario WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarFuncionario(idFuncionario, nome, email, cpf, dataNasc, permissao, status, dataContratacao) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarFuncionario():", idFuncionario, nome, email, cpf, dataNasc, permissao, status, dataContratacao);
    var instrucaoSql = `
        UPDATE usuario
        SET nome = '${nome}', cpf = '${cpf}', email = '${email}', 
            data_nascimento = '${dataNasc}', permissao = '${permissao}', 
            status = '${status}', data_contratacao = '${dataContratacao}'
        WHERE id = '${idFuncionario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarDados,
    deletarUsuario,
    atualizarFuncionario
};
