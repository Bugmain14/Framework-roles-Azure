import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AzureApiService } from '../services/azure-api.service'; // ← Descomentar cuando esté disponible el backend

@Component({
  selector: 'app-delete-rol-assigment',
  templateUrl: './delete-rol-assigment.component.html',
  styleUrls: ['./delete-rol-assigment.component.css']
})
export class DeleteRolAssigmentComponent implements OnInit {
  deleteForm!: FormGroup;


  // Cambiar true a false cuando se use backend
  readonly isMock = true;

  // Dropdown scope
  scopeOptions: { label: string; value: string }[] = [];

  // Dropdown entity
  entityOptions: { label: string; value: string }[] = [];

  // constructor(private fb: FormBuilder, private azureApiService: AzureApiService) {} // Descomentar cuando se use backend
  constructor(private fb: FormBuilder) {} // borrar o comentar cuando se pase a un entorno real

  ngOnInit(): void {
    this.deleteForm = this.fb.group({
      scope: ['', Validators.required],
      scopeId: ['', Validators.required],
      roleName: ['', Validators.required],
      entity: ['', Validators.required],
      entityId: ['', Validators.required]
    });

    this.loadOptions();
  }

  loadOptions(): void {
    if (this.isMock) {
      // Simulación de Scope, eliminar o comentar cuando se use el backend
      const mockScopes = ['ManagementGroup', 'Subscription', 'ResourceGroup'];
      const mockEntities = ['ServicePrincipal', 'User', 'Group'];

      this.scopeOptions = mockScopes.map(s => ({ label: s, value: s }));
      this.entityOptions = mockEntities.map(e => ({ label: e, value: e }));
      //aqui termina la simulacion del scope

    } else {
      
      // Llamada real a backend que se conecta con Azure <---descomentar y adaptar
      const tokenReal = 'TOKEN_REAL'; // Aquí iría tu token válido

      // Ejemplo de API:
      // this.azureApiService.getScopes(token).subscribe({
      //   next: (res) => {
      //     this.scopeOptions = res.value.map((s: any) => ({
      //       label: s.displayName || s.name,
      //       value: s.id
      //     }));
      //   },
      //   error: (err) => console.error('Error cargando scopes:', err)
      // });

      // this.azureApiService.getEntities(token).subscribe({
      //   next: (res) => {
      //     this.entityOptions = res.value.map((e: any) => ({
      //       label: e.displayName || e.name,
      //       value: e.id
      //     }));
      //   },
      //   error: (err) => console.error('Error cargando entidades:', err)
      // });
    }
  }

  onSubmit(): void {
    if (this.deleteForm.valid) {
      console.log('🗑 Rol a eliminar:', this.deleteForm.value);
      // Aquí puedes enviar los datos al backend
    } else {
      console.warn('❌ Formulario inválido');
    }
  }
}
