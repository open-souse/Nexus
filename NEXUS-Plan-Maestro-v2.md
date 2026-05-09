# NEXUS: The Intention Language
## Plan Maestro v2.0 — Visión Actualizada

`npm install -g nexus-lang`

**Open Source • MIT License • Ventures SAS • 2026**

NEXUS no genera código por ti. Hace que tu IA favorita te entienda mejor.
Escribe intenciones estructuradas en NEXUS → Claude Code, Copilot, Codex, Cursor te responden con precisión desde la primera vez.
Prompts más cortos. Respuestas más precisas. Menos iteraciones.

---

## 1. Visión Real del# NEXUS: El Lenguaje de Intención Humano-IA

## 🎯 Visión 2026
NEXUS no es un generador de código automático. Es un **Lenguaje de Programación de Intenciones** diseñado para que los desarrolladores se comuniquen con las IAs de forma fluida, exacta y eficiente. 

### Pilares Fundamentales:
1. **Comunicación Face-to-Face:** Eliminar la fricción entre el pensamiento del programador y la ejecución de la IA.
2. **Gramática de Intención:** Un lenguaje comprimido y simbólico que la IA entiende nativamente.
3. **ADN de Proyecto:** Centralización de estilos y reglas en un "DNA" compartido (`nexus.config.json`).
4. **Eficiencia de Tokens:** Máxima precisión con el mínimo de palabras.

## 🛠️ Roadmap de Evolución
- **Fase 1-4:** Construcción del CLI y Estructura Base (COMPLETADO).
- **Fase 5:** Creación de la Gramática Maestra v1.0 y Templates Semánticos (COMPLETADO).
- **Fase 6:** Implementación de Layouts de Página Completa y Orquestación de Intenciones.
- **Fase 7:** Integración con flujos de IA (Context Injection).
gramación son poderosas pero tienen un problema fundamental: interpretan el lenguaje natural de formas diferentes cada vez. El mismo prompt puede generar 3 respuestas distintas en 3 intentos diferentes.

| Sin NEXUS | Con NEXUS |
| :--- | :--- |
| Prompt de 60 palabras para un formulario | 6 líneas en NEXUS — mismo resultado |
| La IA interpreta → puede ir en varias direcciones | La IA lee estructura fija → siempre la misma dirección |
| 3-5 iteraciones para llegar al resultado | Primera respuesta correcta |
| Difícil de versionar en Git | Archivo `.nexus` versionable como cualquier código |
| Inconsistente entre sesiones | Mismo `.nexus` = mismo resultado siempre |

### 1.2 La analogía que lo explica todo
Es la diferencia entre instrucciones verbales y un plano arquitectónico.
- **Instrucciones verbales**: "quiero una casa con sala grande, cocina moderna, 3 habitaciones, 2 baños, garaje para 2 carros, jardín..."
- **Plano arquitectónico**: especificaciones exactas, medidas, materiales, sin ambigüedad.

NEXUS es el plano arquitectónico para comunicarte con las IAs de programación.

### 1.3 Compatibilidad con IAs
NEXUS no reemplaza tu IA favorita. La mejora. Es compatible con cualquier herramienta de IA de programación:
- Claude Code (Anthropic)
- GitHub Copilot (Microsoft)
- OpenAI Codex
- Cursor
- Codeium
- Amazon CodeWhisperer
- Cualquier LLM que uses para programar

### 1.4 Lo que NO es NEXUS
Decisiones cerradas — no se debaten:
- NEXUS **NO** genera código automáticamente como función principal
- NEXUS **NO** requiere API key de ninguna IA para funcionar
- NEXUS **NO** reemplaza React, TypeScript ni Tailwind
- NEXUS **NO** tendrá más de 2 idiomas: inglés (v1.0) y español (v1.1)
- NEXUS **NO** es un editor visual ni una interfaz gráfica

---

## 2. Potencial y Mercado

### 2.1 Por qué ahora es el momento correcto
- La IA en desarrollo de software es el tema más caliente de 2025-2026.
- Millones de desarrolladores usan IAs de programación diariamente.
- Ninguna herramienta resuelve el problema de comunicación estructurada con IAs.
- El open source tiene tracción máxima cuando llena un vacío real.
- NEXUS llega antes de que las grandes empresas estandaricen esto.

### 2.2 Campos de aplicación — v1.0
| Campo | Cómo usa NEXUS | Potencial |
| :--- | :--- | :--- |
| Desarrollo web | Describir componentes React con precisión | Alto — mercado masivo |
| Educación tech | Estudiantes describen UI antes de ver el código | Muy alto — bootcamps y universidades |
| Agencias digitales | Landing pages en minutos con IA | Alto — miles de agencias en LATAM |
| Startups early-stage| Equipos pequeños se mueven más rápido | Alto — necesidad real |
| Freelancers | Entregar más rápido con la misma calidad | Medio-alto |
| Empresas SaaS | Juniors crean componentes de calidad senior | Alto |

### 2.3 Visión futura — más allá del código
NEXUS iniciamos solo con código. El futuro es más amplio.
Lo que hoy hace NEXUS con código, mañana puede hacerlo con cualquier IA:
- **Generación de imágenes** — describir assets visuales con precisión
- **Generación de video** — describir escenas para IAs de video
- **Análisis de datos** — describir queries y visualizaciones

NEXUS podría convertirse en el **SQL de las IAs** — el lenguaje estándar para comunicarse con cualquier modelo de IA.
*(Por ahora: solo código. Esto se revisa cuando v1.0 esté lanzado.)*

### 2.4 Riesgos reales
| Riesgo | Probabilidad | Mitigación |
| :--- | :--- | :--- |
| OpenAI o Google lanzan su propio estándar | Media | Mover rápido, comunidad primero, open source |
| Adopción lenta por conservadurismo de devs | Alta | README impecable, ejemplos obvios, valor inmediato |
| Las IAs mejoran tanto que no necesitan estructura | Baja | NEXUS sigue siendo útil para brevedad y versionado |
| Poco tiempo de Edwin para mantenerlo | Media | Comunidad activa + CONTRIBUTING.md desde día 1 |

---

## 3. Stack Tecnológico

| Componente | Tecnología | Razón |
| :--- | :--- | :--- |
| CLI | TypeScript + Node.js 18+ | npm es el canal de distribución natural |
| Parser | TypeScript puro | Sin compilador formal en MVP — simplicidad primero |
| Extensión VS Code| TypeScript | Único lenguaje soportado por VS Code API |
| Distribución | npm — `nexus-lang` | `npx nexus` o `npm install -g nexus-lang` |
| Testing | Vitest | Compatible con el ecosistema moderno |
| CI/CD | GitHub Actions | Automático en cada PR y push a main |
| Licencia | MIT | Máxima adopción, sin restricciones comerciales |
| Idiomas | Inglés (v1.0) + Español (v1.1) | Solo estos 2, decisión cerrada |

### 3.1 Sin dependencias de IAs externas
NEXUS funciona sin API key de ninguna IA. A diferencia de la versión anterior del plan, NEXUS no llama a GPT-4o. El usuario instala NEXUS con npm y lo usa con su IA favorita. Cero lock-in. Cero costo de API. Cero dependencia externa.
El valor de NEXUS está en su sintaxis y su especificación, no en llamadas a APIs de terceros.

---

## 4. Sintaxis Completa del Lenguaje

### 4.1 Reglas fundamentales
- Indentación de 2 espacios define la jerarquía padre-hijo
- Sin llaves `{}`, sin punto y coma, sin paréntesis
- Strings entre comillas dobles
- Comentarios con `//`
- Máximo 30 líneas por UI completa
- Cada archivo `.nexus` describe UN componente o UNA interfaz

### 4.2 Palabras clave — Inglés v1.0 / Español v1.1
| Inglés (v1.0) | Español (v1.1) | Descripción | Output React |
| :--- | :--- | :--- | :--- |
| `Interface` | `Interfaz` | Pantalla o vista completa | Archivo con múltiples componentes |
| `Component` | `Componente` | Bloque reutilizable | `export default function` |
| `Container` | `Contenedor` | Wrapper de layout | `div` con clases Tailwind |
| `Button` | `Boton` | Elemento interactivo | `button` con variantes y handler |
| `Form / field` | `Formulario / campo` | Formulario tipado | `form` con `useState` controlled |
| `List` | `Lista` | Lista de items | `ul` con `.map()` y `key` |
| `Navigate` | `Navegar` | Barra de navegación | `nav` con React Router `Link` |
| `Text` | `Texto` | Elemento de texto | `h1`/`h2`/`p` según variante |
| `Event` | `Evento` | Manejador de eventos | `const handler = () => {}` |
| `Style` | `Estilo` | Modificadores visuales | clases Tailwind aplicadas |

### 4.3 Ejemplos de sintaxis

```nexus
// Button — 4 lineas
Button "Get started"
  variant primary
  size large
  Event click -> handleStart()

// Form — 7 lineas
Form "contact"
  field name    type:text     required
  field email   type:email    required
  field message type:textarea
  Button "Send" variant:primary
  Event submit -> handleContact()

// Navigate — 5 lineas
Navigate
  logo "MyApp" -> /
  link "Home"    -> /
  link "Pricing" -> /pricing
  Button "Start free" variant:primary -> /signup

// Landing page completa — 24 lineas
Interface LandingPage
  Navigate
    logo "StartupXYZ" -> /
    link "Product"  -> #product
    Button "Start free" variant:primary -> /signup

  Component Hero
    Container
      Style bg:gradient-blue, align:center
      Text heading "Build faster with AI"
      Button "Try for free" variant:primary size:large
        Event click -> handleStartTrial()

  Component Contact
    Form "contact"
      field name    type:text     required
      field email   type:email    required
      Button "Send message" variant:primary
      Event submit -> handleContact()
```

---

## 5. CLI — nexus-lang

```bash
# Instalar
npm install -g nexus-lang

# Inicializar en tu proyecto
nexus init

# Anadir template predefinido
nexus add navbar
nexus add form --variant contact
nexus add button --variant danger

# Ver todos los templates disponibles
nexus list

# Configurar idioma
nexus config set lang es
nexus config set lang en

# Ver configuracion actual
nexus config show
```

### 5.1 Comandos completos
| Comando | Descripción | Output |
| :--- | :--- | :--- |
| `nexus init` | Crea nexus.config.json en el proyecto | Archivo de configuración listo |
| `nexus add <component>` | Genera un template predefinido | Archivo `.nexus` listo para usar con IA |
| `nexus list` | Lista todos los templates disponibles | Catálogo con variantes |
| `nexus config set lang <en/es>` | Cambia el idioma del lenguaje | Configuración guardada |
| `nexus config set output <path>`| Directorio de output | Configuración guardada |
| `nexus config show` | Muestra configuración actual | JSON con toda la configuración |
| `nexus --version` | Versión instalada | Número de versión |
| `nexus --help` | Ayuda completa | Lista de comandos y opciones |

### 5.2 Templates predefinidos v1.0
| Comando | Componente | Variantes |
| :--- | :--- | :--- |
| `nexus add button` | Button | primary / secondary / danger / ghost |
| `nexus add navbar` | Navbar | simple / with-cta / with-dropdown |
| `nexus add form` | Form | contact / login / register / search |
| `nexus add card` | Card | simple / with-image / horizontal |
| `nexus add list` | List | simple / with-icons / numbered |
| `nexus add hero` | Hero | centered / split / with-image |
| `nexus add modal` | Modal | simple / with-form / confirmation |
| `nexus add table` | Table | simple / sortable / with-pagination |

---

## 6. Roadmap

| Versión | Estado | Qué incluye |
| :--- | :--- | :--- |
| **v1.0** | En desarrollo | CLI completo, 8 templates en inglés, nexus.config.json, extensión VS Code básica, GitHub Actions CI/CD |
| **v1.1** | Pendiente | Sintaxis completa en español, autocompletado en VS Code, validación de sintaxis, tests generados con el template |
| **v2.0** | Visión | Compilador formal opcional, soporte Vue.js y Svelte, NEXUS Studio (editor visual), galería online de templates |
| **Futuro** | Sin fecha | Expansión a otros dominios: imágenes, video, datos — solo si v1.0 tiene adopción real |

---

## 7. Estrategia Open Source

### 7.1 Por qué open source desde el primer commit
- La comunidad es el diferenciador — sin comunidad no hay adopción
- Los lenguajes más exitosos nacieron open source
- La credibilidad técnica de Ventures SAS depende de NEXUS siendo abierto
- Los contribuidores mejoran el lenguaje más rápido que un equipo solo

### 7.2 Estrategia de lanzamiento
- v1.0 desarrollado internamente — usado en CreatorForge y MOTIX para validar
- Lanzamiento público en GitHub y npm cuando v1.0 esté estable
- README impecable con ejemplos Antes/Después que demuestren el valor en 30 segundos
- Post en dev.to, Hashnode y comunidades de developers en español e inglés
- La comunidad contribuye templates, traducciones y mejoras
- NEXUS genera visibilidad orgánica para Ventures SAS

### 7.3 Estructura del repositorio público
| Archivo | Contenido |
| :--- | :--- |
| `README.md` | Ejemplos Antes/Después, instalación, referencia de sintaxis |
| `CONTRIBUTING.md`| Cómo contribuir, convenciones, áreas prioritarias |
| `LICENSE` | MIT — máxima adopción sin restricciones |
| `.github/workflows/ci.yml`| Tests automáticos en cada PR y push |
| `.github/ISSUE_TEMPLATE/`| Templates para bugs y features |
| `nexus.config.json.example`| Configuración de ejemplo lista para copiar |
| `examples/` | Proyectos reales construidos con NEXUS |
| `docs/` | Documentación completa del lenguaje |

---

## 8. Integración con Ventures SAS

NEXUS es el proyecto open source de Ventures SAS. Es la credencial técnica que demuestra que la startup no solo construye productos — innova en infraestructura tecnológica para la era de la IA.

### 8.1 Cómo NEXUS alimenta los productos
| Producto | Cómo usa NEXUS |
| :--- | :--- |
| CreatorForge | El equipo usa NEXUS para describir componentes del editor con precisión a las IAs |
| MOTIX | Templates del marketplace descritos en NEXUS para generación consistente |
| Credix | Formularios y tablas del neobanco descritos en NEXUS |
| Chat IA omnicanal | Panel de administración construido con ayuda de NEXUS |
| Nakor | Componentes del e-commerce descritos en NEXUS |

### 8.2 Estrategia interna → externa
NEXUS se valida internamente antes de lanzarse al mundo.
- **Fase 1**: El equipo de Ventures SAS usa NEXUS en todos los proyectos.
- **Fase 2**: Se identifican problemas y se mejora la sintaxis con uso real.
- **Fase 3**: Cuando la sintaxis es estable, se lanza open source.
- **Fase 4**: La comunidad adopta, contribuye y hace crecer el lenguaje.

Esto garantiza que NEXUS llega al público ya probado en producción real.

---

## 9. Decisiones Cerradas — No se debaten

Estas decisiones son definitivas. No se modifican sin razón técnica crítica:
1. NEXUS es un lenguaje de comunicación con IAs — no un generador automático.
2. No requiere API key de ninguna IA para funcionar.
3. TypeScript + Node.js en todo el proyecto — un solo ecosistema.
4. Distribución vía npm — `npx nexus` o `npm install -g nexus-lang`.
5. Cero dependencias de IAs externas en el core del lenguaje.
6. Solo 2 idiomas: inglés (v1.0) y español (v1.1). Sin más idiomas jamás.
7. Open source desde el primer commit — GitHub público desde el día 1.
8. MIT License — máxima adopción sin restricciones comerciales.
9. Contribuciones de la comunidad desde el inicio — `CONTRIBUTING.md` en el primer commit.
10. Iniciamos solo con código — expansión a otros dominios solo si v1.0 tiene adopción real.

---

*NEXUS — Plan Maestro v2.0 — Visión Actualizada — 2026 — Ventures SAS*
