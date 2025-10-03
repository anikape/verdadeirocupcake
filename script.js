  // Menu hambúrguer
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");

    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
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