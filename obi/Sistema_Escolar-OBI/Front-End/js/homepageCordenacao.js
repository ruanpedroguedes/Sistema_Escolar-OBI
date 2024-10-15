document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/disciplinaRoute');
    const disciplinas = await response.json();

    // Função para renderizar as disciplinas
    const renderDisciplinas = (disciplinas) => {
        const container = document.getElementById('disciplinas-container');
        container.innerHTML = ''; // Limpa o container antes de renderizar

        disciplinas.forEach(disciplina => {
            const professorNome = disciplina.professor ? disciplina.professor.username : 'Professor não atribuído';
            const cardHTML = `
                <div class="card" data-id="${disciplina._id}" data-nome="${disciplina.nome}">
                    <h3>${disciplina.nome}</h3>
                    <p>Professor: ${professorNome}</p>
                    <p>Turma: ${disciplina.turma}</p>
                    <p>Unidade: ${disciplina.unidade}</p>
                    <p>Curso: ${disciplina.curso}</p>
                    <button class="edit-button" data-id="${disciplina._id}">
            <img src="img/lapisbranco.png" alt="Editar">
        </button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHTML);

            // Adicione os eventos de clique
            container.lastElementChild.querySelector('.edit-button').addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que o clique no botão de editar acione o clique no card
                openEditForm(disciplina);
            });

            container.lastElementChild.addEventListener('click', () => {
                const disciplinaNome = disciplina.nome;
                window.location.href = `disciplina.html?nome=${encodeURIComponent(disciplinaNome)}`;
            });
        });
    };

    // Renderiza todas as disciplinas inicialmente
    renderDisciplinas(disciplinas);

    // Função para filtrar disciplinas
    const filterDisciplinas = () => {
        const unidade = document.getElementById('unidade-dropdown').value;
        const curso = document.getElementById('curso-dropdown').value;
        const turma = document.getElementById('turma-dropdown').value;

        const filteredDisciplinas = disciplinas.filter(disciplina => {
            return (unidade === 'none' || disciplina.unidade === unidade) &&
                   (curso === 'none' || disciplina.curso === curso) &&
                   (turma === 'none' || disciplina.turma === turma);
        });

        renderDisciplinas(filteredDisciplinas);
    };

    // Adiciona eventos de mudança aos dropdowns
    document.getElementById('unidade-dropdown').addEventListener('change', filterDisciplinas);
    document.getElementById('curso-dropdown').addEventListener('change', filterDisciplinas);
    document.getElementById('turma-dropdown').addEventListener('change', filterDisciplinas);
});

function openEditForm(disciplina) {
    const modal = document.getElementById('edit-disciplina-modal');
    document.getElementById('edit-disciplina-nome').value = disciplina.nome;
    document.getElementById('edit-professor-nome').value = disciplina.professor ? disciplina.professor.username : '';
    document.getElementById('edit-turma').value = disciplina.turma;
    document.getElementById('edit-unidade').value = disciplina.unidade; // Preenche o campo unidade
    document.getElementById('edit-curso').value = disciplina.curso; // Preenche o campo curso
    modal.style.display = 'block';

    document.getElementById('salvar-edicao-disciplina-button').onclick = async () => {
        const nome = document.getElementById('edit-disciplina-nome').value;
        const professorNome = document.getElementById('edit-professor-nome').value;
        const turma = document.getElementById('edit-turma').value;
        const unidade = document.getElementById('edit-unidade').value;
        const curso = document.getElementById('edit-curso').value;

        const response = await fetch(`http://localhost:3000/api/disciplinaRoute/${disciplina._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, professorNome, turma, unidade, curso })
        });

        if (response.ok) {
            const updatedDisciplina = await response.json();
            console.log('Disciplina atualizada:', updatedDisciplina);
            modal.style.display = 'none';
            location.reload();
        } else {
            const error = await response.json();
            console.error('Erro ao atualizar disciplina:', error);
        }
    };

    document.getElementById('excluir-disciplina-button').onclick = async () => {
        const response = await fetch(`http://localhost:3000/api/disciplinaRoute/${disciplina._id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Disciplina excluída');
            modal.style.display = 'none';
            location.reload();
        } else {
            const error = await response.json();
            console.error('Erro ao excluir disciplina:', error);
        }
    };
}

// Adicione o evento de clique ao botão de fechar
document.querySelector('.close-button-edit').addEventListener('click', () => {
    document.getElementById('edit-disciplina-modal').style.display = 'none';
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('edit-disciplina-modal').style.display = 'none';
});

document.getElementById('add-disciplina-button').addEventListener('click', () => {
    document.getElementById('add-disciplina-modal').style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('add-disciplina-modal').style.display = 'none';
});

document.getElementById('salvar-disciplina-button').addEventListener('click', async () => {
    const nome = document.getElementById('disciplina-nome').value;
    const professorNome = document.getElementById('professor-nome').value; // Usar o username do professor
    const unidade = document.getElementById('unidade').value;
    const curso = document.getElementById('curso').value;
    const turma = document.getElementById('turma').value;

    if (!professorNome) {
        console.error('Nome do professor está vazio');
        return;
    }

    console.log('Dados para envio:', { nome, professorNome, unidade, curso, turma });

    const response = await fetch('http://localhost:3000/api/disciplinaRoute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, professorNome, unidade, curso, turma }) // Enviar o username do professor
    });

    console.log('Resposta do servidor:', response);

    if (response.ok) {
        const disciplina = await response.json();
        console.log('Disciplina criada:', disciplina);
        
        document.getElementById('disciplinas-container').insertAdjacentHTML('beforeend', `
            <div class="card">
                <h3>${disciplina.nome}</h3>
                <p>Professor: ${disciplina.professor ? disciplina.professor.username : 'Professor não atribuído'}</p>
                <p>Turma: ${disciplina.turma}</p>
                <p>Unidade: ${disciplina.unidade}</p>
                <p>Curso: ${disciplina.curso}</p>
            </div>
        `);
        
        document.getElementById('add-disciplina-modal').style.display = 'none';
    } else {
        const error = await response.json();
        console.error('Erro ao criar disciplina:', error);
    }
});
