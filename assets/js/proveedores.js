// URLs de la API para productos y proveedores (reemplázalas con las URL correctas)
const proveedoresApiUrl = 'https://inventariobackend.onrender.com/proveedores';

// Obtener elementos relevantes
const dataTable = document.getElementById('dataTable');
const tableHeader = dataTable.getElementsByTagName('thead')[0];
const headerCells = tableHeader.getElementsByTagName('th');


// Función para llenar la tabla con datos de proveedores
async function llenarTablaProveedores() {
  try {
    const response = await fetch(proveedoresApiUrl);
    if (response.ok) {
      const proveedores = await response.json();
      actualizarTabla(proveedores);
    } else {
      console.error('Error al obtener los datos de proveedores:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud Fetch:', error);
  }
}


// Función para actualizar la tabla con los datos recibidos y cambiar el encabezado
function actualizarTabla(data) {
  // Limpia la tabla
  dataTable.getElementsByTagName('tbody')[0].innerHTML = "";

  // Llena la tabla con los datos recibidos
  data.forEach((item) => {
    const row = dataTable.getElementsByTagName('tbody')[0].insertRow();
    const idCell = row.insertCell(0);
    const nombreCell = row.insertCell(1);
    const extraCell = row.insertCell(2);

    idCell.textContent = item.id;
    nombreCell.textContent = item.nombre;
    extraCell.textContent = item.telefono;
  })
}

// Llenar la tabla de productos por defecto al cargar la página
window.onload = llenarTablaProveedores();