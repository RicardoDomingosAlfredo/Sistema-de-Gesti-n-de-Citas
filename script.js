function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!username || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Simulación de verificación de credenciales
  // Redirige al panel correspondiente
  switch (role) {
    case "ciudadano":
      window.location.href = "panel_ciudadano.html";
      break;
    case "funcionario":
      window.location.href = "panel_funcionario.html";
      break;
    case "admin":
      window.location.href = "panel_administrador.html";
      break;
    default:
      alert("Rol no reconocido.");
  }
}

function register() {
  const user = document.getElementById("newUser").value;
  const email = document.getElementById("newEmail").value;
  const pass = document.getElementById("newPassword").value;
  const role = document.getElementById("newRole").value;

  if (!user || !email || !pass) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  alert(`Usuario ${user} registrado exitosamente como ${role}`);
  window.location.href = "index.html";
}
