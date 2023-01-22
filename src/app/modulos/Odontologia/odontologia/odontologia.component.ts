import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { IndiceControlllerService } from 'src/app/api/indiceControlller.service';
import { OdontologiaControllerService } from 'src/app/api/odontologiaController.service';
import { IndicesCPO } from 'src/app/model/indicesCPO';
import { Odontologia } from 'src/app/model/odontologia';

@Component({
  selector: 'app-odontologia',
  templateUrl: './odontologia.component.html',
  styleUrls: ['./odontologia.component.css']
})
export class OdontologiaComponent implements OnInit {

  constructor(
    private persnaService: AuthControllerService,
    private histService: HistoriaControllerService,
    private odonService: OdontologiaControllerService,
    private indiService: IndiceControlllerService,
    private messageService: MessageService,

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
  idOdont: any
  errMsj: String;
  usuarioE: any;
  idIndi: any
  //
  Odonto: Odontologia = {
    codigo: null,
    diagnostico:null,
    enfermedad: null,
    establecimiento: null,
    examen:null,
    fecha: null,
    frecCardiaca: null,
    frecRespi: null,
    idOdonto: null,
    motivo: null,
    prescripcion: null,
    presion: null,
    procedimiento: null,
    sesion: null,
    temperatura: null,
    usuario: null
  }

  indice: IndicesCPO = {
    c: null,
    c1: null,
    d: null,
    d1: null,
    idIndice: null,
    o: null,
    o1: null,
    odontologia: null,
    p: null,
    p1: null,
    totalD: null,
    totald1: null
  }


  ngOnInit(): void {
    this.buscar();
    this.recuperarprotocolo()
  }

  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.Odonto.usuario = this.usuarioE

          console.log(this.Odonto);
          this.guardarOdonto()
          
        }
      }
    })
  }

  guardarOdonto() {
    
    console.log(this.Odonto);
    this.Odonto.establecimiento = this.establecimiento
    this.odonService.saveOdontologiaUsingPOST(this.Odonto).subscribe(
      res => {
        if (res.object != null) {
          this.idOdont = res.object
          console.log(this.idOdont);
          this.MessageSuccess(" Odontologia  creado")
          this.recuperarprotocolo()
          console.log(this.Odonto);
        } else {
          this.mensajeError("error al crear ficha aodontologica")
          console.log(" holii" + this.idOdont);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  guardarIndice() {
    this.indiService.saveIndiceUsingPOST(this.indice).subscribe(
      res => {
        if (res.object != null) {
          this.idIndi = res.object
          console.log(this.indice);
          this.MessageSuccess("Exito")
          
          console.log(this.indice);

        } else {
          this.mensajeError("error al crear")
          console.log(" holii" + this.idIndi);
          console.log("error" + this.errMsj)
          console.log(res.object);

        }
      }
    )
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

  recuperarprotocolo() {

    this.odonService.listUsingGET11().subscribe((res) => {
      for (let datos of res) {
        if (datos.idOdonto == this.idOdont) {
          this.indice.odontologia = datos
          console.log(this.idOdont);
          this.guardarIndice();
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
      console.log('' + this.idper);

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
