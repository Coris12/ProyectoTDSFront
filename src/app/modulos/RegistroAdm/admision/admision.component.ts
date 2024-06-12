import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AccidenteControllerService } from 'src/app/api/accidenteController.service';
import { AdmisionControllerService } from 'src/app/api/admisionController.service';
import { AltaControllerService } from 'src/app/api/altaController.service';
import { AuthControllerService } from 'src/app/api/authController.service';
import { DiagnsticoAiControllerService } from 'src/app/api/diagnsticoAiController.service';
import { EmergenciaControllerService } from 'src/app/api/emergenciaController.service';
import { EnfermadAnteControllerService } from 'src/app/api/enfermadAnteController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { IngresoDiaControllerService } from 'src/app/api/ingresoDiaController.service';
import { LesionesControllerService } from 'src/app/api/lesionesController.service';

import { LlegadaAdServiceService } from 'src/app/api/llegadaAdService.service';
import { ResidenciaControllerService } from 'src/app/api/residenciaController.service';
import { SignosEControllerService } from 'src/app/api/signosEController.service';
import { SolicitudEControllerService } from 'src/app/api/solicitudEController.service';
import { TrataMControllerService } from 'src/app/api/trataMController.service';
import { Accidente } from 'src/app/model/accidente';
import { Admision } from 'src/app/model/admision';
import { Alta } from 'src/app/model/alta';

import { DiagnosticoAI } from 'src/app/model/diagnosticoAI';
import { Emergencia } from 'src/app/model/emergencia';
import { EnfermadAnte } from 'src/app/model/enfermadAnte';
import { IngresoDia } from 'src/app/model/ingresoDia';
import { Lesiones } from 'src/app/model/lesiones';
import { LLegadaAd } from 'src/app/model/lLegadaAd';

import { ResidenciaDto } from 'src/app/model/residenciaDto';
import { SignosE } from 'src/app/model/signosE';
import { SolicitudE } from 'src/app/model/solicitudE';
import { TrataM } from 'src/app/model/trataM';
import { FacturaService } from 'src/app/servicioManual/factura.service';

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
    private enferService: EnfermadAnteControllerService,
    private SignoService: SignosEControllerService,
    private serviceGenPdf:FacturaService,
    private SoliService: SolicitudEControllerService,
    private ingreService: IngresoDiaControllerService,
    private trataService: TrataMControllerService,
    private altaService: AltaControllerService,
    private diaAService: DiagnsticoAiControllerService,
    private emergenciaService: EmergenciaControllerService,
    private lesionService: LesionesControllerService,
    private residenService: ResidenciaControllerService,
    private historiaService: HistoriaControllerService
  ) { }

  //variables
  listDialog: boolean
  admi:any[]=[];
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
  estado: any
  edad: any
  numcli: any
  barrio: any
  canton: any
  parrio: any
  provi: any
  na: any

  submitted: boolean;
  loading: boolean = true;

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
    descripcion: null,
    descripcionA: null

  }

  signos: SignosE = {
    abdomen: null,
    admision: null,
    axilar: null,
    bucal: null,
    cabeza: null,
    capilar: null,
    columna: null,
    cuello: null,
    descripcion: null,
    extremidades: null,
    fCardiaca: null,
    idSgnos: null,
    motora: null,
    ocular: null,
    oxigeno: null,
    pelvis: null,
    peso: null,
    presion: null,
    pupilaD: null,
    pupilaI: null,
    respira: null,
    talla: null,
    torax: null,
    total: null,
    verbal: null,
    viaObost: null,
  }

  soli: SolicitudE = {
    abdomen: null,
    admision: null,
    biometrica: null,
    cardiograma: null,
    desc: null,
    ecoA: null,
    elec: null,
    endo: null,
    gastro: null,
    idSoli: null,
    inter: null,
    osea: null,
    otros: null,
    pelvica: null,
    reso: null,
    sanguinea: null,
    tomo: null,
    torax: null,
    uro: null,
  }

  ingreso: IngresoDia = {
    admision: null,
    cie1: null,
    cie2: null,
    cie3: null,
    d1: null,
    d2: null,
    d3: null,
    descripcion1: null,
    descripcion2: null,
    descripcion3: null,
    idDiagI: null,
  }

  alta: DiagnosticoAI = {
    admision: null,
    cie1: null,
    cie2: null,
    cie3: null,
    d1: null,
    d2: null,
    d3: null,
    descripcion1: null,
    descripcion2: null,
    descripcion3: null,
    idDiagA: null,
  }

  trata: TrataM = {
    admision: null,
    idTrat: null,
    indicaciones: null,
    medica1: null,
    medica2: null,
    medica3: null,
    poso3: null,
    posologia1: null,
    posologia2: null,
  }

  Alta: Alta = {
    admision: null,
    cExterna: null,
    causa: null,
    codigo: null,
    dias: null,
    domicilio: null,
    estable: null,
    establecimiento: null,
    fecha: null,
    idAlta: null,
    inestable: null,
    internacion: null,
    muerto: null,
    nombre: null,
    observacion: null,
    referencia: null,
    servicio: null,
    vivo: null,
  }

  emergencia: Emergencia = {
    abortos: null,
    admision: null,
    borramiento: null,
    cesareas: null,
    contraciones: null,
    dilatacion: null,
    fecha: null,
    fetal: null,
    frecuencia: null,
    gestas: null,
    idEmergencia: null,
    membranas: null,
    partos: null,
    plano: null,
    presentacion: null,
    semanas: null,
    snagrado: null,
    tiempo: null,
    uterina: null,
    util: null,
  }

  lesion: Lesiones = {
    admision: null,
    cerrada: null,
    cortante: null,
    esguince: null,
    excoracion: null,
    expuesta: null,
    extraa: null,
    hematoma: null,
    hemorragia: null,
    idLesiones: null,
    inflamacion: null,
    masa: null,
    mordedura: null,
    pentrante: null,
    picadura: null,
    quemadura: null,
  }
  limpiar() {
    this.buscarcedula="";
    this.buscarnombre="";
    this.estado = "";
    this.edad = "";
    this.numcli = ""
    this.barrio = ""
    this.canton = ""
    this.parrio = ""
    this.provi = ""
    this.na = ""
    this.admision.canton ="";
    this.admision.codUd ="";
    this.admision.direccP ="";
    this.admision.empresa ="";
    this.admision.emergencia ="";
    this.admision.fuente ="";
    this.admision.instruccion ="";
    this.admision.instutucionSistema ="";
    this.admision.nombre ="";
    this.admision.numero ="";
    this.admision.parantesco ="";
    this.admision.parroquia ="";
    this.admision.persona ="";
    this.admision.provincia ="";
    this.admision.referidoD ="";
    this.admision.servicio ="";
    this.admision.telefono ="";
    this.admision.tipoS ="";
    this.admision.unidadOperativa ="";
    this.accidente.desc ="";
    this.accidente.direccionE ="";
    this.accidente.nombreE ="";
    this.accidente.valor =+"";
    this.llegada.ambulancia ="";
    this.llegada.ambulat ="";
    this.llegada.causaC ="";
    this.llegada.desc ="";
    this.llegada.grupo ="";
    this.llegada.hora ="";
    this.llegada.motivo ="";
    this.llegada.obstretica ="";
    this.llegada.otro ="";
    this.llegada.policia ="";
    this.llegada.quirurgica ="";
    this.llegada.trauma ="";
    this.signos.abdomen ="";
    this.signos.axilar =+"";
    this.signos.bucal =+"";
    this.signos.cabeza ="";
    this.signos.capilar =+"";
    this.signos.columna ="";
    this.signos.cuello ="";
    this.signos.descripcion ="";
    this.signos.extremidades ="";
    this.signos.fCardiaca =+"";
    this.signos.motora =+"";
    this.signos.ocular =+"";
    this.signos.oxigeno =+"";
    this.signos.pelvis ="";
    this.signos.peso =+"";
    this.signos.presion =+"";
    this.signos.pupilaD ="";
    this.signos.pupilaI ="";
    this.signos.respira =+"";
    this.signos.talla =+"";
    this.signos.torax ="";
    this.signos.total =+"";
    this.signos.verbal =+"";
    this.signos.viaObost ="";
    this.soli.desc ="";
    this.ingreso.cie1 ="";
    this.ingreso.cie2 ="";
    this.ingreso.cie3 ="";
    this.ingreso.d1 ="";
    this.ingreso.d2 ="";
    this.ingreso.d3 ="";
    this.ingreso.descripcion1 ="";
    this.ingreso.descripcion2 ="";
    this.ingreso.descripcion3 ="";
    this.alta.cie1 ="";
    this.alta.cie2 ="";
    this.alta.cie3 ="";
    this.alta.d1 ="";
    this.alta.d2 ="";
    this.alta.d3 ="";
    this.alta.descripcion1 ="";
    this.alta.descripcion2 ="";
    this.alta.descripcion3 ="";
    this.trata.indicaciones ="";
    this.trata.medica1 ="";
    this.trata.medica3 ="";
    this.trata.poso3 ="";
    this.trata.posologia1 ="";
    this.trata.posologia2 ="";
    this.lesion.cerrada ="";
    this.lesion.cortante ="";
    this.lesion.esguince ="";
    this.lesion.excoracion ="";
    this.lesion.expuesta ="";
    this.lesion.extraa ="";
    this.lesion.hematoma ="";
    this.lesion.hemorragia ="";
    this.lesion.inflamacion ="";
    this.lesion.masa ="";
    this.lesion.mordedura ="";
    this.lesion.pentrante ="";
    this.lesion.picadura ="";
    this.lesion.quemadura ="";
    this.Alta.causa ="";
    this.Alta.codigo ="";
    this.Alta.dias =+"";
    this.Alta.establecimiento ="";
    this.Alta.nombre ="";
    this.Alta.servicio ="";
    this.enfermedad.descripcion ="";
    this.enfermedad.descripcionA ="";
   
  }
  ngOnInit(): void {
  }

  cargarPersona() {
    console.log(this.idper);

    
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
   
      console.log("si validaaaaaaaaaaaaaaaaaaa ");

      this.accService.saveAccidenteUsingPOST(this.accidente).subscribe(
        res => {
          if (res.object != null) {
            this.idA = res.object
            console.log(this.idpersona);
            this.guardarLlegada();
            this.guardarEnfermedad();
            this.guardarSigno();
            this.guardarSoli();
            this.guardarIngreso();
            this.guardarAlta();
            this.guardarTrata();
            this.guardarAl();
            this.guardarEmergencia();
            this.guardarLesion();
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

  guardarSigno() {
    
      this.SignoService.saveSignosEUsingPOST(this.signos).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    
  }

  guardarSoli() {
    
      this.SoliService.saveSoliUsingPOST(this.soli).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
   
  }

  guardarIngreso() {
   
      console.log("si validaaaaaaaaaaaaaaaaaaa ");

      this.ingreService.saveDiagnosticoAUsingPOST1(this.ingreso).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    
  }

  guardarAlta() {
   
      console.log("si validaaaaaaaaaaaaaaaaaaa ");
      this.Alta.establecimiento = this.establecimiento
      this.diaAService.saveDiagnosticoAUsingPOST(this.alta).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    
  }

  guardarTrata() {
   
      console.log("si validaaaaaaaaaaaaaaaaaaa ");
      this.trataService.saveDiagnosticoAUsingPOST2(this.trata).subscribe(data => {
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

  guardarLesion() {
   
      this.lesionService.saveLesionUsingPOST(this.lesion).subscribe(data => {
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
          this.enfermedad.admision = datos
          this.signos.admision = datos
          this.soli.admision = datos
          this.ingreso.admision = datos
          this.alta.admision = datos
          this.trata.admision = datos
          this.Alta.admision = datos
          this.emergencia.admision = datos
          this.lesion.admision = datos
          console.log(this.idAm);
          this.guardarAccident();
        }
      }

    })
  }

  guardarAl() {
    
      console.log("si validaaaaaaaaaaaaaaaaaaa ");
      this.altaService.savAltaUsingPOST(this.Alta).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    
  }

  guardarEmergencia() {
    this.emergenciaService.saveEnferUsingPOST(this.emergencia).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
    });
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
    this.historiaService.listUsingGET6().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.usuario.identificacion == this.buscarcedula) {
            this.idper = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl
            this.estado = datos.estadoCivil
            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.usuario.nombres == this.buscarnombre) {
            this.idpersona = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl
            this.estado = datos.estadoCivil

          }
        }
      }
      console.log(res);
    })

    this.residenService.listUsingGET26().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.usuario.identificacion == this.buscarcedula) {
            this.idper = datos.usuario.id
            this.canton = datos.canton
            this.barrio = datos.barrio
            this.parrio = datos.parroquia
            this.provi = datos.provincia
            this.na = datos.nacionalidad
            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.usuario.nombres == this.buscarnombre) {
            this.idper = datos.usuario.id
            this.canton = datos.canton
            this.barrio = datos.barrio
            this.parrio = datos.parroquia

          }
        }
      }
      console.log(res);
    })

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
  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  descargarPdf(pdfSrc: any) {
    let pdf: any = pdfSrc;
    let numAlea = this.createId();
    var blob = new Blob([pdf], { type: 'application/pdf' });
    var url = window.URL.createObjectURL(blob);
    if (this.admision.fecha != null) {
      let nomPer = this.admision.usuario.nombres;

      var link = document.createElement('a');
      link.href = url;
      link.download = 'REGISTRO ADMISION_' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      var link = document.createElement('a');
      link.href = url;
      link.download = 'REGISTRO ADMISION_' + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  imprimirPDF(idAd: number) {
    this.serviceGenPdf.geneAdmision(idAd).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
  }
  imprimirPDFSinceButton(idAd: number) {
    this.serviceGenPdf.geneAdmision(idAd).subscribe(data => {
      if (data) {
        //this.cargarConsultaExterna(idConsExterno);
        this.descargarPdf(data);
        //this.limpiarAll();
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
  }
  
  openNew() {
    this.submitted = false;
    this.listDialog = true;
  }

  clear(table: Table) {
    table.clear();
  }

  cargarAdmision(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.adService.listUsingGET().subscribe(
        data => {
          this.admi = data;
          console.log(data);
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
  }



}
