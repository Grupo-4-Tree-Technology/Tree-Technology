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



module.exports = {
    puxarDados
};
