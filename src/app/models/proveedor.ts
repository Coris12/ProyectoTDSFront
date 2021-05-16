import { Producto } from "./producto";

export class Proveedor {
    idP?:number ;
    nombreP?:string ;
    productos?: Producto[];

    constructor(nombreP: string) {
        this.nombreP = nombreP;
    }
}
