/* =========================================================
   PSA @ UMN — site content & behavior
   ---------------------------------------------------------
   ✏️  EDIT THE CONFIG BELOW TO UPDATE THE SITE.
   You do NOT need to touch index.html for routine updates.
   ========================================================= */

const CONFIG = {
  // Link for the "Sign Up for Updates" button (Google Form, GopherLink page, etc.)
  signupUrl: "https://www.instagram.com/umnpsa/",

  // Contact email shown in the Join section. Leave "" to hide it.
  contactEmail: "",

  // ---- Instagram posts to embed ----
  // Open a post on instagram.com, copy its URL, and paste it here.
  // Example: "https://www.instagram.com/p/AbC123xYz/"
  // Leave the list empty to show a "Follow us" card instead.
  instagramPosts: [
    // "https://www.instagram.com/p/XXXXXXXXXXX/",
    // "https://www.instagram.com/p/YYYYYYYYYYY/",
    // "https://www.instagram.com/p/ZZZZZZZZZZZ/",
  ],

  // ---- Events ----
  // date: "YYYY-MM-DD" (or "" for TBA). Past events are hidden automatically.
  events: [
    {
      title: "General Body Meeting",
      date: "",
      time: "TBA",
      location: "Coffman Memorial Union",
      description: "Meet the board, learn about this year's plans, and grab some chai & snacks.",
    },
    {
      title: "Chai & Chill Social",
      date: "",
      time: "TBA",
      location: "TBA",
      description: "A laid-back evening of chai, games, and good company. Bring a friend!",
    },
    {
      title: "Cultural Night",
      date: "",
      time: "TBA",
      location: "TBA",
      description: "Our biggest event of the year — performances, fashion show, and a full Pakistani dinner.",
    },
  ],

  // ---- Executive board ----
  // photo: path like "assets/board/jane.jpg" (optional — initials are shown if blank)
  board: [
    { name: "Humza Murad", role: "President", major: "Electrical Engineering, Class of 2027", photo: "" },
    { name: "Abdullah Ahsan", role: "Vice President - Head of Treasury and Events", major: "Computer Science, Class of 2027", photo: "" },
    { name: "Taha Farooqi", role: "Vice President - Head of Outreach", major: "Psychology, Class of 2027", photo: "" },
    { name: "Baasit Mahmood", role: "Events Chair", major: "BioEngineering, Class of 2028", photo: "" },
  ],
};

/* =========================================================
   Rendering — you shouldn't need to edit below this line.
   ========================================================= */

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function renderEvents() {
  const el = document.getElementById("events-list");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = CONFIG.events
    .map((e) => ({ ...e, _d: e.date ? new Date(e.date + "T00:00:00") : null }))
    .filter((e) => !e._d || e._d >= today)
    .sort((a, b) => (a._d && b._d ? a._d - b._d : a._d ? -1 : b._d ? 1 : 0));

  if (!upcoming.length) {
    el.innerHTML = `<p class="empty-note">No upcoming events right now — check our Instagram for updates!</p>`;
    return;
  }

  el.innerHTML = upcoming
    .map((e) => {
      const month = e._d ? e._d.toLocaleString("en-US", { month: "short" }) : "TBA";
      const day = e._d ? e._d.getDate() : "—";
      return `
        <article class="event">
          <div class="event-date"><span class="event-month">${month}</span><span class="event-day">${day}</span></div>
          <div>
            <h3>${esc(e.title)}</h3>
            <p class="event-meta">🕒 ${esc(e.time || "TBA")} &nbsp;·&nbsp; 📍 ${esc(e.location || "TBA")}</p>
            <p>${esc(e.description)}</p>
          </div>
        </article>`;
    })
    .join("");
}

function renderBoard() {
  const el = document.getElementById("board-list");
  el.innerHTML = CONFIG.board
    .map((m) => {
      const initials = m.name.split(/\s+/).map((w) => w[0] || "").join("").slice(0, 2).toUpperCase();
      const photo = m.photo
        ? `<img class="member-photo" src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" />`
        : `<div class="member-photo" aria-hidden="true">${esc(initials)}</div>`;
      return `
        <article class="member">
          ${photo}
          <h3>${esc(m.name)}</h3>
          <p class="member-role">${esc(m.role)}</p>
          ${m.major ? `<p class="member-major">${esc(m.major)}</p>` : ""}
        </article>`;
    })
    .join("");
}

function renderInstagram() {
  const el = document.getElementById("ig-feed");
  const posts = CONFIG.instagramPosts.filter(Boolean);

  if (!posts.length) {
    el.innerHTML = `
      <div class="ig-placeholder">
        <h3>@umnpsa</h3>
        <p>See photos from our events, announcements, and more on Instagram.</p>
        <a class="btn btn-light" href="https://www.instagram.com/umnpsa/" target="_blank" rel="noopener">View Profile</a>
      </div>`;
    return;
  }

  // Instagram's official embed markup — embed.js turns these into full post cards.
  el.innerHTML = posts
    .map(
      (url) => `
      <blockquote class="instagram-media" data-instgrm-permalink="${esc(url)}?utm_source=ig_embed" data-instgrm-version="14">
        <a href="${esc(url)}" target="_blank" rel="noopener">View this post on Instagram</a>
      </blockquote>`
    )
    .join("");

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(s);
}

function setupLinks() {
  const signup = document.getElementById("signup-link");
  if (CONFIG.signupUrl) signup.href = CONFIG.signupUrl;

  if (CONFIG.contactEmail) {
    const a = document.getElementById("contact-email");
    a.href = `mailto:${CONFIG.contactEmail}`;
    a.textContent = CONFIG.contactEmail;
    document.getElementById("join-email").hidden = false;
  }

  document.getElementById("year").textContent = new Date().getFullYear();
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

renderEvents();
renderBoard();
renderInstagram();
setupLinks();
setupNav();
