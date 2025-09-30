// Menú hamburguesa
const hamburguesa = document.querySelector('#hamburguer');
const enlaces = document.querySelector('#nav-link');
if (hamburguesa && enlaces) {
  hamburguesa.addEventListener('click', () => {
    enlaces.classList.toggle('show');
  });
}

// Funciones del modal
function abrirModal() {
  const template = document.getElementById('modalGeneralTemplate');
  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = ''; // Limpiar contenido anterior
  modalContent.appendChild(clone);
  
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'flex';
}

function cerrarModalGeneral() {
  const modal = document.getElementById('modalGeneralContainer');
  modal.style.display = 'none';
  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = '';
}
