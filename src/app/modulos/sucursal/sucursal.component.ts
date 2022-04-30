import { SucursalControllerService } from './../../api/sucursalController.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Sucursal } from '../../model/sucursal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthControllerService } from 'src/app/api/authController.service';
import { Usuario } from 'src/app/model/usuario';

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
  
  loading: boolean; // * lazy load
  totalRecords: number

  //! abre el dialo de sucursal
  sucursalDialog : boolean;

  //! lista las convocatorias
  sucursal: Sucursal []= [];


  constructor(private sucursalController: SucursalControllerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarSucursales();
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
    this.sucursalController.listaUsingGET1().subscribe(
      data => {
        this.sucursal = data;
        this.totalRecords = this.sucursal.length;
      },
      err => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: err });
      }
    );
  }

  borrarSucursal(){

  }

}
