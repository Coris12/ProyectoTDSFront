import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdmisionControllerService } from 'src/app/api/admisionController.service';
import { AuthControllerService } from 'src/app/api/authController.service';
import { Admision } from 'src/app/model/admision';
import { ResidenciaDto } from 'src/app/model/residenciaDto';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit {

  constructor(
    private persnaService: AuthControllerService,
    private adService: AdmisionControllerService,
    private messageService: MessageService

  ) { }

  usuarioE:any
  cel: string
  direccion: string
  buscarcedula: string;
  idpersona: any;
  sexo: string
  buscarnombre: string
  establecimiento = "C.E.M. MEDIVALLE";
  idAm: any;
  errMsj: String
  idper:number
  res: ResidenciaDto = {
    barrio: null,
    canton: null,
    nacionalidad: null,
    pais: null,
    parroquia: null,
    provincia: null,
    zona: null
  }

  selectedValue: string;
  adm: Admision = {
    
    cama: null,
    canton: null,
    codUd: null,
    direccP: null,
    emergencia: null,
    empresa: null,
    estadoC: null,
    fecha: null,
    fechaA: null,
    fuente: null,
    idAdmision: null,
    instruccion: null,
    instutucionSistema: null,
    nombre: null,
    numero: null,
    ocupacion: null,
    parantesco: null,
    parroquia: null,
    persona: null,
    provincia: null,
    referidoD: null,
    sala: null,
    servicio: null,
    telefono: null,
    tipoS: null,
    unidadOperativa: null,
    usuario: null,
  }
  ngOnInit(): void {

  }


  guardarA(){
    this.adService.saveAdUsingPOST(this.adm).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR LOS ANTECEDENTES PERSONALES EN EL SERVIDOR");
    });
  }
  guardarAdmision() {
    console.log(this.adm);
    this.adm.instutucionSistema = this.establecimiento
    this.adService.saveAdUsingPOST(this.adm).subscribe(
      res => {
        if (res.object != null) {
          this.idAm = res.object
          console.log(this.idAm);
          this.MessageSuccess(" Odontologia  creado")
          console.log(this.adm);
        } else {
          this.mensajeError("error al crear ficha aodontologica")
          console.log(" holii" + this.adm);
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

  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.adm.usuario = this.usuarioE

          console.log(this.adm);
          this.guardarAdmision()
          
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
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.direccion = datos.direccion
            this.cel = datos.celular
            this.sexo = datos.sexo
            break;
            //        this.numHoja= datos.dondeesa lo del numero de hoja?????????????????????????????????? eso todavia no le pongo ajajja le qu jaejajjaja chiiiiiiiiiiii bueno le haces como le hago yo
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          //console.log(datos.nombres, this.buscarnombre);
          //this.buscarcedula = ""
          if (datos.nombres == this.buscarnombre) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.direccion = datos.direccion
            this.sexo = datos.sexo
            this.cel = datos.celular
          }
        }

      }
      console.log(res);

    })
  }



  validacionAlfanumerica(event) {
    const patron = /[a-zA-ZÑñ0-9 ,:-]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }
  validacionNumerosLetras(event) {
    const patron = /[a-zA-ZÑñ0-9 ]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validarSoloLetras(event) {
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

  validacionSoloNumeros(event) {
    const patron = /[0-9]/;
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
