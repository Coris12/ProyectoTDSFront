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
import { Anestesia } from './anestesia';

export interface Complicaciones { 
    anestesia?: Anestesia;
    atrri?: string;
    cambioT?: string;
    cardiaco?: string;
    comentarios?: string;
    duramadre?: string;
    espamo?: string;
    grupoS?: string;
    hipertension?: string;
    idCom?: number;
    informacion?: string;
    insuficiente?: string;
    r1?: string;
    r2?: string;
    r3?: string;
    r4?: string;
    r5?: string;
    respiratoria?: string;
    vomito?: string;
}