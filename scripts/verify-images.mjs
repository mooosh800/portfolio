import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8')
const paths = [...source.matchAll(/"src": "(\/images\/[^"]+)"/g)].map((match) => match[1])
const unique = [...new Set(paths)]
const missing = unique.filter((path) => !existsSync(resolve(root, 'public', `.${path}`)))
console.log(JSON.stringify({ total: unique.length, missing }, null, 2))
process.exitCode = missing.length ? 1 : 0
