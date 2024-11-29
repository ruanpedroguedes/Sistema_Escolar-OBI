document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'http://localhost:3000/api/alunos/all';
    
    try {
        const response = await fetch(API_URL);
        const alunos = await response.json();

        if (response.ok) {
            renderAlunos(alunos);
            setupFilters(alunos);
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
                    <div class="unidade">${aluno.local}</div>
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

function setupFilters(alunos) {
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const turmaDropdown = document.getElementById('turma-dropdown');

    unidadeDropdown.addEventListener('change', () => filterAlunos(alunos));
    cursoDropdown.addEventListener('change', () => filterAlunos(alunos));
    turmaDropdown.addEventListener('change', () => filterAlunos(alunos));
}

function filterAlunos(alunos) {
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const turmaDropdown = document.getElementById('turma-dropdown');

    const unidade = unidadeDropdown.value.toUpperCase().replace(/\s+/g, '_');
    const cursoMap = {
        'Análise e Desenvolvimento de Sistemas': 'ads',
        'Informática': 'informatica',
        'Logística': 'logistica'
    };
    const curso = cursoMap[cursoDropdown.value] || cursoDropdown.value;
    const turma = turmaDropdown.value;

    const filteredAlunos = alunos.filter(aluno => {
        const matchUnidade = unidade === 'NONE' || aluno.local === unidade;
        const matchCurso = curso === 'none' || aluno.curso === curso;
        const matchTurma = turma === 'none' || aluno.turma === turma;
        return matchUnidade && matchCurso && matchTurma;
    });

    renderAlunos(filteredAlunos);
}