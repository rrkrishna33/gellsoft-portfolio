document.getElementById("year").textContent = new Date().getFullYear();

// Nav scroll state + mobile toggle
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Contact form -> mailto fallback (static site, no backend)
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const phone = data.get("phone");
  const email = data.get("email");
  const service = data.get("service");
  const message = data.get("message");

  const subject = encodeURIComponent(`New enquiry: ${service}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n${message}`
  );

  window.location.href = `mailto:rrkrishna33@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Opening your email app with these details filled in...";
});

// Three.js hero: floating gradient-colored glass orbs drifting in 3D
(function initHero() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const hero = canvas.closest(".hero");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 20;

  function size() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const palette = [0xff5fa2, 0x7c5cff, 0x22d3ee, 0xffb85c];
  const ORB_COUNT = window.innerWidth < 700 ? 6 : 10;
  const orbs = [];
  const group = new THREE.Group();

  for (let i = 0; i < ORB_COUNT; i++) {
    const radius = 0.8 + Math.random() * 1.6;
    const geo = new THREE.IcosahedronGeometry(radius, 2);
    const mat = new THREE.MeshBasicMaterial({
      color: palette[i % palette.length],
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 9,
      (Math.random() - 0.5) * 8
    );
    mesh.userData.spin = {
      x: (Math.random() - 0.5) * 0.006,
      y: (Math.random() - 0.5) * 0.006,
    };
    mesh.userData.drift = {
      x: (Math.random() - 0.5) * 0.006,
      y: (Math.random() - 0.5) * 0.004,
      phase: Math.random() * Math.PI * 2,
    };
    group.add(mesh);
    orbs.push(mesh);
  }
  scene.add(group);

  // A larger soft core orb at the center
  const coreGeo = new THREE.IcosahedronGeometry(4.6, 2);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xb388ff,
    wireframe: true,
    transparent: true,
    opacity: 0.22,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    orbs.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.spin.x;
      mesh.rotation.y += mesh.userData.spin.y;
      if (!prefersReducedMotion) {
        mesh.position.y += Math.sin(t * 0.6 + mesh.userData.drift.phase) * 0.004;
        mesh.position.x += Math.cos(t * 0.4 + mesh.userData.drift.phase) * 0.003;
      }
    });

    if (!prefersReducedMotion) {
      group.rotation.y = t * 0.04;
      core.rotation.x = t * 0.06;
      core.rotation.y = t * 0.09;
    }

    renderer.render(scene, camera);
  }

  size();
  window.addEventListener("resize", size);
  animate();
})();

// Reveal-on-scroll for cards/sections
(function scrollReveal() {
  const targets = document.querySelectorAll(".service-card, .step, .about-copy, .about-visual, .contact-info, .contact-form");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    io.observe(el);
  });
})();
