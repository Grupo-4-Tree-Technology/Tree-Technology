// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const crypto = require('crypto');
let generatedToken;

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var dashboardRouter = require("./src/routes/dashboardCrud");
var empresaRouter = require("./src/routes/empresa");

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/empresa", empresaRouter);
app.use("/dashboardCrud", dashboardRouter)

// Criação da data e hora atual para enviar no e-mail:

const now = new Date();
const horaAtual = now.toLocaleTimeString();

// Ternário para adicionar o zero à esquerda se necessário
const doisDigitos = (num) => (num < 10 ? `0${num}` : num);

// Formatar data com mês e dia em dois dígitos
const ano = now.getFullYear();
const mes = doisDigitos(now.getMonth() + 1); // OBS.: A função getMonth() retorna de 0 a 11, então é necessário adicionar 1
const dia = doisDigitos(now.getDate());

// Formatar para DD-MM-YYYY
const dataAtual = `${dia}-${mes}-${ano}`;

function formataDataHora() {
    const now = new Date();
    return new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).format(now);
}

/* ENVIAR E-MAIL PARA ENTRAR EM CONTATO*/
const smtpContato = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tree.technology05@gmail.com',
        pass: 'bzrq zvbe wcty cktn',
    },
    tls: {
        rejectUnauthorized: false,
    }
});

app.post('/send-emailContact', (req, res) => {
    const { toName, toEmail, toPhone, toMessage } = req.body;

    const configEmailContact = {
        from: 'tree.technology05@gmail.com',
        to: 'tree.technology05@gmail.com',
        replyTo: toEmail,
        subject: `Contato de ${toName}`,
        html: `
    <div>
        <strong>Nome: </strong>
        <br>
        
        <pre style="margin: 0; white-space: pre-wrap;">${toName}</pre>
        
        <hr>
        <strong>E-mail: </strong>

        <pre style="margin: 0; white-space: pre-wrap;">${toEmail}</pre>
        <hr>
        <strong>Telefone: </strong>
        <br>
        
        <pre style="margin: 0; white-space: pre-wrap;">${toPhone}</pre>
        <hr>
        <strong>Mensagem: </strong>
        <br>
        <pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word">${toMessage}</pre>
        <hr>
        <p style="text-align: center;">Enviado em ${formataDataHora()}</p>
    </div>
        `
    };

    smtpContato.sendMail(configEmailContact)
        .then(info => {
            console.log('Email enviado:', info.response);
            res.status(200).send('Email enviado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao enviar email:', error);
            res.status(500).send('Erro ao enviar email.');
        });
});

/* ENVIAR E-MAIL PARA ENTRAR EM CONTATO*/

/* ENVIAR E-MAIL COM TOKEN */
const smtp = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tree.technology05@gmail.com',
        pass: 'bzrq zvbe wcty cktn',
    },
    tls: {
        rejectUnauthorized: false,
    }
});

app.post('/send-email', (req, res) => {
    const { toEmail } = req.body;
    generatedToken = crypto.randomInt(100000, 999999).toString();

    const configEmail = {
        from: 'tree.technology@gmail.com',
        to: toEmail,
        subject: `TOKEN DE VERIFICAÇÃO`,
        html: `<p>Seu token é: <strong>${generatedToken}</strong>! <br> <br>
        Se você não solicitou este token, ignore este e-mail.<br>
        Data atual: <strong>${dataAtual}</strong><br>
        Horário atual: <strong>${horaAtual}</strong></p>`
    };

    smtp.sendMail(configEmail)
        .then(info => {
            console.log('Email enviado:', info.response);
            res.status(200).send('Email enviado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao enviar email:', error);
            res.status(500).send('Erro ao enviar email.');
        });
});
/* ENVIAR E-MAIL COM TOKEN */

app.post('/novaSenha', (req, res) => {
    const { token } = req.body;

    // Verifica se o token inserido é igual ao gerado
    if (token === generatedToken) {
        res.status(200).send('Token verificado com sucesso!');
    } else {
        res.status(400).send('Token inválido!');
    }
});

console.log(`Lembre-se sempre de utilizar o comando: \n
            "npm install"\n
            Ela irá instalar os pacotes:

            express: para configurar seu servidor.
            nodemailer: para enviar e-mails.
            body-parser: para processar requisições HTTP e acessar o corpo de uma requisição.
            cors: para lidar com requisições de diferentes origens (cross-origin resource sharing).`)

app.listen(PORTA_APP, function () {
    console.log(`
████████╗██████╗ ███████╗███████╗    ████████╗███████╗ ██████╗██╗  ██╗███╗   ██╗ ██████╗ ██╗      ██████╗  ██████╗██╗   ██╗
╚══██╔══╝██╔══██╗██╔════╝██╔════╝    ╚══██╔══╝██╔════╝██╔════╝██║  ██║████╗  ██║██╔═══██╗██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝
   ██║   ██████╔╝█████╗  █████╗         ██║   █████╗  ██║     ███████║██╔██╗ ██║██║   ██║██║     ██║   ██║██║  ███╗╚████╔╝ 
   ██║   ██╔══██╗██╔══╝  ██╔══╝         ██║   ██╔══╝  ██║     ██╔══██║██║╚██╗██║██║   ██║██║     ██║   ██║██║   ██║ ╚██╔╝  
   ██║   ██║  ██║███████╗███████╗       ██║   ███████╗╚██████╗██║  ██║██║ ╚████║╚██████╔╝███████╗╚██████╔╝╚██████╔╝  ██║   
   ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝       ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝   ╚═╝                                                                                                   
    \n\n\nServidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
