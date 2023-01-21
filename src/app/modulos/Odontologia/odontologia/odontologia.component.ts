import { Component, OnInit } from '@angular/core';
import { AuthControllerService } from 'src/app/api/authController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';

@Component({
  selector: 'app-odontologia',
  templateUrl: './odontologia.component.html',
  styleUrls: ['./odontologia.component.css']
})
export class OdontologiaComponent implements OnInit {

  constructor(
    private persnaService: AuthControllerService,
    private histService: HistoriaControllerService

  ) {

  }

  establecimiento = "C.E.M. MEDIVALLE";

  //variables
  buscarcedula: string;
  buscarnombre: string;
  idper: number;
  usarioE: number;
  sexo: string;
  his: any;
  idper1: number

  ngOnInit(): void {
    this.buscar();
  }


  buscarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      //console.log(this.buscarcedula, this.buscarnombre);
      for (let datos of res) {

        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          //console.log(datos.identificacion, this.buscarcedula);
          //this.buscarnombre = ""
          if (datos.identificacion == this.buscarcedula) {
            this.idper = datos.id

            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
            this.buscar
            break;
          }
          
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          //console.log(datos.nombres, this.buscarnombre);
          //this.buscarcedula = ""
          if (datos.nombres == this.buscarnombre) {
            this.idper = datos.id

            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
          }
        }

      }
      console.log(res);
console.log(''+this.idper);

    })

  }

  buscar() {
    this.histService.listUsingGET6().subscribe((res) => {
      //console.log(this.buscarcedula, this.buscarnombre);
      for (let datos of res) {
        if (datos.usuario.id == this.idper) {
          this.his = datos.numCl
          this.idper1 = datos.usuario.id

        }
      }
      console.log(res);

    })
  }
}
