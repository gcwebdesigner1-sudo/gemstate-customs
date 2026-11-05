(function () {
  var PHONE = "(208) 569-3084";
  var TEL = "tel:+12085693084";
  var EMAIL = "gemstatecustom@gmail.com";

  var gem = '<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe0ff"/><stop offset=".5" stop-color="#5aa2ff"/><stop offset="1" stop-color="#2f6fe0"/></linearGradient></defs><path d="M4 18 14 6h20l10 12-20 26z" fill="url(#gg)"/><path d="M4 18h40M14 6l10 12 10-12M24 18v26M14 6l-4 12 14 26 14-26-4-12" fill="none" stroke="#0a1022" stroke-opacity=".35" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  var phoneIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';

  var links = [
    ["remodeling.html", "Remodeling"],
    ["custom-homes.html", "Custom Homes"],
    ["commercial.html", "Commercial"],
    ["portfolio.html", "Portfolio"],
    ["process.html", "Process"],
    ["testimonials.html", "Reviews"]
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  // ----- Header -----
  var header = document.querySelector(".site-header");
  if (header) {
    var navHtml = links.map(function (l) {
      return '<li><a href="' + l[0] + '"' + (here === l[0] ? ' class="active"' : "") + ">" + l[1] + "</a></li>";
    }).join("");
    header.innerHTML =
      '<nav class="nav" aria-label="Main">' +
        '<a class="brand" href="index.html" aria-label="Gemstate Customs home">' + gem +
          '<span class="brand-text">GEMSTATE<small>CUSTOMS</small></span></a>' +
        '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '<ul class="nav-links">' + navHtml +
          '<li><a class="nav-cta" href="contact.html">Free Quote</a></li></ul>' +
      "</nav>";

    var toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
    header.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); });
    });

    var onScroll = function () { header.classList.toggle("solid", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ----- Footer -----
  var footer = document.querySelector(".site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="wrap"><div class="footer-grid">' +
        '<div><a class="footer-logo" href="index.html"><img src="images/logo.png" alt="Gemstate Customs"></a>' +
          "<p>Your trusted partner for remodeling, custom homes and commercial construction across East Idaho &amp; Western Wyoming.</p>" +
          "<p><strong style=\"color:#fff\">Licensed &amp; Insured &bull; Free Estimates</strong></p></div>" +
        "<div><h5>Services</h5><ul>" +
          '<li><a href="remodeling.html">Remodeling</a></li><li><a href="custom-homes.html">Custom Homes</a></li>' +
          '<li><a href="commercial.html">Commercial</a></li><li><a href="process.html">Our Process</a></li></ul></div>' +
        "<div><h5>Company</h5><ul>" +
          '<li><a href="portfolio.html">Portfolio</a></li><li><a href="testimonials.html">Reviews</a></li>' +
          '<li><a href="contact.html">Free Quote</a></li><li><a href="index.html#areas">Service Areas</a></li></ul></div>' +
        "<div><h5>Get In Touch</h5>" +
          '<a class="footer-phone" href="' + TEL + '">' + PHONE + "</a>" +
          '<p style="margin-top:12px"><a href="mailto:' + EMAIL + '">' + EMAIL + "</a></p>" +
          "<p>1846 1st St<br>Idaho Falls, ID 83401</p></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>&copy; ' + new Date().getFullYear() + " Gemstate Customs. All rights reserved.</span>" +
        "<span>Proudly serving East Idaho &amp; Western Wyoming</span></div></div>";
  }

  // ----- Floating call button (mobile) -----
  var fab = document.createElement("a");
  fab.className = "call-fab";
  fab.href = TEL;
  fab.setAttribute("aria-label", "Call Gemstate Customs " + PHONE);
  fab.innerHTML = phoneIcon;
  document.body.appendChild(fab);
  window.addEventListener("scroll", function () {
    fab.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
  }, { passive: true });

  // ----- Reveal on scroll -----
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }

  // ----- Review slider arrows -----
  document.querySelectorAll("[data-slider]").forEach(function (wrap) {
    var track = wrap.querySelector(".review-track");
    wrap.querySelectorAll("[data-dir]").forEach(function (b) {
      b.addEventListener("click", function () {
        track.scrollBy({ left: Number(b.getAttribute("data-dir")) * (track.clientWidth * 0.8), behavior: "smooth" });
      });
    });
  });

  // ----- Lightbox -----
  var items = document.querySelectorAll(".g-item img");
  if (items.length) {
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    items.forEach(function (img) {
      img.addEventListener("click", function () { lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add("open"); });
    });
    lb.addEventListener("click", function (e) { if (e.target !== lbImg) lb.classList.remove("open"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("open"); });
  }

  // ----- Quote form -> opens email -----
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body =
        "Name: " + d.get("name") + "\n" +
        "Phone: " + d.get("phone") + "\n" +
        "Email: " + d.get("email") + "\n" +
        "City: " + d.get("city") + "\n" +
        "Project type: " + d.get("type") + "\n\n" +
        "Project details:\n" + d.get("details");
      location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Free Quote Request - " + d.get("type")) +
        "&body=" + encodeURIComponent(body);
      var note = document.getElementById("form-note");
      if (note) note.textContent = "Your email app should open with your request filled in. Just hit send — or call us at " + PHONE + ".";
    });
  }
})();
