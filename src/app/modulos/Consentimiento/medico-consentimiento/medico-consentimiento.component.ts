import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
@Component({
  selector: 'app-medico-consentimiento',
  templateUrl: './medico-consentimiento.component.html',
  styleUrls: ['./medico-consentimiento.component.css']
})
export class MedicoConsentimientoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

dialogo:boolean
capturarContenido() {
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
}
 /* convetToPDF1() {
    
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
}
