// ===================== CODEWÖRTER HIER FESTLEGEN =====================
// Normales Codewort: schaltet die Seite frei.
// VIP-Codewort: schaltet zusätzlich die Extra-Bereiche frei (Klasse "vip-only").
// Groß-/Kleinschreibung ist bei der Eingabe egal.
const CODEWORD = "HOCHZEIT2027";
const VIP_CODEWORD = "FAMILIE2027";
// =======================================================================

const gate = document.getElementById("gate");
const site = document.getElementById("site");
const gateForm = document.getElementById("gateForm");
const gateInput = document.getElementById("gateInput");
const gateError = document.getElementById("gateError");

function unlockSite(isVip) {
  gate.style.display = "none";
  site.style.display = "block";
  if (isVip) {
    document.body.classList.add("vip-unlocked");
  }
}

// Wenn in dieser Browser-Sitzung schon einmal entsperrt wurde, nicht erneut fragen
const savedAccess = sessionStorage.getItem("wedding_access");
if (savedAccess === "vip" || savedAccess === "basic") {
  unlockSite(savedAccess === "vip");
}

gateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = gateInput.value.trim().toLowerCase();

  if (input === VIP_CODEWORD.trim().toLowerCase()) {
    sessionStorage.setItem("wedding_access", "vip");
    unlockSite(true);
  } else if (input === CODEWORD.trim().toLowerCase()) {
    sessionStorage.setItem("wedding_access", "basic");
    unlockSite(false);
  } else {
    gateError.classList.add("show");
    gateInput.value = "";
    gateInput.focus();
  }
});

// Mobiles Menü nach Klick auf einen Link schließen
document.querySelectorAll(".nav__links a").forEach(function (link) {
  link.addEventListener("click", function () {
    const toggle = document.getElementById("navToggle");
    if (toggle) toggle.checked = false;
  });
});

// ===================== COUNTDOWN =====================
// Datum & Uhrzeit der Hochzeit hier eintragen (Format: "JJJJ-MM-TTTHH:MM:SS")
const WEDDING_DATE = new Date("2027-09-10T14:00:00");

function updateCountdown() {
  const daysEl = document.getElementById("cd-days");
  if (!daysEl) return; // Countdown-Sektion nicht auf der Seite

  const now = new Date();
  let diff = WEDDING_DATE - now;

  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
  document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
