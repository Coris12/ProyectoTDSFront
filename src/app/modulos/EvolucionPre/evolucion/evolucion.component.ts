import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { EvolucionControllerService } from 'src/app/api/evolucionController.service';
import { MedicamentosControllerService } from 'src/app/api/medicamentosController.service';
import { Evolucion } from 'src/app/model/evolucion';
import { Medicamentos } from 'src/app/model/medicamentos';
import { FacturaService } from 'src/app/servicioManual/factura.service';

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrls: ['./evolucion.component.css']
})
export class EvolucionComponent implements OnInit {

  constructor(
    private persnaService: AuthControllerService,
    private evolucionService: EvolucionControllerService,
    private messageService: MessageService,
    private medicaService: MedicamentosControllerService,
    private serviceGenPdf:FacturaService
  ) { }

  //!variables
  buscarcedula: string;
  buscarnombre: string
  sexo: string;
  idper: number
  idEvo: any;
  errMsj: String;
  establecimiento = "C.E.M. MEDIVALLE";

  medi: string



  usuarioE: any;
  medicamentos: any = []
  //formulario
  Evolu: Evolucion = {
    idEvolucion: null,
    evolucion: null,
    fecha: null,
    hora: null,
    indicaciones: null,
    medicamentoAD: null,
    establecimiento: null,
    usuario: null,
  }

  ngOnInit(): void {
  }



  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.Evolu.usuario = this.usuarioE
          console.log(this.Evolu);
          this.saveEvolucion()
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
            this.buscarnombre = datos.nombres
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
            this.sexo = datos.sexo

          }
        }

      }
      console.log(res);

    })
  }


  saveEvolucion() {
    console.log(this.Evolu);
    this.Evolu.establecimiento = this.establecimiento
    this.evolucionService.saveEvolucionUsingPOST(this.Evolu).subscribe(
      res => {
        if (res.object != null) {
          this.idEvo = res.object
          console.log(this.idEvo);
          this.MessageSuccess(" Evolucion  creado")
          console.log(this.Evolu);

        } else {
          this.mensajeError("error al crear evolucion")
          console.log(" holii" + this.idEvo);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }
  imprimirPDFSinceButton(buscarcedula) {
    this.serviceGenPdf.genePdfEvolucion(buscarcedula).subscribe(data => {
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
    if (this.Evolu.fecha != null) {
      let fech = this.Evolu.fecha;
      let nomPer = this.Evolu.usuario.nombres;

      let fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
      let hora = fech.getHours() + ":" + fech.getMinutes() + ":" + fech.getSeconds();
      var link = document.createElement('a');
      link.href = url;
      link.download = 'Evolucion y Prescricion_' + nomPer +  '-' + fecha + '-h' + hora + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      let nomPer = this.buscarnombre;
      var link = document.createElement('a');
      link.href = url;
      link.download = 'Evolucion y Prescricion_' + '-' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  /* buscarMedicamento() {
     var medi2: string
     var i: any = 0
     this.medicamentos = []
     
     this.medicaService.listUsingGET2().subscribe((res) => {
       for (let datos of res) {
 
         console.log(datos, this.idper, datos.usuario.id);
         if (this.idper == datos.usuario.id) {
           i++
           console.log("siiiiiiiiiiiiiiiiiiiii", datos);
           this.medicamentos.push({
             nombreMedicamento: datos.nombreMedicamento,
           });
           console.log(this.medicamentos);
          this.medi = this.medicamentos
           /**
            * medi2 = datos.nombreMedicamento
           console.log(medi2);
           console.log(this.medicamentos);
           if (this.medi != medi2 &&(i>1)) {
             this.medi = datos.nombreMedicamento.concat(" , " + datos.nombreMedicamento);
             
           }else{
             this.medi = datos.nombreMedicamento
           }
           
         }
       }
       //console.log(res);
 
     })
   }*/

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
}
