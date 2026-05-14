# Secrets y Environments — Configuración Manual

Este archivo documenta los secrets y environments que debes configurar
manualmente en GitHub. Nunca commitees tokens o credenciales reales.

---

## 1. Repository Secret — NPM_TOKEN

**Qué es:** Token de autenticación para publicar en npm desde el workflow de CI.

**Cómo obtenerlo:**
1. Ve a [npmjs.com](https://www.npmjs.com) → inicia sesión
2. Avatar → **Access Tokens** → **Generate New Token**
3. Tipo: **Automation** (no Classic)
4. Copia el token — solo se muestra una vez

**Dónde configurarlo en GitHub:**
1. Repositorio → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
3. Name: `NPM_TOKEN`
4. Secret: pega el token

---

## 2. Environment — npm-publish

El environment `npm-publish` actúa como una segunda capa de aprobación antes
de que cualquier código llegue a npm. Sin él, el job `publish` no puede ejecutarse.

**Cómo crearlo:**
1. Repositorio → **Settings** → **Environments** → **New environment**
2. Name: `npm-publish`
3. Configura:
   - ✅ **Required reviewers**: agrega tu usuario (`edwinreal`)
   - ✅ **Deployment branches**: Only selected branches → `main`
4. En la sección **Environment secrets**:
   - **Add secret** → Name: `NPM_TOKEN` → mismo valor que el repository secret

**Por qué ambos secrets (repo + environment):**
- El repository secret `NPM_TOKEN` lo usa el job `verify` para el audit
- El environment secret `NPM_TOKEN` lo usa el job `publish` — y solo se desbloquea tras tu aprobación manual

---

## 3. Flujo de publicación con máxima seguridad

```
git tag v4.2.0 && git push origin v4.2.0
        ↓
GitHub crea Release automáticamente
        ↓
workflow publish.yml se activa
        ↓
job verify: tests + build + audit + version check
        ↓
job publish: BLOQUEADO — espera aprobación manual de edwinreal
        ↓
Tu apruebas en GitHub → Actions → el deployment
        ↓
npm publish --provenance (con attestation de GitHub)
```

---

## 4. Branch Protection Rules (configurar manualmente)

Ver [branch-protection.md](./branch-protection.md) para las reglas completas.

Los status checks requeridos que debes agregar en Settings → Branches:
- `Test (Node 18)` (job: test, matrix: 18)
- `Test (Node 20)` (job: test, matrix: 20)
- `Build` (job: build)
- `Lint` (job: lint)
- `Security Audit` (job: security-audit)
