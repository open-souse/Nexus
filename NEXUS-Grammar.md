# NEXUS: The AI-Native Language Protocol (v2.6)

NEXUS es el lenguaje de alto nivel diseñado para la comunicación exacta y fluida entre Humanos e IAs. Elimina la ambigüedad del lenguaje natural.

## 1. Estructura y Jerarquía
Basado en indentación (2 espacios).
`Componente #Estilo [Atributos] "Contenido" => Lógica -> Destino`

## 2. Operadores Maestros (Diccionario Semántico)

- `@` **Directivas de Comportamiento**: Establece el modo de pensamiento de la IA o el entorno técnico.
  - *Ejemplo:* `@React @CleanCode` (La IA usará React y aplicará patrones de diseño sólidos).
- `@modify` **Modo Edición Segura**: Indica que el elemento YA EXISTE. La IA solo aplica los cambios indicados y preserva todo lo demás.
  - *Ejemplo:* `@modify [preserve:all]` → la IA no toca colores, diseño ni elementos no mencionados.
  - Opciones: `preserve:all` (nada), `preserve:styles` (solo estilos), `preserve:layout` (solo posiciones).
- `#` **Design Tokens / Estilos**: Vincula el componente con el sistema de diseño (DNA). Soporta herencia.
  - *Ejemplo:* `Button #primary #glass` (Aplica el color primario y el efecto de cristal definidos en el DNA).
- `$` **Variables de Intención**: Define constantes o parámetros de lógica global.
  - *Ejemplo:* `$brand: "Nexus"` (Define un valor reutilizable en toda la sesión).
- `* N` **Multiplicador**: Indica repetición de estructuras con variación de datos automática.
  - *Ejemplo:* `Card * 3` (Genera 3 tarjetas con contenido único).
- `?` **Estados**: Define variantes visuales o lógicas basadas en el estado de la UI.
  - *Ejemplo:* `Button ?loading` (Implementa estados de carga o deshabilitado).
- `!` **Prioridad / Énfasis**: Indica peso visual o importancia crítica.
  - *Ejemplo:* `Text !bold !danger` (Aumenta el contraste y grosor visual).
- `[new]` **Elemento Nuevo**: Marca un elemento como recién añadido dentro de un `@modify`. La IA solo crea este elemento, sin tocar los demás.
  - *Ejemplo:* `Captcha [new, inherit:siblings]`
- `[inherit:siblings]` **Herencia de Hermanos**: El elemento nuevo adopta automáticamente el estilo visual de los elementos hermanos existentes (color, fuente, bordes, sombras).
  - *Ejemplo:* `Captcha [new, inherit:siblings]` → el captcha queda igual visualmente que los otros campos del formulario.
- `[position:move-to:N]` **Mover Posición**: Reubica el elemento en la posición N del contenedor padre, sin alterar su diseño ni el de los demás.
  - *Ejemplo:* `Card "resumen" [position:move-to:1]` → mueve la card a primera posición.
- `[cascade:children]` **Cascada de Estilos**: Aplica el estilo del elemento padre a todos sus hijos automáticamente.
  - *Ejemplo:* `Section [shadow:elevated, cascade:children]` → padre e hijos tienen sombra, creando efecto de capas flotantes.
- `[` `]` **Atributos Técnicos**: Pasa parámetros de configuración (props) que no son de estilo.
  - *Ejemplo:* `Grid [cols:3]` (Configura el componente con valores técnicos exactos).
- `( cond ) -> A : B` **Condicional de Intención**: Define ramas de visualización lógica.
  - *Ejemplo:* `( $isLogged ) -> Dashboard : Login`.
- `->` **Flujo de Navegación**: Indica un cambio de ubicación o de ruta (Routing).
  - *Ejemplo:* `NavItem -> /home`.
- `=>` **Lógica de Side-Effects / API**: Indica acciones asíncronas o procesamiento de datos.
  - *Ejemplo:* `submit => API.post(/auth)`.
- `<` **Data Binding / Types**: Vincula componentes con fuentes de datos o esquemas definidos.
  - *Ejemplo:* `Table < User` (Mapea la estructura del tipo User a la tabla).
- `{ path }` **Inyección de Contexto**: Integra código o componentes existentes en el flujo actual.
  - *Ejemplo:* `MainContent { ./Layout.js }`.

## 3. Casos de Uso: Edición Segura

### Mover un elemento sin reinterpretar nada
```nexus
@modify [preserve:all]
Card "resumen-credito" [position:move-to:1]
```
La IA mueve la card a primera posición. No cambia colores, no mueve otros elementos, no rediseña nada.

### Agregar un elemento heredando el estilo existente
```nexus
@modify [preserve:all]
Form "login"
  Captcha [new, inherit:siblings]
```
La IA agrega el captcha con el mismo estilo visual que los otros campos del formulario. No toca los campos existentes.

### Sombras en cascada padre-hijo (efecto flotante)
```nexus
Section "hero" [shadow:elevated, cascade:children]
  Card * 3 [shadow:inherit]
```
El padre y cada hijo tienen sombra, generando efecto de capas flotantes. La IA aplica el mismo sistema de sombras en toda la jerarquía.

## 4. Definición de Tipos (Schemas)
Permite que la IA conozca la forma de los datos:
```nexus
Type User {
  name: string
  avatar: image
  role: "admin" | "user"
}
```

## 5. Ejemplo de Aplicación Avanzada
```nexus
@React @Tailwind @Accessibility
Page Dashboard
  ( ?loading ) -> SkeletonLoader : MainContent

  MainContent
    Header #fixed
      Logo "Nexus"
      UserMenu < { ./UserMenu.tsx }

    Grid [cols:3]
      StatCard #elevated * 3 < [ "Sales:$1k", "Users:500", "Orders:12" ]

    Section "Actions"
      Button "Delete Account" !danger => API.delete(/user) -> Toast("Deleted")
```

---
*Nexus: Menos palabras, más intención.*
