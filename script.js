// ===== MENU HAMBÚRGUER =====
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");
const icon = toggle.querySelector(".material-icons"); // ícone do menu

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");

  // Alterna entre menu e X
  if (nav.classList.contains("active")) {
    icon.textContent = "close"; // X
  } else {
    icon.textContent = "menu"; // hambúrguer
  }
});

// ===== SCROLL SUAVE COM DESTAQUE =====
const menuLinks = document.querySelectorAll("nav ul li a");

menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);

      if (targetElement) {
        // Scroll suave
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

        // Adiciona classe de destaque temporário
        targetElement.classList.add("focus-card");
        setTimeout(() => {
          targetElement.classList.remove("focus-card");
        }, 1500);
      }

      // Fecha o menu mobile ao clicar
      nav.classList.remove("active");
      icon.textContent = "menu";
    }
  });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== DATA DINÂMICA =====
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const year = today.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

const dateElement = document.getElementById('current-date');
if (dateElement) {
  dateElement.textContent = formattedDate;
}
