const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let text = markdownInput.value;

  text = text.replace(/^\s*### (.*$)/gim, "<h3>$1</h3>");
  text = text.replace(/^\s*## (.*$)/gim, "<h2>$1</h2>");
  text = text.replace(/^\s*# (.*$)/gim, "<h1>$1</h1>");

  text = text.replace(/^\s*> (.*$)/gim, "<blockquote>$1</blockquote>");

  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");

  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
  text = text.replace(/_(.*?)_/g, "<em>$1</em>");

  text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  return text;
}

markdownInput.addEventListener("input", () => {
  const htmlContent = convertMarkdown();
  htmlOutput.textContent = htmlContent;
  preview.innerHTML = htmlContent;
});

convertMarkdown();
