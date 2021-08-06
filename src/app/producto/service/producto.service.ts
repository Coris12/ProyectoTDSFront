import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productoURL = environment.productoURL;
  private httpHeaders = new HttpHeaders({ 'ContentType': 'application/json' });
  constructor(private httpClient: HttpClient) { }


  public lista(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.productoURL + 'search');
  }

  public detail(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.patch<any>(this.productoURL + `deleteLogic/${id}`,{headers:this.httpHeaders});
  }
}
