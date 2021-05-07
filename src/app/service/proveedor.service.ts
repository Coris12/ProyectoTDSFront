import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  proveedorURL  = environment.proveedorURL;
  constructor(private httpClient: HttpClient) { }
  
  public lista(): Observable<Proveedor[]> {
    return this.httpClient.get<Proveedor[]>(this.proveedorURL + 'lista');
  }

  public save(proveedor: Proveedor): Observable<any> {
    return this.httpClient.post<any>(this.proveedorURL + 'insertar', proveedor);
  }
}
