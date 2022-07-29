import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  selectedCities: string[] = [];
  constructor() { }

  ngOnInit(): void {
   this.selectedCities
  }

}
