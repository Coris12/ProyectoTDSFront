import { Producto } from '../../producto/model/producto';


export class Proveedor {
    idP?:number ;
    nombreP?:string ;
    productosP?: Producto[];

    constructor(nombreP: string) {
        this.nombreP= nombreP;
    }
}
