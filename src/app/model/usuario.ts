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
import { Rol } from './rol';

export interface Usuario { 
    celular?: string;
    ciudad?: string;
    direccion?: string;
    email?: string;
    estado?: number;
    id?: number;
    identificacion?: string;
    nombreUsuario?: string;
    nombres?: string;
    password?: string;
    profesion?: string;
    roles?: Array<Rol>;
    sexo?: string;
}