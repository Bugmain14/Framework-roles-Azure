import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AzureApiService } from '../services/azure-api.service'; // ← Descomentar cuando esté disponible el backend

@Component({
  selector: 'app-create-assigment',
  templateUrl: './create-assigment.component.html',
  styleUrls: ['./create-assigment.component.css']
})
export class CreateAssigmentComponent implements OnInit {
  assignmentForm!: FormGroup;
  isTemporalAssignment = false;

  // Cambiar true a false cuando se use backend
  readonly isMock = true;

  // Opciones para el dropdown de scope
  scopeOptions: { value: string; label: string }[] = [];

  // Opciones para el dropdown de entidad
  entityOptions: { value: string; label: string }[] = [];

  // constructor(private fb: FormBuilder, private azureApiService: AzureApiService) {} // Descomentar cuando se use backend
  constructor(private fb: FormBuilder) {} // borrar o comentar cuando se pase a un entorno real
  
  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      scope: ['', Validators.required],
      scopeId: ['', Validators.required],
      roleName: ['', Validators.required],
      entity: ['', Validators.required],
      entityIdentifier: ['', Validators.required],
      temporalAssignment: [false],
      expirationDate: ['', Validators.required],
      expirationTime: ['', Validators.required],
      justification: ['', Validators.required]
    });

    this.loadOptions();
  }

  loadOptions(): void {
    if (this.isMock) {
      // Simulación de Scope, eliminar o comentar cuando se use el backend
      const mockScopes = ['ManagementGroup', 'Subscription', 'ResourceGroup'];
      this.scopeOptions = mockScopes.map(scope => ({
        label: scope,
        value: scope
      }));

      // Mock: opciones de entidad
      const mockEntities = ['ServicePrincipal', 'User', 'Group'];
      this.entityOptions = mockEntities.map(entity => ({
        label: entity,
        value: entity
      }));
      //aqui termina la simulacion del scope

    } else {
      
      // Llamada real a backend que se conecta con Azure <---descomentar y adaptar
      const tokenReal = 'TOKEN_REAL'; // Aquí iría tu token válido

      // Ejemplo de API: 
      // this.azureApiService.getScopes(tokenReal).subscribe({
      //   next: (res) => {
      //     this.scopeOptions = res.value.map((scope: any) => ({
      //       label: scope.displayName || scope.name,
      //       value: scope.id
      //     }));
      //   },
      //   error: (err) => {
      //     console.error('Error al cargar scopes:', err);
      //   }
      // });

      // this.azureApiService.getEntities(tokenReal).subscribe({
      //   next: (res) => {
      //     this.entityOptions = res.value.map((entity: any) => ({
      //       label: entity.displayName || entity.name,
      //       value: entity.id
      //     }));
      //   },
      //   error: (err) => {
      //     console.error('Error al cargar entidades:', err);
      //   }
      // });
    }
  }

  onSubmit(): void {
    if (this.assignmentForm.valid) {
      console.log('Formulario enviado:', this.assignmentForm.value);
      // Aquí puedes hacer lo que necesites (llamar API, etc)
    } else {
      console.log('Formulario inválido');
    }
  }
}
