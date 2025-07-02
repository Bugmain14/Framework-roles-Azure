import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { AzureApiService } from '../services/azure-api.service'; // ← Descomentar cuando esté disponible el backend

@Component({
  selector: 'app-custom-role',
  templateUrl: './custom-role.component.html',
  styleUrls: ['./custom-role.component.css']
})
export class CustomRoleComponent implements OnInit {
  roleForm!: FormGroup;

  // Cambiar true a false cuando se use backend
  readonly isMock = true;

  // Cambiado: array de objetos con label y value
  visibleScopes: { label: string; value: string }[] = [];

  // Placeholder dinámico para el JSON
  jsonPlaceholder: string = this.generateJsonPlaceholder('');

  // constructor(private fb: FormBuilder, private azureApiService: AzureApiService) {} // Descomentar cuando se use backend
  constructor(private fb: FormBuilder) {} // borrar o comentar cuando se pase a un entorno real

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      scope: ['', Validators.required],
      jsonDefinition: ['', [Validators.required, this.jsonStructureValidator.bind(this)]]
    });

    this.loadScopes();

    // Actualizar placeholder cuando cambia el scope
    this.roleForm.get('scope')?.valueChanges.subscribe((selectedScope: string) => {
      this.jsonPlaceholder = this.generateJsonPlaceholder(selectedScope);
    });
  }

  loadScopes(): void {
    if (this.isMock) {
      // Simulación de Scope, eliminar o comentar cuando se use el backend
      const scopes = [
        '/providers/Microsoft.Management/managementGroups/mock-mg',
        '/providers/Microsoft.Management/managementGroups/finance-group',
        '/providers/Microsoft.Management/managementGroups/tech-group'
      ];
         // Convertir a { label, value }
      this.visibleScopes = scopes.map(scope => ({
        label: scope.split('/').pop() ?? scope,
        value: scope
      }));
      //aqui termina la simulacion del scope

    } else {

      // Llamada real a backend que se conecta con Azure <---descomentar y adaptar
      const tokenReal = 'TOKEN_REAL_O_AUTOGENERADO'; // Aquí iría tu token válido

      // Ejemplo de API: 
      // this.azureApiService.getManagementGroups(tokenReal).subscribe({
      //   next: (res) => {
      //     this.visibleScopes = res.value.map((mg: any) => ({
      //       label: mg.displayName || mg.name, // Lo que verá el usuario
      //       value: mg.id                      // Lo que se usará internamente
      //     }));
      //   },
      //   error: (err) => {
      //     console.error('Error al cargar Management Groups desde Azure:', err);
      //   }
      // })
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

  jsonStructureValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value || value.trim() === '') return null;

    try {
      const obj = JSON.parse(value);

      // Comparar el nombre con el scope seleccionado
      const selectedScope = this.roleForm?.get('scope')?.value;
      if (obj.name !== selectedScope) {
        return { nameScopeMismatch: true };
      }

      // Validar claves requeridas
      const requiredKeys = ['name', 'type', 'properties'];
      const missingKeys = requiredKeys.filter(key => !(key in obj));

      const innerMissing: string[] = [];
      if ('properties' in obj) {
        const inner = obj.properties;
        ['roleName', 'permissions', 'assignableScopes'].forEach(key => {
          if (!(key in inner)) {
            innerMissing.push(`properties.${key}`);
          } else if (key === 'assignableScopes' && !Array.isArray(inner.assignableScopes)) {
            innerMissing.push(`properties.assignableScopes (debe ser un array)`);
          }
        });
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
    if (this.roleForm.valid) {
      const parsed = JSON.parse(this.roleForm.value.jsonDefinition);
      console.log('✅ JSON listo para enviar:', parsed);
      alert('Formulario válido y listo para integración con API.');
    } else {
      alert('❌ El formulario tiene errores de validación.');
    }
  }
}
