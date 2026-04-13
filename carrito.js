// carrito.js

// CARRITO EN LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

// GUARDAR CARRITO
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ACTUALIZAR CONTADORES EN LAS TARJETAS
function actualizarContadores() {
  Object.keys(carrito).forEach(id => {
    const span = document.getElementById("count-" + id);
    if (span) span.textContent = carrito[id];
  });
}

// ACTUALIZAR SELECTOR DE CANTIDAD
function actualizarCantidad(id, nuevaCantidad) {
  const num = document.getElementById("cant-" + id);
  if (num) num.textContent = nuevaCantidad;
}

document.addEventListener("DOMContentLoaded", () => {

  // BOTONES + Y –
  document.querySelectorAll(".mas").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const num = document.getElementById("cant-" + id);
      let cantidad = parseInt(num.textContent);
      cantidad++;
      num.textContent = cantidad;
    });
  });

  document.querySelectorAll(".menos").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const num = document.getElementById("cant-" + id);
      let cantidad = parseInt(num.textContent);
      if (cantidad > 1) cantidad--;
      num.textContent = cantidad;
    });
  });

  // BOTÓN AGREGAR AL CARRITO
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      // CANTIDAD SELECCIONADA
      const cantidadSeleccionada = parseInt(
        document.getElementById("cant-" + id).textContent
      );

      // SUMAR AL CARRITO
      carrito[id] = (carrito[id] || 0) + cantidadSeleccionada;

      guardar();
      actualizarContadores();
    });
  });

  actualizarContadores();

  // SI ESTAMOS EN carrito.html
  const lista = document.getElementById("lista");
  const totalEl = document.getElementById("total");

  if (lista && totalEl) {
    renderCarrito(lista, totalEl);
  }

  // BOTÓN WHATSAPP
  const btnW = document.getElementById("btn-whatsapp");
  if (btnW) {
    btnW.addEventListener("click", () => {
      const msg = generarMensaje();
      const url = "https://wa.me/50558300624?text=" + encodeURIComponent(msg);
      window.open(url, "_blank");
    });
  }
});

// MOSTRAR CARRITO EN carrito.html
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

// MENSAJE PARA WHATSAPP
function generarMensaje() {
  let msg = "Hola, quiero hacer un pedido:%0A%0A";

  Object.keys(carrito).forEach(id => {
    msg += `• ${carrito[id]} x ${id}%0A`;
  });

  msg += "%0AGracias.";
  return msg;
}
