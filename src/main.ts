/**
 * Movimento do site. Sem bibliotecas, um unico listener de scroll.
 *
 *  1. Revelacao de texto e entrada de blocos, via IntersectionObserver.
 *  2. Paralaxe leve nas duas camadas atmosfericas (hero e contato).
 *  3. Pilha de projetos: cada card sticky recua enquanto o proximo sobe.
 *
 * Com `prefers-reduced-motion: reduce` nada disso roda; o CSS ja entrega a
 * pagina inteira revelada e os cards em fluxo normal.
 */

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

/* Ano do rodape ---------------------------------------------------------- */
const ano = document.getElementById('ano')
if (ano) ano.textContent = String(new Date().getFullYear())

/* 1. Revelacao e entrada ------------------------------------------------- */
const animados = document.querySelectorAll<HTMLElement>('[data-reveal],[data-rise]')

const mostrar = (el: HTMLElement) => {
  const atraso = el.dataset.rise
  if (atraso !== undefined) el.style.transitionDelay = `${atraso}ms`
  el.classList.add('in')
}

if (reduced) {
  animados.forEach(mostrar)
} else {
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue
        mostrar(e.target as HTMLElement)
        io.unobserve(e.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )

  /*
   * O hero entra ao carregar, escalonado, e nao ao entrar na viewport: com o
   * H1 quebrando em quatro linhas o botao "Ver projetos" fica perto da dobra e
   * nunca alcanca o threshold de 0.12 do observer, ou seja, o CTA principal
   * ficaria invisivel ate alguem rolar.
   */
  const hero = document.getElementById('topo')
  const doHero: HTMLElement[] = []

  for (const el of animados) {
    if (hero?.contains(el)) doHero.push(el)
    else io.observe(el)
  }

  if (doHero.length > 0) {
    // Um reflow fixa o estado inicial para a transicao ter de onde sair.
    // requestAnimationFrame nao serve aqui: em aba em segundo plano ele nao
    // dispara, e o hero abriria invisivel.
    void document.body.offsetHeight
    doHero.forEach(mostrar)
  }
}

/* 2 e 3. Paralaxe e pilha ------------------------------------------------ */
const camadas = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
const pilha = Array.from(document.querySelectorAll<HTMLElement>('.stack-item'))

if (!reduced && (camadas.length > 0 || pilha.length > 0)) {
  // No mobile a pilha nao existe: o CSS poe os cards em fluxo normal e o JS
  // precisa parar de escrever transform/opacity neles.
  const mobile = matchMedia('(max-width: 640px)')

  /**
   * Card mais alto que a viewport: o `top` vira negativo para o card fixar
   * pelo rodape, mantendo o texto legivel ate o proximo subir por cima.
   */
  const posicionarPilha = () => {
    for (const w of pilha) {
      const card = w.firstElementChild as HTMLElement | null
      if (mobile.matches) {
        w.style.top = ''
        if (card) {
          card.style.transform = 'none'
          card.style.opacity = '1'
        }
        continue
      }
      w.style.top = `${Math.min(96, innerHeight - w.offsetHeight - 24)}px`
    }
  }

  const quadro = () => {
    raf = 0

    for (const camada of camadas) {
      const moldura = camada.parentElement
      if (!moldura) continue
      const r = moldura.getBoundingClientRect()
      const centro = r.top + r.height / 2 - innerHeight / 2
      camada.style.transform = `translate3d(0,${(centro * 0.14).toFixed(1)}px,0)`
    }

    if (mobile.matches) return

    for (let i = 0; i < pilha.length - 1; i++) {
      const atual = pilha[i]!
      const card = atual.firstElementChild as HTMLElement | null
      if (!card) continue
      const r = atual.getBoundingClientRect()
      const rProximo = pilha[i + 1]!.getBoundingClientRect()
      // p = 0 quando o proximo card ainda esta longe, 1 quando ja cobriu este.
      const p = Math.min(1, Math.max(0, 1 - (rProximo.top - r.top) / r.height))
      card.style.transform = `scale(${(1 - 0.07 * p).toFixed(4)}) translateY(${(-30 * p).toFixed(1)}px)`
      card.style.opacity = (1 - 0.6 * p).toFixed(3)
    }
  }

  let raf = 0
  const aoRolar = () => {
    if (!raf) raf = requestAnimationFrame(quadro)
  }

  posicionarPilha()
  quadro()

  addEventListener('scroll', aoRolar, { passive: true })
  addEventListener('resize', () => {
    posicionarPilha()
    aoRolar()
  })

  // A altura dos cards muda quando a fonte troca ou o texto reflui.
  const ro = new ResizeObserver(() => {
    posicionarPilha()
    aoRolar()
  })
  for (const w of pilha) ro.observe(w)
}
