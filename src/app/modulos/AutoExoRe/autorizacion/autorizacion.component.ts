import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { AutorizacionControllerService } from 'src/app/api/autorizacionController.service';
import { OrganosControllerService } from 'src/app/api/organosController.service';
import { PersonaControllerService } from 'src/app/api/personaController.service';
import { Autorizacion } from 'src/app/model/autorizacion';
import { OrganosDonados } from 'src/app/model/organosDonados';
import { Persona } from 'src/app/model/persona';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {

  buscarcedula: string;
  buscarnombre: string;
  idpersona: any;
  errMsj: string;
  idAutori: any;
  usuarioA: any
  idPer: any;
  telefono: string;
  idOr: any
  idAu: any

  Auto: Autorizacion = {
    cama: null,
    canton: null,
    codUd: null,
    fecha: null,
    idAutorizacion: null,
    instutucionSistema: null,
    numeroHistoriaClinica: null,
    parroquia: null,
    provincia: null,
    sala: null,
    servicio: null,
    unidadOperativa: null,
    usuario: null,
  }

  per: Persona = {
    autorizacion: null,
    cedula: null,
    idPersona: null,
    nombre: null,
    parentesco: null,
    telefono: null,
    tipo: null,
  }

  organos: OrganosDonados = {
    autorizacion: null,
    idOrganos: null,
    nombreOrgano: null,
    nombreReceptor: null,
  }

  constructor(
    private messageService: MessageService,
    private personaService: AuthControllerService,
    private autoService: AutorizacionControllerService,
    private perService: PersonaControllerService,
    private organoService: OrganosControllerService
  ) { }

  ngOnInit(): void {
  }


  buscarPersona() {
    this.personaService.listaUsingGET().subscribe((res) => {
      //console.log(this.buscarcedula, this.buscarnombre);
      for (let datos of res) {

        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          //console.log(datos.identificacion, this.buscarcedula);
          //this.buscarnombre = ""
          if (datos.identificacion == this.buscarcedula) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.telefono = datos.celular
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
            this.telefono = datos.celular
          }
        }

      }
      console.log(res);

    })
  }

  saveAutorizacion() {
    console.log(this.Auto);

    this.autoService.saveAutorizacionUsingPOST(this.Auto).subscribe(
      res => {
        if (res.object != null) {
          this.idAutori = res.object
          console.log(this.idAutori);
          this.MessageSuccess(" Autorizacion  creado")
          console.log(this.idAutori);
          this.recuperarAutorizacion()
        } else {
          this.mensajeError("error al Autorizacio")
          console.log(" holii" + this.idAutori);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }
  savePersona() {
    console.log(this.per);
    this.per.nombre = this.buscarnombre
    this.perService.savePersonaUsingPOST(this.per).subscribe(
      res => {
        if (res.object != null) {
          this.idPer = res.object
          console.log(this.idPer);
          this.MessageSuccess(" Autorizacion  creado")
          console.log(this.idPer);

        } else {
          this.mensajeError("error al Autorizacio")
          console.log(" holii" + this.idPer);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  saveOrganos() {
    console.log(this.organos);

    this.organoService.saveOrganosUsingPOST(this.per).subscribe(
      res => {
        if (res.object != null) {
          this.idOr = res.object
          console.log(this.idOr);
          this.MessageSuccess(" correcto ")
          console.log(this.idOr);

        } else {
          this.mensajeError("error al guardar organos donados")
          console.log(" holii" + this.idOr);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  recuperarAutorizacion() {

    this.autoService.listUsingGET().subscribe((res) => {
      for (let datos of res) {
        if (datos.idAutorizacion == this.idAu) {

          this.organos.autorizacion = datos

          console.log(this.idAu);
          this.saveOrganos();
        }
      }

    })
  }
  guardarTodo() {
    this.personaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
          console.log(datos.id, this.idpersona);
          this.usuarioA = datos
          this.Auto.usuario = this.usuarioA
          console.log(this.Auto);
          this.saveAutorizacion();

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
