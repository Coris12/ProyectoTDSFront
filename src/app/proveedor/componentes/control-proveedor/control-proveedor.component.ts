import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { TokenService } from '../../../service/token.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-control-proveedor',
  templateUrl: './control-proveedor.component.html',
  styleUrls: ['./control-proveedor.component.css']
})
export class ControlProveedorComponent implements OnInit {

  proveedores: Proveedor[];
  proveedor: Proveedor;
//provedores: Proveedor[] = [];
  selectedProveedor: Proveedor[];
  isAdmin = false;

  //animaciones
  loading: boolean = true;

  //control formulario
  submitted: boolean;

  //ventada emergente
  productDialog: boolean;
  constructor(
    private provedorService: ProveedorService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.cargarProveedor();
    this.isAdmin = this.tokenService.isAdmin();
  }

  //testeo
  //! nuevo product
  openNew() {
    this.proveedor = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(provee: Proveedor) {
    this.proveedor = { ...provee };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProveedor() {
    this.submitted = true;
    if (this.proveedor.nombreP.trim()) {
      if (this.proveedor.idP) {
        this.proveedores[this.findIndexById(this.proveedor.nombreP)] = this.proveedor;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Proveedor Creado', life: 3000});
      }
      this.proveedores = [...this.proveedores];
      this.productDialog = false;
      this.proveedor = {};
    }
  }

  findIndexById(nombre: string): number {
    let index = -1;
    for (let i = 0; i < this.proveedores.length; i++) {
        if (this.proveedores[i].nombreP === nombre) {
            index = i;
            break;
        }
    }

    return index;
}
  //fin testeo

  cargarProveedor(): void {
    this.provedorService.lista().subscribe(
      data => {
        this.proveedores = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  //borra funciona en prime ng
  borrar(id: number) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el Proveedor ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.provedorService.delete(id).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Proveedor eliminado', life: 3000 });
            this.cargarProveedor();
          });
      }
    })
  }


}

