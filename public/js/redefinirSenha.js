const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3002;

const now = new Date();
const horaAtual = now.toLocaleTimeString();

// Função para adicionar o zero à esquerda se necessário
const doisDigitos = (num) => (num < 10 ? `0${num}` : num);

// Formatar data com mês e dia em dois dígitos
const ano = now.getFullYear();
const mes = doisDigitos(now.getMonth() + 1); // Lembre-se que getMonth() retorna de 0 a 11, então é necessário adicionar 1
const dia = doisDigitos(now.getDate());

// Formato final YYYY-MM-DD
const dataAtual = `${dia}-${mes}-${ano}`;

app.use(cors());

// Middleware para analisar JSON no corpo da requisição
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do transporte
const smtp = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'tree.technology05@gmail.com',
        pass: 'bzrq zvbe wcty cktn', // Use uma senha de aplicativo aqui
    },
    tls: {
        rejectUnauthorized: false,
    }
});

// Rota para enviar e-mail
app.post('/send-email', (req, res) => {
    const { toEmail } = req.body;

    const configEmail = {
        from: 'tree.technology@gmail.com',
        to: toEmail,
        subject: `TESTE NODE MAIL!!!! ${new Date().toLocaleString()}`,
        html: `<p>Isto é apenas um envio de teste com a API NodeMailer! <strong>Obrigado!</strong> <br> 
                Data atual: <strong>${dataAtual}</strong> <br>
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

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
