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

  // Contadores de estado global para llaves y corchetes
  // (soportan bloques multi-línea como Type User { ... })
  let braceDepth = 0
  let bracketDepth = 0
  let braceOpenLine = 0
  let bracketOpenLine = 0

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

    // [animate: ...] — el valor no puede estar vacío
    const animateMatch = trimmed.match(/\[animate:\s*([^\],]*)\]/)
    if (animateMatch && !animateMatch[1].trim()) {
      errors.push({
        line: lineNumber,
        message: '"[animate:]" sin valor. Ejemplo: [animate: fade-in, duration: 200ms]'
      })
    }

    // [a11y: ...] — el valor no puede estar vacío
    const a11yMatch = trimmed.match(/\[a11y:\s*([^\]]*)\]/)
    if (a11yMatch && !a11yMatch[1].trim()) {
      errors.push({
        line: lineNumber,
        message: '"[a11y:]" sin atributos. Ejemplo: [a11y: aria-label="Cerrar"]'
      })
    }

    // { } — balance acumulado a través de todo el archivo
    // Soporta bloques multi-línea: Type User { \n ... \n }
    for (const ch of trimmed) {
      if (ch === '{') {
        if (braceDepth === 0) braceOpenLine = lineNumber
        braceDepth++
      } else if (ch === '}') {
        braceDepth--
        if (braceDepth < 0) {
          errors.push({ line: lineNumber, message: '"}" sin "{" correspondiente.' })
          braceDepth = 0
        }
      }
    }

    // [ ] — balance acumulado a través de todo el archivo
    for (const ch of trimmed) {
      if (ch === '[') {
        if (bracketDepth === 0) bracketOpenLine = lineNumber
        bracketDepth++
      } else if (ch === ']') {
        bracketDepth--
        if (bracketDepth < 0) {
          errors.push({ line: lineNumber, message: '"]" sin "[" correspondiente.' })
          bracketDepth = 0
        }
      }
    }
  })

  // Verificar que al final del archivo los balances sean cero
  if (braceDepth > 0) {
    errors.push({ line: braceOpenLine, message: `"{" sin cerrar (${braceDepth} sin cerrar al final del archivo).` })
  }
  if (bracketDepth > 0) {
    errors.push({ line: bracketOpenLine, message: `"[" sin cerrar (${bracketDepth} sin cerrar al final del archivo).` })
  }

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
