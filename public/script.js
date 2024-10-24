document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário padrão

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Faz uma requisição para o servidor
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'http://www.google.com'; // Redireciona para o Google
        } else {
            alert('Usuário ou senha inválidos!'); // Mensagem de erro
        }
    })
    .catch(error => console.error('Erro ao realizar o login:', error));
});
