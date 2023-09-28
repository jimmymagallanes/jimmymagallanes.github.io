// URLs de la API para productos y proveedores (reemplázalas con las URL correctas)
const productosApiUrl = 'https://inventariobackend.onrender.com/productos';
const proveedoresApiUrl = 'https://inventariobackend.onrender.com/proveedores';

// Obtener elementos relevantes
const radioProductos = document.getElementById('btnradio1');
const radioProveedores = document.getElementById('btnradio2');
const dataTable = document.getElementById('dataTable');
const tableHeader = dataTable.getElementsByTagName('thead')[0];
const headerCells = tableHeader.getElementsByTagName('th');
const selectData = document.getElementById('selectData');

// Función para llenar la tabla con datos de productos
async function llenarTablaProductos() {
  try {
    const response = await fetch(productosApiUrl);
    if (response.ok) {
      const productos = await response.json();
      actualizarTabla(productos, 'precio');
      pasarDataAlSelect(proveedoresApiUrl);
    } else {
      console.error('Error al obtener los datos de productos:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud Fetch:', error);
  }
}

// Función para llenar la tabla con datos de proveedores
async function llenarTablaProveedores() {
  try {
    const response = await fetch(proveedoresApiUrl);
    if (response.ok) {
      const proveedores = await response.json();
      actualizarTabla(proveedores, 'telefono');
      pasarDataAlSelect(productosApiUrl);
    } else {
      console.error('Error al obtener los datos de proveedores:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud Fetch:', error);
  }
}


async function pasarDataAlSelect(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      llenarSelectConDatos(data, 'nombre');
    } else {
      console.error('Error al obtener los datos de productos:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud Fetch:', error);
  }
}

// Función para actualizar la tabla con los datos recibidos y cambiar el encabezado
function actualizarTabla(data, propiedadExtra) {
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

    // Agrega la propiedad extra dependiendo de si son productos o proveedores
    if (propiedadExtra === 'precio') {
      extraCell.textContent = `$${item.precio.toFixed(2)}`;
    } else if (propiedadExtra === 'telefono') {
      extraCell.textContent = item.telefono;
    }
  });

  // Cambia el texto de las celdas del encabezado
  if (propiedadExtra === 'precio') {
    headerCells[2].textContent = 'Precio';
  } else if (propiedadExtra === 'telefono') {
    headerCells[2].textContent = 'Teléfono';
  }
}

// Función para llenar el select con datos
function llenarSelectConDatos(data, propiedad) {
  if (radioProductos.checked) {
    selectData.innerHTML = '<option selected>Seleccionar Proveedor</option>';
  } else if (radioProveedores.checked) {
    selectData.innerHTML = '<option selected>Seleccionar Producto</option>';
  }
  data.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id; // Asigna el valor del id como valor de la opción
    option.textContent = item[propiedad];
    selectData.appendChild(option);
  });
}


function realizarPeticionSegunSeleccion() {
  const opcionSeleccionada = selectData.value; // Obtiene el valor seleccionado en el select

  if (opcionSeleccionada === 'Selecciona datos') {
    // No se seleccionó ninguna opción válida, no se realiza ninguna petición
    return;
  }
  console.log(opcionSeleccionada)
  if (radioProductos.checked) {
    fetch(productosApiUrl + '/' + opcionSeleccionada)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        actualizarTabla(data, 'precio');
      })
      .catch(error => {
        console.error('Error en la solicitud Fetch:', error);
      });
  } else if (radioProveedores.checked) {
    fetch(proveedoresApiUrl + '/' + opcionSeleccionada)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        actualizarTabla(data, 'telefono');
      })
      .catch(error => {
        console.error('Error en la solicitud Fetch:', error);
      });
  }
}

// Agregar eventos de click a los botones de radio
radioProductos.addEventListener('click', llenarTablaProductos);
radioProveedores.addEventListener('click', llenarTablaProveedores);
selectData.addEventListener('change', realizarPeticionSegunSeleccion);


// Llenar la tabla de productos por defecto al cargar la página
window.onload = llenarTablaProductos();