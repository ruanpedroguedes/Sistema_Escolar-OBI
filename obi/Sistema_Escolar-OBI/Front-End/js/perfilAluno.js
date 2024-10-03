document.addEventListener('DOMContentLoaded', function () {
    // Pega os detalhes do aluno do localStorage
    const alunoSelecionado = JSON.parse(localStorage.getItem('alunoSelecionado'));

    if (alunoSelecionado) {
        document.getElementById('nome-aluno').innerText = `Nome: ${alunoSelecionado.nome}`;
        document.getElementById('matricula-aluno').innerText = `Matrícula: ${alunoSelecionado.matricula}`;
        document.getElementById('data-nascimento').innerText = `Data de Nascimento: ${alunoSelecionado.dataNascimento}`;
        
        // Calcula a idade do aluno com base na data de nascimento
        const idade = calcularIdade(alunoSelecionado.dataNascimento);
        document.getElementById('idade-aluno').innerText = `Idade: ${idade} anos`;
    } else {
        document.getElementById('perfil-info').innerText = "Nenhum aluno selecionado.";
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
