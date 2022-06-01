/**
 * Proyecto TDS Backend
 * Descripción
 *
 * OpenAPI spec version: 2.0
 * Contact: info@tecazuay.edu.ec
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { FacturaReq } from './facturaReq';
import { Producto } from './producto';

export interface CuerpoFacturaReq { 
    cantidad?: number;
    descuento?: number;
    factura?: FacturaReq;
    idCuerpo?: number;
    iva?: number;
    producto?: Producto;
    subtotal?: number;
    total?: number;
}