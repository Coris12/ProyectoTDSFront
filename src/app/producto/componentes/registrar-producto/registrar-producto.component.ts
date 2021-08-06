import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { Proveedor } from 'src/app/proveedor/model/proveedor';
import { ProveedorService } from 'src/app/proveedor/service/proveedor.service';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {


  nombreProducto = '';
  nombreProveedor = '';
  precioProducto: number = null;

  producto: Producto = new Producto();
  idProveedor: number;

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
        this.productoService.save(this.producto).subscribe(
      data => {
       if(data){
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
       }
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
    

  /*  const proveedor = new Proveedor(this.nombreProveedor);
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
