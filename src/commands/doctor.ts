import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import type { NexusConfig, NexusTokens } from '../types/nexus.js'

const REQUIRED_TOKENS = ['primary', 'secondary', 'danger'] as const satisfies ReadonlyArray<keyof NexusTokens>
const VALID_FRAMEWORKS = ['react-ts', 'react-js', 'vue-ts', 'vue-js', 'svelte', 'next-ts', 'next-js']
const VALID_STYLING = ['tailwind', 'css-modules', 'styled-components', 'sass', 'none']

function pass(msg: string) {
  console.log(chalk.green('  ✓ ') + msg)
}

function fail(msg: string) {
  console.log(chalk.red('  ✗ ') + msg)
}

function warn(msg: string) {
  console.log(chalk.yellow('  ! ') + msg)
}

export function doctorCommand(): Command {
  return new Command('doctor')
    .description('Verifica que la configuración de NEXUS esté correcta')
    .action(() => {
      console.log(chalk.cyan('\nDiagnóstico de NEXUS\n'))

      let errors = 0
      const configPath = path.join(process.cwd(), 'nexus.config.json')

      // 1. Verificar que existe nexus.config.json
      if (!fs.existsSync(configPath)) {
        fail('nexus.config.json no encontrado — ejecuta nexus init')
        console.log(chalk.red('\n  1 error crítico. Ejecuta nexus init para comenzar.\n'))
        process.exit(1)
      }
      pass('nexus.config.json encontrado')

      // 2. Verificar que es JSON válido
      let config: NexusConfig
      try {
        config = fs.readJsonSync(configPath) as NexusConfig
        pass('nexus.config.json es JSON válido')
      } catch {
        fail('nexus.config.json tiene errores de sintaxis JSON')
        process.exit(1)
      }

      // 3. Verificar framework
      if (!config.framework) {
        fail('framework no definido')
        errors++
      } else if (!VALID_FRAMEWORKS.includes(config.framework)) {
        warn(`framework "${config.framework}" no es estándar — valores válidos: ${VALID_FRAMEWORKS.join(', ')}`)
      } else {
        pass(`framework: ${config.framework}`)
      }

      // 4. Verificar styling
      if (!config.styling) {
        warn('styling no definido — se recomienda especificarlo')
      } else if (!VALID_STYLING.includes(config.styling)) {
        warn(`styling "${config.styling}" no reconocido`)
      } else {
        pass(`styling: ${config.styling}`)
      }

      // 5. Verificar tokens
      if (!config.tokens) {
        fail('tokens no definidos')
        errors++
      } else {
        for (const token of REQUIRED_TOKENS) {
          if (!config.tokens[token]) {
            fail(`tokens.${token} no definido`)
            errors++
          } else {
            pass(`tokens.${token}: ${config.tokens[token]}`)
          }
        }
        
        // Verificar escalas nuevas
        if (!config.tokens.scales) {
          warn('escalas de diseño (scales) no definidas — se recomienda para mejor precisión')
        } else {
          pass('escalas de diseño (radius, spacing, shadows) configuradas')
        }
      }

      // 6. Verificar output
      if (!config.output) {
        warn('output no definido — se usará ./src/components por defecto')
      } else {
        pass(`output: ${config.output}`)
      }

      // 7. Verify lang
      if (!config.lang) {
        warn('lang not defined — defaulting to "en"')
      } else {
        pass(`lang: ${config.lang}`)
      }

      // Resultado final
      console.log()
      if (errors === 0) {
        console.log(chalk.green('  Todo está en orden. Ejecuta nexus context para inducir tu IA.\n'))
      } else {
        console.log(chalk.red(`  ${errors} error(es) encontrado(s). Edita nexus.config.json para corregirlos.\n`))
        process.exit(1)
      }
    })
}
