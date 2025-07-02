import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AzureApiService } from '../services/azure-api.service'; // ← Descomentar cuando esté disponible el backend

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent implements OnInit {
  deleteForm!: FormGroup;

  // Cambiar true a false cuando se use backend
  readonly isMock = true;

  // Opciones para el dropdown de scope
  scopeOptions: { label: string; value: string }[] = [];

  // constructor(private fb: FormBuilder, private azureApiService: AzureApiService) {} // Descomentar cuando se use backend
  constructor(private fb: FormBuilder) {} // borrar o comentar cuando se pase a un entorno real

  ngOnInit(): void {
    this.deleteForm = this.fb.group({
      scope: ['', Validators.required],
      roleName: ['', Validators.required]
    });

    this.loadScopes();
  }

  loadScopes(): void {
    if (this.isMock) {
      // Simulación de Scope, eliminar o comentar cuando se use el backend
      const scopes = ['ManagementGroup', 'Subscription', 'ResourceGroup'];
      this.scopeOptions = scopes.map(s => ({
        label: 'Scope por definir', // Cambiar luego por s si deseas que se vea el nombre
        value: s
      }));
      //aqui termina la simulacion del scope

    } else {

      // Llamada real a backend que se conecta con Azure <---descomentar y adaptar
      const tokenReal = 'TOKEN_REAL'; // Aquí iría tu token válido

      // Ejemplo de carga desde backend con Azure
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
    }
  }

  onSubmit(): void {
    if (this.deleteForm.valid) {
      console.log('✅ Rol a eliminar:', this.deleteForm.value);
      alert('Formulario válido. Listo para enviar al backend.');
    } else {
      alert('❌ Por favor completa todos los campos obligatorios.');
    }
  }
}
