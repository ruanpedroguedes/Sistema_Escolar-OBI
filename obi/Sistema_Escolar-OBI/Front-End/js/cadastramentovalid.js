const API_URL = 'http://localhost:3000/api/cadastramentoRoute/register';

document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturando os valores dos campos comuns
    const username = document.getElementById('nome').value;
    const useremail = document.getElementById('email').value;
    const usertype = document.getElementById('tipoUsuario').value;
    const dateOfBirth = document.getElementById('dataNascimento').value;
    const password = document.getElementById('senha').value;

    // Variáveis específicas
    let curso, turma, materia, funcao;

    // Capturando campos específicos com base no tipo de usuário
    if (usertype === 'aluno') {
        curso = document.getElementById('curso').value;
        turma = document.getElementById('turma').value;
    } else if (usertype === 'professor') {
        materia = document.getElementById('materia').value;
    } else if (usertype === 'coordenacao') {
        funcao = document.getElementById('funcao').value;
    }

    // Enviando os dados para a API
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, useremail, password, usertype, dateOfBirth, curso, turma, materia, funcao })
    });

    const messageDiv = document.getElementById('message');
    const messageText = document.getElementById('messageText');
    const messageImg = document.getElementById('messageImg');

    if (response.ok) {
        const user = await response.json();
        console.log('Usuário cadastrado:', user);

        // Limpar campos
        document.getElementById('cadastroForm').reset();

        // Mostrar mensagem de sucesso
        messageImg.src = 'img/check.png'; // Substitua pelo caminho da sua imagem de sucesso
        messageText.textContent = 'Cadastramento bem-sucedido!';
        messageDiv.style.display = 'block';

    } else {
        const error = await response.json();
        console.error('Erro no cadastro:', error);
        
        // Mostrar mensagem de erro
        messageImg.src = 'img/erro.png'; // Substitua pelo caminho da sua imagem de erro
        messageText.textContent = 'Cadastramento mal-sucedido!';
        messageDiv.style.display = 'block';
    }

    // Esconder a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
});
