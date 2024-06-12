import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthControllerService } from 'src/app/api/authController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { HistoriaClinica } from 'src/app/model/historiaClinica';
import { FacturaService } from 'src/app/servicioManual/factura.service';
import { FormBuilder, Validators } from '@angular/forms';


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

  //
  form: any
  //

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
    private serviceGenPdf: FacturaService,
    private formbuider: FormBuilder,


  ) { }

  ngOnInit(): void {
    this.HistoriaCNum();

    //validacionesssssssssssssssssssssss
    this.form = this.formbuider.group({
      numero: ['',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[0-9]\d*)?$/),
          Validators.minLength(1),
        ]
      ],
      numerotelefono: ['',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[0-9]\d*)?$/),
          Validators.minLength(1),
        ]
      ],
      numerocelular: ['',// asi porq si no si pones mal en el uno te sale el error en otro tambien ... creo que era de cada uno esto
        [
          Validators.required,
          Validators.pattern(/^-?(0|[0-9]\d*)?$/),
          Validators.minLength(1),
        ]
      ],
      cedula: ['',
        [
          Validators.required,
          Validators.pattern(/^-?(0|[0-9]\d*)?$/),
          Validators.minLength(10),
          Validators.maxLength(10)
        ]
      ],
      //esto tiene que ser para cada componente creo que era
      texto: ['',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email,
        ]
      ]
    });
    //
    //
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


    this.submitted = true;
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
  limpiarAll() {
    this.historia.alergia = "";
    this.historia.examen = "";
    this.historia.apf = "";
    this.historia.app = "";
    this.historia.edad = +"";
    this.historia.enfermedad = "";
    this.historia.estado = +"";
    this.historia.estadoCivil = "";
    this.historia.fc = "";
    this.historia.fr = "";
    this.historia.habitos = "";
    this.historia.idHistoria = +"";
    this.historia.motivo = "";
    this.historia.numCl = +"";
    this.historia.procedencia = "";
    this.historia.religion = "";
    this.historia.residencia = "";
    this.historia.spo2 = "";
    this.historia.dx = "";
    this.historia.ta = "";
    this.historia.dr = "";
    this.historia.tem = +"";
    this.historia.tipoSangre = "";
    this.buscarcedula = "";
    this.buscarnombre = "";
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

  HistoriaCNum() {
    var i: number = 0
    var x: number = 2
    var numhistoria: any
    this.historiaService.listUsingGET6().subscribe((res) => {
      for (let datos of res) {
        i++
        numhistoria = i + 1
        console.log(numhistoria, "!!!!!!!!!!!!!!!!!!!!!!!!!111");
        this.historia.numCl = numhistoria
      }

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
}
