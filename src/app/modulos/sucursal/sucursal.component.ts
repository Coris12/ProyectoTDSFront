import { SucursalControllerService } from './../../api/sucursalController.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Sucursal } from '../../model/sucursal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {


  public sucursalForm = new FormGroup({
    idSucursal: new FormControl(null),
    correoSuc: new FormControl(null, [Validators.nullValidator, Validators.required]),
    direccionSuc: new FormControl(null, [Validators.nullValidator, Validators.required]),
    nombreSuc: new FormControl(null, [Validators.nullValidator, Validators.required]),
    telefonoSuc: new FormControl(null, [Validators.nullValidator, Validators.required]),
  })

  //!! Buscar de la tabla
  @ViewChild('dt') table: Table;
  //! variables
  columnas: any[];
  suc: any[];

  loading: boolean; // * lazy load
  totalRecords: number

  //! abre el dialo de sucursal
  sucursalDialog: boolean;

  //! lista las convocatorias
  sucursal: Sucursal[] = [];


  constructor(private sucursalController: SucursalControllerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.cargarSucursales();
    this.sucursalController.searchUsingGET4().subscribe((data: any) => {
      this.suc = data;
      console.log(this.suc);
    })
  }


  updateSucursal(idSucursal: number) {
    this.sucursalController.getSucursalByIdUsingGET(idSucursal)
      .subscribe(suc => {
        console.log(suc.object.idSucursal)
        this.sucursalForm.setValue({
          idSucursal: suc.object.idSucursal,
          correoSuc: suc.object.correoSuc,
          direccionSuc: suc.object.direccionSuc,
          nombreSuc: suc.object.nombreSuc,
          telefonoSuc: suc.object.telefonoSuc,
        });
      });
    this.sucursalDialog = true;

  }

  guardarSucursal() {
    console.log(this.sucursalForm.value)
    if (this.sucursalForm.value?.idSucursal !== null) {
      this.sucursalController.updateUsingPUT4(
        this.sucursalForm.value,
        this.sucursalForm.value?.idSucursal,
      ).subscribe(data => {
        this.messageService.add({
          severity: 'info',
          summary: 'Producto Actualizado',
          detail: data.object
        });
        this.sucursalDialog = false;
        this.cargarSucursales();
      });
    } else {
      this.sucursalController.guardarFacturaUsingPOST(
        this.sucursalForm.value
      ).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Sucursal creada con exito.' });

      },
        error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));

      this.sucursalDialog = false;
      this.sucursalForm.setValue({
        idSucursal: null,
        correoSuc: null,
        direccionSuc: null,
        nombreSuc: null,
        telefonoSuc: null
      })

    }
  }


  cargarSucursales() {
    this.sucursalController.searchUsingGET4().subscribe(
      data => {
        this.sucursal = data;
        this.totalRecords = this.sucursal.length;
      },
      err => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: err });
      }
    );
  }


  //metodo de borrado logico
borrarSucursal(idSucursal: number): void {
console.log(idSucursal)
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar la sucursal?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.sucursalController.deleletSucursalUsingPATCH(idSucursal).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Producto Eliminado', detail: 'eliminar.' });
            setTimeout(() => {
              this.cargarSucursales();
            }, 1000);
          },
          error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
      }
    });

  }
  // fin del metodo

}
