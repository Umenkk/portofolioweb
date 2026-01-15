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
  // Toggle mobile menu
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-mobile-menu');
  const iconOpen = document.getElementById('nav-icon-open');
  const iconClose = document.getElementById('nav-icon-close');

  if (btn && menu && iconOpen && iconClose) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
    });

    menu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
      });
    });
  }

  // Animasi role yang smooth di navbar
  const roleEl = document.getElementById('nav-role-text');
  if (roleEl) {
    const roles = [
      'Web Developer',
      'Problem Solver',
      'IT Analyst',
      'Tech Enthusiast',
    ];
    let index = 0;

    setInterval(() => {
      // Animasi keluar: naik & hilang
      roleEl.classList.add('-translate-y-2', 'opacity-0');

      setTimeout(() => {
        // Ganti teks
        index = (index + 1) % roles.length;
        roleEl.textContent = roles[index];

        // Posisi awal teks baru: sedikit di bawah & transparan
        roleEl.classList.remove('-translate-y-2');
        roleEl.classList.add('translate-y-2');
        roleEl.classList.add('opacity-0');

        // Trigger reflow biar transition jalan
        void roleEl.offsetWidth;

        // Animasi masuk: naik ke posisi & muncul
        roleEl.classList.remove('translate-y-2');
        roleEl.classList.remove('opacity-0');
      }, 250); // harus selaras dengan duration-300 (0.3s)
    }, 2600); // jeda antar teks (2.6s)
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
  loadComponent('about-root', 'components/about.html');
  loadComponent('projects-root', 'components/projects.html');
  loadComponent('skills-root', 'components/skills.html');
  loadComponent('contact-root', 'components/contact.html');
});