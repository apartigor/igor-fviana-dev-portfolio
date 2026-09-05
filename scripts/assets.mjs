/**
 * Gera os assets derivados: WebP dos mockups, recorte da foto e favicons.
 *
 * Roda sob demanda (`npm run assets`), nao a cada build: as saidas ficam
 * versionadas em public/ para que o deploy nao precise do sharp.
 *
 * Fonte da verdade das imagens: design-handoff/ (assets/ e logo/).
 */
import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const publico = join(raiz, 'public')
const origem = join(raiz, 'design-handoff/assets')
const logo = join(raiz, 'design-handoff/logo')
const fonte = join(raiz, 'assets-fonte')

/**
 * Prints do budFin. Ficam na largura original: com `object-fit: cover` num
 * quadro 4/3 a imagem e ampliada para ~775px CSS, ou seja ~1550px em tela 2x.
 * Reduzir a fonte abaixo de 1400px comecaria a borrar o print no desktop.
 */
const BUDFIN = ['inicio', 'dividas', 'nova-divida', 'ajustes']
const LARGURA_BUDFIN = null

const kb = (n) => `${(n / 1024).toFixed(1)} KB`

async function paraWebp(entrada, saida, largura) {
  const img = sharp(entrada)
  const { width, height } = await img.metadata()
  const { size } = await stat(entrada)
  const redimensiona = largura && width > largura
  const buf = await (redimensiona ? img.resize({ width: largura }) : img)
    .webp({ quality: 80, effort: 6 })
    .toBuffer()
  await writeFile(saida, buf)
  const alvo = redimensiona ? Math.round((height * largura) / width) : height
  const dim = `${redimensiona ? largura : width}x${alvo}`
  console.log(`  ${saida.replace(publico, 'public')}  ${dim}  ${kb(size)} -> ${kb(buf.length)}`)
}

console.log('Mockups em WebP:')
await paraWebp(
  join(origem, 'site-scroll-final.jpg'),
  join(publico, 'assets/site-scroll-final.webp'),
)
await mkdir(join(publico, 'assets/budfin'), { recursive: true })
for (const nome of BUDFIN) {
  await paraWebp(
    join(origem, `budfin/${nome}.jpg`),
    join(publico, `assets/budfin/${nome}.webp`),
    LARGURA_BUDFIN,
  )
}

/**
 * Foto do "Sobre". O original e quadrado (400x400) e o design pede 132x164,
 * entao o recorte usa a altura inteira e desloca em x para centralizar o rosto.
 * Sai em 2x (264x328) para nao borrar em tela retina.
 */
const FOTO = { largura: 132, altura: 164, deslocamentoX: 69, escala: 2 }

const foto = sharp(join(fonte, 'igor.jpg'))
const fotoMeta = await foto.metadata()
const recorteL = Math.round((fotoMeta.height * FOTO.largura) / FOTO.altura)
const fotoBuf = await foto
  .extract({
    left: FOTO.deslocamentoX,
    top: 0,
    width: recorteL,
    height: fotoMeta.height,
  })
  .resize(FOTO.largura * FOTO.escala, FOTO.altura * FOTO.escala)
  .webp({ quality: 88, effort: 6 })
  .toBuffer()
await writeFile(join(publico, 'assets/igor.webp'), fotoBuf)
const dimFoto = `${FOTO.largura * FOTO.escala}x${FOTO.altura * FOTO.escala}`
console.log(`\nFoto do Sobre:\n  public/assets/igor.webp  ${dimFoto}  ${kb(fotoBuf.length)}`)

/**
 * Favicons: sao o selo "iv" ja exportado pelo design, entao aqui e so copia.
 * favicon-32 para a aba, favicon-180 para o icone de toque do iOS.
 */
const ICONES = ['favicon-32.png', 'favicon-180.png']

console.log('\nIcones:')
for (const nome of ICONES) {
  await copyFile(join(logo, nome), join(publico, nome))
  console.log(`  public/${nome}  ${kb((await stat(join(publico, nome))).size)}`)
}
