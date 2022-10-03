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
import { Medicamentos } from './medicamentos';
import { Usuario } from './usuario';

export interface Evolucion { 
    establecimiento?: string;
    evolucion?: string;
    fecha?: Date;
    hora?: string;
    idEvolucion?: number;
    indicaciones?: string;
    medicamento?: Medicamentos;
    medicamentoAD?: string;
    usuario?: Usuario;
}