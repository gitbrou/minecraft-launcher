// Кладёт официальный launcher Horizon в сборку, чтобы он работал сразу после установки,
// без скачивания при первом запуске. Хеш сверяется с SHA256SUMS из релиза на GitHub.
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import AdmZip from 'adm-zip'

const RELEASES_API = 'https://api.github.com/repos/horizon-rust/horizon/releases?per_page=20'

const platform = process.env.HORIZON_PLATFORM || process.platform
const arch = process.env.HORIZON_ARCH || process.arch
const force = process.argv.includes('--force')
const required = process.argv.includes('--required')

const osName = platform === 'win32' ? 'windows'
  : platform === 'darwin' ? 'macos'
  : null

const archName = arch === 'arm64' || arch === 'aarch64' ? 'arm64' : 'x64'
const assetName = `horizon-launcher-${osName}-${archName}.zip`
const exeName = platform === 'win32' ? 'horizon-launcher.exe' : 'horizon-launcher'
const outDir = path.join(process.cwd(), 'dist-horizon')
const outFile = path.join(outDir, exeName)

const headers = { 'User-Agent': 'mine-launcher-build' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function get(url) {
  const res = await fetch(url, { headers, redirect: 'follow' })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`)
  return res
}

const getText = async (url) => (await get(url)).text()
const getBuffer = async (url) => Buffer.from(await (await get(url)).arrayBuffer())
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex')

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  if (!osName) {
    console.log(`horizon: для ${platform} готовой сборки нет, ставлю из лаунчера`)
    return
  }
  if (!force && fs.existsSync(outFile)) {
    console.log(`horizon: ${path.relative(process.cwd(), outFile)} уже на месте`)
    return
  }

  const releases = JSON.parse(await getText(RELEASES_API))
  const release = releases.find((r) => Array.isArray(r.assets) && r.assets.some((a) => a.name === assetName))
  if (!release) throw new Error(`в релизах нет ${assetName}`)

  const asset = release.assets.find((a) => a.name === assetName)
  const sums = release.assets.find((a) => a.name === 'SHA256SUMS')
  if (!sums) throw new Error('в релизе нет SHA256SUMS')

  console.log(`horizon: беру ${assetName} из ${release.tag_name}`)
  const [archive, sumsText] = await Promise.all([getBuffer(asset.browser_download_url), getText(sums.browser_download_url)])

  const expected = sumsText
    .split(/\r?\n/)
    .map((line) => /^([a-f0-9]{64})\s+\*?(.+)$/i.exec(line.trim()))
    .find((m) => m && path.basename(m[2].replace(/^\.\//, '')) === assetName)
  if (!expected) throw new Error(`в SHA256SUMS нет ${assetName}`)

  const actual = sha256(archive)
  if (actual !== expected[1].toLowerCase()) {
    throw new Error(`хеш не совпал: ${actual.slice(0, 12)} != ${expected[1].slice(0, 12)}`)
  }

  fs.rmSync(outDir, { recursive: true, force: true })
  fs.mkdirSync(outDir, { recursive: true })

  for (const entry of new AdmZip(archive).getEntries()) {
    if (entry.isDirectory) continue
    const target = path.join(outDir, path.basename(entry.entryName))
    if (path.dirname(target) !== outDir) throw new Error(`плохой путь в архиве: ${entry.entryName}`)
    fs.writeFileSync(target, entry.getData())
  }

  if (!fs.existsSync(outFile)) throw new Error(`в архиве нет ${exeName}`)
  if (process.platform !== 'win32') fs.chmodSync(outFile, 0o755)

  const size = (fs.statSync(outFile).size / 1024 / 1024).toFixed(1)
  console.log(`horizon: готово, ${exeName} ${size} МБ, sha256 ${actual.slice(0, 12)}`)
}

try {
  await main()
} catch (err) {
  const message = err instanceof Error ? err.message : String(err)
  if (required) {
    console.error(`horizon: не удалось собрать встроенный launcher: ${message}`)
    process.exit(1)
  }
  console.warn(`horizon: пропускаю встроенный launcher (${message}). Он скачается из настроек лаунчера.`)
}
