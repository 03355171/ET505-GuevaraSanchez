"use strict";
// DATOS Y REGLAS: estas funciones no usan document ni cambian la pantalla.
const limites={presupuestoCentimos:18000,maxCantidad:30,maxPrecio:50};
function calcularTotal(pedido){
return pedido.cantidad * Math.round(pedido.precio * 100);
}
function validarPedido(pedido){
if(pedido.material.length<3)return "Escriba un material de al menos 3 caracteres.";
if(!Number.isInteger(pedido.cantidad)||pedido.cantidad<1||pedido.cantidad>limites.maxCantidad)return "Cantidad: entero entre 1 y 30.";
if(!Number.isFinite(pedido.precio)||pedido.precio<=0||pedido.precio>limites.maxPrecio||Math.abs(pedido.precio*100-Math.round(pedido.precio*100))>0.000001)return "Precio: de 0.01 a 50 soles, con hasta dos decimales.";
const total=calcularTotal(pedido);
if(total===null)return "Complete TODO 1 en calcularTotal.";
if (total > limites.presupuestoCentimos) {
 return "El total supera el presupuesto.";
}
return "";
}
// PANTALLA: leer entradas y mostrar resultados.
const $=id=>document.getElementById(id);
function leerPedido(){return {material:$("material").value.trim(),cantidad:Number($("cantidad").value),precio:Number($("precio").value)};}
function soles(centimos){return "S/ "+(centimos/100).toFixed(2);}
$("comprobar").addEventListener("click",()=>{
const pedido=leerPedido();
const error = validarPedido(pedido);
$("mensaje").textContent=error===null?"Complete TODO 3 en Comprobar.":error||"Pedido válido. Compruebe el total y confirme la simulación.";
});
$("formulario").addEventListener("submit",evento=>{
evento.preventDefault();const pedido=leerPedido();const error=validarPedido(pedido);
if(error){$("mensaje").textContent=error;return;}
const total=calcularTotal(pedido);
$("ficha").textContent=pedido.material+" · "+pedido.cantidad+" unidades\nTotal: "+soles(total)+"\nSaldo: "+soles(limites.presupuestoCentimos-total);
$("ficha").hidden=false;$("vacio").hidden=true;$("mensaje").textContent="Simulación confirmada. No se realizó ninguna compra.";
});
$("limpiar").addEventListener("click",()=>{$("formulario").reset();$("ficha").hidden=true;$("vacio").hidden=false;$("mensaje").textContent="";$("material").focus();});