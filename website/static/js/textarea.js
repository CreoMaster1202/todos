let textareas = document.querySelectorAll('textarea');

textareas.forEach(textarea => {
  textarea.addEventListener('input', e => {
    textarea.style.height = '3.125rem';
    let scHight = e.target.scrollHeight;
    textarea.style.height = `${scHight}px`;
  });
});
