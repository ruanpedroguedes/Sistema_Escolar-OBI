document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capturando os valores dos campos comuns
    const username = document.getElementById('nome').value;
    const useremail = document.getElementById('email').value;
    const usertype = document.getElementById('tipoUsuario').value;
    const dateOfBirth = document.getElementById('dataNascimento').value;
    const password = document.getElementById('senha').value;
    const local = document.getElementById('local').value;

    // Definindo a URL da API com base no tipo de usuário
    let API_URL;
    if (usertype === 'aluno') {
        API_URL = 'http://localhost:3000/api/alunosPost/register';
    } else if (usertype === 'professor') {
        API_URL = 'http://localhost:3000/api/professores/register';
    } else if (usertype === 'coordenacao') {
        API_URL = 'http://localhost:3000/api/coordenacao/register';
    }

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
        body: JSON.stringify({ username, useremail, password, usertype, dateOfBirth, curso, turma, local, materia, funcao })
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

function atualizarCampos() {
    const tipoUsuario = document.getElementById('tipoUsuario').value;
    const alunoCampos = document.getElementById('alunoCampos');
    const professorCampos = document.getElementById('professorCampos');
    const coordenacaoCampos = document.getElementById('coordenacaoCampos');

    alunoCampos.style.display = 'none';
    professorCampos.style.display = 'none';
    coordenacaoCampos.style.display = 'none';

    if (tipoUsuario === 'aluno') {
        alunoCampos.style.display = 'block';
    } else if (tipoUsuario === 'professor') {
        professorCampos.style.display = 'block';
    } else if (tipoUsuario === 'coordenacao') {
        coordenacaoCampos.style.display = 'block';
    }
}
