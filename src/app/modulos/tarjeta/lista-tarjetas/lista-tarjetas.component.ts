import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-tarjetas',
  templateUrl: './lista-tarjetas.component.html',
  styleUrls: ['./lista-tarjetas.component.css']
})
export class ListaTarjetasComponent implements OnInit {

  constructor() { }

totalRecords: number;

tarjetas:any;

loading: boolean

  ngOnInit(): void {
  }

  borrarTarjeta(){


  }
  updateTarjeta(){

  }

  cargarTarjetas(){
    
  }

}
