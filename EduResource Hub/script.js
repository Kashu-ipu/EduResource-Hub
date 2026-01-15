const subjectFilter = document.getElementById("subjectFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const resourceContainer = document.getElementById("resourceContainer");
const searchInput = document.getElementById("searchInput");
const resetBtn = document.getElementById("resetBtn");


// Resource data
const resources = [
  {
    id: 1,
    title: "HTML Basics",
    subject: "html",
    difficulty: "beginner",
    description: "Learn structure of web pages using HTML.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML"
  },
  {
    id: 2,
    title: "CSS Flexbox",
    subject: "css",
    difficulty: "intermediate",
    description: "Master layouts using Flexbox.",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout"
  },
  {
    id: 3,
    title: "JavaScript DOM",
    subject: "javascript",
    difficulty: "intermediate",
    description: "Learn how JavaScript interacts with HTML.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
  },
  {
    id: 4,
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
    resourceContainer.innerHTML = `
  <p style="text-align:center; font-weight:bold;">
    No matching resources found 😕
  </p>
`;
    return;
  }

  const bookmarks = getBookmarks(); 

  list.forEach(resource => {
    const isBookmarked = bookmarks.includes(resource.id) ? "★" : "☆";
    const article = document.createElement("article");

    article.innerHTML = `
      <h3>${resource.title}</h3>
      <p><strong>Subject:</strong> ${resource.subject}</p>
      <p><strong>Difficulty:</strong> ${resource.difficulty}</p>
      <p>${resource.description}</p>
      <button class="view-btn">View Resource</button>
      <button class="bookmark-btn" data-id="${resource.id}">${isBookmarked}</button>
    `;

    const button = article.querySelector(".view-btn");
    button.addEventListener("click", () => {
      window.open(resource.link, "_blank");
    });

    resourceContainer.appendChild(article);
  });

  updateBookmarkUI();
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

function getBookmarks() {
  return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function toggleBookmark(resourceId) {
  let bookmarks = getBookmarks();

  if (bookmarks.includes(resourceId)) {
    bookmarks = bookmarks.filter(id => id !== resourceId);
  } else {
    bookmarks.push(resourceId);
  }

  saveBookmarks(bookmarks);
  updateBookmarkUI();
}

function updateBookmarkUI() {
  const bookmarks = getBookmarks();

  document.querySelectorAll(".bookmark-btn").forEach(btn => {
    const id = Number(btn.dataset.id);
    btn.textContent = bookmarks.includes(id) ? "★" : "☆";
  });
}

updateBookmarkUI();


// Event listeners
subjectFilter.addEventListener("change", filterResources);
difficultyFilter.addEventListener("change", filterResources);
searchInput.addEventListener("input", filterResources);
resetBtn.addEventListener("click", () => {
  subjectFilter.value = "all";
  difficultyFilter.value = "all";
  searchInput.value = "";

  displayResources(resources);
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("bookmark-btn")) {
    const id = Number(e.target.dataset.id);
    toggleBookmark(id);
  }
});



// Initial render
displayResources(resources);



