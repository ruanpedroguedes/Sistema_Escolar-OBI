function atualizarCampos() {
          const tipoUsuario = document.getElementById('tipoUsuario').value;
          
          // Esconder todos os campos específicos
          document.getElementById('alunoCampos').style.display = 'none';
          document.getElementById('professorCampos').style.display = 'none';
          document.getElementById('coordenacaoCampos').style.display = 'none';
          
          // Mostrar campos conforme a seleção do usuário
          if (tipoUsuario === 'aluno') {
            document.getElementById('alunoCampos').style.display = 'block';
          } else if (tipoUsuario === 'professor') {
            document.getElementById('professorCampos').style.display = 'block';
          } else if (tipoUsuario === 'coordenacao') {
            document.getElementById('coordenacaoCampos').style.display = 'block';
          }
        }
        