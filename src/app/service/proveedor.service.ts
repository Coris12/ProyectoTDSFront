import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';
import { map } from 'rxjs/operators';

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
  getProv(): Observable<Proveedor[]> {
    return this.httpClient.get(this.proveedorURL).pipe(
      map(provee => provee as Proveedor[])
    );
  }
}
