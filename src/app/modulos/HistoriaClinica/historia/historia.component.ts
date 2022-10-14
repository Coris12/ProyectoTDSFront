import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { HistoriaClinica } from 'src/app/model/historiaClinica';
import { FacturaService } from 'src/app/servicioManual/factura.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {

  buscarcedula: string;
  buscarnombre: string;
  idpersona: number;
  idHistoria: any
  usuarioN: any

  historia: HistoriaClinica = {
    alergia: null,
    examen: null,
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
    dx: null,
    ta: null,
    dr: null,
    tem: null,
    tipoSangre: null,
    usuario: null,
  }

  listDialog: boolean
  submitted: boolean;
  loading: boolean = true;

  historias: any[] = [];
  openNew() {
    this.submitted = false;
    this.listDialog = true;
  }

  clear(table: Table) {
    table.clear();
  }
  constructor(
    private persnaService: AuthControllerService,
    private historiaService: HistoriaControllerService,
    private messageService: MessageService,
    private serviceGenPdf: FacturaService

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

  guardarTodo() {
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

  
  saveHistoriaClinica() {
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

  CargarHistoria(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.historiaService.listUsingGET6().subscribe(
        data => {
          this.historias = data;
          console.log(data);
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
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

  imprimirPDFSinceButton(idHi: number) {
    this.serviceGenPdf.genePdHistoria(idHi).subscribe(data => {
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
    if (this.historia.fecha != null) {
      let nomPer = this.historia.usuario.nombres;

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

  imprimirPDF(idHi: number) {
    this.serviceGenPdf.genePdHistoria(idHi).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
  }

 
}
