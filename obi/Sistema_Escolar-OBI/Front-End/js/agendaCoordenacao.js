document.addEventListener('DOMContentLoaded', () => {
    const turmaDropdown = document.getElementById('turma-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const addTaskButton = document.getElementById('add-agenda-button'); // Botão para abrir o modal
    const taskModal = document.getElementById('task-modal'); // Obter o modal através do ID
    const closeButton = taskModal.querySelector('.close-button'); // Seleciona o botão de fechar
    const createTaskButton = document.getElementById('create-task-button'); // Botão para criar a tarefa

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

    // Adiciona eventos para atualizar os filtros
    unidadeDropdown.addEventListener('change', () => {
        cursoDropdown.innerHTML = `<option value="none">Selecione o Curso</option>`;
        turmaDropdown.innerHTML = `<option value="none">Selecione a Turma</option>`;
        
        const selectedUnidade = unidadeDropdown.value;

        if (selectedUnidade !== "none") {
            const cursos = Object.keys(materiasData[selectedUnidade]);
            cursos.forEach(curso => {
                cursoDropdown.innerHTML += `<option value="${curso}">${curso}</option>`;
            });
        }

        clearSelection();
        updateMateriasDisplay();
    });

    cursoDropdown.addEventListener('change', () => {
        turmaDropdown.innerHTML = `<option value="none">Selecione a Turma</option>`;

        const selectedUnidade = unidadeDropdown.value;
        const selectedCurso = cursoDropdown.value;

        if (selectedUnidade !== "none" && selectedCurso !== "none") {
            const turmas = Object.keys(materiasData[selectedUnidade][selectedCurso]);
            turmas.forEach(turma => {
                turmaDropdown.innerHTML += `<option value="${turma}">${formatTurma(turma)}</option>`;
            });
        }

        clearSelection();
        updateMateriasDisplay();
    });

    turmaDropdown.addEventListener('change', () => {
        const selectedTurma = turmaDropdown.value;

        if (selectedTurma === "none") {
            turmaTitulo.style.display = "none";
            addMateriaButton.style.display = "none";
            materiasContainer.innerHTML = ''; // Limpa os cards ao trocar para "none"
        } else {
            turmaTitulo.innerHTML = `Turma Selecionada: ${formatTurma(selectedTurma)}`;
            turmaTitulo.style.display = "block"; // Exibe a turma selecionada
            addMateriaButton.style.display = "block"; // Mostra o botão de adicionar matéria
            updateMateriasDisplay();
        }
    });

    // Evento para abrir o modal
    addTaskButton.addEventListener('click', () => {
        taskModal.style.display = 'block'; // Exibe o modal
    });

    // Evento para fechar o modal
    closeButton.addEventListener('click', () => {
        taskModal.style.display = 'none'; // Oculta o modal
    });

    // Adiciona evento para criar a tarefa
    createTaskButton.addEventListener('click', () => {
        const taskInput = document.getElementById('task-title').value.trim();
        const descriptionInput = document.getElementById('task-description').value.trim();
        const dateInput = document.getElementById('task-date').value.trim();
        
        if (taskInput) {
            alert(`Tarefa adicionada: ${taskInput}`); // Aqui você pode implementar a lógica de adicionar a tarefa
            taskModal.style.display = 'none'; // Oculta o modal
        } else {
            alert("Por favor, insira uma tarefa.");
        }
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none'; // Oculta o modal
        }
    });

    // Função para formatar a turma para exibição
    function formatTurma(turma) {
        return `${turma.charAt(0)}° Ano - ${turma.charAt(1)}`;
    }

    // Função para limpar as seleções
    function clearSelection() {
        turmaTitulo.style.display = "none";
        addMateriaButton.style.display = "none";
    }

    // Função para atualizar a exibição das matérias
    function updateMateriasDisplay() {
        // Lógica para exibir as matérias relacionadas à turma selecionada
    }
});
