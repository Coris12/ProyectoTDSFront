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
import { Odontologia } from './odontologia';

export interface PlanesDiagnostico { 
    biometrica?: boolean;
    descripcion?: string;
    idPlanes?: number;
    odontologia?: Odontologia;
    otros?: boolean;
    quimicaS?: string;
    rayosx?: boolean;
}