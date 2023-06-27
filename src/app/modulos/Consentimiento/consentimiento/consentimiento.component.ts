import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthControllerService } from 'src/app/api/authController.service';
import { ConsentimientoControllerService } from 'src/app/api/consentimientoController.service';
import { InformacionTratamientoControllerService } from 'src/app/api/informacionTratamientoController.service';
import { Consentimiento } from 'src/app/model/consentimiento';
import { ConsentimientoDto } from 'src/app/model/consentimientoDto';
import { ConsentimientoListDto } from 'src/app/model/consentimientoListDto';
import { InformacionTratamientoDTO } from 'src/app/model/informacionTratamientoDTO';
import { FacturaService } from 'src/app/servicioManual/factura.service';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
@Component({
  selector: 'app-consentimiento',
  templateUrl: './consentimiento.component.html',
  styleUrls: ['./consentimiento.component.css']
})
export class ConsentimientoComponent implements OnInit, OnDestroy, AfterContentChecked {

  buscarNombre: boolean = true;
  formConsentimiento: FormGroup;
  formCabezera: FormGroup;
  formProfesionalTratante: FormGroup;
  formCirujano: FormGroup;
  formAnastesiologo: FormGroup;
  submitted: boolean;
  listDialog: boolean;
  listConsentimiento: ConsentimientoListDto[]
  loading: boolean = true;
  slectedConsentimiento: Consentimiento;
  aInformacionTratamiento: InformacionTratamientoDTO[];
  Dialog: boolean;
  updateSi: boolean = false;
  private unsuscribes$ = new Subject<void>();

  objConsentimieto: ConsentimientoDto = {}

  objInformacionTto: InformacionTratamientoDTO = {}

  constructor(private messageService: MessageService,
    private consentimientoservice: ConsentimientoControllerService,
    private infTratamientoService: InformacionTratamientoControllerService,
    private fb: FormBuilder,
    private servicePersona: AuthControllerService,
    private confirmationService: ConfirmationService,
    private cdRef: ChangeDetectorRef,
    private serviceGenPdf: FacturaService
  ) {

    this.formCabezera = this.fb.group({
      institucionSistemas: ['', Validators.required],
      unidadOperativa: ['', Validators.required],
      codUd: ['', Validators.required],
      parroquia: ['', Validators.required],
      canton: ['', Validators.required],
      provincia: ['', Validators.required],
      historiaClinica: ['', Validators.required],
    })

    this.formConsentimiento = new FormGroup({
      cedula: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      servicio: new FormControl('', Validators.required),
      sala: new FormControl('', Validators.required),
      cama: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
    }),

      this.formProfesionalTratante = this.fb.group({
        propositos: ['', Validators.required],
        terapiaProcedimiento: ['', Validators.required],
        resultadosEsperados: ['', Validators.required],
        riesgosComplicaciones: ['', Validators.required],
        NombreProfesional: ['', Validators.required],
        Especialidad: ['', Validators.required],
        telefono: ['', Validators.required],
        codigo: ['', Validators.required],
      })

    this.formCirujano = this.fb.group({
      proposito: ['', Validators.required],
      intervencionQuirurgica: ['', Validators.required],
      resultadoEsperados: ['', Validators.required],
      riesgosComplicaciones: ['', Validators.required],
      nombreCirujano: ['', Validators.required],
      Especialidad: ['', Validators.required],
      telefono: ['', Validators.required],
      codigo: ['', Validators.required]
    })

    this.formAnastesiologo = this.fb.group({
      proposito: ['', Validators.required],
      anestesiaPropuesta: ['', Validators.required],
      resultadosEsperados: ['', Validators.required],
      riesgosComplicaciones: ['', Validators.required],
      nombreCirujano: ['', Validators.required],
      especialidad: ['', Validators.required],
      telefono: ['', Validators.required],
      codigo: ['', Validators.required]
    })
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }


  get dtFormCabezera() {
    return this.formCabezera.controls;
  }

  get dtFormConsentimiento() {
    return this.formConsentimiento.controls;
  }

  get dtFormProfesionalTratante() {
    return this.formProfesionalTratante.controls;
  }

  get dtFormCirujano() {
    return this.formCirujano.controls;
  }

  get dtFormAnstesiolog() {
    return this.formAnastesiologo.controls;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsuscribes$.next();
    this.unsuscribes$.complete();
  }

  validacionAlfanumerica(event) {
    const patron = /[a-zA-ZÑñ0-9 ,:-]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }
  validacionNumerosLetras(event) {
    const patron = /[a-zA-ZÑñ0-9 ]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  validarSoloLetras(event) {
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

  validacionSoloNumeros(event) {
    const patron = /[0-9]/;
    const permitidos = event.keyCode;
    if (permitidos === 8) {
      return true;
    } else if (patron.test(event.key)) {
      return true;
    } else {
      return false;
    }
  }

  messageError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  messageSuccess(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  messageWarm(msg: String) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: 'Advertencia!: ' + msg,
    });
  }

  openNew() {
    this.submitted = false;
    this.listDialog = true;
  }

  idPersoana: number = 0;
  buscarPorCedula() {
    const cedula = this.formConsentimiento.get('cedula').value;
    this.servicePersona.getPersonaByIdentificacionUsingGET(cedula).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data) {
        this.idPersoana = data.object.id;
        this.formConsentimiento.patchValue({
          nombres: data.object.nombres
        });
      }
    })
  }

  crearConsentimiento() {
    this.submitted = true;
    if (this.formCabezera.valid && this.formConsentimiento.valid && this.formProfesionalTratante.valid
      && this.formCirujano.valid && this.formAnastesiologo.valid) {
      this.objConsentimieto.instutucionSistema = this.formCabezera.get('institucionSistemas').value;
      this.objConsentimieto.unidadOperativa = this.formCabezera.get('unidadOperativa').value;
      this.objConsentimieto.codUd = this.formCabezera.get('codUd').value;
      this.objConsentimieto.parroquia = this.formCabezera.get('parroquia').value;
      this.objConsentimieto.canton = this.formCabezera.get('canton').value;
      this.objConsentimieto.provincia = this.formCabezera.get('provincia').value;
      this.objConsentimieto.numeroHistoriaClinica = this.formCabezera.get('historiaClinica').value;
      this.objConsentimieto.servicio = this.formConsentimiento.get('servicio').value;
      this.objConsentimieto.sala = this.formConsentimiento.get('sala').value;
      this.objConsentimieto.cama = this.formConsentimiento.get('cama').value;
      this.objConsentimieto.fecha = this.formConsentimiento.get('fecha').value;
      this.objConsentimieto.idUsuario = this.idPersoana;

      this.consentimientoservice.saveConsentimientoUsingPOST(this.objConsentimieto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
        if (data.object != null) {
          let idConsentimiento = +data.object;
          this.saveInfProfesionalTratante(idConsentimiento);
          this.saveInfCirujanoTratante(idConsentimiento);
          this.saveInfAnstesiologoTratante(idConsentimiento);
          this.messageSuccess("CONSENTIMIENTO GUARDADO!");
        } else {
          this.messageError("ERROR AL GUARDAR CONSENTIMIENTO... " + data.message)
        }
      }, name => {
        this.messageError("ERROR EN EL SERVIDOR...");
      })
    } else {
      this.messageError("LLENE TODO LOS DATOS REQUERIDOS")
    }
  }

  saveInfProfesionalTratante(idConsentimiento: number) {
    this.objInformacionTto.proposito = this.formProfesionalTratante.get('propositos').value;
    this.objInformacionTto.procedimientoPropuesto = this.formProfesionalTratante.get('terapiaProcedimiento').value;
    this.objInformacionTto.resultadoEsperado = this.formProfesionalTratante.get('resultadosEsperados').value;
    this.objInformacionTto.riesgoComplicaciones = this.formProfesionalTratante.get('riesgosComplicaciones').value;
    this.objInformacionTto.nombreProfesionalTrat = this.formProfesionalTratante.get('NombreProfesional').value;
    this.objInformacionTto.especialidad = this.formProfesionalTratante.get('Especialidad').value;
    this.objInformacionTto.telefono = this.formProfesionalTratante.get('telefono').value;
    this.objInformacionTto.codigo = this.formProfesionalTratante.get('codigo').value;
    this.objInformacionTto.idConsentimientoFK = idConsentimiento;

    this.infTratamientoService.saveInformacionTratamientoUsingPOST(this.objInformacionTto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.status == 1) {
        this.messageSuccess("TRATAMIENTO DEL PROFESIONAL GUARDADO!");
      } else {
        this.messageError("ERROR AL GUARDAR CONSENTIMIENTO..." + data.message)
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR..." + error);
    })
  }

  saveInfCirujanoTratante(idConsentimiento: number) {
    this.objInformacionTto.proposito = this.formCirujano.get('proposito').value;
    this.objInformacionTto.procedimientoPropuesto = this.formCirujano.get('intervencionQuirurgica').value;
    this.objInformacionTto.resultadoEsperado = this.formCirujano.get('resultadoEsperados').value;
    this.objInformacionTto.riesgoComplicaciones = this.formCirujano.get('riesgosComplicaciones').value;
    this.objInformacionTto.nombreProfesionalTrat = this.formCirujano.get('nombreCirujano').value;
    this.objInformacionTto.especialidad = this.formCirujano.get('Especialidad').value;
    this.objInformacionTto.telefono = this.formCirujano.get('telefono').value;
    this.objInformacionTto.codigo = this.formCirujano.get('codigo').value;
    this.objInformacionTto.idConsentimientoFK = idConsentimiento;

    this.infTratamientoService.saveInformacionTratamientoUsingPOST(this.objInformacionTto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.status == 1) {
        this.messageSuccess("TRATAMIENTO DEL PROFESIONAL GUARDADO!");
      } else {
        this.messageError("ERROR AL GUARDAR INFORMACIÓN DEL PROFESIONAL TRATANTE..." + data.message)
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR..." + error);
    })
  }

  saveInfAnstesiologoTratante(idConsentimiento: number) {
    this.objInformacionTto.proposito = this.formAnastesiologo.get('proposito').value;
    this.objInformacionTto.procedimientoPropuesto = this.formAnastesiologo.get('anestesiaPropuesta').value;
    this.objInformacionTto.resultadoEsperado = this.formAnastesiologo.get('resultadosEsperados').value;
    this.objInformacionTto.riesgoComplicaciones = this.formAnastesiologo.get('riesgosComplicaciones').value;
    this.objInformacionTto.nombreProfesionalTrat = this.formAnastesiologo.get('nombreCirujano').value;
    this.objInformacionTto.especialidad = this.formAnastesiologo.get('especialidad').value;
    this.objInformacionTto.telefono = this.formAnastesiologo.get('telefono').value;
    this.objInformacionTto.codigo = this.formAnastesiologo.get('codigo').value;
    this.objInformacionTto.idConsentimientoFK = idConsentimiento;

    this.infTratamientoService.saveInformacionTratamientoUsingPOST(this.objInformacionTto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.status == 1) {
        this.messageSuccess("TRATAMIENTO DEL PROFESIONAL GUARDADO!");
      } else {
        this.messageError("ERROR AL GUARDAR INFORMACIÓN DEL PROFESIONAL TRATANTE..." + data.message)
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR..." + error);
    })
  }

  clear(table: Table) {
    table.clear();
  }

  idUpdateUsuario: number = 0;
  idUpdateConsentimiento: number = 0;
  onRowSelect(event) {
    this.messageService.add({ severity: 'info', summary: 'CONSENTIMIENTO DE: ', detail: event.data.nombres });
    this.cargarDatosConsentimientos(event.data.idConsentimiento);
    this.idUpdateConsentimiento = event.data.idConsentimiento;
    //this.updateSi = true;
    this.idUpdateUsuario = event.data.usuarioId;

  }


  idProfesionalTratante: number = 0;
  idCirujano: number = 0;
  idAnastesiologo: number = 0;
  cargarDatosConsentimientos(idConsentimiento: number) {
    if (idConsentimiento == null || idConsentimiento == 0) {
      this.messageError('NO SE OBTUVO UN DATO IMPORTANTE, RECARGE LA PÁGINA O VUELVA A INICAR SESIÓN');
      return;
    }

    this.consentimientoservice.getOneConsentimientoByIdUsingGET(idConsentimiento).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.object != null && data.status === 1) {
        this.updateSi = true;
        this.formConsentimiento.get('cedula').disable();

        this.formCabezera.patchValue({
          institucionSistemas: data.object.instutucionSistema,
          unidadOperativa: data.object.unidadOperativa,
          codUd: data.object.codUd,
          parroquia: data.object.parroquia,
          canton: data.object.canton,
          provincia: data.object.provincia,
          historiaClinica: data.object.numeroHistoriaClinica
        });

        this.formConsentimiento.patchValue({
          cedula: data.object.identificacion,
          nombres: data.object.nombre,
          servicio: data.object.servicio,
          sala: data.object.sala,
          cama: data.object.cama,
          fecha: new Date(data.object.fecha)
        });

        this.infTratamientoService.getAllInformacionTratamientoByIdUsingGET(idConsentimiento).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
          if (data.object != null && data.status === 1) {
            this.aInformacionTratamiento = data.object

            for (let index = 0; index < this.aInformacionTratamiento.length; index++) {

              if (index == 0) {
                const element = this.aInformacionTratamiento[index];
                this.idProfesionalTratante = this.aInformacionTratamiento[index].idInfTrat;
                this.formProfesionalTratante.patchValue({
                  propositos: element.proposito,
                  terapiaProcedimiento: element.procedimientoPropuesto,
                  resultadosEsperados: element.resultadoEsperado,
                  riesgosComplicaciones: element.riesgoComplicaciones,
                  NombreProfesional: element.nombreProfesionalTrat,
                  Especialidad: element.especialidad,
                  telefono: element.telefono,
                  codigo: element.codigo
                })
              }

              if (index == 1) {
                const element = this.aInformacionTratamiento[index];
                this.idCirujano = this.aInformacionTratamiento[index].idInfTrat;
                this.formCirujano.patchValue({
                  proposito: element.proposito,
                  intervencionQuirurgica: element.procedimientoPropuesto,
                  resultadoEsperados: element.resultadoEsperado,
                  riesgosComplicaciones: element.riesgoComplicaciones,
                  nombreCirujano: element.nombreProfesionalTrat,
                  Especialidad: element.especialidad,
                  telefono: element.telefono,
                  codigo: element.codigo
                })
              }

              if (index == 2) {
                const element = this.aInformacionTratamiento[index];
                this.idAnastesiologo = this.aInformacionTratamiento[index].idInfTrat;
                this.formAnastesiologo.patchValue({
                  proposito: element.proposito,
                  anestesiaPropuesta: element.procedimientoPropuesto,
                  resultadosEsperados: element.resultadoEsperado,
                  riesgosComplicaciones: element.riesgoComplicaciones,
                  nombreCirujano: element.nombreProfesionalTrat,
                  especialidad: element.especialidad,
                  telefono: element.telefono,
                  codigo: element.codigo
                })
              }

            }
          } else {
            this.messageError('ERROR EN EL SERVIDOR...' + data.message)
          }
        }, error => {
          this.messageError('ERROR EN EL SERVIDOR AL REALIZAR LA CONSULTA')
        })
      }
    })
  }

  updateDatos() {
    this.objConsentimieto.instutucionSistema = this.formCabezera.get('institucionSistemas').value;
    this.objConsentimieto.unidadOperativa = this.formCabezera.get('unidadOperativa').value;
    this.objConsentimieto.codUd = this.formCabezera.get('codUd').value;
    this.objConsentimieto.parroquia = this.formCabezera.get('parroquia').value;
    this.objConsentimieto.canton = this.formCabezera.get('canton').value;
    this.objConsentimieto.provincia = this.formCabezera.get('provincia').value;
    this.objConsentimieto.numeroHistoriaClinica = this.formCabezera.get('historiaClinica').value;
    this.objConsentimieto.servicio = this.formConsentimiento.get('servicio').value;
    this.objConsentimieto.sala = this.formConsentimiento.get('sala').value;
    this.objConsentimieto.cama = this.formConsentimiento.get('cama').value;
    this.objConsentimieto.fecha = this.formConsentimiento.get('fecha').value;
    this.objConsentimieto.idUsuario = this.idUpdateUsuario;
    this.objConsentimieto.idConsentimiento = this.idUpdateConsentimiento;

    this.consentimientoservice.updateConsentimientoUsingPUT(this.objConsentimieto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.object != null && data.status === 1) {
        this.editarInfoProfesionalTratante();
        this.editatInfoCirujano();
        this.editarInfoAnastesiologo();
        this.messageSuccess('SE HA EDITADO');
      } else {
        this.messageError("ERROR AL EDITAR..." + data.message);
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR");
    })
  }

  editarInfoProfesionalTratante() {
    this.objInformacionTto.proposito = this.formProfesionalTratante.get('propositos').value;
    this.objInformacionTto.procedimientoPropuesto = this.formProfesionalTratante.get('terapiaProcedimiento').value;
    this.objInformacionTto.resultadoEsperado = this.formProfesionalTratante.get('resultadosEsperados').value;
    this.objInformacionTto.riesgoComplicaciones = this.formProfesionalTratante.get('riesgosComplicaciones').value;
    this.objInformacionTto.nombreProfesionalTrat = this.formProfesionalTratante.get('NombreProfesional').value;
    this.objInformacionTto.especialidad = this.formProfesionalTratante.get('Especialidad').value;
    this.objInformacionTto.telefono = this.formProfesionalTratante.get('telefono').value;
    this.objInformacionTto.codigo = this.formProfesionalTratante.get('codigo').value;
    this.objInformacionTto.idConsentimientoFK = this.idUpdateConsentimiento;
    this.objInformacionTto.idInfTrat = this.idProfesionalTratante;

    this.infTratamientoService.updateConsentimientoTratamientoUsingPUT(this.objInformacionTto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.object != null || data.status == 1) {
        this.messageSuccess("EDITADO INFORMACIÓN DEL PROFESIONAL TRATANTE");
      } else {
        this.messageError("ERROR AL EDITAR..." + data.message);
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR");
    })
  }

  editatInfoCirujano() {
    this.objInformacionTto.proposito = this.formCirujano.get('proposito').value;
    this.objInformacionTto.procedimientoPropuesto = this.formCirujano.get('intervencionQuirurgica').value;
    this.objInformacionTto.resultadoEsperado = this.formCirujano.get('resultadoEsperados').value;
    this.objInformacionTto.riesgoComplicaciones = this.formCirujano.get('riesgosComplicaciones').value;
    this.objInformacionTto.nombreProfesionalTrat = this.formCirujano.get('nombreCirujano').value;
    this.objInformacionTto.especialidad = this.formCirujano.get('Especialidad').value;
    this.objInformacionTto.telefono = this.formCirujano.get('telefono').value;
    this.objInformacionTto.codigo = this.formCirujano.get('codigo').value;
    this.objInformacionTto.idConsentimientoFK = this.idUpdateConsentimiento;
    this.objInformacionTto.idInfTrat = this.idCirujano;
    this.infTratamientoService.updateConsentimientoTratamientoUsingPUT(this.objInformacionTto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.object != null || data.status == 1) {
        this.messageSuccess("EDITADO INFORMACIÓN DEL CIRUJANO TRATANTE");
      } else {
        this.messageError("ERROR AL EDITAR..." + data.message)
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR")
    })

  }

  editarInfoAnastesiologo() {
    this.objInformacionTto.proposito = this.formAnastesiologo.get('proposito').value;
    this.objInformacionTto.procedimientoPropuesto = this.formAnastesiologo.get('anestesiaPropuesta').value;
    this.objInformacionTto.resultadoEsperado = this.formAnastesiologo.get('resultadosEsperados').value;
    this.objInformacionTto.riesgoComplicaciones = this.formAnastesiologo.get('riesgosComplicaciones').value;
    this.objInformacionTto.nombreProfesionalTrat = this.formAnastesiologo.get('nombreCirujano').value;
    this.objInformacionTto.especialidad = this.formAnastesiologo.get('especialidad').value;
    this.objInformacionTto.telefono = this.formAnastesiologo.get('telefono').value;
    this.objInformacionTto.codigo = this.formAnastesiologo.get('codigo').value;
    this.objInformacionTto.idConsentimientoFK = this.idUpdateConsentimiento;
    this.objInformacionTto.idInfTrat = this.idAnastesiologo;
    this.infTratamientoService.updateConsentimientoTratamientoUsingPUT(this.objInformacionTto).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
      if (data.object != null || data.status == 1) {
        this.messageSuccess("EDITADO INFORMACIÓN DEL ANASTESIOLOGO TRATANTE");
      } else {
        this.messageError("ERROR AL EDITAR..." + data.message)
      }
    }, error => {
      this.messageError("ERROR EN EL SERVIDOR")
    })

  }

  refreshTable: boolean = true;
  confirmacion(idConsentimiento: number) {
    this.confirmationService.confirm({
      message: 'ELIMINAR ESTE REGISTRO?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.consentimientoservice.deleteConsentimientoUsingPUT(idConsentimiento).pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
          if (data.object != null && data.status == 1) {
            this.refreshTable = false;
            setTimeout(() => this.refreshTable = true, 0);
            this.messageService.add({ severity: 'info', summary: 'ELIMINADO!!', detail: 'REGISTRO ELIMINADO' });
          } else {
            this.messageError("ERROR AL ELIMINAR EL REGISTRO")
          }
        }, error => {
          this.messageError("ERROR EN EL SERVIDOR")
        })
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'NO SE HA ELIMINADO!' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'CANCELADO!!' });
            break;
        }
      }
    });
  }

  listarAllConsentimientos(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      this.consentimientoservice.listAllConsentimientosUsingGET().pipe(takeUntil(this.unsuscribes$)).subscribe((data) => {
        if (data.object != null && data.status == 1) {
          this.listConsentimiento = data.object;
          this.loading = false;
        }
      }, name => {
        this.messageError("ERROR EN EL SERVIDOR")
      })
    }, 1000);
  }

  refresDateTable(event: LazyLoadEvent) {
    this.listarAllConsentimientos(event);
  }


  

  imprimirPDFSinceButton(idCon: number) {
    this.serviceGenPdf.genePdfConsentimietnoInformado(idCon).subscribe(data => {
      if (data) {
        //this.cargarConsultaExterna(idConsExterno);
        this.descargarPdf(data);
        //this.limpiarAll();
      } else {
        this.messageError("No PDF document found");
      }
    }, err => {
      this.messageError("ERROR AL GENERAR PDF");
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
    if (this.objConsentimieto.fecha != null) {
      let nomPer = this.objConsentimieto.nombre;

      var link = document.createElement('a');
      link.href = url;
      link.download = 'CONSENTIMIENTO INFORMADO' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      var link = document.createElement('a');
      link.href = url;
      link.download = 'CONSENTIMIENTO INFORMADO_' + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  imprimirPDF(idCon: number) {
    this.serviceGenPdf.genePdfConsentimietnoInformado(idCon).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
      } else {
        this.messageError("No PDF document found");
      }
    }, err => {
      this.messageError("ERROR AL GENERAR PDF");
    })
  }

    limpiarFormularios() {
      this.updateSi = false;
      this.formConsentimiento.get('cedula').enable();
      this.formCabezera.reset();
      this.formConsentimiento.reset();
      this.formProfesionalTratante.reset();
      this.formAnastesiologo.reset();
      this.formCirujano.reset();
    }


  capturarContenido() {
    var data = document.getElementById('contenidoAConvertir');
    html2canvas(data).then(canvas => {

      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.save('Consentimiento Medico .pdf')
    });
  }
  downloadPDF() {
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}Consentimiento Informado.pdf`);
    });
  }
    
  }
