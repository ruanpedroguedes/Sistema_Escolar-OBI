document.addEventListener('DOMContentLoaded', () => {
    let conceitosData = [];

    fetch('http://localhost:3000/api/conceitos-coordenacao')
        .then(response => response.json())
        .then(data => {
            conceitosData = data;
            populateDropdowns(data);
            displayConceitos(data);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));

    const materiaSelect = document.getElementById('materia-select');
    const turmaSelect = document.getElementById('turma-select');

    materiaSelect.addEventListener('change', () => {
        filterAndDisplayConceitos();
    });

    turmaSelect.addEventListener('change', () => {
        filterAndDisplayConceitos();
    });

    function populateDropdowns(data) {
        const materias = [...new Set(data.map(conceito => conceito.materia))];
        const turmas = [...new Set(data.map(conceito => conceito.alunoId ? conceito.alunoId.turma : 'N/A'))];

        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.textContent = materia;
            materiaSelect.appendChild(option);
        });

        turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma;
            option.textContent = turma;
            turmaSelect.appendChild(option);
        });
    }

    function filterAndDisplayConceitos() {
        const selectedMateria = materiaSelect.value;
        const selectedTurma = turmaSelect.value;

        const filteredData = conceitosData.filter(conceito => {
            const matchesMateria = selectedMateria ? conceito.materia === selectedMateria : true;
            const matchesTurma = selectedTurma ? (conceito.alunoId ? conceito.alunoId.turma === selectedTurma : false) : true;
            return matchesMateria && matchesTurma;
        });

        displayConceitos(filteredData);
    }

    function displayConceitos(data) {
        const tableBody = document.getElementById('conceitos-table-body');
        tableBody.innerHTML = ''; // Limpa a tabela antes de preencher

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
    }
});