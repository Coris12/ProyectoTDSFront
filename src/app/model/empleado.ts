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
import { Farmacia } from './farmacia';
import { Usuario } from './usuario';

export interface Empleado { 
    cargoEmple?: string;
    estado?: number;
    farmacia?: Farmacia;
    idEmpleado?: number;
    usuario?: Usuario;
}