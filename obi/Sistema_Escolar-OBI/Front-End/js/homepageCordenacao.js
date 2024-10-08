document.getElementById('add-disciplina-button').addEventListener('click', () => {
    document.getElementById('add-disciplina-modal').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('add-disciplina-modal').style.display = 'none';
});

document.getElementById('salvar-disciplina-button').addEventListener('click', async () => {
    const nome = document.getElementById('disciplina-nome').value;
    const professorId = document.getElementById('professor-id').value;
    const turma = document.getElementById('turma').value;

    console.log('Dados para envio:', { nome, professorId, turma });

    const response = await fetch('http://localhost:3000/api/disciplinaRoute', { // Altere a rota aqui
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, professorId, turma })
    });

    console.log('Resposta do servidor:', response);

    if (response.ok) {
        const disciplina = await response.json();
        console.log('Disciplina criada:', disciplina);
        document.getElementById('disciplinas-container').insertAdjacentHTML('beforeend', `
            <div class="card">
                <h3>${disciplina.nome}</h3>
                <p>Professor: ${disciplina.professor.nome}</p>
                <p>Turma: ${disciplina.turma}</p>
            </div>
        `);
        document.getElementById('add-disciplina-modal').style.display = 'none';
    } else {
        const error = await response.json();
        console.error('Erro ao criar disciplina:', error);
    }
});
