# Planificador de materiales Guevara Sanchez · con kardex

**Autor:** Mark Alexis Guevara Sanchez · Universidad Nacional Intercultural Fabiola Salazar Leguía de Bagua · ET505 · Semana 9 · Trabajo individual.

## Propósito
Amplía mi Planificador de materiales de la Semana 7 (pedido ficticio para la «Feria de las emociones», presupuesto S/ 180.00) con un pequeño **kardex**: permite crear materiales ficticios con id estable y código, buscarlos por nombre o código, cambiar su nombre por id, registrar entradas y salidas enteras positivas, calcular la existencia (entradas − salidas), inactivar o eliminar materiales y exportar los movimientos a CSV. El cálculo, el presupuesto y la validación del pedido de la Semana 7 se conservan sin cambios: la existencia física del kardex **no** se mezcla con el dinero del planificador.

## Archivos
| Archivo | Para qué sirve |
|---|---|
| `index.html` | Pantalla: planificador de S7 + sección `#kardex` (ids `k-*`). Enlaza `styles.css`, `app.js` y `kardex.js`. |
| `styles.css` | Apariencia de S7 + bloque «S9 · Personalización» (paleta violeta `rgb(107,33,168)`, etiqueta de 1.25 rem, tabla, select). |
| `app.js` | Planificador de S7 (sin cambios): `calcularTotal`, `validarPedido` y la pantalla del pedido. |
| `kardex.js` | Operaciones del kardex: `saldoDe`, `agregarMovimiento`, `exportarCSV`, almacenamiento en `localStorage` y la pantalla del kardex. |
| `README.md` | Este documento. |

## Ejecutar y usar
- **Local:** conservar juntos los cinco archivos y abrir `index.html` en Chrome o Edge.
- **Publicado:** abrir el sitio de GitHub Pages indicado abajo.
- **Uso del kardex:** crear un material → elegirlo en la lista (o buscarlo por nombre/código) → registrar ENTRADA o SALIDA con una cantidad entera positiva → revisar la existencia → «Exportar CSV» descarga `movimientos-materiales.csv` (se abre en Excel).

## Publicación
- Repositorio: https://github.com/03355171/et505-planificador
- Sitio GitHub Pages: https://03355171.github.io/et505-planificador/

## Pruebas
Se comprobaron 24 casos (19 del kardex y 5 del planificador de S7): entrada 10 y salida 3 dejan 7; salida 8 se rechaza y conserva 7; cero, negativo y decimal se rechazan; búsqueda sin coincidencia y búsqueda vacía no cambian datos; editar por id conserva otro material con el mismo nombre; cancelar la eliminación conserva el estado; inactivar conserva el historial; recargar conserva los datos; el CSV muestra los movimientos y cantidades correctos. La tabla completa (entrada, esperado, obtenido y corrección) está en el PDF entregado en MAXEDRA.

## Aportes y ayuda recibida
- **Mi aporte:** el proyecto base de la Semana 7 (código y presupuesto propios), la revisión de los resultados y la publicación en mi repositorio y en GitHub Pages. La paleta violeta (una de las opciones de la consigna) y la etiqueta personalizada se definieron con ayuda de la IA y se aceptaron tras comprobar el contraste.
- **Fragmentos suministrados:** `kardex.html`, `kardex.js` y `personalizacion.css` del recurso «Fragmentos de integración · ET505 · S9».
- **IA:** usé Claude (Anthropic) el 29/10/2026 para integrar los fragmentos, detectar errores de la primera integración y proponer las correcciones, que están marcadas como `CAMBIO S9-n` en `kardex.js`. El detalle de consultas, adaptación y pruebas está en el PDF.

## Límites
Los datos del kardex se guardan solo en el `localStorage` del navegador y del origen donde se abre la aplicación: no hay base de datos compartida ni varios usuarios, y borrar los datos del sitio los elimina. El CSV es una copia de los movimientos, no una sincronización con Excel. Todos los datos son ficticios.

---

## Historial · Semana 7 (conservado)
### Los tres cambios en app.js
1. **TODO 1 · `calcularTotal(pedido)`:** `return pedido.cantidad * Math.round(pedido.precio * 100);` Devuelve el total en céntimos enteros (S/ 5.00 × 10 = 5000 céntimos).
2. **TODO 2 · `validarPedido(pedido)`:** si el total supera `limites.presupuestoCentimos` devuelve «El total supera el presupuesto.»; si cumple devuelve `""`. Un total igual al presupuesto es válido.
3. **TODO 3 · botón Comprobar pedido:** `const error = validarPedido(pedido);` Usa la misma función que Confirmar simulación; hay una sola regla para los dos botones.

### Personalización
- **Nombre propio:** «Planificador de materiales Guevara Sanchez», en `<title>` y `<h1>`: conservé la base «Planificador de materiales» y le agregué mi apellido.
- **Actividad y material:** Feria de las emociones; ejemplo de material: papelógrafos.
- **Presupuesto propio:** **S/ 180.00 = 18000 céntimos** (`limites.presupuestoCentimos = 18000`). El texto visible de `index.html` dice S/ 180.00; ambos coinciden.
- **Justificación:** 6 grupos × S/ 30.00 por grupo = S/ 180.00. Está entre S/ 50 y S/ 300, es múltiplo de S/ 10 y es distinto de S/ 150.
- Se mantienen `maxCantidad:30` y `maxPrecio:50`.

### Pruebas con el presupuesto propio (S/ 180.00)
| # | Entrada | Esperado | Obtenido |
|---|---------|----------|----------|
| 1 | papelógrafos, 10 u., S/ 5.00 | Válido; total S/ 50.00 y saldo S/ 130.00 | Comprobar: «Pedido válido…». Confirmar: ficha con Total S/ 50.00 y Saldo S/ 130.00 |
| 2 | cantidad 2.5 / material vacío | Error, sin ficha nueva | «Cantidad: entero entre 1 y 30.» / «Escriba un material de al menos 3 caracteres.» (ambos botones) |
| 3 | papelógrafos, 10 u., S/ 18.00 | Total = presupuesto: válido, saldo S/ 0.00 | Comprobar: válido. Confirmar: Total S/ 180.00, Saldo S/ 0.00 |
| 4 | papelógrafos, 10 u., S/ 18.01 | Error por superar el presupuesto | «El total supera el presupuesto.» (ambos botones) |
| 5 | Confirmar válido (10 u., S/ 5.00), luego inválido (10 u., S/ 18.01), luego Limpiar | El error conserva la ficha; Limpiar la borra | Tras el error siguió la ficha de S/ 50.00; Limpiar la ocultó |

Capturas y detalle en el informe PDF.

### Mi aporte y ayuda recibida
- **Aporte:** completé los tres TODO, elegí y justifiqué el presupuesto de S/ 180.00, personalicé nombre, actividad y material, y registré las cinco pruebas.
- **Fallo detectado:** con la plantilla original, Comprobar mostraba «Complete TODO 3 en Comprobar.» y Confirmar mostraba «Complete TODO 1 en calcularTotal.». Después de completar los pendientes esos avisos desaparecieron.
- **Ayuda recibida:** usé el asistente de IA Claude (Anthropic) como apoyo para resolver algunas dudas y organizar el trabajo. Después yo, revisé el código y realicé pruebas para comprobar que funcionara correctamente.
