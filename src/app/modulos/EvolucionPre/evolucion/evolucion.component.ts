import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { EvolucionControllerService } from 'src/app/api/evolucionController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
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
    private serviceGenPdf: FacturaService,
    private historiaService:HistoriaControllerService
  ) { }

  //!variables
  buscarcedula: string;
  buscarnombre: string
  sexo: string;
  idper: number
  idEvo: any;
  errMsj: String;
  establecimiento = "C.E.M. MEDIVALLE";
  Evoluciones: any[] = [];
  medi: string
  loading: boolean = true;


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
  listDialog: boolean
  submitted: boolean;
  edad:any
  numcli:any

  openNew() {
    this.submitted = false;
    this.listDialog = true;
  }

  clear(table: Table) {
    table.clear();
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
  
  cargarEvolucion(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.evolucionService.listUsingGET4().subscribe(
        data => {
          this.Evoluciones = data;
          console.log(data);
          this.loading = false;
        },
        err => {
          console.log(err);
        }
      );
    }, 100);
  }

  limpiarCampos() {
    this.buscarcedula="";
    this.buscarnombre="";
    this.Evolu.establecimiento = "";
    this.Evolu.evolucion = "";
    this.Evolu.idEvolucion = +"";
    this.Evolu.hora = "",
    this.Evolu.indicaciones = "";
    this.Evolu.medicamentoAD = "",
    this.Evolu.usuario.nombres = "";
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
      link.download = 'Evolucion y Prescricion_' + nomPer + '-' + fecha + '-h' + hora + '-' + numAlea + '.pdf';
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

  imprimirPDF(buscarcedula) {
    this.serviceGenPdf.genePdfEvolucion(buscarcedula).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.mensajeError("No PDF document found");
      }
    }, err => {
      this.mensajeError("ERROR AL GENERAR PDF");
    });
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
 validarCedula(event){
  const patron=/^-?(0|[0-9]\d*)?$/;
  const permitidos=event.keyCode;
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
  validarFecha(event){
    const patron=/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
    const permitidos=event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

}
