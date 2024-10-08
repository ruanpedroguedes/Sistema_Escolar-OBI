document.addEventListener('DOMContentLoaded', () => {
    // Seletores dos elementos do DOM
    const turmaDropdown = document.getElementById('turma-dropdown');
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const mesDropdown = document.getElementById('mes-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const agendaContainer = document.getElementById('agenda-container');

    // Modal e botões
    const addTaskButton = document.getElementById('add-agenda-button');
    const taskModal = document.getElementById('task-modal');
    const closeButton = taskModal.querySelector('.close-button');
    const createTaskButton = document.getElementById('create-task-button');

    // Estrutura de dados para armazenar as tarefas por unidade, curso e turma
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

    // Atualizar os cursos com base na unidade selecionada
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

    // Atualizar as turmas com base no curso selecionado
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

    // Mostrar as tarefas de acordo com a turma selecionada
    turmaDropdown.addEventListener('change', () => {
        updateMateriasDisplay();
    });

    // Evento para abrir o modal de adicionar tarefa
    addTaskButton.addEventListener('click', () => {
        taskModal.style.display = 'block';
    });

    // Fechar o modal ao clicar no botão de fechar
    closeButton.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    // Adicionar tarefa à turma selecionada
    createTaskButton.addEventListener('click', () => {
        const selectedUnidade = unidadeDropdown.value;
        const selectedCurso = cursoDropdown.value;
        const selectedTurma = turmaDropdown.value;

        if (selectedUnidade === 'none' || selectedCurso === 'none' || selectedTurma === 'none') {
            alert('Por favor, selecione Unidade, Curso e Turma antes de adicionar uma tarefa.');
            return;
        }

        const taskInput = document.getElementById('task-title').value.trim();
        const descriptionInput = document.getElementById('task-description').value.trim();
        const dateInput = document.getElementById('task-date').value.trim();

        // Capturar a hora atual no momento de criar a tarefa
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (taskInput && descriptionInput && dateInput) {
            // Cria um objeto de tarefa e adiciona à turma correspondente
            const newTask = {
                titulo: taskInput,
                descricao: descriptionInput,
                data: `${dateInput} - ${formattedTime}` // Inclui a hora junto com a data
            };
            materiasData[selectedUnidade][selectedCurso][selectedTurma].push(newTask);

            // Atualiza a exibição e fecha o modal
            updateMateriasDisplay();
            taskModal.style.display = 'none';
        } else {
            alert("Por favor, preencha todos os campos da tarefa.");
        }
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    // Função para formatar a turma para exibição
    function formatTurma(turma) {
        return `${turma.charAt(0)}° Ano - ${turma.charAt(1)}`;
    }

    // Função para limpar seleções e esconder o título da turma
    function clearSelection() {
        turmaTitulo.style.display = "none";
    }

    // Função para atualizar a exibição das tarefas
    function updateMateriasDisplay() {
        const selectedUnidade = unidadeDropdown.value;
        const selectedCurso = cursoDropdown.value;
        const selectedTurma = turmaDropdown.value;

        // Limpa o container antes de exibir as tarefas
        agendaContainer.innerHTML = '';

        if (selectedUnidade !== 'none' && selectedCurso !== 'none' && selectedTurma !== 'none') {
            turmaTitulo.innerHTML = `Turma Selecionada: ${formatTurma(selectedTurma)}`;
            turmaTitulo.style.display = 'block';

            const tarefas = materiasData[selectedUnidade][selectedCurso][selectedTurma];
            if (tarefas.length > 0) {
                tarefas.forEach(tarefa => {
                    const tarefaHTML = `
                        <div class="agenda-item">
                            <div>
                                <h3>${tarefa.titulo}</h3>
                                <p>${tarefa.descricao}</p>
                            </div>
                            <span>${tarefa.data}</span>
                        </div>
                    `;
                    agendaContainer.innerHTML += tarefaHTML;
                });
            } else {
                agendaContainer.innerHTML = '<p>Não há tarefas para esta turma.</p>';
            }
        }
    }
});
