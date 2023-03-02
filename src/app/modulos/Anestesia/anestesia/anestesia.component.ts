import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AnestesiaControllerService } from 'src/app/api/anestesiaController.service';
import { AuthControllerService } from 'src/app/api/authController.service';
import { ComplicacionesControllerService } from 'src/app/api/complicacionesController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { InfusionControllerService } from 'src/app/api/infusionController.service';
import { RegionControllerService } from 'src/app/api/regionController.service';
import { TecnicaControllerService } from 'src/app/api/tecnicaController.service';
import { TerapiaControllerService } from 'src/app/api/terapiaController.service';
import { Anestesia } from 'src/app/model/anestesia';
import { Complicaciones } from 'src/app/model/complicaciones';
import { Infusion } from 'src/app/model/infusion';
import { Region } from 'src/app/model/region';
import { Tecnicas } from 'src/app/model/tecnicas';
import { Terapia } from 'src/app/model/terapia';

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
  idTec: any
  errMsj: string
  idper: number
  usuarioE: any

  constructor(
    private persnaService: AuthControllerService,
    private historiaService: HistoriaControllerService,
    private messageService: MessageService,
    private anesSservice: AnestesiaControllerService,
    private regionService: RegionControllerService,
    private inService: InfusionControllerService,
    private comService: ComplicacionesControllerService,
    private tecService: TecnicaControllerService,
    private terService: TerapiaControllerService,
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

  Region: Region = {
    anestesia: null,
    cabeza: null,
    cefalea: null,
    convulsiones: null,
    craneales: null,
    cuello: null,
    diabetes: null,
    electro: null,
    endoscopia: null,
    estramidades: null,
    extra: null,
    habitos: null,
    idRegion: null,
    intra: null,
    intraTor: null,
    multiples: null,
    obstreticas: null,
    otrosS: null,
    perinales: null,
    renal: null,
    sentidos: null,
    shocks: null,
    toraicas: null,
    toxemias: null,
  }

  In: Infusion = {
    anestesia: null,
    anteriorA: null,
    apga: null,
    at: null,
    conducido: null,
    congenitas: null,
    dext: null,
    ecg: null,
    especiales: null,
    ex: null,
    hema: null,
    hemorragia: null,
    hiper: null,
    hora: null,
    horaD: null,
    horaI: null,
    idInfu: null,
    infartos: null,
    pa: null,
    por: null,
    quimicaS: null,
    ringer: null,
    sangre: null,
    total: null,
    uro: null,
    valvulares: null,
  }

  Compli: Complicaciones = {
    anestesia: null,
    atrri: null,
    cambioT: null,
    cardiaco: null,
    comentarios: null,
    duramadre: null,
    espamo: null,
    grupoS: null,
    hipertension: null,
    idCom: null,
    informacion: null,
    insuficiente: null,
    r2: null,
    r3: null,
    r4: null,
    r5: null,
    respiratoria: null,
    vomito:null,
  }

  Tec: Tecnicas = {
    abierto: null,
    anestesia: null,
    apsepsia: null,
    cerrado: null,
    cir: null,
    conductiva: null,
    continua: null,
    continuaA: null,
    espidural: null,
    general: null,
    habon: null,
    hiperbara: null,
    i: null,
    simple: null,
    idTecnica: null,
    manguito: null,
    mascara: null,
    media: null,
    nasal: null,
    nivel: null,
    oral: null,
    rap: null,
    lat: null,
    raquidea: null,
    semiCerrado: null,
    tapo: null,
    topica: null,
    tubo: null,
    vaiven: null,
  }

  Tera: Terapia = {
    anestesia: null,
    bueno: null,
    depri: null,
    digitalicos: null,
    elaborado: null,
    esteroides: null,
    fecha: null,
    hipo: null,
    hora: null,
    idTera: null,
    insu: null,
    otrosT: null,
    recordatorio: null,
    tran: null,
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

  saveAnes() {
    console.log(this.Aneste);
    this.anesSservice.saveAnestesiaUsingPOST(this.Aneste).subscribe(
      res => {
        if (res.object != null) {
          this.idAnes = res.object
          console.log(this.idAnes);
          this.MessageSuccess(" Ficha  creado")
          this.recuperarAne();
          console.log(this.Aneste);
        } else {
          this.mensajeError("error al crear ficha aodontologica")
          console.log(" holii" + this.idAnes);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  saveTecnica() {
    console.log(this.Tec);
    this.tecService.saveTecnicaUsingPOST(this.Tec).subscribe(
      res => {
        if (res.object != null) {
          this.idTec = res.object
          console.log(this.idTec);
          this.MessageSuccess("Exito")
          this.saveInfucion()
          this.saveComplicacion()
          this.saveTerapia
          console.log(this.Aneste);
        } else {
          this.mensajeError("error al crear ficha aodontologica")
          console.log(" holii" + this.idTec);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  saveInfucion() {
    this.inService.saveInfusionUsingPOST(this.In).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EN EL SERVIDOR");
    });
  }

  sveRegion() {
    this.regionService.saveRegionUsingPOST(this.Region).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EN EL SERVIDOR");
    });
  }

  saveComplicacion() {
    this.comService.saveCompliUsingPOST(this.Compli).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EN EL SERVIDOR");
    });
  }

  saveTerapia() {
    this.terService.saveTerapiaUsingPOST(this.Tera).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EN EL SERVIDOR");
    });
  }

  recuperarAne() {
    this.anesSservice.listUsingGET2().subscribe((res) => {
      for (let datos of res) {
        if (datos.idAnes == this.idAnes) {
          this.Tec.anestesia = datos
          this.Tera.anestesia = datos
          this.Compli.anestesia=datos
          this.In.anestesia=datos
          console.log(this.idAnes);
          this.saveTecnica();
        }
      }

    })
  }

  guardar() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
          console.log(datos.id, this.idpersona);
          this.usuarioE = datos
          this.Aneste.usuario = this.usuarioE
          console.log(this.Aneste);
          this.saveAnes()
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
