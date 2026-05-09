import { Command } from 'commander'
import fs from 'fs-extra'
import chalk from 'chalk'

const VALID_DIRECTIVE = /^@[A-Za-z]/
const VALID_TOKEN = /^#[a-zA-Z]/

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

    // Indentación: múltiplos de 2 espacios
    const leadingSpaces = line.length - line.trimStart().length
    if (leadingSpaces % 2 !== 0) {
      errors.push({
        line: lineNumber,
        message: `Indentación inválida (${leadingSpaces} espacios). Usa múltiplos de 2.`
      })
    }

    const trimmed = line.trim()

    // @ directivas: deben ser @[A-Za-z] (ej: @React, @modify)
    if (trimmed.startsWith('@')) {
      const directive = trimmed.split(/[\s[]/)[0]
      if (!VALID_DIRECTIVE.test(directive)) {
        errors.push({
          line: lineNumber,
          message: `Directiva inválida: "${directive}". Formato esperado: @NombreFramework`
        })
      }
    }

    // # tokens: deben ser #[a-zA-Z] (ej: #primary, #glass)
    const tokenMatches = trimmed.match(/#\S*/g) || []
    for (const token of tokenMatches) {
      if (!VALID_TOKEN.test(token)) {
        errors.push({
          line: lineNumber,
          message: `Token inválido: "${token}". Formato esperado: #nombre`
        })
      }
    }

    // -> sin destino
    if (/->$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"->" sin destino definido.' })
    }

    // => sin acción
    if (/=>$/.test(trimmed)) {
      errors.push({ line: lineNumber, message: '"=>" sin acción definida.' })
    }

    // $ variables: cuando la línea empieza con $, debe tener : y valor (ej: $brand: "Nexus")
    if (trimmed.startsWith('$') && !/^\$[a-zA-Z_]\w*\s*:/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Variable inválida: "${trimmed.split(/[\s:]/)[0]}". Formato esperado: $nombre: valor`
      })
    }

    // ~ estado local: cuando la línea empieza con ~, debe tener : (ej: ~isOpen: false)
    if (trimmed.startsWith('~') && !/^~[a-zA-Z_]\w*\s*:/.test(trimmed)) {
      errors.push({
        line: lineNumber,
        message: `Estado inválido: "${trimmed.split(/[\s:]/)[0]}". Formato esperado: ~nombre: valor`
      })
    }

    // * multiplicador: debe ir seguido de un entero positivo (ej: Card * 3)
    const multiplierMatch = trimmed.match(/(?:^|\s)\*\s*(\S*)/)
    if (multiplierMatch) {
      const num = multiplierMatch[1]
      if (!num) {
        errors.push({
          line: lineNumber,
          message: '"*" sin número. Formato esperado: * N (entero positivo)'
        })
      } else if (!/^\d+$/.test(num)) {
        errors.push({
          line: lineNumber,
          message: `Multiplicador inválido: "* ${num}". Formato esperado: * N (entero positivo)`
        })
      }
    }

    // < data binding: no puede estar solo al final de línea (ej: Table < User es válido; Table < no)
    if (/\s<$/.test(trimmed) || trimmed === '<') {
      errors.push({
        line: lineNumber,
        message: '"<" sin tipo definido. Formato esperado: < NombreTipo'
      })
    }

    // { } inyección de contexto: las llaves deben estar balanceadas por línea
    const openBraces = (trimmed.match(/\{/g) || []).length
    const closeBraces = (trimmed.match(/\}/g) || []).length
    if (openBraces !== closeBraces) {
      errors.push({
        line: lineNumber,
        message: `Llaves sin cerrar. Cada "{" debe cerrarse con "}".`
      })
    }

    // [ ] atributos: los corchetes deben estar balanceados por línea
    const openBrackets = (trimmed.match(/\[/g) || []).length
    const closeBrackets = (trimmed.match(/\]/g) || []).length
    if (openBrackets !== closeBrackets) {
      errors.push({
        line: lineNumber,
        message: `Corchetes sin cerrar. Cada "[" debe cerrarse con "]".`
      })
    }
  })

  return errors
}

export function validateCommand(): Command {
  return new Command('validate')
    .description('Valida la sintaxis de un archivo .nexus')
    .argument('<file>', 'Archivo .nexus a validar')
    .action((file: string) => {
      if (!fs.existsSync(file)) {
        console.log(chalk.red(`Archivo no encontrado: ${file}`))
        process.exit(1)
      }

      if (!file.endsWith('.nexus')) {
        console.log(chalk.yellow('Advertencia: el archivo no tiene extensión .nexus'))
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
