import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';

import { Proveedor } from 'src/app/model/proveedor';
import { Usuario } from 'src/app/model/usuario';
import { ProveedorControllerService } from '../../api/proveedorController.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveForm = new FormGroup({
    idProveedor: new FormControl(null),
    estado: new FormControl(null),
    nombreComercialPro: new FormControl(null, [Validators.nullValidator, Validators.required]),
    usuario: new FormControl(null, [Validators.nullValidator, Validators.required])
  });


  //variables
  proveedor: Proveedor[] = [];
  prove: any[];

  //*lazy
  loading: boolean;
  totalRecords: number
  usuarios: Usuario[] = [];

  proveDialog: boolean;

  constructor(
    private authController: AuthControllerService,
    private proveedorController: ProveedorControllerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.proveedorController.searchUsingGET3().subscribe((data: any) => {
      this.prove = data;
      console.log(this.prove);
    })
    this.cargarProveedor();
    this.cargarUsuarios();
  }

  cargarProveedor(event?: LazyLoadEvent): void {
    this.loading = true;
    setTimeout(() => {
      this.proveedorController.searchUsingGET3().subscribe(
        data => {
          this.proveedor = data;
          console.log(data);
          this.totalRecords = this.proveedor.length;
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
  }

  updateProveedor(idProveedor: number) {
    //console.log(idProveedor);

    this.proveedorController.getByIdUsingGET11(idProveedor)
      .subscribe(prove => {
        //console.log(prove.id_proveedor, prove.id_proveedor)
        this.proveForm.setValue({
          idProveedor: prove.idProveedor,
          estado: prove.estado,
          nombreComercialPro: prove.nombreComercialPro,
          usuario: prove.usuario,
        });
      });
    this.proveDialog = true;
  }

  saveProveedor() {
    console.log(this.proveForm.value)
    if (this.proveForm.value?.idProveedor !== null) {
      this.proveedorController.updateUsingPUT3(
        this.proveForm.value,
        this.proveForm.value?.idProveedor,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'info',
          summary: 'Proveedor Actualizado',
          detail: data.object
        });
        this.proveDialog = false;
        this.cargarProveedor();
      });
    } else {
      this.proveedorController.createUsingPOST5(
        this.proveForm.value,
        this.proveForm.value?.usuario.idUsuario,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Producto Creado .'
        });
      },
        error =>
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: error.mensaje
          })
      );
      this.proveDialog = false;
      this.proveForm.setValue({
        idProveedor: null,
        estado: null,
        nombreComercialPro: null,
        usuario: null
      })
    }
  }

  borrarProveedor(idProveedor): void {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el proveedor ?',
      accept: () => {
        this.proveedorController.deleteEmpleadoUsingPATCH1(idProveedor).subscribe(
          data => {
            this.messageService.add({
              severity: 'success',
              summary: 'Proveedor Eliminado',
              detail: 'Eliminar.'
            });
            setTimeout(() => {
              this.cargarProveedor();
            }, 1000);
          },
          error =>
            this.messageService.add({
              severity: 'Danger',
              summary: 'Error',
              detail: error.mensaje
            })
        );
      }
    })
  }

  cargarUsuarios(): void {
    this.authController.listaUsingGET().subscribe(
      data => {
        this.usuarios = data;
      },
      err => {
        console.log(err);
      }

    );

  }
}
