# Branch Protection Rules — main

Reglas a aplicar manualmente en:
**GitHub → Settings → Branches → Add branch ruleset** (o Branch protection rule)
Rama objetivo: `main`

---

## Reglas a activar

### Pull Requests
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners (si tienes CODEOWNERS configurado)

### Status Checks
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Status checks requeridos (agregar uno por uno):
    - `Test (Node 18)`
    - `Test (Node 20)`
    - `Build`
    - `Lint`
    - `Security Audit`

> Nota: los nombres de los status checks deben coincidir exactamente con los
> `name:` de cada job en `.github/workflows/ci.yml`. Los checks aparecen en
> el dropdown después de que el workflow haya corrido al menos una vez.

### Conversaciones
- ✅ **Require conversation resolution before merging**

### Historial de commits
- ✅ **Require linear history** (recomendado — evita merge commits)

### Restricciones de push
- ❌ **Allow force pushes** → DESACTIVADO
- ❌ **Allow deletions** → DESACTIVADO

### Bypass
- ❌ **Do not allow bypassing the above settings**
  (Esto aplica incluso para administradores — máxima seguridad)

---

## Cómo aplicar

1. Ve a **Settings** → **Branches**
2. Haz clic en **Add branch protection rule** (o **Add ruleset** en la nueva UI)
3. Branch name pattern: `main`
4. Activa cada regla según la lista de arriba
5. Haz clic en **Create** o **Save changes**

---

## Por qué estas reglas

| Regla | Protección |
|---|---|
| Require PR | Ningún commit llega directo a main — todo pasa por review |
| Status checks | Tests, build, lint y audit deben pasar — código roto no entra |
| Dismiss stale approvals | Un approval no cubre cambios posteriores al commit aprobado |
| No force push | Protege el historial — nadie puede reescribir main |
| No deletions | main no puede eliminarse accidentalmente |
| No bypass | Ni el admin puede saltarse las reglas |
