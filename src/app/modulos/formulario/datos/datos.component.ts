import { Component, OnInit } from '@angular/core';
import { AuthControllerService } from 'src/app/api/authController.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatosTarjetaDto } from 'src/app/model/datosTarjetaDto';
import { MessageService } from 'primeng/api';
import { FormularioControllerService } from 'src/app/api/formularioController.service';
import { Formulario } from '../../../model/formulario';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  private unsuscribes$ = new Subject<void>();

  selectedCities: string[] = [];

  formuData: Formulario[]=[];

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
  constructor(
    private personaService: AuthControllerService,
    private messageService: MessageService,
    private formularioService: FormularioControllerService

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
        console.log("id de la perosna es: " +this.idPerPrin)
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
    })

  }
}
