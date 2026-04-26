// prettier-ignore
const poll = new Map([
  ["Great Horned Owl", 0],
  ["Snowy Owl", 0],
  ["Barn Owl", 0]
]);

const pollOptions = document.getElementById("poll-options");
const pollResults = document.getElementById("poll-results");
const addOptionForm = document.getElementById("add-option-form");
const newOptionInput = document.getElementById("new-option-input");
const voteMessage = document.getElementById("vote-message");

function setMessage(message) {
  voteMessage.textContent = message;
}

function addOption(option) {
  const trimmedOption = option.trim();
  if (!trimmedOption) {
    return "Option cannot be empty.";
  }
  if (poll.has(trimmedOption)) {
    return `Option "${trimmedOption}" already exists.`;
  }
  poll.set(trimmedOption, 0);
  return `Option "${trimmedOption}" added to the poll.`;
}

function vote(option) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  poll.set(option, poll.get(option) + 1);
  return `Vote recorded for "${option}".`;
}

function getTotalVotes() {
  return Array.from(poll.values()).reduce((sum, count) => sum + count, 0);
}

function renderPoll() {
  const totalVotes = getTotalVotes();

  pollOptions.innerHTML = "";
  pollResults.innerHTML = "";

  poll.forEach((count, option) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "poll-option";
    optionButton.textContent = option;
    optionButton.addEventListener("click", () => {
      setMessage(vote(option));
      renderPoll();
    });
    pollOptions.appendChild(optionButton);

    const resultRow = document.createElement("article");
    resultRow.className = "result-row";

    const percent =
      totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);

    resultRow.innerHTML = `
      <div class="result-copy">
        <h3>${option}</h3>
        <p>${count} vote${count === 1 ? "" : "s"} (${percent}%)</p>
      </div>
      <div class="result-bar" aria-hidden="true">
        <span style="width: ${percent}%"></span>
      </div>
    `;
    pollResults.appendChild(resultRow);
  });
}

addOptionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = addOption(newOptionInput.value);
  setMessage(result);
  if (result.endsWith("added to the poll.")) {
    newOptionInput.value = "";
    renderPoll();
  }
});

renderPoll();
