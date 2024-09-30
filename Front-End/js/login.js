const API_URL = 'http://localhost:3000/api/users';
const db = require('C:/Users/Aluno/Music/obi/Sistema_Escolar-OBI/Back-End/app.js')

document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturando os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cargoElement = document.querySelector('.selected-option span'); 
    const cargo = cargoElement ? cargoElement.innerText : ''; 

    const senha = document.querySelector('input[name="password"]').value; 
    const confirmarSenha = document.querySelectorAll('input[name="password"]')[1].value; 
    const btn = document.getElementsByClassName('btn-cadastro').value

    // Enviando os dados para a API
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, cargo, senha, confirmarSenha })
    });

    // Verificando se o cadastro foi bem-sucedido
    if (response.ok) {
        const user = await response.json(); // Captura a resposta da API (usuário cadastrado)
        console.log('Usuário cadastrado:', user); // Exibe no console o usuário cadastrado

        // Limpar os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.querySelector('.selected-option span').innerText = 'Selecionar cargo'; // Resetando o cargo para um valor padrão
        document.querySelector('input[name="password"]').value = '';
        document.querySelectorAll('input[name="password"]')[1].value = '';

        // Você pode adicionar um feedback ao usuário aqui, como uma mensagem de sucesso
        alert('Cadastro realizado com sucesso!');
    } else {
        // Tratar erro, caso a resposta não seja ok
        const error = await response.json();
        console.error('Erro no cadastro:', error);
        alert('Erro ao cadastrar. Tente novamente.');
    }

});

