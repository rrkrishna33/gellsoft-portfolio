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

// Three.js hero: a rotating field of connected nodes
(function initHero() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const hero = canvas.closest(".hero");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 22;

  function size() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  // Node field
  const NODE_COUNT = window.innerWidth < 700 ? 60 : 120;
  const positions = new Float32Array(NODE_COUNT * 3);
  const velocities = [];
  const spread = 16;

  for (let i = 0; i < NODE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    velocities.push({
      x: (Math.random() - 0.5) * 0.004,
      y: (Math.random() - 0.5) * 0.004,
      z: (Math.random() - 0.5) * 0.002,
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const pointMaterial = new THREE.PointsMaterial({
    color: 0x6ea8ff,
    size: 0.14,
    transparent: true,
    opacity: 0.9,
  });
  const points = new THREE.Points(geometry, pointMaterial);
  scene.add(points);

  // Connective lines, rebuilt each frame between nearby nodes
  const lineGeometry = new THREE.BufferGeometry();
  const maxLinePositions = NODE_COUNT * NODE_COUNT * 3;
  const linePositions = new Float32Array(maxLinePositions);
  lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x4f8cff,
    transparent: true,
    opacity: 0.12,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // A soft glowing icosahedron as a centerpiece
  const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x8a5cff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  const LINK_DIST = 4.5;
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    const posAttr = geometry.attributes.position;
    for (let i = 0; i < NODE_COUNT; i++) {
      let x = posAttr.getX(i) + velocities[i].x;
      let y = posAttr.getY(i) + velocities[i].y;
      let z = posAttr.getZ(i) + velocities[i].z;

      if (Math.abs(x) > spread) velocities[i].x *= -1;
      if (Math.abs(y) > spread / 2) velocities[i].y *= -1;
      if (Math.abs(z) > 5) velocities[i].z *= -1;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = posAttr.getX(i) - posAttr.getX(j);
        const dy = posAttr.getY(i) - posAttr.getY(j);
        const dz = posAttr.getZ(i) - posAttr.getZ(j);
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < LINK_DIST && lineIdx < maxLinePositions - 6) {
          linePositions[lineIdx++] = posAttr.getX(i);
          linePositions[lineIdx++] = posAttr.getY(i);
          linePositions[lineIdx++] = posAttr.getZ(i);
          linePositions[lineIdx++] = posAttr.getX(j);
          linePositions[lineIdx++] = posAttr.getY(j);
          linePositions[lineIdx++] = posAttr.getZ(j);
        }
      }
    }
    lineGeometry.setDrawRange(0, lineIdx / 3);
    lineGeometry.attributes.position.needsUpdate = true;

    if (!prefersReducedMotion) {
      scene.rotation.y = t * 0.05;
      scene.rotation.x = Math.sin(t * 0.1) * 0.05;
      core.rotation.x = t * 0.08;
      core.rotation.y = t * 0.12;
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
