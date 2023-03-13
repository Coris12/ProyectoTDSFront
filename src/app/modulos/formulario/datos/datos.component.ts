import { Component, OnInit } from '@angular/core';
import { AuthControllerService } from 'src/app/api/authController.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatosTarjetaDto } from 'src/app/model/datosTarjetaDto';
import { MessageService } from 'primeng/api';
import { FormularioControllerService } from 'src/app/api/formularioController.service';
import { Formulario } from '../../../model/formulario';
import { RefiereDeriva } from 'src/app/model/refiereDeriva';
import { DatosInstitucionales } from 'src/app/model/datosInstitucionales';
import { DatosInsControllerService } from 'src/app/api/datosInsController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { ResidenciaControllerService } from 'src/app/api/residenciaController.service';
import { RefiereControllerService } from 'src/app/api/refiereController.service';
import { FormsControllerService } from 'src/app/api/formsController.service';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  private unsuscribes$ = new Subject<void>();

  selectedCities: string[] = [];
  buscarcedula: string;
  dire: string
  buscarnombre: string;
  provi: String
  tele: string
  canton: string
  barrio: string
  na: string
  pais: string
  parrio: string;
  sexo: any;
  idpersona: any
  formuData: Formulario[] = [];
  idForm: any;
  idD: any
  edad: any
  numcli: any  
  usuarioN: any
//
  resumenCuadroClinico :any
  HallazgosRele :any


  ObjDatorTarj: DatosTarjetaDto = {
    canton: null,
    celular: null,
    direccion: null,
    id: null,
    idRecidencia: null,
    nacionalidad: null,
    nombres: null,
    pais: null,
    parroquia: null,
    provincia: null,
  }

  refiere: RefiereDeriva = {
    entidadSistema: null,
    especialidadReferido: null,
    establecimientoRefer: null,
    fecha: null,
    formulario: null,
    idRefiere: null,
    servicioReferido: null,
  }

  formula: Formulario = {
    //cie1: null,
    // contra: null,
    cuadroClinico: null,
    // dato: null,
    derivacion: null,
    diagnostico: null,
    hallazgos: null,
    idFormulario: null,
    //inversa: null,
    referencia: null,
    usuario: null,
  }


  datosin: DatosInstitucionales = {
    ausencia: null,
    descripcion: null,
    districto: null,
    entidad: null,
    establecimiento: null,
    falta: null,
    formulario: null,
    histClinNum: null,
    idDatos: null,
    limitada: null,
    otros: null,
    satu: null,
    tipo: null,
  }

  establecimiento = "C.E.M. MEDIVALLE";
  idPro: any
  usuarioE: any;
  idre: any
  constructor(
    private personaService: AuthControllerService,
    private messageService: MessageService,
    private formularioService: FormsControllerService,
    private datosService: DatosInsControllerService,
    private historiaService: HistoriaControllerService,
    private residenciaService: ResidenciaControllerService,
    private refiereService: RefiereControllerService,

  ) {
  }

  buscarPerIdent: string;

  ngOnInit(): void {

  }

  idPerPrin: number = 0;
  

  buscar() {
    this.personaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.identificacion == this.buscarcedula) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
            this.tele = datos.celular
            this.dire = datos.direccion
            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.nombres == this.buscarnombre) {
            this.idpersona = datos.id
            this.buscarcedula = datos.identificacion
            this.buscarnombre = datos.nombres
            this.sexo = datos.sexo
            this.tele = datos.celular
            this.dire = datos.direccion
          }
        }
      }
      console.log(res);
    })
    this.historiaService.listUsingGET6().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.usuario.identificacion == this.buscarcedula) {
            this.idpersona = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl

            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.usuario.nombres == this.buscarnombre) {
            this.idpersona = datos.usuario.id
            this.edad = datos.edad
            this.numcli = datos.numCl
          }
        }
      }
      console.log(res);
    })
    this.residenciaService.listUsingGET26().subscribe((res) => {
      for (let datos of res) {
        if (this.buscarcedula != "" && this.buscarcedula != undefined) {
          if (datos.usuario.identificacion == this.buscarcedula) {
            this.idpersona = datos.usuario.id
            this.canton = datos.canton
            this.barrio = datos.barrio
            this.parrio = datos.parroquia
            this.provi = datos.provincia
            this.na = datos.nacionalidad
            this.pais = datos.pais
            break;
          }
        } else if (this.buscarnombre != "" && this.buscarnombre != undefined) {
          if (datos.usuario.nombres == this.buscarnombre) {
            this.idpersona = datos.usuario.id
            this.canton = datos.canton
            this.barrio = datos.barrio
            this.parrio = datos.parroquia
            this.na = datos.nacionalidad
            this.pais = datos.pais
          }
        }
      }
      console.log(res);
    })
  }
/* buscarPersonaPorIdentificacion() {
     this.personaService.searchDateTarjetaUserUsingGET(this.buscarPerIdent).pipe(takeUntil(this.unsuscribes$)).subscribe((res) => {
       if (res.object != null) {
         this.ObjDatorTarj = res.object;
         this.idPerPrin = res.object.id;
         console.log("id de la perosna es: " + this.idPerPrin)
         this.buscarDatos(this.idPerPrin);
       } else {
         this.mensajeError("ERROR AL BUSCAR PERSONA");
         this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
       }
     }, error => {
       this.mensajeError("ERROR AL BUSCAR!!");
     });
   }*/


  /* buscarDatos(idPersona: number): void {
     this.formularioService.getByIdConvocatoriaUsingGET(idPersona).subscribe(data => {
       this.formuData = data
       console.log(data)
       for (let datos of data) {
         if (this.idPerPrin != undefined) {
           if (datos.usuario.id == this.idPerPrin) {
 
             this.datosin.districto = datos.datos.districto
             this.datosin.entidad = datos.datos.entidad
             this.datosin.establecimiento = datos.datos.establecimiento
             this.datosin.histClinNum = datos.datos.histClinNum
             this.datosin.tipo = datos.datos.tipo
             this.refiere.entidadSistema = datos.refiere.entidadSistema
             this.refiere.establecimientoRefer = datos.refiere.establecimientoRefer
             this.refiere.servicioReferido = datos.refiere.servicioReferido
             this.refiere.especialidadReferido = datos.refiere.especialidadReferido
             this.refiere.fecha = datos.refiere.fecha
             this.formula.cuadroClinico = datos.cuadroClinico
             this.formula.diagnostico = datos.diagnostico
             this.formula.hallazgos = datos.hallazgos
           }
         }
 
 
       }
     })
 
   }*/
  saveFormulario() {

    this.formularioService.saveFormularioUsingPOST(this.formula).subscribe(
      res => {
        console.log(res);

        if (res.object != null) {
          this.idPro = res.object
          console.log(res.object);

          console.log(this.idPro);

          this.MessageSuccess(" diagnostico  creado")
          console.log("this.entrooooooooooooooooooo");//tengo un
          this.recuperarForm()


        } else {
          this.mensajeError("error al crear diagnostico")
          console.log(" holii" + this.idPro);
          //console.log("error" + this.idPro)
          console.log(res.object);
        }
      })

    console.log(this.formula);




  }

  saveDatos() {
    console.log(this.datosin);
    console.log(this.idForm);
    this.datosin.establecimiento = this.establecimiento
    this.datosin.histClinNum = this.numcli
    this.datosService.saveDatosUsingPOST(this.datosin).subscribe(
      res => {
        console.log(res);
        if (res.object != null) {
          this.idD = res.object
          console.log(this.idD,"id datos");
          this.MessageSuccess(" Datos guardado")
          this.saveRefiere()
          //console.log(this.datosin);
        } else {
          this.mensajeError("error al guardar el formulario")
          console.log(" holii" + this.idD);
          console.log("error" + this.idD)
          console.log(res.object);
        }
      })

  }

  saveRefiere() {
    console.log(this.refiere)
    this.refiereService.saveRefiereUsingPOST(this.refiere).subscribe(
      res => {
        if (res.object != null) {
          this.idre = res.object
          console.log(this.idre,"id re");
          this.MessageSuccess(" Datos guardado")
          //console.log(this.refiere);// y esto que es dela otra tabla
        } else {
          this.mensajeError("error al guardar el formulario")
          //console.log(" holii" + this.idre);
          //console.log("error" + this.idre)
          //console.log(res.object);
        }
      })

  }




  recuperarForm() {
    console.log(this.idPro);   
    
   



    this.formularioService.listUsingGET14().subscribe((res) => {
      for (let datos of res) {
        //console.log(this.idPro, datos.idFormulario);
        console.log( this.resumenCuadroClinico &&  this.HallazgosRele);
        if (datos.cuadroClinico == this.formula.cuadroClinico && datos.hallazgos == this.formula.hallazgos){
          console.log( this.resumenCuadroClinico &&  this.HallazgosRele);
          
          console.log(this.idPro, datos.idFormulario);
          this.idPro = datos.idFormulario
          /*datos.idFormulario == this.idPro) {
          console.log(this.idPro);*/
          this.datosin.formulario = datos
          this.refiere.formulario = datos
          console.log(this.idPro);
          this.saveDatos();
        }
      }

    })
  }


 

  guardarTodo() {
    this.personaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
          console.log(datos.id, this.idpersona);
          this.usuarioE = datos
          this.formula.usuario = this.usuarioE
          console.log(this.formula);
          this.datosin.histClinNum = this.numcli
          this.formula.cuadroClinico
          this.formula.hallazgos
          this.saveFormulario()
        }
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
