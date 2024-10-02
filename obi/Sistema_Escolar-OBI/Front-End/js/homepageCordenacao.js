document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('avisos-modal');
    const closeButton = document.querySelector('.close-button');

    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Lógica para os botões da barra lateral, se necessário
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

    // Função para manipular a seleção de unidade, curso e turma
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const turmaDropdown = document.getElementById('turma-dropdown');

    unidadeDropdown.addEventListener('change', function () {
        const selectedUnidade = unidadeDropdown.value;
        console.log("Unidade selecionada:", selectedUnidade);
    });

    cursoDropdown.addEventListener('change', function () {
        const selectedCurso = cursoDropdown.value;
        console.log("Curso selecionado:", selectedCurso);
    });

    turmaDropdown.addEventListener('change', function () {
        const selectedTurma = turmaDropdown.value;
        console.log("Turma selecionada:", selectedTurma);
    });
});
