document.addEventListener('DOMContentLoaded', () => {
          const urlParams = new URLSearchParams(window.location.search);
          const turmaId = urlParams.get('turmaId');
      
          document.getElementById('criar-comunicado-button').addEventListener('click', () => createComunicado(turmaId));
          loadComunicados(turmaId);
      });
      
      async function loadComunicados(turmaId) {
          try {
              const response = await fetch(`http://localhost:3000/api/comunicados/${turmaId}`);
              const comunicados = await response.json();
      
              const container = document.getElementById('comunicados-container');
              container.innerHTML = '';
              comunicados.forEach(comunicado => {
                  const comunicadoHTML = `
                      <div class="comunicado-card">
                          <h3>${comunicado.titulo}</h3>
                          <p>${comunicado.descricao}</p>
                          <p><small>${new Date(comunicado.data).toLocaleString()}</small></p>
                      </div>
                  `;
                  container.insertAdjacentHTML('beforeend', comunicadoHTML);
              });
          } catch (error) {
              console.error('Erro ao carregar comunicados:', error);
          }
      }
      
      async function createComunicado(turmaId) {
          const titulo = document.getElementById('titulo').value;
          const descricao = document.getElementById('descricao').value;
      
          try {
              const response = await fetch('http://localhost:3000/api/comunicados', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ turma: turmaId, titulo, descricao })
              });
      
              if (response.ok) {
                  const comunicado = await response.json();
                  addComunicadoToDOM(comunicado);
                  document.getElementById('titulo').value = '';
                  document.getElementById('descricao').value = '';
              } else {
                  const error = await response.json();
                  console.error('Erro ao criar comunicado:', error);
              }
          } catch (error) {
              console.error('Erro na requisição:', error);
          }
      }
      
      function addComunicadoToDOM(comunicado) {
          const comunicadoHTML = `
              <div class="comunicado-card">
                  <h3>${comunicado.titulo}</h3>
                  <p>${comunicado.descricao}</p>
                  <p><small>${new Date(comunicado.data).toLocaleString()}</small></p>
              </div>
          `;
          const container = document.getElementById('comunicados-container');
          container.insertAdjacentHTML('beforeend', comunicadoHTML);
      }