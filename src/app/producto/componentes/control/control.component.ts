import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  productos: Producto[] = [];
  provedores: Proveedor[] = [];
  isAdmin = false;

  constructor(
    private productoService: ProductoService,
    private provedorService:ProveedorService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
    this.provedorService.lista().subscribe(
      data => {
        this.provedores = data;
      },
      err => {
        console.log(err);
      }
    );
  }


  borrar(id: number) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }


}
