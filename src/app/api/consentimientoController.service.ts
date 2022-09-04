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

import { ConsentimientoDto } from '../model/consentimientoDto';
import { GenericResponseListConsentimientoListDto } from '../model/genericResponseListConsentimientoListDto';
import { GenericResponseOptionalConsentimientoDto } from '../model/genericResponseOptionalConsentimientoDto';
import { GenericResponsestring } from '../model/genericResponsestring';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ConsentimientoControllerService {

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
     * deleteConsentimiento
     *
     * @param idConsentimiento idConsentimiento
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteConsentimientoUsingPUT(idConsentimiento: number, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public deleteConsentimientoUsingPUT(idConsentimiento: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public deleteConsentimientoUsingPUT(idConsentimiento: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public deleteConsentimientoUsingPUT(idConsentimiento: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idConsentimiento === null || idConsentimiento === undefined) {
            throw new Error('Required parameter idConsentimiento was null or undefined when calling deleteConsentimientoUsingPUT.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idConsentimiento !== undefined && idConsentimiento !== null) {
            queryParameters = queryParameters.set('idConsentimiento', <any>idConsentimiento);
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

        return this.httpClient.request<GenericResponsestring>('put',`${this.basePath}/consentimiento/deleteConsentimiento`,
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
     * getOneConsentimientoById
     *
     * @param idConsentimiento idConsentimiento
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOneConsentimientoByIdUsingGET(idConsentimiento?: number, observe?: 'body', reportProgress?: boolean): Observable<GenericResponseOptionalConsentimientoDto>;
    public getOneConsentimientoByIdUsingGET(idConsentimiento?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseOptionalConsentimientoDto>>;
    public getOneConsentimientoByIdUsingGET(idConsentimiento?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseOptionalConsentimientoDto>>;
    public getOneConsentimientoByIdUsingGET(idConsentimiento?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idConsentimiento !== undefined && idConsentimiento !== null) {
            queryParameters = queryParameters.set('idConsentimiento', <any>idConsentimiento);
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

        return this.httpClient.request<GenericResponseOptionalConsentimientoDto>('get',`${this.basePath}/consentimiento/getOneConsentimientoById`,
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
     * listAllConsentimientos
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listAllConsentimientosUsingGET(observe?: 'body', reportProgress?: boolean): Observable<GenericResponseListConsentimientoListDto>;
    public listAllConsentimientosUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponseListConsentimientoListDto>>;
    public listAllConsentimientosUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponseListConsentimientoListDto>>;
    public listAllConsentimientosUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<GenericResponseListConsentimientoListDto>('get',`${this.basePath}/consentimiento/listAllConsentimientos`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveConsentimiento
     *
     * @param body consentimiento
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveConsentimientoUsingPOST(body: ConsentimientoDto, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public saveConsentimientoUsingPOST(body: ConsentimientoDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public saveConsentimientoUsingPOST(body: ConsentimientoDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public saveConsentimientoUsingPOST(body: ConsentimientoDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveConsentimientoUsingPOST.');
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

        return this.httpClient.request<GenericResponsestring>('post',`${this.basePath}/consentimiento/saveConsentimiento`,
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
     * updateConsentimiento
     *
     * @param body consentimientoDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateConsentimientoUsingPUT(body: ConsentimientoDto, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public updateConsentimientoUsingPUT(body: ConsentimientoDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public updateConsentimientoUsingPUT(body: ConsentimientoDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public updateConsentimientoUsingPUT(body: ConsentimientoDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateConsentimientoUsingPUT.');
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

        return this.httpClient.request<GenericResponsestring>('put',`${this.basePath}/consentimiento/updateConsentimiento`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}