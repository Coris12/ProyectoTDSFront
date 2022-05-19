import { CuerpoFactura } from "./cuerpoFactura";

export interface ProductosDto {
  descripcionProducto?: string;
  nombreProducto?: string;
  precioProducto?: number;
  cantidad?: number;
  cantidades?: CuerpoFactura;
  descuento?: number;
  stock?: string;
  total?: number;
  porcentaje?: number;
  idProducto?: number;
  check?: boolean;
  iva?: number;
}
