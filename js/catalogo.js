var productos = [];        


function Producto (codigo, nombre, precio, imagen) {
this.codigo = codigo,
this.nombre = nombre,
this.precio = precio,
this.imagen = imagen
}

function addProductoArray(){
    var codigo = document.getElementById("idCodigo").value;
    var nombre = document.getElementById("idNombre").value;
    var precio = document.getElementById("idPrecio").value;
    var imagen = ruta;
   
    var producto = new Producto(codigo, nombre, precio, imagen);
    productos.push(producto);
}

function BuscarProducto(codigo){
    for(let index = 0; index < productos.length; index++){
        if(productos[index].codigo == codigo){
            return productos[index];
        }
    }
    return null;
}


function limpiarCatidad(){
    for(let index = 0; index< productos.length; index++){
      document.getElementById("idCantidad"+productos[index].codigo).value = "";  
    }
    
}

function ValidarCantidad(id){
    if(document.getElementById("idCantidad"+id).value == ""){
        alert("El campo CANTIDAD esta vacío");
        return false;
    }
    return true;
}

function LlenarTabla(){

  
    var scriptTabla = "";

    for (let index = 0; index < productos.length; index++) {
        scriptTabla += "<tr>";
        scriptTabla += "<td>" + productos[index].codigo+ "</td>" ;
        scriptTabla += "<td>" + productos[index].nombre + "</td>" ;
        scriptTabla += "<td>" + productos[index].precio + "</td>" ;
        scriptTabla += '<td><img src="'+productos[index].imagen +'"/></td>' ;
        scriptTabla += "</tr>";
    }

    document.getElementById("idTableBody").innerHTML = scriptTabla;

}

function validarCampos(){

    if (document.getElementById("idCodigo").value == ""){
        alert("El campo CODIGO no debe quedar vacío");
        return false;
    }
    if (document.getElementById("idNombre").value == ""){
        alert("El campo NOMBRE no debe quedar vacío");
        return false;
    }
    if (document.getElementById("idPrecio").value == ""){
        alert("El campo PRECIO no debe quedar vacío");
        return false;
    }
    if (document.getElementById("idImagen").value == ""){
        alert("El campo IMAGEN no debe quedar vacío");
        return false;
    }
}

function cleanControls(){
    document.getElementById("idCodigo").value = "";
    document.getElementById("idNombre").value = "";
    document.getElementById("idPrecio").value = "";
    document.getElementById("idImagen").value = "";
}

function addProducto (){
    //Validar campos
    if (validarCampos() == false){
        return false;
    }

 cargarDatos();
;

    //Agregar el producto al array
    addProductoArray();
      
    //guardar en Local Storage el producto
      setProducto();

    //Poblamos la tabla
    LlenarTabla();

    // Limpiamos los campos
    cleanControls();
}

//Guardar objeto en localStorage

function setProducto(){
    localStorage.setItem('LSProducto', JSON.stringify(productos));
}

//Función para cargar los datos al array
function cargarDatos(){
    if(localStorage.getItem('LSProducto')){
 productos = JSON.parse(localStorage.getItem('LSProducto'));}
 return;
}

//Función para llenar la tabla en página donde se presentán los productos

function LlenarTablaP(){
//function LlenadoTabla(){
    
    var scriptTabla = "";

    for (let index = 0; index < productos.length; index++ ){
     
    scriptTabla += '<tr>';
    scriptTabla += '<td>' + productos[index].codigo + '</td>';
    scriptTabla += '<td>' + productos[index].nombre + '</br>';
    scriptTabla +=  '<label for="idCantidad" >' + "Cantidad:" +'</label>';
    scriptTabla += '<input type="number" class="input"  id="idCantidad'+ productos[index].codigo+'">';
    scriptTabla +=  '</input>';
    scriptTabla +=  '</td>';
    scriptTabla += '<td>' + productos[index].precio + '</br>';
    scriptTabla += '<button type="button" class="btn btn-success" onclick="addCarrito('+productos[index].codigo+')">Agregar al carrito</button>';
    scriptTabla += '</td>';
    scriptTabla += '<td><img src="'+ productos[index].imagen + '"/></td>';
    scriptTabla += '</tr>'

    }
    
    document.getElementById("idTableBody2").innerHTML = scriptTabla;

}

var ruta = "";
/*se convierte la imagen cargada en el input */
function previewFile() {
    const file = document.getElementById('idImagen').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convierte la imagen a una cadena64
      ruta = reader.result;
      document.getElementById("idImagenPrevia").src = ruta;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
}


