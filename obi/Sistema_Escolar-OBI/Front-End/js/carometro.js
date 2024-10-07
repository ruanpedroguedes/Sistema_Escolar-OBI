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
    studentCardsContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior

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
                    <div class="matricula">Matrícula: <span>${aluno._id}</span></div>
                    <div class="data-nascimento">Data de Nascimento: <span>${new Date(aluno.dateOfBirth).toLocaleDateString()}</span></div>
                </div>
            </div>
            <button class="details-button">></button>
        `;

        studentCardsContainer.appendChild(card);
    });

    // Exibir os elementos agora que foram preenchidos
    document.getElementById('turma-titulo').style.display = 'block';
    studentCardsContainer.style.display = 'flex'; // Supondo que você queira os cartões em layout flexível
}


function renderAlunos(alunos) {
  const studentCardsContainer = document.getElementById('student-cards');
  studentCardsContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior

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
                  <div class="matricula">Matrícula: <span>${aluno._id}</span></div>
                  <div class="data-nascimento">Data de Nascimento: <span>${new Date(aluno.dateOfBirth).toLocaleDateString()}</span></div>
              </div>
          </div>
          <button class="details-button" data-id="${aluno._id}">></button>
      `;

      studentCardsContainer.appendChild(card);
  });

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
}
