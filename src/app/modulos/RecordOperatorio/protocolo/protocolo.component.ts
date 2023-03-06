import { Component, OnInit } from '@angular/core';
import { MessageService, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { EquiposControllerService } from 'src/app/api/equiposController.service';
import { ProtocoloControllerService } from 'src/app/api/protocoloController.service';
import { TipoQuiControllerService } from 'src/app/api/tipoQuiController.service';
import { EquipoOperatorio } from 'src/app/model/equipoOperatorio';
import { Protocolos } from 'src/app/model/protocolos';
import { TiposQuirurgicos } from 'src/app/model/tiposQuirurgicos';
import { FacturaService } from 'src/app/servicioManual/factura.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.css']
})
export class ProtocoloComponent implements OnInit {

  buscarcedula: string;
  buscarnombre: string;
  idPro: any
  idpersona: number;
  usuarioE: any;
  idProto: any
  idEqui: any;
  idTipo: any;
  loading: boolean = true;
  listDialog: boolean;
  Protocolos: any[] = [];
  submitted: boolean
  formCabezera: FormGroup;
  form:any
  openNew() {
    this.submitted = false;
    this.listDialog = true;
  }

  clear(table: Table) {
    table.clear();
  }

  
  proto: Protocolos = {
    escrita: null,
    estado: null,
    fecha: null,
    idProtocolo: null,
    nCama: null,
    postoperatorio: null,
    preoperatorio: null,
    realizada: null,
    redactado: null,
    sala: null,
    servicio: null,
    tipoCirujia: null,
    usuario: null,

  }

  equi: EquipoOperatorio = {
    anestesiologo: null,
    cirujano: null,
    fecha: null,
    horaFin: null,
    horaInicio: null,
    idEquipo: null,
    instrumentista: null,
    primerAyudante: null,
    protocolo: null,
    segundoAyudante: null,
    tercerAyudante: null,
    tipoAnestesia: null,
  }

  tipo: TiposQuirurgicos = {
    complicaciones: null,
    dieresis: null,
    examen: null,
    exploracion: null,
    exposicion: null,
    idTipo: null,
    procedimiento: null,
    protocolo: null,
    sintesis: null,
  }



  constructor(
    private persnaService: AuthControllerService,
    private messageService: MessageService,
    private protocoloService: ProtocoloControllerService,
    private equipoService: EquiposControllerService,
    private tipoService: TipoQuiControllerService,
    private serviceGenPdf: FacturaService,
    private formbuider:FormBuilder,
    
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

  saveDiagnostico() {
    
      this.protocoloService.saveDiagnosticoUsingPOST1(this.proto).subscribe(
        res => {
          if (res.object != null) {
            this.idPro = res.object
            console.log(this.idPro);
  
            this.MessageSuccess(" diagnostico  creado")
            //console.log(this.idPro);
            this.recuperarprotocolo()
  
  
          } else {
            this.mensajeError("error al crear diagnostico")
            //console.log(" holii" + this.idPro);
            //console.log("error" + this.idPro)
            console.log(res.object);
          }
        })
    
    console.log(this.proto);
    



  }
  recuperarprotocolo() {
    
    this.protocoloService.listUsingGET11().subscribe((res) => {
      for (let datos of res) {
        if (datos.idProtocolo == this.idPro) {

          this.equi.protocolo = datos
          this.tipo.protocolo = datos
          console.log(this.idPro);
          this.saveEquipo();
        }
      }

    })
  
  }
  saveEquipo() {

    console.log(this.equi);
    console.log(this.idPro);
    //this.equi.protocolo = this.idPro


    console.log(this.equi.protocolo);

    this.equipoService.saveEquipoUsingPOST(this.equi).subscribe(
      res => {
        if (res.object != null) {
          this.idEqui = res.object
          console.log(this.idEqui);
          this.MessageSuccess(" equipo operatorio  creado")
          console.log(this.idEqui);

          this.saveTipos();
        } else {
          this.mensajeError("error al crear equipo operatorio")
          console.log(" holii" + this.idEqui);
          console.log("error" + this.idEqui)
          console.log(res.object);
        }
      })

  }

  saveTipos() {
    console.log(this.tipo);
    //this.tipo.protocolo = this.idPro

    this.tipoService.saveTipoUsingPOST(this.tipo).subscribe(
      res => {
        if (res.object != null) {
          this.idTipo = res.object
          console.log(this.idTipo);
          this.MessageSuccess(" tipos Quirurgicos  creado")
          console.log(this.idTipo);

        } else {
          this.mensajeError("error al crear tipos Quirurgicos  ")
          console.log(" holii" + this.idTipo);
          console.log("error" + this.idTipo)
          console.log(res.object);
        }
      })

  }


  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
          console.log(datos.id, this.idpersona);
          this.usuarioE = datos
          this.proto.usuario = this.usuarioE
          console.log(this.proto);
          this.saveDiagnostico()

        }
      }
    })
  }
  limpiar() {
    this.buscarcedula="";
    this.buscarnombre="";
    this.proto.escrita = "";
    this.proto.estado =+ "";
    this.proto.idProtocolo = +"";
    this.proto.nCama =+ "";
    this.proto.postoperatorio = "";
    this.proto.preoperatorio = "";
    this.proto.realizada = "";
    this.proto.redactado = "";
    this.proto.sala = "";
    this.proto.servicio = "";
    this.proto.tipoCirujia = "";
    this.equi.anestesiologo = "";
    this.equi.cirujano = "";
    this.equi.horaFin = "";
    this.equi.horaInicio = "";
    this.equi.idEquipo = +"";
    this.equi.instrumentista = "";
    this.equi.primerAyudante = "";
    this.equi.segundoAyudante = "";
    this.equi.tercerAyudante = "";
    this.equi.tipoAnestesia = "";
    this.tipo.complicaciones = "";
    this.tipo.dieresis = "";
    this.tipo.examen = "";
    this.tipo.exploracion = "";
    this.tipo.exposicion = "";
    this.tipo.idTipo = +"";
    this.tipo.procedimiento = "";
    this.tipo.sintesis = "";
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

  imprimirPDFSinceButton(proto: number) {
    this.serviceGenPdf.geneProtocolo(proto).subscribe(data => {
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
    if (this.proto.fecha != null) {
      let nomPer = this.proto.usuario.nombres;

      var link = document.createElement('a');
      link.href = url;
      link.download = 'RECORD OPERATORIO_' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      var link = document.createElement('a');
      link.href = url;
      link.download = 'RECORD OPERATORIO_' + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  imprimirPDF(proto: number) {
    this.serviceGenPdf.geneProtocolo(proto).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
  }

  cargarProtocolo(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.protocoloService.listUsingGET11().subscribe(
        data => {
          this.Protocolos = data;
          console.log(data);
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
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
  validarNumero(event){
    const patron=/^-?(0|[0-9]\d*)?$/
    const permitidos=event.keyCode;
    if (permitidos === 8) {
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
