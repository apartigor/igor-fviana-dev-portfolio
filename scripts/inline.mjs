/**
 * Passo final do build: inlina o CSS e o JS dentro do dist/index.html.
 *
 * O site tem uma pagina so e o bundle e minusculo, entao um arquivo unico bate
 * duas requisicoes em cache separado: some o CSS render-blocking e some o
 * round-trip do modulo. Sobram no critical path apenas o HTML e a fonte, que
 * ja vai com preload.
 */
import { readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')
const indexHtml = join(dist, 'index.html')

const kb = (n) => `${(n / 1024).toFixed(1)} KB`

let html = await readFile(indexHtml, 'utf8')
const antes = Buffer.byteLength(html)
const consumidos = []

/* CSS -> <style> */
html = await substituirAsync(html, /<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g, async (_, href) => {
  const css = await ler(href)
  if (css === null) return _
  consumidos.push(href)
  return `<style>${css}</style>`
})

/* JS -> <script type="module"> */
html = await substituirAsync(html, /<script([^>]*)\ssrc="([^"]+)"([^>]*)><\/script>/g, async (_, a, src, b) => {
  const js = await ler(src)
  if (js === null) return _
  consumidos.push(src)
  const attrs = `${a}${b}`.replace(/\scrossorigin/g, '').trim()
  // `</script` nunca aparece em JS valido fora de string, entao escapar e seguro.
  return `<script${attrs ? ` ${attrs}` : ''}>${js.replace(/<\/script/gi, '<\\/script')}</script>`
})

/* modulepreload de um bundle ja inlinado so custa uma requisicao a toa. */
html = html.replace(/<link[^>]+rel="modulepreload"[^>]*>\s*/g, '')

await writeFile(indexHtml, html)

for (const href of consumidos) {
  await rm(join(dist, href.replace(/^\//, '')), { force: true })
}
await limparVazios(join(dist, 'assets'))

console.log(`\ninline: ${consumidos.length} arquivo(s) embutido(s)`)
console.log(`  dist/index.html  ${kb(antes)} -> ${kb(Buffer.byteLength(html))}`)
for (const f of await listar(dist)) console.log(`  ${f.nome}  ${kb(f.bytes)}`)

/* ---------- utilitarios ---------- */

async function ler(href) {
  if (/^https?:|^\/\//.test(href)) return null
  try {
    return (await readFile(join(dist, href.replace(/^\//, '')), 'utf8')).trim()
  } catch {
    return null
  }
}

async function substituirAsync(texto, regex, fn) {
  const pendentes = []
  texto.replace(regex, (...args) => {
    pendentes.push(fn(...args))
    return ''
  })
  const prontos = await Promise.all(pendentes)
  let i = 0
  return texto.replace(regex, () => prontos[i++])
}

async function limparVazios(dir) {
  try {
    if ((await readdir(dir)).length === 0) await rm(dir, { recursive: true, force: true })
  } catch {
    /* pasta nao existe */
  }
}

async function listar(dir, prefixo = 'dist') {
  const saida = []
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const caminho = join(dir, entrada.name)
    const nome = `${prefixo}/${entrada.name}`
    if (entrada.isDirectory()) saida.push(...(await listar(caminho, nome)))
    else saida.push({ nome, bytes: (await stat(caminho)).size })
  }
  return saida.sort((a, b) => b.bytes - a.bytes)
}
