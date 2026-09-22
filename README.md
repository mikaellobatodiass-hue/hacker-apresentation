# O Caso Daniel Nascimento — Dossiê / Apresentação

Apresentação em slides sobre o caso do hacker Daniel Nascimento (o ataque à Telemar,
a prisão na Operação Ponto Com e sua trajetória até hoje). É um site estático,
sem build, sem instalação de dependências — só abrir e apresentar.

## Tecnologias usadas

Nenhum framework, nenhum `npm install`. Só o básico da web, direto no navegador:

- **HTML5** — estrutura e conteúdo dos 10 slides.
- **CSS3** — todo o visual e as animações (tema navy/gold), incluindo:
  - `@keyframes` e `transition` para as animações de entrada, hover e o mosaico que se espalha.
  - Variáveis CSS (`:root { --gold: ... }`) para centralizar a paleta de cores.
  - `clamp()` e media queries para o layout responsivo (desktop → mobile).
- **JavaScript puro (vanilla)** — sem React, sem jQuery, sem bibliotecas. Só
  `document.querySelectorAll`, `classList` e `addEventListener` pra controlar
  qual slide aparece na tela.

Não tem GSAP, Framer Motion nem nenhuma lib externa no projeto atual — versões
anteriores chegaram a usar GSAP (via CDN) para um slide de linha do tempo, mas
esse slide foi removido a pedido, então hoje o projeto é 100% dependência zero.

## Estrutura de arquivos

```
hacker-apresentation/
├── DNX.html                # a apresentação inteira (HTML + CSS + JS num arquivo só)
├── img/
│   └── telemar-oi-logo.webp    # logo usada no slide "O Ataque"
├── style.css                # versão solta do CSS (referência/backup)
├── script.js                 # versão solta do JS (referência/backup)
└── README.md
```

**`DNX.html`** é o arquivo principal — é só abrir ele, tudo (HTML, CSS e JS)
já está embutido no próprio arquivo, então ele funciona sozinho. Ele espera a
logo em `img/telemar-oi-logo.webp`, então a pasta `img/` precisa estar junto.

`style.css` e `script.js` são a versão separada por arquivo (pra quem preferir
ler/editar o CSS e o JS fora do HTML) — hoje eles não são carregados pelo
`DNX.html`, ficam disponíveis como referência.

## Como rodar

Não precisa instalar nada. Duas opções:

1. **Mais simples**: dá dois cliques no `DNX.html` — ele abre direto no navegador.
2. **Com servidor local** (evita qualquer bloqueio do navegador com arquivos locais):
   ```bash
   python -m http.server 8080
   ```
   e depois abrir `http://localhost:8080/DNX.html`.

## Como funciona (resumo técnico)

O HTML tem 10 `<section class="slide">`, um por slide, todos escondidos por padrão
(`display:none` no CSS). O `script.js` é o único responsável por decidir **qual**
slide fica visível: ele guarda o índice do slide atual numa variável (`i`) e,
toda vez que esse índice muda, roda uma função chamada `render()` que:

- adiciona a classe `.active` só no slide atual (o CSS faz o resto: anima a
  entrada, mostra o conteúdo em cascata);
- acende o pontinho certo lá embaixo;
- atualiza a barrinha de progresso do topo;
- desativa o botão "Anterior" no primeiro slide e "Próximo" no último;
- reinicia a animação do mosaico de cartões, se o slide atual for o dele.

Navegação disponível: clique nos botões **Anterior/Próximo**, clique nos
**pontinhos**, ou as setas **← →** do teclado.

## Funcionalidades da apresentação

- **Navegação por slides** com barra de progresso e indicadores (pontinhos).
- **Animações de entrada em cascata** — título, texto e cards aparecem em
  sequência a cada slide, em vez de tudo de uma vez.
- **Mosaico "Registros da Época"** — cartões (terminal, recorte de jornal,
  documento, rede, citação, estatística) que começam empilhados e se espalham
  quando o slide abre.
- **Slide técnico sobre DDoS** — pseudocódigo conceitual, analogia do dia a
  dia, cards de prevenção, exemplos reais de ataques (GitHub, Google) e
  ferramentas de cibersegurança (Metasploit, Wireshark).
- **Responsivo** — em telas pequenas (celular/tablet), grids viram colunas
  únicas e o mosaico vira uma lista estática, sem perder a leitura.
- **Acessibilidade** — respeita `prefers-reduced-motion` (desativa animações
  para quem configurou isso no sistema) e os botões têm `aria-label`.
