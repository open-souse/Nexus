export interface NexusConfig {
  /** Idioma preferido para la comunicación */
  lang: 'es' | 'en';
  /** Módulos activos en el proyecto (ej: frontend, backend, medical) */
  modules: string[];
  /** Framework principal (ej: react-ts, next-js) */
  framework: string;
  /** Sistema de estilos (ej: tailwind, sass) */
  styling: string;
  /** Directorio de salida para el código generado */
  output: string;
  /** Design Tokens (DNA Visual) */
  tokens: {
    primary: string;
    secondary: string;
    danger: string;
    success: string;
    font: string;
    // Escalas de diseño para mayor precisión
    scales: {
      radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
      spacing: 'compact' | 'normal' | 'relaxed';
      shadows: 'none' | 'soft' | 'strong';
    }
  };
  /** Librería de iconos */
  icons: {
    library: string;
  };
  /** Reglas de arquitectura o estándares de código */
  standards?: string[];
}
