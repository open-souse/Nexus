import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'

const VALID_OPERATORS = ['@', '#', '$', '*', '?', '!', '->', '=>', '<', '{', '}', '(', ')']
const VALID_DIRECTIVES = /^@[A-Za-z]/
const VALID_TOKEN = /^#[a-zA-Z]/
const VALID_INDENT = /^( {2})*\S/

interface ValidationError {
  line: number
  message: string
}

function validateNexus(content: string): ValidationError[] {
  const errors: ValidationError[] = []
  const lines = content.split('\n')

  lines.forEach((raw, index) => {
    const lineNumber = index + 1
    const line = raw.trimEnd()

    if (line.trim() === '' || line.trim().startsWith('//')) return

    // Verificar indentación con múltiplos de 2 espacios
    const leadingSpaces = line.length - line.trimStart().length
    if (leadingSpaces % 2 !== 0) {
      errors.push({
        line: lineNumber,
        message: `Indentación inválida (${leadingSpaces} espacios). Usa múltiplos de 2.`
      })
    }

    const trimmed = line.trim()

    // Verificar orquestadores válidos
    const orchestrators = ['Page', 'Layout', 'Section', 'Protocol', 'Endpoint', 'Type', 'Form', 'Grid', 'Table', 'Card']
    const firstWord = trimmed.split(' ')[0]
    
    // Si empieza por una palabra que parece un componente, verificar si es conocida o directiva
    if (/^[A-Z]/.test(firstWord) && !orchestrators.includes(firstWord)) {
      // Es un componente personalizado, se permite pero lanzamos advertencia si es muy extraño
    }

    // Verificar directivas @ bien formadas
    if (trimmed.startsWith('@') && !VALID_DIRECTIVES.test(trimmed.split(' ')[0])) {
      errors.push({
        line: lineNumber,
        message: `Directiva inválida: "${trimmed.split(' ')[0]}". Formato esperado: @NombreFramework`
      })
    }

    // Verificar tokens # bien formados
    const tokens = trimmed.match(/#\S*/g) || []
    for (const token of tokens) {
      if (!VALID_TOKEN.test(token)) {
        errors.push({
          line: lineNumber,
          message: `Token inválido: "${token}". Formato esperado: #nombre`
        })
      }
    }

    // Verificar que -> y => no estén solos sin destino
    if (/->$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"->" sin destino definido.' })
    }
    if (/=>$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"=>" sin acción definida.' })
    }
  })

  return errors
}

export function validateCommand(): Command {
  return new Command("validate")
    .description("Valida la sintaxis de un archivo .nexus")
    .argument("<file>", "Archivo .nexus a validar")
    .action((file: string) => {
      if (!fs.existsSync(file)) {
        console.log(chalk.red(`Archivo no encontrado: ${file}`))
        process.exit(1)
      }

      if (!file.endsWith('.nexus')) {
        console.log(chalk.yellow(`Advertencia: el archivo no tiene extensión .nexus`))
      }

      const content = fs.readFileSync(file, 'utf8')
      const errors = validateNexus(content)

      if (errors.length === 0) {
        console.log(chalk.green(`✓ ${file} — sintaxis válida`))
      } else {
        console.log(chalk.red(`✗ ${file} — ${errors.length} error(es) encontrado(s):\n`))
        for (const error of errors) {
          console.log(chalk.red(`  Línea ${error.line}: `) + error.message)
        }
        process.exit(1)
      }
    })
}
