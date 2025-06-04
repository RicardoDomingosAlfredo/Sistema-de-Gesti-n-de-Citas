// Funciones para el panel ciudadano
function agendarCita() {
  alert("Funcionalidad para agendar cita no implementada aún.");
}

function consultarEstado() {
  alert("Consultando estado de citas...");
}

function actualizarInformacion() {
  alert("Actualizando información personal...");
}

function cancelarCita() {
  alert("Cancelando cita...");
}

function historialCitas() {
  alert("Mostrando historial de citas...");
}

// Funciones para panel funcionario y administrador
function verCitasAgendadas() {
  alert("Mostrando citas agendadas...");
}

function confirmarAsistencia() {
  alert("Confirmando asistencia...");
}

function actualizarEstado() {
  alert("Actualizando estado...");
}

function buscarCiudadano() {
  const apellido = prompt("Ingrese el apellido del ciudadano a buscar:");
  if (apellido) {
    alert(`Buscando ciudadano con apellido: ${apellido}`);
  }
}

function historialCitasFuncionario() {
  alert("Mostrando historial de citas...");
}

// Función para cerrar sesión (común a todos)
function cerrarSesion() {
  window.location.href = "index.html";
}
