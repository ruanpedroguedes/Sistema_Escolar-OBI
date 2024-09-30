document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('avisos-modal');
    const closeButton = document.querySelector('.close-button');

    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            
        });
    });

    const categories = document.querySelectorAll('.category');

    categories.forEach(section => {
        section.addEventListener('click', function () {
            categories.forEach(sec => sec.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    if (categories.length > 0) {
        categories[0].classList.add('selected');
    }

    
    function redirecionarParaDisciplina(disciplina) {
        window.location.href = `disciplina.html?nome=${encodeURIComponent(disciplina)}`; 
    }

    
    const avisoButtons = document.querySelectorAll('.aviso-button');
    const materialButtons = document.querySelectorAll('.material-button');
    const enqueteButtons = document.querySelectorAll('.enquete-button');

    
    avisoButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); 
            const disciplina = this.closest('.category').getAttribute('data-discipline');
            redirecionarParaDisciplina(disciplina);
        });
    });

    
    materialButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); 
            const disciplina = this.closest('.category').getAttribute('data-discipline');
            redirecionarParaDisciplina(disciplina);
        });
    });

    
    enqueteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); 
            const disciplina = this.closest('.category').getAttribute('data-discipline');
            redirecionarParaDisciplina(disciplina);
        });
    });
});


document.querySelectorAll('.nav-button')[1].addEventListener('click', () => {
    window.location.href = 'carometro.html';
});

const carometroButton = document.querySelector('.nav-button.active');

carometroButton.addEventListener('click', function() {
    const imgElement = carometroButton.querySelector('img');

    if (imgElement.src.includes('carometro.png')) {
        imgElement.src = 'img/carometroClicado.png'; 
    } else {
        imgElement.src = 'img/carometro.png'; 
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const turmaDropdown = document.getElementById('turma-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const studentCards = document.getElementById('student-cards');
    const turmaAlunoElements = document.querySelectorAll('.turma-aluno');

    turmaDropdown.addEventListener('change', function () {
        const selectedTurma = turmaDropdown.value;

        if (selectedTurma === "none") {
            
            turmaTitulo.style.display = "none";
            studentCards.style.display = "none";
        } else {
            
            turmaTitulo.style.display = "block";
            studentCards.style.display = "block";

            
            turmaTitulo.innerText = selectedTurma;
            turmaAlunoElements.forEach(function (element) {
                element.innerText = selectedTurma;
            });
        }
    });
});
