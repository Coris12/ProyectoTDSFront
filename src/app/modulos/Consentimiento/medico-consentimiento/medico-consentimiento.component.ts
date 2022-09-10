import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  convetToPDF1() {
    
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
  }
}
