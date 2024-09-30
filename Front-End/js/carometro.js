document.addEventListener('DOMContentLoaded', function () {
    const turmaDropdown = document.getElementById('turma-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const studentCards = document.getElementById('student-cards');

    
    const turmaCards = {
        "1° Ano A": [],
        "1° Ano B": [],
        "1° Ano C": []
    };

    
    turmaDropdown.addEventListener('change', function () {
        const selectedTurma = turmaDropdown.value;

        
        if (selectedTurma === "none") {
            turmaTitulo.style.display = "none";
            studentCards.style.display = "none";
            studentCards.innerHTML = ''; 
        } else {
            
            turmaTitulo.style.display = "block";
            turmaTitulo.innerText = selectedTurma;
            studentCards.style.display = "flex"; 

            
            studentCards.innerHTML = '';

            
            turmaCards[selectedTurma].forEach(cardHTML => {
                const newCard = document.createElement('div');
                newCard.classList.add('student-card');
                newCard.innerHTML = cardHTML; 
                studentCards.appendChild(newCard);
            });
        }
    });

    
    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', function () {
        const nome = prompt("Qual é o nome do aluno?");
        const ano = turmaDropdown.value; 
        const matricula = prompt("Qual é a matrícula do aluno?");
        const dataNascimento = prompt("Qual é a data de nascimento do aluno?");

        if (nome && ano && matricula && dataNascimento && ano !== "none") {
            // Criar o HTML do novo card
            const cardHTML = `
                <img src="img/aluno.png" alt="Foto do Aluno">
                <p><strong>${nome}</strong></p>
                <p class="turma-aluno">${ano}</p>
                <p>Matrícula: ${matricula}</p>
                <p>Data de Nascimento: ${dataNascimento}</p>
                <button class="details-button">></button>
            `;

            
            turmaCards[ano].push(cardHTML);

            
            if (turmaDropdown.value === ano) {
                const newCard = document.createElement('div');
                newCard.classList.add('student-card');
                newCard.innerHTML = cardHTML; 
                studentCards.appendChild(newCard);
            }
        } else {
            alert("Por favor, preencha todos os campos e selecione uma turma válida.");
        }
    });

    
    document.querySelectorAll('.nav-button')[0].addEventListener('click', () => {
        window.location.href = 'homepageCoordenacao.html'; 
    });

    document.querySelectorAll('.nav-button')[1].addEventListener('click', () => {
        window.location.href = 'carometro.html'; 
    });

   
    const carometroButton = document.querySelector('.nav-button.active');
    carometroButton.addEventListener('click', function() {
        const imgElement = carometroButton.querySelector('img');
        imgElement.src = imgElement.src.includes('carometro.png') ? 'img/carometroClicado.png' : 'img/carometro.png';
    });
});
