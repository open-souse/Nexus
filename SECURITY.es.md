<p align="center">
  <img src="./assets/nexus-logo.svg" alt="NEXUS" width="80"/>
</p>

<p align="center">
  <strong>🇪🇸 Español</strong> · <a href="./SECURITY.md">🇺🇸 English</a>
</p>

# Política de Seguridad — NEXUS Protocol

## Versiones Soportadas

| Versión | Soporte |
|---|---|
| 4.1.x | ✅ Activa |
| 4.0.x | ✅ Correcciones de seguridad |
| < 4.0 | ❌ Sin soporte |

---

## Reportar una Vulnerabilidad

**No abras un issue público para vulnerabilidades de seguridad.**

Hacerlo podría exponer el problema antes de que haya una corrección disponible.

**Cómo reportar:**
1. Ve a la pestaña **Security** del repositorio en GitHub
2. Haz clic en **"Report a vulnerability"**
3. O contacta directamente al maintainer a través de GitHub

**Qué incluir en tu reporte:**
- Versión de nxlang afectada
- Descripción de la vulnerabilidad
- Pasos para reproducirla
- Impacto potencial
- Si tienes una solución propuesta, inclúyela

**Qué esperar:**
- Confirmación de recibo en **48 horas**
- Evaluación del impacto en **7 días**
- Corrección publicada en **7 días** para issues críticos
- Crédito público en el release (si lo deseas)

---

## Modelo de Seguridad de nxlang

`nxlang` es una librería de parsing y validación. Su modelo de seguridad:

| Protección | Descripción |
|---|---|
| Límite de tamaño | Archivos > 500KB son rechazados antes de procesarse |
| Límite de líneas | Máximo 2000 líneas por archivo |
| Detección de null bytes | Bloquea intentos de inyección binaria |
| Tokenizador consciente de strings | Los tokens dentro de `"comillas"` nunca se evalúan |
| Sin ejecución de código | nxlang nunca ejecuta el código que valida |
| Sin llamadas de red | Procesamiento puramente local |
| Sin acceso al filesystem en `core/` | El módulo core no lee ni escribe archivos |

---

## Alcance

Este es el scope de seguridad de `nxlang`:

**En scope:**
- Vulnerabilidades en el parser o validador que permitan bypass de validación
- Vulnerabilidades en el CLI que afecten el sistema de archivos del usuario
- Dependencias con CVEs conocidos

**Fuera de scope:**
- Vulnerabilidades en el código generado por la IA usando NEXUS (eso es responsabilidad del modelo)
- Ataques de denegación de servicio mediante archivos muy grandes (ya mitigado con el límite de 500KB)
