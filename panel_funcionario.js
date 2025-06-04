document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user || user.role !== 'funcionario') {
    window.location.href = 'index.html';
    return;
  }

  // Mostrar información del funcionario
  document.getElementById('func-name').textContent = user.name;
  document.getElementById('func-role').textContent = 'Funcionario';
  document.getElementById('func-email').textContent = user.email;
  document.getElementById('func-phone').textContent = user.phone;

  // Cargar citas
  loadCitas();
});

function loadCitas() {
  let citas = JSON.parse(localStorage.getItem('citas')) || [];
  const citasTable = document.getElementById('citas-table');
  
  if (citas.length === 0) {
    citasTable.innerHTML = '<tr><td colspan="6">No hay citas programadas</td></tr>';
    return;
  }

  let tableHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Motivo</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
  `;

  citas.forEach((cita, index) => {
    tableHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${cita.username}</td>
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td>${cita.motivo}</td>
        <td class="status-${cita.estado.toLowerCase()}">${cita.estado}</td>
        <td>
          ${cita.estado === 'Pendiente' ? 
            `<button onclick="confirmCita(${index})">Confirmar</button>` : ''}
          <button onclick="changeStatus(${index})">Cambiar Estado</button>
        </td>
      </tr>
    `;
  });

  tableHTML += '</tbody>';
  citasTable.innerHTML = tableHTML;
}

function confirmCita(index) {
  let citas = JSON.parse(localStorage.getItem('citas'));
  citas[index].estado = 'Confirmada';
  localStorage.setItem('citas', JSON.stringify(citas));
  
  loadCitas();
  alert('Cita confirmada con éxito');
}

function changeStatus(index) {
  const newStatus = prompt('Ingrese nuevo estado (Pendiente/Confirmada/Cancelada/Completada):');
  if (!newStatus || !['Pendiente', 'Confirmada', 'Cancelada', 'Completada'].includes(newStatus)) {
    alert('Estado no válido');
    return;
  }

  let citas = JSON.parse(localStorage.getItem('citas'));
  citas[index].estado = newStatus;
  localStorage.setItem('citas', JSON.stringify(citas));
  
  loadCitas();
  alert('Estado de cita actualizado');
}

function verCitasAgendadas() {
  loadCitas();
}

function buscarCiudadano() {
  const username = prompt('Ingrese el nombre de usuario del ciudadano:');
  if (!username) return;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.role === 'ciudadano');
  
  if (user) {
    alert(`Ciudadano encontrado:\nNombre: ${user.name}\nEmail: ${user.email}\nTeléfono: ${user.phone}`);
  } else {
    alert('Ciudadano no encontrado');
  }
}

function verHistorialFuncionario() {
  alert('Función de ver historial en desarrollo');
}

// Hacer funciones disponibles globalmente
window.confirmCita = confirmCita;
window.changeStatus = changeStatus;
window.verCitasAgendadas = verCitasAgendadas;
window.buscarCiudadano = buscarCiudadano;
window.verHistorialFuncionario = verHistorialFuncionario;