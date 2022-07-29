import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  baseUrl:string = 'http://localhost:8080';
  constructor(private http:HttpClient ) { }

  generarPdfFacturaUsuario(idFactura:number){
    return this.http.get(this.baseUrl+'/factura/generarPdfUsuario?idFactura='+idFactura,{responseType:'blob' as 'json'});
  }
  //http://localhost:8080/consultaExterna/generarPdf?idConExt=100
  genePdfConsultaExterna(idConExt: number){
    return this.http.get(this.baseUrl+'/consultaExterna/generarPdf?idConExt='+idConExt,{responseType:'blob' as 'json'});
  }
}
