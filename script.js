/* =========================
   AGRINHO - LÓGICA JS
   Interatividade + comportamento dinâmico
========================= */

/* =========================
   MENU MOBILE (NAV)
========================= */
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // fecha menu ao clicar em link
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });
}

/* =========================
   SCROLL SUAVE ENTRE SEÇÕES
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* =========================
   ANIMAÇÃO AO ROLAR (REVEAL)
========================= */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".card, .info-box, .stat-box, .desafio-item").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "0.6s ease";
  observer.observe(el);
});

/* =========================
   QUIZ INTERATIVO
========================= */
function toggleQuiz() {
  const quiz = document.querySelector(".quiz-container");
  if (quiz) quiz.classList.toggle("active");
}

function calcularQuiz() {
  const respostas = {
    q1: "b",
    q2: "b",
    q3: "b"
  };

  let acertos = 0;

  Object.keys(respostas).forEach(q => {
    const selecionada = document.querySelector(`input[name="${q}"]:checked`);
    if (selecionada && selecionada.value === respostas[q]) {
      acertos++;
    }
  });

  const resultado = document.querySelector("#quizResult");

  if (!resultado) return;

  let mensagem = "";

  if (acertos === 3) {
    mensagem = "🌱 Excelente! Você domina sustentabilidade agrícola.";
  } else if (acertos === 2) {
    mensagem = "👍 Muito bem! Você está quase lá.";
  } else {
    mensagem = "📚 Continue aprendendo sobre agricultura sustentável.";
  }

  resultado.innerHTML = `
    <h3>Resultado do Quiz</h3>
    <p>${mensagem}</p>
    <p><strong>Acertos:</strong> ${acertos}/3</p>
    <button class="cta-button" onclick="resetQuiz()">Refazer</button>
  `;

  resultado.style.display = "block";
}

/* reset quiz */
function resetQuiz() {
  document.querySelectorAll("input[type='radio']").forEach(i => i.checked = false);
  const resultado = document.querySelector("#quizResult");
  if (resultado) resultado.style.display = "none";
}

/* =========================
   CALCULADORA DE IMPACTO
========================= */
function calcularImpacto() {
  const area = parseFloat(document.querySelector("#area")?.value);
  const percentual = parseFloat(document.querySelector("#percentual")?.value);
  const cultura = document.querySelector("#cultura")?.value;

  if (!area || !percentual) {
    alert("Preencha todos os campos!");
    return;
  }

  const fator = {
    soja: 2.5,
    milho: 2.0,
    cafe: 2.8,
    cana: 3.0
  };

  const base = area * (fator[cultura] || 2);
  const impacto = (base * percentual) / 100;
  const carbono = impacto * 0.8;

  const resultado = document.querySelector("#resultadoImpacto");

  if (!resultado) return;

  resultado.innerHTML = `
    <h3>🌍 Resultado Ambiental</h3>
    <p><strong>Área:</strong> ${area} ha</p>
    <p><strong>Impacto sustentável:</strong> ${impacto.toFixed(2)} toneladas CO₂</p>
    <p><strong>Equivalente:</strong> ${(carbono * 10).toFixed(0)} árvores 🌳</p>
    <button class="cta-button" onclick="resetCalc()">Novo cálculo</button>
  `;

  resultado.style.display = "block";
}

/* reset calculadora */
function resetCalc() {
  document.querySelector("#area").value = "";
  document.querySelector("#percentual").value = "";
  document.querySelector("#resultadoImpacto").style.display = "none";
}

/* =========================
   BOTÃO VOLTAR AO TOPO (DINÂMICO)
========================= */
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.className = "cta-button";
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.display = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.width = "50px";
topBtn.style.height = "50px";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   EXPERIÊNCIA FINAL: MICRO INTERAÇÕES
========================= */
document.querySelectorAll(".card, .cta-button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.style.transform = "scale(1.03)";
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "scale(1)";
  });
});
