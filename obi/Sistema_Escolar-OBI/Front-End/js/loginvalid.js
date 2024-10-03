const API_URL = 'http://localhost:3000/api/login/login';

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura os valores do formulário
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    
    // Envia os dados para a API de login
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    // Valida a resposta
    if (response.ok) {
        const data = await response.json();
        const usertype = data.usertype;

        // Redireciona o usuário para a página apropriada com base no tipo de usuário
        if (usertype === 'Coordenação') {
            window.location.href = 'homepageCoordenacao.html';
        } else if (usertype === 'Professor') {
            window.location.href = 'homepageProfessor.html';
        } 
    } else {
        const error = await response.json();
        alert('Erro no login: ' + error.message);
    }
});
