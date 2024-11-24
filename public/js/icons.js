function telaUser(){
   window.location.href = "./atualizar-info.html";
}

function telaUser2(){
   window.location.href = "../telas-veiculos-rotas/atualizar-info.html";
}

function telaDash(){
    window.location.href = "../telas-veiculos-rotas/dashboard.html";
}

function telaNotificação(){
    window.location.href = "../telas-veiculos-rotas/notificacoes.html";
}

function telaListaRota(){
    window.location.href = "./lista-rotas.html";
}

function telaListaVeiculo(){
    window.location.href = "./lista-veiculo.html";
}

function telaCadastroRota(button){

    // Encontro a div mais próxima com a classe "list-routes"
    var parentDiv = button.closest(".list-routes");

    if (parentDiv) {
        // Obtenho o atributo data-setIdTrajeto e transformo em INTEIRO!
        var dataSetNumber = parseInt(parentDiv.getAttribute("data-setIdTrajeto"), 10);
        console.log(`ID Trajeto selecionado: ${dataSetNumber}`);

        // Estou inserindo o ID do trajeto no sessionStorage
        sessionStorage.ID_TRAJETO = dataSetNumber;
        window.location.href = "../telas-trajetos-func/gerenciamentoTrajetos.html";
    } else {
        console.error("Não foi possível encontrar o trajeto associado.");
    }

}

function mensagemConfirmar() {
    var mensagemConfirmar = document.getElementById('confirmarcao');
    mensagemConfirmar.style.display = "flex"; 
}

function cancelarMensagem() {
    var mensagemConfirmar = document.getElementById('confirmarcao');
    mensagemConfirmar.style.display = "none"; 
}

function instrucao(){
    var instrucao = document.getElementById('instrucao');
    instrucao.style.display = "block"; 
    
}

function fechar(){
    var instrucao = document.getElementById('instrucao');
    var options = document.getElementById('options');

    instrucao.style.display = "none"; 
    options.style.display = "none"; 
}

function abrirDots(){
    var options = document.getElementById('options');
    options.style.display = "flex"; 
}

function fecharDots(){
    var options = document.getElementById('options');
    options.style.display = "none"; 
}



document.addEventListener('DOMContentLoaded', function() {
    var addRua = document.getElementById('adicionarRua');
    var ruasIntermediarias = document.getElementById('ruasIntermediarias');
    var contadorRua = 0;

    addRua.addEventListener('click', function() {
        contadorRua++; 
      
        var ruaDiv = document.createElement('div');
        ruaDiv.setAttribute('id', 'rua' + contadorRua); 

        var novoInput = document.createElement('input');
        novoInput.setAttribute('type', 'text');
        novoInput.setAttribute('name', 'ruaIntermediaria');
        novoInput.setAttribute('placeholder', `Ponto de Parada ${contadorRua}`);
        novoInput.setAttribute('id', 'inputRua' + contadorRua);
        novoInput.setAttribute('class', 'input-rua');
        
        var btnRemoverRua = document.createElement('p');
        btnRemoverRua.setAttribute('type', 'p');
        btnRemoverRua.innerText = 'Remover';
        btnRemoverRua.style.color = 'red';
        btnRemoverRua.style.cursor = 'pointer';
        btnRemoverRua.setAttribute('onclick', 'removerRua("rua' + contadorRua + '")');


        ruaDiv.appendChild(novoInput);
        ruaDiv.appendChild(btnRemoverRua);

        ruasIntermediarias.appendChild(ruaDiv);
    });
});

