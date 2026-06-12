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

  function moverNao() {
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 80 - 40;
    btnNao.style.transform = `translate(${x}px, ${y}px)`;
    btnNao.textContent = MENSAGENS_NAO[indiceMensagem % MENSAGENS_NAO.length];
    indiceMensagem++;
  }

  btnNao.addEventListener("mouseenter", moverNao);
  btnNao.addEventListener("focus", moverNao);
  btnNao.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moverNao();
  });

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
