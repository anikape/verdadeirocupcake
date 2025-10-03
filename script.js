  // Menu hambúrguer
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");

    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });  
  
    //Botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // aparece depois de rolar 300px
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

  
  
  
  // Pega a data atual
  const today = new Date();

  // Formata para DD/MM/AAAA
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // mês começa do 0
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  // Insere a data no span
  document.getElementById('current-date').textContent = formattedDate;