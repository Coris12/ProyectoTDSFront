export class Producto {
    idProducto?: number;
    nombreProducto?: string;
    precioProducto?: number;
    idProveedor?:number;

    constructor(nombreProducto: string, precioProducto: number,idProveedor:number) {
        this.nombreProducto = nombreProducto;
        this.precioProducto = precioProducto;
        this.idProveedor = idProveedor;
    }
}