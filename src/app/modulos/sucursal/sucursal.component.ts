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

  guardarSucursal() {
    this.sucursalController.guardarFacturaUsingPOST(
      this.sucursalForm.value
    ).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Sucursal creada con exito.' });

    },
      error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
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

  borrarSucursal(idSucursal: number) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar la Sucursal?',
      
      accept: () => {
        //Actual logic to perform a confirmation
        this.sucursalController.deleletSucursalUsingPATCH(idSucursal).subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Sucursal Eliminado', detail: 'eliminar.' });
            setTimeout(() => {
              this.cargarSucursales();
            }, 1000);
          },
          error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: error.mensaje }));
      }
    });
  }

}
