// ==================== CHATBOT.JS ====================
function inicializarChatbot() {
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!chatMessages || !chatInput || !sendBtn) {
    console.error("Elementos del chatbot no encontrados");
    return;
  }

  function agregarMensaje(texto, clase) {
    const p = document.createElement("p");
    p.textContent = texto;
    p.className = clase;
    chatMessages.appendChild(p);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Enviar mensaje al servidor Flask
  sendBtn.addEventListener("click", () => {
    const pregunta = chatInput.value.trim();
    if (!pregunta) return;

    agregarMensaje("Tú: " + pregunta, "mensaje-usuario");
    chatInput.value = "";

    fetch("http://127.0.0.1:5000/preguntar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta }),
    })
      .then((res) => res.json())
      .then((data) => {
        agregarMensaje("BrattyIA: " + data.respuesta, "mensaje-ia");
      })
      .catch((err) => {
        agregarMensaje("Error al conectar con el servidor.", "mensaje-error");
        console.error(err);
      });
  });

  // Enviar con Enter
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });
}
