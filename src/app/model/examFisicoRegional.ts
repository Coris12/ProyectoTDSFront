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
import { ConsultaExterna } from './consultaExterna';

export interface ExamFisicoRegional { 
    abdomen?: string;
    cabeza?: string;
    consultaExterna?: ConsultaExterna;
    cuello?: string;
    extremidades?: string;
    idExamFisicoRegional?: number;
    observaciones?: string;
    pelvis?: string;
    torax?: string;
}