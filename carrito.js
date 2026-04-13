// carrito.js

let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadores() {
  Object.keys(carrito).forEach(id => {
    const span = document.getElementById("count-" + id);
    if (span) {
      span.textContent = carrito[id];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // Botones para agregar al carrito
  const botones = document.querySelectorAll(".btn-add-cart");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      // Evita errores si el id está vacío
      if (!id || typeof id !== "string") return;

      carrito[id] = (carrito[id] || 0) + 1;

      guardar();
      actualizarContadores();
    });
  });

  actualizarContadores();

  // Si estamos en carrito.html
  const lista = document.getElementById("lista");
  const totalEl = document.getElementById("total");

  if (lista && totalEl) {
    renderCarrito(lista, totalEl);
  }

  // Botón de WhatsApp
  const btnW = document.getElementById("btn-whatsapp");
  if (btnW) {
    btnW.addEventListener("click", () => {
      const msg = generarMensaje();
      const url = "https://wa.me/50558300624?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    });
  }
});

function renderCarrito(contenedor, totalEl) {
  contenedor.innerHTML = "";
  let total = 0;

  Object.keys(carrito).forEach(id => {
    const cantidad = carrito[id];

    const div = document.createElement("div");
    div.classList.add("item");
    div.textContent = `${id} — Cantidad: ${cantidad}`;
    contenedor.appendChild(div);

    total += cantidad;
  });

  totalEl.textContent = `Total de productos: ${total}`;
}

function generarMensaje() {
  let msg = "Hola, quiero hacer un pedido:%0A%0A";

  Object.keys(carrito).forEach(id => {
    msg += `• ${carrito[id]} x ${id}%0A`;
  });

  msg += "%0AGracias.";
  return msg;
}
