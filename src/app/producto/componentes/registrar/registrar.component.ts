import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  nombre = '';
  nombreP = '';
  precio: number = null;

  
  idP: number;

  provee: Proveedor[];
  proveer:any[]
  proveedorElegida: Proveedor = null;
  selectedProveedor: string;
  item: string;
  items: SelectItem[];
  
  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.items = [];
    this.proveer = [
      { idP: 1, nombreP: 'Nike' },
      { idP: 2, nombreP: 'Adidas'},
    ];
    
  }

  ngOnInit() {
  
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
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );

    const proveedor = new Proveedor(this.nombreP);
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
       );
  }

}
