/* =====================================================
 🌿 ONG Horizonte Solidário - Projeto JS (Atividade III)
 -------------------------------------------------------
 Objetivo: transformar o site estático em uma aplicação
 web interativa e dinâmica com JavaScript moderno.
 
 Inclui:
 ✅ Manipulação do DOM
 ✅ Menu mobile
 ✅ Modal de doação
 ✅ Toasts de feedback
 ✅ Validação de formulário
 ✅ SPA (scroll suave entre seções)
 ✅ LocalStorage
 ✅ Animações de entrada e botão pulsante
 ===================================================== */


/* ========== 🧩 MENU MOBILE (fix definitivo) ========== */
const navToggle = document.querySelector(".nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("open");
  });
}


/* ========== 💚 MODAL “DOE AGORA” ========== */
const modal = document.getElementById("modalDoeAgora");
const openModalBtns = document.querySelectorAll(".open-modal");
const closeModalBtns = document.querySelectorAll(".modal-close");

if (openModalBtns && modal) {
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("show");
    });
  });
}

if (closeModalBtns) {
  closeModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "true");
      modal.classList.remove("show");
    });
  });
}


/* ========== 🧠 TOAST DE FEEDBACK ========== */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("visible"), 100);
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}


/* ========== ✍️ VALIDAÇÃO DE FORMULÁRIO ========== */
const form = document.getElementById("vol-form");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");

    let isValid = true;

    // Limpa mensagens de erro antigas
    document.querySelectorAll(".form-error").forEach(el => (el.textContent = ""));

    // Validação de nome
    if (nome.value.trim().length < 3) {
      nome.nextElementSibling.textContent = "Por favor, insira um nome válido.";
      isValid = false;
    }

    // Validação de email
    if (!email.value.includes("@") || !email.value.includes(".")) {
      email.nextElementSibling.textContent = "Informe um e-mail válido.";
      isValid = false;
    }

    // Validação de mensagem
    if (mensagem.value.trim() === "") {
      mensagem.insertAdjacentHTML(
        "afterend",
        '<small class="form-error">Explique por que quer ajudar 😊</small>'
      );
      isValid = false;
    }

    // Resultado final
    if (isValid) {
      showToast("Formulário enviado com sucesso!");
      form.reset();
      localStorage.setItem("ultimoVoluntario", nome.value);
    } else {
      showToast("⚠️ Verifique os campos obrigatórios.");
    }
  });
}


/* ========== 💾 LOCAL STORAGE + BOAS-VINDAS ==========
   Exibe mensagem automática se o usuário já enviou o form */
window.addEventListener("load", () => {
  const ultimo = localStorage.getItem("ultimoVoluntario");
  if (ultimo) {
    showToast(`Bem-vindo de volta, ${ultimo}! 💚`);
  }
});


/* ========== ⚙️ SPA SIMPLIFICADA (Scroll suave entre seções) ========== */
const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

links.forEach(link => {
  link.addEventListener("click", e => {
    const hash = link.getAttribute("href");
    const target = document.querySelector(hash);

    if (target) {
      e.preventDefault();

      // Fecha menu mobile ao clicar
      if (navList && navList.classList.contains("open")) {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }

      // Calcula posição real do destino
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;

      // Faz o scroll suave até a seção
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });

      // Atualiza o hash da URL
      history.pushState(null, "", hash);
    }
  });
});


/* ========== ✨ ANIMAÇÃO DE ENTRADA SUAVE ========== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach(sec => {
  sec.classList.add("fade-section");
  observer.observe(sec);
});


/* ========== 📅 ANO AUTOMÁTICO NO RODAPÉ ========== */
document.getElementById("year").textContent = new Date().getFullYear();

