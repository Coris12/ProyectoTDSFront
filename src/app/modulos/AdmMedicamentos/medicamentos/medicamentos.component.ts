import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
dialogo:boolean;
medicamentos:any[];
public medicaForm = new FormGroup({
});
  constructor() { }

  ngOnInit(): void {
  }
 saveMedicamento(){

 }
}
