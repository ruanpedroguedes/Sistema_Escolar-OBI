document.addEventListener('DOMContentLoaded', () => {
    // Seletores dos elementos do DOM
    const turmaDropdown = document.getElementById('turma-dropdown');
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const agendaContainer = document.getElementById('agenda-container');

    // Modal e botões
    const addTaskButton = document.getElementById('add-agenda-button');
    const taskModal = document.getElementById('task-modal');
    const closeButton = taskModal.querySelector('.close-button');
    const createTaskButton = document.getElementById('create-task-button');

    // Estrutura de dados para armazenar as tarefas filtradas
    let materiasData = {
        'Mediotec Recife': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Informática': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Logística': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            }
        },
        'Mediotec Paulista': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Informática': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Logística': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            }
        },
        'Mediotec Caruaru': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Informática': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Logística': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            }
        },
        'Mediotec Petrolina': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Informática': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            },
            'Logística': {
                '1A': [], '1B': [], '1C': [], '1D': [], '2A': [],
                '2B': [], '2C': [], '2D': [], '3A': [], '3B': [],
                '3C': [], '3D': []
            }
        }
    };
    async function loadAllTasks() {
        const unidades = ['Mediotec Recife', 'Mediotec Paulista', 'Mediotec Caruaru', 'Mediotec Petrolina'];
        for (const unidade of unidades) {
            const cursos = ['Análise e Desenvolvimento de Sistemas', 'Informática', 'Logística'];
            for (const curso of cursos) {
                const turmas = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D'];
                for (const turma of turmas) {
                    await fetchTasks(unidade, curso, turma);
                }
            }
        }
    }
    
 
    // Atualizar os cursos com base na unidade selecionada
    unidadeDropdown.addEventListener('change', () => {
        cursoDropdown.innerHTML = `<option value="none">Selecione o Curso</option>`;
        turmaDropdown.innerHTML = `<option value="none">Selecione a Turma</option>`;

        const selectedUnidade = unidadeDropdown.value;
        if (selectedUnidade !== "none") {
            const cursos = Object.keys(materiasData[selectedUnidade] || {});
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
            const turmas = Object.keys(materiasData[selectedUnidade]?.[selectedCurso] || {});
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
    createTaskButton.addEventListener('click', async () => {
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
    
        // Recuperar o ID do coordenador do localStorage
        const coordenadorId = localStorage.getItem('coordenadorId');
    
        try {
            if (taskInput && descriptionInput && dateInput && selectedUnidade && selectedCurso && selectedTurma) {
                // Formata a data completa
                const dataHora = new Date(`${dateInput}T${formattedTime}`);
    
                // Cria um objeto de tarefa
                const newTask = {
                    unidade: selectedUnidade,
                    curso: selectedCurso,
                    turma: selectedTurma,
                    titulo: taskInput,
                    descricao: descriptionInput,
                    dataHora: dataHora,
                    coordenadorId: coordenadorId
                };
    
                // Envia a tarefa para o backend
                const response = await fetch('http://localhost:3000/api/agendaRoute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTask)
                });
    
                if (response.ok) {
                    const taskResponse = await response.json();
                    // Atualiza a estrutura de dados com a nova tarefa
                    materiasData[selectedUnidade][selectedCurso][selectedTurma].push(taskResponse.task);
                    updateMateriasDisplay(); // Atualiza a exibição imediatamente após a criação
                    taskModal.style.display = 'none';
                } else {
                    const error = await response.json();
                    console.error('Erro ao criar tarefa:', error);
                }
            } else {
                alert("Por favor, preencha todos os campos da tarefa.");
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    async function fetchTasks(unidade, curso, turma) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/agendaRoute/agenda/filter?unidade=${unidade}&curso=${curso}&turma=${turma}`);
        const tarefas = await response.json();

        if (response.ok) {
            // Atualiza a estrutura de dados com as tarefas obtidas
            materiasData[unidade] = materiasData[unidade] || {};
            materiasData[unidade][curso] = materiasData[unidade][curso] || {};
            materiasData[unidade][curso][turma] = tarefas;
            console.log("Tarefas atualizadas:", tarefas);
        } else {
            console.error('Erro ao buscar tarefas filtradas:', tarefas.error);
        }
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
    }
}

    // Função para formatar a turma para exibição
    function formatTurma(turma) {
        return `${turma.charAt(0)}° Ano - ${turma.charAt(1)}`;
    }

    // Função para limpar seleções e esconder o título da turma
    function clearSelection() {
        turmaTitulo.style.display = "none";
    }

    // Função para atualizar a exibição das tarefas
    async function updateMateriasDisplay() {
        const selectedUnidade = unidadeDropdown.value;
        const selectedCurso = cursoDropdown.value;
        const selectedTurma = turmaDropdown.value;
    
        agendaContainer.innerHTML = '';
    
        if (selectedUnidade !== 'none' && selectedCurso !== 'none' && selectedTurma !== 'none') {
            turmaTitulo.innerHTML = `Turma Selecionada: ${formatTurma(selectedTurma)}`;
            turmaTitulo.style.display = "block";
    
            // Chama a função fetchTasks apenas se não houver tarefas já carregadas
            if (materiasData[selectedUnidade][selectedCurso][selectedTurma].length === 0) {
                await fetchTasks(selectedUnidade, selectedCurso, selectedTurma);
            }
        // Exibe as tarefas
        const tarefas = materiasData[selectedUnidade][selectedCurso][selectedTurma];
        if (tarefas.length > 0) {
            tarefas.forEach(tarefa => {
                const tarefaHTML = `
                    <div class="agenda-item">
                        <div>
                            <h3>${tarefa.titulo}</h3>
                            <p>${tarefa.descricao}</p>
                        </div>
                        <span>${new Date(tarefa.dataHora).toLocaleString()}</span>
                        <button class="delete-button" data-id="${tarefa._id}">Excluir</button>
                    </div>
                `;
                agendaContainer.innerHTML += tarefaHTML;
            });

            // Adiciona evento de clique para os botões de excluir
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', async (event) => {
                    const taskId = event.target.getAttribute('data-id');
                    await deleteTask(taskId);
                });
            });
        } else {
            agendaContainer.innerHTML = '<p>Não há tarefas para esta turma.</p>';
        }
    }
}
async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/agendaRoute/agenda/${taskId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remove a tarefa da estrutura de dados
            const selectedUnidade = unidadeDropdown.value;
            const selectedCurso = cursoDropdown.value;
            const selectedTurma = turmaDropdown.value;
            materiasData[selectedUnidade][selectedCurso][selectedTurma] = materiasData[selectedUnidade][selectedCurso][selectedTurma].filter(task => task._id !== taskId);
            updateMateriasDisplay(); // Atualiza a exibição após a exclusão
        } else {
            const error = await response.json();
            console.error('Erro ao excluir tarefa:', error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}
});
