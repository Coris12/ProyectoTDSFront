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

  genePdfMedicamentos(iden: string){
    return this.http.get(this.baseUrl+'/medicamentos/generarPdf?iden='+iden,{responseType:'blob' as 'json'});
  }

  genePdfEvolucion(iden: string){
    return this.http.get(this.baseUrl+'/evoluciones/generarPdf?iden='+iden,{responseType:'blob' as 'json'});
  }

  genePdfMedicoConsentimietno(idme: number){
    return this.http.get(this.baseUrl+'/consentimientoMedico/generarPdf?idme='+idme,{responseType:'blob' as 'json'});
  }

  genePdfConsentimietnoInformado(idCon: number){
    return this.http.get(this.baseUrl+'/consentimiento/generarPdf?idCon='+idCon,{responseType:'blob' as 'json'});
  }
  genePdHistoria(idHi: number){
    return this.http.get(this.baseUrl+'/HistoriaClinica/generarPdf?idHi='+idHi,{responseType:'blob' as 'json'});
  }
  geneProtocolo(proto: number){
    return this.http.get(this.baseUrl+'/diagnostico/generarPdf?proto='+proto,{responseType:'blob' as 'json'});
  }
  geneOdontologia(idOdon:number){
    return this.http.get(this.baseUrl+'/odontologia/generarPdf?idOdon='+idOdon,{responseType:'blob' as 'json'});
  }
}
