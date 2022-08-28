import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { EvolucionControllerService } from 'src/app/api/evolucionController.service';
import { Evolucion } from 'src/app/model/evolucion';

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrls: ['./evolucion.component.css']
})
export class EvolucionComponent implements OnInit {

  constructor(
    private persnaService: AuthControllerService,
    private evolucionService:EvolucionControllerService,
    private messageService:MessageService
  ) { }

  //!variables
  buscarcedula: string;
  buscarnombre: string
  sexo: string;
  idper: number
  idEvo:any;
  errMsj:String;
  usuarioE:any;
  //formulario
  Evolu: Evolucion = {
    idEvolucion: null,
    evolucion: null,
    fecha: null,
    hora: null,
    indicaciones: null,
    medicamento: null,
    usuario: null,
  }

  ngOnInit(): void {
  }



  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.Evolu.usuario = this.usuarioE
          console.log(this.Evolu);
          this.saveEvolucion()
        }
      }
    })
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
            break;
            //        this.numHoja= datos.dondeesa lo del numero de hoja?????????????????????????????????? eso todavia no le pongo ajajja le qu jaejajjaja chiiiiiiiiiiii bueno le haces como le hago yo
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

    })
  }

  saveEvolucion() {
    console.log(this.Evolu);

    this.evolucionService.saveEvolucionUsingPOST(this.Evolu).subscribe(
      res => {
        if (res.object != null) {
          this.idEvo = res.object
          console.log(this.idEvo);
          this.MessageSuccess(" Evolucion  creado")
          console.log(this.Evolu);

        } else {
          this.mensajeError("error al crear evolucion")
          console.log(" holii" + this.idEvo);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  mensajeError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  MessageSuccess(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }
}
