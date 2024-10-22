document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const funcionarioId = urlParams.get('id');
    const tipoFuncionario = urlParams.get('type'); // Obter o tipo de funcionário (professor ou coordenador)

    if (!funcionarioId || !tipoFuncionario) {
        console.error('ID do funcionário ou tipo não encontrado na URL');
        alert('ID do funcionário ou tipo não encontrado.');
        return;
    }

    const API_URL = tipoFuncionario === 'professor' 
        ? `http://localhost:3000/api/funcionarios/professores/${funcionarioId}`
        : `http://localhost:3000/api/funcionarios/coordenacao/${funcionarioId}`;
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        const funcionario = await response.json();
        preencherDadosDoFuncionario(funcionario, tipoFuncionario);
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao carregar os dados do funcionário. Verifique se o ID está correto.');
    }
});

function preencherDadosDoFuncionario(funcionario, tipoFuncionario) {
    const editName = document.getElementById('edit-name');
    const editUnidade = document.getElementById('edit-unidade');
    const editCargo = document.getElementById('edit-cargo');
    const editClasses = document.getElementById('edit-classes');
    
    const employeeName = document.getElementById('employee-name');
    const employeeUnit = document.getElementById('employee-unit').querySelector('.info');
    const employeeRole = document.getElementById('employee-role').querySelector('.info');
    const employeeClasses = document.getElementById('employee-classes').querySelector('.info');

    if (editName) editName.value = funcionario.username;
    if (editUnidade) editUnidade.value = funcionario.local || '';
    if (editCargo) editCargo.value = tipoFuncionario === 'professor' ? funcionario.materia || '' : 'Coordenador';
    if (editClasses) editClasses.value = tipoFuncionario === 'professor' ? funcionario.turma || 'N/A' : 'N/A';

    if (employeeName) employeeName.textContent = funcionario.username;
    if (employeeUnit) employeeUnit.textContent = funcionario.local || 'N/A';
    if (employeeRole) employeeRole.textContent = tipoFuncionario === 'professor' ? funcionario.materia || 'N/A' : 'Coordenador';
    if (employeeClasses) employeeClasses.textContent = tipoFuncionario === 'professor' ? funcionario.turma || 'N/A' : 'N/A';

    console.log('Dados preenchidos no perfil do funcionário:', funcionario);
}

async function saveChanges() {
    const funcionarioId = new URLSearchParams(window.location.search).get('id');
    const tipoFuncionario = new URLSearchParams(window.location.search).get('type');
    const API_URL = tipoFuncionario === 'professor' 
        ? `http://localhost:3000/api/funcionarios/professores/${funcionarioId}`
        : `http://localhost:3000/api/funcionarios/coordenacao/${funcionarioId}`;

    const username = document.getElementById('edit-name').value;
    const local = document.getElementById('edit-unidade').value;
    const materia = tipoFuncionario === 'professor' ? document.getElementById('edit-cargo').value : 'Coordenador';
    const classes = tipoFuncionario === 'professor' ? document.getElementById('edit-classes').value : 'N/A';

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, local, materia, classes })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Funcionário atualizado:', result);
            alert('Dados atualizados com sucesso!');
            preencherDadosDoFuncionario(result, tipoFuncionario);
        } else {
            console.error('Erro ao atualizar funcionário:', result.message);
            alert('Erro ao atualizar funcionário.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao atualizar funcionário.');
    }
}

function toggleEditForm() {
    const form = document.getElementById('edit-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function deleteFuncionario() {
    const funcionarioId = new URLSearchParams(window.location.search).get('id');
    const tipoFuncionario = new URLSearchParams(window.location.search).get('type');
    const API_URL = tipoFuncionario === 'professor' 
        ? `http://localhost:3000/api/funcionarios/professores/${funcionarioId}`
        : `http://localhost:3000/api/funcionarios/coordenacao/${funcionarioId}`;

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Funcionário excluído com sucesso:', result);
            alert('Funcionário excluído com sucesso!');
            window.location.href = 'paginaFuncionarios.html'; // Altere conforme necessário
        } else {
            console.error('Erro ao excluir funcionário:', result.message);
            alert('Erro ao excluir funcionário.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao excluir funcionário.');
    }
}
