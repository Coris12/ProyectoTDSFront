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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Cliente } from '../model/cliente';
import { GenericResponseCliente } from '../model/genericResponseCliente';
import { GenericResponsestring } from '../model/genericResponsestring';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ClienteControllerService {

    protected basePath = '//localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Buscar cliente por id
     * 
     * @param idCliente idCliente
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public buscarPorIdClienteUsingGET(idCliente: number, observe?: 'body', reportProgress?: boolean): Observable<GenericResponseCliente>;
    public buscarPorIdClienteUsingGET(idCliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseCliente>>;
    public buscarPorIdClienteUsingGET(idCliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseCliente>>;
    public buscarPorIdClienteUsingGET(idCliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling buscarPorIdClienteUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idCliente !== undefined && idCliente !== null) {
            queryParameters = queryParameters.set('idCliente', <any>idCliente);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<GenericResponseCliente>('get',`${this.basePath}/cliente/findByIdCliente`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Buscar cliente por id
     * 
     * @param idPersona idPersona
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public buscarPorIdPersonaClienteUsingGET(idPersona: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Cliente>>;
    public buscarPorIdPersonaClienteUsingGET(idPersona: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Cliente>>>;
    public buscarPorIdPersonaClienteUsingGET(idPersona: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Cliente>>>;
    public buscarPorIdPersonaClienteUsingGET(idPersona: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idPersona === null || idPersona === undefined) {
            throw new Error('Required parameter idPersona was null or undefined when calling buscarPorIdPersonaClienteUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idPersona !== undefined && idPersona !== null) {
            queryParameters = queryParameters.set('idPersona', <any>idPersona);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Cliente>>('get',`${this.basePath}/cliente/findByIdPersonaCliente`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Crea al cliente
     * 
     * @param body cliente
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsingPOST(body: Cliente, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createUsingPOST(body: Cliente, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createUsingPOST(body: Cliente, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createUsingPOST(body: Cliente, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('post',`${this.basePath}/cliente/crearCliente`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Eliminado logico de cliente
     * 
     * @param idCliente id_cliente
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteClienteUsingPATCH(idCliente: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteClienteUsingPATCH(idCliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteClienteUsingPATCH(idCliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteClienteUsingPATCH(idCliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling deleteClienteUsingPATCH.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idCliente !== undefined && idCliente !== null) {
            queryParameters = queryParameters.set('id_cliente', <any>idCliente);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('patch',`${this.basePath}/cliente/deleteCliente/${encodeURIComponent(String(idCliente))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Muestra una lista de clientes
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<Cliente>>;
    public listUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Cliente>>>;
    public listUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Cliente>>>;
    public listUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Cliente>>('get',`${this.basePath}/cliente/listaClientes`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Actualizar observaciones del cliente
     * 
     * @param observaciones observaciones
     * @param idCliente idCliente
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateClienteObservacionUsingPUT(observaciones: string, idCliente?: number, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public updateClienteObservacionUsingPUT(observaciones: string, idCliente?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public updateClienteObservacionUsingPUT(observaciones: string, idCliente?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public updateClienteObservacionUsingPUT(observaciones: string, idCliente?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (observaciones === null || observaciones === undefined) {
            throw new Error('Required parameter observaciones was null or undefined when calling updateClienteObservacionUsingPUT.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idCliente !== undefined && idCliente !== null) {
            queryParameters = queryParameters.set('idCliente', <any>idCliente);
        }
        if (observaciones !== undefined && observaciones !== null) {
            queryParameters = queryParameters.set('observaciones', <any>observaciones);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<GenericResponsestring>('put',`${this.basePath}/cliente/updateClienteObservacion`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
