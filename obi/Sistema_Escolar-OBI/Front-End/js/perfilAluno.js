document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const alunoid = urlParams.get('id');

    if (!alunoid) {
        console.error('ID do aluno não encontrado na URL');
        return;
    }

    const API_URL = `http://localhost:3000/api/alunoGet/${alunoid}`;
    
    try {
        const response = await fetch(API_URL);
        const aluno = await response.json();

        if (response.ok) {
            preencherDadosDoAluno(aluno);
        } else {
            console.error('Erro ao obter dados do aluno:', aluno.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

function preencherDadosDoAluno(aluno) {
    document.getElementById('edit-name').value = aluno.username;
    document.getElementById('edit-id').value = aluno._id;
    document.getElementById('edit-dob').value = new Date(aluno.dateOfBirth).toISOString().split('T')[0];
    document.getElementById('edit-class').value = aluno.turma;
    document.getElementById('edit-unidade').value = aluno.unidade || '';

    const mae = aluno.responsaveis?.mae || {};
    const pai = aluno.responsaveis?.pai || {};

    document.getElementById('edit-mother-name').value = mae.nome || '';
    document.getElementById('edit-mother-phone').value = mae.telefone || '';
    document.getElementById('edit-mother-email').value = mae.email || '';
    document.getElementById('edit-father-name').value = pai.nome || '';
    document.getElementById('edit-father-phone').value = pai.telefone || '';
    document.getElementById('edit-father-email').value = pai.email || '';

    document.getElementById('student-name').textContent = aluno.username;
    document.getElementById('student-class').querySelector('.info').textContent = aluno.turma;
    document.getElementById('student-unit').querySelector('.info').textContent = aluno.unidade;
    document.getElementById('student-id').querySelector('.info').textContent = aluno._id;
    document.getElementById('student-dob').querySelector('.info').textContent = new Date(aluno.dateOfBirth).toLocaleDateString();
    document.getElementById('student-email').textContent = `Email: ${aluno.useremail}`;
    document.getElementById('mother-name').textContent = `Mãe: ${mae.nome || ''}`;
    document.getElementById('mother-phone').textContent = `Telefone: ${mae.telefone || ''}`;
    document.getElementById('mother-email').textContent = `Email: ${mae.email || ''}`;
    document.getElementById('father-name').textContent = `Pai: ${pai.nome || ''}`;
    document.getElementById('father-phone').textContent = `Telefone: ${pai.telefone || ''}`;
    document.getElementById('father-email').textContent = `Email: ${pai.email || ''}`;

    // Calcular e exibir a idade
    const idade = calcularIdade(new Date(aluno.dateOfBirth));
    document.getElementById('student-age').textContent = `Idade: ${idade} anos`;

    console.log('Dados preenchidos no formulário:', aluno);
}

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }
    return idade;
}

async function saveChanges() {
    const alunoid = new URLSearchParams(window.location.search).get('id');
    const API_URL = `http://localhost:3000/api/alunos/${alunoid}`;

    const username = document.getElementById('edit-name').value;
    const dateOfBirth = document.getElementById('edit-dob').value;
    const turma = document.getElementById('edit-class').value;
    const unidade = document.getElementById('edit-unidade').value;
    const mae = {
        nome: document.getElementById('edit-mother-name').value,
        telefone: document.getElementById('edit-mother-phone').value,
        email: document.getElementById('edit-mother-email').value
    };
    const pai = {
        nome: document.getElementById('edit-father-name').value,
        telefone: document.getElementById('edit-father-phone').value,
        email: document.getElementById('edit-father-email').value
    };

    console.log('Enviando dados:', { username, dateOfBirth, turma, unidade, mae, pai });

    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, dateOfBirth, turma, unidade, mae, pai })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Aluno e responsáveis atualizados:', result);

            // Recarregar os dados do aluno após atualização
            const alunoResponse = await fetch(`http://localhost:3000/api/alunos/${alunoid}`);
            if (alunoResponse.ok) {
                const alunoAtualizado = await alunoResponse.json();
                console.log('Dados do aluno após atualização:', alunoAtualizado);

                preencherDadosDoAluno(alunoAtualizado);

                // Alterna o formulário de edição
                toggleEditForm();
            } else {
                console.error('Erro ao recarregar dados do aluno após atualização:', alunoResponse.statusText);
            }
        } else {
            console.error('Erro ao atualizar responsáveis:', result.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

function toggleEditForm() {
    const form = document.getElementById('edit-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function deleteStudent() {
    const alunoid = new URLSearchParams(window.location.search).get('id');
    const API_URL = `http://localhost:3000/api/alunos/${alunoid}`;

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Aluno excluído com sucesso:', result);
            // Redirecionar ou atualizar a página após exclusão
            window.location.href = 'carometro.html';
        } else {
            console.error('Erro ao excluir aluno:', result.message);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}