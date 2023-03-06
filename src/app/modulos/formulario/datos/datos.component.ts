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



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  private unsuscribes$ = new Subject<void>();

  selectedCities: string[] = [];

  formuData: Formulario[] = [];
  idForm: any;
  idpersona: number;
  usuarioN: any
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
    idRefiere: null,
    motivo: null,
    servicioReferido: null,
  }

  formula: Formulario = {
    cuadroClinico: null,
    datos: null,
    diagnostico: null,
    hallazgos: null,
    idFormulario: null,
    refiere: null,
    usuario: null,
  }


  datosin: DatosInstitucionales = {
    area: null,
    districto: null,
    entidad: null,
    establecimiento: null,
    histClinNum: null,
    idDatos: null,
    tipo: null,
  }




  constructor(
    private personaService: AuthControllerService,
    private messageService: MessageService,
    private formularioService: FormularioControllerService,
   

  ) {
  }

  buscarPerIdent: string;

  ngOnInit(): void {
    this.selectedCities
  }

  idPerPrin: number = 0;
  buscarPersonaPorIdentificacion() {
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


  buscarDatos(idPersona: number): void {
    this.formularioService.getByIdConvocatoriaUsingGET(idPersona).subscribe(data => {
      this.formuData = data
      console.log(data)
      for (let datos of data) {
        if (this.idPerPrin != undefined) {
          if (datos.usuario.id == this.idPerPrin) {
            this.datosin.area = datos.datos.area
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

  }
  ///guarr
  saveFormulario() {
    console.log(this.formula);
    this.formularioService.createUsingPOST3(this.formula).subscribe(
      res => {
        if (res.object != null) {
          this.idForm = res.object
          console.log(this.idForm);
          this.MessageSuccess(" Formulario guardado")
          console.log(this.idForm);
        } else {
          this.mensajeError("error al guardar el formulario")
          console.log(" holii" + this.idForm);
          console.log("error" + this.idForm)
          console.log(res.object);
        }
      })
  }

 guardarTodo(){
  this.personaService.listaUsingGET().subscribe((res) => {
    for (let datos of res) {

      if (datos.id == this.idpersona && this.idpersona != 0 && this.idpersona != undefined) {
        console.log(datos.id, this.idpersona);
        this.usuarioN = datos
        this.formula.usuario = this.usuarioN
        console.log(this.formula);
        this.saveFormulario()

      }
    }
  })
 }
}
