document.addEventListener('DOMContentLoaded', () => {
    const turmaDropdown = document.getElementById('turma-dropdown');
    const unidadeDropdown = document.getElementById('unidade-dropdown');
    const cursoDropdown = document.getElementById('curso-dropdown');
    const turmaTitulo = document.getElementById('turma-titulo');
    const agendaContainer = document.getElementById('agenda-container');

    const addTaskButton = document.getElementById('add-agenda-button');
    const taskModal = document.getElementById('task-modal');
    const closeButton = taskModal.querySelector('.close-button');
    const createTaskButton = document.getElementById('create-task-button');
    const updateTaskButton = document.getElementById('update-task-button');

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

    let currentTaskId = null;

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

    turmaDropdown.addEventListener('change', () => {
        updateMateriasDisplay();
    });

    addTaskButton.addEventListener('click', () => {
        taskModal.style.display = 'block';
        createTaskButton.style.display = 'block';
        updateTaskButton.style.display = 'none';
        clearForm();
    });

    closeButton.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

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
        const professorInput = document.getElementById('task-professor').value.trim();
        const disciplinaInput = document.getElementById('task-disciplina').value.trim();

        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dataHora = new Date(`${dateInput}T${formattedTime}`);

        if (!taskInput || !descriptionInput || !dateInput || !professorInput || !disciplinaInput) {
            alert("Por favor, preencha todos os campos da tarefa.");
            return;
        }

        const newTask = {
            unidade: selectedUnidade,
            curso: selectedCurso,
            turma: selectedTurma,
            professor: professorInput,
            disciplina: disciplinaInput,
            titulo: taskInput,
            descricao: descriptionInput,
            dataHora: dataHora
        };

        try {
            const response = await fetch('http://localhost:3000/api/agendaRoute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });

            if (response.ok) {
                const taskResponse = await response.json();
                materiasData[selectedUnidade][selectedCurso][selectedTurma].push(taskResponse.task);
                updateMateriasDisplay(); // Atualiza a exibição imediatamente após a criação
                taskModal.style.display = 'none';
            } else {
                const error = await response.json();
                console.error('Erro ao criar tarefa:', error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

    updateTaskButton.addEventListener('click', async () => {
        const selectedUnidade = unidadeDropdown.value;
        const selectedCurso = cursoDropdown.value;
        const selectedTurma = turmaDropdown.value;

        if (selectedUnidade === 'none' || selectedCurso === 'none' || selectedTurma === 'none') {
            alert('Por favor, selecione Unidade, Curso e Turma antes de atualizar a tarefa.');
            return;
        }

        const taskInput = document.getElementById('task-title').value.trim();
        const descriptionInput = document.getElementById('task-description').value.trim();
        const dateInput = document.getElementById('task-date').value.trim();
        const professorInput = document.getElementById('task-professor').value.trim();
        const disciplinaInput = document.getElementById('task-disciplina').value.trim();

        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dataHora = new Date(`${dateInput}T${formattedTime}`);

        if (!taskInput || !descriptionInput || !dateInput || !professorInput || !disciplinaInput) {
            alert("Por favor, preencha todos os campos da tarefa.");
            return;
        }

        const updatedTask = {
            professor: professorInput,
            disciplina: disciplinaInput,
            titulo: taskInput,
            descricao: descriptionInput,
            dataHora: dataHora
        };

        try {
            const response = await fetch(`http://localhost:3000/api/agendaRoute/${currentTaskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                const taskResponse = await response.json();
                const taskIndex = materiasData[selectedUnidade][selectedCurso][selectedTurma].findIndex(task => task._id === currentTaskId);
                materiasData[selectedUnidade][selectedCurso][selectedTurma][taskIndex] = taskResponse.task;
                updateMateriasDisplay(); // Atualiza a exibição imediatamente após a atualização
                taskModal.style.display = 'none';
            } else {
                const error = await response.json();
                console.error('Erro ao atualizar tarefa:', error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    });

    async function fetchTasks(unidade, curso, turma) {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/agendaRoute/agenda/filter?unidade=${unidade}&curso=${curso}&turma=${turma}`);
            const tarefas = await response.json();

            if (response.ok) {
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

    function formatTurma(turma) {
        return `${turma.charAt(0)}° Ano - ${turma.charAt(1)}`;
    }

    function clearSelection() {
        turmaTitulo.style.display = "none";
    }

    async function updateMateriasDisplay() {
        const selectedUnidade = unidadeDropdown.value;
        const selectedCurso = cursoDropdown.value;
        const selectedTurma = turmaDropdown.value;

        agendaContainer.innerHTML = '';

        if (selectedUnidade !== 'none' && selectedCurso !== 'none' && selectedTurma !== 'none') {
            turmaTitulo.innerHTML = `Turma Selecionada: ${formatTurma(selectedTurma)}`;
            turmaTitulo.style.display = "block";

            if (materiasData[selectedUnidade][selectedCurso][selectedTurma].length === 0) {
                await fetchTasks(selectedUnidade, selectedCurso, selectedTurma);
            }

            const tarefas = materiasData[selectedUnidade][selectedCurso][selectedTurma];
            if (tarefas.length > 0) {
                tarefas.forEach(tarefa => {
                    const tarefaHTML = `
                        <div class="agenda-item">
                            <div>
                                <h3>${tarefa.titulo}</h3>
                                <p>${tarefa.descricao}</p>
                                <p>Professor: ${tarefa.professor}</p>
                                <p>Disciplina: ${tarefa.disciplina}</p>
                            </div>
                            <span>${new Date(tarefa.dataHora).toLocaleString()}</span>
                            <button class="edit-button" data-id="${tarefa._id}">Editar</button>
                            <button class="delete-button" data-id="${tarefa._id}">Excluir</button>
                        </div>
                    `;
                    agendaContainer.innerHTML += tarefaHTML;
                });

                document.querySelectorAll('.edit-button').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const taskId = event.target.getAttribute('data-id');
                        const selectedTask = tarefas.find(task => task._id === taskId);
                        currentTaskId = taskId;
                        document.getElementById('task-title').value = selectedTask.titulo;
                        document.getElementById('task-description').value = selectedTask.descricao;
                        document.getElementById('task-date').value = new Date(selectedTask.dataHora).toISOString().split('T')[0];
                        document.getElementById('task-professor').value = selectedTask.professor;
                        document.getElementById('task-disciplina').value = selectedTask.disciplina;
                        taskModal.style.display = 'block';
                        createTaskButton.style.display = 'none';
                        updateTaskButton.style.display = 'block';
                    });
                });

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

    function clearForm() {
        document.getElementById('task-title').value = '';
        document.getElementById('task-description').value = '';
        document.getElementById('task-date').value = '';
        document.getElementById('task-professor').value = '';
        document.getElementById('task-disciplina').value = '';
    }

    loadAllTasks();
});