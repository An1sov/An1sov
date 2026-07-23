'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// -----------------------------------
// 1. SIDEBAR & NAVIGATION
// -----------------------------------

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if(sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// Page navigation functionality
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.getAttribute("data-lang").replace("navbar-", "");
    
    navigationLinks.forEach(link => link.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));
    
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      }
    });
    this.classList.add("active");
    window.scrollTo(0, 0);
  });
}

// -----------------------------------
// 2. CONTACT FORM
// -----------------------------------

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("input", function () {
            if (form.checkValidity()) {
                formBtn.removeAttribute("disabled");
            } else {
                formBtn.setAttribute("disabled", "");
            }
        });
    }
}

/*Modal window*/
!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function() {

   /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');

   /* Перебираем массив кнопок */
   modalButtons.forEach(function(item){

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function(e) {

         /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
         e.preventDefault();

         /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

         /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
         modalElem.classList.add('active');
         overlay.classList.add('active');
         document.body.classList.add('modal-open'); // ⬅️ блокирует прокрутку
      });
   });


   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
         document.body.classList.remove('modal-open'); // ⬅️ возвращает прокрутку
      });
   }); 
}); 

// -----------------------------------
// 4. PORTFOLIO FILTERING (Main & Subcategories)
// -----------------------------------

document.addEventListener("DOMContentLoaded", function() {
    
    // Елементи DOM
    const projectList = document.querySelector('.project-list');
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const select = document.querySelector("[data-select]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectValue = document.querySelector("[data-select-value]");
    const filterItems = document.querySelectorAll("[data-filter-item]");

    // --- Секції підкатегорій ---
    // AI
    const subFilterContainerAI = document.getElementById('ai-sub-filters');
    const subFilterBtnsAI = subFilterContainerAI ? subFilterContainerAI.querySelectorAll('[data-subfilter-btn]') : [];
    const projectsAI = document.querySelectorAll('[data-category="ai-enhanced-web"]');
    
    // Marketing
    const subFilterContainerMarketing = document.getElementById('marketing-sub-filters');
    const subFilterBtnsMarketing = subFilterContainerMarketing ? subFilterContainerMarketing.querySelectorAll('[data-subfilter-btn]') : [];
    const projectsMarketing = document.querySelectorAll('[data-category="marketing materials"]');
    
    // --- Допоміжні функції ---

    // Показати/Сховати розділювачі "full-width"
    const toggleSeparators = (category) => {
        if (projectList) { 
            if (category.toLowerCase() === 'all') {
                projectList.classList.add('viewing-all');
            } else {
                projectList.classList.remove('viewing-all');
            }
        }
    };

    // Скидання кнопок підфільтрів
    const resetSubFilters = (buttons, projects) => {
        if (buttons.length > 0) {
            buttons.forEach(b => b.classList.remove('active'));
            buttons[0].classList.add('active'); // Перша кнопка ("All") активна
            projects.forEach(item => item.classList.add('active')); // Всі проєкти категорії видимі
        }
    };
    
    // Сховати ВСІ контейнери підфільтрів
    const hideAllSubFilters = () => {
        if (subFilterContainerAI) subFilterContainerAI.classList.remove('active');
        if (subFilterContainerMarketing) subFilterContainerMarketing.classList.remove('active');
    };

    // --- Основна логіка фільтрації ---
    const filterFunc = function (selectedValue) {
        // 1. Фільтруємо картки
        for (let i = 0; i < filterItems.length; i++) {
            if (selectedValue === "all") {
                filterItems[i].classList.add("active");
            } else if (selectedValue === filterItems[i].dataset.category) {
                filterItems[i].classList.add("active");
            } else {
                filterItems[i].classList.remove("active");
            }
        }

        // 2. Обробляємо розділювачі "full-width"
        toggleSeparators(selectedValue);

        // 3. Логіка під-меню
        hideAllSubFilters(); // Спочатку ховаємо всі
        
        if (selectedValue === 'ai-enhanced-web') {
            if (subFilterContainerAI) {
                subFilterContainerAI.classList.add('active');
                resetSubFilters(subFilterBtnsAI, projectsAI);
            }
        } else if (selectedValue === 'marketing materials') {
            if (subFilterContainerMarketing) {
                subFilterContainerMarketing.classList.add('active');
                resetSubFilters(subFilterBtnsMarketing, projectsMarketing);
            }
        }
    };

    // --- Обробники подій ---

    // 1. Клік по кнопках фільтру (Десктоп)
    let lastClickedBtn = filterButtons.length > 0 ? filterButtons[0] : null; 
    
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function () {
            let selectedValue = this.getAttribute("data-filter");
            if(lastClickedBtn) lastClickedBtn.classList.remove("active");
            this.classList.add("active");
            lastClickedBtn = this;
            if(selectValue) selectValue.innerText = this.innerText; 
            filterFunc(selectedValue);
        });
    }

    // 2. Випадаючий список (Мобільні)
    if(select) {
        select.addEventListener("click", function () { elementToggleFunc(this); });
    }

    for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener("click", function () {
            let selectedValue = this.getAttribute("data-select-item");
            if(selectValue) selectValue.innerText = this.innerText;
            if(select) elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }

    // --- Обробники подій для ПІДФІЛЬТРІВ ---

    // 3. Клік по під-фільтрах (AI)
    subFilterBtnsAI.forEach(btn => {
        btn.addEventListener('click', function() {
            subFilterBtnsAI.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const subValue = this.getAttribute('data-subfilter');

            projectsAI.forEach(item => {
                const itemSubcat = item.getAttribute('data-subcategory');
                if (subValue === 'all' || itemSubcat === subValue) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    // 4. Клік по під-фільтрах (Marketing)
    subFilterBtnsMarketing.forEach(btn => {
        btn.addEventListener('click', function() {
            subFilterBtnsMarketing.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const subValue = this.getAttribute('data-subfilter');

            projectsMarketing.forEach(item => {
                const itemSubcat = item.getAttribute('data-subcategory');
                if (subValue === 'all' || itemSubcat === subValue) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    });

    // Ініціалізація при завантаженні
    toggleSeparators('all');
});

  // Чекаємо повного завантаження сторінки
  document.addEventListener('DOMContentLoaded', function () {

    // 1. Ініціалізація EmailJS (Ваш ID)
    // Переконайтеся, що цей ID правильний!
    emailjs.init("2uJ3OlFe_Akgzkv5_");

    // 2. Функція Toast (повідомлення)
    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');

      if (!container) {
        // Якщо забули додати контейнер в HTML — просто покажемо alert
        alert(message);
        return;
      }

      const toast = document.createElement('div');
      const iconName = type === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline';

      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <ion-icon name="${iconName}"></ion-icon>
        <span>${message}</span>
      `;

      container.appendChild(toast);

      // Анімація
      setTimeout(() => toast.classList.add('show'), 100);
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    // 3. Обробка форми
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
      contactForm.addEventListener('submit', function (event) {
        // НАЙВАЖЛИВІШИЙ РЯДОК — Зупиняє перезавантаження сторінки
        event.preventDefault();

        console.log("Спроба відправки форми...");

        // Зміна кнопки на "Sending..."
        const btn = this.querySelector('[data-form-btn]');
        const btnTextSpan = btn.querySelector('span');
        const btnIcon = btn.querySelector('ion-icon');

        // Зберігаємо початковий текст
        const originalText = btnTextSpan.innerText;
        const originalIcon = btnIcon.name;

        // Блокуємо кнопку
        btn.disabled = true;
        btnTextSpan.innerText = "Sending...";
        btnIcon.name = "hourglass-outline";

        // Збираємо дані
        const formData = {
          fullname: this.querySelector('[name="fullname"]').value,
          email: this.querySelector('[name="email"]').value,
          message: this.querySelector('[name="message"]').value
        };

        // Відправляємо
        emailjs.send("service_pn5u2jq", "template_tnlvfhl", formData)
          .then(() => {
            console.log("Успіх!");
            showToast('Message sent successfully!', 'success');
            contactForm.reset(); // Очищуємо форму
          }, (error) => {
            console.error("Помилка EmailJS:", error);
            showToast('Error sending message. Check console.', 'error');
          })
          .finally(() => {
            // Повертаємо кнопку назад
            btn.disabled = false;
            btnTextSpan.innerText = originalText;
            btnIcon.name = originalIcon;

            // Якщо є валідація з іншого скрипта, вона може знову заблокувати кнопку, 
            // тому перевіримо поля
            const inputs = contactForm.querySelectorAll('[data-form-input]');
            const isValid = [...inputs].every(input => input.value.trim() !== '');
            if (!isValid) btn.disabled = true;
          });
      });
    } else {
      console.error("Критична помилка: Форму з id='contact-form' не знайдено!");
    }

    // 4. Валідація полів (щоб кнопка була неактивна, поки порожньо)
    const inputs = document.querySelectorAll('[data-form-input]');
    const button = document.querySelector('[data-form-btn]');

    if (inputs.length > 0 && button) {
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          button.disabled = ![...inputs].every(input => input.value.trim() !== '');
        });
      });
    }

  });


// --- Custom Cursor ---
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Крапка рухається миттєво
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Коло рухається з анімацією (через animate для плавності)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Додаємо ефект збільшення при наведенні на активні елементи
    const interactiveElements = document.querySelectorAll("a, button, .project-item, input, textarea");
    
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
    });
}











// Додайте цей код до script.js або в окремий скрипт

const backToTopButton = document.querySelector('[data-back-to-top]');

let isDesktop = window.innerWidth >= 1250;

function updateIsDesktop() {
  isDesktop = window.innerWidth >= 1250;
}

window.addEventListener('resize', () => {
  updateIsDesktop();
  handleScroll(); // Перерахунок при ресайзі
});

function handleScroll() {
  const scrollY = window.pageYOffset;
  const viewportHeight = window.innerHeight;

  if (!isDesktop) {
    // Логіка для мобільних: з'являється після прокрутки viewportHeight (налаштуйте за потребою)
    if (scrollY > viewportHeight) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
    return;
  }

  // Десктопна логіка
  const buttonHeight = 45;
  const bottomOffset = 60; // Відступ від низу viewport
  const centerTop = viewportHeight / 2 - buttonHeight / 2;
  const bottomTop = viewportHeight - buttonHeight - bottomOffset;
  const startScroll = viewportHeight / 2;
  const endScroll = document.documentElement.scrollHeight - viewportHeight;

  if (scrollY <= startScroll) {
    backToTopButton.classList.remove('active');
    return;
  }

  backToTopButton.classList.add('active');

  let progress = (scrollY - startScroll) / (endScroll - startScroll);
  progress = Math.max(0, Math.min(progress, 1));

  const currentTop = centerTop + progress * (bottomTop - centerTop);
  backToTopButton.style.top = `${currentTop}px`;
}

window.addEventListener('scroll', handleScroll);
handleScroll(); // Початковий виклик



// --- ЛОГІКА "ПОКАЗАТИ ВСІ" ДЛЯ АРХІВУ (Автоматична) ---
document.addEventListener("DOMContentLoaded", function() {
  
  const archiveContainer = document.getElementById("presentation-archive");
  
  if (archiveContainer) {
    const toggleBtn = archiveContainer.querySelector("[data-archive-toggle]");
    const archiveList = archiveContainer.querySelector(".archive-list-new");

    // Перевіряємо, чи є список і чи є в ньому більше 3-х елементів
    if (archiveList && archiveList.children.length > 3) {
      
      // 1. Згортаємо список за замовчуванням
      archiveContainer.classList.add("collapsed");

      // 2. Обробник кліку по кнопці
      if (toggleBtn) {
        toggleBtn.addEventListener("click", function() {
          archiveContainer.classList.remove("collapsed");
          // Кнопка сховається автоматично завдяки CSS (.archive-container:not(.collapsed) .archive-toggle-btn)
        });
      }
    } else if (toggleBtn) {
      // Якщо елементів 3 або менше, просто ховаємо кнопку
      toggleBtn.style.display = "none";
    }
  }
});