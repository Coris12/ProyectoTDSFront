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

import { GenericResponsestring } from '../model/genericResponsestring';
import { HistoriaClinica } from '../model/historiaClinica';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class HistoriaControllerService {

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
     * generarPdf
     * 
     * @param idHi idHi
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public generarPdfUsingGET3(idHi?: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public generarPdfUsingGET3(idHi?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public generarPdfUsingGET3(idHi?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public generarPdfUsingGET3(idHi?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idHi !== undefined && idHi !== null) {
            queryParameters = queryParameters.set('idHi', <any>idHi);
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

        return this.httpClient.request<string>('get',`${this.basePath}/HistoriaClinica/generarPdf`,
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
     * getById
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getByIdUsingGET5(id: number, observe?: 'body', reportProgress?: boolean): Observable<HistoriaClinica>;
    public getByIdUsingGET5(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<HistoriaClinica>>;
    public getByIdUsingGET5(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<HistoriaClinica>>;
    public getByIdUsingGET5(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getByIdUsingGET5.');
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

        return this.httpClient.request<HistoriaClinica>('get',`${this.basePath}/HistoriaClinica/detallesHistoriaClinica/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Muestra una lista de las historias clinicas
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listUsingGET6(observe?: 'body', reportProgress?: boolean): Observable<Array<HistoriaClinica>>;
    public listUsingGET6(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<HistoriaClinica>>>;
    public listUsingGET6(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<HistoriaClinica>>>;
    public listUsingGET6(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<HistoriaClinica>>('get',`${this.basePath}/HistoriaClinica/listaDiagnostico`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveHistoriaClinica
     * 
     * @param body historia
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveHistoriaClinicaUsingPOST(body: HistoriaClinica, observe?: 'body', reportProgress?: boolean): Observable<GenericResponsestring>;
    public saveHistoriaClinicaUsingPOST(body: HistoriaClinica, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GenericResponsestring>>;
    public saveHistoriaClinicaUsingPOST(body: HistoriaClinica, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GenericResponsestring>>;
    public saveHistoriaClinicaUsingPOST(body: HistoriaClinica, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveHistoriaClinicaUsingPOST.');
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

        return this.httpClient.request<GenericResponsestring>('post',`${this.basePath}/HistoriaClinica/saveHistoriaClinica`,
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
