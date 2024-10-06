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
    document.getElementById('student-name').textContent = aluno.username;
    document.getElementById('student-class').querySelector('.info').textContent = aluno.turma;
    document.getElementById('student-id').querySelector('.info').textContent = aluno._id;
    document.getElementById('student-dob').querySelector('.info').textContent = new Date(aluno.dateOfBirth).toLocaleDateString();
    document.getElementById('student-email').textContent = `Email: ${aluno.useremail}`;
    // Preencha outros campos conforme necessário
}
