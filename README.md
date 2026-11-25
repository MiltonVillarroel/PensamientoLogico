# Pensamiento Lógico Preuniversitario — Documentación del Sitio Web

> **Programa de Admisión Preuniversitaria · Carrera de Psicología**  
> **Facultad de Humanidades y Ciencias de la Educación · Universidad Mayor de San Andrés (UMSA)**  
> Repositorio oficial del sitio: `https://github.com/MiltonVillarroel/PensamientoLogico`

Esta documentación detalla la arquitectura técnica, los componentes interactivos, el sistema de diseño académico y las especificaciones metodológicas requeridas para el desarrollo secuencial de las **9 sesiones del curso**.

---

## 1. Visión General y Filosofía de Diseño

El sitio web está concebido como una herramienta de apoyo dual:
1. **Para el docente en aula:** Como mazo de diapositivas interactivo (*slide deck SPA*) optimizado para ser proyectado en pantalla gigante con tipografía de alto contraste y letras grandes, permitiendo modelar fragmentos, ocultar/revelar soluciones y guiar la discusión.
2. **Para el estudiante:** Como entorno de consulta autónomo, accesible desde navegadores de escritorio y dispositivos móviles, sincronizado con los textos del curso y los materiales en PDF.

### Principios clave:
* **Zero-dependencies:** Construido con HTML5 semántico, CSS3 modular con variables y JavaScript nativo (Vanilla ES6+). No requiere empaquetadores,Node.js ni frameworks pesados; abre directamente en cualquier navegador moderno.
* **Estilo Formal y Académico:** Inspirado en la tradición editorial universitaria, combinando fuentes serif clásicas (`EB Garamond`) con tipografías de interfaz modernas (`Inter`) y de código/notación (`Roboto Mono`).
* **Tema Claro por defecto con modo oscuro integrado:** Adaptable a entornos con mucha luz (aula) o baja iluminación (estudio nocturno).

---

## 2. Estructura y Arquitectura de Archivos

El proyecto se organiza dentro de la carpeta `sitio/`:

```
sitio/
├── index.html          # Portal institucional y directorio de las 9 clases
├── clase-01.html       # Diapositivas interactivas de la Clase 1 (38 slides)
├── clase-02.html       # Diapositivas interactivas de la Clase 2 (28 slides)
├── clase-03.html       # (Próxima entrega) Inducción y analogía
├── ...                 # (Clases 03 a 09)
└── README.md           # Documentación técnica y pedagógica (este archivo)
```

### Relación con los Materiales Canónicos (`Avance/`):
El sitio web es una transposición didáctica de los documentos normativos ubicados en la carpeta `Avance/`:
* `Docente - Curso - Planificación.md` $\to$ Define el mapa curricular de las 9 clases reflejado en `index.html`.
* `Docente - Clase NN - Planificación.md` $\to$ Establece los tiempos, lecturas y ritmo de exposición de cada diapositiva.
* `Estudiantil - Clase NN - Material complementario.md` $\to$ Provee las explicaciones conceptuales y tablas teóricas.
* `Estudiantil - Clase NN - Ejercicios.md` $\to$ Alimenta los casos de estudio, procedimientos e incisos interactivos.
* `Docente - Clase NN - Solucionario.md` $\to$ Nutre las justificaciones pedagógicas del botón «Mostrar solución».

---

## 3. Sistema de Diseño y Estilos Sincronizados

Tanto `index.html` como los archivos de clases comparten exactamente las mismas variables CSS y la escala tipográfica.

### 3.1. Tipografías Oficiales

Se cargan desde Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=EB+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

* **`--font-serif: 'EB Garamond', Georgia, serif;`**  
  Usada en títulos de portada, títulos de diapositivas (`.slide-title`), títulos de tarjetas (`.card-title`) y encabezados analíticos.
* **`--font-display: 'Cinzel', serif;`**  
  Usada en insignias institucionales y monogramas académicos.
* **`--font-sans: 'Inter', system-ui, sans-serif;`**  
  Usada en párrafos, subtítulos, textos de casos experimentales, opciones de respuesta y elementos de interfaz.
* **`--font-mono: 'Roboto Mono', monospace;`**  
  Usada en fórmulas lógicas ($\neg, \land, \lor, \to, \leftrightarrow$), números de sesión, rótulos de incisos (`a)`, `b)`) y metadatos.

### 3.2. Variables de Color y Temas

```css
:root {
  /* Fondo y Superficies (Modo Claro) */
  --bg-base:        #f8fafc;
  --bg-surface:     #ffffff;
  --bg-card:        #ffffff;
  --bg-hover:       #f1f5f9;
  --bg-subtle:      #f1f5f9;

  /* Textos */
  --text-main:      #0f172a;
  --text-primary:   #0f172a;
  --text-secondary: #334155;
  --text-muted:     #64748b;

  /* Acentos Institucionales */
  --brand-primary:  #1e3a8a; /* Azul marino académico */
  --brand-accent:   #2563eb; /* Azul real didáctico */
  --brand-light:    #dbeafe;
  --accent:         #1e3a8a;
  --accent-lt:      #2563eb;

  /* Estados y Marcación */
  --amber:          #b45309; /* Indicadores lógicos */
  --green:          #047857; /* Premisas / Respuestas correctas */
  --purple:         #6d28d9;
  --red:            #dc2626; /* Conclusiones */
  --border:         #e2e8f0;
}

[data-theme="dark"] {
  --bg-base:        #090d16;
  --bg-surface:     #0f172a;
  --bg-card:        #131d31;
  --bg-hover:       #1b2742;
  --bg-subtle:      #1a2438;

  --text-main:      #f8fafc;
  --text-primary:   #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted:     #94a3b8;

  --brand-primary:  #3b82f6;
  --brand-accent:   #60a5fa;
  --brand-light:    rgba(59, 130, 246, 0.15);
  --accent:         #3b82f6;
  --accent-lt:      #60a5fa;

  --amber:          #fbbf24;
  --green:          #34d399;
  --purple:         #a78bfa;
  --red:            #f87171;
  --border:         rgba(255, 255, 255, 0.08);
}
```

### 3.3. Jerarquía y Escala Tipográfica («Letras Grandes»)

Para garantizar que el material sea proyectable en aula sin perder legibilidad, se definen tamaños adaptativos mínimos:

* **Título de Portada:** `clamp(3.6rem, 7vw, 5.5rem)`
* **Títulos de Diapositivas:** `clamp(2.3rem, 4.6vw, 3.8rem)`
* **Subtítulos:** `clamp(1.1rem, 1.7vw, 1.4rem)`
* **Enunciado de Preguntas:** `1.15rem` (Negrita $600$)
* **Opciones de Respuesta:** `1.02rem`
* **Cuerpo de Caso Experimental:** `1.05rem` (Interlineado $1.7$)
* **Cajas de Definición y Axiomas:** `1.15rem` – `1.18rem`

---

## 4. Funcionamiento Técnico e Interactivo

### 4.1. Persistencia de Tema Compartida
Tanto `index.html` como las páginas de clases leen y escriben en `localStorage` bajo la clave `'plp-theme'`:
```javascript
const THEME_KEY = 'plp-theme';
const saved = localStorage.getItem(THEME_KEY) || 'light';
document.documentElement.setAttribute('data-theme', saved);

themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});
```

### 4.2. Motor de Navegación de Diapositivas
* **Controles por teclado:** `ArrowRight`, `ArrowDown`, `Barra Espaciadora` (avanzar); `ArrowLeft`, `ArrowUp` (retroceder); `Home` (inicio); `End` (fin).
* **Controles táctiles y ratón:** Barra inferior con botones `⟨⟨` (primera), `‹` (anterior), contador `n / total`, `›` (siguiente), `⟩⟩` (última), botón `⛶` (pantalla completa) y botón `⌂` (retorno al índice).
* **Cálculo dinámico:** `totalSlides` se evalúa mediante `document.querySelectorAll('.slide').length`, adaptándose automáticamente al añadir o remover diapositivas.

### 4.3. Módulo Tetratlón (Marcación Analítica)
Permite resaltar en vivo la estructura del argumento con colores canónicos:
* **Premisas:** Fondo celeste translúcido con borde inferior azul (`.t-premise.highlighted`).
* **Conclusión:** Fondo carmesí translúcido con borde inferior rojo (`.t-conclusion.highlighted`).
* **Indicador lógico:** Fondo ámbar translúcido con borde inferior dorado (`.t-indicator.highlighted`).

### 4.4. Módulo de Ejercicios por Pestañas
Para evitar sobrecargar visualmente la pantalla con 4 preguntas a la vez, cada diapositiva de ejercicio divide el espacio en dos columnas:
1. **Columna Izquierda:** Caso de estudio experimental + Recuadro del Procedimiento Escrito orientador.
2. **Columna Derecha:** Selector de pestañas `[ Inciso a) ]`, `[ Inciso b) ]`, `[ Inciso c) ]`, `[ Inciso d) ]`.
3. **Botón «Mostrar solución razonada»:** Resalta la opción correcta en la lista (`.revealed-correct`) y despliega la justificación formal extraída del solucionario docente. Cuando el inciso involucra tablas de verdad, se muestran únicamente las columnas pertinentes al inciso (sin adelantar respuestas de incisos posteriores) y se resalta visualmente la fila decisiva.

### 4.5. Criterios de Redacción para Preguntas y Ejercicios

Para garantizar que los ejercicios complementarios sean comprensibles al primer vistazo (tanto en proyección en aula como en lectura autónoma), toda pregunta debe cumplir con estos criterios:

* **Claridad y cero ambigüedad:** Redactar preguntas directas y autocontenidas. Evitar términos vagos (*«¿qué anotación...?»*, *«¿qué parte...?»*, *«¿qué evaluación...?»*) o referencias ciegas a otro texto/inciso (*«el primer enunciado»*, *«las frases de a) y b)»*) sin explicitar a qué se refieren.
* **Sin jerga críptica sin contexto:** Cuando se pidan resultados de tablas de verdad, explicitar qué representan los casos (p. ej., los cuatro casos `1) p=V, q=V; 2) p=V, q=F; 3) p=F, q=V; 4) p=F, q=F`) en lugar de depender de sobreentendidos técnicos como *«columna final»* o *«asignaciones»*.
* **Sin adelantar respuestas (*spoilers*):** Al explicitar una frase o tabla en un inciso, no revelar la fórmula o columna que se evalúa en otro inciso.
* **Preservación del Tetratlón:** Los fragmentos y tareas del **Tetratlón** del libro base (*Pensamiento Lógico-5*) **no se modifican**. Toda mejora de claridad aplica únicamente a los ejercicios complementarios y debe mantenerse sincronizada entre el Markdown/PDF de `Avance/` y el archivo `clase-NN.html` correspondiente.

---

## 5. Especificaciones para el Desarrollo de las Siguientes Clases (2 a 9)

A continuación se detalla la hoja de ruta temática y bibliográfica establecida en `Avance/Docente - Curso - Planificación.md`, que deberá implementarse en cada archivo subsiguiente:

| Clase | Archivo objetivo | Contenido del Texto Base (*Pensamiento Lógico-5*) | Complemento Teórico (*Copi / Weston*) | Taller y Actividad Observable |
|:---:|---|---|---|---|
| **01** | `clase-01.html` | Introducción y Cap. I (pp. 4–11). | Copi & Cohen caps. 1 y 8; Weston cap. I. | Prototipos, Tetratlón (4 fragmentos) y 9 ejercicios complementarios. *(Completada)* |
| **02** | `clase-02.html` | Cap. II. Demostración y refutación (pp. 12–15). | Copi & Cohen cap. 8 (tablas de verdad, condicionales, condiciones necesarias y suficientes); Weston caps. I y VII. | Prototipos (Nietzsche, Ferrater Mora), Tetratlón II (Jung, Russell, Bunge, Piaget) y 8 ejercicios complementarios. *(Completada)* |
| **03** | `clase-03.html` | Cap. III. Inducción y Cap. IV. Analogía (pp. 16–23). | Weston caps. II–III (ejemplos, representatividad, contraejemplos); Copi cap. 11 (evaluación de analogías). | Dos Tetratlones (III y IV), comparación de generalización por casos vs. inferencia por semejanza en psicología. |
| **04** | `clase-04.html` | Cap. V. Deducción (pp. 24–27). | Copi & Cohen caps. 7 y 9 (Modus Ponens, Modus Tollens, silogismos disyuntivo e hipotético, reglas de inferencia). | Tetratlón V, formalización de argumentos en lenguaje proposicional y deducciones de pocos pasos con justificación de regla. |
| **05** | `clase-05.html` | Cap. VI. Argumentaciones múltiples (pp. 28–31). | Copi & Cohen caps. 8–9 (equivalencias lógicas, De Morgan, condicional, doble negación). | Tetratlón VI, distinción entre argumentos encadenados y yuxtapuestos, conclusiones intermedias y demostraciones paso a paso. |
| **06** | `clase-06.html` | Aplicación práctica de V y VI. | Copi & Cohen caps. 5–6 (proposiciones categóricas A, E, I, O; términos S, P, M; diagramas de Venn). | Traducción de enunciados cotidianos a forma estándar, validación geométrica con diagramas de Venn y explicación de falacias silogísticas. |
| **07** | `clase-07.html` | Cap. VII. Errores en la argumentación (pp. 32–35). | Copi & Cohen cap. 3 (falacias); Weston cap. X (falacias clásicas de pertinencia, ambigüedad y datos). | Tetratlón VII, identificación de falacias en textos de opinión y reformulación rigurosa de argumentos débiles. |
| **08** | `clase-08.html` | Cap. VIII. Repaso general y Pentatlón (pp. 36–38). | Weston caps. VII–IX (ensayo basado en argumentos, objeciones y contraargumentos); Copi (repaso). | Resolución guiada del Pentatlón, redacción de argumentos evaluables y defensa ante objeciones. |
| **09** | `clase-09.html` | Recuperación selectiva I–VIII. | Batería integradora de Copi, Cohen y Weston. | Simulacro de examen integrador, resolución cronometrada y corrección colectiva justificada. |

---

## 6. Procedimiento y Checklist para Crear una Nueva Clase

Al comenzar la maquetación de una nueva clase (ej. `clase-02.html`):

1. **Estructura base:**
   * Duplicar la plantilla base de `clase-01.html`.
   * Mantener el `<head>` con las 4 fuentes de Google Fonts y el bloque de variables de diseño sincronizadas.
   * Actualizar el título de la página (`<title>Clase NN — Pensamiento Lógico</title>`).
2. **Desarrollo del Bloque Teórico (Minutos 0 a 102):**
   * Seguir rigurosamente la secuencia de la planificación docente (`Docente - Clase NN - Planificación.md`).
   * Asignar a cada diapositiva su atributo de sección: `data-sec="Bloque X · Título"`.
   * Incluir al menos una diapositiva con interacción exploratoria (tarjetas o comparaciones de verdad/validez).
   * Incorporar la diapositiva de descanso al minuto 92–102 (`class="slide slide-break"`).
3. **Desarrollo del Bloque de Taller (Minutos 102 a 180):**
   * Diapositiva de apertura del taller con el cronograma de tiempos y distribución de fragmentos.
   * **Diapositivas de Tetratlón:** Implementar el diseño de dos paneles con `toggleTetraMark` para destacar premisas, conclusión e indicador, seguido de los incisos normativos y la precisión de Copi & Cohen.
   * **Diapositivas de Ejercicios del Cuadernillo:** Usar la plantilla de dos paneles (caso y procedimiento a la izquierda; selector de pestañas `switchExTab` e incisos con `toggleExSol` a la derecha). Revisar que cada pregunta sea clara, directa y libre de ambigüedades según la sección 4.5, y convertir todo formato Markdown (`**negrita**`, enlaces) a HTML válido.
4. **Diapositiva de Cierre:**
   * Diapositiva final de síntesis con los 4 o 5 aprendizajes observables de la sesión.
5. **Actualización de `index.html`:**
   * En la tarjeta correspondiente de la sesión en `index.html`:
     * Cambiar el estado de `<span class="status-badge upcoming">En preparación</span>` a `<span class="status-badge published">Disponible</span>`.
     * Reemplazar el contenedor deshabilitado por el enlace activo: `<a href="clase-NN.html" class="class-card active-card">`.
6. **Verificación de Calidad y Git:**
   * Comprobar la navegación con teclado en modo claro y oscuro.
   * Comprobar que el botón `⌂` devuelva a `index.html`.
   * Ejecutar `git add .`, `git commit` y `git push origin main`.
