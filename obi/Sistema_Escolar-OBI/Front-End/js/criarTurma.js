document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('open-form-button').addEventListener('click', () => {
        document.getElementById('form-container').style.display = 'block';
    });

    document.getElementById('criar-turma-button').addEventListener('click', createTurma);
    loadTurmas();

    document.getElementById('filter-ano').addEventListener('change', filterTurmas);
    document.getElementById('filter-turno').addEventListener('change', filterTurmas);
    document.getElementById('filter-unidade').addEventListener('change', filterTurmas);
    document.getElementById('filter-curso').addEventListener('change', filterTurmas);
});

async function createTurma() {
    const ano = document.getElementById('ano').value;
    const unidade = document.getElementById('unidade').value;
    const curso = document.getElementById('curso').value;
    const turno = document.getElementById('turno').value;

    try {
        const response = await fetch('http://localhost:3000/api/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ano, unidade, curso, turno })
        });

        if (response.ok) {
            const turma = await response.json();
            addTurmaToDOM(turma);
            document.getElementById('ano').value = ''; // Limpar o campo de entrada
            document.getElementById('unidade').value = '';
            document.getElementById('curso').value = '';
            document.getElementById('turno').value = '';
            document.getElementById('form-container').style.display = 'none'; // Esconder o formulário
        } else {
            const error = await response.json();
            console.error('Erro ao criar turma:', error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

async function loadTurmas() {
    try {
        const response = await fetch('http://localhost:3000/api/turmas');
        const turmas = await response.json();

        turmas.forEach(turma => {
            addTurmaToDOM(turma);
        });
    } catch (error) {
        console.error('Erro ao carregar turmas:', error);
    }
}

function addTurmaToDOM(turma) {
    const turmaHTML = `
        <div class="turma-card">
            <h3>${turma.ano}</h3>
            <p>Unidade: ${turma.unidade}</p>
            <p>Curso: ${turma.curso}</p>
            <p>Turno: ${turma.turno}</p>
        </div>
    `;
    const container = document.getElementById('turmas-container');
    container.insertAdjacentHTML('beforeend', turmaHTML);
}

function filterTurmas() {
    const ano = document.getElementById('filter-ano').value;
    const turno = document.getElementById('filter-turno').value;
    const unidade = document.getElementById('filter-unidade').value;
    const curso = document.getElementById('filter-curso').value;

    const cards = document.querySelectorAll('.turma-card');
    cards.forEach(card => {
        const cardAno = card.querySelector('h3').textContent;
        const cardTurno = card.querySelector('p:nth-child(4)').textContent.split(': ')[1];
        const cardUnidade = card.querySelector('p:nth-child(2)').textContent.split(': ')[1];
        const cardCurso = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];

        const matchesAno = !ano || cardAno.includes(ano);
        const matchesTurno = !turno || cardTurno === turno;
        const matchesUnidade = !unidade || cardUnidade === unidade;
        const matchesCurso = !curso || cardCurso === curso;

        if (matchesAno && matchesTurno && matchesUnidade && matchesCurso) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}