import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { AzureApiService } from '../services/azure-api.service'; // ← Descomentar cuando esté disponible el backend

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  updateForm!: FormGroup;

  // Cambiar true a false cuando se use backend
  readonly isMock = true;

  scopeOptions: { label: string; value: string }[] = [];

  // Placeholder para el campo JSON
  jsonPlaceholder: string = this.generateJsonPlaceholder('');

  // constructor(private fb: FormBuilder, private azureApiService: AzureApiService) {} // Descomentar cuando se use backend
  constructor(private fb: FormBuilder) {} // borrar o comentar cuando se pase a un entorno real

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      scope: ['', Validators.required],
      jsonDefinition: ['', [Validators.required, this.jsonValidator.bind(this)]]
    });

    this.loadScopes();
        this.loadScopes();

    // Actualiza el placeholder cuando cambia el scope seleccionado
    this.updateForm.get('scope')?.valueChanges.subscribe((selectedScope: string) => {
      this.jsonPlaceholder = this.generateJsonPlaceholder(selectedScope);
    });
  }

  loadScopes(): void {
    if (this.isMock) {
      // Simulación de Scope, eliminar o comentar cuando se use el backend
      const scopes = ['ManagementGroup', 'Subscription', 'ResourceGroup'];
      this.scopeOptions = scopes.map(s => ({ label: s, value: s }));
      //aqui termina la simulacion del scope

    } else {

      // Llamada real a backend que se conecta con Azure <---descomentar y adaptar
      const tokenReal = 'TOKEN_REAL'; // Aquí iría tu token válido

      // Ejemplo de carga desde backend con Azure
      // this.azureApiService.getScopes(token).subscribe({
      //   next: (res) => {
      //     this.scopeOptions = res.value.map((s: any) => ({
      //       label: s.displayName || s.name,
      //       value: s.id
      //     }));
      //   },
      //   error: (err) => {
      //     console.error('Error cargando scopes desde Azure:', err);
      //   }
      // });
    }
  }

    generateJsonPlaceholder(scope: string): string {
    return `{
  "name": "${scope}",
  "type": "Microsoft.Authorization/roleDefinitions",
  "properties": {
    "roleName": "Ejemplo",
    "permissions": [],
    "assignableScopes": ["${scope}"]
  }
}`;
  }

  jsonValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || value.trim() === '') return null;

    try {
      const obj = JSON.parse(value);
      const selectedScope = this.updateForm?.get('scope')?.value;

      const requiredKeys = ['name', 'type', 'properties'];
      const missingKeys = requiredKeys.filter(key => !(key in obj));

      const innerMissing: string[] = [];
      if ('properties' in obj) {
        const props = obj.properties;
        ['roleName', 'permissions', 'assignableScopes'].forEach(key => {
          if (!(key in props)) {
            innerMissing.push(`properties.${key}`);
          } else if (key === 'assignableScopes' && !Array.isArray(props.assignableScopes)) {
            innerMissing.push(`properties.assignableScopes (debe ser un array)`);
          } else if (key === 'permissions' && !Array.isArray(props.permissions)) {
            innerMissing.push(`properties.permissions (debe ser un array)`);
          }
        });
      }

      if (obj.name !== selectedScope) {
        return { nameScopeMismatch: true };
      }

      if (
        obj.properties &&
        Array.isArray(obj.properties.assignableScopes) &&
        !obj.properties.assignableScopes.includes(selectedScope)
      ) {
        return { assignableScopeMismatch: true };
      }

      if (missingKeys.length || innerMissing.length) {
        return { missingKeys: [...missingKeys, ...innerMissing] };
      }

      return null;
    } catch {
      return { invalidJson: true };
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const parsedJson = JSON.parse(this.updateForm.value.jsonDefinition);
      console.log('✅ JSON para actualización de rol:', parsedJson);
      alert('Formulario válido y listo para enviar al backend.');
    } else {
      alert('❌ El formulario contiene errores de validación.');
    }
  }
}
