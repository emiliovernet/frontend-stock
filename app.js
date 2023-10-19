const selectCategoria = document.getElementById("categoria");
const table = document.querySelector("table");
let productosData = [];

// Realizar una solicitud Fetch a la API y actualizar la tabla y el menú desplegable
function fetchDataAndUpdateTable() {
  fetch("https://backend-coresa-stock.onrender.com/")
    .then((response) => response.json())
    .then((data) => {
      productosData = data;
      // Crear un conjunto para almacenar familias únicas
      const familiasUnicas = new Set(data.map((row) => row.Familia));
      // Limpiar y actualizar el menú desplegable
      selectCategoria.innerHTML = "";
      selectCategoria.appendChild(new Option("Todas", ""));
      familiasUnicas.forEach((familia) => {
        selectCategoria.appendChild(new Option(familia, familia));
      });
      updateTable();
    })
    .catch((error) => console.error("Error:", error));
}

// Función para actualizar la tabla con los datos filtrados y aplicar estilos a filas no disponibles
function updateTable() {
  const selectedCategoria = selectCategoria.value;
  const filteredData = selectedCategoria
    ? productosData.filter((row) => row.Familia === selectedCategoria)
    : productosData;

  // Limpiar la tabla
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Recorrer los datos filtrados y agregar filas a la tabla
  filteredData.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
                    <td>${row.SKU}</td>
                    <td>${row.Descripción}</td>
                    <td>${row.Disponible}</td>
                    <td>${row.Familia}</td>
                    <td>${row.Marca}</td>
                `;

    // Aplicar el estilo 'no-disponible' si Disponible <= 0
    if (row.Disponible <= 0) {
      tr.classList.add("no-disponible");
    }

    table.appendChild(tr);
  });
}

// Escuchar cambios en la selección de categoría
selectCategoria.addEventListener("change", updateTable);

// Inicialmente, cargar los datos y actualizar la tabla y el menú desplegable
fetchDataAndUpdateTable();
