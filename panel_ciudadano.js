document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user || user.role !== 'ciudadano') {
    window.location.href = 'index.html';
    return;
  }

  // Mostrar información del usuario
  document.getElementById('user-name').textContent = user.name;
  document.getElementById('user-dni').textContent = user.username;
  document.getElementById('last-access').textContent = new Date().toLocaleString('es-ES');

  // Cargar citas del localStorage
  loadCitas();
});

function loadCitas() {
  let citas = JSON.parse(localStorage.getItem('citas')) || [];
  citas = citas.filter(cita => cita.username === JSON.parse(localStorage.getItem('currentUser')).username);
  
  const table = document.getElementById('citas-table');
  if (citas.length === 0) {
    table.innerHTML = '<tr><td colspan="6">No tienes citas programadas</td></tr>';
    return;
  }

  let tableHTML = `
    <thead>
      <tr>
        <th>ID</th>
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
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td>${cita.motivo}</td>
        <td class="status-${cita.estado.toLowerCase()}">${cita.estado}</td>
        <td>
          ${cita.estado === 'Pendiente' ? 
            `<button onclick="cancelCita(${index})" class="btn-cancel">Cancelar</button>` : 
            ''}
        </td>
      </tr>
    `;
  });

  tableHTML += '</tbody>';
  table.innerHTML = tableHTML;
}

function agendarCita() {
  const modalHTML = `
    <div class="modal" id="cita-modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>Agendar Nueva Cita</h2>
        <form id="cita-form">
          <label for="cita-fecha">Fecha:</label>
          <input type="date" id="cita-fecha" required>
          
          <label for="cita-hora">Hora:</label>
          <input type="time" id="cita-hora" required>
          
          <label for="cita-motivo">Motivo:</label>
          <select id="cita-motivo" required>
            <option value="">Seleccione un motivo</option>
            <option value="Renovación DNI">Renovación DNI</option>
            <option value="Primera vez">Primera vez</option>
            <option value="Pérdida">Pérdida</option>
            <option value="Otro">Otro</option>
          </select>
          
          <button type="submit">Agendar</button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.getElementById('cita-form').addEventListener('submit', function(e) {
    e.preventDefault();
    submitCita();
  });

  // Configurar fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('cita-fecha').min = today;
}

function submitCita() {
  const fecha = document.getElementById('cita-fecha').value;
  const hora = document.getElementById('cita-hora').value;
  const motivo = document.getElementById('cita-motivo').value;
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!fecha || !hora || !motivo) {
    alert('Por favor complete todos los campos');
    return;
  }

  let citas = JSON.parse(localStorage.getItem('citas')) || [];
  
  const nuevaCita = {
    id: citas.length + 1,
    username: user.username,
    fecha,
    hora,
    motivo,
    estado: 'Pendiente'
  };

  citas.push(nuevaCita);
  localStorage.setItem('citas', JSON.stringify(citas));
  
  closeModal();
  loadCitas();
  alert('Cita agendada con éxito');
}

function cancelCita(index) {
  if (!confirm('¿Está seguro que desea cancelar esta cita?')) return;

  let citas = JSON.parse(localStorage.getItem('citas'));
  citas[index].estado = 'Cancelada';
  localStorage.setItem('citas', JSON.stringify(citas));
  
  loadCitas();
  alert('Cita cancelada con éxito');
}

function closeModal() {
  const modal = document.getElementById('cita-modal');
  if (modal) modal.remove();
}

function consultarEstado() {
  alert('Función de consultar estado en desarrollo');
}

function actualizarInformacion() {
  alert('Función de actualizar información en desarrollo');
}

function verHistorial() {
  alert('Función de ver historial en desarrollo');
}

// Hacer funciones disponibles globalmente
window.agendarCita = agendarCita;
window.cancelCita = cancelCita;
window.consultarEstado = consultarEstado;
window.actualizarInformacion = actualizarInformacion;
window.verHistorial = verHistorial;
window.closeModal = closeModal;