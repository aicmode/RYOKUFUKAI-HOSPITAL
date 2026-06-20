/* =========================================================
   緑風会病院 - script.js
   ハンバーガーメニュー / FAQアコーディオン / フォーム /
   スクロール表示 / 現在地active / スマホ固定CTA
   ========================================================= */
(function () {
  "use strict";

  /* ---------- ハンバーガーメニュー ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("gnav");
  if (toggle && nav) {
    var closeMenu = function () {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "メニューを開く");
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) closeMenu();
    });
  }

  /* ---------- 現在ページ active ---------- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".gnav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href) return;
    var file = href.split("/").pop().split("#")[0];
    if (file === here || (here === "" && file === "index.html")) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---------- FAQ アコーディオン ---------- */
  document.querySelectorAll(".faq__q").forEach(function (q, index) {
    var item = q.closest(".faq__item");
    var answer = item ? item.querySelector(".faq__a") : null;
    if (!item || !answer) return;
    var questionId = "faq-question-" + (index + 1);
    var answerId = "faq-answer-" + (index + 1);
    q.type = "button";
    q.id = questionId;
    q.setAttribute("aria-controls", answerId);
    answer.id = answerId;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", questionId);
    answer.setAttribute("aria-hidden", "true");
    q.addEventListener("click", function () {
      var isOpen = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", isOpen ? "true" : "false");
      answer.setAttribute("aria-hidden", isOpen ? "false" : "true");
      if (isOpen) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
  // リサイズ時に開いているFAQの高さを再計算
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq__item.is-open .faq__a").forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + "px";
    });
  });

  /* ---------- お問い合わせフォーム（デモ） ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("form-msg");
      if (msg) {
        msg.classList.add("is-visible");
        msg.setAttribute("role", "status");
        msg.setAttribute("aria-live", "polite");
      }
      form.reset();
      if (msg && typeof msg.scrollIntoView === "function") {
        var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        msg.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* ---------- スクロールでふわっと表示 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- フッターの年号 ---------- */
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
