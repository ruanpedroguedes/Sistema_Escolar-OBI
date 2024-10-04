document.addEventListener('DOMContentLoaded', function () {
    // Pega os detalhes do aluno do localStorage
    const alunoSelecionado = JSON.parse(localStorage.getItem('alunoSelecionado'));

    if (alunoSelecionado) {
        document.getElementById('student-name').innerText = alunoSelecionado.nome;
        document.getElementById('student-id').innerHTML = `<span class="title">Matrícula:</span><br><span class="info">${alunoSelecionado.matricula}</span>`;
        document.getElementById('student-dob').innerHTML = `<span class="title">Data de Nascimento:</span><br><span class="info">${alunoSelecionado.dataNascimento}</span>`;
        document.getElementById('student-class').innerHTML = `<span class="title">Turma:</span><br><span class="info">${alunoSelecionado.turma}</span>`;
        
        // Calcula a idade do aluno com base na data de nascimento
        const idade = calcularIdade(alunoSelecionado.dataNascimento);
        document.getElementById('student-age').innerHTML = `<span class="title">Idade:</span><br><span class="info">${idade} anos</span>`;

        // Preenche o formulário de edição com os dados do aluno
        document.getElementById('edit-name').value = alunoSelecionado.nome;
        document.getElementById('edit-id').value = alunoSelecionado.matricula;
        document.getElementById('edit-dob').value = alunoSelecionado.dataNascimento;
        document.getElementById('edit-class').value = alunoSelecionado.turma;

        // Preenche os campos de edição dos responsáveis e observações
        document.getElementById('edit-mother-name').value = alunoSelecionado.motherName || '';
        document.getElementById('edit-mother-phone').value = alunoSelecionado.motherPhone || '';
        document.getElementById('edit-mother-email').value = alunoSelecionado.motherEmail || '';
        document.getElementById('edit-father-name').value = alunoSelecionado.fatherName || '';
        document.getElementById('edit-father-phone').value = alunoSelecionado.fatherPhone || '';
        document.getElementById('edit-father-email').value = alunoSelecionado.fatherEmail || '';
        document.getElementById('edit-student-email').value = alunoSelecionado.studentEmail || '';
        document.getElementById('edit-observations').value = alunoSelecionado.observations || '';
    } else {
        document.querySelector('.profile-info').innerText = "Nenhum aluno selecionado.";
    }
});

// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNascimento) {
    const [dia, mes, ano] = dataNascimento.split('/');
    const dataNasc = new Date(`${ano}-${mes}-${dia}`);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mesCorrente = hoje.getMonth() - dataNasc.getMonth();
    if (mesCorrente < 0 || (mesCorrente === 0 && hoje.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade;
}

// Função para alternar a exibição do formulário de edição
function toggleEditForm() {
    const editForm = document.getElementById('edit-form');
    if (editForm.style.display === 'none' || editForm.style.display === '') {
        editForm.style.display = 'block';
    } else {
        editForm.style.display = 'none';
    }
}

// Função para salvar as alterações feitas no formulário de edição
function saveChanges() {
    const nome = document.getElementById('edit-name').value;
    const matricula = document.getElementById('edit-id').value;
    const dataNascimento = document.getElementById('edit-dob').value;
    const turma = document.getElementById('edit-class').value;
    const foto = document.getElementById('edit-photo').files;
    const motherName = document.getElementById('edit-mother-name').value;
    const motherPhone = document.getElementById('edit-mother-phone').value;
    const motherEmail = document.getElementById('edit-mother-email').value;
    const fatherName = document.getElementById('edit-father-name').value;
    const fatherPhone = document.getElementById('edit-father-phone').value;
    const fatherEmail = document.getElementById('edit-father-email').value;
    const studentEmail = document.getElementById('edit-student-email').value;
    const observations = document.getElementById('edit-observations').value;

    // Atualiza os dados do aluno no localStorage
    const alunoAtualizado = {
        nome: nome,
        matricula: matricula,
        dataNascimento: dataNascimento,
        turma: turma,
        motherName: motherName,
        motherPhone: motherPhone,
        motherEmail: motherEmail,
        fatherName: fatherName,
        fatherPhone: fatherPhone,
        fatherEmail: fatherEmail,
        studentEmail: studentEmail,
        observations: observations
    };

    localStorage.setItem('alunoSelecionado', JSON.stringify(alunoAtualizado));

    // Atualiza a exibição dos dados do aluno
    document.getElementById('student-name').innerText = nome;
    document.getElementById('student-id').innerHTML = `<span class="title">Matrícula:</span><br><span class="info">${matricula}</span>`;
    document.getElementById('student-dob').innerHTML = `<span class="title">Data de Nascimento:</span><br><span class="info">${dataNascimento}</span>`;
    document.getElementById('student-class').innerHTML = `<span class="title">Turma:</span><br><span class="info">${turma}</span>`;
    document.getElementById('student-age').innerHTML = `<span class="title">Idade:</span><br><span class="info">${calcularIdade(dataNascimento)} anos</span>`;
    document.getElementById('mother-name').innerText = `Mãe: ${motherName}`;
    document.getElementById('mother-phone').innerText = `Telefone: ${motherPhone}`;
    document.getElementById('mother-email').innerText = `Email: ${motherEmail}`;
    document.getElementById('father-name').innerText = `Pai: ${fatherName}`;
    document.getElementById('father-phone').innerText = `Telefone: ${fatherPhone}`;
    document.getElementById('father-email').innerText = `Email: ${fatherEmail}`;
    document.getElementById('student-email').innerText = `Email: ${studentEmail}`;
    document.getElementById('observations').innerText = observations;

    // Atualiza a foto do aluno se uma nova foto for selecionada
    if (foto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-photo').src = e.target.result;
        };
        reader.readAsDataURL(foto);
    }

    // Esconde o formulário de edição
    toggleEditForm();
}
