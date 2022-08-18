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
    nombre_comercial_pro: new FormControl(null, [Validators.nullValidator, Validators.required]),
    usuario: new FormControl(null, [Validators.nullValidator, Validators.required])
  });

  dialgoProveedor: boolean;
  totalRecords: number
  //! lista las convocatorias
  proveedor: Proveedor[] = [];

  prove: any[];
  usuarios: Usuario[] = [];

  loading: boolean;

  constructor(private authController: AuthControllerService, private proveedorController: ProveedorControllerService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cargarProveedores();

    this.proveedorController.searchUsingGET3().subscribe((data: any) => {
      this.prove = data;
      console.log(this.prove);
    })

    this.cargarUsuarios();
  }

  /*guardarProveedor() {
    this.proveedorController.createUsingPOST4(
      this.proveForm.value,
      this.proveForm.value?.usuario.idUsuario,
    ).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Proveedor creado con exito.' });
      setTimeout(() => {
        this.cargarProveedores();
      }, 1000);
      this.dialgoProveedor = false;

      this.proveForm.setValue({
        idProveedor: null,
        estado: null,
        nombre_comercial_pro: null,
        usuario: null
      })

    },
      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));

    this.dialgoProveedor = false;



  }*/

  guardarProveedor(): void {
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
        this.dialgoProveedor = false;
        this.cargarProveedores();
      });
    } else {
    this.proveedorController.createUsingPOST4(
      this.proveForm.value,
      this.proveForm.value?.usuario.idUsuario,
      ).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Producto creado .' });
      },
        error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));

      this.dialgoProveedor = false;
      this.proveForm.setValue({
        idProveedor: null,
        estado: null,
        nombre_comercial_pro: null,
        usuarios: null,
      })

    }
  }  l
      
  updateProveedor(idProveedor: number) {
    this.proveedorController.getByIdUsingGET3(idProveedor)
      .subscribe(prove => {
        console.log(prove.idProveedor)
        this.proveForm.setValue({
          idProveedor: prove.idProveedor,
          nombre_comercial_pro: prove.nombreComercialPro,
          usuario: prove.usuario,
          estado: prove.estado,
        });
      });
    this.dialgoProveedor = true;
  }

  cargarProveedores(event?: LazyLoadEvent): void {
    this.loading = true;
    setTimeout(() => {
      this.proveedorController.searchUsingGET3().subscribe(
        data => {
          this.proveedor = data;
          this.totalRecords = this.proveedor.length;
          this.loading = false;
        },
        err => {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: err });
        }

      );
    }, 1000);
  }

  borrarProveedor(idProveedor: number): void {

    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar el proveedor?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.proveedorController.deleteEmpleadoUsingPATCH1(idProveedor).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Proveedor Eliminado', detail: 'eliminar.' });
            setTimeout(() => {
              this.cargarProveedores();
            }, 1000);
          },
          error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
      }
    });

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
