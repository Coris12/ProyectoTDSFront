import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { MedicamentosControllerService } from 'src/app/api/medicamentosController.service';
import { Medicamentos } from 'src/app/model/medicamentos';
import { Usuario } from 'src/app/model/usuario';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FacturaService } from 'src/app/servicioManual/factura.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  dialogo: boolean;
  dialogo56: boolean;
  medicamentos: any[] = [];
  establecimiento = "C.E.M. MEDIVALLE";
  usuario2: any
  idpersona: number;
  idpe: string;
  buscarcedula: string;
  buscarnombre: string
  busacarMePer: string;
  sexo: string;
  numHoja: string;
  numHistoria: string;


  Medi: Medicamentos = {
    abreviaturaFun: null,
    fecha: null,
    establecimiento:null,
    hora: null,
    idMedicamentos: null,
    inicialesRespon: null,
    nombreMedicamento: null,
    usuario: null,
  }

  usuarios: Usuario[] = [];
  idMedi: any;
  idUsuario: any;
  idusuario2: number;
  medica: string;
  errMsj: string;

  constructor(
    private medicamentoService: MedicamentosControllerService,
    private messageService: MessageService,
    private persnaService: AuthControllerService,
    private serviceGenPdf: FacturaService
  ) { }

  buscarPerIdent: string = "";
  nom: string;

  ngOnInit(): void {
  }

  limpiarCampos() {
    this.Medi.abreviaturaFun = null,
      this.Medi.fecha = null,
      this.Medi.hora = null,
      this.Medi.inicialesRespon = null,
      this.Medi.nombreMedicamento = null
  }

  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
          console.log(datos.id, this.idpersona);
          this.usuario2 = datos
          this.Medi.usuario = this.usuario2
          console.log(this.Medi);
          this.saveMedicamento()
        }
      }
    })
  }

  saveMedicamento() {
    console.log(this.Medi);
    this.Medi.establecimiento = this.establecimiento
    this.medicamentoService.saveMedicamentoUsingPOST(this.Medi).subscribe(
      res => {
        if (res.object != null) {
          this.idMedi = res.object
          console.log(this.idMedi);
          this.MessageSuccess(" Medicamento  creado")
          console.log(this.Medi);

        } else {
          this.mensajeError("error al crear medicamento")
          console.log(" holii" + this.idMedi);
          console.log("error" + this.errMsj)
          console.log(res.object);
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

  buscarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      //console.log(this.buscarcedula, this.buscarnombre);
      for (let datos of res) {

        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          //console.log(datos.identificacion, this.buscarcedula);
          //this.buscarnombre = ""
          if (datos.identificacion == this.buscarcedula) {
            this.idpersona = datos.id
            this.vaciarbuscar
            this.buscarcedula = datos.identificacion
            this.buscarMedicamento();
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
            break;
            //        this.numHoja= datos.dondeesa lo del numero de hoja?????????????????????????????????? eso todavia no le pongo ajajja le qu jaejajjaja chiiiiiiiiiiii bueno le haces como le hago yo
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          //console.log(datos.nombres, this.buscarnombre);
          //this.buscarcedula = ""
          if (datos.nombres == this.buscarnombre) {
            this.idpersona = datos.id
            this.vaciarbuscar
            this.buscarcedula = datos.identificacion
            this.buscarMedicamento();
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo

          }
        }

      }
      console.log(res);

    })
  }

  buscarMedicamento() {
    this.medicamentos = []
    this.medicamentoService.listUsingGET7().subscribe((res) => {
      for (let datos of res) {
        console.log(datos, this.idpersona, datos.usuario.id);
        if (this.idpersona == datos.usuario.id) {
          console.log("siiiiiiiiiiiiiiiiiiiii", datos);
          console.log(this.medicamentos);
          this.medicamentos.push({
            nombreMedicamento: datos.nombreMedicamento,
            fecha: datos.fecha,
            hora: datos.hora,
            inicialesRespon: datos.inicialesRespon,
            abreviaturaFun: datos.abreviaturaFun
          });


        }
      }
      //console.log(res);

    })
  }

  vaciarbuscar() {
    this.buscarcedula = ""
    this.buscarnombre = ""
    this.sexo = ""
    this.numHoja = ""
    this.numHistoria = ""
  }

  imprimirPDFSinceButton(buscarcedula) {
    this.serviceGenPdf.genePdfMedicamentos(buscarcedula).subscribe(data => {
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
    this.vaciarbuscar();
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
    if (this.Medi.fecha != null) {
      let fech = this.Medi.fecha;
      let nomPer = this.Medi.usuario.nombres;

      let fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
      let hora = fech.getHours() + ":" + fech.getMinutes() + ":" + fech.getSeconds();
      var link = document.createElement('a');
      link.href = url;
      link.download = 'Medicamento_' + nomPer +  '-' + fecha + '-h' + hora + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      let nomPer = this.buscarnombre;
      var link = document.createElement('a');
      link.href = url;
      link.download = 'Medicamento_' + '-' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }



  
  ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWwWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWw

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

  

}
