(function () {
  const button = document.getElementById("generate-json-btn");

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
    // prettier-ignore
    const introData = {
      firstName: data.firstName,
      preferredName: data.nickname,
      middleInitial: data.middleName,
      lastName: data.lastName,
      divider: data.divider,
      mascotAdjective: data.mascotAdjective,
      mascotAnimal: data.mascotAnimal,
      image: data.image,
      imageCaption: data.imageCaption,
      personalStatement: data.personalStatement,
      personalBackground: data.personalBackground,
      professionalBackground: data.professionalBackground,
      academicBackground: data.academicBackground,
      subjectBackground: data.subjectBackground,
      primaryComputer: data.primaryComputer,
      courseReason: data.courseReason,
      careerGoals: data.careerGoals,
      quote: data.quoteText,
      quoteAuthor: data.quoteAuthor,
      funnyThing: data.funnyThing,
      somethingToShare: data.shareThing,
      acknowledgementStatement: data.ackStatement,
      acknowledgementDate: data.ackDate,
      courses: data.courses,
      links: data.links
    };

    function toSnakeCase(value) {
      return value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    }

    // prettier-ignore
    function toSnakeCaseObject(source) {
      return Object.fromEntries(
        Object.entries(source).map(([key, value]) => [toSnakeCase(key), value])
      );
    }

    const jsonText = JSON.stringify(toSnakeCaseObject(introData), null, 2);

    window.introForm.renderCode("Introduction JSON", jsonText, "json");
  });
})();
