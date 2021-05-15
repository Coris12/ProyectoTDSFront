import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  productos: Producto[];
  producto: Producto;
  provedores: Proveedor[] = [];
  selectedProductos: Producto[];
  isAdmin = false;

  //animaciones
  loading: boolean = true;

  //control formulario
  submitted: boolean;

  //ventada emergente
  productDialog: boolean;
  constructor(
    private productoService: ProductoService,
    private provedorService: ProveedorService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }

  //testeo
  //! nuevo product
  openNew() {
    this.producto = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Producto) {
    this.producto = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.producto.nombre.trim()) {
      if (this.producto.id) {
        this.productos[this.findIndexById(this.producto.nombre)] = this.producto;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      this.productos = [...this.productos];
      this.productDialog = false;
      this.producto = {};
    }
  }

  findIndexById(nombre: string): number {
    let index = -1;
    for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].nombre === nombre) {
            index = i;
            break;
        }
    }

    return index;
}
  //fin testeo

  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  //borra funciona en prime ng
  borrar(id: number) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el producto ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoService.delete(id).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            this.cargarProductos();
          });
      }
    })
  }


}
