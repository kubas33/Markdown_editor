
const textarea = document.querySelector('.documents-container textarea');

// textarea.addEventListener('input', () => {
//     textarea.style.height = 'auto';
//     textarea.style.height = textarea.scrollHeight + 'px';
//     textarea.scrollTop = textarea.scrollHeight;
// });

document.addEventListener('DOMContentLoaded', () => {
    // Oblicz początkową wysokość textarea na podstawie zawartości
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
});