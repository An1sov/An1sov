document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll("[data-btn]");
  const allLangs = ["en", "ua", "pl"];
  let currentLang = window.location.hash.substr(1) || localStorage.getItem("language") || "en";

  // Функція для зміни мови
  function changeLanguage() {
    let hash = window.location.hash.substr(1) || currentLang;

    if (!allLangs.includes(hash)) {
      hash = "en";
      window.location.hash = "en";
      currentLang = "en";
    } else {
      currentLang = hash;
    }

    localStorage.setItem("language", currentLang);

    // 1. Оновлення заголовка сторінки (Вкладка браузера)
    // Використовуємо правильний селектор тега <title>
    const titleElement = document.querySelector("title[data-lang='main-title']");
    if (titleElement && sidebarTexts["main-title"]) {
      document.title = sidebarTexts["main-title"][currentLang];
    }

    // 2. Оптимізоване оновлення всіх текстів на сторінці
    // Знаходимо всі елементи з атрибутом data-lang один раз
    const allLangElements = document.querySelectorAll("[data-lang]");

    allLangElements.forEach(elem => {
      const key = elem.getAttribute("data-lang");
      
      // Перевіряємо, чи є переклад для цього ключа
      if (sidebarTexts[key]) {
        // Якщо це поле вводу (input або textarea), міняємо placeholder
        if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
          elem.placeholder = sidebarTexts[key][currentLang];
        } else if (elem.tagName !== "TITLE") { 
          // Для звичайних елементів (крім title, бо ми його вже змінили вище)
          elem.innerHTML = sidebarTexts[key][currentLang];
        }
      }
    });

    // 3. Позначення активної кнопки
    langButtons.forEach((btn) => {
      btn.classList.remove("active-btn");
      if (btn.dataset.btn === currentLang) {
        btn.classList.add("active-btn");
      }
    });
  }

  // Обробник кліків по кнопках мови
  langButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const lang = event.target.closest("[data-btn]").dataset.btn;
      if (lang !== currentLang) {
        window.location.hash = lang;
        changeLanguage();
      }
    });
  });

  // Обробка зміни хешу в URL (наприклад, при натисканні "Назад" у браузері)
  window.addEventListener("hashchange", () => {
    changeLanguage();
  });

  // Перший запуск
  changeLanguage();
});