# Métodos Simplex Paso a Paso

Aplicación educativa de programación lineal en español: **Algebraico · Tabular · Primal–Dual**. Amplía la web original conforme a «Guía Simplex Algebraico y Tabular Web» y conserva el procedimiento primal-dual de la guía anterior.

Sitio: https://johalex678-cmyk.github.io/IO1/

## Ejecutar y publicar

Node.js 20 o posterior, sin paquetes externos ni credenciales de aplicación.

```sh
cd /workspace/IO1
npm run dev
npm test
npm run build
npm run build:pages
```

El servidor de desarrollo escucha en 5173 (`PORT=3000 npm run dev` cambia el puerto). `dist/` es el sitio estático local. `docs/` es la versión de GitHub Pages; regenerarla y subirla a `main` actualiza el sitio ya configurado en Settings → Pages → Deploy from a branch → main → /docs. Las rutas relativas funcionan en `/IO1/` y en la raíz. Publicar el entorno de Codex es un proceso independiente del despliegue de la web.

## Funciones

- Tres tarjetas del mismo nivel y navegación por método. Cambiar de apartado conserva coeficientes, objetivo, dominios y cotas; pulsa Resolver para generar el historial del método elegido.
- MAX/MIN, hasta 8 variables y 8 restricciones originales (también cero restricciones), constantes, negativos, decimales, fracciones y variables no negativas, no positivas o libres.
- Cotas inferiores/superiores adicionales opcionales. En esos campos un vacío significa sin cota adicional; los coeficientes ordinarios vacíos son inválidos. El dominio sigue siendo obligatorio y se intersecta con las cotas.
- Modelo guardado localmente en el navegador; Limpiar pide confirmación.
- Navegación Anterior/Siguiente/Ver todo y fracciones/decimales (nueve cifras significativas solo para presentación).
- Word **.docx real** mediante un paquete OOXML sin dependencias, HTML autónomo y PDF mediante la impresión de la resolución completa. PDF / Imprimir abre el diálogo del navegador: elegir Guardar como PDF.
- Tablas adaptables, columna Base fija en móvil y pivotes marcados con texto y color.

## Recorridos matemáticos

**Algebraico:** trabaja directamente con Z. Sustituye dominios/cotas, normaliza RHS y agrega +S o −E, sin artificiales. Reduce a filas independientes con eliminación racional. Enumera las no básicas en orden lexicográfico, resuelve cada sistema y distingue bases singulares, soluciones no factibles, degeneración y puntos repetidos. Muestra sistemas, operaciones, vectores originales y tabla comparativa. Examina direcciones de mejora en cada base factible para descartar no acotación. Límite de 300 combinaciones; superar el límite informa incompleto y ofrece Tabular, sin declarar infactibilidad.

**Tabular:** también trabaja con Z original. Construye la base habitual de clase con holguras, excesos y artificiales. Gran M usa pares racionales `(α, β)` para `αM + β`; compara primero α y después β. M = 100 es solo una sustitución didáctica de pantalla. El objetivo se canoniza y selecciona la mayor mejora según MAX/MIN; considera todas las columnas permitidas, incluidas holguras. Una artificial saliente no reingresa. Una base repetida activa Bland completo. Se certifica primero el mínimo de la penalización; no se confunde una artificial positiva con no acotación del original. Artificiales básicas cero se limpian y se comprueba nuevamente la parada. Cada pivote comprueba identidad, ceros básicos y RHS no negativos.

**Primal–Dual:** conserva transposición, tablas completas de signos, variables libres y las tres tablas de clase. Las cotas adicionales se agregan como restricciones originales antes de construir el dual. La ruta directa puede preparar una variable libre mediante un pivote algebraico si la tabla resultante cumple las condiciones duales. Si hace falta, utiliza dos fases identificadas explícitamente. No deduce no acotación del primal solo por un dual infactible.

Los resultados se reconstruyen y verifican en el modelo original, incluyendo cotas, dominios y constantes. Un costo reducido cero no basta para anunciar múltiples óptimos: se busca un punto original distinto y factible con el mismo objetivo. Los métodos resuelven programación lineal continua; no incluyen integralidad, desigualdades estrictas ni expresiones no lineales.

## Archivos

- `src/math.js`: racionales BigInt, modelo, conversión dual y comprobaciones.
- `src/standard.js`: dominios, cotas, forma estándar, rango y sistemas exactos.
- `src/algebraic.js`: enumeración de bases y certificación de rayos.
- `src/tabular.js`: Gran M simbólica, pivotes, limpieza de artificiales e historial.
- `src/solver.js`: motor Primal–Dual previo y ruta de dos fases.
- `src/method-view.js`: pasos educativos, tablas y ejemplos de los nuevos apartados.
- `src/app.js`: formulario común, navegación y exportación.
- `src/word.js`: generación de Word sin dependencias.

## Validación y límites de las fuentes

Pruebas de referencia: seis casos algebraicos (x = (1,2), Z = 8), Tabular MAX (60,30; Z = 5400; entran x₂ y x₁), Gran M MIN (3/2,1/2; Z = 17/2), MIN mixto corregido (2/5,9/5; Z = 17/5), cotas positivas (50,50; Z = 4000) y Primal–Dual (W = 30.8). Incluye pruebas de cotas, dominios, constantes, RHS negativo, igualdad redundante, singularidad, cociente cero, degeneración, empates, alternativas, infactibilidad, no acotación y ciclaje. Una comparación adicional de 350 modelos pequeños con semilla fija confirmó concordancia de estados y valores entre los tres motores.

En Chromium se verificaron los tres recorridos, conservación de datos, M = 100 solo visual, navegación, exportación Word/HTML/PDF, validación y móvil de 390 px sin desbordamiento de página. El Word exportado se abrió con python-docx y se comprobó la integridad del ZIP y de todos los XML.

La nueva guía cita cuatro PDF que no están adjuntos. Algunos ejercicios aparecen solo con resultados y carecen de coeficientes completos; no se inventaron sus modelos ni se afirma haberlos validado. Para agregarlos fielmente se requieren esos PDF. Los ejemplos completos de ambas guías sí están implementados y probados.
