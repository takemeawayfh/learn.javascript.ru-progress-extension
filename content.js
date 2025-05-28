(function () {
  let w3 = document.createElement("link");
  w3.href = "https://www.w3schools.com/w3css/5/w3.css";
  w3.rel = "stylesheet";
  document.head.appendChild(w3);

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
  progressDiv.className = "w3-light-grey w3-large";
  progressBar.className = "w3-container w3-green w3-center";

  progressDiv.style.position = "fixed";
  progressDiv.style.bottom = "0";
  progressDiv.style.width = "100%";

  document.body.appendChild(progressDiv);
  progressDiv.appendChild(progressBar);
  progressBar.style = `width:${((learned.length / total) * 100).toFixed(2)}%;height:24px;`;
  progressBar.textContent = `${((learned.length / total) * 100).toFixed(2)}%`;

  topics.forEach((topic) => {
    const url = topic.href;
    topic.style.opacity = learned.includes(url) ? "0.5" : "1";
    if (!topic.dataset.progressHandled) {
      topic.addEventListener("click", () => {
        // event.preventDefault(); // Удалите или закомментируйте эту строку!
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