import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Proveedor } from '../model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  proveedorURL = environment.proveedorURL;
 
  private httpHeaders = new HttpHeaders({ 'ContentType': 'application/json' });
  constructor(private httpClient: HttpClient) { }
  
  
  public save(proveedor: Proveedor): Observable<any> {
    return this.httpClient.post<any>(this.proveedorURL + 'insertar', proveedor);
  }
  public detail(id: number): Observable<Proveedor> {
    return this.httpClient.get<Proveedor>(this.proveedorURL + `detail/${id}`);
  }
  public lista(): Observable<Proveedor[]> {
    return this.httpClient.get<Proveedor[]>(this.proveedorURL  + 'list');
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proveedorURL + `delete/${id}`);
  }
  public update(id: number, proveedor: Proveedor): Observable<any> {
    return this.httpClient.put<any>(this.proveedorURL + `updateProveedor/${id}`, proveedor);
  }
  /*getProv(): Observable<Proveedor[]> {
    return this.httpClient.get(this.proveedorURL).pipe(
      map(provee => provee as Proveedor[])
    );
  }*/
}
