// ---------------------------------------------------------------------------
// Motor da apresentação (slideshow).
// Sem esse arquivo, todos os slides apareceriam empilhados ao mesmo tempo,
// e os botões, pontinhos e barra de progresso não fariam nada.
// ---------------------------------------------------------------------------

// Pega todos os <section class="slide"> do HTML e guarda numa lista.
const slides = Array.from(document.querySelectorAll('.slide'));
const total = slides.length;

// "i" guarda o índice do slide atual (começa no 0, o primeiro slide).
let i = 0;

// Referências aos elementos fixos da interface (barra de progresso e botões).
const bar = document.getElementById('bar');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsWrap = document.getElementById('dots');

// Cria um "pontinho" (dot) de navegação para cada slide, dinamicamente,
// em vez de precisar escrever um <div class="dot"> por slide no HTML.
slides.forEach((_, idx) => {
  const d = document.createElement('div');
  d.className = 'dot';
  dotsWrap.appendChild(d);
});
const dots = Array.from(dotsWrap.children);

// Referência ao mosaico de cartões do slide "Registros da Época",
// que tem uma animação própria de "espalhar" ao entrar no slide.
const galleryStage = document.getElementById('gallery-stage');

// render() é a função central: roda toda vez que o slide atual muda.
function render(){
  // Mostra só o slide de índice "i" (classe .active vira display:flex no CSS)
  // e esconde todos os outros.
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));

  // Acende o pontinho correspondente ao slide atual.
  dots.forEach((d, idx) => d.classList.toggle('on', idx === i));

  // Atualiza a largura da barrinha de progresso no topo da tela.
  bar.style.width = ((i+1)/total*100) + '%';

  // Desativa "Anterior" no primeiro slide e "Próximo" no último,
  // pra não deixar passar dos limites.
  prevBtn.disabled = i === 0;
  nextBtn.disabled = i === total - 1;

  // Se o slide que acabou de ficar ativo for o do mosaico, reinicia a
  // animação: tira a classe "spread" e adiciona de novo com um pequeno
  // atraso, pra que os cartões sempre "espalhem" de novo ao revisitar o slide.
  if (galleryStage) {
    galleryStage.classList.remove('spread');
    if (slides[i].contains(galleryStage)) {
      requestAnimationFrame(() => setTimeout(() => galleryStage.classList.add('spread'), 60));
    }
  }
}

// Muda de slide somando "delta" ao índice atual (+1 = próximo, -1 = anterior),
// travando entre 0 e o último slide (Math.min/Math.max evitam passar dos limites).
function go(delta){ i = Math.min(total-1, Math.max(0, i+delta)); render(); }

// Liga os botões de navegação às ações de avançar/voltar.
prevBtn.addEventListener('click', () => go(-1));
nextBtn.addEventListener('click', () => go(1));

// Permite navegar também pelo teclado, usando as setas ← e →.
window.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') go(1);
  if(e.key === 'ArrowLeft') go(-1);
});

// Chama render() uma vez ao carregar a página, pra deixar o slide 0 visível
// e o estado inicial dos botões/pontinhos/barra já correto.
render();
