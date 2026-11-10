/*
  只需要修改下面 diaryData，就可以增加/修改日记。
  图片路径放在 assets/ 目录，例如：assets/001.jpg
*/

const diaryData = [
  {
    date: "2025 / 10 / 07",
    title: "认识你一年了",
    image: "assets/001.jpg.svg",
    text: "这一年非常感谢你！\n希望以后也能一起留下更多回忆。",
    note: "第一篇 · 写给特别的你"
  },
  {
    date: "2025 / 10 / 17",
    title: "那一天",
    image: "assets/002.jpg.svg",
    text: "有些事情现在回头看，还是会觉得很有意思。\n所以把它留在这里。",
    note: "第二篇"
  },
  {
    date: "2025 / 10 / 25",
    title: "还有一些没有说完的话",
    image: "assets/003.jpg.svg",
    text: "如果以后再看到这里，希望你还记得当时的心情。",
    note: "第三篇"
  }
];

const diary = document.getElementById("diary");

function createEntry(item, index) {
  const article = document.createElement("article");
  article.className = "entry";
  article.innerHTML = `
    <div class="entry-date">${escapeHTML(item.date)}</div>
    <h2 class="entry-title">${escapeHTML(item.title)}</h2>
    <div class="photo-wrap">
      <img
        class="photo"
        src="${escapeAttr(item.image)}"
        alt="${escapeAttr(item.title)}"
        loading="${index < 2 ? "eager" : "lazy"}"
        data-caption="${escapeAttr(item.title)}"
      >
    </div>
    <p class="entry-text">${escapeHTML(item.text)}</p>
    ${item.note ? `<div class="entry-note">${escapeHTML(item.note)}</div>` : ""}
  `;
  diary.appendChild(article);
}

function escapeHTML(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

function escapeAttr(str) {
  return escapeHTML(str);
}

diaryData.forEach(createEntry);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".entry").forEach(el => observer.observe(el));

const intro = document.getElementById("intro");
document.getElementById("openDiary").addEventListener("click", () => {
  intro.classList.add("hide");
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

document.addEventListener("click", (e) => {
  const img = e.target.closest(".photo");
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxCaption.textContent = img.dataset.caption || "";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
});

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}

document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

const secretBtn = document.getElementById("secretBtn");
const secret = document.getElementById("secret");

secretBtn.addEventListener("click", () => {
  const showing = secret.classList.toggle("show");
  secret.setAttribute("aria-hidden", String(!showing));
  secretBtn.textContent = showing ? "♡" : "还有一个东西 ···";
  if (showing) {
    secret.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
let musicOn = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (!musicOn) {
      await bgm.play();
      musicOn = true;
      musicBtn.textContent = "♫";
      showToast("音乐已播放");
    } else {
      bgm.pause();
      musicOn = false;
      musicBtn.textContent = "♪";
    }
  } catch {
    showToast("请先把 assets/music.mp3 放进去");
  }
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}
