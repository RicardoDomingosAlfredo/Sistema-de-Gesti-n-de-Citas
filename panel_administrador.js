document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!token || !user || user.role !== 'admin') {
    window.location.href = 'index.html';
    return;
  }

  // Mostrar información del admin
  document.getElementById('admin-name').textContent = user.name || 'Administrador';
  document.getElementById('admin-role').textContent = 'Administrador';
  document.getElementById('admin-email').textContent = user.email || 'N/A';
  document.getElementById('admin-phone').textContent = user.phone || 'N/A';

  // Cargar usuarios
  await loadUsers();
});

async function loadUsers() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al cargar usuarios');
    }

    const users = await response.json();
    const table = document.getElementById('users-table');

    if (users.length === 0) {
      table.innerHTML = '<tr><td colspan="6">No hay usuarios registrados</td></tr>';
      return;
    }

    let html = `
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
    `;

    users.forEach(user => {
      html += `
        <tr>
          <td>${user.name || 'N/A'}</td>
          <td>${user.username}</td>
          <td>${user.email || 'N/A'}</td>
          <td>${user.role}</td>
          <td>${user.isActive ? 'Activo' : 'Inactivo'}</td>
          <td>
            ${user.role === 'funcionario' && !user.validated ? 
              `<button onclick="validateUser('${user.id}')">Validar</button>` : ''}
            <button onclick="editUser('${user.id}')">Editar</button>
            <button onclick="deleteUser('${user.id}')">Eliminar</button>
          </td>
        </tr>
      `;
    });

    html += '</tbody>';
    table.innerHTML = html;

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(`${sectionId}-section`).classList.remove('hidden');
  
  document.querySelectorAll('.sidebar button').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

// Exportar funciones al scope global
window.validateUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/users/validate/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al validar usuario');
    }

    alert('Usuario validado con éxito');
    await loadUsers();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

window.deleteUser = async (userId) => {
  if (!confirm('¿Está seguro de eliminar este usuario?')) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar usuario');
    }

    alert('Usuario eliminado con éxito');
    await loadUsers();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};