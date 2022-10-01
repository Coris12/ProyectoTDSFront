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
import { Protocolos } from './protocolos';

export interface EquipoOperatorio { 
    anestesiologo?: string;
    cirujano?: string;
    fecha?: Date;
    horaFin?: string;
    horaInicio?: string;
    idEquipo?: number;
    instrumentista?: string;
    primerAyudante?: string;
    protocolo?: Protocolos;
    segundoAyudante?: string;
    tercerAyudante?: string;
    tipoAnestesia?: string;
}