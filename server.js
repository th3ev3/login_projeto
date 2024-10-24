const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000; // Usar a porta fornecida pela Vercel ou 4000 localmente

// Lista de usuários e senhas
const users = {
  admin: '123',
  jamile: '456',
  alan: '789',
  amanda: '000',
  isabelle: '123',
  yves: 'yves123'
};

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Servir arquivos estáticos da pasta "public"

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Tentativa de login:', { username, password });

  if (!username || !password) {
    console.log('Usuário ou senha não informados');
    return res.status(401).send('Usuário ou senha não informados');
  }

  if (username in users) {
    console.log('Usuário encontrado:', username);
    if (users[username] === password) {
      console.log('Senha correta');
      logLogin(username);
      return res.status(200).send({ message: 'Login bem-sucedido' }); // Resposta de sucesso
    } else {
      console.log('Senha incorreta');
      return res.status(401).send('Senha incorreta');
    }
  } else {
    console.log('Usuário não encontrado');
    return res.status(401).send('Usuário não encontrado');
  }
});

// Função para registrar o login
function logLogin(username) {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  const segundos = String(data.getSeconds()).padStart(2, '0');

  const logMessage = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos} - Usuário ${username} fez login\n`;
  const logPath = path.join(__dirname, 'login.log');

  fs.appendFile(logPath, logMessage, (err) => {
    if (err) {
      console.error('Erro ao registrar login:', err);
    }
  });
}

// Rota home
app.get('/index.html', (req, res) => {
  res.send('Bem-vindo!'); // Mensagem para a rota home
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
