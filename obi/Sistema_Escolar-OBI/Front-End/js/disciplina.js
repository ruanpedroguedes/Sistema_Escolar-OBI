document.addEventListener('DOMContentLoaded', function () {

    const avisaoBtn = document.querySelectorAll('.aviso-button');
    const materialBtn = document.querySelectorAll('.material-button');
    const enqueteBtn = document.querySelectorAll('.enquete-button');

    
    function redirecionarParaDisciplina() {
        window.location.href = 'disciplina.html';
    }

    
    avisaoBtn.forEach(button => {
        button.addEventListener('click', redirecionarParaDisciplina);
    });

    
    materialBtn.forEach(button => {
        button.addEventListener('click', redirecionarParaDisciplina);
    });

    
    enqueteBtn.forEach(button => {
        button.addEventListener('click', redirecionarParaDisciplina);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const disciplinaNome = urlParams.get('nome'); 
    
    const titulo = document.getElementById('disciplina-titulo');
    
    if (disciplinaNome) {
        titulo.innerText = disciplinaNome; 
    } else {
        titulo.innerText = 'Disciplina Desconhecida'; 
    }
});
