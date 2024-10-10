document.addEventListener('DOMContentLoaded', async () => {
    const PROFESSORES_API_URL = 'http://localhost:3000/api/funcionarios/professores';
    const COORDENACAO_API_URL = 'http://localhost:3000/api/funcionarios/coordenacao';
    const DISCIPLINAS_API_URL = 'http://localhost:3000/api/disciplinaRoute';

    try {
        const [professoresResponse, coordenacaoResponse, disciplinasResponse] = await Promise.all([
            fetch(PROFESSORES_API_URL),
            fetch(COORDENACAO_API_URL),
            fetch(DISCIPLINAS_API_URL)
        ]);

        const professores = await professoresResponse.json();
        const coordenacao = await coordenacaoResponse.json();
        const disciplinas = await disciplinasResponse.json();

        if (professoresResponse.ok && coordenacaoResponse.ok && disciplinasResponse.ok) {
            const professoresComTurmas = professores.map(professor => {
                const disciplina = disciplinas.find(d => d.professor && d.professor._id === professor._id);
                return {
                    ...professor,
                    turma: disciplina ? disciplina.turma : 'N/A'
                };
            });

            renderFuncionarios([...professoresComTurmas, ...coordenacao]);
        } else {
            console.error('Erro ao obter funcionários:', professores.message || coordenacao.message || disciplinas.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

function renderFuncionarios(funcionarios) {
    const employeeCardsContainer = document.getElementById('employee-cards');
    employeeCardsContainer.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const card = document.createElement('div');
        card.className = 'employee-card';

        if (funcionario.materia) {
            // Professor 
            card.innerHTML = `
                <div class="employee-image">
                    <img src="img/aluno.png" alt="Foto do Funcionário">
                </div>
                <div class="info">
                    <div class="name">${funcionario.username}</div>
                    <div class="details">
                        <div class="cargo">Disciplina: ${funcionario.materia}</div>
                        <div class="turma">Turma: ${funcionario.turma}</div>
                        <div class="unidade">Unidade: ${funcionario.local}</div>
                    </div>
                </div>
                <button class="details-button" data-id="${funcionario._id}" data-type="professor" disabled>></button>
                <button class="delete-button" data-id="${funcionario._id}" data-type="professor">
                    <img src="img/lixeira.png" alt="Excluir">
                </button>
            `;
        } else {
            // Coordenador
            card.innerHTML = `
                <div class="employee-image">
                    <img src="img/aluno.png" alt="Foto do Funcionário">
                </div>
                <div class="info">
                    <div class="name">${funcionario.username}</div>
                    <div class="details">
                        <div class="cargo">Função: Coordenador</div>
                        <div class="unidade">Unidade: ${funcionario.local}</div>
                    </div>
                </div>
                <button class="details-button" data-id="${funcionario._id}" data-type="coordenacao" disabled>></button>
                <button class="delete-button" data-id="${funcionario._id}" data-type="coordenacao">
                    <img src="img/lixeira.png" alt="Excluir">
                </button>
            `;
        }

        employeeCardsContainer.appendChild(card);
    });

    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', () => {
            const employeeId = button.getAttribute('data-id');
            const employeeType = button.getAttribute('data-type');
            window.location.href = `perfilFuncionario.html?id=${employeeId}&type=${employeeType}`;
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async () => {
            const employeeId = button.getAttribute('data-id');
            const employeeType = button.getAttribute('data-type');
            const confirmed = confirm('Tem certeza que deseja excluir este funcionário?');
            if (confirmed) {
                await deleteFuncionario(employeeId, employeeType);
            }
        });
    });

    document.getElementById('funcionarios-titulo').style.display = 'block';
    employeeCardsContainer.style.display = 'flex';
}

async function deleteFuncionario(id, type) {
    let url;
    if (type === 'professor') {
        url = `http://localhost:3000/api/funcionarios/professores/${id}`;
    } else if (type === 'coordenacao') {
        url = `http://localhost:3000/api/funcionarios/coordenacao/${id}`;
    }

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Funcionário excluído com sucesso!');
            document.querySelector(`.delete-button[data-id="${id}"]`).closest('.employee-card').remove();
        } else {
            alert('Erro ao excluir funcionário.');
        }
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        alert('Erro ao excluir funcionário.');
    }
}
