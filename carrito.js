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
        descripcion: "Relleno cítrico con base crujiente y topping cremoso."
    },
    "caja-brownies": {
        id: "caja-brownies",
        nombre: "Caja de Brownies",
        precio: 650,
        descripcion: "Brownies de chocolate intensos, suaves por dentro."
    }
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadores() {
    Object.keys(productos).forEach(id => {
        const span = document.getElementById("cant-" + id);
        if (span) span.textContent = carrito[id]?.cantidad || 0;
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".btn-carrito");
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;

            if (!carrito[id]) carrito[id] = { ...productos[id], cantidad: 1 };
            else carrito[id].cantidad++;

            guardar();
            actualizarContadores();
        });
    });

    actualizarContadores();

    const lista = document.getElementById("lista-carrito");
    const totalEl = document.getElementById("total");

    if (lista) renderCarrito(lista, totalEl);

    const btnVaciar = document.getElementById("btn-vaciar");
    if (btnVaciar) btnVaciar.onclick = () => {
        carrito = {};
        guardar();
        renderCarrito(lista, totalEl);
    };

    const btnW = document.getElementById("btn-whatsapp");
    if (btnW) btnW.onclick = () => {
        const msg = generarMensaje();
        if (!msg) return;
        const tel = "50558300624";
        window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`);
    };
});

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
        const p = carrito[id];
        const sub = p.precio * p.cantidad;
        total += sub;

        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <p>Cantidad: ${p.cantidad}</p>
            <p>Subtotal: C$${sub}</p>
        `;
        contenedor.appendChild(div);
    });

    totalEl.textContent = `Total: C$${total}`;
}

function generarMensaje() {
    const ids = Object.keys(carrito);
    if (ids.length === 0) {
        alert("Tu carrito está vacío.");
        return "";
    }

    let msg = "Hola, quiero hacer un pedido:%0A%0A";

    ids.forEach(id => {
        const p = carrito[id];
        msg += `• ${p.cantidad} x ${p.nombre} (C$${p.precio} c/u)%0A`;
    });

    msg += "%0AGracias.";

    return decodeURIComponent(msg);
}
