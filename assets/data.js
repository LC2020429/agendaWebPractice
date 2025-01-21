document.addEventListener("DOMContentLoaded", () => {
  const modalAgregar = document.getElementById("modalAgregarContacto");
  const modalInfo = document.getElementById("modalInfoContacto");
  const btnAgregar = document.getElementById("btnAgregarContacto");
  const closeBtnAgregar = document.querySelector(".close");
  const closeBtnInfo = document.querySelector(".close-info");
  const btnGuardar = document.getElementById("guardarContacto");

  /*duda porque tengo que inizializar el evento para que escucche antes*/
  btnBuscar.addEventListener("click", metodoBuscar);
  buscarContacto.addEventListener("input", metodoBuscar);

  // Datos quemados (contactos iniciales)
  const contactosIniciales = [
    {
      nombre: "Juan Pérez",
      numero: "12345678",
      direccion: "Calle a",
      correo: "juan@correo.com",
      pais: "VENEZUELA",
      cumple: "15/05/---",
    },
    {
      nombre: "Maria Gómez",
      numero: "98765432",
      direccion: "avenida elena",
      correo: "maria@correo.com",
      pais: "VENEZUELA",
      cumple: "15/05/---",
    },
    {
      nombre: "Carlos Ramírez",
      numero: "55555555",
      direccion: "petapa",
      correo: "carlos@correo.com",
      pais: "VENEZUELA",
      cumple: "15/05/---",
    },
    {
      nombre: "Ana Torres",
      numero: "66666666",
      direccion: "mixco",
      correo: "ana@correo.com",
      pais: "VENEZUELA",
      cumple: "15/05/---",
    },
    {
      nombre: "Pedro Jiménez",
      numero: "77777777",
      direccion: "las americas",
      correo: "pedro@correo.com",
      pais: "VENEZUELA",
      cumple: "15/05/---",
    },
  ];

  // Cargar contactos quemados al iniciar
  contactosIniciales.forEach((contacto) => {
    agregarContacto(
      contacto.nombre,
      contacto.numero,
      contacto.direccion,
      contacto.correo,
      contacto.pais,
      contacto.cumple
    );
  });

  // Abrir y cerrar los modales
  btnAgregar.addEventListener("click", () => toggleModal(modalAgregar, true));
  closeBtnAgregar.addEventListener("click", () =>
    toggleModal(modalAgregar, false)
  );
  closeBtnInfo.addEventListener("click", () => toggleModal(modalInfo, false));

  window.addEventListener("click", (event) => {
    if (event.target === modalAgregar) toggleModal(modalAgregar, false);
    if (event.target === modalInfo) toggleModal(modalInfo, false);
  });

  // Manejo del botón para guardar contacto
  btnGuardar.addEventListener("click", handleFormSubmit);
});

// Función para abrir/cerrar un modal
const toggleModal = (modal, isOpen) => {
  modal.style.display = isOpen ? "flex" : "none";
};

// Función para manejar el envío del formulario
const handleFormSubmit = () => {
  const nombre = document.getElementById("nombre").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const pais = document.getElementById("pais").value.trim();
  const cumple = document.getElementById("cumple").value.trim();

  if (!nombre || !numero) {
    alert("El nombre y el número son obligatorios.");
    return;
  }

  agregarContacto(nombre, numero, direccion, correo, pais, cumple);
  toggleModal(document.getElementById("modalAgregarContacto"), false);
  document.getElementById("formAgregarContacto").reset(); // Limpiar formulario
};

// Función para agregar un contacto dinámicamente
const agregarContacto = (nombre, numero, direccion, correo, pais, cumple) => {
  const tbody = document.getElementById("contactos-list");

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><span class="star">&#9733;</span></td>
    <td>${nombre}</td>
    <td>${numero}</td>
    <td>${direccion}</td>
    <td>${correo}</td>
    <td>
      <button class="editar">Editar</button>
      <button class="eliminar">Eliminar</button>
      <button class="infoComp">Más información</button>
    </td>
  `;

  // Evento para marcar favorito
  tr.querySelector(".star").addEventListener("click", (event) => {
    event.target.classList.toggle("favorito");
  });

  // Evento para eliminar contacto
  tr.querySelector(".eliminar").addEventListener("click", () => tr.remove());

  // Evento para editar contacto
  tr.querySelector(".editar").addEventListener("click", () =>
    editarContacto(tr, nombre, numero, direccion, correo, pais, cumple)
  );

  // Evento para mostrar información del contacto
  tr.querySelector(".infoComp").addEventListener("click", () =>
    mostrarInfoContacto(nombre, numero, direccion, correo, pais, cumple)
  );

  tbody.appendChild(tr);
};

// Función para editar un contacto
const editarContacto = (
  row,
  nombre,
  numero,
  direccion,
  correo,
  pais,
  cumple
) => {
  document.getElementById("nombre").value = nombre;
  document.getElementById("numero").value = numero;
  document.getElementById("direccion").value = direccion;
  document.getElementById("correo").value = correo;
  document.getElementById("pais").value = pais;
  document.getElementById("cumple").value = cumple;

  toggleModal(document.getElementById("modalAgregarContacto"), true);
  row.remove();
};

// Función para mostrar la información del contacto

const mostrarInfoContacto = (
  nombre,
  numero,
  direccion,
  correo,
  pais,
  cumple
) => {
  document.getElementById("infoNombre").textContent = nombre;
  document.getElementById("infoNumero").textContent = numero;
  document.getElementById("infoDireccion").textContent = direccion;
  document.getElementById("infoCorreo").textContent = correo;
  document.getElementById("infoPais").textContent = pais;
  document.getElementById("infoCumple").textContent = cumple;

  toggleModal(document.getElementById("modalInfoContacto"), true);
};

const buscarContacto = document.getElementById("searchInput");
const btnBuscar = document.getElementById("btnBuscar");
const metodoBuscar = () => {
  const textoBusqueda = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filas = document
    .getElementById("contactos-list")
    .getElementsByTagName("tr");

  for (let fila of filas) {
    const nombreContacto = fila
      .getElementsByTagName("td")[1]
      .textContent.toLowerCase();

    if (nombreContacto.includes(textoBusqueda)) {
      fila.style.display = ""; // Mostrar la fila si coincide con la búsqueda
    } else {
      fila.style.display = "none"; // Ocultar la fila si no coincide
    }
  }
};
