/* main.js — interações gerais (menu, submenu, modal, toast, form, scroll) */

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js carregado ✅');

  // ===== Footer Year =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== MENU MOBILE =====
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  // ===== SUBMENU MOBILE =====
  document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        const parent = link.parentElement;
        const submenu = parent.querySelector('.submenu');
        if (!submenu) return;
        const open = submenu.style.display === 'block';
        submenu.style.display = open ? 'none' : 'block';
        link.setAttribute('aria-expanded', String(!open));
      }
    });
  });

  // ===== MODAL "DOE AGORA" =====
  const modal = document.getElementById('modalDoeAgora');
  const openModalBtns = document.querySelectorAll('#btnDoeAgora, #btnDoeAgora2, #open-modal, .open-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close');

  const abrirModal = e => {
    e.preventDefault();
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    const focusable = modal.querySelector('a, button, input');
    if (focusable) focusable.focus();
    console.log('Modal aberto ✅');
  };

  const fecharModal = e => {
    if (e) e.preventDefault();
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    console.log('Modal fechado ❌');
  };

  openModalBtns.forEach(btn => btn && btn.addEventListener('click', abrirModal));
  closeModalBtns.forEach(btn => btn && btn.addEventListener('click', fecharModal));

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) fecharModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fecharModal();
  });

  // ===== TOAST =====
  window.showToast = (message = 'Ação realizada com sucesso!', timeout = 3000) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    container.appendChild(t);
    setTimeout(() => t.classList.add('hide'), timeout - 300);
    setTimeout(() => t.remove(), timeout);
  };

  // ===== FORM VOLUNTÁRIO =====
  const form = document.getElementById('vol-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('.form-error').forEach(el => el.textContent = '');

      const nome = form.querySelector('#nome');
      const email = form.querySelector('#email');

      if (nome && !nome.value.trim()) {
        valid = false;
        nome.nextElementSibling && (nome.nextElementSibling.textContent = 'Preencha seu nome.');
      }

      if (email) {
        const re = /^\S+@\S+\.\S+$/;
        if (!email.value.trim() || !re.test(email.value)) {
          valid = false;
          email.nextElementSibling && (email.nextElementSibling.textContent = 'Email inválido.');
        }
      }

      if (!valid) {
        showToast('Corrija os campos em vermelho.');
        return;
      }

      showToast('Inscrição enviada! Obrigado.');
      form.reset();
      console.log('Formulário enviado (simulação).');
    });
  }

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navList && navList.classList.contains('show')) navList.classList.remove('show');
      }
    });
  });
});
