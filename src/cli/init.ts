import { Command } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { buildPrompt, buildDefaultGrammarReference } from '../context/builder.js'

export function buildAIComplement(lang: 'es' | 'en' = 'es'): string {
  if (lang === 'en') {
    return `# NEXUS Protocol — Assistant Instructions

## Role

The assistant is a software architect that uses the NEXUS protocol
to communicate precisely with the developer. It is not a natural language
instruction executor — it is an architect that understands structured
intentions and converts them into production code.

## Required workflow

When the developer writes a NEXUS blueprint, the assistant must:

1. Read the complete blueprint
2. Identify the declared stack (@React, @NestJS, etc.)
3. Process preconditions (!!) before any action
4. Generate the exact code that the blueprint describes
5. If there is @install, include the dependency installation in the output
6. Do not improvise — only build what the blueprint declares

## Rules

ALWAYS:
- Generate code that exactly matches the blueprint
- Respect !! preconditions as executable guards
- Handle declared errors with !error:code
- Use the stack declared with @ — do not suggest alternatives
- If the blueprint is ambiguous, ask before generating

NEVER:
- Generate code without a NEXUS blueprint as the base
- Ignore !! preconditions
- Change the declared stack out of personal preference
- Add dependencies not declared in the blueprint
- Modify parts of the code not included in the blueprint

## The protocol is the source of truth

The NEXUS blueprint is the contract between the developer and the assistant.
What is in the blueprint gets built. What is not in it, does not get touched.

---

## Syntax Reference

${buildDefaultGrammarReference()}

---
*NEXUS Protocol v4.3.0 — nexuslang.dev*`
  }

  return `# NEXUS Protocol — Instrucciones para el Asistente

## Rol

El asistente es un arquitecto de software que usa el protocolo NEXUS
para comunicarse con precisión con el developer. No es un ejecutor de
instrucciones en lenguaje natural — es un arquitecto que entiende
intenciones estructuradas y las convierte en código de producción.

## Flujo obligatorio

Cuando el developer escriba un blueprint NEXUS, el asistente debe:

1. Leer el blueprint completo
2. Identificar el stack declarado (@React, @NestJS, etc.)
3. Procesar las precondiciones (!!) antes de cualquier acción
4. Generar el código exacto que describe el blueprint
5. Si hay @install, incluir la instalación de esa dependencia en el output
6. No improvisar — solo construir lo que el blueprint declara

## Reglas

SIEMPRE:
- Generar código que corresponda exactamente al blueprint
- Respetar las precondiciones !! como guards ejecutables
- Manejar los errores declarados con !error:código
- Usar el stack declarado con @ — no sugerir alternativas
- Si el blueprint es ambiguo, preguntar antes de generar

NUNCA:
- Generar código sin un blueprint NEXUS como base
- Ignorar las precondiciones !!
- Cambiar el stack declarado por preferencia propia
- Agregar dependencias no declaradas en el blueprint
- Modificar partes del código no incluidas en el blueprint

## El protocolo es la fuente de verdad

El blueprint NEXUS es el contrato entre el developer y el asistente.
Lo que está en el blueprint se construye. Lo que no está, no se toca.

---

## Referencia de sintaxis

${buildDefaultGrammarReference()}

---
*NEXUS Protocol v4.3.0 — nexuslang.dev*`
}

export function generateNexusMd(lang: 'es' | 'en' = 'es'): string {
  return buildPrompt({ modules: ['frontend', 'backend', 'testing'], lang })
}

function generateAIComplement(aiTool: string, aiName: string, cwd: string, lang: 'es' | 'en' = 'es'): void {
  const content = buildAIComplement(lang)

  switch (aiTool) {
    case 'claude-code': {
      const claudeDir = path.join(cwd, '.claude', 'skills', 'nexus')
      fs.mkdirSync(claudeDir, { recursive: true })
      fs.writeFileSync(path.join(claudeDir, 'SKILL.md'), content, 'utf-8')
      console.log(chalk.green('✓ .claude/skills/nexus/SKILL.md generado — skill para Claude Code'))
      break
    }
    case 'cursor':
      fs.writeFileSync(path.join(cwd, '.cursorrules'), content, 'utf-8')
      console.log(chalk.green('✓ .cursorrules generado — reglas para Cursor'))
      break
    case 'chatgpt':
      fs.writeFileSync(path.join(cwd, 'custom-instructions.md'), content, 'utf-8')
      console.log(chalk.green('✓ custom-instructions.md generado — instrucciones para ChatGPT'))
      console.log(chalk.dim('  Copia el contenido en Settings → Custom Instructions de ChatGPT'))
      break
    case 'gemini':
      fs.writeFileSync(path.join(cwd, 'gemini-context.md'), content, 'utf-8')
      console.log(chalk.green('✓ gemini-context.md generado — contexto para Gemini'))
      console.log(chalk.dim('  Adjunta este archivo al inicio de tu sesión en Gemini'))
      break
    default:
      fs.writeFileSync(path.join(cwd, 'AI-INSTRUCTIONS.md'), content, 'utf-8')
      console.log(chalk.green(`✓ AI-INSTRUCTIONS.md generado — instrucciones para ${aiName}`))
      console.log(chalk.dim('  Adjunta este archivo al inicio de tu sesión de IA'))
      break
  }
}

export const initCommand = new Command('init')
  .description('Configure NEXUS for your project and your AI tool')
  .action(async () => {
    console.log(chalk.cyan('\n⬡ NEXUS Protocol — Setup\n'))

    const nexusMdExists = fs.existsSync(path.join(process.cwd(), 'NEXUS.md'))

    if (nexusMdExists) {
      const { update } = await inquirer.prompt([{
        type: 'confirm',
        name: 'update',
        message: 'Ya tienes NEXUS configurado. ¿Deseas actualizar la configuración?',
        default: false
      }])
      if (!update) {
        console.log(chalk.yellow('Configuración sin cambios.'))
        process.exit(0)
      }
    }

    const { lang } = await inquirer.prompt([{
      type: 'list',
      name: 'lang',
      message: 'Language / Idioma:',
      choices: [
        { name: 'Español', value: 'es' },
        { name: 'English', value: 'en' }
      ]
    }])

    const { aiTool } = await inquirer.prompt([{
      type: 'list',
      name: 'aiTool',
      message: lang === 'en' ? 'Which AI do you use for coding?' : '¿Qué IA usas para programar?',
      choices: [
        { name: 'Claude Code', value: 'claude-code' },
        { name: 'Cursor', value: 'cursor' },
        { name: 'ChatGPT / Codex', value: 'chatgpt' },
        { name: 'Gemini', value: 'gemini' },
        { name: lang === 'en' ? 'Other' : 'Otra', value: 'other' }
      ]
    }])

    let aiName = aiTool
    if (aiTool === 'other') {
      const { customName } = await inquirer.prompt([{
        type: 'input',
        name: 'customName',
        message: lang === 'en' ? 'What is your AI called?' : '¿Cómo se llama tu IA?',
        default: lang === 'en' ? 'My AI' : 'Mi IA'
      }])
      aiName = customName
    }

    const nexusMdContent = generateNexusMd(lang)
    fs.writeFileSync(
      path.join(process.cwd(), 'NEXUS.md'),
      nexusMdContent,
      'utf-8'
    )
    console.log(chalk.green('✓ NEXUS.md generado — gramática completa del protocolo'))

    generateAIComplement(aiTool, aiName, process.cwd(), lang)

    if (lang === 'en') {
      console.log(chalk.cyan('\n⬡ NEXUS ready. Your AI now understands the protocol.\n'))
      console.log(chalk.white('Next step: write your first .nexus blueprint'))
      console.log(chalk.dim('  Example: @React @Tailwind\n  Page Dashboard\n    Section Hero #glass\n'))
    } else {
      console.log(chalk.cyan('\n⬡ NEXUS listo. Tu IA ahora entiende el protocolo.\n'))
      console.log(chalk.white('Próximo paso: escribe tu primer blueprint .nexus'))
      console.log(chalk.dim('  Ejemplo: @React @Tailwind\n  Page Dashboard\n    Section Hero #glass\n'))
    }
  })
