const selectedOption = document.getElementById('selected-option');
const optionsContainer = document.getElementById('options-container');
const options = optionsContainer.querySelectorAll('div');

selectedOption.addEventListener('click', () => {
    optionsContainer.style.display = optionsContainer.style.display === 'none' || optionsContainer.style.display === '' 
        ? 'block' 
        : 'none';
});

options.forEach(option => {
    option.addEventListener('click', () => {
        const img = option.querySelector('img').src;
        const text = option.querySelector('span').textContent;
        selectedOption.innerHTML = `<img src="${img}" alt="${text}"><span>${text}</span>`;
        optionsContainer.style.display = 'none';
    });
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('.custom-select')) {
        optionsContainer.style.display = 'none';
    }
});


