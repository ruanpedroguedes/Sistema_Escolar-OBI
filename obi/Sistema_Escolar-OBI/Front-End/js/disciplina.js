document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.querySelector('.add-button');
    const formContainer = document.getElementById('form-container');
    const saveCardButton = document.getElementById('create-post');
    const closeIcon = document.getElementById('closeIcon');
    const materialsIcon = document.querySelector('a[title="Materiais"]'); // Seletor para o ícone de materiais
    const materialsCard = document.getElementById('materials-card');
    const closeMaterialsCard = document.getElementById('closeMaterialsCard');

    formContainer.style.display = 'none';
    materialsCard.style.display = 'none'; // Esconde o card de materiais inicialmente

    // Verifica a seção inicial da URL e define o ícone ativo
    const urlParams = new URLSearchParams(window.location.search);
    const initialSection = urlParams.get('section') || 'avisos'; // Padrão para avisos
    const disciplinaNome = urlParams.get('disciplina') || 'Título da Disciplina'; // Padrão para o título da disciplina

    setActiveIcon(initialSection);
    document.getElementById(`${initialSection}-section`).classList.add('active'); // Ativa a seção correspondente

    // Adiciona a classe 'active' ao botão da aba correspondente
    const initialTabButton = document.querySelector(`.tab-button[data-tab="${initialSection}"]`);
    if (initialTabButton) {
        initialTabButton.classList.add('active');
    }

    // Define o título da disciplina
    const disciplinaTitulo = document.getElementById('disciplina-titulo');
    disciplinaTitulo.textContent = disciplinaNome;

    // Função para abrir o modal e definir a seção correspondente
    addButton.addEventListener('click', function () {
        formContainer.style.display = 'flex';
        resetForm();

        // Ativar o ícone correspondente à aba atual
        const activeTab = document.querySelector('.tab-button.active');
        const cardType = activeTab ? activeTab.dataset.tab : initialSection; // Usar a seção inicial
        setActiveIcon(cardType);
    });

    closeIcon.addEventListener('click', function () {
        formContainer.style.display = 'none';
    });

    formContainer.addEventListener('click', function (event) {
        if (event.target === formContainer) {
            formContainer.style.display = 'none';
        }
    });

    saveCardButton.addEventListener('click', function () {
        const activeIcon = document.querySelector('.small-icon.active');
        const cardType = activeIcon ? activeIcon.title.toLowerCase() : 'avisos'; // Define 'avisos' como padrão
        const cardAuthor = document.getElementById('card-author').value;
        const cardDate = document.getElementById('card-date').value;
        const cardContent = document.getElementById('post-content').value;

        if (cardAuthor && cardDate && cardContent) {
            createRegularCard(cardType, cardAuthor, cardDate, cardContent);
            formContainer.style.display = 'none';
            clearForm();
            setActiveIcon(cardType); // Garante que o ícone correto fique ativo
        } else {
            alert("Por favor, preencha todos os campos.");
            return;
        }
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

    function clearForm() {
        document.getElementById('card-author').value = '';
        document.getElementById('card-date').value = '';
        document.getElementById('post-content').value = '';
    }

    function resetForm() {
        clearForm();
        const smallIcons = document.querySelectorAll('.small-icon');
        smallIcons.forEach(icon => icon.classList.remove('active')); // Remover 'active' de todos os ícones
    }

    function setActiveIcon(cardType) {
        const smallIcons = document.querySelectorAll('.small-icon');
        smallIcons.forEach(icon => {
            if (icon.title.toLowerCase() === cardType) {
                icon.classList.add('active'); // Ativa o ícone correspondente
                changeIconImage(icon, true); // Altera a imagem para a versão clicada
            } else {
                icon.classList.remove('active'); // Remove 'active' dos outros ícones
                changeIconImage(icon, false); // Altera a imagem para a versão padrão
            }
        });
    }

    // Função para trocar a imagem do ícone
    function changeIconImage(icon, isActive) {
        const iconTitle = icon.title.toLowerCase();
        if (isActive) {
            icon.src = `img/${iconTitle}Clicado.png`; // Muda para a versão clicada
        } else {
            icon.src = `img/${iconTitle}.png`; // Muda para a versão padrão
        }
    }

    // Funcionalidade das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const selectedTab = button.getAttribute('data-tab');
            document.getElementById(`${selectedTab}-section`).classList.add('active');
            setActiveIcon(selectedTab); // Altera o ícone para o estado clicado
        });
    });

    // Adiciona comportamento para os ícones
    const smallIcons = document.querySelectorAll('.small-icon');
    smallIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const iconTitle = icon.title.toLowerCase();
            // Altera a aba ativa
            tabButtons.forEach(button => {
                button.classList.remove('active');
                if (button.getAttribute('data-tab') === iconTitle) {
                    button.classList.add('active'); // Ativa o botão da aba correspondente
                }
            });
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${iconTitle}-section`).classList.add('active');
            setActiveIcon(iconTitle); // Altera o ícone para o estado clicado

            // Atualiza o tipo de card para o tipo correto
            resetForm();
            setActiveIcon(iconTitle); // Garante que o ícone correto fique ativo
        });
    });

    // Adiciona comportamento para o botão de aviso
    const avisoIcon = document.querySelector('img[title="Aviso"]');
    avisoIcon.addEventListener('click', function () {
        // Mudar a aba para a seção de avisos
        const avisoButton = document.querySelector('.tab-button[data-tab="avisos"]');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        avisoButton.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById('avisos-section').classList.add('active');

        // Altera o ícone para o estado clicado e o marca como ativo
        setActiveIcon('avisos'); // Garante que o ícone de aviso fique ativo

        // Marcar o ícone de aviso como ativo
        smallIcons.forEach(icon => {
            icon.classList.remove('active');
            changeIconImage(icon, false); 
        });
        setActiveIcon('aviso'); 
    });

    // Adicionando a funcionalidade para mudar o estilo ao clicar em "Materiais"
    materialsIcon.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link
        materialsCard.style.display = 'block'; // Mostra o card de materiais
        materialsCard.classList.add('materials-card');
        
        // Altera o placeholder e estilo do campo de conteúdo
        const postContent = document.getElementById('post-content');
        postContent.placeholder = 'Escreva algo\nCole um link aqui';
        postContent.classList.add('materiais-style');
    });

    closeMaterialsCard.addEventListener('click', function () {
        materialsCard.style.display = 'none'; // Esconde o card ao clicar no ícone de fechar
        materialsCard.classList.remove('materials-card');

        // Limpa o campo de conteúdo
        const postContent = document.getElementById('post-content');
        postContent.placeholder = 'Escreva algo';
        postContent.classList.remove('materiais-style');
    });

    document.querySelectorAll('.small-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const iconType = e.target.alt; // Pegamos o tipo de ícone pelo atributo alt

                       // Remover qualquer classe de estilo aplicada anteriormente
                       document.querySelectorAll('.small-icon').forEach(icon => {
                        icon.classList.remove('active');
                        changeIconImage(icon, false); // Muda para a imagem padrão
                    });
        
                    // Adicionar a classe de ativo ao ícone selecionado
                    e.target.classList.add('active');
                    changeIconImage(e.target, true); // Muda para a imagem clicada
        
                    // Mudar a aba para a seção correspondente ao ícone clicado
                    const activeTabButton = document.querySelector(`.tab-button[data-tab="${iconType}"]`);
                    if (activeTabButton) {
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        activeTabButton.classList.add('active');
        
                        tabContents.forEach(content => content.classList.remove('active'));
                        document.getElementById(`${iconType}-section`).classList.add('active');
        
                        setActiveIcon(iconType); // Garante que o ícone correto fique ativo
                    }
                });
            });
        
            // Fechar card de materiais ao clicar fora
            materialsCard.addEventListener('click', function (event) {
                if (event.target === materialsCard) {
                    materialsCard.style.display = 'none'; // Esconde o card de materiais
                    materialsCard.classList.remove('materials-card');
        
                    // Limpa o campo de conteúdo
                    const postContent = document.getElementById('post-content');
                    postContent.placeholder = 'Escreva algo';
                    postContent.classList.remove('materiais-style');
                }
            });
        });
        