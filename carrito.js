// Definición de productos
const productos = {
    "red-velvet": {
        id: "red-velvet",
        nombre: "Pastel Red Velvet",
        precio: 600,
        descripcion: "Porción individual de 4 oz, bizcocho rojo suave con frosting de queso crema."
    },
    "tiramisu": {
        id: "tiramisu",
        nombre: "Postre Tiramisú",
        precio: 70,
        descripcion: "Postre italiano con café, crema suave y cacao espolvoreado."
    },
    "mini-pie-limon": {
        id: "mini-pie-limon",
        nombre: "Mini Pie de Limón",
        precio: 70,
        descripcion: "Relleno cítrico con base crujiente y cobertura cremosa."
    },
    "caja-brownies": {
        id: "caja-brownies",
        nombre: "Caja de Brownies",
        precio: 650,
        descripcion: "Brownies de chocolate intensos, suaves por dentro, ideales para compartir."
    }
};

// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

// Guardar carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar contadores en index.html
function actualizarContadoresIndex() {
    Object.keys(productos).forEach(id => {
        const span = document.getElementById("cant-" + id);
        if (span) {
            span.textContent = carrito[id]?.cantidad || 0;
        }
    });
}

// Lógica en la página de catálogo (index.html)
document.addEventListener("DOMContentLoaded", () => {
    const botonesCarrito = document.querySelectorAll(".btn-carrito");
    if (botonesCarrito.length > 0) {
        botonesCarrito.forEach(boton => {
            boton.addEventListener("click", () => {
                const id = boton.dataset.id;
                if (!carrito[id]) {
                    carrito[id] = { ...productos[id], cantidad: 1 };
                } else {
                    carrito[id].cantidad++;
                }
                guardarCarrito();
                actualizarContadoresIndex();
            });
        });

        actualizarContadoresIndex();
    }

    // Lógica en la página del carrito (mercado.html)
    const listaCarrito = document.getElementById("lista-carrito");
    const totalEl = document.getElementById("total");
    const btnVaciar = document.getElementById("btn-vaciar");
    const btnWhatsapp = document.getElementById("btn-whatsapp");

    if (listaCarrito && totalEl) {
        renderCarrito(listaCarrito, totalEl);
    }

    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            carrito = {};
            guardarCarrito();
            renderCarrito(listaCarrito, totalEl);
        });
    }

    if (btnWhatsapp) {
        btnWhatsapp.addEventListener("click", () => {
            const mensaje = generarMensajeWhatsapp();
            if (!mensaje) return;
            const telefono = "50558300624"; // tu número sin + ni espacios
            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, "_blank");
        });
    }
});

// Renderizar carrito en mercado.html
function renderCarrito(contenedor, totalEl) {
    contenedor.innerHTML = "";
    let total = 0;

    const ids = Object.keys(carrito);
    if (ids.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalEl.textContent = "";
        return;
    }

    ids.forEach(id => {
        const item = carrito[id];
        const linea = document.createElement("div");
        linea.classList.add("item-carrito");
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        linea.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: C$${subtotal}</p>
        `;
        contenedor.appendChild(linea);
    });

    totalEl.textContent = `Total: C$${total}`;
}

// Generar mensaje para WhatsApp
function generarMensajeWhatsapp() {
    const ids = Object.keys(carrito);
    if (ids.length === 0) {
        alert("Tu carrito está vacío.");
        return "";
    }

    let mensaje = "Hola, quiero hacer un pedido:%0A%0A";

    ids.forEach(id => {
        const item = carrito[id];
        mensaje += `• ${item.cantidad} x ${item.nombre} (C$${item.precio} c/u)%0A`;
    });

    mensaje += "%0AGracias.";

    return decodeURIComponent(mensaje);
}
