import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TarjetaControllerService } from 'src/app/api/tarjetaController.service';
import { Tarjeta } from '../../../model/tarjeta';

@Component({
  selector: 'app-lista-tarjetas',
  templateUrl: './lista-tarjetas.component.html',
  styleUrls: ['./lista-tarjetas.component.css']
})
export class ListaTarjetasComponent implements OnInit {

  constructor(
    private tarjetaController: TarjetaControllerService,
    private messageService: MessageService,
  ) { }

totalRecords: number;

tarjetas:Tarjeta [] =[];

loading: boolean

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  borrarTarjeta(){


  }
  updateTarjeta(){

  }

  cargarTarjetas(){
    this.tarjetaController.listaTarjetasAUsingGET().subscribe(
      data => {
        this.tarjetas = data;
        console.log(this.tarjetas)
        this.totalRecords = this.tarjetas.length;
      },
      err => {
        this.messageService.add({ severity: 'danger', summary: 'Error', detail: err });
      }
    );
  }

}
