El Sistema de Gestión Académica es una plataforma diseñada para facilitar la administración de estudiantes, profesores y cursos en un entorno educativo. Este sistema está compuesto por una serie de archivos y tecnologías que trabajan en conjunto para ofrecer una experiencia de usuario intuitiva y eficiente. A continuación, se detalla la estructura y funcionalidad de cada componente:
1. Estructura HTML:
El sistema está basado en HTML para definir la estructura de las páginas web. Incluye varias secciones principales:
•	Página de Inicio: Ofrece una vista general del sistema y enlaces a las secciones de gestión de estudiantes y profesores.
•	Gestión de Estudiantes: Permite registrar nuevos cursos, estudiantes, y realizar búsquedas sobre los estudiantes ya registrados.
•	Gestión de Profesores: Facilita el registro de nuevos profesores, asignación de materias a los mismos y muestra una lista de profesores registrados.
Cada una de estas secciones se vincula mediante un menú de navegación consistente, que proporciona una navegación sencilla entre las diferentes áreas del sistema.
2. Estilos CSS:
El diseño visual del sistema es gestionado mediante CSS, que asegura una apariencia moderna y profesional:
•	Estilos Generales: Definen márgenes, fuentes y colores base para toda la aplicación.
•	Header y Menú de Navegación: Establecen el diseño del encabezado y el menú, incluyendo colores de fondo, tipografía y efectos de hover para los enlaces.
•	Formularios y Listados: Diseñan los formularios de entrada y las secciones de listado con bordes redondeados, sombras suaves y transiciones para una experiencia de usuario atractiva.
3. Lógica JavaScript:
La funcionalidad dinámica del sistema es implementada en JavaScript. Este código maneja la interacción con el usuario y el procesamiento de datos:
•	Gestión de Estudiantes: Incluye funciones para agregar, editar y eliminar estudiantes, así como para filtrar la lista de estudiantes según el nombre.
•	Gestión de Cursos y Profesores: Permite la adición y actualización de cursos y profesores, y la asignación de materias a los profesores. Las listas de cursos y profesores se actualizan automáticamente en los formularios correspondientes.
•	Interacción y Actualización del DOM: Utiliza eventos y manipulación del DOM para actualizar la interfaz en tiempo real según las acciones del usuario.
4. Integración y Flujo de Trabajo:
•	Interfaz de Usuario: Los usuarios interactúan con la interfaz a través de formularios y botones, que están estilizados y funcionales gracias a la combinación de HTML y CSS.
•	Gestión Dinámica: La lógica de JavaScript maneja las operaciones de CRUD (Crear, Leer, Actualizar, Eliminar) para estudiantes, cursos y profesores, actualizando la interfaz según sea necesario.
•	Persistencia de Datos: Aunque en esta versión básica los datos no se almacenan permanentemente, el sistema está diseñado para manejar los datos en memoria y actualizar la visualización de manera eficiente.
