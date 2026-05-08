import { execSync } from 'child_process';

try {
  console.log('Building TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });
  console.log('Build complete successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
