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

export interface Accidente { 
    abusoF?: boolean;
    abusoS?: boolean;
    admision?: Admision;
    ahogamiento?: boolean;
    alcolica?: boolean;
    alimentaria?: boolean;
    ana?: boolean;
    aplas?: boolean;
    apsicolgico?: boolean;
    caida?: boolean;
    corto?: boolean;
    desc?: string;
    direccionE?: string;
    drogas?: boolean;
    enve?: boolean;
    etilico?: boolean;
    extrao?: boolean;
    fecha?: Date;
    fuego?: boolean;
    gases?: boolean;
    idAccidente?: number;
    mode?: boolean;
    nombreE?: string;
    otaraV?: boolean;
    otraI?: boolean;
    otroa?: boolean;
    picadura?: boolean;
    policial?: boolean;
    quemadura?: boolean;
    rina?: boolean;
    transito?: boolean;
    valor?: number;
    vfamiliar?: boolean;
}