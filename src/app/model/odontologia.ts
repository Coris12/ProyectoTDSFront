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
import { ExamenEsto } from './examenEsto';
import { IndicesF } from './indicesF';
import { Usuario } from './usuario';

export interface Odontologia { 
    codigo?: string;
    diagnostico?: string;
    enfermedad?: string;
    establecimiento?: string;
    examen?: Array<ExamenEsto>;
    fecha?: Date;
    frecCardiaca?: number;
    frecRespi?: number;
    idOdonto?: number;
    indicesF?: Array<IndicesF>;
    motivo?: string;
    prescripcion?: string;
    presion?: number;
    procedimiento?: string;
    sesion?: string;
    temperatura?: number;
    usuario?: Usuario;
}