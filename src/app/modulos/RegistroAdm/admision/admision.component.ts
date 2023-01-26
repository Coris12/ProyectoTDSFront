import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccidenteControllerService } from 'src/app/api/accidenteController.service';
import { AdmisionControllerService } from 'src/app/api/admisionController.service';
import { AuthControllerService } from 'src/app/api/authController.service';
import { EnfermadAnteControllerService } from 'src/app/api/enfermadAnteController.service';
import { LlegadaAdServiceService } from 'src/app/api/llegadaAdService.service';
import { Accidente } from 'src/app/model/accidente';
import { Admision } from 'src/app/model/admision';
import { EnfermadAnte } from 'src/app/model/enfermadAnte';
import { LLegadaAd } from 'src/app/model/lLegadaAd';

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
    private messageService: MessageService,
    private llegService: LlegadaAdServiceService,
    private accService: AccidenteControllerService,
    private enferService: EnfermadAnteControllerService

  ) { }

  //variables
  usuarioE: any
  cel: string
  direccion: string
  buscarcedula: string;
  idpersona: any;
  sexo: string
  buscarnombre: string
  establecimiento = "C.E.M. MEDIVALLE";
  idAm: any;
  idA: any
  errMsj: String
  idper: number
  selectedValue: string;

  res: ResidenciaDto = {
    barrio: null,
    canton: null,
    nacionalidad: null,
    pais: null,
    parroquia: null,
    provincia: null,
    zona: null
  }

  admision: Admision = {
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
    servicio: null,
    telefono: null,
    tipoS: null,
    unidadOperativa: null,
    usuario: null,
  }
  selectedCities: string[] = [];
  llegada: LLegadaAd = {
    admision: null,
    ambulancia: null,
    ambulat: null,
    causaC: null,
    desc: null,
    grupo: null,
    hora: null,
    idLlegada: null,
    motivo: null,
    obstretica: null,
    otro: null,
    policia: null,
    quirurgica: null,
    trauma: null,
  }
  accidente: Accidente = {
    abusoF: null,
    nombreE: null,
    direccionE: null,
    fecha: null,
    otaraV: null,
    abusoS: null,
    policial: null,
    admision: null,
    ahogamiento: null,
    alcolica: null,
    alimentaria: null,
    ana: null,
    aplas: null,
    apsicolgico: null,
    caida: null,
    corto: null,
    desc: null,
    drogas: null,
    enve: null,
    etilico: null,
    extrao: null,
    fuego: null,
    gases: null,
    idAccidente: null,
    mode: null,
    otraI: null,
    otroa: null,
    picadura: null,
    quemadura: null,
    rina: null,
    transito: null,
    valor: null,
    vfamiliar: null,
  }

  enfermedad: EnfermadAnte = {
    alergico: null,
    clinico: null,
    estable: null,
    farma: null,
    gine: null,
    idEnfermedad: null,
    inestable: null,
    libre: null,
    obstruida: null,
    admision: null,
    otro: null,
    psiquiatrico: null,
    quirur: null,
    trau: null,
    descripcion:null,
    descripcionA:null

  }
  ngOnInit(): void {

  }

  cargarPersona() {

    this.persnaService.listaUsingGET().subscribe((res) => {
      console.log(res);
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.admision.usuario = this.usuarioE
          console.log(this.usuarioE);

          console.log(this.admision);
          this.guardarAdmision()

        }
      }
    })
  }

  guardarAdmision() {
    console.log(this.admision);
    this.admision.instutucionSistema = this.establecimiento
    this.adService.saveAdUsingPOST(this.admision).subscribe(
      res => {
        if (res.object != null) {
          this.idAm = res.object
          console.log(this.idAm);
          this.MessageSuccess(" Admision  creado")
          this.recuperarAdmision()
          console.log(this.admision);
        } else {
          this.mensajeError("error al crear ficha de admision")
          console.log(" holii" + this.idAm);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  guardarAccident() {
    console.log(this.accidente);

    this.accService.saveAccidenteUsingPOST(this.accidente).subscribe(
      res => {
        if (res.object != null) {
          this.idA = res.object
          console.log(this.idpersona);
          this.guardarLlegada();
          this.guardarEnfermedad();
          console.log(this.admision);
        } else {
          this.mensajeError("error al crear ficha de admision")
          console.log(" holii" + this.idAm);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }
  guardarLlegada() {
    this.llegService.saveLlegadaUsingPOST(this.llegada).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
    });
  }

  guardarEnfermedad() {
    this.enferService.saveEnferUsingPOST(this.enfermedad).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
    });
  }


  recuperarAdmision() {

    this.adService.listUsingGET().subscribe((res) => {
      for (let datos of res) {
        if (datos.idAdmision == this.idAm) {
          this.accidente.admision = datos
          this.llegada.admision = datos
          this.enfermedad.admision=datos
          console.log(this.idAm);
          //this.guardarLlegada();
          this.guardarAccident();
          //this.guardaA
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
            this.idper = datos.id
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
