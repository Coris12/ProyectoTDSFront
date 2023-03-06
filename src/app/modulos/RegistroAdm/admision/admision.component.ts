import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

    if (this.canton != 0 && this.canton != undefined && this.canton != null) {
      console.log("si validaaaaaaaaaaaaaaaaaaa ");


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
    } else {
      this.mensajeError("Todos los datos son obligatorios")
    }
  }

  guardarAdmision() {
    console.log(this.admision);
    this.admision.instutucionSistema = this.establecimiento
    if (this.admision.canton != null && this.admision.canton != undefined ||
      this.admision.codUd != null && this.admision.codUd != undefined ||
      this.admision.direccP != null && this.admision.direccP != undefined ||
      this.admision.empresa != null && this.admision.empresa != undefined ||
      this.admision.emergencia != null && this.admision.emergencia != undefined ||
      this.admision.fecha != null && this.admision.fecha != undefined ||
      this.admision.fechaA != null && this.admision.fechaA != undefined ||
      this.admision.fuente != null && this.admision.fuente != undefined ||
      this.admision.instruccion != null && this.admision.instruccion != undefined ||
      this.admision.instutucionSistema != null && this.admision.instutucionSistema != undefined ||
      this.admision.nombre != null && this.admision.nombre != undefined ||
      this.admision.numero != null && this.admision.numero != undefined ||
      this.admision.ocupacion != null && this.admision.ocupacion != undefined ||
      this.admision.parantesco != null && this.admision.parantesco != undefined ||
      this.admision.parroquia != null && this.admision.parroquia != undefined ||
      this.admision.persona != null && this.admision.persona != undefined ||
      this.admision.provincia != null && this.admision.provincia != undefined ||
      this.admision.referidoD != null && this.admision.referidoD != undefined ||
      this.admision.servicio != null && this.admision.servicio != undefined ||
      this.admision.telefono != null && this.admision.telefono != undefined ||
      this.admision.tipoS != null && this.admision.tipoS != undefined ||
      this.admision.unidadOperativa != null && this.admision.unidadOperativa != undefined
    ) {
      console.log("si validaaaaaaaaaaaaaaaaaaa ");
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
    } else {
      this.mensajeError(" Todos los datos son obligatorios Admision")
    }
  }

  guardarAccident() {
    console.log(this.accidente);
    if (this.accidente.abusoF != null && this.accidente.abusoF != undefined ||
      this.accidente.abusoS != null && this.accidente.abusoS != undefined ||
      this.accidente.ahogamiento != null && this.accidente.ahogamiento != undefined ||
      this.accidente.alcolica != null && this.accidente.alcolica != undefined ||
      this.accidente.alimentaria != null && this.accidente.alimentaria != undefined ||
      this.accidente.ana != null && this.accidente.ana != undefined ||
      this.accidente.aplas != null && this.accidente.aplas != undefined ||
      this.accidente.apsicolgico != null && this.accidente.apsicolgico != undefined ||
      this.accidente.caida != null && this.accidente.caida != undefined ||
      this.accidente.corto != null && this.accidente.corto != undefined ||
      this.accidente.desc != null && this.accidente.desc != undefined ||
      this.accidente.direccionE != null && this.accidente.direccionE != undefined ||
      this.accidente.drogas != null && this.accidente.drogas != undefined ||
      this.accidente.enve != null && this.accidente.enve != undefined ||
      this.accidente.etilico != null && this.accidente.etilico != undefined ||
      this.accidente.extrao != null && this.accidente.extrao != undefined ||
      this.accidente.fecha != null && this.accidente.fecha != undefined ||
      this.accidente.fuego != null && this.accidente.fuego != undefined ||
      this.accidente.gases != null && this.accidente.gases != undefined ||
      this.accidente.mode != null && this.accidente.mode != undefined ||
      this.accidente.nombreE != null && this.accidente.nombreE != undefined ||
      this.accidente.otaraV != null && this.accidente.otaraV != undefined ||
      this.accidente.picadura != null && this.accidente.picadura != undefined ||
      this.accidente.policial != null && this.accidente.policial != undefined ||
      this.accidente.quemadura != null && this.accidente.quemadura != undefined ||
      this.accidente.rina != null && this.accidente.rina != undefined ||
      this.accidente.transito != null && this.accidente.transito != undefined ||
      this.accidente.valor != null && this.accidente.valor != undefined ||
      this.accidente.vfamiliar != null && this.accidente.vfamiliar != undefined

    ) {
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
    } else {
      this.mensajeError(" Todos los datos son obligatorios ")
    }
  }

  guardarLlegada() {
    if (this.llegada.ambulancia != null && this.llegada.ambulancia != undefined ||
      this.llegada.ambulat != null && this.llegada.ambulat != undefined ||
      this.llegada.causaC != null && this.llegada.causaC != undefined ||
      this.llegada.desc != null && this.llegada.desc != undefined ||
      this.llegada.grupo != null && this.llegada.grupo != undefined ||
      this.llegada.hora != null && this.llegada.hora != undefined ||
      this.llegada.motivo != null && this.llegada.motivo != undefined ||
      this.llegada.obstretica != null && this.llegada.obstretica != undefined ||
      this.llegada.otro != null && this.llegada.otro != undefined ||
      this.llegada.policia != null && this.llegada.policia != undefined ||
      this.llegada.quirurgica != null && this.llegada.quirurgica != undefined ||
      this.llegada.trauma != null && this.llegada.causaC != undefined

    ) {
      this.llegService.saveLlegadaUsingPOST(this.llegada).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    } else {
      this.mensajeError(" Todos los datos son obligatorios llegada")
    }
  }

  guardarSigno() {
    if (this.signos.abdomen != null && this.signos.abdomen != undefined ||
      this.signos.axilar != null && this.signos.axilar != undefined ||
      this.signos.bucal != null && this.signos.bucal != undefined ||
      this.signos.cabeza != null && this.signos.cabeza != undefined ||
      this.signos.capilar != null && this.signos.capilar != undefined ||
      this.signos.columna != null && this.signos.columna != undefined ||
      this.signos.cuello != null && this.signos.cuello != undefined ||
      this.signos.descripcion != null && this.signos.descripcion != undefined ||
      this.signos.extremidades != null && this.signos.extremidades != undefined ||
      this.signos.fCardiaca != null && this.signos.fCardiaca != undefined ||
      this.signos.motora != null && this.signos.motora != undefined ||
      this.signos.ocular != null && this.signos.ocular != undefined ||
      this.signos.oxigeno != null && this.signos.oxigeno != undefined ||
      this.signos.pelvis != null && this.signos.pelvis != undefined ||
      this.signos.peso != null && this.signos.peso != undefined ||
      this.signos.presion != null && this.signos.presion != undefined ||
      this.signos.pupilaD != null && this.signos.pupilaD != undefined ||
      this.signos.pupilaI != null && this.signos.pupilaI != undefined ||
      this.signos.respira != null && this.signos.respira != undefined ||
      this.signos.talla != null && this.signos.talla != undefined ||
      this.signos.torax != null && this.signos.torax != undefined ||
      this.signos.total != null && this.signos.total != undefined ||
      this.signos.verbal != null && this.signos.verbal != undefined ||
      this.signos.viaObost != null && this.signos.viaObost != undefined
    ) {
      this.SignoService.saveSignosEUsingPOST(this.signos).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    } else {
      this.mensajeError(" Todos los datos son obligatorios signo")
    }
  }

  guardarSoli() {
    if (this.soli.abdomen != null && this.soli.abdomen != undefined ||
      this.soli.biometrica != null && this.soli.biometrica != undefined ||
      this.soli.cardiograma != null && this.soli.cardiograma != undefined ||
      this.soli.desc != null && this.soli.desc != undefined ||
      this.soli.ecoA != null && this.soli.ecoA != undefined ||
      this.soli.elec != null && this.soli.elec != undefined ||
      this.soli.endo != null && this.soli.endo != undefined ||
      this.soli.gastro != null && this.soli.gastro != undefined ||
      this.soli.inter != null && this.soli.inter != undefined ||
      this.soli.osea != null && this.soli.osea != undefined ||
      this.soli.otros != null && this.soli.otros != undefined ||
      this.soli.pelvica != null && this.soli.pelvica != undefined ||
      this.soli.reso != null && this.soli.reso != undefined ||
      this.soli.sanguinea != null && this.soli.sanguinea != undefined ||
      this.soli.tomo != null && this.soli.tomo != undefined ||
      this.soli.torax != null && this.soli.torax != undefined ||
      this.soli.uro != null && this.soli.uro != undefined
    ) {
      this.SoliService.saveSoliUsingPOST(this.soli).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
  }

  guardarIngreso() {
    if (this.ingreso.cie1 != null && this.ingreso.cie1 != undefined ||
      this.ingreso.cie2 != null && this.ingreso.cie2 != undefined ||
      this.ingreso.cie3 != null && this.ingreso.cie3 != undefined ||
      this.ingreso.d1 != null && this.ingreso.d1 != undefined ||
      this.ingreso.d2 != null && this.ingreso.d2 != undefined ||
      this.ingreso.d3 != null && this.ingreso.d3 != undefined ||
      this.ingreso.descripcion1 != null && this.ingreso.descripcion1 != undefined ||
      this.ingreso.descripcion2 != null && this.ingreso.descripcion2 != undefined ||
      this.ingreso.descripcion3 != null && this.ingreso.descripcion3 != undefined
    ) {
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
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
  }

  guardarAlta() {
    if (this.alta.cie1 != null && this.alta.cie1 != undefined ||
      this.alta.cie2 != null && this.alta.cie2 != undefined ||
      this.alta.cie3 != null && this.alta.cie3 != undefined ||
      this.alta.d1 != null && this.alta.d1 != undefined ||
      this.alta.d2 != null && this.alta.d2 != undefined ||
      this.alta.d3 != null && this.alta.d3 != undefined ||
      this.alta.descripcion1 != null && this.alta.descripcion1 != undefined ||
      this.alta.descripcion2 != null && this.alta.descripcion2 != undefined ||
      this.alta.descripcion3 != null && this.ingreso.descripcion3 != undefined
    ) {
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
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
  }

  guardarTrata() {
    if (this.trata.indicaciones != null && this.trata.indicaciones != undefined ||
      this.trata.medica1 != null && this.trata.medica1 != undefined ||
      this.trata.medica3 != null && this.trata.medica3 != undefined ||
      this.trata.poso3 != null && this.trata.poso3 != undefined ||
      this.trata.posologia1 != null && this.trata.posologia1 != undefined ||
      this.trata.posologia2 != null && this.trata.posologia2 != undefined
    ) {
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
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
  }

  guardarEnfermedad() {
    if (this.enfermedad.alergico != null && this.enfermedad.alergico != undefined ||
      this.enfermedad.clinico != null && this.enfermedad.clinico != undefined ||
      this.enfermedad.descripcion != null && this.enfermedad.descripcion != undefined ||
      this.enfermedad.descripcionA != null && this.enfermedad.descripcionA != undefined ||
      this.enfermedad.estable != null && this.enfermedad.estable != undefined ||
      this.enfermedad.farma != null && this.enfermedad.farma != undefined ||
      this.enfermedad.gine != null && this.enfermedad.gine != undefined ||
      this.enfermedad.inestable != null && this.enfermedad.inestable != undefined ||
      this.enfermedad.libre != null && this.enfermedad.libre != undefined ||
      this.enfermedad.obstruida != null && this.enfermedad.obstruida != undefined ||
      this.enfermedad.otro != null && this.enfermedad.otro != undefined ||
      this.enfermedad.psiquiatrico != null && this.enfermedad.psiquiatrico != undefined ||
      this.enfermedad.quirur != null && this.enfermedad.quirur != undefined ||
      this.enfermedad.trau != null && this.enfermedad.trau != undefined
    ) {
      this.enferService.saveEnferUsingPOST(this.enfermedad).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
  }

  guardarLesion() {
    if (this.lesion.cerrada != null && this.lesion.cerrada != undefined ||
      this.lesion.cortante != null && this.lesion.cortante != undefined ||
      this.lesion.esguince != null && this.lesion.esguince != undefined ||
      this.lesion.excoracion != null && this.lesion.excoracion != undefined ||
      this.lesion.expuesta != null && this.lesion.expuesta != undefined ||
      this.lesion.extraa != null && this.lesion.extraa != undefined ||
      this.lesion.hematoma != null && this.lesion.hematoma != undefined ||
      this.lesion.hemorragia != null && this.lesion.hemorragia != undefined ||
      this.lesion.inflamacion != null && this.lesion.inflamacion != undefined ||
      this.lesion.masa != null && this.lesion.masa != undefined ||
      this.lesion.mordedura != null && this.lesion.mordedura != undefined ||
      this.lesion.pentrante != null && this.lesion.pentrante != undefined ||
      this.lesion.picadura != null && this.lesion.picadura != undefined ||
      this.lesion.quemadura != null && this.lesion.quemadura != undefined
    ) {
      this.lesionService.saveLesionUsingPOST(this.lesion).subscribe(data => {
        if (data.object != null) {
          this.MessageSuccess(data.message);
        } else {
          this.mensajeError("Error al intententar guardar");
        }
      }, error => {
        this.mensajeError("ERROR AL GUARDAR LLEGADA EN EL SERVIDOR");
      });
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
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
    if (this.Alta.cExterna != null && this.Alta.cExterna != undefined ||
      this.Alta.causa != null && this.Alta.causa != undefined ||
      this.Alta.codigo != null && this.Alta.codigo != undefined ||
      this.Alta.dias != null && this.Alta.dias != undefined ||
      this.Alta.domicilio != null && this.Alta.domicilio != undefined ||
      this.Alta.estable != null && this.Alta.estable != undefined ||
      this.Alta.establecimiento != null && this.Alta.establecimiento != undefined ||
      this.Alta.fecha != null && this.Alta.fecha != undefined ||
      this.Alta.inestable != null && this.Alta.inestable != undefined ||
      this.Alta.internacion != null && this.Alta.internacion != undefined ||
      this.Alta.muerto != null && this.Alta.muerto != undefined ||
      this.Alta.nombre != null && this.Alta.nombre != undefined ||
      this.Alta.observacion != null && this.Alta.observacion != undefined ||
      this.Alta.referencia != null && this.Alta.referencia != undefined ||
      this.Alta.servicio != null && this.Alta.servicio != undefined ||
      this.Alta.vivo != null && this.Alta.vivo != undefined
    ) {
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
    } else {
      this.mensajeError(" Todos los datos son obligatorios 55")
    }
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

}
