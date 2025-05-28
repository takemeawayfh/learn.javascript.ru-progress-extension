(function () {
  let cssFlowbite = document.createElement("link");
  cssFlowbite.href = "https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css";
  cssFlowbite.rel = "stylesheet";
  document.head.appendChild(cssFlowbite);

  const topics = Array.from(document.querySelectorAll(".list-sub__link")).slice(0, 128);

  let topicLinks = JSON.parse(localStorage.getItem("jsTopicsList") || "null");
  if (!topicLinks) {
    topicLinks = topics.map(topic => topic.href);
    localStorage.setItem("jsTopicsList", JSON.stringify(topicLinks));
  }

  const total = topicLinks.length;
  let learned = JSON.parse(localStorage.getItem("jsLearnedTopics") || "[]");

  let progressDiv = document.createElement("div");
  let progressBar = document.createElement("div");
  progressDiv.className = "w-full bg-gray-200 dark:bg-gray-700";
  progressBar.className = "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none";

  progressDiv.style.position = "fixed";
  progressDiv.style.bottom = "0";
  progressDiv.style.width = "100%";

  document.body.appendChild(progressDiv);
  progressDiv.appendChild(progressBar);
  progressBar.style = `width: ${((learned.length / total) * 100).toFixed(1)}%`;
  progressBar.textContent = ` ${((learned.length / total) * 100).toFixed(1)}%`;

  topics.forEach((topic) => {
    const url = topic.href;
    topic.style.opacity = learned.includes(url) ? "0.5" : "1";
    if (!topic.dataset.progressHandled) {
      topic.addEventListener("click", () => {
        // event.preventDefault(); 
        if (learned.includes(url)) {
          learned = learned.filter((item) => item !== url);
          topic.style.opacity = "1";
        } else {
          learned.push(url);
          topic.style.opacity = "0.5";
        }
        localStorage.setItem("jsLearnedTopics", JSON.stringify(learned));
      });

      topic.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        if (learned.includes(url)) {
          learned = learned.filter((item) => item !== url);
          topic.style.opacity = "1";
        } else {
          learned.push(url);
          topic.style.opacity = "0.5";
        }
        localStorage.setItem("jsLearnedTopics", JSON.stringify(learned));
      });
      topic.dataset.progressHandled = "1";
    }
  });
})();