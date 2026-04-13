let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadores() {
  Object.keys(carrito).forEach(id => {
    const span = document.getElementById("count-" + id);
    if (span) span.textContent = carrito[id];
  });
}

document.addEventListener("DOMContentLoaded", () => {

  // BOTONES PARA AGREGAR AL CARRITO
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      carrito[id] = (carrito[id] || 0) + 1;

      guardar();
      actualizarContadores();
    });
  });

  actualizarContadores();

  // SI ESTAMOS EN carrito.html
  const lista = document.getElementById("lista");
  const totalEl = document.getElementById("total");

  if (lista) renderCarrito(lista, totalEl);

  const btnW = document.getElementById("btn-whatsapp");
  if (btnW) btnW.onclick = () => {
    const msg = generarMensaje();
    window.open(`https://wa.me/50558300624?text=${encodeURIComponent(msg)}`);
  };
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

    total += cantidad * 1; // Si querés precios reales, te lo agrego luego
  });

  totalEl.textContent = `Total: ${total}`;
}

function generarMensaje() {
  let msg = "Hola, quiero hacer un pedido:%0A%0A";

  Object.keys(carrito).forEach(id => {
    msg += `• ${carrito[id]} x ${id}%0A`;
  });

  msg += "%0AGracias.";
  return msg;
}
