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
import { Admision } from './admision';

export interface Alta { 
    admision?: Admision;
    cExterna?: boolean;
    causa?: string;
    codigo?: string;
    dias?: number;
    domicilio?: boolean;
    estable?: boolean;
    establecimiento?: string;
    fecha?: Date;
    idAlta?: number;
    inestable?: boolean;
    internacion?: boolean;
    muerto?: boolean;
    nombre?: string;
    observacion?: boolean;
    referencia?: boolean;
    servicio?: string;
    vivo?: boolean;
}