import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { HistoriaClinica } from 'src/app/model/historiaClinica';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {

  buscarcedula: string;
  buscarnombre: string;
  idpersona: number;
  idHistoria:any
  usuarioN:any

  historia: HistoriaClinica = {
    alergia: null,
    examen:null,
    apf: null,
    app: null,
    edad: null,
    enfermedad: null,
    estado: null,
    estadoCivil: null,
    fc: null,
    fecha: null,
    fr: null,
    habitos: null,
    idHistoria: null,
    motivo: null,
    numCl: null,
    procedencia: null,
    religion: null,
    residencia: null,
    spo2: null,
    dx:null,
    ta: null,
    dr:null,
    tem: null,
    tipoSangre: null,
    usuario: null,
  }

  constructor(
    private persnaService: AuthControllerService,
    private historiaService:HistoriaControllerService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
  }

  buscarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.identificacion == this.buscarcedula) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.nombres == this.buscarnombre) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
          }
        }
      }
      console.log(res);
    })
  }

  guardarTodo(){
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
          console.log(datos.id, this.idpersona);
          this.usuarioN = datos
          this.historia.usuario = this.usuarioN
          console.log(this.historia);
          this.saveHistoriaClinica()

        }
      }
    })
  }

  saveHistoriaClinica(){
    console.log(this.historia);
    this.historiaService.saveHistoriaClinicaUsingPOST(this.historia).subscribe(
      res => {
        if (res.object != null) {
          this.idHistoria = res.object
          console.log(this.idHistoria);
          this.MessageSuccess(" Historia Clinica  creado")
          console.log(this.idHistoria);
        } else {
          this.mensajeError("error al crear historia clinica")
          console.log(" holii" + this.idHistoria);
          console.log("error" + this.idHistoria)
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
