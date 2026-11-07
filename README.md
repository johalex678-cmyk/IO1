# Simplex Aula

Aplicación educativa en español basada en las 13 páginas de «Guía para una aplicación de simplex primal y dual». Editor de modelos, conversión por transposición, reglas de signos, preparación de base, tableaux, operaciones completas y certificado primal-dual.

## Ejecutar

Requiere Node.js 20 o posterior. No necesita instalar paquetes ni configurar credenciales.

```sh
cd /workspace/IO1
npm run dev
```

El servidor escucha en el puerto 5173; puede cambiarse con `PORT=3000 npm run dev`. Para generar el sitio estático: `npm run build`. El directorio `dist/` se puede servir con cualquier servidor estático. Para preparar GitHub Pages: `npm run build:pages`. Se genera `docs/` con rutas relativas para funcionar bajo `/IO1/`. En GitHub, Settings → Pages → Deploy from a branch → rama `main`, carpeta `/docs`. La subida del código no activa Pages automáticamente.

## Verificar

```sh
npm test
npm run build
```

Las pruebas cubren las tres tablas del ejemplo (W = 154/5 = 30.8), transposición, signos, MAX/MIN, variables libres y no positivas, igualdades redundantes, constantes, infactibilidad, no acotación, un ejemplo de ciclaje de Beale y las invariantes del pivote. También se verificó en Chromium la navegación, fracciones, exportación HTML, validación y diseño móvil.

## Uso

1. Define dimensiones, objetivo, coeficientes, sentidos y dominios; no dejes coeficientes vacíos. Usa cero explícito.
2. Pulsa **Resolver paso a paso** y recorre las siete secciones, o activa **Ver todo el procedimiento**.
3. Cambia entre fracciones exactas y decimales (nueve cifras significativas, solo visuales).
4. Exporta un HTML autónomo con el procedimiento completo. Ábrelo e imprime para guardar PDF.

El modelo se guarda en localStorage del navegador. **Limpiar** pide confirmación. Hasta 8 variables y 8 restricciones, incluyendo cero restricciones. Solo programación lineal continua; no incluye variables enteras, relaciones estrictas ni expresiones no lineales.

## Motor

- `src/math.js`: racionales BigInt normalizados, validación, transposición y comprobación del modelo original.
- `src/solver.js`: preparación de base, pivotes e historial independiente de la interfaz.
- `src/app.js`: edición, presentación educativa, historial y exportación.
- `style.css`: diseño adaptable y estilos de impresión.

La ruta directa transforma desigualdades a ≤ con holguras positivas. Puede incorporar una variable libre a la base mediante un pivote algebraico, solo si la tabla resultante cumple la condición dual. Conserva las tres tablas de clase sin tratar a la variable libre como no negativa. La ruta dual selecciona resultado más negativo y menor cociente admisible. Si no es aplicable o detecta una base repetida, reinicia con fases y regla de Bland, descartando el historial exploratorio.

La ruta general sustituye dominios, normaliza resultados para fase I, usa artificiales donde hacen falta, retira artificiales/filas redundantes y restaura el objetivo para fase II. La fase II usa MAX F = −W cuando W es MIN y reconstruye el valor original. Las rutas tienen límites explícitos; alcanzarlos significa **incompleto**, no infactible. No se afirma unicidad u óptimos alternativos solo por observar un costo reducido cero.

Las soluciones originales se reconstruyen y se verifican con aritmética exacta. El primal se resuelve de forma independiente: no se deduce su no acotación únicamente de un dual infactible.
