import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthControllerService } from 'src/app/api/authController.service';
import { MedicamentosControllerService } from 'src/app/api/medicamentosController.service';
import { Medicamentos } from 'src/app/model/medicamentos';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  dialogo: boolean;
  medicamentos: any[] = [];

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
    private persnaService: AuthControllerService
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
  buscarPersona2() {
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

  buscarMedicamento() {//______________________________________________________________NO BORRRAR ____________________________________________________________________________________________________xd
    this.medicamentoService.listUsingGET2().subscribe((res) => {
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
}
