// === MENÚ HAMBURGUESA ANIMADO ===
const hamburguesa = document.querySelector("#hamburguer");
const enlaces = document.querySelector("#nav-link");

if (hamburguesa && enlaces) {
  hamburguesa.addEventListener("click", () => {
    enlaces.classList.toggle("show");
    hamburguesa.classList.toggle("active"); // anima las barras
  });
}

// === FUNCIÓN GENERAL PARA ABRIR MODALES ===
function abrirModalGeneral(idTemplate) {
  const template = document.getElementById(idTemplate);
  if (!template) return;

  const clone = template.content.cloneNode(true);
  const modalContent = document.getElementById("modalContent");
  const modal = document.getElementById("modalGeneralContainer");

  // Limpiar contenido previo y agregar el clon
  modalContent.innerHTML = "";
  modalContent.appendChild(clone);
  modal.classList.add("show");

  // === Inicializar el chatbot si existe ===
  const sendBtn = modalContent.querySelector("#sendBtn");
  const chatInput = modalContent.querySelector("#chatInput");
  const chatMessages = modalContent.querySelector("#chatMessages");

  if (sendBtn && chatInput && chatMessages) {
    function agregarMensaje(texto, clase) {
      const p = document.createElement("div");
      p.textContent = texto;
      p.className = clase;
      chatMessages.appendChild(p);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendBtn.addEventListener("click", async () => {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;

      // Mostrar mensaje del usuario
      agregarMensaje("Tú: " + userMessage, "chat-user");
      chatInput.value = "";

      try {
        // Llamada al servidor local
        const response = await fetch("http://127.0.0.1:5000/preguntar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pregunta: userMessage }),
        });

        const data = await response.json();

        // --- Mensaje de la IA con avatar ---
        const botDiv = document.createElement("div");
        botDiv.classList.add("chat-bot");

        const avatar = document.createElement("img");
        avatar.src = "static/image/brattyface2.jpg"; // Ruta de tu avatar
        avatar.classList.add("avatar-ia");

        const texto = document.createElement("span");
        texto.textContent = data.respuesta;

        botDiv.appendChild(avatar);
        botDiv.appendChild(texto);

        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (err) {
        agregarMensaje("Error al conectar con el servidor.", "chat-error");
        console.error(err);
      }
    });

    // Permitir enviar con Enter
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

  setTimeout(() => {
    if (window.inicializarChatbot) {
      window.inicializarChatbot();
    }
  }, 200);
}

// === FUNCIONES ESPECÍFICAS DE MODALES ===
function abrirModalcontacto() {
  abrirModalGeneral("modalGeneralcontacto");
}
function abrirModalvideo() {
  abrirModalGeneral("modalGeneralvideo");
}
function abrirModaldrogas() {
  abrirModalGeneral("modalGeneraldrogas");
}
function abrirModalinicio() {
  abrirModalGeneral("modalGeneralinicio");
}
function abrirModalfentanilo() {
  abrirModalGeneral("modalGeneralfentanilo");
}
function abrirModalcannabis() {
  abrirModalGeneral("modalGeneralcannabis");
}
function abrirModalcocaina() {
  abrirModalGeneral("modalGeneralcocaina");
}
function abrirModalnicotina() {
  abrirModalGeneral("modalGeneralnicotina");
}
function abrirModalalcohol() {
  abrirModalGeneral("modalGeneralalcohol");
}
function abrirModalxanax() {
  abrirModalGeneral("modalGeneralxanax");
}
function abrirModalmarihuana() {
  abrirModalGeneral("modalGeneralmarihuana");
}
function abrirModalopioides() {
  abrirModalGeneral("modalGeneralopioides");
}
function abrirModallsd() {
  abrirModalGeneral("modalGenerallsd");
}
function abrirModalcrack() {
  abrirModalGeneral("modalGeneralcrack");
}

// === FUNCIÓN GENERAL PARA CERRAR MODAL ===
function cerrarModalGeneral() {
  const modal = document.getElementById("modalGeneralContainer");
  const modalContent = document.getElementById("modalContent");

  modal.classList.remove("show");
  modal.offsetHeight; // Forzar reflujo
  modal.classList.add("hide");
  modalContent.classList.add("hide");

  setTimeout(() => {
    modal.classList.remove("hide");
    modalContent.classList.remove("hide");
    modalContent.innerHTML = "";
  }, 400); // tiempo igual a la duración de la animación CSS
}

// === OPCIONAL: CERRAR MODAL AL HACER CLIC FUERA ===
document.addEventListener("click", (e) => {
  const modal = document.getElementById("modalGeneralContainer");
  if (modal && modal.classList.contains("show") && e.target === modal) {
    cerrarModalGeneral();
  }
});
