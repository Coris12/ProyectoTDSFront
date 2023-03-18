import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';
import { AntecFamiliaresControllerService } from 'src/app/api/antecFamiliaresController.service';
import { AntecPersonalesControllerService } from 'src/app/api/antecPersonalesController.service';
import { AuthControllerService } from 'src/app/api/authController.service';
import { ConsultaExternaControllerService } from 'src/app/api/consultaExternaController.service';
import { DiagnosticoControllerService } from 'src/app/api/diagnosticoController.service';
import { ExamFisicoRegionalControllerService } from 'src/app/api/examFisicoRegionalController.service';
import { PlanTratamientoControllerService } from 'src/app/api/planTratamientoController.service';
import { RevOrganoSistemControllerService } from 'src/app/api/revOrganoSistemController.service';
import { SigVitAntropometriaControllerService } from 'src/app/api/sigVitAntropometriaController.service';
import { AntecFamiliares } from 'src/app/model/antecFamiliares';
import { AntecPersonales } from 'src/app/model/antecPersonales';
import { ConsultaExterna } from 'src/app/model/consultaExterna';
import { Diagnosticos } from 'src/app/model/diagnosticos';
import { ExamFisicoRegional } from 'src/app/model/examFisicoRegional';
import { PlanTratamiento } from 'src/app/model/planTratamiento';
import { RevOrganoSistem } from 'src/app/model/revOrganoSistem';
import { SigVitAntropometria } from 'src/app/model/sigVitAntropometria';
import { Usuario } from 'src/app/model/usuario';
import { ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';
import { ConstExternaListDTO } from 'src/app/model/constExternaListDTO';
import { Subscription } from 'rxjs';
import { FacturaService } from 'src/app/servicioManual/factura.service';


@Component({
  selector: 'app-consulta-externa-anamnesis',
  templateUrl: './consulta-externa-anamnesis.component.html',
  styleUrls: ['./consulta-externa-anamnesis.component.css']
})
export class ConsultaExternaAnamnesisComponent implements OnInit, AfterContentChecked, OnDestroy {

  establecimiento = "C.E.M. MEDIVALLE";
  identificacionPer: string;
  listConsExteDialog: boolean;
  loadTabCE: boolean;
  loading: boolean = true;
  submitted: boolean;
  options = ["Masculino", "Femenino"];
  ngSelect = "";
  persona: any = {
    nombresApellidos: "",
    sexo: [] = [],
    identificacion: "",
    histCli: ""
  }

  suscripcionCargarDatos: Subscription = new Subscription();
  suscripcionConExt: Subscription = new Subscription();
  suscripcionAntPer: Subscription = new Subscription();
  suscripcionAntFam: Subscription = new Subscription();
  suscripcionRevOrgSis: Subscription = new Subscription();
  suscripcionSigVit: Subscription = new Subscription();
  suscripcionExaFis: Subscription = new Subscription();
  suscripcionDiag: Subscription = new Subscription();
  suscripcionPlanTra: Subscription = new Subscription();

  consultaExterna: ConsultaExterna[];
  listConsExterna: ConstExternaListDTO[];
  selectedConExt: ConsultaExterna;

  formCabezera: FormGroup;
  formAntPer: FormGroup;
  formMotConst: FormGroup;
  AntFam: FormGroup;
  enfAct: FormGroup;
  RevActu: FormGroup;
  sigVital: FormGroup;
  exaFisReg: FormGroup;
  diagnostic: FormGroup;
  PresuntivoDef: FormGroup;
  footer: FormGroup;

  ConsultaExternaObj: ConsultaExterna = {
    usuario: {} as Usuario,
  };

  antecPersonalesObj: AntecPersonales = {
    clinicos: null,
    consultaExterna: {} as ConsultaExterna,
    idAntecPersonales: null,
    quirurgicos: null
  };

  antecFamiliaresObj: AntecFamiliares = {
    consultaExterna: {} as ConsultaExterna,
  };

  revOrgSistemObj: RevOrganoSistem = {
    consultaExterna: {} as ConsultaExterna,
  };

  signosVitalesObj: SigVitAntropometria = {
    consultaExterna: {} as ConsultaExterna,
  }

  examFisRegObj: ExamFisicoRegional = {
    consultaExterna: {} as ConsultaExterna,
  }

  diagnosticoObj: Diagnosticos = {
    consultaExterna: {} as ConsultaExterna,
  }

  planTratamientoObj: PlanTratamiento = {
    consultaExterna: {} as ConsultaExterna,
  }

  constructor(private servicePersona: AuthControllerService, private messageService: MessageService,
    private serviceConsExterna: ConsultaExternaControllerService, private serviceAntecPersonales: AntecPersonalesControllerService,
    private sericeAntecFamiliares: AntecFamiliaresControllerService, private serviceRevOrgSistem: RevOrganoSistemControllerService,
    private serviceSignosVitales: SigVitAntropometriaControllerService, private serviceExamFisiReg: ExamFisicoRegionalControllerService,
    private serviceDiagnostico: DiagnosticoControllerService, private servicePlanTratamiento: PlanTratamientoControllerService,
    private formBuilder: FormBuilder, private cdref: ChangeDetectorRef, private confirmationService: ConfirmationService,
    private serviceGenPdf: FacturaService) {

  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  clear(table: Table) {
    table.clear();
  }

  updateSi: boolean = false;
  onRowSelect(event) {
    this.messageService.add({ severity: 'info', summary: 'CONSULTA EXTERNA SELECCIONADO: ', detail: event.data.nombres });
    this.cargarConsultaExterna(event.data.id_consexterna);
    this.updateSi = true;
  }

  openNew() {
    this.submitted = false;
    this.listConsExteDialog = true;
  }

  hideDialog() {
    this.listConsExteDialog = false;
    this.submitted = false;
  }

  ngOnInit(): void {
   // this.ConsultaExternaByHistoriaClinica();
    this.formCabezera = this.formBuilder.group({
      nombresApellidos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      sexo: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(10), Validators.pattern('[0-9]*')]],
      histCli: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
      est: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z .]*')]],
    });

    this.formMotConst = this.formBuilder.group({
      motCon: ['', [Validators.required]],
    });

    this.formAntPer = this.formBuilder.group({
      clinico: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500), Validators.pattern('[a-zA-ZÑ0-9 :,-]*')]],
      quirurgico: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500), Validators.pattern('[a-zA-ZÑ0-9 :,-]*')]],
    });

    this.AntFam = this.formBuilder.group({
      desFam: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
    });

    this.enfAct = this.formBuilder.group({
      enfActual: ['', [Validators.required]],
    });

    this.RevActu = this.formBuilder.group({
      orgSent: ['', [Validators.required]],
      carVas: ['', [Validators.required]],
      hemLinf: ['', [Validators.required]],
      musEsq: ['', [Validators.required]],
      genital: ['', [Validators.required]],
      resp: ['', [Validators.required]],
      dig: ['', [Validators.required]],
      urinario: ['', [Validators.required]],
      endocrino: ['', [Validators.required]],
      nervioso: ['', [Validators.required]],
      descripcion: ['',[Validators.required, Validators.maxLength(500)]]
    });

    this.sigVital = this.formBuilder.group({
      peso: ['', [Validators.required]],
      talla: ['', [Validators.required]],
      freResp: ['', [Validators.required]],
      pulso: ['', [Validators.required]],
      preArt: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern('[0-9 /]*')]],
      temp: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });

    this.exaFisReg = this.formBuilder.group({
      cabeza: ['', [Validators.required]],
      cuello: ['', [Validators.required]],
      torax: ['', [Validators.required]],
      abdomen: ['', [Validators.required]],
      extremidades: ['', [Validators.required]],
      pelvis: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    });

    this.diagnostic = this.formBuilder.group({
      descDiag: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      cie: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      preDef: ['', [Validators.required]],
    });

    this.PresuntivoDef = this.formBuilder.group({
      DescPreDef: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      DescPreDefCie: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      DescPreDefPreDef: ['', [Validators.required]],
    });

    this.footer = this.formBuilder.group({
      fecHora: ['', [Validators.required]],
      nomProf: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      DuracionConsult: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('[a-zA-ZÑ0-9 ,:-]*')]],
    });

  }

  validacionAlfanumerica(event) {
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

  convertiTextoAMayuscula(texto) {
    return texto.toUpperCase();
  }

  mensajesError(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error: ' + msg,
    });
  }

  mensajeSatisfactorio(msg: String) {
    this.messageService.add({
      severity: 'success',
      summary: 'Resultado',
      detail: 'Correcto!: ' + msg,
    });
  }

  confirmacion(idConsExterno: number) {
    this.confirmationService.confirm({
      message: 'ELIMINAR ESTE REGISTRO?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.serviceConsExterna.updateEstadoConsultaExternaUsingPUT(idConsExterno).subscribe(data => {
          if (data) {
            this.listarConsultaExterna();
            this.messageService.add({ severity: 'info', summary: 'ELIMINADO!!', detail: 'REGISTRO ELIMINADO' });
          } else {
            this.mensajesError('Error al Eliminar el Registro');
          }
        }, error => {
          this.mensajesError("ERROR AL ELIMINAR EL REGISTRO EN EL SERVIDOR");
        });
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

  buscarPersonaByIdentificacion() {
    this.servicePersona.getPersonaByIdentificacionUsingGET(this.persona.identificacion).subscribe(data => {
      if (data.object != null) {
        this.persona.nombresApellidos = data.object.nombres;
        this.persona.sexo = data.object.sexo;
        this.ConsultaExternaObj.usuario.id = data.object.id;
        if (this.persona.sexo == "Femenino") {
          this.ngSelect = "Femenino";
        } else if (this.persona.sexo == "Masculino") {
          this.ngSelect = "Masculino";
        }
      } else {
        this.persona.nombresApellidos = "";
        this.persona.sexo = "";
        this.mensajesError('NO SE ENCONTRÓ LA PERSONA');
      }
      this.limpiarBuscar();
     // this.ConsultaExternaByHistoriaClinica();
    })
  }

 /* ConsultaExternaByHistoriaClinica() {
    this.serviceConsExterna.getMaxHistoriaClinicaUsingGET().subscribe(data => {
      if (data) {
        this.ConsultaExternaObj.historiaClinica = data.object;
      } else {
        this.mensajesError("Ocurrió un error al obtener el numero de Historia Clínica");
      }
    }, error => {
      this.mensajesError("OCURRIÓ UN ERROR AL OBTENER EL NUMERO DE HISTORIA CLINICA EN EL SERVIDOR");
    });
  }*/

  consExtGPF = 0;
  crearConsultaExterna() {
    this.submitted = true;
    if (this.formCabezera.valid && this.formAntPer.valid && this.formMotConst.valid && this.AntFam.valid && this.enfAct.valid && this.RevActu.valid
      && this.sigVital.valid && this.exaFisReg.valid && this.diagnostic.valid && this.footer.valid && this.PresuntivoDef.valid) {
      this.ConsultaExternaObj.establecimiento = this.establecimiento.toUpperCase();
      this.ConsultaExternaObj.estado = "a";
      this.serviceConsExterna.comprobarHistoriaClinicaUsingGET(this.ConsultaExternaObj.historiaClinica).subscribe(data => {
        if (data.object == 0) {
          this.suscripcionConExt = this.serviceConsExterna.saveConsultaExternaUsingPOST(this.ConsultaExternaObj).subscribe(data => {
            if (data.object != null) {
              this.antecPersonalesObj.consultaExterna.idConsexterna = +data.object;
              this.antecFamiliaresObj.consultaExterna.idConsexterna = +data.object;
              this.revOrgSistemObj.consultaExterna.idConsexterna = +data.object;
              this.signosVitalesObj.consultaExterna.idConsexterna = +data.object;
              this.examFisRegObj.consultaExterna.idConsexterna = +data.object;
              this.diagnosticoObj.consultaExterna.idConsexterna = +data.object;
              this.planTratamientoObj.consultaExterna.idConsexterna = +data.object;
              this.consExtGPF = +data.object;
              this.crearAntecedentesPersonales();
              this.crearAntecedentesFamiliares();
              this.crearRevisionOrganosSistemas();
              this.crearSignosVitales();
              this.crearExamenFisico();
              this.crearDiagnostico();
              this.crearPlanTratamiento();
              this.mensajeSatisfactorio(data.message);

             // this.ConsultaExternaByHistoriaClinica();
            } else {
              this.mensajesError("OCURRIÓ UN ERROR AL CREAR LA CONSULTA EXTERNA");
            }
          }, error => {
            this.mensajesError("ERROR AL GUARDAR LA CONSULTA EXTERNA EN EL SERVIDOR");
            return
          });
        } else if (data.object >= 1) {
          this.mensajesError("Ya existe una historia clinica con este numero, edite manualmente el siguiente numero");
        }
      }, error => {
        this.mensajesError("ERROR AL COMPROBAR LA HISTORIA CLINICA");
        return
      });
    } else {
      this.mensajesError("LLENE TODOS LOS CAMPOS REQUERIDOS");
    }
  }

  listarConsultaExterna(event?: LazyLoadEvent): void {
    this.loadTabCE = true;
    setTimeout(() => {
      this.serviceConsExterna.getConsultaExternaUsingGET().subscribe(data => {
        if (data) {
          this.listConsExterna = data.object;
          this.loading = false;
        }
      });
    }, 1000);
  }

  crearAntecedentesPersonales() {
    this.suscripcionAntPer = this.serviceAntecPersonales.saveAntecPersonalesUsingPOST(this.antecPersonalesObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
      } else {
        this.mensajesError("Error al intententar guardar");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR LOS ANTECEDENTES PERSONALES EN EL SERVIDOR");
    });
  }

  crearAntecedentesFamiliares() {
    this.suscripcionAntFam = this.sericeAntecFamiliares.saveAntecFamiliaresUsingPOST(this.antecFamiliaresObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
      } else {
        this.mensajesError("Error al intententar guardar antecedentes familiares");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR LOS ANTECEDENTES FAMILIARES EN EL SERVIDOR");
    });
  }

  crearRevisionOrganosSistemas() {
    this.suscripcionRevOrgSis = this.serviceRevOrgSistem.saveRevOrganoSistemUsingPOST(this.revOrgSistemObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
      } else {
        this.mensajesError("Error al intententar guardar revision organos sistemas");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR LA REVISION DE ORGANOS SISTEMAS EN EL SERVIDOR");
    });
  }

  crearSignosVitales() {
    this.suscripcionSigVit = this.serviceSignosVitales.saveSigVitAntropometriaUsingPOST(this.signosVitalesObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
      } else {
        this.mensajesError("Error al intententar guardar signos vitales");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR LOS SIGNOS VITALES EN EL SERVIDOR");
    });
  }

  crearExamenFisico() {
    this.suscripcionExaFis = this.serviceExamFisiReg.saveExamFisicoRegionalUsingPOST(this.examFisRegObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
      } else {
        this.mensajesError("Error al intententar guardar examen físico regional");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR EL EXAMEN FISICO REGIONAL EN EL SERVIDOR");
    });
  }

  crearDiagnostico() {
    this.suscripcionDiag = this.serviceDiagnostico.saveDiagnosticoUsingPOST(this.diagnosticoObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
      } else {
        this.mensajesError("Error al intententar guardar diagnostico");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR EL DIAGNOSTICO EN EL SERVIDOR");
    });
  }

  crearPlanTratamiento() {
    this.suscripcionPlanTra = this.servicePlanTratamiento.savePlanTratamientoUsingPOST(this.planTratamientoObj).subscribe(data => {
      if (data.object != null) {
        this.mensajeSatisfactorio(data.message);
        this.imprimirPDF(this.consExtGPF);
        //this.limpiarAll();
        this.resetExcept();
      } else {
        this.mensajesError("Error al intententar guardar plan de tratamiento");
      }
    }, error => {
      this.mensajesError("ERROR AL GUARDAR EL PLAN DE TRATAMIENTO EN EL SERVIDOR");
    });
  }

  resetExcept() {
    this.formCabezera.reset({
      histCli: this.formCabezera.get('histCli').value
    });
    this.formAntPer.reset();
    this.formMotConst.reset();
    this.AntFam.reset();
    this.enfAct.reset();
    this.RevActu.reset();
    this.sigVital.reset();
    this.exaFisReg.reset();
    this.diagnostic.reset();
    this.PresuntivoDef.reset();
    this.footer.reset();
  }

  cargarConsultaExterna(idConsultaExterna: number) {
    this.suscripcionCargarDatos = this.serviceConsExterna.getConsultaExternaByIdUsingGET(idConsultaExterna).subscribe(data => {
      if (data.object) {
        this.establecimiento = data.object.establecimiento;
        this.persona.identificacion = data.object.identificacion;
        this.persona.nombresApellidos = data.object.nombres;
        this.persona.sexo = data.object.sexo;
        this.ConsultaExternaObj.idConsexterna = data.object.idConsexterna;
        this.ConsultaExternaObj.historiaClinica = data.object.historiaClinica;
        this.ConsultaExternaObj.enfermedadActual = data.object.enfermedadActual;
        this.ConsultaExternaObj.motivoConsulta = data.object.motivoConsulta;
        this.ConsultaExternaObj.fecha = new Date(data.object.fecha);
        this.ConsultaExternaObj.nombresProfesional = data.object.nombresProfesional;
        this.ConsultaExternaObj.duracionConsulta = data.object.duracionConsulta;
        this.antecPersonalesObj.clinicos = data.object.clinicos;
        this.antecPersonalesObj.quirurgicos = data.object.quirurgicos;
        this.antecFamiliaresObj.cardiopatia = data.object.cardiopatia;
        this.antecFamiliaresObj.diabetes = data.object.diabetes;
        this.antecFamiliaresObj.enfCardiovasculares = data.object.enfCardiovasculares;
        this.antecFamiliaresObj.hipertension = data.object.hipertension;
        this.antecFamiliaresObj.cancer = data.object.cancer;
        this.antecFamiliaresObj.tuberculosis = data.object.tuberculosis;
        this.antecFamiliaresObj.enfInfecciosas = data.object.enfInfecciosas;
        this.antecFamiliaresObj.enfMentales = data.object.enfMentales;
        this.antecFamiliaresObj.malformaciones = data.object.malformaciones;
        this.antecFamiliaresObj.otros = data.object.otros;
        this.antecFamiliaresObj.familiares = data.object.familiares;
        this.revOrgSistemObj.organoSentido = data.object.organoSentido;
        this.revOrgSistemObj.cardiovascular = data.object.cardiovascular;
        this.revOrgSistemObj.hemoLenfatico = data.object.hemolenfatico;
        this.revOrgSistemObj.musculoEsqueletico = data.object.musculoEsqueletico;
        this.revOrgSistemObj.genital = data.object.genital;
        this.revOrgSistemObj.respiratorio = data.object.respiratorio;
        this.revOrgSistemObj.digestivo = data.object.digestivo;
        this.revOrgSistemObj.urinario = data.object.urinario;
        this.revOrgSistemObj.endocrino = data.object.endocrino;
        this.revOrgSistemObj.nervioso = data.object.nervioso;
        this.revOrgSistemObj.descripcion = data.object.descripcion;
        this.signosVitalesObj.fechaMedicion = new Date(data.object.fechaMedicion);
        this.signosVitalesObj.temperatura = data.object.temperatura;
        this.signosVitalesObj.presionArterial = data.object.presionArterial;
        this.signosVitalesObj.pulso = data.object.pulso;
        this.signosVitalesObj.frecRespiratoria = data.object.frecRespiratoria;
        this.signosVitalesObj.peso = data.object.peso;
        this.signosVitalesObj.talla = data.object.talla;
        this.examFisRegObj.cabeza = data.object.cabeza;
        this.examFisRegObj.cuello = data.object.cuello;
        this.examFisRegObj.torax = data.object.torax;
        this.examFisRegObj.abdomen = data.object.abdomen;
        this.examFisRegObj.pelvis = data.object.pelvis;
        this.examFisRegObj.extremidades = data.object.extremidades;
        this.examFisRegObj.observaciones = data.object.observaciones;
        this.diagnosticoObj.descripcionDiagnostico = data.object.descripcionDiagnostico;
        this.diagnosticoObj.cie = data.object.cie;
        this.diagnosticoObj.preDef = data.object.preDef;
        this.diagnosticoObj.descripcionPreDef = data.object.descripcionPreDef;
        this.diagnosticoObj.descripcionPreDefCie = data.object.descripcionPreDefCie;
        this.diagnosticoObj.descripcionPreDefPreDef = data.object.descripcionPreDefPreDef;
        this.planTratamientoObj.m = data.object.m;
        this.planTratamientoObj.i = data.object.i;
        this.planTratamientoObj.l = data.object.l;
        this.planTratamientoObj.r = data.object.r;
        this.planTratamientoObj.c = data.object.c;
        this.planTratamientoObj.t = data.object.t;
        this.planTratamientoObj.o = data.object.o;
      } else {
        this.mensajesError("NO SE ENCONTRARON DATOS");
      }
    }, error => {
      this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
    });

  }

  ngOnDestroy(): void {
    this.suscripcionCargarDatos.unsubscribe();
    this.suscripcionAntFam.unsubscribe();
    this.suscripcionAntPer.unsubscribe();
    this.suscripcionConExt.unsubscribe();
    this.suscripcionDiag.unsubscribe();
    this.suscripcionExaFis.unsubscribe();
    this.suscripcionPlanTra.unsubscribe();
    this.suscripcionRevOrgSis.unsubscribe();
    this.suscripcionSigVit.unsubscribe();
  }

  updateConsultaExterna() {
    this.serviceConsExterna.updateConsultaExternaUsingPUT(this.ConsultaExternaObj.enfermedadActual, this.ConsultaExternaObj.fecha,
      this.ConsultaExternaObj.duracionConsulta, this.establecimiento, this.ConsultaExternaObj.idConsexterna,
      this.ConsultaExternaObj.motivoConsulta, this.ConsultaExternaObj.nombresProfesional).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("DATOS ACTUALIZADOS");
          this.updateAntecedentesPersonales();
          this.updateAntecedentesFamiliares();
          this.updateRevisionOrnganosSistemas();
          this.updatesSignosVitales();
          this.updatesExamenFisico();
          this.updateDiagnostico();
          this.updateTratamiento();
        } else {
          this.mensajesError("NO SE PUDIERON ACTUALIZAR LOS DATOS");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
      }
      );
  }

  updateAntecedentesPersonales() {
    this.serviceConsExterna.updateAntecedentesPersonalesUsingPUT(this.antecPersonalesObj.clinicos, this.ConsultaExternaObj.idConsexterna, this.antecPersonalesObj.quirurgicos).subscribe(data => {
      if (data) {
        this.mensajeSatisfactorio("ACTUALIZADOS ANTECEDENTES PERSONALES");
      } else {
        this.mensajesError("NO SE PUDO ACTUALIZAR ANTECEDENTES PERSONALES");
      }
    }, error => {
      this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
    });
  }

  updateAntecedentesFamiliares() {
    this.serviceConsExterna.updateAntecedentesFamiliaresUsingPUT(this.antecFamiliaresObj.cancer, this.antecFamiliaresObj.cardiopatia,
      this.antecFamiliaresObj.diabetes, this.antecFamiliaresObj.enfCardiovasculares, this.antecFamiliaresObj.enfInfecciosas,
      this.antecFamiliaresObj.enfMentales, this.antecFamiliaresObj.familiares, this.antecFamiliaresObj.hipertension, this.ConsultaExternaObj.idConsexterna,
      this.antecFamiliaresObj.malformaciones, this.antecFamiliaresObj.otros, this.antecFamiliaresObj.tuberculosis).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("ACTUALIZADOS ANTECEDENTES FAMILIARES");
        } else {
          this.mensajesError("NO SE PUDO ACTUALIZAR ANTECEDENTES FAMILIARES");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
      });
  }

  updateRevisionOrnganosSistemas() {
    this.serviceConsExterna.updateRevisionOrganosSentidoUsingPUT(this.revOrgSistemObj.cardiovascular, this.revOrgSistemObj.descripcion,
      this.revOrgSistemObj.digestivo, this.revOrgSistemObj.endocrino, this.revOrgSistemObj.genital,
      this.revOrgSistemObj.hemoLenfatico, this.ConsultaExternaObj.idConsexterna, this.revOrgSistemObj.musculoEsqueletico,
      this.revOrgSistemObj.nervioso, this.revOrgSistemObj.organoSentido, this.revOrgSistemObj.respiratorio,
      this.revOrgSistemObj.urinario).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("ACTUALIZADO REVISION DE ORGANOS Y SISTEMAS");
        } else {
          this.mensajesError("NO SE PUDO ACTUALIZAR REVISION ORGANOS SISTEMAS");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
      });
  }

  updatesSignosVitales() {
    this.serviceConsExterna.updateSignosVitalesUsingPUT(this.signosVitalesObj.fechaMedicion, this.signosVitalesObj.frecRespiratoria,
      this.ConsultaExternaObj.idConsexterna, this.signosVitalesObj.peso, this.signosVitalesObj.presionArterial,
      this.signosVitalesObj.pulso, this.signosVitalesObj.talla, this.signosVitalesObj.temperatura).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("ACTUALIZADO SIGNOS VITALES");
        } else {
          this.mensajesError("NO SE PUDO ACTUALIZAR SIGNOS VITALES");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
      });
  }

  updatesExamenFisico() {
    this.serviceConsExterna.updateExamenFisicoRegionalUsingPUT(this.examFisRegObj.abdomen, this.examFisRegObj.cabeza,
      this.examFisRegObj.cuello, this.examFisRegObj.extremidades, this.ConsultaExternaObj.idConsexterna,
      this.examFisRegObj.observaciones, this.examFisRegObj.pelvis, this.examFisRegObj.torax).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("ACTUALIZADO EXAMEN FISICO REGIONAL");
        } else {
          this.mensajesError("NO SE PUDO ACTUALIZAR EXAMEN FISICO");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
      });
  }

  updateDiagnostico() {
    this.serviceConsExterna.updateDiagnosticoUsingPUT(this.diagnosticoObj.cie, this.diagnosticoObj.descripcionDiagnostico,
      this.diagnosticoObj.descripcionPreDef, this.diagnosticoObj.descripcionPreDefCie,
      this.diagnosticoObj.descripcionPreDefPreDef, this.ConsultaExternaObj.idConsexterna,
      this.diagnosticoObj.preDef).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("ACTUALIZADO DIAGNOSTICO");
        } else {
          this.mensajesError("NO SE PUDO ACTUALIZAR DIAGNOSTICO");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
      });
  }

  updateTratamiento() {
    this.serviceConsExterna.updateTratamientoUsingPUT(this.planTratamientoObj.c, this.planTratamientoObj.i,
      this.ConsultaExternaObj.idConsexterna, this.planTratamientoObj.l, this.planTratamientoObj.m,
      this.planTratamientoObj.o, this.planTratamientoObj.r, this.planTratamientoObj.t).subscribe(data => {
        if (data) {
          this.mensajeSatisfactorio("ACTUALIZADO PLAN DE TRATAMIENTO");
        } else {
          this.mensajesError("NO SE PUDO ACTUALIZAR TRATAMIENTO");
        }
      }, error => {
        this.mensajesError("ERROR EN LA PETICION DEL SERVIDOR");
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
    if (this.ConsultaExternaObj.fecha != null) {
      let fech = this.ConsultaExternaObj.fecha;
      let nomPer = this.persona.nombresApellidos;
      let hitCli = this.ConsultaExternaObj.historiaClinica;

      let fecha = fech.getDate() + "/" + (fech.getMonth() + 1) + "/" + fech.getFullYear();
      let hora = fech.getHours() + ":" + fech.getMinutes() + ":" + fech.getSeconds();
      var link = document.createElement('a');
      link.href = url;
      link.download = 'CONSULTAEXTERNA_' + nomPer + '-' + (hitCli - 1) + '-' + fecha + '-h' + hora + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    } else {
      let nomPer = this.persona.nombresApellidos;
      let hitCli = this.persona.histCli;
      var link = document.createElement('a');
      link.href = url;
      link.download = 'CONSULTAEXTERNA_' + (hitCli) + '-' + nomPer + '-' + numAlea + '.pdf';
      link.click();
      window.open(url);
    }

  }

  imprimirPDF(idConsExterno: number) {
    this.serviceGenPdf.genePdfConsultaExterna(idConsExterno).subscribe(data => {
      if (data) {
        this.descargarPdf(data);
        this.limpiarAll();
      } else {
        this.mensajesError("No PDF document found");
      }
    }, err => {
      this.mensajesError("ERROR AL GENERAR PDF");
    });
  }

  imprimirPDFSinceButton(idConsExterno: number) {
    this.serviceGenPdf.genePdfConsultaExterna(idConsExterno).subscribe(data => {
      if (data) {
        this.cargarConsultaExterna(idConsExterno);
        this.descargarPdf(data);
        this.limpiarAll();
      } else {
        this.mensajesError("No PDF document found");
      }
    }, err => {
      this.mensajesError("ERROR AL GENERAR PDF");
    });
  }

  limpiarAll() {
    this.establecimiento = null,
      this.persona.identificacion = null,
      this.persona.nombresApellidos = null,
      this.persona.sexo = null,
      this.ConsultaExternaObj.idConsexterna = null,
      this.ConsultaExternaObj.historiaClinica = null,
      this.ConsultaExternaObj.enfermedadActual = null,
      this.ConsultaExternaObj.motivoConsulta = null,
      this.ConsultaExternaObj.fecha = null,
      this.ConsultaExternaObj.nombresProfesional = null,
      this.ConsultaExternaObj.duracionConsulta = null,
      this.antecPersonalesObj.clinicos = null,
      this.antecPersonalesObj.quirurgicos = null,
      this.antecFamiliaresObj.cardiopatia = null,
      this.antecFamiliaresObj.diabetes = null,
      this.antecFamiliaresObj.enfCardiovasculares = null,
      this.antecFamiliaresObj.hipertension = null,
      this.antecFamiliaresObj.cancer = null,
      this.antecFamiliaresObj.tuberculosis = null,
      this.antecFamiliaresObj.enfInfecciosas = null,
      this.antecFamiliaresObj.enfMentales = null,
      this.antecFamiliaresObj.malformaciones = null,
      this.antecFamiliaresObj.otros = null,
      this.antecFamiliaresObj.familiares = null,
      this.revOrgSistemObj.organoSentido = null,
      this.revOrgSistemObj.cardiovascular = null,
      this.revOrgSistemObj.hemoLenfatico = null,
      this.revOrgSistemObj.musculoEsqueletico = null,
      this.revOrgSistemObj.genital = null,
      this.revOrgSistemObj.respiratorio = null,
      this.revOrgSistemObj.digestivo = null,
      this.revOrgSistemObj.urinario = null,
      this.revOrgSistemObj.endocrino = null,
      this.revOrgSistemObj.nervioso = null,
      this.revOrgSistemObj.descripcion = null,
      this.signosVitalesObj.fechaMedicion = null,
      this.signosVitalesObj.temperatura = null,
      this.signosVitalesObj.presionArterial = null,
      this.signosVitalesObj.pulso = null,
      this.signosVitalesObj.frecRespiratoria = null,
      this.signosVitalesObj.peso = null,
      this.signosVitalesObj.talla = null,
      this.examFisRegObj.cabeza = null,
      this.examFisRegObj.cuello = null,
      this.examFisRegObj.torax = null,
      this.examFisRegObj.abdomen = null,
      this.examFisRegObj.pelvis = null,
      this.examFisRegObj.extremidades = null,
      this.examFisRegObj.observaciones = null,
      this.diagnosticoObj.descripcionDiagnostico = null,
      this.diagnosticoObj.cie = null,
      this.diagnosticoObj.preDef = null,
      this.diagnosticoObj.descripcionPreDef = null,
      this.diagnosticoObj.descripcionPreDefCie = null,
      this.diagnosticoObj.descripcionPreDefPreDef = null,
      this.planTratamientoObj.m = null,
      this.planTratamientoObj.i = null,
      this.planTratamientoObj.l = null,
      this.planTratamientoObj.r = null,
      this.planTratamientoObj.c = null,
      this.planTratamientoObj.t = null,
      this.planTratamientoObj.o = null
      this.resetExcept();
   // this.ConsultaExternaByHistoriaClinica();
    this.submitted = false;
    this.updateSi = false;
    this.ngOnDestroy();
  }

  limpiarBuscar() {
    this.ConsultaExternaObj.idConsexterna = null,
      //this.ConsultaExternaObj.historiaClinica = null,
      this.ConsultaExternaObj.enfermedadActual = null,
      this.ConsultaExternaObj.motivoConsulta = null,
      this.ConsultaExternaObj.fecha = null,
      this.ConsultaExternaObj.nombresProfesional = null,
      this.ConsultaExternaObj.duracionConsulta = null,
      this.antecPersonalesObj.clinicos = null,
      this.antecPersonalesObj.quirurgicos = null,
      this.antecFamiliaresObj.cardiopatia = null,
      this.antecFamiliaresObj.diabetes = null,
      this.antecFamiliaresObj.enfCardiovasculares = null,
      this.antecFamiliaresObj.hipertension = null,
      this.antecFamiliaresObj.cancer = null,
      this.antecFamiliaresObj.tuberculosis = null,
      this.antecFamiliaresObj.enfInfecciosas = null,
      this.antecFamiliaresObj.enfMentales = null,
      this.antecFamiliaresObj.malformaciones = null,
      this.antecFamiliaresObj.otros = null,
      this.antecFamiliaresObj.familiares = null,
      this.revOrgSistemObj.organoSentido = null,
      this.revOrgSistemObj.cardiovascular = null,
      this.revOrgSistemObj.hemoLenfatico = null,
      this.revOrgSistemObj.musculoEsqueletico = null,
      this.revOrgSistemObj.genital = null,
      this.revOrgSistemObj.respiratorio = null,
      this.revOrgSistemObj.digestivo = null,
      this.revOrgSistemObj.urinario = null,
      this.revOrgSistemObj.endocrino = null,
      this.revOrgSistemObj.nervioso = null,
      this.revOrgSistemObj.descripcion = null,
      this.signosVitalesObj.fechaMedicion = null,
      this.signosVitalesObj.temperatura = null,
      this.signosVitalesObj.presionArterial = null,
      this.signosVitalesObj.pulso = null,
      this.signosVitalesObj.frecRespiratoria = null,
      this.signosVitalesObj.peso = null,
      this.signosVitalesObj.talla = null,
      this.examFisRegObj.cabeza = null,
      this.examFisRegObj.cuello = null,
      this.examFisRegObj.torax = null,
      this.examFisRegObj.abdomen = null,
      this.examFisRegObj.pelvis = null,
      this.examFisRegObj.extremidades = null,
      this.examFisRegObj.observaciones = null,
      this.diagnosticoObj.descripcionDiagnostico = null,
      this.diagnosticoObj.cie = null,
      this.diagnosticoObj.preDef = null,
      this.diagnosticoObj.descripcionPreDef = null,
      this.diagnosticoObj.descripcionPreDefCie = null,
      this.diagnosticoObj.descripcionPreDefPreDef = null,
      this.planTratamientoObj.m = null,
      this.planTratamientoObj.i = null,
      this.planTratamientoObj.l = null,
      this.planTratamientoObj.r = null,
      this.planTratamientoObj.c = null,
      this.planTratamientoObj.t = null,
      this.planTratamientoObj.o = null,
      this.updateSi = false;
  }
}
