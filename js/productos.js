// URLs de la API para productos y proveedores (reemplázalas con las URL correctas)
const productosApiUrl = 'https://inventariobackend.onrender.com/productos';

// Obtener elementos relevantes
const dataTable = document.getElementById('dataTable');
const tableHeader = dataTable.getElementsByTagName('thead')[0];
const headerCells = tableHeader.getElementsByTagName('th');

// Función para llenar la tabla con datos de productos
async function llenarTablaProductos() {
  try {
    const response = await fetch(productosApiUrl);
    if (response.ok) {
      const productos = await response.json();
      actualizarTabla(productos);
    } else {
      console.error('Error al obtener los datos de productos:', response.status);
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
    const precioCell = row.insertCell(2);

    idCell.textContent = item.id;
    nombreCell.textContent = item.nombre;
    precioCell.textContent = `$${item.precio.toFixed(2)}`;
  })

}


// Llenar la tabla de productos por defecto al cargar la página
window.onload = llenarTablaProductos();