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

export interface Rol { 
    id?: number;
    rolNombre?: Rol.RolNombreEnum;
}
export namespace Rol {
    export type RolNombreEnum = 'ROLE_ADMIN' | 'ROLE_CONTABILIDAD' | 'ROLE_COUNTER' | 'ROLE_DOCTOR' | 'ROLE_FARMACIA' | 'ROLE_LABORATORIO' | 'ROLE_ODONTOLOGIA' | 'ROLE_PACIENTE';
    export const RolNombreEnum = {
        ADMIN: 'ROLE_ADMIN' as RolNombreEnum,
        CONTABILIDAD: 'ROLE_CONTABILIDAD' as RolNombreEnum,
        COUNTER: 'ROLE_COUNTER' as RolNombreEnum,
        DOCTOR: 'ROLE_DOCTOR' as RolNombreEnum,
        FARMACIA: 'ROLE_FARMACIA' as RolNombreEnum,
        LABORATORIO: 'ROLE_LABORATORIO' as RolNombreEnum,
        ODONTOLOGIA: 'ROLE_ODONTOLOGIA' as RolNombreEnum,
        PACIENTE: 'ROLE_PACIENTE' as RolNombreEnum
    };
}