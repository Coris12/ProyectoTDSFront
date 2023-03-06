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
    abdomen: null,
    cefalea: null,
    convulsiones: null,
    craneales: null,
    conciencia: null,
    cuello: null,
    diabetes: null,
    electro: null,
    endoscopia: null,
    estramidades: null,
    descripcion: null,
    otrosR: null,
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
    vomito: null,
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
    medicamento: null,
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
          this.saveTerapia()
          this.sveRegion()
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
          this.Compli.anestesia = datos
          this.Region.anestesia = datos
          this.In.anestesia = datos
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

  validarAlfanumerica(event) {
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
  validarNumero(event) {
    const patron = /^-?(0|[0-9]\d*)?$/
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }
  validarCedula(event) {
    const patron = /^-?(0|[0-9]\d*)?$/;
    const permitidos = event.keyCode;
    if (permitidos === 10) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }
  validadcionPresionArterial(event) {
    const patron = /[0-9 /]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }
  limpiar() {
    this.Aneste.anestecio = "";
    this.Aneste.ayudanteA = "";
    this.Aneste.ayudanteC = "";
    this.Aneste.cama = +"";
    this.Aneste.cirujano = "";
    this.Aneste.estatura = +"";
    this.Aneste.horaA = +"";
    this.Aneste.horaO = +"";
    this.Aneste.intrumentista = "";
    this.Aneste.minA = +"";
    this.Aneste.ocupacion = "";
    this.Aneste.peso = +"";
    this.Aneste.post = "";
    this.Aneste.pre = "";
    this.Aneste.propuesta = "";
    this.Aneste.realizada = "";
    this.Aneste.sala = "";
    this.Aneste.servicio = "";
    this.Aneste.tipoD = "";
    this.Region.cabeza = "";
    this.Region.abdomen = "";
    this.Region.cefalea = "";
    this.Region.convulsiones = "";
    this.Region.craneales = "";
    this.Region.conciencia = "";
    this.Region.cuello = "";
    this.Region.diabetes = "";
    this.Region.electro = "";
    this.Region.endoscopia = "";
    this.Region.estramidades = "";
    this.Region.descripcion = "";
    this.Region.otrosR = "";
    this.Region.extra = "";
    this.Region.habitos = "";
    this.Region.intra = "";
    this.Region.intraTor = "";
    this.Region.multiples = "";
    this.Region.obstreticas = "";
    this.Region.otrosS = "";
    this.Region.perinales = "";
    this.Region.renal = "";
    this.Region.sentidos = "";
    this.Region.shocks = "";
    this.Region.toraicas = "";
    this.Region.toxemias = "";
    this.In.anteriorA = "";
    this.In.apga = "";
    this.In.at = "";
    this.In.conducido = "";
    this.In.congenitas = "";
    this.In.dext = "";
    this.In.ecg = "";
    this.In.especiales = "";
    this.In.ex = "";
    this.In.hema = "";
    this.In.hemorragia = "";
    this.In.hiper = "";
    this.In.hora = "";
    this.In.horaD = "";
    this.In.horaI = "";
    this.In.idInfu = + "";
    this.In.infartos = "";
    this.In.pa = "";
    this.In.por = "";
    this.In.quimicaS = "";
    this.In.ringer = "";
    this.In.sangre = "";
    this.In.total = +"";
    this.In.uro = "";
    this.In.valvulares = "";
    this.Compli.atrri = "";
    this.Compli.cambioT = "";
    this.Compli.cardiaco = "";
    this.Compli.comentarios = "";
    this.Compli.duramadre = "";
    this.Compli.espamo = "";
    this.Compli.grupoS = "";
    this.Compli.hipertension = "";
    this.Compli.idCom = + "";
    this.Compli.informacion = "";
    this.Compli.insuficiente = "";
    this.Compli.r2 = "";
    this.Compli.r3 = "";
    this.Compli.r4 = "";
    this.Compli.r5 = "";
    this.Compli.respiratoria = "";
    this.Compli.vomito = "";
    this.Tec.abierto = "";
    this.Tec.apsepsia = "";
    this.Tec.cerrado = "";
    this.Tec.cir = "";
    this.Tec.conductiva = "";
    this.Tec.continua = "";
    this.Tec.continuaA = "";
    this.Tec.espidural = "";
    this.Tec.general = "";
    this.Tec.habon = "";
    this.Tec.hiperbara = "";
    this.Tec.i = "";
    this.Tec.simple = "";
    this.Tec.idTecnica = +"";
    this.Tec.manguito = "";
    this.Tec.mascara = "";
    this.Tec.media = "";
    this.Tec.nasal = "";
    this.Tec.nivel = "";
    this.Tec.oral = "";
    this.Tec.rap = "";
    this.Tec.lat = "";
    this.Tec.raquidea = "";
    this.Tec.semiCerrado = "";
    this.Tec.tapo = "";
    this.Tec.topica = "";
    this.Tec.tubo = "";
    this.Tec.vaiven="";
    this.Tera.bueno = "";
    this.Tera.depri = "";
    this.Tera.digitalicos = "";
    this.Tera.elaborado = "";
    this.Tera.esteroides = "";
    this.Tera.hipo = "";
    this.Tera.hora = "";
    this.Tera.idTera = +"";
    this.Tera.insu = "";
    this.Tera.otrosT = "";
    this.Tera.recordatorio = "";
    this.Tera.tran = "";
    this.Tera.medicamento="";
    this.edad=+"";
    this.buscarcedula="";
    this.buscarnombre="";
    this.numcli=+"";
    this.sexo="";

  }

}
