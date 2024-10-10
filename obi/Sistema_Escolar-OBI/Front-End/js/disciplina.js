document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const disciplinaNome = urlParams.get('nome');
    if (disciplinaNome) {
        document.getElementById('disciplina-titulo').textContent = disciplinaNome;
    }

    // Carregar avisos existentes
    loadAvisos();

    document.getElementById('open-form-button').addEventListener('click', () => {
        document.getElementById('form-container').style.display = 'block';
    });

    document.getElementById('closeIcon').addEventListener('click', () => {
        document.getElementById('form-container').style.display = 'none';
    });

    document.getElementById('create-post').addEventListener('click', createAviso);
});

async function loadAvisos() {
    try {
        const response = await fetch('http://localhost:3000/api/avisos');
        const avisos = await response.json();

        // Limpar avisos anteriores da tela
        const avisosSection = document.getElementById('avisos-section');
        avisosSection.innerHTML = ''; // Limpa todos os avisos antes de adicionar os novos

        avisos.forEach(aviso => {
            addAvisoToDOM(aviso);
        });
    } catch (error) {
        console.error('Erro ao carregar avisos:', error);
    }
}

async function createAviso() {
    const author = document.getElementById('card-author').value;
    const date = document.getElementById('card-date').value;
    const content = document.getElementById('post-content').value;

    console.log('Dados do aviso:', { author, date, content });

    try {
        const response = await fetch('http://localhost:3000/api/avisos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, date, content })
        });

        if (response.ok) {
            const aviso = await response.json();
            addAvisoToDOM(aviso); // Adiciona o aviso ao DOM
            document.getElementById('form-container').style.display = 'none';
        } else {
            const error = await response.json();
            console.error('Erro ao criar aviso:', error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function addAvisoToDOM(aviso) {
    const avisoHTML = `
        <div class="aviso-card" data-id="${aviso._id}">
            <h3>${aviso.author}</h3>
            <p>${new Date(aviso.date).toLocaleDateString()}</p> <!-- Formatação da data -->
            <p>${aviso.content}</p>
            <button class="edit-aviso-button">Editar</button>
            <button class="delete-aviso-button">Excluir</button>
        </div>
    `;
    const container = document.getElementById('avisos-section');
    container.insertAdjacentHTML('beforeend', avisoHTML);

    // Adicionar eventos de edição e exclusão
    const newAvisoElement = container.lastElementChild;
    newAvisoElement.querySelector('.edit-aviso-button').addEventListener('click', () => {
        openEditAvisoForm(aviso);
    });

    newAvisoElement.querySelector('.delete-aviso-button').addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/avisos/${aviso._id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                container.removeChild(newAvisoElement);
            } else {
                const error = await response.json();
                console.error('Erro ao excluir aviso:', error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });
}

function openEditAvisoForm(aviso) {
    const modal = document.getElementById('form-container');
    document.getElementById('card-author').value = aviso.author;
    document.getElementById('card-date').value = aviso.date;
    document.getElementById('post-content').value = aviso.content;
    modal.style.display = 'block';

    // Sobrescrever o evento de criação para a edição
    document.getElementById('create-post').onclick = async () => {
        const author = document.getElementById('card-author').value;
        const date = document.getElementById('card-date').value;
        const content = document.getElementById('post-content').value;

        console.log('Dados do aviso (edição):', { author, date, content });

        try {
            const response = await fetch(`http://localhost:3000/api/avisos/${aviso._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author, date, content })
            });

            if (response.ok) {
                const updatedAviso = await response.json();
                const avisoCard = document.querySelector(`[data-id="${aviso._id}"]`);
                avisoCard.querySelector('h3').textContent = updatedAviso.author;
                avisoCard.querySelector('p:nth-of-type(1)').textContent = new Date(updatedAviso.date).toLocaleDateString();
                avisoCard.querySelector('p:nth-of-type(2)').textContent = updatedAviso.content;
                modal.style.display = 'none';
            } else {
                const error = await response.json();
                console.error('Erro ao atualizar aviso:', error);
            }
        } catch (error) {
            console.error('Erro na requisição (edição):', error);
        }
    };
}
