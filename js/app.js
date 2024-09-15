let listaEstudiantes = [];
let listaCursos = [];
let listaProfesores = [];

let editandoEstudiante = false;
let estudianteEditandoId = null;

let editandoCurso = false;
let cursoEditandoId = null;

let editandoProfesor = false;
let profesorEditandoId = null;

const formEstudiante = document.querySelector('#formEstudiante');
const formCurso = document.querySelector('#formCurso');
const formProfesor = document.querySelector('#formProfesor');
const formMateria = document.querySelector('#formMateria');
const nombreEstudianteInput = document.querySelector('#nombreEstudiante');
const nombreCursoInput = document.querySelector('#nombreCurso');
const nombreProfesorInput = document.querySelector('#nombreProfesor');
const nombreMateriaInput = document.querySelector('#nombreMateria');
const cursosEstudianteSelect = document.querySelector('#cursosEstudiante');
const profesorMateriaSelect = document.querySelector('#profesorMateria');
const buscarEstudiantesInput = document.querySelector('#buscarEstudiantes');

// Función para mostrar los cursos solo en el menú de selección y evitar que aparezcan fuera del select
function mostrarCursos() {
    actualizarCursosEnFormulario();
}

// Actualizar Cursos en el formulario de estudiantes
function actualizarCursosEnFormulario() {
    cursosEstudianteSelect.innerHTML = '';  // Limpiamos el select antes de agregar nuevos cursos
    listaCursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = curso.nombre;
        cursosEstudianteSelect.appendChild(option);
    });
}

// Agregar Cursos
if (formCurso) {
    formCurso.addEventListener('submit', (e) => {
        e.preventDefault();
        if (nombreCursoInput.value === '') {
            alert('El nombre del curso es obligatorio.');
            return;
        }

        const nuevoCurso = {
            id: Date.now(),
            nombre: nombreCursoInput.value
        };

        listaCursos.push(nuevoCurso);  // Agregamos el nuevo curso a la lista
        nombreCursoInput.value = '';  // Limpiamos el input después de registrar el curso
        mostrarCursos();  // Actualizamos el select de cursos
    });
}

// Agregar Estudiantes
if (formEstudiante) {
    formEstudiante.addEventListener('submit', (e) => {
        e.preventDefault();
        if (nombreEstudianteInput.value === '' || cursosEstudianteSelect.selectedOptions.length === 0) {
            alert('El nombre del estudiante y al menos un curso son obligatorios.');
            return;
        }

        const cursosSeleccionados = Array.from(cursosEstudianteSelect.selectedOptions).map(option => ({
            id: option.value,
            nombre: option.textContent
        }));

        if (editandoEstudiante) {
            const estudiante = listaEstudiantes.find(est => est.id === estudianteEditandoId);
            estudiante.nombre = nombreEstudianteInput.value;
            estudiante.cursos = cursosSeleccionados;

            editandoEstudiante = false;
            estudianteEditandoId = null;
            formEstudiante.querySelector('button[type="submit"]').textContent = 'Agregar Estudiante';
        } else {
            const nuevoEstudiante = {
                id: Date.now(),
                nombre: nombreEstudianteInput.value,
                cursos: cursosSeleccionados
            };
            listaEstudiantes.push(nuevoEstudiante);
        }

        nombreEstudianteInput.value = '';
        cursosEstudianteSelect.value = '';
        mostrarEstudiantes();
    });
}

// Mostrar Estudiantes con botones de editar y eliminar
function mostrarEstudiantes() {
    const divEstudiantes = document.querySelector('.div-estudiantes');
    divEstudiantes.innerHTML = '';  // Limpiamos la lista de estudiantes antes de agregar los nuevos

    listaEstudiantes.forEach(estudiante => {
        const { id, nombre, cursos } = estudiante;
        const parrafo = document.createElement('p');

        const texto = document.createElement('span');
        const nombresCursos = cursos.map(curso => curso.nombre).join(', ');
        texto.textContent = `${nombre} - Cursos: ${nombresCursos}`;
        parrafo.appendChild(texto);

        // Crear contenedor para los botones
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        // Botón de Editar
        const editarBoton = document.createElement('button');
        editarBoton.innerHTML = '<i class="fas fa-edit"></i>';
        editarBoton.classList.add('btn', 'btn-editar');
        editarBoton.onclick = () => cargarEstudiante(estudiante);
        btnGroup.appendChild(editarBoton);

        // Botón de Eliminar
        const eliminarBoton = document.createElement('button');
        eliminarBoton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.onclick = () => eliminarEstudiante(id);
        btnGroup.appendChild(eliminarBoton);

        parrafo.appendChild(btnGroup);  // Añadir el grupo de botones al párrafo
        divEstudiantes.appendChild(parrafo);  // Añadir el estudiante con sus botones a la lista
    });
}

// Función para cargar los datos de un estudiante en el formulario para editar
function cargarEstudiante(estudiante) {
    nombreEstudianteInput.value = estudiante.nombre;
    editandoEstudiante = true;
    estudianteEditandoId = estudiante.id;
    formEstudiante.querySelector('button[type="submit"]').textContent = 'Actualizar Estudiante';

    cursosEstudianteSelect.querySelectorAll('option').forEach(option => {
        option.selected = estudiante.cursos.some(curso => curso.id == option.value);
    });
}

// Función para eliminar un estudiante
function eliminarEstudiante(id) {
    if (confirm('¿Seguro que quieres eliminar este estudiante?')) {
        listaEstudiantes = listaEstudiantes.filter(est => est.id !== id);
        mostrarEstudiantes();  // Volvemos a mostrar los estudiantes tras la eliminación
    }
}

// Agregar Profesores
if (formProfesor) {
    formProfesor.addEventListener('submit', (e) => {
        e.preventDefault();
        if (nombreProfesorInput.value === '') {
            alert('El nombre del profesor es obligatorio.');
            return;
        }

        if (editandoProfesor) {
            const profesor = listaProfesores.find(prof => prof.id === profesorEditandoId);
            profesor.nombre = nombreProfesorInput.value;

            editandoProfesor = false;
            profesorEditandoId = null;
            formProfesor.querySelector('button[type="submit"]').textContent = 'Agregar Profesor';
        } else {
            const nuevoProfesor = {
                id: Date.now(),
                nombre: nombreProfesorInput.value,
                materias: []
            };
            listaProfesores.push(nuevoProfesor);
        }

        nombreProfesorInput.value = '';
        mostrarProfesores();
        actualizarProfesoresEnFormulario();
    });
}

// Mostrar Profesores con botones de editar y eliminar
function mostrarProfesores() {
    const divProfesores = document.querySelector('.div-profesores');
    divProfesores.innerHTML = '';  // Limpiamos la lista de profesores antes de agregar los nuevos

    listaProfesores.forEach(profesor => {
        const { id, nombre, materias } = profesor;
        const parrafo = document.createElement('p');

        const texto = document.createElement('span');
        const nombresMaterias = materias.join(', ');
        texto.textContent = `${nombre} - Materias: ${nombresMaterias}`;
        parrafo.appendChild(texto);

        // Crear contenedor para los botones
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btn-group');

        // Botón de Editar
        const editarBoton = document.createElement('button');
        editarBoton.innerHTML = '<i class="fas fa-edit"></i>';
        editarBoton.classList.add('btn', 'btn-editar');
        editarBoton.onclick = () => cargarProfesor(profesor);
        btnGroup.appendChild(editarBoton);

        // Botón de Eliminar
        const eliminarBoton = document.createElement('button');
        eliminarBoton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.onclick = () => eliminarProfesor(id);
        btnGroup.appendChild(eliminarBoton);

        parrafo.appendChild(btnGroup);  // Añadir el grupo de botones al párrafo
        divProfesores.appendChild(parrafo);  // Añadir el profesor con sus botones a la lista
    });
}

// Función para cargar los datos de un profesor en el formulario para editar
function cargarProfesor(profesor) {
    nombreProfesorInput.value = profesor.nombre;
    editandoProfesor = true;
    profesorEditandoId = profesor.id;
    formProfesor.querySelector('button[type="submit"]').textContent = 'Actualizar Profesor';
}

// Función para eliminar un profesor
function eliminarProfesor(id) {
    if (confirm('¿Seguro que quieres eliminar este profesor?')) {
        listaProfesores = listaProfesores.filter(prof => prof.id !== id);
        mostrarProfesores();  // Volvemos a mostrar los profesores tras la eliminación
        actualizarProfesoresEnFormulario();
    }
}

// Función para asignar Materia a Profesor
if (formMateria) {
    formMateria.addEventListener('submit', (e) => {
        e.preventDefault();
        if (profesorMateriaSelect.value === '' || nombreMateriaInput.value === '') {
            alert('Debe seleccionar un profesor y escribir una materia.');
            return;
        }

        const profesor = listaProfesores.find(prof => prof.id == profesorMateriaSelect.value);
        profesor.materias.push(nombreMateriaInput.value);
        nombreMateriaInput.value = '';
        mostrarProfesores();
    });
}

// Actualizar profesores en el formulario de materias
function actualizarProfesoresEnFormulario() {
    profesorMateriaSelect.innerHTML = '';
    listaProfesores.forEach(profesor => {
        const option = document.createElement('option');
        option.value = profesor.id;
        option.textContent = profesor.nombre;
        profesorMateriaSelect.appendChild(option);
    });
}

// Filtrar Estudiantes
function filtrarEstudiantes() {
    const texto = buscarEstudiantesInput.value.toLowerCase();
    const estudiantesFiltrados = listaEstudiantes.filter(est => est.nombre.toLowerCase().includes(texto));
    
    const divEstudiantes = document.querySelector('.div-estudiantes');
    divEstudiantes.innerHTML = '';

    estudiantesFiltrados.forEach(estudiante => {
        const { nombre, cursos } = estudiante;
        const parrafo = document.createElement('p');
        const nombresCursos = cursos.map(curso => curso.nombre).join(', ');
        parrafo.textContent = `${nombre} - Cursos: ${nombresCursos}`;
        divEstudiantes.appendChild(parrafo);
    });
}

// Inicializar datos cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCursos();
    mostrarEstudiantes();
    mostrarProfesores();
});
