const subjectFilter = document.getElementById("subjectFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const resourceContainer = document.getElementById("resourceContainer");
const searchInput = document.getElementById("searchInput");

// Resource data
const resources = [
  {
    title: "HTML Basics",
    subject: "html",
    difficulty: "beginner",
    description: "Learn structure of web pages using HTML.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    title: "CSS Flexbox",
    subject: "css",
    difficulty: "intermediate",
    description: "Master layouts using Flexbox.",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"
  },
  {
    title: "JavaScript DOM",
    subject: "javascript",
    difficulty: "intermediate",
    description: "Learn how JavaScript interacts with HTML.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
  },
  {
    title: "Advanced JavaScript",
    subject: "javascript",
    difficulty: "advanced",
    description: "Deep dive into closures, async JS, and more.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
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
      <button class="view-btn">View Resource</button>
    `;

    const button = article.querySelector(".view-btn");
    button.addEventListener("click", () => {
      window.open(resource.link, "_blank");
    });

    resourceContainer.appendChild(article);
  });
}

// Filter logic
function filterResources() {
  const selectedSubject = subjectFilter.value;
  const selectedDifficulty = difficultyFilter.value;
  const searchText = searchInput.value.toLowerCase();

  const filtered = resources.filter(resource => {
    const subjectMatch =
      selectedSubject === "all" || resource.subject === selectedSubject;

    const difficultyMatch =
      selectedDifficulty === "all" ||
      resource.difficulty === selectedDifficulty;

      const searchMatch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText);

    return subjectMatch && difficultyMatch && searchMatch;
  });

  displayResources(filtered);
}

// Event listeners
subjectFilter.addEventListener("change", filterResources);
difficultyFilter.addEventListener("change", filterResources);
searchInput.addEventListener("input", filterResources);

// Initial render
displayResources(resources);



