# AR Turismo Ubaté

Experiencia web de **realidad aumentada** sobre la Basílica del Santo Cristo de Ubaté. Al apuntar la cámara del móvil al marcador impreso, aparece un modelo 3D que puedes mover, rotar y escalar.

Construido con [A-Frame](https://aframe.io/) y [AR.js](https://ar-js-org.github.io/AR.js-Docs/).

## Requisitos

- Navegador móvil moderno (Chrome o Safari recomendados)
- Cámara con permisos habilitados
- Conexión a internet (carga de librerías CDN)
- HTTPS o `localhost` (los navegadores solo permiten la cámara en contextos seguros)
- El marcador AR impreso o en pantalla (`marcador-basilica.png`)

## Cómo usar

1. Abre `index.html` desde un servidor local o un hosting HTTPS.
2. Pulsa **Instrucciones** → descarga o imprime el marcador y lee los pasos.
3. Coloca el marcador en una superficie plana, bien iluminada y sin arrugas.
4. Permite el acceso a la cámara y apunta al marcador.
5. Cuando se detecte el patrón:
   - **Mover** desplaza el modelo en X / Y / Z (`↺` restablece posición, rotación y escala)
   - **Tamaño** acerca o aleja el modelo
   - **Rotar** lo gira sobre los ejes visibles
   - Puedes **ocultar** la barra de controles para ver solo el modelo

## Probar en local

Cualquier servidor estático sirve. Ejemplos:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Luego abre en el móvil (misma red) o en el PC:

```text
http://localhost:8080
```

> En un teléfono físico suele hacer falta HTTPS o un túnel (por ejemplo [ngrok](https://ngrok.com/)) para que la cámara funcione fuera de `localhost`.

## Archivos del proyecto

| Archivo | Descripción |
| --- | --- |
| `index.html` | Estructura HTML y escena AR |
| `css/styles.css` | Estilos de la UI, landscape y modal |
| `js/app.js` | Controles del modelo, marcador y resize |
| `marcador-basilica.png` | Imagen para imprimir / descargar (usuario) |
| `pattern-parroquia_29-01-2020_45W0Q7H1kpbasilica santo cristo ubate.patt` | Patrón AR.js que reconoce la cámara |
| `proyecto_cultura.glb` | Modelo cultural (por defecto) |
| `churche.glb` | Modelo de la basílica |
| `Astronaut.glb` | Modelo de demostración |

## Controles e interfaz

- La UI usa paneles semitransparentes fijos sobre la cámara.
- Controles en una barra inferior horizontal (Mover + Tamaño + Rotar), desplegable: toca **Ocultar/Mostrar controles** para ver solo el modelo.
- El botón **Instrucciones** abre una guía con pasos, la imagen del marcador, descarga e impresión.

## Consejos de detección

- Imprime el marcador lo más grande posible (ideal ~15–20 cm de lado).
- Evita brillos fuertes y sombras parciales sobre el papel.
- Mantén el teléfono estable a ~30–50 cm del marcador.
- Si no aparece el modelo, vuelve a enfocar o recarga la página tras conceder la cámara.

## Licencia / créditos

Proyecto de turismo cultural — Basílica del Santo Cristo de Ubaté.
