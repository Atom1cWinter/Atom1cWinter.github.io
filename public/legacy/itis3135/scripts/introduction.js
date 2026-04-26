(function () {
  const FORM_HEADING = "Introduction Form";

  const form = document.getElementById("form");
  const formView = document.getElementById("intro-form-view");
  const outputView = document.getElementById("intro-output-view");
  const heading = document.getElementById("intro-form-heading");
  const addCourseButton = document.getElementById("add-course");
  const clearButton = document.getElementById("clear-btn");
  const courseList = document.getElementById("course-list");
  const picturePreview = document.getElementById("picturePreview");
  const pictureUrlInput = document.getElementById("pictureUrl");
  const pictureFileInput = document.getElementById("pictureFile");
  // prettier-ignore
  const defaultCourses = [
    // prettier-ignore
    {
      department: "ITIS",
      number: "3135",
      name: "Web-Based Application Design and Development",
      reason:
        "I thought this class would be interesting and I don't really have any experience in front end development so I thought it could help me a bit with learning about that."
    },
    // prettier-ignore
    {
      department: "ITCS",
      number: "4141",
      name: "Computer Systems and Architecture",
      reason:
        "This is one of the final course requirements I need for my degree and, while I'm familiar with most of it's content, it's always good to make sure I have a proper understanding and maybe I learn more."
    },
    // prettier-ignore
    {
      department: "ITCS",
      number: "4145",
      name: "Parallel Programming",
      reason: "Another required course for my degree."
    },
    // prettier-ignore
    {
      department: "ITIS",
      number: "3200",
      name: "Intro to Info Security and Privacy",
      reason:
        "A course I needed to take to fill some credit requirements. I thought the topic would be interesting and I haven't had much of a focus on security throughout my time in CS, so I thought it'd be important to get some knowledge in this area."
    },
    // prettier-ignore
    {
      department: "ITIS",
      number: "3246",
      name: "IT Infrastructure and Security",
      reason:
        "Another course I needed for credit requirements. I'm very familiar with much of the content in this course but I thought it'd be good to take an easy class since I would have to balance school with my own personal life, projects, and work; along with job hunting."
    }
  ];

  if (!form || !formView || !outputView || !heading || !courseList) {
    return;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // prettier-ignore
  function createCourseRow(values) {
    const row = document.createElement("div");
    row.className = "course-row";

    row.innerHTML = `
      <label>
        Department
        <input type="text" class="course-department" required placeholder="ITIS" value="${escapeHtml(values.department || "")}" />
      </label>
      <label>
        Number
        <input type="text" class="course-number" required placeholder="3135" value="${escapeHtml(values.number || "")}" />
      </label>
      <label>
        Name
        <input type="text" class="course-name" required placeholder="Course Name" value="${escapeHtml(values.name || "")}" />
      </label>
      <label>
        Reason
        <input type="text" class="course-reason" required placeholder="Reason for taking this course" value="${escapeHtml(values.reason || "")}" />
      </label>
      <button type="button" class="delete-course">Delete</button>
    `;

    const deleteButton = row.querySelector(".delete-course");
    deleteButton.addEventListener("click", () => {
      row.remove();
      if (!courseList.querySelector(".course-row")) {
        courseList.appendChild(createCourseRow({}));
      }
    });

    return row;
  }

  // prettier-ignore
  function normalizeCourseRows() {
    const rows = Array.from(courseList.querySelectorAll(".course-row"));
    rows.forEach((row, index) => {
      const hasDelete = row.querySelector(".delete-course");
      if (index === 0 && rows.length === 1) {
        if (hasDelete) {
          hasDelete.remove();
        }
      } else if (!hasDelete) {
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-course";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          row.remove();
          normalizeCourseRows();
          if (!courseList.querySelector(".course-row")) {
            courseList.appendChild(createCourseRow({}));
          }
        });
        row.appendChild(deleteButton);
      }
    });
  }

  // prettier-ignore
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  }

  // prettier-ignore
  async function collectFormData() {
    const pictureFile = pictureFileInput.files[0];
    const pictureUrl = pictureUrlInput.value.trim();
    let imageSrc = pictureUrl;

    if (pictureFile) {
      imageSrc = await readFileAsDataUrl(pictureFile);
    }

    // prettier-ignore
    const courses = Array.from(courseList.querySelectorAll(".course-row")).map(
      (row) => ({
        department: row.querySelector(".course-department").value.trim(),
        number: row.querySelector(".course-number").value.trim(),
        name: row.querySelector(".course-name").value.trim(),
        reason: row.querySelector(".course-reason").value.trim()
      })
    );

    // prettier-ignore
    const links = [1, 2, 3, 4, 5].map((idx) => ({
      name: document.getElementById(`link${idx}Name`).value.trim(),
      href: document.getElementById(`link${idx}Url`).value.trim()
    }));

    return {
      firstName: document.getElementById("firstName").value.trim(),
      middleName: document.getElementById("middleName").value.trim(),
      nickname: document.getElementById("nickname").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      ackStatement: document.getElementById("ackStatement").value.trim(),
      ackDate: document.getElementById("ackDate").value,
      mascotAdjective: document.getElementById("mascotAdjective").value.trim(),
      mascotAnimal: document.getElementById("mascotAnimal").value.trim(),
      divider: document.getElementById("divider").value.trim(),
      image: imageSrc,
      imageCaption: document.getElementById("pictureCaption").value.trim(),
      personalStatement: document
        .getElementById("personalStatement")
        .value.trim(),
      personalBackground: document
        .getElementById("personalBackground")
        .value.trim(),
      professionalBackground: document
        .getElementById("professionalBackground")
        .value.trim(),
      academicBackground: document
        .getElementById("academicBackground")
        .value.trim(),
      subjectBackground: document
        .getElementById("subjectBackground")
        .value.trim(),
      primaryComputer: document.getElementById("primaryComputer").value.trim(),
      courseReason: document.getElementById("courseReason").value.trim(),
      careerGoals: document.getElementById("careerGoals").value.trim(),
      courses,
      quoteText: document.getElementById("quoteText").value.trim(),
      quoteAuthor: document.getElementById("quoteAuthor").value.trim(),
      funnyThing: document.getElementById("funnyThing").value.trim(),
      shareThing: document.getElementById("shareThing").value.trim(),
      links
    };
  }

  // prettier-ignore
  function formatDisplayName(data) {
    const middle = data.middleName ? ` ${data.middleName}` : "";
    const nickname = data.nickname ? ` \"${data.nickname}\"` : "";
    return `${data.firstName}${middle}${nickname} ${data.lastName}`
      .replace(/\s+/g, " ")
      .trim();
  }

  // prettier-ignore
  function getIntroHtml(data) {
    const optionalFunny = data.funnyThing
      ? `<li><strong>Funny Thing:</strong> ${escapeHtml(data.funnyThing)}</li>`
      : "";

    const optionalShare = data.shareThing
      ? `<li><strong>Something To Share:</strong> ${escapeHtml(data.shareThing)}</li>`
      : "";

    const coursesHtml = data.courses
      .map(
        (course) =>
          `<li>${escapeHtml(course.department)} ${escapeHtml(course.number)} - ${escapeHtml(course.name)}: ${escapeHtml(course.reason)}</li>`
      )
      .join("");

    const linksHtml = data.links
      .map(
        (link) =>
          `<li><a href="${escapeHtml(link.href)}" target="_blank">${escapeHtml(link.name)}</a></li>`
      )
      .join("");

    return `
      <h3>${escapeHtml(formatDisplayName(data))} ${escapeHtml(data.divider)} ${escapeHtml(data.mascotAdjective)} ${escapeHtml(data.mascotAnimal)}</h3>
      <figure>
        <img src="${escapeHtml(data.image)}" alt="Introduction portrait" style="max-width: 280px; width: 100%;" />
        <figcaption>${escapeHtml(data.imageCaption)}</figcaption>
      </figure>
      <p><strong>Personal Statement:</strong> ${escapeHtml(data.personalStatement)}</p>
      <ul>
        <li><strong>Personal Background:</strong> ${escapeHtml(data.personalBackground)}</li>
        <li><strong>Professional Background:</strong> ${escapeHtml(data.professionalBackground)}</li>
        <li><strong>Academic Background:</strong> ${escapeHtml(data.academicBackground)}</li>
        <li><strong>Subject Background:</strong> ${escapeHtml(data.subjectBackground)}</li>
        <li><strong>Primary Computer Platform:</strong> ${escapeHtml(data.primaryComputer)}</li>
        <li><strong>Reason For Taking This Course:</strong> ${escapeHtml(data.courseReason)}</li>
        <li><strong>Career Goals:</strong> ${escapeHtml(data.careerGoals)}</li>
        <li><strong>Courses:</strong><ul>${coursesHtml}</ul></li>
        <li><strong>Quote:</strong> \"${escapeHtml(data.quoteText)}\" - ${escapeHtml(data.quoteAuthor)}</li>
        ${optionalFunny}
        ${optionalShare}
        <li><strong>Useful Links:</strong><ul>${linksHtml}</ul></li>
        <li><strong>Acknowledgment:</strong> ${escapeHtml(data.ackStatement)} (${escapeHtml(data.ackDate)})</li>
      </ul>
      <p><a href="#" id="reset-link">Reset Form</a></p>
    `;
  }

  // prettier-ignore
  function showForm() {
    heading.textContent = FORM_HEADING;
    formView.hidden = false;
    outputView.hidden = true;
    outputView.innerHTML = "";
  }

  // prettier-ignore
  function showOutput(html) {
    formView.hidden = true;
    outputView.hidden = false;
    outputView.innerHTML = html;

    const resetLink = document.getElementById("reset-link");
    if (resetLink) {
      resetLink.addEventListener("click", (event) => {
        event.preventDefault();
        form.reset();
        showForm();
      });
    }
  }

  // prettier-ignore
  function renderCode(title, codeText, language) {
    heading.textContent = title;
    showOutput(`
      <section>
        <pre><code class="language-${language}">${escapeHtml(codeText)}</code></pre>
        <p><a href="#" id="reset-link">Reset Form</a></p>
      </section>
    `);

    if (window.hljs) {
      window.hljs.highlightAll();
    }
  }

  addCourseButton.addEventListener("click", () => {
    courseList.appendChild(createCourseRow({}));
    normalizeCourseRows();
  });

  function updatePicturePreview() {
    const file = pictureFileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        picturePreview.src = reader.result;
      };
      reader.readAsDataURL(file);
      return;
    }

    picturePreview.src = pictureUrlInput.value.trim() || "../Dog1.jpg";
  }

  pictureUrlInput.addEventListener("input", updatePicturePreview);
  pictureFileInput.addEventListener("change", updatePicturePreview);

  // prettier-ignore
  clearButton.addEventListener("click", () => {
    const controls = Array.from(
      form.querySelectorAll("input, textarea, select")
    );
    controls.forEach((control) => {
      if (control.type === "file") {
        control.value = "";
      } else if (control.tagName === "SELECT") {
        control.selectedIndex = 0;
      } else {
        control.value = "";
      }
    });

    courseList.innerHTML = "";
    courseList.appendChild(createCourseRow({}));
    normalizeCourseRows();
    picturePreview.src = "../Dog1.jpg";
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      showForm();
      courseList.innerHTML = "";
      defaultCourses.forEach((course) => {
        courseList.appendChild(createCourseRow(course));
      });
      normalizeCourseRows();
      picturePreview.src = "../Dog1.jpg";
    }, 0);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      return;
    }

    const data = await collectFormData();
    heading.textContent = FORM_HEADING;
    showOutput(getIntroHtml(data));
  });

  normalizeCourseRows();

  // prettier-ignore
  window.introForm = {
    collectFormData,
    getIntroHtml,
    renderCode,
    showOutput,
    showForm,
    escapeHtml
  };
})();
