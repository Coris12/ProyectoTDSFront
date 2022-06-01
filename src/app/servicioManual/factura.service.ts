import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  baseUrl:string = 'http://localhost:8080/factura';
  constructor(private http:HttpClient ) { }

  generarPdfFacturaUsuario(idFactura:number){
    return this.http.get(this.baseUrl+'/generarPdfUsuario?idFactura='+idFactura,{responseType:'blob' as 'json'});
  }
}
