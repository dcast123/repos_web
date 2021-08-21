var carrito = [];
var total= 0;



function Pedido (producto, cantidad) {
    this.producto = producto;
    this.cantidad= cantidad;
}


function cargarDatosCarrito(){
    if(localStorage.getItem('LSPedido')){
        carrito = JSON.parse(localStorage.getItem('LSPedido'));
    }
    return;
}



function setPedido(){
    localStorage.setItem('LSPedido', JSON.stringify(carrito));
}

function LlenarCarrito(){

    var scriptTabla = "";
    var total = 0;
    for(let index = 0; index < carrito.length; index++){
     
        scriptTabla += '<tr>';
        scriptTabla += '<td>'+ carrito[index].producto.codigo + '</td>';
        scriptTabla += '<td>' + carrito[index].producto.nombre +'<img src="'+ carrito[index].producto.imagen + '"/></td>';
        scriptTabla += '<td>';
        scriptTabla +=  '<p id="idCantidad'+ carrito[index].producto.codigo +'">'+ carrito[index].cantidad + '</p>';
        scriptTabla +='<br>';
        scriptTabla += '<div class="cdiv">';
        scriptTabla += '<button type= "button" class = "mas" onclick="sumar('+index+')">'+'+'+'</button>';
        scriptTabla += '<button type= "button" class = "menos" onclick = "restar('+index+')">'+ '-' + '</button>';
        //cambio imagen
        scriptTabla +=  '<img src= "../imagenes/eliminar2.png" alt = "eliminar" onclick = "eliminar('+index+')">';
        scriptTabla += '</div>';
        scriptTabla += '</td>';
        scriptTabla += '<td class = "tdright">'+ carrito[index].producto.precio + '</td>';
        scriptTabla += '<td class = "tdright" id= "Sub'+carrito[index].producto.codigo+'">' + (carrito[index].cantidad*carrito[index].producto.precio) + '</td>';
        scriptTabla +=  '</tr>'
        total += (carrito[index].cantidad*carrito[index].producto.precio);
    }

    document.getElementById("idBodyTable3").innerHTML = scriptTabla;
    document.getElementById("TotalPedido").innerHTML = "Total del pedido: "+total;
}

function ExisteProducto(id){
    for(var i = 0; i<carrito.length;i++){
        if(carrito[i].producto.codigo == id){
            return true;
        }
    }
    return false;
}

function addCarrito( idPedido ){
    cargarDatosCarrito();
    console.log(idPedido);
    if (ValidarCantidad(idPedido) == false){
        return false;
    }

    if(ExisteProducto(idPedido)){
        for(var i = 0; i<carrito.length;i++){
            if(carrito[i].producto.codigo == idPedido){
                carrito[i].cantidad = parseInt(carrito[i].cantidad) + parseInt(document.getElementById("idCantidad"+idPedido).value);
            }
        }
    }
    else{
        var pedido = new Pedido(
            BuscarProducto(idPedido),
            document.getElementById("idCantidad"+idPedido).value
        );
        carrito.push(pedido);   
    }
    setPedido();
    limpiarCatidad();
}

//Funciones para operaciones
function actualizarTotal(){
    var temp = 0;
    for(var i = 0; i<carrito.length; i++){
        temp += (carrito[i].producto.precio * carrito[i].cantidad);
    }
    return temp;
}

function sumar(i){
    
    carrito[i].cantidad++;

    localStorage.setItem('LSPedido', JSON.stringify(carrito));
    document.getElementById('idCantidad'+carrito[i].producto.codigo).innerHTML= carrito[i].cantidad;  
    document.getElementById('Sub'+carrito[i].producto.codigo).innerHTML = (carrito[i].producto.precio*carrito[i].cantidad);
    document.getElementById("TotalPedido").innerHTML = "Total del pedido: "+actualizarTotal();
}

function restar(i){
    if(carrito[i].cantidad >1){
      carrito[i].cantidad--;  
    } else{
        alert("Debe tener como mínimo un pedido");
    }
    
    localStorage.setItem('LSPedido', JSON.stringify(carrito));
    document.getElementById('idCantidad'+carrito[i].producto.codigo).innerHTML= carrito[i].cantidad;
    document.getElementById('Sub'+carrito[i].producto.codigo).innerHTML = (carrito[i].producto.precio*carrito[i].cantidad);
    document.getElementById("TotalPedido").innerHTML = "Total del pedido: "+actualizarTotal();
}

function eliminar(i){
    if(confirm("esta seguro de eliminar este elemento?")){
        carrito.splice(i,1);
        localStorage.setItem('LSPedido', JSON.stringify(carrito));
        LlenarCarrito();
    }
}
