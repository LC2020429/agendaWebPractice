document.addEventListener("DOMContentLoaded", () => {
  /*Similar a como se llaman los elementos en java FX
    para ello lo que se inicializa es la interfaz de DOM, 
    para llamar estos componentes se llaman mediante la "id"
    los input son para la entrada de datos*/
  const usuarioInput = document.getElementById("usuario");
  const passwordInput = document.getElementById("password");
  const ingresarButton = document.getElementById("ingresar"); 


  ingresarButton.addEventListener("click", async (event) => {
    // siguiente linea proveniente de chat
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      await verificarCredenciales(usuario, password);
      console.log(`bienvenido ${usuario}`)
      limpiarFormulario();
      window.location.href = './pages/contactos.html'; // Redirige a la página agenda.html
    } catch (error) {
      console.log(`Contraseña o usuario incorrecto`)
      limpiarFormulario();
    }
  });

  // Simular la verificación de credenciales
  const verificarCredenciales = (usuario, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Agregacion de usuarios por medio de un array
        let usuarios = [
          { usuario: "Braulio", password: "admin" }
        ];

        let usuarioValido = usuarios.find(
          (user) => user.usuario === usuario && user.password === password
        );
        (usuarioValido)?resolve():reject();
      }, 100); // Simula un retraso de 1 segundo
    });
  };

  const limpiarFormulario = () => {
    usuarioInput.value = "";
    passwordInput.value = "";
  };
});
