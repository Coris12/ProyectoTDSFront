import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import jspdf, { jsPDF } from 'jspdf';
import { AuthControllerService } from 'src/app/api/authController.service';
import { DiagnosticoOControllerService } from 'src/app/api/diagnosticoOController.service';
import { ExamenEstoControllerService } from 'src/app/api/examenEstoController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { IndiceControlllerService } from 'src/app/api/indiceControlller.service';
import { IndicesFamilControllerService } from 'src/app/api/indicesFamilController.service';
import { OdontologiaControllerService } from 'src/app/api/odontologiaController.service';
import { PlanesControllerService } from 'src/app/api/planesController.service';
import { SaludControllerService } from 'src/app/api/saludController.service';
import { DiagnosticoO } from 'src/app/model/diagnosticoO';
import { ExamenEsto } from 'src/app/model/examenEsto';
import { IndicesCPO } from 'src/app/model/indicesCPO';
import { IndicesF } from 'src/app/model/indicesF';
import { Odontologia } from 'src/app/model/odontologia';
import { PlanesDiagnostico } from 'src/app/model/planesDiagnostico';
import { SaludBucal } from 'src/app/model/saludBucal';
import html2canvas from 'html2canvas';
import { FacturaService } from 'src/app/servicioManual/factura.service';
import { Table } from 'primeng/table';


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
    private indiceAService: IndicesFamilControllerService,
    private examenEsto: ExamenEstoControllerService,
    private planesService: PlanesControllerService,
    private diagnosticoService: DiagnosticoOControllerService,
    private salService: SaludControllerService,
    private historiaService: HistoriaControllerService,
    private serviceGenPdf:FacturaService,

  ) {

  }

  establecimiento = "C.E.M. MEDIVALLE";
  historia: any[] = [];
  odontologia:any[]=[];
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
  edad: any
  numcli: any
  listDialog: boolean
  submitted: boolean;
  loading: boolean = true;
  //
  limpiar() {
    this.Odonto.codigo = "";
    this.Odonto.diagnostico = "";
    this.Odonto.enfermedad = "";
    this.Odonto.establecimiento = "";
    this.Odonto.frecCardiaca = +"";
    this.Odonto.frecRespi = +"";
    this.Odonto.motivo = "";
    this.Odonto.prescripcion = "";
    this.Odonto.presion = +"";
    this.Odonto.procedimiento = "";
    this.Odonto.sesion = "";
    this.Odonto.temperatura = +"";
    this.indice.c = +"";
    this.indice.c1 = +"";
    this.indice.d = +"";
    this.indice.d1 = +"";
    this.indice.o = +""
    this.indice.o1 = +""
    this.indice.p = +""
    this.indice.p1 = +"";
    this.indice.totalD = +"";
    this.indice.totald1 = +"";
    this.examenE.descripcion = "";
    this.planes.quimicaS = "";
    this.planes.descripcion ="";
    this.diagnostico.cie1 = "";
    this.diagnostico.cie2 = "";
    this.diagnostico.def = "";
    this.diagnostico.def2 = "";
    this.diagnostico.descripcion1 = "";
    this.diagnostico.descripcion2 = "";
    this.diagnostico.pre1 = "";
    this.diagnostico.pre2 = "";
    this.diagnostico.profesional = "";
    this.salud.angleI = "";
    this.salud.angleII = "";
    this.salud.angleIII = "";
    this.salud.cal1 = +"";
    this.salud.cal2 = +"";
    this.salud.cal3 = +"";
    this.salud.cal4 = +"";
    this.salud.cal5 = +"";
    this.salud.calcul6 =+ "";
    this.salud.gin1 = +"";
    this.salud.gin2 = +"";
    this.salud.gin3 = +"";
    this.salud.gin4 = +"";
    this.salud.gin5 = +"";
    this.salud.gin6 = +"";
    this.salud.leve = "";
    this.salud.leveF = "";
    this.salud.moderada = "";
    this.salud.moderadaF = "";
    this.salud.p11 = "";
    this.salud.p16 = "";
    this.salud.p17 = "";
    this.salud.p21 = "";
    this.salud.p26 = "";
    this.salud.p27 = "";
    this.salud.p31 = "";
    this.salud.p36 = "";
    this.salud.p37 = "";
    this.salud.p41 = "";
    this.salud.p46 = "";
    this.salud.p47 = "";
    this.salud.p55 = "";
    this.salud.p65 = "";
    this.salud.p71 = "";
    this.salud.p75 = "";
    this.salud.p85 = "";
    this.salud.placa1 = +"";
    this.salud.placa2 = +"";
    this.salud.placa3 = +"";
    this.salud.placa4 = +"";
    this.salud.placa5 = +"";
    this.salud.placa6 =+ "";
    this.salud.severa = "";
    this.salud.severaF = "";
    this.salud.toatlG1 = +"";
    this.salud.toatlP1 = +"";
    this.salud.totalC2 = +"";
    this.sexo="";
    this.buscarcedula="";
    this.buscarnombre="";
    this.edad=+"";
    this.numcli=+"";

  }
  Odonto: Odontologia = {
    codigo: null,
    diagnostico: null,
    enfermedad: null,
    establecimiento: null,
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

  indiceF: IndicesF = {
    alergiaAnes: null,
    alergiaAntiabio: null,
    asma: null,
    descripcion: null,
    diabetes: null,
    enfCardiaca: null,
    hemR: null,
    idIndiceF: null,
    odontologia: null,
    otros: null,
    tuberculosis: null,
    vh: null
  }

  examenE: ExamenEsto = {
    atm: null,
    carrillos: null,
    descripcion: null,
    glandulasSa: null,
    glangios: null,
    idExamenEs: null,
    labio: null,
    lengua: null,
    maxSuperior: null,
    maxilarInf: null,
    mejillas: null,
    odontologia: null,
    oroFaringe: null,
    paladar: null,
    piso: null
  }

  planes: PlanesDiagnostico = {
    biometrica: null,
    idPlanes: null,
    odontologia: null,
    otros: null,
    quimicaS: null,
    rayosx: null,
    descripcion: null
  }

  diagnostico: DiagnosticoO = {
    cie1: null,
    cie2: null,
    def: null,
    def2: null,
    descripcion1: null,
    descripcion2: null,
    fechaA: null,
    fechaC: null,
    idDiagnostico: null,
    odontologia: null,
    pre1: null,
    pre2: null,
    profesional: null,
  }

  salud: SaludBucal = {
    angleI: null,
    angleII: null,
    angleIII: null,
    cal1: null,
    cal2: null,
    cal3: null,
    cal4: null,
    cal5: null,
    calcul6: null,
    gin1: null,
    gin2: null,
    gin3: null,
    gin4: null,
    gin5: null,
    gin6: null,
    idSalud: null,
    leve: null,
    leveF: null,
    moderada: null,
    moderadaF: null,
    odontologia: null,
    p11: null,
    p16: null,
    p17: null,
    p21: null,
    p26: null,
    p27: null,
    p31: null,
    p36: null,
    p37: null,
    p41: null,
    p46: null,
    p47: null,
    p55: null,
    p65: null,
    p71: null,
    p75: null,
    p85: null,
    placa1: null,
    placa2: null,
    placa3: null,
    placa4: null,
    placa5: null,
    placa6: null,
    severa: null,
    severaF: null,
    toatlG1: null,
    toatlP1: null,
    totalC2: null,
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
          this.guardarAntecedenteF();
          this.guardarExamenEsto();
          this.guardarPlanes();
          this.guardarDiagnostico();
          this.guardarSalud();
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

  guardarAntecedenteF() {
    this.indiceAService.saveAntecPersonalesUsingPOST1(this.indiceF).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR LOS ANTECEDENTES PERSONALES EN EL SERVIDOR");
    });
  }

  guardarExamenEsto() {
    this.examenEsto.saveExamenEstoUsingPOST(this.examenE).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EL EXAMEN DEL SISTEMA ESTOMATONAGTICO EN EL SERVIDOR");
    });
  }

  guardarPlanes() {
    this.planesService.saveAntecPersonalesUsingPOST2(this.planes).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intentar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EL PLANE DE DIAGNOSTICO EN EL SERVIDOR");
    });
  }

  guardarDiagnostico() {
    this.diagnosticoService.saveDiagnosticoUsingPOST1(this.diagnostico).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar diagnostico");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EL DIAGNOSTICO EN EL SERVIDOR");
    });
  }

  guardarSalud() {
    this.salService.saveSaludUsingPOST(this.salud).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar salud bucal");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR SALUD BUCAL EN EL SERVIDOR");
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

  recuperarprotocolo() {

    this.odonService.listUsingGET11().subscribe((res) => {
      for (let datos of res) {
        if (datos.idOdonto == this.idOdont) {
          this.indice.odontologia = datos
          this.indiceF.odontologia = datos
          this.examenE.odontologia = datos
          this.planes.odontologia = datos
          this.diagnostico.odontologia = datos
          this.salud.odontologia = datos
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
            this.buscar();
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo

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
      console.log('per' + this.idper);

    })
    this.historiaService.listUsingGET6().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.usuario.identificacion == this.buscarcedula) {
            this.idper = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl

            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.usuario.nombres == this.buscarnombre) {
            this.idper = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl
          }
        }
      }
      console.log(res);
    })

  }

  capturarContenido() {
    var data = document.getElementById('contenidoAConvertir');
    html2canvas(data).then(canvas => {

      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.save('FichaOdontologica.pdf')
    });
  }
  downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_FichaOdontloica.pdf`);
    });
  }

  buscar() {
    this.historia = []
    this.histService.listUsingGET6().subscribe((res) => {
      for (let datos of res) {
        console.log(datos, this.idper, datos.usuario.id, datos.numCl);
        if (this.idper == datos.usuario.id) {
          console.log("siiiiiiiiiiiiiiiiiiiii", datos);
          console.log(this.historia);
          this.historia.push({
            his: datos.numCl


          });


        }
      }
      // console.log('jjj'+res);

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


   /*convetToPDF1() {
    this.dialogo56 = true
    var data = document.getElementById('medicamentospdf');
    var width = document.getElementById('medicamentospdf').offsetWidth;
    html2canvas(data, {
      allowTaint: false, useCORS: false, logging: true,
    }).then(canvas => {
      var imgWidth = 140;
      var imgHeight = canvas.height * imgWidth / canvas.width;// espera veo algo
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a5');
      var position = 5;
      pdf.addImage(contentDataURL, 'JPEG', 5, position, imgWidth - 7, imgHeight)
      pdf.save('Medicamentos' + '.pdf');
      //for (let datos of this.Ordenlist) {
      // pdf.save('Orden_Pedido_' + datos.secuencia + '.pdf');
      //}

    });
  }*/
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
    if (this.Odonto.fecha != null) {
      let nomPer = this.Odonto.usuario.nombres;

      var link = document.createElement('a');
      link.href = url;
      link.download = 'HISTORIA CLINICA_' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      var link = document.createElement('a');
      link.href = url;
      link.download = 'HISTORIA CLINICA_' + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  imprimirPDF(idOdon: number) {
    this.serviceGenPdf.geneOdontologia(idOdon).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
  }
  imprimirPDFSinceButton(idOdon: number) {
    this.serviceGenPdf.geneOdontologia(idOdon).subscribe(data => {
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

  CargarOdon(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.odonService.listUsingGET11().subscribe(
        data => {
          this.odontologia = data;
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
