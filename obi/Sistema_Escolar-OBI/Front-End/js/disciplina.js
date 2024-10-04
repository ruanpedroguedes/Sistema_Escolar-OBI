document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.querySelector('.add-button');
    const formContainer = document.getElementById('form-container');
    const saveCardButton = document.getElementById('save-card');
    const cancelButton = document.getElementById('cancel');

    formContainer.style.display = 'none';

    addButton.addEventListener('click', function () {
        formContainer.style.display = 'flex';
        resetForm();
    });

    cancelButton.addEventListener('click', function () {
        formContainer.style.display = 'none';
    });

    formContainer.addEventListener('click', function (event) {
        if (event.target === formContainer) {
            formContainer.style.display = 'none';
        }
    });

    document.getElementById('card-type').addEventListener('change', function () {
        const selectedType = this.value;
        const pollOptionsContainer = document.getElementById('poll-options-container');

        if (selectedType === 'enquetes') {
            pollOptionsContainer.style.display = 'block';
        } else {
            pollOptionsContainer.style.display = 'none';
        }
    });

    document.getElementById('poll-option-count').addEventListener('change', function () {
        const count = parseInt(this.value);
        document.getElementById('poll-option2-container').style.display = (count >= 2) ? 'block' : 'none';
        document.getElementById('poll-option3-container').style.display = (count === 3) ? 'block' : 'none';
    });

    saveCardButton.addEventListener('click', function () {
        const cardType = document.getElementById('card-type').value;
        const cardAuthor = document.getElementById('card-author').value;
        const cardDate = document.getElementById('card-date').value;
        const cardContent = document.getElementById('card-content').value;

        if (cardType === 'enquetes') {
            const optionCount = parseInt(document.getElementById('poll-option-count').value);
            const options = [
                document.getElementById('poll-option1').value,
                document.getElementById('poll-option2').value,
                document.getElementById('poll-option3').value,
            ].slice(0, optionCount);

            if (options.some(option => !option)) {
                alert("Por favor, preencha todas as opções da enquete.");
                return;
            }

            createPollCard(cardType, cardAuthor, cardDate, cardContent, options);
        } else if (cardAuthor && cardDate && cardContent) {
            createRegularCard(cardType, cardAuthor, cardDate, cardContent);
        } else {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        formContainer.style.display = 'none';
        clearForm();
    });

    function createRegularCard(cardType, cardAuthor, cardDate, cardContent) {
        const section = document.getElementById(`${cardType}-section`);
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <h3>${cardType.charAt(0).toUpperCase() + cardType.slice(1)}</h3>
            <p><strong>Autor:</strong> ${cardAuthor}</p>
            <p><strong>Data:</strong> ${cardDate}</p>
            <p>${cardContent}</p>
        `;
        section.appendChild(newCard);
    }

    function createPollCard(cardType, cardAuthor, cardDate, cardContent, options) {
        const section = document.getElementById(`${cardType}-section`);
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <h3>Enquete</h3>
            <p><strong>Autor:</strong> ${cardAuthor}</p>
            <p><strong>Data:</strong> ${cardDate}</p>
            <p>${cardContent}</p>
            <div class="poll">
                ${options.map((option, index) => `
                    <div class="poll-text">
                        <p>${option}: <span class="poll-votes" data-option="${index + 1}">0</span></p>
                        <button class="vote-button" data-option="${index + 1}">Votar</button>
                    </div>
                `).join('')}
            </div>
        `;

        const voteButtons = newCard.querySelectorAll('.vote-button');
        voteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const optionIndex = this.getAttribute('data-option');
                const votesElement = newCard.querySelector(`.poll-votes[data-option="${optionIndex}"]`);
                const currentVotes = parseInt(votesElement.innerText);
                votesElement.innerText = currentVotes + 1;
            });
        });

        section.appendChild(newCard);
    }

    function clearForm() {
        document.getElementById('card-author').value = '';
        document.getElementById('card-date').value = '';
        document.getElementById('card-content').value = '';
        document.getElementById('poll-option1').value = '';
        document.getElementById('poll-option2').value = '';
        document.getElementById('poll-option3').value = '';
    }

    function resetForm() {
        clearForm();
        document.getElementById('poll-options-container').style.display = 'none';
        document.getElementById('poll-option2-container').style.display = 'none';
        document.getElementById('poll-option3-container').style.display = 'none';
    }

    // Obtém o parâmetro 'nome' da URL e define o título da disciplina
    const urlParams = new URLSearchParams(window.location.search);
    const disciplinaNome = urlParams.get('nome');
    const titulo = document.getElementById('disciplina-titulo');

    if (disciplinaNome) {
        titulo.innerText = disciplinaNome;
    } else {
        titulo.innerText = 'Título da Disciplina';
    }

    // Redirecionamento de navegação
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons[0].addEventListener('click', () => {
        window.location.href = 'homepageCoordenacao.html';
    });

    navButtons[1].addEventListener('click', () => {
        window.location.href = 'disciplinas.html';
    });

    navButtons[2].addEventListener('click', () => {
        window.location.href = 'perfilCoordenacao.html';
    });
});
