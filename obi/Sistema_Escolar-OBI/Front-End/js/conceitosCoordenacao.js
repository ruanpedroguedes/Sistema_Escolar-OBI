document.addEventListener('DOMContentLoaded', () => {
          fetch('http://localhost:3000/api/conceitos-coordenacao')
              .then(response => response.json())
              .then(data => {
                  const tableBody = document.getElementById('conceitos-table-body');
                  data.forEach(conceito => {
                      const row = document.createElement('tr');
                      
                      const nomeCell = document.createElement('td');
                      nomeCell.textContent = conceito.alunoId ? conceito.alunoId.username : 'N/A';
                      row.appendChild(nomeCell);
                      
                      const turmaCell = document.createElement('td');
                      turmaCell.textContent = conceito.alunoId ? conceito.alunoId.turma : 'N/A';
                      row.appendChild(turmaCell);
                      
                      const materiaCell = document.createElement('td');
                      materiaCell.textContent = conceito.materia;
                      row.appendChild(materiaCell);
                      
                      const av1Cell = document.createElement('td');
                      av1Cell.textContent = conceito.av1;
                      row.appendChild(av1Cell);
                      
                      const av2Cell = document.createElement('td');
                      av2Cell.textContent = conceito.av2;
                      row.appendChild(av2Cell);
                      
                      const av3Cell = document.createElement('td');
                      av3Cell.textContent = conceito.av3;
                      row.appendChild(av3Cell);
                      
                      const conceitoFinalCell = document.createElement('td');
                      conceitoFinalCell.textContent = conceito.conceitoFinal;
                      row.appendChild(conceitoFinalCell);
                      
                      tableBody.appendChild(row);
                  });
              })
              .catch(error => console.error('Erro ao buscar dados:', error));
      });


