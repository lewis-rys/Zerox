// Menú hamburguesa
const hamburguesa = document.querySelector('#hamburguer');
const enlaces = document.querySelector('#nav-link');
if (hamburguesa && enlaces) {
  hamburguesa.addEventListener('click', () => {
    enlaces.classList.toggle('show');
  });
}

// Funciones del modal Contacto
function abrirModalcontacto() {
  const template = document.getElementById('modalGeneralcontacto');
  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = ''; // Limpiar contenido anterior
  modalContent.appendChild(clone);
  
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'flex';
}

// Funciones del modal Video
function abrirModalvideo() {
  const template = document.getElementById('modalGeneralvideo');
  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = ''; // Limpiar contenido anterior
  modalContent.appendChild(clone);
  
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'flex';
}

// Funciones del modal Drogas
function abrirModaldrogas() {
  const template = document.getElementById('modalGeneraldrogas');
  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = ''; // Limpiar contenido anterior
  modalContent.appendChild(clone);
  
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'flex';
}

// Funciones del modal Inicio
function abrirModalinicio() {
  const template = document.getElementById('modalGeneralinicio');
  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = ''; // Limpiar contenido anterior
  modalContent.appendChild(clone);
  
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'flex';
}
// funcion general cerrar modal
function cerrarModalGeneral() {
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'none';
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = '';
}