import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

// ===== FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyCi2vM_4utdQ0k1ZIXwi_qvbLi0Rbuf_Qs",
  authDomain: "verdadeiro-cupcake.firebaseapp.com",
  projectId: "verdadeiro-cupcake",
  storageBucket: "verdadeiro-cupcake.firebasestorage.app",
  messagingSenderId: "102388121619",
  appId: "1:102388121619:web:522188edfc65dfd511ffe6",
  measurementId: "G-01HDV2DESK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const container = document.getElementById("produtos");

// ===== FORMATAR TEXTO =====
function formatarTextoEmLista(texto) {
  if (!texto) return "";

  const linhas = texto
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha !== "");

  if (!linhas.length) return "";

  const tituloPossivel =
    linhas[0].toLowerCase().includes("valores a partir") ||
    linhas[0].toLowerCase().includes("sabores");

  const titulo = tituloPossivel ? linhas[0] : "";
  const itens = tituloPossivel ? linhas.slice(1) : linhas;

  return `
    ${titulo ? `<p class="card-subtitle">${titulo}</p>` : ""}
    <ul class="card-values">
      ${itens.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function formatarCategorias(texto) {
  if (!texto) return "";

  const blocos = texto
    .split(/\n\s*\n/)
    .map((bloco) => bloco.trim())
    .filter(Boolean);

  return blocos
    .map((bloco) => {
      const linhas = bloco
        .split("\n")
        .map((linha) => linha.trim())
        .filter(Boolean);

      if (!linhas.length) return "";

      const titulo = linhas[0];
      const itens = linhas.slice(1);

      return `
        <p class="card-subtitle">${titulo}</p>
        <ul class="card-values">
          ${itens.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      `;
    })
    .join("");
}

// ===== MONTAR CARD =====
function montarCard(produto) {
  const nome = produto.nome || "";
  const imagem = produto.imagem || "";
  const descricao = produto.descricao || "";
  const link = produto.link || "#";
  const blocoPrecos = formatarTextoEmLista(produto.precos);
  const blocoCategorias = formatarCategorias(produto.categorias);

  return `
    <div class="item">
      <img src="${imagem}" alt="${nome}" loading="lazy" />
      <h2>${nome}</h2>
      ${blocoPrecos}
      ${blocoCategorias}
      ${descricao ? `<p class="card-note">${descricao}</p>` : ""}
      <a class="detalhe" href="${link}">Mais Informações</a>
    </div>
  `;
}

// ===== CARREGAR PRODUTOS =====
async function carregarProdutos() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    let html = "";

    querySnapshot.forEach((doc) => {
      const produto = doc.data();
      html += montarCard(produto);
    });

    if (container) {
      container.innerHTML = html || "<p>Nenhum produto encontrado.</p>";
    }
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    if (container) {
      container.innerHTML = "<p>Não foi possível carregar os produtos agora.</p>";
    }
  }
}

// ===== MENU HAMBÚRGUER =====
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav ul");
const icon = document.querySelector(".menu-toggle .material-icons");

if (menuToggle && nav && icon) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    icon.textContent = nav.classList.contains("active") ? "close" : "menu";
  });
}

// ===== SCROLL SUAVE =====
const menuLinks = document.querySelectorAll("nav ul li a");

menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        targetElement.classList.add("focus-card");

        setTimeout(() => {
          targetElement.classList.remove("focus-card");
        }, 1500);
      }

      if (nav) nav.classList.remove("active");
      if (icon) icon.textContent = "menu";
    }
  });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopButton = document.getElementById("back-to-top");

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ===== DATA DINÂMICA =====
const currentDate = document.getElementById("current-date");

if (currentDate) {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  currentDate.textContent = `${day}/${month}/${year}`;
}

// ===== INICIAR =====
carregarProdutos();