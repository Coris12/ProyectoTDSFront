import { Producto } from '../../producto/model/producto';


export class Proveedor {
    idProveedor?:number ;
    nombreProveedor?:string ;
    productosProveedor?: Producto[];

    constructor(nombreProveedor: string) {
        this.nombreProveedor= nombreProveedor;
    }
}
