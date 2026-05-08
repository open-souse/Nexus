# Contribuir a NEXUS: Human-AI Language Protocol

¡Gracias por querer formar parte del estándar de comunicación Humano-IA! Nexus es un proyecto impulsado por la comunidad y tu ayuda es vital para que se convierta en el lenguaje universal de la era de la IA.

## 🌟 Cómo puedes ayudar

### 1. Mejorar la Gramática
Si encuentras ambigüedades en la gramática actual (v2.5) o sientes que falta un operador para describir una intención compleja, abre un **Issue** para discutir la propuesta.

### 2. Crear Inductores de Lenguaje
Cada IA (Claude, GPT-4, Gemini) puede interpretar Nexus de forma ligeramente distinta. Necesitamos "Inductores" optimizados para cada modelo.

### 3. Reportar Bugs en el CLI
Aunque el CLI es minimalista, debe ser robusto. Si `nexus context` o `nexus init` fallan, por favor repórtalo.

## 🛠️ Configuración de Desarrollo Local

1.  Clona el repositorio: `git clone https://github.com/edwinreal/Nexus-.git`
2.  Instala las dependencias: `npm install`
3.  Corre los tests para asegurar estabilidad: `npm test`
4.  Crea una rama para tu mejora: `git checkout -b feature/mejora-increible`

## 📜 Reglas de Oro para Contribuciones
- **Mantenlo Minimalista**: No añadidas funciones que vuelvan tediosa la comunicación. Nexus debe ser rápido y directo.
- **Sigue el Estándar**: Cualquier cambio en el CLI debe respetar la gramática definida en `NEXUS-Grammar.md`.
- **Tests Primero**: Si añades una funcionalidad al CLI, debe venir acompañada de su test en Vitest.

---
Nexus es el puente. Ayúdanos a hacerlo indestructible. 🚀🤖
