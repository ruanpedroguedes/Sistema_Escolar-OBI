document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('open-form-button').addEventListener('click', () => {
        document.getElementById('form-container').style.display = 'block';
    });

    document.getElementById('criar-turma-button').addEventListener('click', createTurma);
    loadTurmas(); // Chama a função para carregar as turmas

    document.getElementById('filter-ano').addEventListener('change', filterTurmas);
    document.getElementById('filter-turno').addEventListener('change', filterTurmas);
    document.getElementById('filter-unidade').addEventListener('change', filterTurmas);
    document.getElementById('filter-curso').addEventListener('change', filterTurmas);
});

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

async function createTurma() {
    const ano = document.getElementById('ano').value;
    const unidade = document.getElementById('unidade').value;
    const curso = document.getElementById('curso').value;
    const turno = document.getElementById('turno').value;
    const professoresInput = document.getElementById('professores').value;
    const professores = professoresInput.split(',').map(nome => nome.trim());

    try {
        const response = await fetch('http://localhost:3000/api/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ano, unidade, curso, turno, professores })
        });

        if (response.ok) {
            const turma = await response.json();
            addTurmaToDOM(turma);
            document.getElementById('ano').value = ''; // Limpar o campo de entrada
            document.getElementById('unidade').value = '';
            document.getElementById('curso').value = '';
            document.getElementById('turno').value = '';
            document.getElementById('professores').value = '';
            document.getElementById('form-container').style.display = 'none'; // Esconder o formulário
        } else {
            const error = await response.json();
            console.error('Erro ao criar turma:', error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function addTurmaToDOM(turma) {
    const turmaHTML = `
        <div class="turma-card" data-id="${turma._id}">
            <h3>${turma.ano}</h3>
            <p>Unidade: ${turma.unidade}</p>
            <p>Curso: ${turma.curso}</p>
            <p>Turno: ${turma.turno}</p>
            <button class="edit-button">Editar</button>
            <button class="delete-button">Excluir</button>
        </div>
    `;
    const container = document.getElementById('turmas-container');
    container.insertAdjacentHTML('beforeend', turmaHTML);

    // Adicionar eventos aos botões
    const card = container.querySelector(`.turma-card[data-id="${turma._id}"]`);
    card.querySelector('.edit-button').addEventListener('click', () => editTurma(turma._id));
    card.querySelector('.delete-button').addEventListener('click', () => deleteTurma(turma._id));
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

async function deleteTurma(turmaId) {
    try {
        const response = await fetch(`http://localhost:3000/api/turmas/${turmaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remover o card da DOM
            const card = document.querySelector(`.turma-card[data-id="${turmaId}"]`);
            card.remove();
        } else {
            const error = await response.json();
            console.error('Erro ao excluir turma:', error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

async function editTurma(turmaId) {
    try {
        const response = await fetch(`http://localhost:3000/api/turmas/${turmaId}`);
        const turma = await response.json();

        // Preencher o formulário com os dados da turma
        document.getElementById('ano').value = turma.ano;
        document.getElementById('unidade').value = turma.unidade;
        document.getElementById('curso').value = turma.curso;
        document.getElementById('turno').value = turma.turno;
        document.getElementById('professores').value = turma.professores.map(prof => prof.username).join(', ');

        // Mostrar o formulário
        document.getElementById('form-container').style.display = 'block';

        // Atualizar a função de criar turma para salvar as alterações
        document.getElementById('criar-turma-button').removeEventListener('click', createTurma);
        document.getElementById('criar-turma-button').addEventListener('click', () => updateTurma(turmaId));
    } catch (error) {
        console.error('Erro ao carregar turma:', error);
    }
}

async function updateTurma(turmaId) {
    const ano = document.getElementById('ano').value;
    const unidade = document.getElementById('unidade').value;
    const curso = document.getElementById('curso').value;
    const turno = document.getElementById('turno').value;
    const professoresInput = document.getElementById('professores').value;
    const professores = professoresInput.split(',').map(nome => nome.trim());

    try {
        const response = await fetch(`http://localhost:3000/api/turmas/${turmaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ano, unidade, curso, turno, professores })
        });

        if (response.ok) {
            const updatedTurma = await response.json();
            // Atualizar o card na DOM
            const card = document.querySelector(`.turma-card[data-id="${turmaId}"]`);
            card.querySelector('h3').textContent = updatedTurma.ano;
            card.querySelector('p:nth-child(2)').textContent = `Unidade: ${updatedTurma.unidade}`;
            card.querySelector('p:nth-child(3)').textContent = `Curso: ${updatedTurma.curso}`;
            card.querySelector('p:nth-child(4)').textContent = `Turno: ${updatedTurma.turno}`;

            // Limpar e esconder o formulário
            document.getElementById('ano').value = '';
            document.getElementById('unidade').value = '';
            document.getElementById('curso').value = '';
            document.getElementById('turno').value = '';
            document.getElementById('professores').value = '';
            document.getElementById('form-container').style.display = 'none';

            // Restaurar a função de criar turma
            document.getElementById('criar-turma-button').removeEventListener('click', updateTurma);
            document.getElementById('criar-turma-button').addEventListener('click', createTurma);
        } else {
            const error = await response.json();
            console.error('Erro ao atualizar turma:', error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}