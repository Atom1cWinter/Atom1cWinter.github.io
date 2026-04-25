let poll = new Map();

function addOption(option) {
  if (!option || option.trim() === "") {
    return "Option cannot be empty.";
  }
  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }
  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  let voters = poll.get(option);
  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
  let results = "Poll Results:";
  poll.forEach((voters, option) => {
    results += `\n${option}: ${voters.size} votes`;
  });
  return results;
}

addOption("Great Horned Owl");
addOption("Snowy Owl");
addOption("Barn Owl");

vote("Great Horned Owl", "user1");
vote("Great Horned Owl", "user2");
vote("Snowy Owl", "user3");
