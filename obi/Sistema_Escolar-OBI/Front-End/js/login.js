const API_URL = 'http://localhost:3000/api/cadastroRoute/register';

document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturando os valores dos campos
    const username = document.getElementById('nome').value;
    const useremail = document.getElementById('email').value;
    const usertype = document.querySelector('.selected-option span').innerText;
    const password = document.querySelector('input[name="password"]').value; 
    //const confirmarSenha = document.querySelectorAll('confirmaSenha"')[1].value; 


    // Enviando os dados para a API
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, useremail, password, usertype })
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

         // Mostrar a mensagem de sucesso
         messageCard.classList.remove('hidden');
        
         // Após 2 segundos, esconder a mensagem
         
        // Manter a mensagem visível por 2 segundos antes de redirecionar
        setTimeout(() => {
            messageCard.classList.add('hidden');
            window.location.href = 'login.html'; // Redirecionar após esconder a mensagem
        }, 4000);
    } else {
        // Tratar erro, caso a resposta não seja ok
        const error = await response.json();
        console.error('Erro no cadastro:', error);
        alert('Erro ao cadastrar. Tente novamente.');
    }
});
