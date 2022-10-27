import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MedicoConsentimientoControllerService } from 'src/app/api/medicoConsentimientoController.service';
import { MedicoConsentimiento } from 'src/app/model/medicoConsentimiento';
import { FacturaService } from 'src/app/servicioManual/factura.service';
@Component({
  selector: 'app-medico-consentimiento',
  templateUrl: './medico-consentimiento.component.html',
  styleUrls: ['./medico-consentimiento.component.css']
})
export class MedicoConsentimientoComponent implements OnInit {



  idMe: any;
  errMsj: String;

  Medicos: any[] = [];
  constructor(
    private medicoService: MedicoConsentimientoControllerService,
    private messageService: MessageService,
    private serviceGenPdf:FacturaService
  ) { }

  ngOnInit(): void {
    
  }
  Medico: MedicoConsentimiento = {
    alergia: null,
    cedula: null,
    codigo: null,
    direccion: null,
    edad: null,
    especialidad: null,
    estado: null,
    fecha: null,
    fechaNaci: null,
    idMediC: null,
    nombreDoc: null,
    nombrePaciente: null,
    personaA: null,
    procedimientos: null,
    telefono: null,
    entidad:null,
  }
  
  listDialog: boolean
  submitted: boolean;
  loading: boolean = true;

  openNew() {
    this.submitted = false;
    this.listDialog = true;
  }

  clear(table: Table) {
    table.clear();
  }
  saveConsentimiento() {
    console.log(this.Medico);

    this.medicoService.saveConsentimientoMUsingPOST(this.Medico).subscribe(
      res => {
        if (res.object != null) {
          this.idMe = res.object
          console.log(this.idMe);
          this.MessageSuccess(" Consentimiento Medico guardado")
          console.log(this.Medico);

        } else {
          this.mensajeError("Error al crear Consentimiento medico")
          console.log(" holii" + this.Medico);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  CargarConsentimientos(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.medicoService.listUsingGET8().subscribe(
        data => {
          this.Medicos = data;
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

  imprimirPDFSinceButton(idmeC:number) {
    this.serviceGenPdf.genePdfMedicoConsentimietno(idmeC).subscribe(data => {
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
    if (this.Medico.fecha != null) {
      let nomPer = this.Medico.nombrePaciente;

      var link = document.createElement('a');
      link.href = url;
      link.download = 'CONSENTIMIENTO PARA PROCEDIMIENTO MÉDICOS_' + nomPer +  '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      var link = document.createElement('a');
      link.href = url;
      link.download = 'CONSENTIMIENTO PARA PROCEDIMIENTO MÉDICOS_' +  '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  imprimirPDF(idmeC:number) {
    this.serviceGenPdf.genePdfMedicoConsentimietno(idmeC).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
  }

  
 /* capturarContenido() {
    var data = document.getElementById('contenidoAConvertir');
    html2canvas(data).then(canvas => {

      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.save('Consentimiento Medico .pdf')
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
      docResult.save(`${new Date().toISOString()}Consentimiento Medico.pdf`);
    });
  }*/
}
