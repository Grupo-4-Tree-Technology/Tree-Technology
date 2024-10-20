function telaUser(){
    window.location.href = "./info-pessoal.html";
}

function telaDash(){
    window.location.href = "./dashboard.html";
}

function telaNotificação(){
    window.location.href = "./notificacoes.html";
}

function telaListaRota(){
    window.location.href = "./lista-rotas.html";
}

function telaListaVeiculo(){
    window.location.href = "./lista-veiculo.html";
}

function telaCadastroRota(){
    window.location.href = "./cadastro-rota.html";
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
        novoInput.setAttribute('placeholder', 'Digite a rua intermediária');
        novoInput.setAttribute('id', 'inputRua' + contadorRua);
        
        var btnRemoverRua = document.createElement('button');
        btnRemoverRua.setAttribute('type', 'button');
        btnRemoverRua.innerText = 'Remover';
        btnRemoverRua.setAttribute('onclick', 'removerRua("rua' + contadorRua + '")');

        ruaDiv.appendChild(novoInput);
        ruaDiv.appendChild(btnRemoverRua);

        ruasIntermediarias.appendChild(ruaDiv);
    });
});


function removerRua(id) {
    var ruaParaRemover = document.getElementById(id);
    ruaParaRemover.remove();
}
