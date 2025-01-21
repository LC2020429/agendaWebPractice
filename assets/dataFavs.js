// Ejemplo de cómo agregar un contacto dinámicamente
function agregarContacto(nombre, numero, direccion, correo) {
    const tbody = document.getElementById("contactos-list");
  
    const tr = document.createElement("tr");
  
    // Crear la celda de la estrella
    const tdFavorito = document.createElement("td");
    const starIcon = document.createElement("span");
    starIcon.innerHTML = "&#9733;"; // Carácter de estrella
    starIcon.classList.add("star");
    starIcon.addEventListener("click", () => toggleFavorito(starIcon));
    tdFavorito.appendChild(starIcon);
    tr.appendChild(tdFavorito);
  
    // Crear las celdas con la información del contacto
    const tdNombre = document.createElement("td");
    tdNombre.textContent = nombre;
    tr.appendChild(tdNombre);
  
    const tdNumero = document.createElement("td");
    tdNumero.textContent = numero;
    tr.appendChild(tdNumero);
  
    const tdDireccion = document.createElement("td");
    tdDireccion.textContent = direccion;
    tr.appendChild(tdDireccion);
  
    const tdCorreo = document.createElement("td");
    tdCorreo.textContent = correo;
    tr.appendChild(tdCorreo);
  
    // Crear una celda de acciones (puedes añadir botones o enlaces)
    const tdAcciones = document.createElement("td");
  

  
    // Agregar la nueva fila al tbody
    tbody.appendChild(tr);
  }
  
  // Ejemplo de agregar un contacto automáticamente
  agregarContacto(
    "Mamá",
    "98765432",
    "Venezuela",
    "maria@correo.com"
  );
  agregarContacto(
    "Papá",
    "45454545",
    "Peru",
    "abc@correo.com"
  );

  