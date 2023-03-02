import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AnestesiaControllerService } from 'src/app/api/anestesiaController.service';
import { AuthControllerService } from 'src/app/api/authController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { Anestesia } from 'src/app/model/anestesia';

@Component({
  selector: 'app-anestesia',
  templateUrl: './anestesia.component.html',
  styleUrls: ['./anestesia.component.css']
})
export class AnestesiaComponent implements OnInit {
  buscarcedula: string;
  buscarnombre: string;
  idpersona: number;
  sexo: string;
  edad: number
  numcli: number
  idAnes: any
  errMsj: string
  idper:number
  usuarioE:any

  constructor(
    private persnaService: AuthControllerService,
    private historiaService: HistoriaControllerService,
    private messageService: MessageService,
    private anesSservice: AnestesiaControllerService
  ) { }

  Aneste: Anestesia = {
    anestecio: null,
    ayudanteA: null,
    ayudanteC: null,
    cama: null,
    cirujano: null,
    estatura: null,
    fecha: null,
    horaA: null,
    horaO: null,
    idAnes: null,
    intrumentista: null,
    minA: null,
    ocupacion: null,
    peso: null,
    post: null,
    pre: null,
    propuesta: null,
    realizada: null,
    sala: null,
    servicio: null,
    tipoD: null,
    usuario: null,
  }
  ngOnInit(): void {
  }

  selectedValue: string;


  buscarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.identificacion == this.buscarcedula) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.nombres == this.buscarnombre) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
          }
        }
      }
      console.log(res);
    })

    this.historiaService.listUsingGET6().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.usuario.identificacion == this.buscarcedula) {
            this.idpersona = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl

            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.usuario.nombres == this.buscarnombre) {
            this.idpersona = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl
          }
        }
      }
      console.log(res);
    })

  }

  guardarAnes() {
    console.log(this.Aneste);
    this.anesSservice.saveHistoriaClinicaUsingPOST(this.Aneste).subscribe(
      res => {
        if (res.object != null) {
          this.idAnes = res.object
          console.log(this.idAnes);
          this.MessageSuccess(" Ficha  creado")
          console.log(this.Aneste);
        } else {
          this.mensajeError("error al crear ficha aodontologica")
          console.log(" holii" + this.idAnes);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.Aneste.usuario = this.usuarioE

          console.log(this.Aneste);
          this.guardarAnes()

        }
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
  validacionAlfanumerica(event) {
    const patron = /[a-zA-ZÑ0-9 ,:-]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validarLetras(event) {
    const patron = /[a-zA-Z ]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validarLetrasYPunto(event) {
    const patron = /[a-zA-Z .]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validacionsoloLetrasNumeros(event) {
    const patron = /[a-zA-ZÑ0-9]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }
}
