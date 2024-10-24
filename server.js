const express = require('express');
const fs = require('fs').promises; // Usar a versão promissificada do fs
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
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentativa de login:', { username, password });

  // Verificar se username e password foram informados
  if (!username || !password) {
    console.log('Usuário ou senha não informados');
    return res.status(401).send('Usuário ou senha não informados');
  }

  // Verificar se o usuário existe e se a senha está correta
  if (username in users) {
    console.log('Usuário encontrado:', username);
    if (users[username] === password) {
      console.log('Senha correta');
      await logLogin(username); // Aguarda o registro do login
      return res.status(200).send({ message: 'Login bem-sucedido' });
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
async function logLogin(username) {
  const data = new Date();
  const formattedDate = `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()} ${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}:${String(data.getSeconds()).padStart(2, '0')}`;

  const logMessage = `${formattedDate} - Usuário ${username} fez login\n`;
  const logPath = path.join(__dirname, 'login.log');

  try {
    await fs.appendFile(logPath, logMessage); // Aguarda a escrita do log
  } catch (err) {
    console.error('Erro ao registrar login:', err);
  }
}

// Rota home
app.get('/index.html', (req, res) => {
  res.send('Bem-vindo!'); // Mensagem para a rota home
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
