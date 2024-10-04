document.addEventListener('DOMContentLoaded', function () {
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const turmaDropdown = document.getElementById('turma-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const studentCards = document.getElementById('student-cards');

    const materiasData = {
        'Mediotec Recife': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': []
            }
        },
        'Mediotec Paulista': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': []
            }
        },
        'Mediotec Caruaru': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': []
            }
        },
        'Mediotec Petrolina': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': []
            }
        }
    };

    unidadeDropdown.addEventListener('change', function () {
        clearSelection();
        updateTurmaDisplay();
    });

    cursoDropdown.addEventListener('change', function () {
        clearSelection();
        updateTurmaDisplay();
    });

    turmaDropdown.addEventListener('change', function () {
        const selectedTurma = turmaDropdown.value;

        if (selectedTurma === "none") {
            turmaTitulo.style.display = "none";
            studentCards.style.display = "none";
            studentCards.innerHTML = ''; // Limpa os cards ao trocar para "none"
        } else {
            turmaTitulo.style.display = "block";
            turmaTitulo.innerText = `Turma: ${formatTurma(selectedTurma)}`; // Formata a turma
            studentCards.style.display = "flex"; // Mostra os cards
            updateStudentCardsDisplay(); // Atualiza a exibição dos cards
        }
    });

    // Função para formatar a turma
    function formatTurma(turma) {
        const ano = turma.charAt(0); // Obtém o primeiro caractere (1, 2 ou 3)
        const letra = turma.charAt(1); // Obtém a letra da turma (A, B ou C)
        return `${ano}° Ano - ${letra.toUpperCase()}`; // Formata a string
    }

    // Função para atualizar a exibição dos cards dos alunos
    function updateStudentCardsDisplay() {
        const unidadeSelecionada = unidadeDropdown.value;
        const cursoSelecionado = cursoDropdown.value;
        const turmaSelecionada = turmaDropdown.value;

        studentCards.innerHTML = ''; // Limpa o conteúdo atual

        // Verifica se a unidade, curso e turma estão selecionados
        if (unidadeSelecionada && cursoSelecionado && turmaSelecionada) {
            materiasData[unidadeSelecionada][cursoSelecionado][turmaSelecionada].forEach(aluno => {
                const newCard = document.createElement('div');
                newCard.classList.add('student-card');
                newCard.innerHTML = `
                    <div class="student-image">
                        <img src="img/aluno.png" alt="Foto do Aluno">
                    </div>
                    <div class="info">
                        <div class="name">${aluno.nome}</div>
                        <div class="details">
                            <div class="turma">Turma: <span>${aluno.turma}</span></div>
                            <div class="matricula">Matrícula: <span>${aluno.matricula}</span></div>
                            <div class="data-nascimento">Data de Nascimento: <span>${aluno.dataNascimento}</span></div>
                        </div>
                    </div>
                    <button class="details-button">></button>
                `;

                // Adiciona evento de clique para redirecionar para a página de perfil
                newCard.querySelector('.details-button').addEventListener('click', function () {
                    localStorage.setItem('alunoSelecionado', JSON.stringify(aluno));
                    window.location.href = 'perfilAluno.html';
                });

                studentCards.appendChild(newCard);
            });
        }
    }

    function clearSelection() {
        turmaDropdown.value = "none";
        turmaTitulo.style.display = "none";
        studentCards.style.display = "none";
        studentCards.innerHTML = ''; // Limpa os cards ao trocar para "none"
    }

    function updateTurmaDisplay() {
        const unidadeSelecionada = unidadeDropdown.value;
        const cursoSelecionado = cursoDropdown.value;
        const turmaSelecionada = turmaDropdown.value;

        if (unidadeSelecionada !== "none" && cursoSelecionado !== "none" && turmaSelecionada !== "none") {
            turmaTitulo.style.display = "block";
            turmaTitulo.innerText = `Turma: ${formatTurma(turmaSelecionada)}`;
            studentCards.style.display = "flex";
            updateStudentCardsDisplay();
        } else {
            turmaTitulo.style.display = "none";
            studentCards.style.display = "none";
            studentCards.innerHTML = '';
        }
    }

    const addButton = document.querySelector('.add-button');
    addButton.addEventListener('click', function () {
        const nome = prompt("Qual é o nome do aluno?");
        const unidade = unidadeDropdown.value;
        const curso = cursoDropdown.value;
        const turma = turmaDropdown.value;
        const matricula = prompt("Qual é a matrícula do aluno?");
        const dataNascimento = prompt("Qual é a data de nascimento do aluno?");

        if (nome && unidade !== "none" && curso !== "none" && turma !== "none" && matricula && dataNascimento) {
            const aluno = {
                nome: nome,
                turma: formatTurma(turma),
                matricula: matricula,
                dataNascimento: dataNascimento
            };

            materiasData[unidade][curso][turma].push(aluno);

            if (turmaDropdown.value === turma) {
                const newCard = document.createElement('div');
                newCard.classList.add('student-card');
                newCard.innerHTML = `
                    <div class="student-image">
                        <img src="img/aluno.png" alt="Foto do Aluno">
                    </div>
                    <div class="info">
                        <div class="name">${nome}</div>
                        <div class="details">
                            <div class="turma">Turma: <span>${formatTurma(turma)}</span></div>
                            <div class="matricula">Matrícula: <span>${matricula}</span></div>
                            <div class="data-nascimento">Data de Nascimento: <span>${dataNascimento}</span></div>
                        </div>
                    </div>
                    <button class="details-button">></button>
                `;

                studentCards.appendChild(newCard);

                // Adiciona evento de clique para redirecionar para a página de perfil
                newCard.querySelector('.details-button').addEventListener('click', function () {
                    localStorage.setItem('alunoSelecionado', JSON.stringify(aluno));
                    window.location.href = 'perfilAluno.html';
                });
            }
        } else {
            alert("Por favor, preencha todos os campos e selecione uma unidade, curso e turma válidos.");
        }
    });

    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'homepageCoordenacao.html'; 
        });
    });

    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'carometro.html'; 
        });
    });

    const carometroButton = document.querySelector('.nav-button.active');
    carometroButton.addEventListener('click', function() {
        const imgElement = carometroButton.querySelector('img');
        imgElement.src = imgElement.src.includes('carometro.png') ? 'img/carometroClicado.png' : 'img/carometro.png';
    });

    function adicionarAluno(turma, aluno) {
        if (materiasData[turma]) {
            materiasData[turma].push(aluno);
        }
    }
});
