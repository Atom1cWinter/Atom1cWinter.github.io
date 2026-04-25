(function () {
  const button = document.getElementById("generate-html-btn");

  if (!button) {
    return;
  }

  button.addEventListener("click", async () => {
    const form = document.getElementById("form");
    if (!form || !window.introForm) {
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    const data = await window.introForm.collectFormData();
    const htmlText = `
<h2>Introduction HTML</h2>
${window.introForm.getIntroHtml(data).trim()}
`.trim();

    window.introForm.renderCode("Introduction HTML", htmlText, "html");
  });
})();
