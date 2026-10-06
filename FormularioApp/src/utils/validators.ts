export function validarNombre(nombre: string) {
  return nombre.trim() !== '';
}

export function validarCorreo(correo: string) {
  return correo.includes('@');
}

export function validarEdad(edad: string) {
  const numero = Number(edad);

  return numero >= 18;
}

export function validarPrecio(precio: string) {
  const numero = parseFloat(precio);
  return !isNaN(numero) && numero > 0;
}

export function validarStock(stock: string) {
  const numero = parseInt(stock, 10);
  return !isNaN(numero) && numero >= 0 && String(numero) === stock.trim();
}

export function validarCategoria(categoria: string) {
  return categoria.trim() !== '';
}