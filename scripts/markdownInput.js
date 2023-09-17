var MarkdownIt = require('markdown-it');


const md = new MarkdownIt({
    breaks: true,
    html: true, // Zezwól na HTML w treści Markdown
    linkify: true,
  });

const markdown = document.querySelector('.documents-container textarea');
const content = document.querySelector('#preview.content');
console.log(content);

markdown.addEventListener('input', () => {
    const markdownText = markdown.value.replace(/\n/g, '  \n');
    const htmlOutput = md.render(markdownText);
    content.innerHTML = htmlOutput;
  });