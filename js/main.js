document.getElementById("year").textContent = new Date().getFullYear();

if (window.lucide) {
  window.lucide.createIcons();
}

const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const mobileViewport = window.matchMedia("(max-width: 820px)");

function setMenuOpen(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

nav.classList.add("menu-ready");
navToggle.hidden = false;
navToggle.addEventListener("click", () => {
  setMenuOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    navToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!nav.contains(event.target)) setMenuOpen(false);
});

document.addEventListener("focusin", (event) => {
  if (!nav.contains(event.target)) setMenuOpen(false);
});

mobileViewport.addEventListener("change", () => setMenuOpen(false));

function updateScrollState() {
  nav.classList.toggle("scrolled", window.scrollY > 20);
}

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    form.elements.namedItem("service").value = link.dataset.service;
  });
});

function buildEnquiryUrl(data) {
  const subject = encodeURIComponent(`New enquiry: ${data.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\n${data.get("message")}`
  );
  return `mailto:rrkrishna33@gmail.com?subject=${subject}&body=${body}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = buildEnquiryUrl(new FormData(form));
  formNote.textContent = "Your email draft is ready to open. Send it from your email app, or contact us by phone or WhatsApp.";
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function initHero() {
  const canvas = document.getElementById("hero-canvas");
  const hero = document.getElementById("home");
  const motionToggle = document.getElementById("motionToggle");
  if (!canvas || !window.THREE) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch {
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  camera.position.set(0, 0, 17);
  scene.add(new THREE.HemisphereLight(0xeaf9de, 0x182315, 1.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(3, 6, 8);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xb4e77e, 2);
  rimLight.position.set(-6, 1, -3);
  scene.add(rimLight);

  const assembly = new THREE.Group();
  scene.add(assembly);
  const geometry = new THREE.BoxGeometry(0.78, 0.78, 0.78);
  const edges = new THREE.EdgesGeometry(geometry);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xd9f9ba, transparent: true, opacity: 0.32 });
  const materials = [0x548e28, 0x83b54a, 0x131e12].map((color) => new THREE.MeshStandardMaterial({ color, metalness: 0.48, roughness: 0.29 }));
  const positions = [[-1.5, 1.05, 0], [1.5, 1.05, -0.5], [0, -1.65, 1.05]];
  const blocks = positions.map((position, index) => {
    const block = new THREE.Group();
    block.position.set(...position);
    block.userData.baseY = position[1];
    for (let column = -1; column <= 1; column++) {
      for (let row = -1; row <= 1; row++) {
        for (let depth = -1; depth <= 1; depth++) {
          const cube = new THREE.Mesh(geometry, materials[index]);
          cube.position.set(column * 0.86, row * 0.86, depth * 0.86);
          cube.add(new THREE.LineSegments(edges, edgeMaterial));
          block.add(cube);
        }
      }
    }
    assembly.add(block);
    return block;
  });

  const frameGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(7.3, 7.3, 7.3));
  const frame = new THREE.LineSegments(frameGeometry, new THREE.LineBasicMaterial({ color: 0x82b650, transparent: true, opacity: 0.2 }));
  assembly.add(frame);
  const grid = new THREE.GridHelper(32, 32, 0x548e28, 0x25321d);
  grid.position.y = -5.1;
  grid.material.transparent = true;
  grid.material.opacity = 0.32;
  scene.add(grid);

  let userPaused = false;
  let visible = true;
  let frameRequest = 0;
  let lastTime = 0;
  let elapsed = 0;
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };

  function isPaused() {
    return userPaused || reducedMotion.matches;
  }

  function renderScene(delta) {
    if (!isPaused()) {
      elapsed += delta;
      tilt.x += (pointer.x - tilt.x) * Math.min(delta * 4, 1);
      tilt.y += (pointer.y - tilt.y) * Math.min(delta * 4, 1);
    }
    assembly.rotation.set(0.28 + Math.sin(elapsed * 0.22) * 0.09 + tilt.y * 0.12, -0.42 + elapsed * 0.12 + tilt.x * 0.2, -0.12);
    blocks.forEach((block, index) => {
      block.position.y = block.userData.baseY + Math.sin(elapsed * 0.65 + index * 1.6) * 0.18;
    });
    frame.rotation.y = -elapsed * 0.08;
    frame.rotation.z = elapsed * 0.04;
    renderer.render(scene, camera);
  }

  function animate(now) {
    frameRequest = 0;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
    lastTime = now;
    renderScene(delta);
    if (!isPaused() && visible && !document.hidden) frameRequest = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    cancelAnimationFrame(frameRequest);
    frameRequest = 0;
    lastTime = 0;
    const paused = isPaused();
    motionToggle.hidden = reducedMotion.matches;
    motionToggle.setAttribute("aria-pressed", String(paused));
    const label = paused ? "Play 3D animation" : "Pause 3D animation";
    motionToggle.setAttribute("aria-label", label);
    motionToggle.title = label;
    motionToggle.replaceChildren();
    const icon = document.createElement("i");
    icon.dataset.lucide = paused ? "play" : "pause";
    icon.setAttribute("aria-hidden", "true");
    motionToggle.append(icon);
    if (window.lucide) window.lucide.createIcons();
    renderScene(0);
    if (!paused && visible && !document.hidden) frameRequest = requestAnimationFrame(animate);
  }

  function resizeScene() {
    const width = hero.clientWidth;
    const height = hero.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    const compact = width <= 820;
    const scale = compact ? Math.min(0.85, camera.aspect * 1.05) : Math.min(1.08, camera.aspect * 0.48);
    assembly.scale.setScalar(scale);
    assembly.position.set(compact ? 0.65 : camera.aspect * 2.45, compact ? 0.15 : 0.2, 0);
    renderScene(0);
  }

  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || isPaused()) return;
    const bounds = hero.getBoundingClientRect();
    pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
  });
  hero.addEventListener("pointerleave", () => { pointer.x = 0; pointer.y = 0; });
  motionToggle.addEventListener("click", () => { userPaused = !userPaused; syncAnimation(); });
  reducedMotion.addEventListener("change", syncAnimation);
  document.addEventListener("visibilitychange", syncAnimation);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      syncAnimation();
    }).observe(hero);
  }
  if ("ResizeObserver" in window) new ResizeObserver(resizeScene).observe(hero);
  else window.addEventListener("resize", resizeScene);
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    cancelAnimationFrame(frameRequest);
    visible = false;
    motionToggle.hidden = true;
  });
  canvas.addEventListener("webglcontextrestored", () => { visible = true; resizeScene(); syncAnimation(); });
  resizeScene();
  syncAnimation();
}

initHero();

if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("is-pending");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      observer.disconnect();
      document.querySelectorAll(".is-pending").forEach((element) => element.classList.remove("is-pending"));
    }
  });
}