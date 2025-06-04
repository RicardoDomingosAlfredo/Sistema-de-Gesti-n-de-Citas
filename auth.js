document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    // Verificar que el rol del usuario coincida con el seleccionado
    if (data.user.role !== role) {
      alert('El rol seleccionado no coincide con el rol del usuario.');
      return;
    }

    // Guardar token y redirigir
    localStorage.setItem('token', data.token);
    localStorage.setItem('currentUser', JSON.stringify(data.user));

    switch (role) {
      case 'admin':
        window.location.href = 'panel_administrador.html';
        break;
      case 'funcionario':
        window.location.href = 'panel_funcionario.html';
        break;
      case 'ciudadano':
        window.location.href = 'panel_ciudadano.html';
        break;
      default:
        window.location.href = 'index.html';
    }
  } catch (error) {
    alert(error.message);
  }
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}
