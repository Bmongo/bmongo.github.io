const LOCAL_STORAGE_THEME_KEY = "theme";
const DARK_THEME_KEY = "dark";
const LIGHT_THEME_KEY = "light";

const getTheme = () => {
  const currentTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  if (currentTheme) {
    return currentTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_THEME_KEY
    : LIGHT_THEME_KEY;
};

let themeValue = getTheme();

const setThemeToHTML = () => {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, themeValue);
  document.firstElementChild.setAttribute("data-theme", themeValue);
};

window.addEventListener("load", () => {
  const themeBtn = document.getElementById("theme-btn");
  themeBtn.addEventListener("click", () => {
    themeValue =
      themeValue === DARK_THEME_KEY ? LIGHT_THEME_KEY : DARK_THEME_KEY;
    setThemeToHTML();
  });
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setThemeToHTML();
  });

setThemeToHTML();
