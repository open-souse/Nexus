import { execSync } from 'child_process'

const major = parseInt(process.versions.node.split('.')[0], 10)
if (major < 20) {
  console.log(`[test] Skipping: vitest 4 requires Node >=20 (current: ${process.versions.node})`)
  process.exit(0)
}

execSync('vitest run', { stdio: 'inherit' })
