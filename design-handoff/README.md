# Handoff: Site pessoal de Igor Felipe Viana

## Overview
Site pessoal de uma página (scroll único, pt-BR) de um engenheiro de software freelancer. O visitante é um cliente pagante (dono de PME, gestor não técnico) que precisa sentir competência técnica e confiabilidade. O site vende serviço, não é currículo. Sensação alvo: divertido de navegar, sério de ler.

## About the Design Files
Os arquivos nesta pasta são **referências de design feitas em HTML** (protótipo com aparência e comportamento finais), não código de produção para copiar direto. A tarefa é **recriar este design exatamente** em um projeto estático leve e performático. Recomendação: **Astro** ou **Vite + HTML/CSS/vanilla TS** (sem framework de UI, sem Tailwind), com deploy em Vercel, Netlify ou Cloudflare Pages. Se preferir React, use Next.js com export estático. O que importa: HTML semântico, CSS puro, um único arquivo JS pequeno, fonte via Google Fonts, zero dependências de runtime.

`Igor Viana.dc.html` é a referência principal. Ele usa um runtime de protótipo (`support.js`, tags `<x-dc>`, `<sc-if>`, atributos `style-hover`, holes `{{ }}`); **ignore esse runtime** e leia os estilos inline como a especificação. `image-slot.js` é só o placeholder da foto no protótipo; no site real use uma `<img>` normal.

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, copy e animações são finais. Recrie pixel a pixel. A única liberdade é a estrutura de arquivos/framework.

## Regras globais
- Fundo `#08080A` dominante, muito espaço vertical vazio entre seções: `padding-top: clamp(120px, 18vw, 220px)` em cada seção.
- Container: `max-width: 1120px; margin: 0 auto; padding: 0 24px`.
- Uma família tipográfica: **Sora** (Google Fonts), pesos 200, 300, 400. Fallback `'Helvetica Neue', Helvetica, Arial, sans-serif`. `-webkit-font-smoothing: antialiased`.
- Títulos gigantes em peso 200/300, NUNCA bold. Impacto vem do tamanho.
- Corpo pequeno (13.5 a 15px), cinza `#8A8A93`, blocos estreitos (max-width 440 a 520px).
- **Cor não aparece na interface.** Botões, textos, bordas e ícones são neutros. Cor só nas imagens atmosféricas (gradientes roxo `#7C3AED` para laranja `#F97316`, dissolvendo no preto) e dentro dos mockups. Única exceção: botão do WhatsApp verde `#25D366` no final.
- Sem travessão (—) em nenhum texto.
- `html { scroll-behavior: smooth }`.
- Links padrão: `a { color:#F2F2F5; text-decoration:none } a:hover { color:#FFF }`.
- Mobile-first, responsivo sem breakpoints rígidos: `clamp()`, `flex-wrap`, `grid auto-fit`. Nenhum texto abaixo de contraste AA sobre `#08080A` (o cinza `#55555D` é usado só para rótulos decorativos de 11 a 12px e a faixa de stack).
- Não incluir: barra de porcentagem de habilidade, linha do tempo, blog, depoimentos, alternador de tema, foto de banco, formulário de contato.

## Design Tokens
Cores
- Fundo: `#08080A`
- Superfície/cards: `#131316`
- Borda sutil: `#232327` (hover de card: `#33333A`)
- Texto principal: `#F2F2F5`
- Texto secundário: `#8A8A93`
- Rótulo decorativo / stack: `#55555D`
- Texto "antes da revelação": `#2C2C32`
- Mockup: fundo `#0C0C0F`, linhas `#1C1C20`, blocos `#2A2A30`, `#3A3A42`, claro `#E8E8EC`
- Gradiente atmosférico: roxo `rgba(124,58,237,…)` e laranja `rgba(249,115,22,…)`
- WhatsApp: `#25D366` (hover `#3DE47C`), texto `#08080A`

Tipografia (Sora)
- H1 hero: `clamp(42px, 8.2vw, 112px)`, peso 200, line-height 1.02, letter-spacing -0.03em, `text-wrap: balance`
- H2 seção: `clamp(38px, 6.4vw, 84px)`, peso 300, line-height 1.04, letter-spacing -0.025em
- H2 contato: `clamp(46px, 9vw, 124px)`, peso 200, line-height 0.98, letter-spacing -0.035em
- H3 projeto: `clamp(24px, 2.6vw, 32px)`, peso 300, line-height 1.15, letter-spacing -0.02em
- H3 serviço: 18px, peso 400, line-height 1.3, letter-spacing -0.01em
- H3 passo: `clamp(20px, 2.4vw, 28px)`, peso 300, line-height 1.2
- Número do passo: `clamp(32px, 4.5vw, 56px)`, peso 200, line-height 1, letter-spacing -0.03em
- Corpo: 14 a 15px, line-height 1.65 a 1.7, `text-wrap: pretty`
- Rótulo de bloco ("O PROBLEMA"): 11px, uppercase, letter-spacing .08em, `#55555D`
- Pílula: 12px, letter-spacing .04em, `#8A8A93`
- Nav: 13 a 14px

Raios: pílula `999px`; card de projeto `32px`; mockup `18px`; grade de serviços `24px`; tiles internos 6 a 10px.
Sombra: só no card de projeto empilhado: `0 -24px 80px rgba(8,8,10,.6)`.

Componentes recorrentes
- **Pílula de seção**: `display:inline-flex; align-items:center; padding:7px 14px; border:1px solid #232327; border-radius:999px; font-size:12px; letter-spacing:.04em; color:#8A8A93`.
- **Botão primário**: pílula `min-height:48px; padding:0 26px; background:#F2F2F5; color:#08080A; font-size:14px`; hover `background:#FFFFFF`.
- **Link discreto**: 13 a 14px `#8A8A93`, `border-bottom:1px solid #232327; padding-bottom:2px`; hover cor `#F2F2F5` e borda `#8A8A93`, transição .3s.
- **Imagem atmosférica**: div com radial-gradients roxo/laranja, `filter: blur(48px a 56px)`, `mask-image: linear-gradient(to bottom, transparent, #000 35-40%, #000 62-65%, transparent)`, `inset: -15% -10%` (sobra para o paralaxe), `pointer-events:none`. Ver valores exatos no HTML (hero e contato).

## Screens / Views (uma página, nesta ordem)

### 0. Navegação
`position:fixed; top:0; z-index:20; padding:8px 24px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px 16px; background: linear-gradient(to bottom, rgba(8,8,10,.85), rgba(8,8,10,0)); backdrop-filter: blur(2px)`.
Esquerda (âncora `#topo`): **logo** = selo 26x26px, `border-radius:7px; background:#F2F2F5; color:#08080A`, texto "iv" em Sora 400 12px `letter-spacing:-0.04em`, seguido (gap 10px) do wordmark 14px `letter-spacing:-0.02em`: "igorf" em `#F2F2F5` peso 400 + "viana" em `#8A8A93` peso 300. Arquivos prontos em `logo/` (selo em PNG 1024/512/192/180/64/32 para favicon e ícones; lockups escuro, claro e transparente). Favicon: `favicon-32.png` e `favicon-180.png` (apple-touch-icon). Todos os links da nav com `display:inline-flex; align-items:center; min-height:44px` (alvo de toque). Direita: links 13px `#8A8A93` (hover `#F2F2F5`), `gap: 0 clamp(14px, 2.5vw, 22px)`, `flex-wrap:wrap`: Projetos `#projetos`, Serviços `#servicos`, Como eu trabalho `#processo`, Contato `#contato`.

### 1. Hero (`#topo`)
`min-height:100svh; display:flex; flex-direction:column; justify-content:flex-end; overflow:hidden`.
Bloco central (`text-align:center; padding:140px 24px 0; gap:28px`):
- Pílula: "Engenheiro de software, sistemas sob medida"
- H1: "Sistemas sob medida, do banco de dados à interface." (max-width 1000px)
- Parágrafo 15px `#8A8A93`, max-width 520px: "Um engenheiro só, do levantamento ao deploy. Sem intermediário, sem repasse entre front e back, sem ninguém culpando o outro quando quebra."
- Botão primário "Ver projetos" (âncora `#projetos`)
Abaixo: faixa atmosférica `height:52vh; min-height:320px; margin-top:-6vh; overflow:hidden` com a camada de gradiente (paralaxe).
Entrada ao carregar (escalonada): pílula 0ms, H1 120ms, parágrafo 260ms, botão 380ms, gradiente 300ms (fade 1.6s).

### 2. Faixa de stack
`padding:8px 24px 0`. Linha centralizada, `flex-wrap:wrap; gap:10px 28px; font-size:12px; letter-spacing:.06em; color:#55555D`: Python, Django, React, TypeScript, PostgreSQL, AWS, Docker, n8n. Fade-in ao entrar (delay 200ms).

### 3. Projetos (`#projetos`) - seção mais importante
Cabeçalho: pílula "Projetos" + H2 "Três problemas reais, três sistemas no ar." (max-width 900px, revelação por scroll).
Lista em coluna com `gap: clamp(72px, 10vw, 140px)`.

**Efeito de pilha (stack) obrigatório**: cada card fica em um wrapper `position:sticky; top:96px; margin-bottom:22vh`. Ao rolar, o próximo card sobe por cima do anterior; o anterior recua com `transform: scale(1 - 0.07p) translateY(-30p px)` e `opacity: 1 - 0.6p`, onde `p` = progresso 0 a 1 calculado por JS (`p = clamp(1 - (topDoPróximo - topDoAtual) / alturaDoAtual)`), atualizado em `scroll` via `requestAnimationFrame`. `transform-origin: 50% 0`. Em telas onde o card é mais alto que a viewport, o JS ajusta `top = min(96, innerHeight - alturaDoCard - 24)` (pode ficar negativo) para o card fixar pelo rodapé e o texto continuar legível. Recalcular no `resize`.

Card (`<article>`): `display:flex; flex-wrap:wrap; gap:40px; align-items:center; background:#131316; border:1px solid #232327; border-radius:32px; padding:clamp(24px,4vw,48px); box-shadow:0 -24px 80px rgba(8,8,10,.6); transition:border-color .5s`; hover borda `#33333A`. Card 2 usa `flex-direction:row-reverse` (layout alternado). Coluna imagem `flex:1 1 380px`, coluna texto `flex:1 1 300px; display:flex; flex-direction:column; gap:26px`. No mobile, a imagem fica sempre em cima.

Mockup: `aspect-ratio:4/3; border-radius:18px; overflow:hidden; background:#0C0C0F; border:1px solid #232327; position:relative`. Suporte opcional a vídeo: se houver URL de vídeo, um `<video autoplay muted loop playsinline>` com `object-fit:cover` cobre o mockup.

Blocos de texto de cada card: H3 do projeto, depois três blocos (rótulo 11px uppercase `#55555D` + parágrafo 14px `#8A8A93` com revelação por scroll). Sem link "Ver no ar" em nenhum card.

**Card 1: "Site pessoal e portfólio"**
- Mockup: barra de navegador (34px, três bolinhas `#232327`, borda inferior `#1C1C20`, fundo `#0C0C0F`) e, abaixo, a captura longa da própria página (`assets/site-scroll-final.jpg`, 909x6264) rolando em loop: `@keyframes siteScroll { 0%,6% { transform: translateY(0) } 94%,100% { transform: translateY(calc(100cqh - 100%)) } }`, `animation: siteScroll 22s cubic-bezier(.45,.05,.55,.95) infinite alternate`, container com `container-type:size; overflow:hidden`. Refazer a captura com o site publicado.
- O problema: "Um profissional autônomo perdia clientes porque não tinha onde mostrar o que já fez. O contato chegava pelo WhatsApp e morria ali."
- O que eu fiz: "Página única, rápida, com projetos, serviços e contato direto. Sem CMS pesado: conteúdo em arquivos simples, deploy automático a cada alteração. React, TypeScript e hospedagem estática com CDN."
- O resultado: "Carrega em menos de 1 segundo no 4G. Nota 100 de performance no Lighthouse."

**Card 2: "Painel administrativo"** (imagem à direita)
- Mockup: sidebar 52px com ícones quadrados, três tiles de estatística, gráfico de barras com `linear-gradient(to top, rgba(124,58,237,.7), rgba(249,115,22,.5))` (alturas 30/55/42/78/64/90/70/100%), três linhas de tabela. Glow roxo/laranja borrado (`blur(34px)`) no canto inferior direito. Ver HTML para as medidas.
- O problema: "A operação vivia em cinco planilhas. Ninguém sabia qual era a versão certa e o fechamento do mês levava três dias."
- O que eu fiz: "Painel único com dados em tempo real, filtros por período e exportação. Backend em Django com PostgreSQL, front em React, tema escuro para uso o dia inteiro. Deploy na AWS com Docker."
- O resultado: "Fechamento do mês caiu de três dias para uma tarde. Uma fonte de verdade para toda a equipe."

**Card 3: "budFin"** (projeto real, no ar em https://budfin-app.vercel.app/)
- Mockup: prints reais do app em `assets/budfin/` (inicio, dividas, nova-divida, ajustes; 1400px de largura). Todas absolutas no mockup com `object-fit:cover; object-position:left top`. A primeira (inicio) fica fixa no fundo; as outras três fazem crossfade por cima em ciclo de 16s: `@keyframes budShow { 0%{opacity:0} 4%{opacity:1} 25%{opacity:1} 29%{opacity:0} 100%{opacity:0} }`, `animation: budShow 16s ease-in-out <4s|8s|12s> infinite`. Sem glow de gradiente neste card (o print já é a imagem).
- O problema: "Contas a pagar e a receber espalhadas entre memória, bloco de notas e conversa de WhatsApp. Cobrança dividida entre amigos que ninguém lembrava de acertar, e vencimento descoberto pelo juros."
- O que eu fiz: "App de controle de dívidas pessoais: contas a pagar e a receber, divisão de cobranças entre pessoas e lembretes push antes do vencimento (7, 3 e 1 dia antes, e no dia). Instalável no celular e no desktop, em português e inglês, com tema claro e escuro."
- O resultado: "No ar e em uso diário. Cada conta com data, valor e quem deve o quê, e o aviso chega antes do vencimento, não depois."

### 4. Serviços (`#servicos`)
Cabeçalho assimétrico: `display:flex; flex-wrap:wrap; gap:32px 64px; align-items:flex-end; justify-content:space-between`. Esquerda (`flex:1 1 420px`): pílula "Serviços" + H2 "O que eu resolvo para o seu negócio.". Direita (`flex:0 1 360px`): parágrafo 15px "Você descreve a dor. Eu cuido do banco de dados, do servidor, da interface e da integração, e entrego uma coisa só funcionando."
Grade: `display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:1px; background:#232327; border:1px solid #232327; border-radius:24px; overflow:hidden`. Cada célula `background:#08080A; padding:32px 28px`, hover `background:#131316` (.5s). Conteúdo: H3 18px + parágrafo 13.5px `#8A8A93`. Entrada escalonada (90ms entre células).
1. "Sistema interno sob medida": "CRM, painel, portal ou MVP. Para quando a planilha virou gargalo e o software de prateleira não encaixa no seu processo."
2. "Sistema de agendamento e reservas": "Agenda online com horários, confirmação automática e lembrete para o cliente. Acaba a fila de mensagens para marcar e desmarcar."
3. "Controle de estoque, pedidos e cadastro": "Cadastro de produtos, clientes e pedidos em um lugar só, com relatório simples do que entrou e saiu. Para sair da planilha sem virar refém de software caro."
4. "Integração entre sistemas que não conversam": "Pagamento, ERP, planilha, API de terceiro. Acaba o copiar e colar entre telas e o dado que nunca bate."
5. "Site e landing page de alta performance": "Carrega rápido, converte melhor e não depende de plugin que quebra na próxima atualização."

### 5. Como eu trabalho (`#processo`)
Pílula "Como eu trabalho" + H2 "Você sabe o que vai receber, quando, e acompanha tudo no caminho." (max-width 900px).
Lista `<ol>` sem marcadores, `max-width:820px`. Cada `<li>`: `display:flex; gap:clamp(20px,4vw,56px); padding:clamp(40px,6vw,72px) 0; border-top:1px solid #232327` (último também `border-bottom`). Número (`width:clamp(56px,8vw,96px)`) + coluna com H3 e parágrafo 14.5px (max-width 460px). Número e parágrafo revelam por scroll; o `<li>` inteiro sobe 28px ao entrar.
- 01 "Conversa e diagnóstico": "Entendo o problema antes de propor solução. Às vezes o que você precisa é menor e mais barato do que imaginava."
- 02 "Proposta com escopo e prazo definidos": "Por escrito: o que entra, o que não entra, quanto custa e quando fica pronto. Sem surpresa no meio do caminho."
- 03 "Desenvolvimento com acompanhamento": "Entregas por etapa, com atualização a cada avanço. Você vê o sistema funcionando ao longo do processo e ajusta o rumo enquanto ainda é barato ajustar."
- 04 "Entrega no ar": "Publicado, com explicação de como usar e manter. Acesso e código ficam com você, não comigo."

### 6. Sobre (`#sobre`)
Pílula "Sobre". Linha `display:flex; gap:28px; flex-wrap:wrap; align-items:flex-start`: foto 132x164px, `border-radius:20px`, `object-fit:cover` (fornecida pelo Igor; no protótipo é um placeholder) + parágrafo 15px, line-height 1.7, max-width 520px:
"Engenheiro de software: banco de dados, backend em Python, interface em React, infraestrutura e integrações, tudo com a mesma pessoa. Rotina em uma plataforma SaaS multi-tenant em produção, com CRM, funil de vendas, contratos e atendimento por WhatsApp. Estudante de Engenharia de Software na Universidade Positivo. Inglês avançado, o que resolve documentação, APIs e fornecedores de fora sem tradutor no meio."

### 7. Contato (`#contato`)
`position:relative; margin-top:clamp(120px,18vw,220px); padding:clamp(140px,22vw,260px) 24px clamp(120px,18vw,200px); overflow:hidden`. Camada atmosférica absoluta cobrindo a seção (paralaxe, `blur(56px)`).
- H2 gigante: "Tem um processo travado? Vamos conversar." (max-width 1000px)
- Parágrafo 15px, max-width 440px: "Me conta o problema em uma mensagem. Respondo com perguntas, não com orçamento genérico."
- Linha `flex-wrap:wrap; gap:16px 32px; align-items:center`:
  - Botão pílula verde `min-height:52px; padding:0 28px; background:#25D366; color:#08080A; font-size:15px`, hover `#3DE47C`, texto "WhatsApp →", `href="https://wa.me/5541995796479?text=<mensagem URL-encoded>"`, mensagem padrão "Olá Igor, vi seu site e quero conversar sobre um projeto.", `target=_blank rel=noopener`.
  - Link discreto `mailto:contact.jojigor@gmail.com` com texto "contact.jojigor@gmail.com"
  - Link discreto "linkedin.com/in/igor-fviana" para `https://linkedin.com/in/igor-fviana`
Sem formulário.

### 8. Rodapé
`padding:0 24px 32px`. Container com `border-top:1px solid #232327; padding-top:24px; display:flex; justify-content:space-between; flex-wrap:wrap; font-size:12.5px; color:#55555D`. Esquerda: "Igor Felipe Viana · {ano atual}" (ano via JS ou build). Direita: link "github.com/apartigor" para `https://github.com/apartigor` (hover `#F2F2F5`).

## Responsividade (mobile-first)
O protótipo não usa media queries: tudo reflui com `clamp()`, `flex-wrap`, `grid auto-fit` e `min-width:0`. Reproduzir exatamente esse comportamento (media queries são permitidas se ajudarem, desde que o resultado seja o mesmo). `Mobile Preview.dc.html` mostra o protótipo em 390x844 para conferência.

Larguras de referência: 360 e 390 (celular), 768 (tablet), 1120+ (desktop, largura do container).

O protótipo aplica um único bloco `@media (max-width:640px)` (ver `<helmet><style>` no HTML) por cima dos estilos inline. Reproduzir esses valores:
- Nav: `padding:10px 20px`, uma linha só (`flex-wrap:nowrap`), links 12px com gap 14px, e o link "Como eu trabalho" **oculto** no mobile (a seção continua acessível pelo scroll).
- Hero: bloco de texto `padding:104px 20px 0; gap:22px`; faixa atmosférica `height:34vh; min-height:220px; margin-top:-2vh`.
- Seções: `padding:96px 20px 0` (contato: `margin-top:96px; padding:120px 20px 96px`).
- Projetos: **efeito de pilha desligado** (wrapper `position:static; margin-bottom:0`, JS não aplica transform/opacity quando `matchMedia('(max-width:640px)')` casa). Card: `border-radius:22px; padding:14px 14px 24px; gap:22px; box-shadow:none`; a imagem ocupa a largura toda e o texto tem `padding:0 8px; gap:18px`.
- Serviços: célula `padding:24px 20px`; cabeçalho com gap 20px.
- Passos: `padding:32px 0; gap:18px`.
- Botão WhatsApp: `width:100%`.
- Rodapé: coluna, gap 10px.

Comportamento esperado em 390px:
- **Nav**: logo à esquerda e três links (Projetos, Serviços, Contato) à direita, em uma única linha. Sem menu hamburger. Todos os itens com 44px de altura mínima.
- **Hero**: H1 em 42px (mínimo do clamp), parágrafo em coluna única; a faixa atmosférica reduzida para 34vh para o conjunto caber próximo de uma tela.
- **Stack**: linha única com quebra e gap 10px 28px.
- **Projetos**: card em coluna (imagem em cima, texto embaixo, inclusive no card 2 com `row-reverse`). Cards em fluxo normal, sem pilha, com a entrada por scroll (rise) normal. Imagem sangrando quase até a borda do card (padding 14px).
- **Serviços**: cabeçalho empilha (título, depois parágrafo). Grade vira uma coluna (auto-fit com mínimo 230px).
- **Como eu trabalho**: número (56px de largura) e texto lado a lado, gap 20px, padding vertical 40px.
- **Sobre**: foto em cima, texto embaixo (quebra do flex).
- **Contato**: H2 em 46px; botão do WhatsApp em largura total, e-mail e LinkedIn abaixo.
- **Rodapé**: nome e GitHub podem ficar em duas linhas.
- Espaçamento entre seções: 96px.
- Nenhum elemento com largura fixa maior que 342px (390 menos 2x24 de padding). Nenhum overflow horizontal: `overflow-x:hidden` no `body` como segurança, e as camadas atmosféricas com `inset` negativo ficam dentro de seções com `overflow:hidden`.

Alvos de toque: mínimo 44px em links de nav e botões (botão primário 48px, WhatsApp 52px). Links discretos (e-mail, LinkedIn) podem ganhar `padding:10px 0` no mobile.

Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`. Usar `100svh` no hero (não `100vh`) para não estourar com a barra do navegador mobile.

## Interactions & Behavior
Implementar em um único script pequeno (vanilla), sem bibliotecas.

1. **Revelação de texto por scroll** (`data-reveal`): títulos H2, parágrafos dos cards/passos/sobre/contato e números dos passos começam em `color:#2C2C32` (títulos também `transform:translateY(14px)`) com `transition: color .9s ease, transform .9s ease`. Um `IntersectionObserver` (`threshold:0.12, rootMargin:'0px 0px -6% 0px'`) troca para a cor final (`#F2F2F5` em títulos/números, `#8A8A93` em parágrafos) e `transform:none`, uma vez só (unobserve).
2. **Entrada de blocos** (`data-rise`): pílulas (12px), cards de serviço (24px), passos (28px), elementos do hero (12 a 28px), linha de contato e foto (20 a 24px) começam `opacity:0; transform:translateY(N px)` com `transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)` e `transition-delay` igual ao valor do atributo em ms. O mesmo observer aplica `opacity:1; transform:none`.
3. **Pilha de projetos**: descrita na seção 3 (sticky + progresso por JS).
4. **Paralaxe leve** nas duas camadas atmosféricas (hero e contato): a cada frame de scroll, `translate3d(0, (centroDaSeçãoRelativoAoCentroDaViewport * 0.14)px, 0)`. Não aplicar `transform:none` da revelação nesses elementos.
5. **Hover**: cards de projeto (borda), células de serviço (fundo), links (cor + borda), botões (fundo). Transições .3 a .5s.
6. `prefers-reduced-motion: reduce`: desligar paralaxe, pilha (cards em fluxo normal) e mostrar todo texto revelado.
7. Sem animação de digitação, sem partículas, sem carrossel automático.

## State Management
Nenhum estado de aplicação. Apenas: lista de elementos observados, handler de scroll com `requestAnimationFrame` (um só), handler de `resize` para recalcular o `top` dos wrappers sticky. Ano do rodapé = `new Date().getFullYear()`.

## Performance (o site é a prova do trabalho)
- Meta: Lighthouse 100 em performance, LCP < 1s em 4G.
- Fonte Sora com `preconnect` + `display=swap`; carregar só pesos 200/300/400 (ou self-host em woff2).
- Gradientes atmosféricos em CSS puro (radial-gradient + blur + mask), sem imagens.
- `assets/site-scroll-final.jpg` com `loading="lazy"`; considerar converter para WebP/AVIF.
- Zero frameworks de runtime no bundle final; JS total < 5 KB.
- HTML semântico (`nav`, `section`, `article`, `ol`, `footer`, `h1` a `h3`), `lang="pt-BR"`, meta viewport, título e description.

## Assets
- `logo/`: selo "iv" (`igorfviana-mark-1024.png`, versão escura `igorfviana-mark-dark-1024.png`, favicons 512/192/180/64/32) e lockups com o wordmark (`igorfviana-lockup-dark.png`, `-light.png`, `-transparent.png`). `assets/logo-mark.png` (52px) é o selo em 2x para a nav, mas o ideal é reproduzir o selo em HTML/CSS como no protótipo.
- `assets/site-scroll-final.jpg`: captura longa da página (909x6264) usada no mockup do card 1. Gerada a partir deste protótipo; refazer com o site publicado.
- `assets/budfin/inicio.jpg`, `dividas.jpg`, `nova-divida.jpg`, `ajustes.jpg`, `login.jpg`: prints reais do budFin.
- Foto do Igor: a fornecer (132x164 exibida; enviar pelo menos 264x328).
- Nenhum ícone. Nenhuma foto de banco.

## Files
- `Igor Viana.dc.html`: protótipo completo (referência primária de layout, estilos inline e copy). O bloco `<script data-dc-script>` no final contém a lógica de revelação, paralaxe e pilha para consulta.
- `Mobile Preview.dc.html`: moldura de 390x844 com o protótipo dentro, para conferir o mobile.
- `image-slot.js`: apenas o placeholder de foto do protótipo; não portar.
- `assets/site-scroll-final.jpg`: asset do mockup do card 1.
- `assets/budfin/*.jpg`: prints do budFin para o card 3 (também `login.jpg`, não usado no protótipo, disponível se quiser variar).
