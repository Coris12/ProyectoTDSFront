import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthControllerService } from 'src/app/api/authController.service';
import { TokenService } from 'src/app/service/token.service';
import { NuevoUsuario } from '../../user/models/nuevo-usuario';
import { AuthService } from '../../user/service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { DatosTarjetaDto } from 'src/app/model/datosTarjetaDto';
import { FamiliaresControllerService } from 'src/app/api/familiaresController.service';
import { Usuario } from 'src/app/model/usuario';
import { Familiares } from 'src/app/model/familiares';
import { ListaFamiliaresDTO } from 'src/app/model/listaFamiliaresDTO';
import { TarjetaEspecialidadControllerService } from 'src/app/api/tarjetaEspecialidadController.service';
import { TarjetaEspecialidad } from 'src/app/model/tarjetaEspecialidad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResidenciaControllerService } from 'src/app/api/residenciaController.service';
import { ResidenciaDto } from 'src/app/model/residenciaDto';
import { DatosTarjetaAllDTO } from 'src/app/model/datosTarjetaAllDTO';
import { TarjetaControllerService } from 'src/app/api/tarjetaController.service';

@Component({
  selector: 'app-formulario-tarjeta',
  templateUrl: './formulario-tarjeta.component.html',
  styleUrls: ['./formulario-tarjeta.component.css']
})
export class FormularioTarjetaComponent implements OnInit, OnDestroy {

  formResidencia: FormGroup;
  formDatosTarjeta: FormGroup;

  private unsuscribes$ = new Subject<void>();

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

  familia: Familiares = {
    tipoFamiliar: null,
    usuario: null,
    idenUsuarioFamiliar: null,
  }

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: string;
  buscarPerIdent: string = "";
  buscar: string;
  totalRecords: number;
  loading: boolean;
  familiares: any;

  errMsj: string;

  display; boleean;

  nuevoUsuario: NuevoUsuario;
  //! datos para el usuario
  celular: string;
  ciudad: string;
  direccion: string;
  email: string;
  estado: number;
  identificacion: string;
  nombreUsuario: string;
  nombres: string;
  password: string;
  profesion: string;
  sexo: string;


  idUsuario: string;
  parentesco: string;
  usuarioId: string;

  //listar familiares de un usuario
  listFamily: ListaFamiliaresDTO[];
  editDialog: boolean;
  submitted: boolean;

  afiliacion = [];
  listEspecialidades: TarjetaEspecialidad[];

  selectAfiliacion: ListaFamiliaresDTO;
  selectEspecialidad: ListaFamiliaresDTO[];
  position: string;
  mostrarBotonGuardar: boolean = true;
  value3: string;

  ObjResidencia: ResidenciaDto = {
    barrio: null,
    canton: null,
    idRecidencia: null,
    idUsuario: null,
    nacionalidad: null,
    pais: null,
    parroquia: null,
    provincia: null,
    zona: null
  }

  objtDatosTarjetaAllDto: DatosTarjetaAllDTO = {
    afiliacion: null,
    canton: null,
    celular: null,
    consultas: null,
    direccion: null,
    estado: null,
    fechaFin: null,
    fechaInicio: null,
    id: null,
    idRecidencia: null,
    idTarjeta: null,
    idTarjetaEspecialidad: null,
    nacionalidad: null,
    nombres: null,
    pais: null,
    parroquia: null,
    provincia: null,
    tipoEspecialidad: null,
  }

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private messageService: MessageService,
    private personaService: AuthControllerService,
    private familiarService: FamiliaresControllerService,
    private confirmationService: ConfirmationService,
    private authControllerService: AuthControllerService,
    private tarjetaEspecialService: TarjetaEspecialidadControllerService,
    private fb: FormBuilder,
    private residenciaService: ResidenciaControllerService,
    private tarjetaService: TarjetaControllerService) {

    this.afiliacion = [
      { name: 'Personal' },
      { name: 'Familiar' }
    ];

    this.formResidencia = this.fb.group({
      pais: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      provincia: ['', Validators.required],
      canton: ['', Validators.required],
      parroquia: ['', Validators.required]
    })

    this.formDatosTarjeta = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      afili: ['', Validators.required],
      tipoTarjeta: ['', Validators.required],
      parroquia: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      pais: ['', Validators.required],
      provincia: ['', Validators.required],
      direccDomicilio: ['', Validators.required],
      celular: ['', Validators.required],
      canton: ['', Validators.required],
      fechaFin: ['', Validators.required],
      consulta: ['', Validators.required],
    })

    this.listarEspecialidades();
  }

  ngOnDestroy(): void {
    this.unsuscribes$.next();
    this.unsuscribes$.complete();
  }

  ngOnInit(): void {
  }

  //Validar solo numeros
  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
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

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(
      this.identificacion,
      this.nombres,
      this.direccion,
      this.celular,
      this.sexo,
      this.email,
      this.ciudad,
      this.nombreUsuario,
      this.password,
    );
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        if (data.mensaje != null) {
          this.usuarioId = data.mensaje
          this.MessageSuccess("cuenta creada");
          this.guardarFamiliar();
        } else {
          this.mensajeError("error al crear")
          console.log(data.mensaje)
        }
      },
      err => {
        this.errMsj = err.error.mensaje;
      }
    );
  }

  guardarFamiliar() {
    this.familia.idenUsuarioFamiliar = +this.usuarioId;
    this.familia.tipoFamiliar = this.parentesco;
    //this.familia.usuario = this.ObjDatorTarj;
    this.familia.usuario = this.objtDatosTarjetaAllDto;
    this.familiarService.savefamiliaresUsingPOST(this.familia).subscribe((res) => {

      if (res.object != null) {
        this.idUsuario = res.object;
        console.log(this.idUsuario)
        this.MessageSuccess("familiar creado");
        console.log(this.familia);
      } else {
        this.mensajeError("error al crear familiar")
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

  MessageWarm(msg: String) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'Advertencia!: ' + msg,
    });
  }

  idPerPrin: number = 0;
  buscarPersonaIdentificacionConTodosLosDatos() {
    if (this.buscarPerIdent.length <= 0) {
      this.mensajeError("ingrese un numero de identificacion")
      return;
    }

    this.tarjetaService.searchDateTarjetaUserUsingGET1(this.buscarPerIdent).pipe(takeUntil(this.unsuscribes$)).subscribe(
      data => {
        if (data.object != null) {
          this.objtDatosTarjetaAllDto = data.object;
          this.objtDatosTarjetaAllDto.fechaFin = new Date(data.object.fechaFin);
          this.cargarFamiliar(data.object.id);
          this.idPerPrin = data.object.id;
          this.mostrarBotonGuardar = false;

          console.log("ESte: ", this.objtDatosTarjetaAllDto);
          console.log("Guardar: ", this.formDatosTarjeta);
        } else {
          this.listFamily = [];
          this.buscarPersonaPorIdentificacion();
        }
      }
    )
  }


  buscarPersonaPorIdentificacion() {
    this.personaService.searchDateTarjetaUserUsingGET(this.buscarPerIdent).pipe(takeUntil(this.unsuscribes$)).subscribe((res) => {
      if (res.object != null) {
        this.objtDatosTarjetaAllDto = res.object;
        this.cargarFamiliar(res.object.id);
        this.idPerPrin = res.object.id;
        this.mostrarBotonGuardar = true;
      } else {
        this.listFamily = [];
        this.mensajeError("ERROR AL BUSCAR PERSONA");
        this.buscarUsuarioByIdentificacion(this.buscarPerIdent);
      }
    }, error => {
      this.mensajeError("ERROR AL BUSCAR!!");
    });
  }

  hideDialog() {
    this.editDialog = false;
    this.submitted = false;
  }

  showDialogEdit() {
    this.editDialog = true;
  }

  confirmacion(listFml: ListaFamiliaresDTO) {
    this.confirmationService.confirm({
      message: 'Eliminar este Familiar de la lista?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.eliminarFamiliar(listFml.idFamiliares);
        //this.listFamily.splice(this.listFamily.indexOf(listFml), 1);
        //this.messageService.add({ severity: 'info', summary: 'Familiar quitado de la lista!!', detail: listFml.nombres });
        this.limpiarObjDatosTarjetaAllDto();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'No se ha eliminado el familiar' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Cancelado!!' });
            break;
        }
      }
    });
  }

  cargarFamiliar(id: any) {
    this.familiarService.listfamiliaresusuarioUsingGET(id).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        this.listFamily = data.object;
      } else {
        this.listFamily = [];
        this.MessageSuccess("No tiene familiares");
      }
    })
  }

  eliminarFamiliar(fId) {
    this.familiarService.deletefamiliaresUsingPUT(fId).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object == "FAMILIAR ELIMINADO") {
        this.MessageSuccess("FAMILIAR ELIMINADO");
        this.cargarFamiliar(this.idPerPrin);
      } else {
        this.MessageSuccess("ERROR AL ELIMINAR FAMILIAR");
      }
    })
  }

  editarFamiliar(event, listFml: ListaFamiliaresDTO) {
    console.log(listFml);
    this.familiarService.updatefamiliaresUsingPUT(listFml).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data) {
        this.MessageSuccess("FAMILIAR EDITADO");
        this.cargarFamiliar(this.idPerPrin);
      } else {
        this.MessageSuccess("ERROR AL EDITAR FAMILIAR");
      }
    })
  }

  idPersona: number = 0;
  buscarUsuarioByIdentificacion(identificacion: string) {
    this.authControllerService.getPersonaByIdentificacionUsingGET(identificacion).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        //this.ObjDatorTarj = data.object;
        this.objtDatosTarjetaAllDto = data.object;
        this.idPersona = data.object.id;
        this.MessageWarm("NO SE OBTUVIERON TODOS LOS DATOS, DEBIDO A QUE NO FUERON LLENADOS!");
        this.confirmPosition("top");
        this.mostrarBotonGuardar = true;
      } else {
        this.listFamily = [];
        this.mensajeError("NO SE ENCONTRÓ  EL USUARIO CON ESTA IDENTIFICACIÓN");
        //TODO: this.ObjDatorTarj = { canton: null, celular: null, direccion: null, id: null, idRecidencia: null, nacionalidad: null, nombres: null, pais: null, provincia: null, parroquia: null }
        this.limpiarObjDatosTarjetaAllDto();
      }
    })
  }

  listarEspecialidades() {
    this.tarjetaEspecialService.getAllTarjetaEspecialidadUsingGET().pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        this.listEspecialidades = data.object;
        console.log(this.listEspecialidades);
      } else {
        this.listEspecialidades = [];
        this.mensajeError("NO SE PUDO CARGAR LAS ESPECIALIDADES");
      }
    }, error => {
      this.mensajeError("ERROR AL CARGAR LAS ESPECIALIDADES");
    });
  }

  confirmPosition(position: string) {
    this.position = position;
    this.confirmationService.confirm({
      message: 'No se encontraron todos los datos, porfavor llénelos ahora ¿Desea continuar?',
      header: 'DATOS INCOMPLETOS PARA TARJETA DE USUARIO!!',
      icon: 'pi pi-info-circle',
      accept: () => {
        //abrir el dialog para editar
        //this.messageService.add({severity:'info', summary:'Confirmed', detail:''});
        this.showDialogEdit();
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
      key: "positionDialog"
    });
  }

  agregarResidenciaUsuario() {
    this.ObjResidencia.idUsuario = this.idPersona;
    this.ObjResidencia.pais = this.formResidencia.get('pais')?.value;
    this.ObjResidencia.nacionalidad = this.formResidencia.get('nacionalidad')?.value;
    this.ObjResidencia.provincia = this.formResidencia.get('provincia')?.value;
    this.ObjResidencia.canton = this.formResidencia.get('canton')?.value;
    this.ObjResidencia.parroquia = this.formResidencia.get('parroquia')?.value;
    const afiliacion = this.formResidencia.get('afiliacion')?.value;
    const tipoTarjeta = this.formResidencia.get('tipoTarjeta')?.value;

    this.residenciaService.guardarResidenciaUsingPOST(this.ObjResidencia).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.object != null) {
        this.MessageSuccess("RESIDENCIA GUARDADA");
        this.hideDialog();
        this.formResidencia.reset();
        this.buscarPersonaPorIdentificacion();
        this.ObjResidencia = { barrio: null, canton: null, idRecidencia: null, idUsuario: null, nacionalidad: null, pais: null, parroquia: null, provincia: null, zona: null }

      } else {
        this.mensajeError("ERROR AL GUARDAR RESIDENCIA");
      }
    })
  }

  guardarTarjetaUsuario() {
    const afiliacion = this.formDatosTarjeta.get('afili')?.value;
    const tipoTarjeta = this.formDatosTarjeta.get('tipoTarjeta')?.value;
    const fechaFin = this.formDatosTarjeta.get('fechaFin')?.value;
    let cedula = this.formDatosTarjeta.get('cedula')?.value;

    this.objtDatosTarjetaAllDto.fechaInicio = new Date();
    this.objtDatosTarjetaAllDto.estado = 1;
    this.objtDatosTarjetaAllDto.afiliacion = afiliacion.name;
    this.objtDatosTarjetaAllDto.idTarjetaEspecialidad = tipoTarjeta.idTarjetaEspcialidad;
    this.objtDatosTarjetaAllDto.tipoEspecialidad = tipoTarjeta.tipoEspecialidad;
    // this.objtDatosTarjetaAllDto.fechaFin = new Date(fechaFin);
    // console.log(fechaFin);

    console.log(tipoTarjeta.idTarjetaEspcialidad);
    console.log(this.formDatosTarjeta);
    console.log(this.formDatosTarjeta.value);

    this.tarjetaService.createUsingPOST5(this.objtDatosTarjetaAllDto, cedula).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.mensaje) {
        this.updateIdTarjetaUsuario(data.mensaje, cedula);
        this.MessageSuccess("TARJETA GUARDADA CORRECTAMENTE");
        this.formDatosTarjeta.reset();
        this.limpiarObjDatosTarjetaAllDto();
      } else {
        this.mensajeError("ERROR AL GUARDAR TARJETA");
      }
    }, error => {
      this.mensajeError("ERROR AL GUARDAR TARJETA");
    })
  }

  updateIdTarjetaUsuario(idTarjeta: string, cedula: string) {
    this.personaService.updateIdTarjetaUsingPUT(cedula, +idTarjeta).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
      if (data.message != null) {
        this.MessageSuccess("TARJETA GUARDADA CORRECTAMENTE");
      } else {
        this.mensajeError("ERROR AL CREAR UNA RELACION ENTRE TARJETA Y USUARIO");
        return;
      }
    }, error => {
      this.mensajeError("ERROR AL CREAR UNA RELACION ENTRE TARJETA Y USUARIO");
    })
  }


  editarDatosTarjeta() {
    if (this.formDatosTarjeta.get('afili')?.touched) {
      const afiliacion = this.formDatosTarjeta.get('afili')?.value;
      this.objtDatosTarjetaAllDto.afiliacion = afiliacion.name;
    }

    if (this.formDatosTarjeta.get('tipoTarjeta')?.touched) {
      const tipoTarjeta = this.formDatosTarjeta.get('tipoTarjeta')?.value;
      this.objtDatosTarjetaAllDto.idTarjetaEspecialidad = tipoTarjeta.idTarjetaEspcialidad;
      this.objtDatosTarjetaAllDto.tipoEspecialidad = tipoTarjeta.tipoEspecialidad;
    }

    console.log(this.formDatosTarjeta);

    if (this.formDatosTarjeta.valid) {
      this.tarjetaService.updateDatosTarjetaUserUsingPUT(this.objtDatosTarjetaAllDto).pipe(takeUntil(this.unsuscribes$)).subscribe(data => {
        if (data.object == "DATOS DE TARJETA ACTUALIZADOS") {
          this.MessageSuccess("TARJETA ACTUALIZADA CORRECTAMENTE");
          this.limpiarObjDatosTarjetaAllDto();
          this.formDatosTarjeta.reset();
        } else {
          this.mensajeError("ERROR AL EDITAR TARJETA");
        }
      }, error => {
        this.mensajeError("ERROR AL EDITAR TARJETA");
      })
    } else {
      this.mensajeError("LLENE TODOS LOS CAMPOS");
    }

  }

  limpiarObjDatosTarjetaAllDto() {
    this.objtDatosTarjetaAllDto = {
      afiliacion: null, canton: null, celular: null, direccion: null, id: null, idRecidencia: null, idTarjeta: null, idTarjetaEspecialidad: null, nacionalidad: null, nombres: null, pais: null, parroquia: null, provincia: null, tipoEspecialidad: null
    }
  }

}
