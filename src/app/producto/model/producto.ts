export class Producto {
    id?: number;
    nombre?: string;
    precio?: number;
    idP?:number;

    constructor(nombre: string, precio: number) {
        this.nombre = nombre;
        this.precio = precio;
    }
}