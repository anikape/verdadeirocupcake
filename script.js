// ===== MENU HAMBÚRGUER =====
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// ===== SCROLL SUAVE COM DESTAQUE =====
const menuLinks = document.querySelectorAll("nav ul li a");

menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    
    if(targetElement) {
      // Scroll suave
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      // Adiciona classe de destaque temporário
      targetElement.classList.add("focus-card");
      setTimeout(() => {
        targetElement.classList.remove("focus-card");
      }, 1500);
    }

    // Fecha o menu no mobile
    nav.classList.remove("active");
  });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopButton = document.getElementById('back-to-top');

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

// ===== DATA DINÂMICA =====
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // mês começa do 0
const year = today.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
document.getElementById('current-date').textContent = formattedDate;
