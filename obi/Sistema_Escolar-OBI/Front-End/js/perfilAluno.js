document.addEventListener('DOMContentLoaded', function () {
    
    const alunoSelecionado = JSON.parse(localStorage.getItem('alunoSelecionado'));

    if (alunoSelecionado) {
        document.getElementById('student-name').innerText = alunoSelecionado.nome;
        document.getElementById('student-id').innerHTML = `<span class="title">Matrícula:</span><br><span class="info">${alunoSelecionado.matricula}</span>`;
        document.getElementById('student-dob').innerHTML = `<span class="title">Data de Nascimento:</span><br><span class="info">${alunoSelecionado.dataNascimento}</span>`;
        document.getElementById('student-class').innerHTML = `<span class="title">Turma:</span><br><span class="info">${alunoSelecionado.turma}</span>`;
        
        
        const idade = calcularIdade(alunoSelecionado.dataNascimento);
        document.getElementById('student-age').innerHTML = `<span class="title">Idade:</span><br><span class="info">${idade} anos</span>`;

        
        document.getElementById('edit-name').value = alunoSelecionado.nome;
        document.getElementById('edit-id').value = alunoSelecionado.matricula;
        document.getElementById('edit-dob').value = alunoSelecionado.dataNascimento;
        document.getElementById('edit-class').value = alunoSelecionado.turma;

        
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


function toggleEditForm() {
    const editForm = document.getElementById('edit-form');
    const editIcons = document.querySelectorAll('.edit-icon');
    if (editForm.style.display === 'none' || editForm.style.display === '') {
        editForm.style.display = 'block';
        editIcons.forEach(icon => icon.style.display = 'inline'); 
    } else {
        editForm.style.display = 'none';
        editIcons.forEach(icon => icon.style.display = 'none'); 
    }
}


function editField(fieldId) {
    const field = document.getElementById(fieldId).querySelector('.info');
    field.setAttribute('contenteditable', 'true');
    field.focus();
}


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

    
    if (foto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-photo').src = e.target.result;
        };
        reader.readAsDataURL(foto);
    }

   
    toggleEditForm();
}
