import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import https from 'https'

function fetchLatestVersion(packageName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(data).version)
        } catch {
          reject(new Error('Could not read version from npm'))
        }
      })
    }).on('error', reject)
  })
}

export function updateCommand(currentVersion: string): Command {
  return new Command('update')
    .description('Check if a new version of NEXUS is available')
    .action(async () => {
      const spinner = ora('Checking latest version...').start()

      try {
        const latest = await fetchLatestVersion('nxlang')
        spinner.stop()

        if (latest === currentVersion) {
          console.log(chalk.green(`✓ You are on the latest version: v${currentVersion}`))
        } else {
          console.log(chalk.yellow(`\nNew version available: v${latest}`))
          console.log(chalk.gray(`  Current version: v${currentVersion}`))
          console.log(chalk.cyan(`\n  Update with: npm install -g nxlang\n`))
        }
      } catch {
        spinner.fail(chalk.red('Could not check version. Check your internet connection.'))
      }
    })
}
