# Check de Entrevistas

Aplicación web para gestionar y evaluar entrevistas técnicas de perfiles de Gobierno de Datos.

**Live Demo:** [https://mjmc4498.github.io/CheckDeEntrevistas](https://mjmc4498.github.io/CheckDeEntrevistas)

## Características

*   **Formulario de Evaluación Dinámico:** Agrega, edita y elimina competencias técnicas a evaluar.
*   **Evaluación Automática:** Calcula un puntaje total y sugiere un nivel de seniority (Junior, Semi Senior, Senior).
*   **Backlog de Entrevistas:** Visualiza todas las entrevistas registradas en una tabla con funcionalidades de orden, filtro y exportación a CSV.
*   **Dashboard de Visualización:**
    *   Gráfico de radar para el perfil del candidato.
    *   Gráfico de barras con la distribución de niveles.
*   **Funcionamiento Local:** No requiere conexión a internet.
*   **Interfaz Intuitiva:** Diseño responsive con modo oscuro opcional.

## Instalación

Para ejecutar la aplicación localmente, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/mjmc4498/CheckDeEntrevistas.git
    cd CheckDeEntrevistas
    ```

2.  **Crea un entorno virtual (recomendado):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

3.  **Instala las dependencias:**
    ```bash
    pip install Flask
    ```

4.  **Ejecuta la aplicación:**
    ```bash
    python app.py
    ```

5.  Abre tu navegador y ve a `http://127.0.0.1:5000`.

## Manual de Usuario

### 1. Formulario de Evaluación

*   **Completa los campos básicos:** Nombre del candidato, nombre del evaluador y fecha.
*   **Agrega competencias:** Haz clic en "Agregar Competencia" para añadir una nueva habilidad a evaluar.
*   **Puntúa las competencias:** Asigna un puntaje de 1 a 10 para cada competencia.
*   **Guarda la entrevista:** Haz clic en "Guardar Entrevista" para almacenar los datos.

### 2. Backlog de Entrevistas

*   **Visualiza las entrevistas:** Navega a la sección "Backlog" para ver todas las entrevistas guardadas.
*   **Ordena la tabla:** Haz clic en los encabezados de las columnas para ordenar los datos.
*   **Filtra los resultados:** Usa el campo de búsqueda para filtrar las entrevistas por cualquier campo.
*   **Exporta a CSV:** Haz clic en "Exportar a CSV" para descargar los datos en formato CSV.

### 3. Dashboard

*   **Gráfico de Barras:** Muestra la distribución de candidatos por nivel de seniority.
*   **Gráfico de Radar:** Visualiza el perfil de competencias del último candidato evaluado.

### 4. Modo Oscuro

*   Activa el modo oscuro usando el interruptor en la barra lateral.

## Autor

*   **[mjmc4498](https://github.com/mjmc4498)**
