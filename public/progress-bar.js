const div = document.createElement("div");
div.id = "progress-bar";
document.body.appendChild(div);
document.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const progress = scrollTop / (scrollHeight - clientHeight);
  div.style.width = `${progress * 100}%`;
});
