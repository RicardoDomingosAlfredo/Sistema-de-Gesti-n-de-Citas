function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!username || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }
<div class="form-group">
  <select id="role" required>
    <option value="">Seleccione su rol</option>
    <option value="ciudadano">Ciudadano</option>
    <option value="funcionario">Funcionario</option>
    <option value="admin">Administrador</option>
  </select>
</div>
  // Redirige correctamente según el rol
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
