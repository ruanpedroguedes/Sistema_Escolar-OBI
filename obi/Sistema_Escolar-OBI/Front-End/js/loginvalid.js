const API_URL = 'http://localhost:3000/api/login/login'; // Corrigido para evitar o '/login' extra

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Captura os valores do formulário
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
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
            console.log('Resposta do servidor:', data); // Verifica o retorno do backend
            const usertype = data.usertype;
            const coordenadorId = data.coordenadorId; // Supondo que o ID do coordenador é retornado aqui

            // Armazena o ID do coordenador no localStorage
            localStorage.setItem('coordenadorId', coordenadorId);

            // Redireciona o usuário para a página apropriada com base no tipo de usuário
            if (usertype === 'Coordenação') {
                window.location.href = 'homepageCoordenacao.html';
            } else if (usertype === 'Professor') {
                window.location.href = 'homepageProfessor.html';
            } else {
                alert('Tipo de usuário desconhecido!');
            }
        } else {
            const error = await response.json();
            alert('Erro no login: ' + error.message);
        }
    } catch (err) {
        console.error('Erro de conexão:', err);
        alert('Erro de conexão com o servidor.');
    }
});
