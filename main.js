/* =====================================================
   DUNWELL ROOFING & PAVING LLC — Main JavaScript
   ===================================================== */

/* --- Testimonial carousel --- */
var tC = 0, tM = 4;

function tU() {
  var t = document.getElementById('ttrack');
  if (t) t.style.transform = 'translateX(-' + (tC * 50) + '%)';
  document.querySelectorAll('.td').forEach(function (d, i) {
    d.classList.toggle('active', i === tC);
  });
}

function tNext() { tC = tC >= tM ? 0 : tC + 1; tU(); }
function tPrev() { tC = tC <= 0 ? tM : tC - 1; tU(); }

window.addEventListener('load', function () {
  /* Build carousel dots */
  var dc = document.getElementById('tdots');
  if (dc) {
    for (var i = 0; i <= tM; i++) {
      var d = document.createElement('button');
      d.className = 'td' + (i === 0 ? ' active' : '');
      (function (x) { d.onclick = function () { tC = x; tU(); }; })(i);
      dc.appendChild(d);
    }
  }
  setInterval(tNext, 6000);
});

/* --- Video section ---
   When Christian sends YouTube links, grab the ID from the URL:
   https://www.youtube.com/watch?v=ABC123xyz  =>  videoId = "ABC123xyz"
   Replace 'placeholder' in the onclick with that ID.
----------------------------------------------------------------------- */
function loadVideo(videoId, title, thumbEl) {
  var mainContainer = document.getElementById('vid-main');
  if (!mainContainer) return;

  document.querySelectorAll('.vid-thumb').forEach(function (t) { t.classList.remove('active'); });
  thumbEl.classList.add('active');

  if (videoId && videoId !== 'placeholder') {
    mainContainer.innerHTML =
      '<iframe src="https://www.youtube.com/embed/' + videoId +
      '?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  } else {
    mainContainer.innerHTML =
      '<div class="vid-placeholder" onclick="showPlaceholderMessage()">' +
      '<div class="vid-play"><div class="vid-play-icon"></div></div>' +
      '<span>' + title + ' — Coming Soon</span>' +
      '</div>';
  }
}

function showPlaceholderMessage() {
  alert('Video coming soon! Call us at (425) 628-5534 for a free estimate.');
}

/* --- Gallery category filter --- */
function filterGal(category, btnEl) {
  /* Update active button */
  document.querySelectorAll('.gal-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btnEl.classList.add('active');

  /* Show/hide sections */
  document.querySelectorAll('.gal-section').forEach(function(sec) {
    if (category === 'all') {
      sec.style.display = '';
    } else {
      var cat = sec.getAttribute('data-category');
      sec.style.display = (cat === category) ? '' : 'none';
    }
  });
}

/* --- Hamburger menu --- */
function toggleMenu() {
  var btn = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  btn.classList.toggle('open');
  links.classList.toggle('mobile-open');
}

/* Close menu when a nav link is clicked */
document.addEventListener('click', function(e) {
  if (e.target.closest('.nav-links a')) {
    var btn = document.querySelector('.hamburger');
    var links = document.querySelector('.nav-links');
    if (btn) btn.classList.remove('open');
    if (links) links.classList.remove('mobile-open');
  }
  /* Close menu when clicking outside */
  if (!e.target.closest('.nav') && document.querySelector('.nav-links.mobile-open')) {
    document.querySelector('.hamburger').classList.remove('open');
    document.querySelector('.nav-links').classList.remove('mobile-open');
  }
});