# RFC-XXXX — [Título de la Propuesta]

**Estado:** `Borrador` | `En revisión` | `Aprobado` | `Rechazado`
**Autor:** [Tu nombre] ([@github](https://github.com/tu-usuario))
**Fecha:** YYYY-MM-DD
**Versión objetivo:** v4.x.0

---

## Resumen

Una línea explicando qué propones agregar o cambiar en el protocolo NEXUS.

---

## Motivación

¿Qué problema real resuelve esta propuesta?

¿Por qué la sintaxis actual no lo resuelve?

¿Quién se beneficia? ¿En qué industria o caso de uso?

---

## Sintaxis Propuesta

```nexus
[Ejemplo de cómo se vería el nuevo operador o funcionalidad]
```

Explica cada parte de la sintaxis propuesta.

---

## Reglas Semánticas

- Regla 1: cuándo es válido el operador
- Regla 2: cuándo es inválido
- Regla 3: cómo interactúa con otros operadores
- Casos límite y cómo se manejan

---

## Ejemplos Válidos

```nexus
// Ejemplo 1 — caso de uso básico
...

// Ejemplo 2 — caso de uso avanzado
...
```

## Ejemplos Inválidos

```nexus
// ❌ Inválido — por qué falla
...

// ❌ Inválido — otro caso de fallo
...
```

---

## Impacto en el Protocolo

**¿Rompe compatibilidad con versiones anteriores?**
Sí / No — explicación

**¿Afecta el validador (`core/validator.ts`)?**
Sí / No — qué cambiaría

**¿Afecta el system prompt (`context/builder.ts`)?**
Sí / No — qué cambiaría

**¿Afecta la gramática (`core/grammar.ts`)?**
Sí / No — qué cambiaría

---

## Alternativas Consideradas

### Alternativa A: [nombre]
```nexus
// Sintaxis alternativa
```
**Por qué se descartó:** ...

### Alternativa B: [nombre]
**Por qué se descartó:** ...

---

## Casos de Uso Reales

Mínimo 2 ejemplos de uso real que justifiquen la propuesta:

**Caso 1: [descripción]**
```nexus
// Código NEXUS usando el nuevo operador
```

**Caso 2: [descripción]**
```nexus
// Código NEXUS usando el nuevo operador
```

---

## Propuesta de Tests

```typescript
// Casos de test que cubrirían la nueva funcionalidad
describe('RFC-XXXX: NuevoOperador', () => {
  test('caso válido básico', () => {
    // ...
  })
  test('caso inválido — error esperado', () => {
    // ...
  })
})
```

---

## Checklist

- [ ] La sintaxis propuesta no conflictúa con operadores existentes
- [ ] Incluye al menos 2 ejemplos válidos
- [ ] Incluye al menos 2 ejemplos inválidos
- [ ] Incluye propuesta de tests
- [ ] Documenta impacto en validator, builder y grammar
- [ ] Describe al menos 2 casos de uso reales

---

*Para crear una nueva RFC, copia este archivo y renómbralo `RFC-XXXX-nombre-corto.md`.*
*Abre un issue con el prefijo `[RFC]` antes de hacer PR.*
