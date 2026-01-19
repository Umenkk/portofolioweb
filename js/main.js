// js/main.js

async function loadComponent(rootId, url) {
  const root = document.getElementById(rootId);
  if (!root) return;

  try {
    const res = await fetch(url);
    const html = await res.text();
    root.innerHTML = html;

    // Panggil init sesuai komponen yang selesai dimuat
    if (rootId === 'navbar-root') {
      initNavbar();
    } else if (rootId === 'hero-root') {
      initHero();
    }else if (rootId === 'contact-root') { // TAMBAHKAN BLOK INI
      initContact();
    }
  } catch (err) {
    console.error('Gagal load component:', url, err);
    root.innerHTML =
      '<p class="text-red-400 text-sm">Gagal memuat komponen.</p>';
  }
}

function initNavbar() {
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('nav-mobile');
  const overlay = document.getElementById('nav-overlay');
  const links = document.querySelectorAll('.nav-link, .mobile-link');

  let open = false;

  function setOpen(state) {
    open = state;

    if (open) {
      mobile.classList.remove('opacity-0', 'translate-y-[-12px]', 'pointer-events-none');
      mobile.classList.add('opacity-100', 'translate-y-0');

      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-100');

      burger.classList.add('burger-open');
    } else {
      mobile.classList.add('opacity-0', 'translate-y-[-12px]', 'pointer-events-none');
      mobile.classList.remove('opacity-100', 'translate-y-0');

      overlay.classList.add('opacity-0', 'pointer-events-none');
      overlay.classList.remove('opacity-100');

      burger.classList.remove('burger-open');
    }
  }

  burger.addEventListener('click', () => setOpen(!open));
  overlay.addEventListener('click', () => setOpen(false));

  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      setOpen(false);
    });
  });

  // Rolling role animation
  const roleEl = document.getElementById('nav-role-text');
  if (roleEl) {
    const roles = ['Web Developer', 'Problem Solver', 'IT Analyst', 'Tech Enthusiast'];
    let index = 0;

    setInterval(() => {
      roleEl.classList.add('-translate-y-2', 'opacity-0');

      setTimeout(() => {
        index = (index + 1) % roles.length;
        roleEl.textContent = roles[index];

        roleEl.classList.remove('-translate-y-2');
        roleEl.classList.add('translate-y-2', 'opacity-0');
        void roleEl.offsetWidth;
        roleEl.classList.remove('translate-y-2', 'opacity-0');
      }, 250);
    }, 2600);
  }

  
}





// ===== HERO TYPING EFFECT =====
function initHero() {
  const heroTypingEl = document.getElementById('hero-typing');
  if (!heroTypingEl) return;

const words = [
  'Web Developer',
  'Frontend Developer',
  'Fullstack Developer',
  'UI Developer',
];

  let wIndex = 0;
  let cIndex = 0;
  let deleting = false;

  function typeHero() {
    const current = words[wIndex];
    const displayed = current.substring(0, cIndex);
    heroTypingEl.textContent = displayed;

    if (!deleting && cIndex < current.length) {
      // ngetik
      cIndex++;
      setTimeout(typeHero, 80);
    } else if (deleting && cIndex > 0) {
      // menghapus
      cIndex--;
      setTimeout(typeHero, 45);
    } else {
      if (!deleting) {
        // selesai ngetik, jeda sebentar sebelum hapus
        deleting = true;
        setTimeout(typeHero, 1100);
      } else {
        // selesai hapus, lanjut ke kata berikutnya
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
        setTimeout(typeHero, 220);
      }
    }
  }

  typeHero();
}

// ===== CONTACT LOCAL TIME =====
function initContact() {
  const timeEl = document.getElementById('local-time-display');
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    
    // Opsi untuk mendapatkan waktu WIB (Asia/Jakarta)
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta' // WIB (Waktu Indonesia Barat)
    };
    
    // Dapatkan zona waktu singkat (WIB/WITA/WIT)
    // Walaupun 'Asia/Jakarta' akan menghasilkan WIB, kita bisa mendapatkan label yang lebih spesifik
    const timeString = now.toLocaleTimeString('id-ID', options);
    const timezone = 'WIB'; // Tetapkan WIB secara eksplisit

    timeEl.textContent = `${timeString} ${timezone}`;
  }

  // Panggil sekali saat dimuat
  updateTime();

  // Update setiap 10 detik
  setInterval(updateTime, 10000); 
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-root', 'components/navbar.html');
  loadComponent('hero-root', 'components/hero.html');
  loadComponent('techstack-root', 'components/techstack.html');
  loadComponent('about-root', 'components/about.html');
  loadComponent('projects-root', 'components/projects.html');
  loadComponent('certification-root', 'components/certification.html');
  loadComponent('skills-root', 'components/skills.html');
  loadComponent('contact-root', 'components/contact.html');
});