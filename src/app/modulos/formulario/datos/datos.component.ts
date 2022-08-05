import { Component, OnInit } from '@angular/core';
import { AuthControllerService } from 'src/app/api/authController.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatosTarjetaDto } from 'src/app/model/datosTarjetaDto';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  private unsuscribes$ = new Subject<void>();

  selectedCities: string[] = [];

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
      } else {
        this.mensajeError("ERROR AL BUSCAR PERSONA");
        this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
        this.buscarUsuarioByIdentificacion(this.buscarPerIdent);
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
  buscarUsuarioByIdentificacion(identificacion: string) {
    this.personaService.getPersonaByIdentificacionUsingGET(identificacion).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        this.ObjDatorTarj = data.object;
        this.mensajeError("NO SE OBTUVIERON TODOS LOS DATOS, DEBIDO A QUE NO FUERON LLENADOS!");
      } else {
        this.mensajeError("NO SE ENCONTRÓ  EL USUARIO CON ESTA IDENTIFICACIÓN");
        this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
      }
    })
  }
}
