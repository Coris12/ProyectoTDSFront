import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  nombre = '';
  precio: number = null;
  
  nombreP='';
  idP: number;

  provee: Proveedor[];
  proveedorElegida: Proveedor = null;
  

  constructor(
    private productoService: ProductoService,
    private proveedorService:ProveedorService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    this.proveedorService.getProv().subscribe(provee => this.provee = provee);

  }


  onCreate(): void {
    const producto = new Producto(this.nombre, this.precio);
    this.productoService.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
 /* const proveedor = new Proveedor(this.nombreP,this.idP);
    this.proveedorService.save(proveedor).subscribe(
      data => {
        this.toastr.success('Proveedor Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );*/
  }
  
}
