// === MENÚ HAMBURGUESA ANIMADO ===
const hamburguesa = document.querySelector('#hamburguer');
const enlaces = document.querySelector('#nav-link');

if (hamburguesa && enlaces) {
  hamburguesa.addEventListener('click', () => {
    enlaces.classList.toggle('show');
    hamburguesa.classList.toggle('active'); // anima las barras
  });
}

// === FUNCIÓN GENERAL PARA ABRIR MODALES ===
function abrirModalGeneral(idTemplate) {
  const template = document.getElementById(idTemplate);
  if (!template) return;

  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById('modalContent');
  const modal = document.getElementById('modalGeneralContainer');

  // Limpiar contenido previo y agregar el clon
  modalContent.innerHTML = '';
  modalContent.appendChild(clone);
  modal.classList.add('show');

  // === Inicializar el chatbot si existe ===
  const sendBtn = modalContent.querySelector('#sendBtn');
  const chatInput = modalContent.querySelector('#chatInput');
  const chatMessages = modalContent.querySelector('#chatMessages');

  if (sendBtn && chatInput && chatMessages) {
    sendBtn.addEventListener('click', async () => {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;

      // Mostrar mensaje del usuario
      const userDiv = document.createElement('div');
      userDiv.textContent = userMessage;
      userDiv.classList.add('chat-user');
      chatMessages.appendChild(userDiv);

      chatInput.value = '';

      // Llamada a la IA
      const botResponse = await obtenerRespuestaIA(userMessage); // tu función de JS del chatbot

      const botDiv = document.createElement('div');
      botDiv.textContent = botResponse;
      botDiv.classList.add('chat-bot');
      chatMessages.appendChild(botDiv);

      // Auto-scroll al final
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }
  setTimeout(() => {
        if (window.inicializarChatbot) {
            window.inicializarChatbot();
        }
    }, 200);
}


// === FUNCIONES ESPECÍFICAS DE MODALES ===
function abrirModalcontacto() { abrirModalGeneral('modalGeneralcontacto'); }
function abrirModalvideo() { abrirModalGeneral('modalGeneralvideo'); }
function abrirModaldrogas() { abrirModalGeneral('modalGeneraldrogas'); }
function abrirModalinicio() { abrirModalGeneral('modalGeneralinicio'); }
function abrirModalfentanilo() { abrirModalGeneral('modalGeneralfentanilo');}
function abrirModalcannabis() { abrirModalGeneral('modalGeneralcannabis');}
function abrirModalcocaina() { abrirModalGeneral('modalGeneralcocaina');}
function abrirModalnicotina() { abrirModalGeneral('modalGeneralnicotina');}
function abrirModalalcohol() { abrirModalGeneral('modalGeneralalcohol');}
function abrirModalxanax() { abrirModalGeneral('modalGeneralxanax');}

// === FUNCIÓN GENERAL PARA CERRAR MODAL ===
function cerrarModalGeneral() {
  const modal = document.getElementById('modalGeneralContainer');
  const modalContent = document.getElementById('modalContent');

  modal.classList.remove('show');
  modal.offsetHeight; // Forzar reflujo
  modal.classList.add('hide');
  modalContent.classList.add('hide');

  setTimeout(() => {
    modal.classList.remove('hide');
    modalContent.classList.remove('hide');
    modalContent.innerHTML = '';
  }, 400); // tiempo igual a la duración de la animación CSS
}



// === OPCIONAL: CERRAR MODAL AL HACER CLIC FUERA ===
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modalGeneralContainer');
  if (modal && modal.classList.contains('show') && e.target === modal) {
    cerrarModalGeneral();
  }
});