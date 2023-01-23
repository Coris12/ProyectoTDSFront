import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { ExamenEstoControllerService } from 'src/app/api/examenEstoController.service';
import { HistoriaControllerService } from 'src/app/api/historiaController.service';
import { IndiceControlllerService } from 'src/app/api/indiceControlller.service';
import { IndicesFamilControllerService } from 'src/app/api/indicesFamilController.service';
import { OdontologiaControllerService } from 'src/app/api/odontologiaController.service';
import { PlanesControllerService } from 'src/app/api/planesController.service';
import { ExamenEsto } from 'src/app/model/examenEsto';
import { IndicesCPO } from 'src/app/model/indicesCPO';
import { IndicesF } from 'src/app/model/indicesF';
import { Odontologia } from 'src/app/model/odontologia';
import { PlanesDiagnostico } from 'src/app/model/planesDiagnostico';

@Component({
  selector: 'app-odontologia',
  templateUrl: './odontologia.component.html',
  styleUrls: ['./odontologia.component.css']
})
export class OdontologiaComponent implements OnInit {

  constructor(
    private persnaService: AuthControllerService,
    private histService: HistoriaControllerService,
    private odonService: OdontologiaControllerService,
    private indiService: IndiceControlllerService,
    private messageService: MessageService,
    private indiceAService:IndicesFamilControllerService,
    private examenEsto:ExamenEstoControllerService,
    private planesService:PlanesControllerService

  ) {

  }

  establecimiento = "C.E.M. MEDIVALLE";

  //variables
  buscarcedula: string;
  buscarnombre: string;
  idper: number;
  usarioE: number;
  sexo: string;
  his: any;
  idper1: number
  idOdont: any
  errMsj: String;
  usuarioE: any;
  idIndi: any
  //
  Odonto: Odontologia = {
    codigo: null,
    diagnostico:null,
    enfermedad: null,
    establecimiento: null,
    fecha: null,
    frecCardiaca: null,
    frecRespi: null,
    idOdonto: null,
    motivo: null,
    prescripcion: null,
    presion: null,
    procedimiento: null,
    sesion: null,
    temperatura: null,
    usuario: null
  }

  indice: IndicesCPO = {
    c: null,
    c1: null,
    d: null,
    d1: null,
    idIndice: null,
    o: null,
    o1: null,
    odontologia: null,
    p: null,
    p1: null,
    totalD: null,
    totald1: null
  }

  indiceF:IndicesF={
    alergiaAnes: null,
    alergiaAntiabio: null,
    asma: null,
    descripcion: null,
    diabetes: null,
    enfCardiaca: null,
    hemR: null,
    idIndiceF: null,
    odontologia: null,
    otros: null,
    tuberculosis: null,
    vh: null
  }

  examenE:ExamenEsto={
    atm: null,
    carrillos: null,
    descripcion: null,
    glandulasSa: null,
    glangios: null,
    idExamenEs: null,
    labio: null,
    lengua: null,
    maxSuperior: null,
    maxilarInf: null,
    mejillas: null,
    odontologia: null,
    oroFaringe: null,
    paladar: null,
    piso: null
  }

  planes:PlanesDiagnostico={
    biometrica: null,
    idPlanes: null,
    odontologia: null,
    otros: null,
    quimicaS: null,
    rayosx: null
  }

  ngOnInit(): void {
    this.buscar();
    this.recuperarprotocolo()
  }

  cargarPersona() {
    this.persnaService.listaUsingGET().subscribe((res) => {
      for (let datos of res) {

        if (datos.id == this.idper && this.idper != 0 && this.idper != undefined) {
          console.log(datos.id, this.idper);
          this.usuarioE = datos
          this.Odonto.usuario = this.usuarioE

          console.log(this.Odonto);
          this.guardarOdonto()
          
        }
      }
    })
  }

  guardarOdonto() {
    
    console.log(this.Odonto);
    this.Odonto.establecimiento = this.establecimiento
    this.odonService.saveOdontologiaUsingPOST(this.Odonto).subscribe(
      res => {
        if (res.object != null) {
          this.idOdont = res.object
          console.log(this.idOdont);
          this.MessageSuccess(" Odontologia  creado")
          this.recuperarprotocolo()
          console.log(this.Odonto);
        } else {
          this.mensajeError("error al crear ficha aodontologica")
          console.log(" holii" + this.idOdont);
          console.log("error" + this.errMsj)
          console.log(res.object);
        }
      })
  }

  guardarIndice() {
    this.indiService.saveIndiceUsingPOST(this.indice).subscribe(
      res => {
        if (res.object != null) {
          this.idIndi = res.object
          console.log(this.indice);
          this.MessageSuccess("Exito")
          this.guardarAntecedenteF();
          this.guardarExamenEsto();
          this.guardarPlanes();
          console.log(this.indice);

        } else {
          this.mensajeError("error al crear")
          console.log(" holii" + this.idIndi);
          console.log("error" + this.errMsj)
          console.log(res.object);

        }
      }
    )
  }
   
  guardarAntecedenteF(){
    this.indiceAService.saveAntecPersonalesUsingPOST1(this.indiceF).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR LOS ANTECEDENTES PERSONALES EN EL SERVIDOR");
    });
  }

  guardarExamenEsto(){
    this.examenEsto.saveExamenEstoUsingPOST(this.examenE).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intententar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EL EXAMEN DEL SISTEMA ESTOMATONAGTICO EN EL SERVIDOR");
    });
  }

  guardarPlanes(){
    this.planesService.saveAntecPersonalesUsingPOST2(this.planes).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess(data.message);
      } else {
        this.mensajeError("Error al intentar guardar");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR EL PLANE DE DIAGNOSTICO EN EL SERVIDOR");
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

  recuperarprotocolo() {

    this.odonService.listUsingGET11().subscribe((res) => {
      for (let datos of res) {
        if (datos.idOdonto == this.idOdont) {
          this.indice.odontologia = datos
          this.indiceF.odontologia=datos
          this.examenE.odontologia=datos
          this.planes.odontologia=datos
          console.log(this.idOdont);
          this.guardarIndice();
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
            this.buscar
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
      console.log('' + this.idper);

    })

  }

  buscar() {
    this.histService.listUsingGET6().subscribe((res) => {
      //console.log(this.buscarcedula, this.buscarnombre);
      for (let datos of res) {
        if (datos.usuario.id == this.idper) {
          this.his = datos.numCl
          this.idper1 = datos.usuario.id
        }
      }
      console.log(res);
    })
  }
}
