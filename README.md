# Site pessoal de Igor Felipe Viana

Página única em pt-BR, estática, sem framework de runtime. Implementação do
handoff de design que está em [`design-handoff/`](design-handoff/).

## Rodar

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # gera dist/
npm run preview   # serve dist/ localmente
npm run typecheck # tsc --noEmit
```

## Deploy na Vercel

O `vercel.json` já traz build, saída e headers de cache. Importando o repositório
pela interface da Vercel não é preciso configurar nada: o framework é detectado
como Vite e o `vercel.json` cobre o resto.

Pela CLI:

```bash
npx vercel        # preview
npx vercel --prod # produção
```

Depois do primeiro deploy, trocar `https://igorviana.dev/` pelo domínio real em
`index.html` (`canonical`, `og:url`, `og:image`) e em `public/sitemap.xml`.

Não há backend nem variáveis de ambiente.

## Estrutura

```
index.html            markup semântico, toda a copy
src/styles.css        CSS puro, tokens em :root
src/main.ts           revelação por scroll, paralaxe e pilha de cards
public/               servido como está (fontes, imagens, favicons, robots)
scripts/assets.mjs    gera WebP, recorte da foto e o selo em PNG
scripts/inline.mjs    passo final do build: inlina CSS e JS no HTML
design-handoff/       handoff de design (protótipo, README, logo, assets)
assets-fonte/         originais não publicados (foto do Igor)
```

Sem dependências de runtime. `vite` e `typescript` são só de build. `sharp` está
em `optionalDependencies` porque só o `npm run assets` usa, rodado sob demanda
quando um original muda; assim uma falha de instalação dele não derruba o build.

## Performance

O build entrega um `index.html` autocontido: CSS e JS são inlinados, então o
caminho crítico é HTML + fonte, sem nenhuma requisição bloqueante extra.

| | |
|---|---|
| `dist/index.html` | ~31 KB (~9 KB gzip), CSS e JS inclusos |
| JS | 1,8 KB minificado, 0,91 KB gzip |
| Fonte | Sora variável self-hosted, 25 KB woff2, um arquivo para os pesos 200/300/400 |
| Imagens | WebP, todas `loading="lazy"` |

Decisões que sustentam isso:

- **Fonte self-hosted.** O Google Fonts custaria dois `preconnect` e um CSS
  render-blocking. Como Sora é variável, um único woff2 cobre 200, 300 e 400.
  O arquivo latino vai com `preload`; o latin-ext só baixa se algum glifo pedir.
- **Gradientes atmosféricos em CSS.** `radial-gradient` + `blur` + `mask`, zero
  bytes de imagem.
- **Logo em HTML/CSS**, não em imagem: herda a Sora já carregada e fica nítida
  em qualquer densidade de tela. Os PNGs em `design-handoff/logo/` servem só
  para favicon e ícone de toque.
- **WebP em vez de JPG.** Os mockups caíram de 570 KB para 291 KB. Os prints do
  budFin ficam na largura original (1400px): o `object-fit: cover` num quadro
  4/3 amplia a imagem para ~775px CSS, ou seja ~1550px em tela 2x.

## Movimento

Tudo em `src/main.ts`: um `IntersectionObserver` e um único listener de scroll
com `requestAnimationFrame`.

- **Revelação de texto** (`data-reveal`): entra de `#2C2C32` para a cor final.
- **Entrada de blocos** (`data-rise`): opacidade e deslocamento, com o atraso em
  ms vindo do valor do atributo.
- **Pilha de projetos**: cada card é `position: sticky`; o anterior recua com
  `scale` e `opacity` conforme o próximo sobe. Quando um card é mais alto que a
  viewport o `top` fica negativo, para ele fixar pelo rodapé e o texto continuar
  legível. Desligada no mobile via `matchMedia('(max-width: 640px)')`.
- **Paralaxe** nas duas camadas atmosféricas (hero e contato).

Os estados iniciais só existem sob a classe `.js` no `<html>`: sem JavaScript a
página abre inteira e legível, nada fica invisível. Com
`prefers-reduced-motion: reduce` o paralaxe e a pilha são desligados, os cards
entram em fluxo normal e as animações dos mockups param.

## Mobile

Um único bloco `@media (max-width: 640px)` no fim do `styles.css`, reproduzindo
os valores do protótipo. Fora dele o layout já reflui sozinho com `clamp()`,
`flex-wrap`, `grid auto-fit` e `min-width: 0`.

Conferido em 390x844 contra `design-handoff/Mobile Preview.dc.html`: nav em uma
linha só com a logo e três links ("Como eu trabalho" oculto, a seção continua
acessível pelo scroll), cards em fluxo normal, botão do WhatsApp em largura
total, sem overflow horizontal. Alvos de toque de 44px nos links da nav.

## Dois desvios em relação ao protótipo

1. **Entrada do hero.** O handoff especifica "entrada ao carregar (escalonada)",
   mas o protótipo passa o hero pelo mesmo `IntersectionObserver` das outras
   seções. Numa viewport onde o H1 quebra em quatro linhas, o botão "Ver
   projetos" nasce logo abaixo do threshold de 0.12 e o CTA principal fica
   invisível até alguém rolar. Aqui o hero revela no carregamento, mantendo os
   atrasos especificados (0, 120, 260, 380 ms; gradiente 300 ms).
2. **Animações dos mockups sob `prefers-reduced-motion`.** O protótipo mantém o
   scroll da captura e o crossfade do budFin rodando; aqui eles param junto com
   o resto.

## Pendências

- **`public/assets/site-scroll-final.webp`** ainda é a captura gerada a partir
  do protótipo. O handoff pede para refazer com o site publicado, e é o mockup
  do card "Site pessoal e portfólio", que fala deste próprio site.
- **`og:image`** aponta para `/assets/og.png`, que ainda não existe. Até criar,
  o link compartilhado no WhatsApp e no LinkedIn sai sem imagem.
