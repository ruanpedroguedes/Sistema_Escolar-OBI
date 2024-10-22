document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'http://localhost:3000/api/alunos/all';
    
    try {
        const response = await fetch(API_URL);
        const alunos = await response.json();

        if (response.ok) {
            renderAlunos(alunos);
        } else {
            console.error('Erro ao obter alunos:', alunos.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

function renderAlunos(alunos) {
    const studentCardsContainer = document.getElementById('student-cards');
    studentCardsContainer.innerHTML = '';

    alunos.forEach(aluno => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <div class="student-image">
                <img src="img/aluno.png" alt="Foto do Aluno">
            </div>
            <div class="info">
                <div class="name">${aluno.username}</div>
                <div class="details">
                    <div class="turma">${aluno.turma}</div>
                    <div class="unidade">${aluno.local}</div> <!-- Novo campo adicionado -->
                    <div class="matricula">Matrícula: <span>${aluno._id}</span></div>
                    <div class="data-nascimento">Data de Nascimento: <span>${new Date(aluno.dateOfBirth).toLocaleDateString()}</span></div>
                </div>
            </div>
            <button class="details-button" data-id="${aluno._id}">></button>
        `;

        studentCardsContainer.appendChild(card);
    });

    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', () => {
            const studentId = button.getAttribute('data-id');
            window.location.href = `perfilAluno.html?id=${studentId}`;
        });
    });

    document.getElementById('turma-titulo').style.display = 'block';
    studentCardsContainer.style.display = 'flex';
}

function preencherDadosDoAluno(aluno) {
    document.getElementById('edit-name').value = aluno.username;
    document.getElementById('edit-id').value = aluno._id;
    document.getElementById('edit-dob').value = new Date(aluno.dateOfBirth).toISOString().split('T')[0];
    document.getElementById('edit-class').value = aluno.turma;
    document.getElementById('edit-mother-name').value = aluno.responsaveis.mae.nome || '';
    document.getElementById('edit-mother-phone').value = aluno.responsaveis.mae.telefone || '';
    document.getElementById('edit-mother-email').value = aluno.responsaveis.mae.email || '';
    document.getElementById('edit-father-name').value = aluno.responsaveis.pai.nome || '';
    document.getElementById('edit-father-phone').value = aluno.responsaveis.pai.telefone || '';
    document.getElementById('edit-father-email').value = aluno.responsaveis.pai.email || '';
    document.getElementById('edit-unidade').value = aluno.unidade || ''; // Novo campo adicionado

    document.getElementById('student-name').textContent = aluno.username;
    document.getElementById('student-class').querySelector('.info').textContent = aluno.turma;
    document.getElementById('student-unidade').querySelector('.info').textContent = aluno.unidade; // Novo campo adicionado
    document.getElementById('student-id').querySelector('.info').textContent = aluno._id;
    document.getElementById('student-dob').querySelector('.info').textContent = new Date(aluno.dateOfBirth).toLocaleDateString();
    document.getElementById('student-email').textContent = `Email: ${aluno.useremail}`;
    document.getElementById('mother-name').textContent = `Mãe: ${aluno.responsaveis.mae.nome || ''}`;
    document.getElementById('mother-phone').textContent = `Telefone: ${aluno.responsaveis.mae.telefone || ''}`;
    document.getElementById('mother-email').textContent = `Email: ${aluno.responsaveis.mae.email || ''}`;
    document.getElementById('father-name').textContent = `Pai: ${aluno.responsaveis.pai.nome || ''}`;
    document.getElementById('father-phone').textContent = `Telefone: ${aluno.responsaveis.pai.telefone || ''}`;
    document.getElementById('father-email').textContent = `Email: ${aluno.responsaveis.pai.email || ''}`;

    console.log('Dados preenchidos no formulário:', aluno);
}

  // Adiciona evento de clique aos botões de detalhes
  document.querySelectorAll('.details-button').forEach(button => {
      button.addEventListener('click', () => {
          const studentId = button.getAttribute('data-id');
          window.location.href = `perfilAluno.html?id=${studentId}`;
      });
  });

  // Exibir os elementos agora que foram preenchidos
  document.getElementById('turma-titulo').style.display = 'block';
  studentCardsContainer.style.display = 'flex'; // Supondo que você queira os cartões em layout flexível

