document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/boletim')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const main = document.querySelector('main');
            data.forEach(aluno => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const link = document.createElement('a');
                link.href = `detalhesAluno.html?id=${aluno._id}`;
                
                const img = document.createElement('img');
                img.src = 'img/foto do aluno.png'; // Substitua pelo caminho correto da imagem
                img.alt = 'Foto do Aluno';
                
                const info = document.createElement('div');
                info.className = 'info';
                
                const nome = document.createElement('h3');
                nome.textContent = aluno.username;
                
                const turma = document.createElement('p');
                turma.textContent = `Turma: ${aluno.turma}`;
                
                info.appendChild(nome);
                info.appendChild(turma);
                card.appendChild(img);
                card.appendChild(info);

                // Adicionando o botão
                const button = document.createElement('button');
                button.className = 'details-button';
                button.textContent = '>';
                card.appendChild(button);

                link.appendChild(card);
                main.appendChild(link);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
});
