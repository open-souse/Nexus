import fs from 'fs-extra';
import { execSync } from 'child_process';

try {
  console.log('Building TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  console.log('Copying templates to dist...');
  fs.copySync('src/templates', 'dist/templates');
  
  console.log('Build complete successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
