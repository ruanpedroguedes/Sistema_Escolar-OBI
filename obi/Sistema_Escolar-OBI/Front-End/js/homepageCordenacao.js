document.addEventListener('DOMContentLoaded', () => {
    const turmaDropdown = document.getElementById('turma-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const addMateriaButton = document.getElementById('add-materia-button');
    const materiasContainer = document.getElementById('materias-container');

    // Modal para adicionar matéria
    const modal = document.getElementById('add-materia-modal');
    const closeButton = document.querySelector('.close-button');
    const salvarMateriaButton = document.getElementById('salvar-materia-button');
    const imagemInput = document.getElementById('imagem-materia'); // Campo de entrada de imagem

    // Estrutura de dados para armazenar as matérias
    let materiasData = {
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
        'Mediotec Petrolina': {  // Nova unidade adicionada
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
            addMateriaButton.style.display = "none";
            materiasContainer.innerHTML = ''; // Limpa os cards ao trocar para "none"
        } else {
            turmaTitulo.style.display = "block";
            turmaTitulo.innerText = `Turma: ${formatTurma(selectedTurma)}`; // Formata a turma
            addMateriaButton.style.display = "block"; // Mostra o botão de adicionar
            updateMateriasDisplay(); // Atualiza a exibição das matérias
        }
    });

    // Função para formatar a turma
    function formatTurma(turma) {
        const ano = turma.charAt(0); // Obtém o primeiro caractere (1, 2 ou 3)
        const letra = turma.charAt(1); // Obtém a letra da turma (A, B ou C)
        return `${ano}° Ano - ${letra.toUpperCase()}`; // Formata a string
    }

    // Função para atualizar a exibição das matérias
    function updateMateriasDisplay() {
        const unidadeSelecionada = unidadeDropdown.value;
        const cursoSelecionado = cursoDropdown.value;
        const turmaSelecionada = turmaDropdown.value;

        materiasContainer.innerHTML = ''; // Limpa o conteúdo atual

        // Verifica se a unidade, curso e turma estão selecionados
        if (unidadeSelecionada && cursoSelecionado && turmaSelecionada) {
            materiasData[unidadeSelecionada][cursoSelecionado][turmaSelecionada].forEach(materia => {
                const newCard = document.createElement('div');
                newCard.classList.add('category');
                newCard.innerHTML = `
                    <img src="${materia.imagem}" alt="${materia.nome}" class="materia-imagem" />
                    <p><span class="discipline">${materia.nome}</span></p>
                    <p><span class="professor">${materia.professor}</span></p>
                    <div class="buttons">
                        <button class="button blue">Avisos</button>
                        <button class="button material-button">Materiais</button>
                        <button class="button enquete-button">Enquetes</button>
                    </div>
                `;

                // Adiciona o evento de clique para cada botão
                newCard.querySelector('.blue').addEventListener('click', () => {
                    window.location.href = 'disciplina.html';
                });
                newCard.querySelector('.material-button').addEventListener('click', () => {
                    window.location.href = 'disciplina.html';
                });
                newCard.querySelector('.enquete-button').addEventListener('click', () => {
                    window.location.href = 'disciplina.html';
                });

                materiasContainer.appendChild(newCard);
            });
        }
    }

    // Limpa a seleção atual
    function clearSelection() {
        turmaDropdown.value = "none";
        turmaTitulo.style.display = "none";
        addMateriaButton.style.display = "none";
        materiasContainer.innerHTML = ''; // Limpa os cards ao trocar de unidade ou curso
    }

    // Atualiza as opções de turma com base na unidade e curso selecionados
    function updateTurmaDisplay() {
        const unidadeSelecionada = unidadeDropdown.value;
        const cursoSelecionado = cursoDropdown.value;

        turmaDropdown.innerHTML = `<option value="none">Selecione a Turma</option>`;

        if (unidadeSelecionada && cursoSelecionado) {
            Object.keys(materiasData[unidadeSelecionada][cursoSelecionado]).forEach(turma => {
                turmaDropdown.innerHTML += `<option value="${turma}">${formatTurma(turma)}</option>`;
            });
        }
    }

    // Função para abrir o modal de adicionar matéria
    addMateriaButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Função para fechar o modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Função para salvar nova matéria
    salvarMateriaButton.addEventListener('click', () => {
        const materiaNome = document.getElementById('materia-nome').value;
        const professorNome = document.getElementById('professor-nome').value;
        const selectedTurma = turmaDropdown.value;
        const unidadeSelecionada = unidadeDropdown.value;
        const cursoSelecionado = cursoDropdown.value;

        // Obter a imagem selecionada
        const imagemFile = imagemInput.files[0];
        const reader = new FileReader();

        if (materiaNome && professorNome && selectedTurma !== "none" && imagemFile) {
            reader.onload = function (e) {
                const newMateria = {
                    nome: materiaNome,
                    professor: professorNome,
                    imagem: e.target.result // Armazena a imagem na estrutura de dados
                };

                // Adiciona a nova matéria à turma correspondente
                materiasData[unidadeSelecionada][cursoSelecionado][selectedTurma].push(newMateria);
                updateMateriasDisplay(); // Atualiza a exibição
                modal.style.display = 'none'; // Fecha o modal
                clearModalInputs(); // Limpa os campos do modal
            };

            reader.readAsDataURL(imagemFile); // Lê o arquivo como URL de dados
        } else {
            alert('Por favor, preencha todos os campos e selecione uma turma e uma imagem.');
        }
    });

    // Limpa os campos do modal
    function clearModalInputs() {
        document.getElementById('materia-nome').value = '';
        document.getElementById('professor-nome').value = '';
        imagemInput.value = ''; // Limpa o campo de imagem
    }
});
