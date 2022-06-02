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

import { GenericResponseUsuario } from '../model/genericResponseUsuario';
import { GenericResponseobject } from '../model/genericResponseobject';
import { JwtDto } from '../model/jwtDto';
import { LoginUsuario } from '../model/loginUsuario';
import { NuevoUsuario } from '../model/nuevoUsuario';
import { Usuario } from '../model/usuario';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AuthControllerService {

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
     * getPersonaByIdentificacion
     * 
     * @param identificacion identificacion
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPersonaByIdentificacionUsingGET(identificacion: string, observe?: 'body', reportProgress?: boolean): Observable<GenericResponseUsuario>;
    public getPersonaByIdentificacionUsingGET(identificacion: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseUsuario>>;
    public getPersonaByIdentificacionUsingGET(identificacion: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseUsuario>>;
    public getPersonaByIdentificacionUsingGET(identificacion: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (identificacion === null || identificacion === undefined) {
            throw new Error('Required parameter identificacion was null or undefined when calling getPersonaByIdentificacionUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (identificacion !== undefined && identificacion !== null) {
            queryParameters = queryParameters.set('identificacion', <any>identificacion);
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

        return this.httpClient.request<GenericResponseUsuario>('get',`${this.basePath}/auth/get-persona`,
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
     * Muestra la lista de usuarios en el sistema
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listaUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<Usuario>>;
    public listaUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Usuario>>>;
    public listaUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Usuario>>>;
    public listaUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<Usuario>>('get',`${this.basePath}/auth/listaUsuarios`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * login
     * 
     * @param body loginUsuario
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public loginUsingPOST(body: LoginUsuario, observe?: 'body', reportProgress?: boolean): Observable<JwtDto>;
    public loginUsingPOST(body: LoginUsuario, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JwtDto>>;
    public loginUsingPOST(body: LoginUsuario, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JwtDto>>;
    public loginUsingPOST(body: LoginUsuario, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling loginUsingPOST.');
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

        return this.httpClient.request<JwtDto>('post',`${this.basePath}/auth/login`,
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
     * nuevo
     * 
     * @param body nuevoUsuario
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public nuevoUsingPOST(body: NuevoUsuario, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public nuevoUsingPOST(body: NuevoUsuario, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public nuevoUsingPOST(body: NuevoUsuario, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public nuevoUsingPOST(body: NuevoUsuario, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling nuevoUsingPOST.');
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

        return this.httpClient.request<any>('post',`${this.basePath}/auth/nuevo`,
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
     * putArrendatario
     * 
     * @param idpersona idpersona
     * @param rol rol
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public putArrendatarioUsingPOST(idpersona: number, rol: string, observe?: 'body', reportProgress?: boolean): Observable<GenericResponseobject>;
    public putArrendatarioUsingPOST(idpersona: number, rol: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseobject>>;
    public putArrendatarioUsingPOST(idpersona: number, rol: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseobject>>;
    public putArrendatarioUsingPOST(idpersona: number, rol: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idpersona === null || idpersona === undefined) {
            throw new Error('Required parameter idpersona was null or undefined when calling putArrendatarioUsingPOST.');
        }

        if (rol === null || rol === undefined) {
            throw new Error('Required parameter rol was null or undefined when calling putArrendatarioUsingPOST.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idpersona !== undefined && idpersona !== null) {
            queryParameters = queryParameters.set('idpersona', <any>idpersona);
        }
        if (rol !== undefined && rol !== null) {
            queryParameters = queryParameters.set('rol', <any>rol);
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

        return this.httpClient.request<GenericResponseobject>('post',`${this.basePath}/auth/put-persona`,
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
     * refresh
     * 
     * @param body jwtDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public refreshUsingPOST(body: JwtDto, observe?: 'body', reportProgress?: boolean): Observable<JwtDto>;
    public refreshUsingPOST(body: JwtDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JwtDto>>;
    public refreshUsingPOST(body: JwtDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JwtDto>>;
    public refreshUsingPOST(body: JwtDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling refreshUsingPOST.');
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

        return this.httpClient.request<JwtDto>('post',`${this.basePath}/auth/refresh`,
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
     * search
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public searchUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<Usuario>>;
    public searchUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Usuario>>>;
    public searchUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Usuario>>>;
    public searchUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<Usuario>>('get',`${this.basePath}/auth/clientes`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
