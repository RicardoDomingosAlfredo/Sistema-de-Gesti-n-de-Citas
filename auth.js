document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    // Guardar token y usuario en localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));

    // Obtener rol del usuario desde el backend
    const role = data.user.role;

    // Redirigir según el rol
    switch (role) {
      case 'admin':
        window.location.href = 'public/panel_administrador.html';
        break;
      case 'funcionario':
        window.location.href = 'panel_funcionario.html';
        break;
      case 'ciudadano':
        window.location.href = 'public/panel_ciudadano.html';
        break;
      default:
        alert('Rol no reconocido. Redirigiendo al inicio.');
        window.location.href = 'index.html';
    }
  } catch (error) {
    alert(error.message || 'Error inesperado al iniciar sesión.');
  }
});

// Función para cerrar sesión (puedes incluirla aquí o en otro archivo)
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}
