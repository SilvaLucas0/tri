/* TRI Climatização — interações */
(function () {
  "use strict";

  var WA = "5551989489992";

  /* ---------- Ano no rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Efeito de gelo: intensifica conforme rola ---------- */
  var iceReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var iceLayer = document.querySelector(".ice-layer");
  if (iceLayer && !iceReduce) {
    var root = document.documentElement;
    var ticking = false;
    function updateIce() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.pageYOffset / max : 0;
      // começa sutil e vai ganhando "gelo"; teto ~0.85 para manter legível
      var ice = Math.min(0.85, Math.pow(p, 0.9) * 0.9);
      root.style.setProperty("--ice", ice.toFixed(3));
      ticking = false;
    }
    function onScrollIce() {
      if (!ticking) { window.requestAnimationFrame(updateIce); ticking = true; }
    }
    updateIce();
    window.addEventListener("scroll", onScrollIce, { passive: true });
    window.addEventListener("resize", onScrollIce, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("menuToggle");
  var closeBtn = document.getElementById("menuClose");
  var nav = document.getElementById("mobileNav");
  var scrim = document.getElementById("scrim");

  function openMenu() {
    nav.setAttribute("data-open", "true");
    scrim.hidden = false;
    requestAnimationFrame(function () { scrim.setAttribute("data-open", "true"); });
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    nav.setAttribute("data-open", "false");
    scrim.removeAttribute("data-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(function () { scrim.hidden = true; }, 260);
  }
  if (toggle) toggle.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (scrim) scrim.addEventListener("click", closeMenu);
  if (nav) {
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.getAttribute("data-open") === "true") closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Formulário -> WhatsApp ---------- */
  var form = document.getElementById("orcamentoForm");
  var status = document.getElementById("formStatus");

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = val("nome");
      var telefone = val("telefone");
      var local = val("local");

      // Validação mínima
      if (!nome || !telefone || !local) {
        status.setAttribute("data-state", "error");
        status.textContent = "Preencha nome, telefone e cidade ou bairro para continuar.";
        var first = !nome ? "nome" : (!telefone ? "telefone" : "local");
        var f = document.getElementById(first);
        if (f) f.focus();
        return;
      }

      var linhas = [
        "Olá! Encontrei a TRI Climatização pelo site e gostaria de solicitar um orçamento.",
        "",
        "• Nome: " + nome,
        "• Telefone: " + telefone,
        "• Cidade/bairro: " + local,
        "• Tipo de cliente: " + val("cliente"),
        "• Serviço: " + val("servico")
      ];

      var qtd = val("qtd");
      if (qtd) linhas.push("• Aparelhos: " + qtd);
      var modelo = val("modelo");
      if (modelo) linhas.push("• Marca/modelo: " + modelo);
      linhas.push("• Melhor período: " + val("periodo"));
      var descricao = val("descricao");
      if (descricao) {
        linhas.push("");
        linhas.push("Descrição: " + descricao);
      }

      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(linhas.join("\n"));

      status.setAttribute("data-state", "ok");
      status.textContent = "Tudo certo! Abrindo o WhatsApp com os seus dados…";

      window.open(url, "_blank", "noopener");
    });
  }
})();
