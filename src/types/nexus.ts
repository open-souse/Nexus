/**
 * Estructura del DNA de un proyecto Nexus.
 * Define los estándares que la IA debe seguir al generar código.
 */
export interface NexusConfig {
  /** Nombre del proyecto */
  name?: string;
  /** Framework de frontend (ej: React, Next.js, Vue) */
  framework: string;
  /** Librería de estilos (ej: Tailwind, CSS Modules, Styled Components) */
  styling: string;
  /** Paleta de colores principal del proyecto */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  /** Reglas adicionales de diseño (ej: "Utilizar bordes redondeados de 12px") */
  designRules?: string[];
  /** Estándares de código (ej: "Usar TypeScript", "Clean Architecture") */
  codeStandards?: string[];
}
