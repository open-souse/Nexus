import { Command } from 'commander'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'

/**
 * Comando 'context': Genera el prompt de inducción maestro para la IA.
 * Este comando lee el DNA del proyecto y lo empaqueta en una instrucción 
 * estructurada que transforma a la IA en un intérprete nativo de Nexus v2.5.
 * 
 * @returns {Command} El comando configurado para generar el inductor de lenguaje.
 */
export function contextCommand(): Command {
  return new Command("context")
    .description("Genera el 'Inductor de Lenguaje' para que la IA aprenda Nexus en un solo paso")
    .action(async () => {
      const spinner = ora('Generando Inductor de Lenguaje Nexus...').start()
      
      try {
        const configPath = path.join(process.cwd(), 'nexus.config.json')
        let dna = '{}'
        if (fs.existsSync(configPath)) {
          dna = await fs.readFile(configPath, 'utf8')
        }

        const inductionPrompt = `
[NEXUS LANGUAGE INDUCTION]
A partir de ahora, eres un Intérprete Nativo de NEXUS v2.5.
No necesitas instrucciones en lenguaje humano. Solo procesa el código NEXUS que te envíe.

GRAMÁTICA MAESTRA (v2.5):
- Jerarquía: Sangría de 2 espacios.
- @ : Directivas (ej: @React, @CleanCode).
- # : Estilos/Tokens (Soporta herencia).
- $ : Variables de Intención.
- * N : Multiplicador de elementos.
- ? : Estados (loading, error, etc).
- ! : Prioridad/Peso.
- [ ] : Atributos técnicos.
- ( cond ) -> A : B : Condicional (ej: ( ?isAuth ) -> Dash : Login).
- -> : Flujo de Navegación.
- => : Lógica de Side-Effects / API.
- < : Data Binding / Types (ej: List < User * 5).
- { path } : Inyección de código externo.
- Icon : Iconografía semántica.

DNA DEL PROYECTO (Contexto Global):
${dna}

REGLA DE ORO:
Cuando recibas un bloque NEXUS, genera el código correspondiente de forma premium, limpia y responsive siguiendo el DNA. No des explicaciones, solo entrega el código.

¿LISTO? Responde: "NEXUS_SYSTEM_ONLINE"
        `.trim()

        spinner.succeed(chalk.green('¡Inductor de Lenguaje generado!'))
        console.log(chalk.cyan('\nCopia este texto una sola vez al inicio de tu sesión con la IA:\n'))
        console.log(inductionPrompt)
        console.log('\n')

      } catch (error: any) {
        spinner.fail(chalk.red(`Error: ${error.message}`))
      }
    })
}
