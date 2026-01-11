const subjectFilter = document.getElementById("subjectFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const resourceContainer = document.getElementById("resourceContainer");

// Resource data
const resources = [
  {
    title: "HTML Basics",
    subject: "html",
    difficulty: "beginner",
    description: "Learn structure of web pages using HTML."
  },
  {
    title: "CSS Flexbox",
    subject: "css",
    difficulty: "intermediate",
    description: "Master layouts using Flexbox."
  },
  {
    title: "JavaScript DOM",
    subject: "javascript",
    difficulty: "intermediate",
    description: "Learn how JavaScript interacts with HTML."
  },
  {
    title: "Advanced JavaScript",
    subject: "javascript",
    difficulty: "advanced",
    description: "Deep dive into closures, async JS, and more."
  }
];

// Display resources
function displayResources(list) {
  resourceContainer.innerHTML = "";

  if (list.length === 0) {
    resourceContainer.innerHTML = "<p>No resources found.</p>";
    return;
  }

  list.forEach(resource => {
    const article = document.createElement("article");

    article.innerHTML = `
      <h3>${resource.title}</h3>
      <p><strong>Subject:</strong> ${resource.subject}</p>
      <p><strong>Difficulty:</strong> ${resource.difficulty}</p>
      <p>${resource.description}</p>
      <button>View Resource</button>
    `;

    resourceContainer.appendChild(article);
  });
}

// Filter logic
function filterResources() {
  const selectedSubject = subjectFilter.value;
  const selectedDifficulty = difficultyFilter.value;

  const filtered = resources.filter(resource => {
    const subjectMatch =
      selectedSubject === "all" || resource.subject === selectedSubject;

    const difficultyMatch =
      selectedDifficulty === "all" ||
      resource.difficulty === selectedDifficulty;

    return subjectMatch && difficultyMatch;
  });

  displayResources(filtered);
}

// Event listeners
subjectFilter.addEventListener("change", filterResources);
difficultyFilter.addEventListener("change", filterResources);

// Initial render
displayResources(resources);


