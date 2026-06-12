const MENSAGENS_NAO = [
  "Tem certeza? 😢",
  "Pensa de novo...",
  "Impossível dizer não!",
  "O botão tá com vergonha 😅",
  "Só existe uma resposta certa!",
  "Não vai colar!",
  "Tenta de novo...",
];

let indiceMensagem = 0;

function criarCoracoesFlutuantes(container, quantidade) {
  for (let i = 0; i < quantidade; i++) {
    const coracao = document.createElement("span");
    coracao.className = "heart";
    coracao.textContent = "♥";
    coracao.style.left = `${Math.random() * 100}%`;
    coracao.style.animationDuration = `${6 + Math.random() * 8}s`;
    coracao.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(coracao);
  }
}

function dispararConfete(container) {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const coracao = document.createElement("span");
      coracao.className = "heart";
      coracao.textContent = "💖";
      coracao.style.left = `${Math.random() * 100}%`;
      coracao.style.fontSize = "1.5rem";
      coracao.style.animationDuration = "4s";
      container.appendChild(coracao);
      setTimeout(() => coracao.remove(), 4000);
    }, i * 80);
  }
}

function preencherConteudo() {
  document.title = `Oi nenê, ó eu aqui dnv (eu que fiz KKKKKKK)`;
  document.getElementById("tituloEnvelope").textContent = `Oi nenê, ó eu aqui dnv (eu que fiz KKKKKKK)`;
  document.getElementById("subtituloEnvelope").textContent = CONFIG.subtituloEnvelope;
  document.getElementById("tituloCarta").textContent = CONFIG.tituloCarta;

  const paragrafosEl = document.getElementById("paragrafos");
  paragrafosEl.innerHTML = "";
  CONFIG.paragrafos.forEach((texto) => {
    const p = document.createElement("p");
    p.textContent = texto;
    paragrafosEl.appendChild(p);
  });

  const motivosEl = document.getElementById("motivos");
  motivosEl.innerHTML = "";
  CONFIG.motivos.forEach((motivo) => {
    const li = document.createElement("li");
    li.textContent = motivo;
    motivosEl.appendChild(li);
  });

  document.getElementById("pergunta").textContent = CONFIG.pergunta;
  document.getElementById("btnSim").textContent = `${CONFIG.botaoSim} 💕`;
  document.getElementById("mensagemFinal").textContent = CONFIG.mensagemFinal;
  document.getElementById("mensagemFinalExtra").textContent = CONFIG.mensagemFinalExtra;
  document.getElementById("assinatura").textContent = `— VSFD eu te amo, ${CONFIG.seuNome}`;

  if (CONFIG.foto) {
    const img = document.getElementById("fotoCasal");
    img.src = CONFIG.foto;
    img.alt = `Foto especial para ${CONFIG.nomeDela}`;
    img.hidden = false;
  }
}

function configurarEnvelope() {
  const envelope = document.getElementById("envelope");
  const intro = document.getElementById("intro");
  const letter = document.getElementById("letter");
  const botaoAbrir = document.getElementById("openEnvelope");

  function abrirCarta() {
    envelope.classList.add("open");
    setTimeout(() => {
      intro.hidden = true;
      letter.classList.add("show");
    }, 700);
  }

  botaoAbrir.addEventListener("click", abrirCarta);
  botaoAbrir.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      abrirCarta();
    }
  });
}

function configurarBotoes() {
  const btnNao = document.getElementById("btnNao");
  const btnSim = document.getElementById("btnSim");
  const questionBlock = document.getElementById("questionBlock");
  const final = document.getElementById("final");
  const heartsContainer = document.getElementById("hearts");

  const DESLOC_MAX_X = 110;
  const DESLOC_MAX_Y = 65;
  const DISTANCIA_MINIMA_CURSOR = 95;
  const RAIO_PROXIMIDADE = 80;
  const COOLDOWN_MS = 100;

  let ancora = null;
  let ultimoMovimento = 0;
  let rafProximidade = null;

  function limitar(valor, minimo, maximo) {
    return Math.min(Math.max(valor, minimo), maximo);
  }

  function obterAncora() {
    if (ancora) return ancora;

    const rect = btnNao.getBoundingClientRect();
    ancora = {
      centroX: rect.left + rect.width / 2,
      centroY: rect.top + rect.height / 2,
    };
    return ancora;
  }

  function calcularDeslocamento(mouseX, mouseY) {
    const base = obterAncora();
    let melhor = null;
    let maiorDistancia = -1;

    for (let tentativa = 0; tentativa < 24; tentativa += 1) {
      const x = (Math.random() * 2 - 1) * DESLOC_MAX_X;
      const y = (Math.random() * 2 - 1) * DESLOC_MAX_Y;
      const centroX = base.centroX + x;
      const centroY = base.centroY + y;
      const distancia = Math.hypot(centroX - mouseX, centroY - mouseY);

      if (distancia >= DISTANCIA_MINIMA_CURSOR && distancia > maiorDistancia) {
        maiorDistancia = distancia;
        melhor = { x, y };
      }
    }

    if (melhor) return melhor;

    let dx = base.centroX - mouseX;
    let dy = base.centroY - mouseY;
    const comprimento = Math.hypot(dx, dy) || 1;
    dx = (dx / comprimento) * DESLOC_MAX_X;
    dy = (dy / comprimento) * DESLOC_MAX_Y;

    return {
      x: limitar(dx, -DESLOC_MAX_X, DESLOC_MAX_X),
      y: limitar(dy, -DESLOC_MAX_Y, DESLOC_MAX_Y),
    };
  }

  function cursorPertoDoBotao(mouseX, mouseY) {
    const rect = btnNao.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    return Math.hypot(mouseX - centroX, mouseY - centroY) < RAIO_PROXIMIDADE;
  }

  function moverNao(event) {
    const agora = Date.now();
    if (agora - ultimoMovimento < COOLDOWN_MS) return;
    ultimoMovimento = agora;

    obterAncora();

    const rect = btnNao.getBoundingClientRect();
    const mouseX = event?.clientX ?? rect.left + rect.width / 2;
    const mouseY = event?.clientY ?? rect.top + rect.height / 2;
    const { x, y } = calcularDeslocamento(mouseX, mouseY);

    btnNao.style.transform = `translate(${x}px, ${y}px)`;
    btnNao.textContent = MENSAGENS_NAO[indiceMensagem % MENSAGENS_NAO.length];
    indiceMensagem += 1;
  }

  function verificarProximidade(event) {
    if (questionBlock.hidden) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (!Number.isFinite(mouseX) || !Number.isFinite(mouseY)) return;
    if (!cursorPertoDoBotao(mouseX, mouseY)) return;

    moverNao(event);
  }

  document.addEventListener("mousemove", (event) => {
    if (questionBlock.hidden) return;
    if (rafProximidade) return;

    rafProximidade = requestAnimationFrame(() => {
      rafProximidade = null;
      verificarProximidade(event);
    });
  });

  btnNao.addEventListener("mouseenter", moverNao);
  btnNao.addEventListener("focus", moverNao);
  btnNao.addEventListener("touchstart", (event) => {
    event.preventDefault();
    const toque = event.touches[0];
    if (toque) {
      moverNao(toque);
      return;
    }
    moverNao();
  }, { passive: false });

  btnSim.addEventListener("click", () => {
    questionBlock.hidden = true;
    final.classList.add("show");
    dispararConfete(heartsContainer);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const heartsContainer = document.getElementById("hearts");
  criarCoracoesFlutuantes(heartsContainer, 18);
  preencherConteudo();
  configurarEnvelope();
  configurarBotoes();
});
