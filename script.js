/* =====================================================================
   Teyzemin Mutfağı — interactions
   ===================================================================== */

/* ------------------------------------------------------------------ *
 *  DÜZENLE: WhatsApp numarasını buraya yazın (ülke koduyla, sadece
 *  rakam). Örnek Türkiye için: "905551234567"
 * ------------------------------------------------------------------ */
const WHATSAPP = "90532254927";
const WHATSAPP_MSG = "Merhaba, sipariş vermek istiyorum 🍰";

document.addEventListener("DOMContentLoaded", () => {
  // ---- Yıl ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- WhatsApp linkleri ----
  const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MSG)}`;
  ["waLink", "waButtonBig", "waFloat"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = waUrl;
  });

  // ---- Navigasyon: scroll durumu ----
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Mobil menü ----
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );

  // ---- Galeriyi oluştur ----
  const grid = document.getElementById("galleryGrid");
  const total = 16;
  // Bazı görselleri büyük göstererek masonry görünümü verelim.
  const tall = new Set([1, 4, 8, 12, 14]);
  const wide = new Set([6, 10]);
  const images = [];

  for (let i = 1; i <= total; i++) {
    const n = String(i).padStart(2, "0");
    const src = `images/urun-${n}.webp`;
    images.push(src);

    const item = document.createElement("figure");
    item.className = "gallery__item";
    if (tall.has(i)) item.classList.add("gallery__item--tall");
    if (wide.has(i)) item.classList.add("gallery__item--wide");
    item.dataset.index = String(i - 1);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Ev yapımı lezzet ${i}`;
    img.loading = "lazy";
    item.appendChild(img);
    grid.appendChild(item);
  }

  // ---- Lightbox ----
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let current = 0;

  const show = (i) => {
    current = (i + images.length) % images.length;
    lbImg.src = images[current];
  };
  const openLb = (i) => {
    show(i);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery__item");
    if (item) openLb(Number(item.dataset.index));
  });
  lbClose.addEventListener("click", closeLb);
  lbPrev.addEventListener("click", () => show(current - 1));
  lbNext.addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // ---- Scroll reveal ----
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
});
