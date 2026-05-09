import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Los tests de integración comparten nexus.config.json en el CWD,
    // así que ejecutamos los archivos secuencialmente para evitar condiciones de carrera.
    fileParallelism: false,
  },
})
