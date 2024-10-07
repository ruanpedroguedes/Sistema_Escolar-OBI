document.addEventListener('DOMContentLoaded', async () => {
          const API_URL = 'http://localhost:3000/api/alunos/all';
          
          try {
              const response = await fetch(API_URL);
              const alunos = await response.json();
      
              if (response.ok) {
                  renderAlunos(alunos);
              } else {
                  console.error('Erro ao obter alunos:', alunos.message);
              }
          } catch (error) {
              console.error('Erro na requisição:', error);
          }
      });
      
      function renderAlunos(alunos) {
          const studentCardsContainer = document.getElementById('student-cards');
          studentCardsContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior
      
          alunos.forEach(aluno => {
              const card = document.createElement('div');
              card.className = 'student-card';
      
              card.innerHTML = `
                  <div class="student-image">
                      <img src="img/aluno.png" alt="Foto do Aluno">
                  </div>
                  <div class="info">
                      <div class="name">${aluno.username}</div>
                      <div class="details">
                          <div class="turma">${aluno.turma}</div>
                          <div class="matricula">Matrícula: <span>${aluno._id}</span></div>
                          <div class="data-nascimento">Data de Nascimento: <span>${new Date(aluno.dateOfBirth).toLocaleDateString()}</span></div>
                      </div>
                  </div>
                  <button class="details-button">></button>
              `;
      
              studentCardsContainer.appendChild(card);
          });
      
          // Exibir os elementos agora que foram preenchidos
          document.getElementById('turma-titulo').style.display = 'block';
          studentCardsContainer.style.display = 'flex'; // Supondo que você queira os cartões em layout flexível
      }
      

<<<<<<< HEAD
    const materiasData = {
        'Mediotec Recife': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []

            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            }
        },
        'Mediotec Paulista': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Logística': {
               '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            }
        },
        'Mediotec Caruaru': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            }
        },
        'Mediotec Petrolina': {
            'Análise e Desenvolvimento de Sistemas': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Informática': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            },
            'Logística': {
                '1A': [],
                '1B': [],
                '1C': [],
                '1D': [],
                '2A': [],
                '2B': [],
                '2C': [],
                '2D': [],
                '3A': [],
                '3B': [],
                '3C': [],
                '3D': []
            }
        }
    };

    // Fetch students data from the backend and populate materiasData
    function fetchStudentsFromBackend() {
        fetch('http://localhost:3000/api/students')
            .then(response => response.json())
            .then(data => {
                data.forEach(aluno => {
                    const unidade = 'Mediotec Recife'; // Ajuste de acordo com a unidade do aluno, se disponível no backend
                    const curso = 'Análise e Desenvolvimento de Sistemas'; // Ajuste de acordo com o curso do aluno, se disponível no backend
                    const turma = aluno.turma;

                    if (materiasData[unidade] && materiasData[unidade][curso] && materiasData[unidade][curso][turma]) {
                        materiasData[unidade][curso][turma].push({
                            nome: aluno.numeroMatricula,
                            turma: turma,
                            matricula: aluno.numeroMatricula,
                            dataNascimento: aluno.idade,
                            foto: aluno.foto || 'img/aluno.png'
                        });
                    }
                });
            })
            .catch(error => console.error('Erro ao buscar alunos:', error));
    }

    fetchStudentsFromBackend();

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

    function formatTurma(turma) {
        const ano = turma.charAt(0); // Obtém o primeiro caractere (1, 2 ou 3)
        const letra = turma.charAt(1); // Obtém a letra da turma (A, B ou C)
        return `${ano}° Ano - ${letra.toUpperCase()}`; // Formata a string
    }

    function updateStudentCardsDisplay() {
        const unidadeSelecionada = unidadeDropdown.value;
        const cursoSelecionado = cursoDropdown.value;
        const turmaSelecionada = turmaDropdown.value;

        studentCards.innerHTML = ''; // Limpa o conteúdo atual

        if (unidadeSelecionada && cursoSelecionado && turmaSelecionada) {
            materiasData[unidadeSelecionada][cursoSelecionado][turmaSelecionada].forEach(aluno => {
                const newCard = document.createElement('div');
                newCard.classList.add('student-card');
                newCard.innerHTML = `
                    <div class="student-image">
                        <img src="${aluno.foto}" alt="Foto do Aluno">
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
            if (button.querySelector('img').alt === 'Agenda') {
                window.location.href = 'homepageCoordenacao.html';
            } else if (button.querySelector('img').alt === 'Carômetro') {
                window.location.href = 'carometro.html';
            }
        });
    });

    const carometroButton = document.querySelector('.nav-button.active');
    carometroButton.addEventListener('click', function() {
        const imgElement = carometroButton.querySelector('img');
        imgElement.src = imgElement.src.includes('carometro.png') ? 'img/carometroClicado.png' : 'img/carometro.png';
    });
});
=======
      function renderAlunos(alunos) {
        const studentCardsContainer = document.getElementById('student-cards');
        studentCardsContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior
    
        alunos.forEach(aluno => {
            const card = document.createElement('div');
            card.className = 'student-card';
    
            card.innerHTML = `
                <div class="student-image">
                    <img src="img/aluno.png" alt="Foto do Aluno">
                </div>
                <div class="info">
                    <div class="name">${aluno.username}</div>
                    <div class="details">
                        <div class="turma">${aluno.turma}</div>
                        <div class="matricula">Matrícula: <span>${aluno._id}</span></div>
                        <div class="data-nascimento">Data de Nascimento: <span>${new Date(aluno.dateOfBirth).toLocaleDateString()}</span></div>
                    </div>
                </div>
                <button class="details-button" data-id="${aluno._id}">></button>
            `;
    
            studentCardsContainer.appendChild(card);
        });
    
        // Adiciona evento de clique aos botões de detalhes
        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', () => {
                const studentId = button.getAttribute('data-id');
                window.location.href = `perfilAluno.html?id=${studentId}`;
            });
        });
    
        // Exibir os elementos agora que foram preenchidos
        document.getElementById('turma-titulo').style.display = 'block';
        studentCardsContainer.style.display = 'flex'; // Supondo que você queira os cartões em layout flexível
    }
    
>>>>>>> 4de325c4bdd483a436627194b222cbb1651530e7
