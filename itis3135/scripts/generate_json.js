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
    const jsonObject = {
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
      links: data.links,
    };

    const jsonText = JSON.stringify(
      {
        first_name: jsonObject.firstName,
        preferred_name: jsonObject.preferredName,
        middle_initial: jsonObject.middleInitial,
        last_name: jsonObject.lastName,
        divider: jsonObject.divider,
        mascot_adjective: jsonObject.mascotAdjective,
        mascot_animal: jsonObject.mascotAnimal,
        image: jsonObject.image,
        image_caption: jsonObject.imageCaption,
        personal_statement: jsonObject.personalStatement,
        personal_background: jsonObject.personalBackground,
        professional_background: jsonObject.professionalBackground,
        academic_background: jsonObject.academicBackground,
        subject_background: jsonObject.subjectBackground,
        primary_computer: jsonObject.primaryComputer,
        course_reason: jsonObject.courseReason,
        career_goals: jsonObject.careerGoals,
        quote: jsonObject.quote,
        quote_author: jsonObject.quoteAuthor,
        funny_thing: jsonObject.funnyThing,
        something_to_share: jsonObject.somethingToShare,
        acknowledgement_statement: jsonObject.acknowledgementStatement,
        acknowledgement_date: jsonObject.acknowledgementDate,
        courses: jsonObject.courses,
        links: jsonObject.links,
      },
      null,
      2,
    );

    window.introForm.renderCode("Introduction JSON", jsonText, "json");
  });
})();
