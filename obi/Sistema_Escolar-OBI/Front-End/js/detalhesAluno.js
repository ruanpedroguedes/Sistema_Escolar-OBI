document.addEventListener('DOMContentLoaded', () => {
          const urlParams = new URLSearchParams(window.location.search);
          const alunoId = urlParams.get('id');
      
          // Aqui você pode fazer uma requisição para obter os detalhes do aluno e preencher os campos, se necessário
          fetch(`http://localhost:3000/api/alunos/${alunoId}`)
              .then(response => response.json())
              .then(aluno => {
                  document.getElementById('aluno-nome').textContent = aluno.username;
                  document.getElementById('aluno-turma').textContent = `Turma: ${aluno.turma}`;
                  document.getElementById('aluno-nome-card').textContent = aluno.username;
                  document.getElementById('aluno-turma-card').textContent = `Turma: ${aluno.turma}`;
              })
              .catch(error => console.error('Erro ao buscar detalhes do aluno:', error));
      
          const saveButton = document.getElementById('save-button');
          saveButton.addEventListener('click', () => {
              const materia = document.getElementById('materia').value;
              const av1 = document.querySelector('input[name="av1"]:checked').value;
              const av2 = document.querySelector('input[name="av2"]:checked').value;
              const av3 = document.querySelector('input[name="av3"]:checked').value;
      
              const conceito = { alunoId, materia, av1, av2, av3 };
      
              fetch('http://localhost:3000/api/conceitos', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(conceito),
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(data => {
                  console.log('Conceito salvo:', data);
              })
              .catch(error => {
                  console.error('Erro ao salvar conceito:', error);
              });
          });
      });
      