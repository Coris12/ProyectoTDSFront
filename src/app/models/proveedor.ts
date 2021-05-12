import { Producto } from "./producto";

export class Proveedor {
    idP:number ;
    nombreP:string ;
    productos: Producto[];

    constructor(nombreP: string, idP: number) {
        this.nombreP = nombreP;
        this.idP = idP;
    }
}
