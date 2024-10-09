document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/disciplinaRoute');
    const disciplinas = await response.json();

    disciplinas.forEach(disciplina => {
        const cardHTML = `
            <div class="card" data-id="${disciplina._id}">
                <h3>${disciplina.nome}</h3>
                <p>Professor: ${disciplina.professor.username}</p>
                <p>Turma: ${disciplina.turma}</p>
                <button class="edit-button">Editar</button>
            </div>
        `;
        const container = document.getElementById('disciplinas-container');
        container.insertAdjacentHTML('beforeend', cardHTML);

        // Adicione os eventos de clique
        container.lastElementChild.addEventListener('click', (event) => {
            if (event.target.classList.contains('edit-button')) {
                openEditForm(disciplina);
            } else {
                window.location.href = `/disciplina/${disciplina._id}`;
            }
        });
    });
});

function openEditForm(disciplina) {
    const modal = document.getElementById('edit-disciplina-modal');
    document.getElementById('edit-disciplina-nome').value = disciplina.nome;
    document.getElementById('edit-professor-nome').value = disciplina.professor.username;
    document.getElementById('edit-turma').value = disciplina.turma; // Esse select deve ter o valor da turma pre-selecionado
    modal.style.display = 'block';

    document.getElementById('salvar-edicao-disciplina-button').onclick = async () => {
        const nome = document.getElementById('edit-disciplina-nome').value;
        const professorNome = document.getElementById('edit-professor-nome').value;
        const turma = document.getElementById('edit-turma').value;

        const response = await fetch(`http://localhost:3000/api/disciplinaRoute/${disciplina._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, professorNome, turma })
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
    const turma = document.getElementById('turma').value;

    if (!professorNome) {
        console.error('Nome do professor está vazio');
        return;
    }

    console.log('Dados para envio:', { nome, professorNome, turma });

    const response = await fetch('http://localhost:3000/api/disciplinaRoute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, professorNome, turma }) // Enviar o username do professor
    });

    console.log('Resposta do servidor:', response);

    if (response.ok) {
        const disciplina = await response.json();
        console.log('Disciplina criada:', disciplina);
        
        document.getElementById('disciplinas-container').insertAdjacentHTML('beforeend', `
            <div class="card">
                <h3>${disciplina.nome}</h3>
                <p>Professor: ${disciplina.professor.username}</p>
                <p>Turma: ${disciplina.turma}</p>
                 <div class="button-container">
                    <a href="pagina1.html" class="btn">Página 1</a>
                    <a href="pagina2.html" class="btn">Página 2</a>
                    <a href="pagina3.html" class="btn">Página 3</a>
                </div>
            </div>
        `);
        
        document.getElementById('add-disciplina-modal').style.display = 'none';
    } else {
        const error = await response.json();
        console.error('Erro ao criar disciplina:', error);
    }
});
