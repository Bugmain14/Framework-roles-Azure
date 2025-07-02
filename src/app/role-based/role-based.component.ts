import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
// import { AzureApiService } from '../services/azure-api.service'; // ← Descomentar cuando esté disponible el backend

@Component({
  selector: 'app-role-based',
  templateUrl: './role-based.component.html',
  styleUrls: ['./role-based.component.css']
})
export class RoleBasedComponent implements OnInit {
  roleForm!: FormGroup;

  get baseRolesControls(): FormControl[] {
    return (this.roleForm.get('baseRoles') as FormArray).controls as FormControl[];
  }

  // Cambiar true a false cuando se use backend
  readonly isMock = true;

  // Opciones para el dropdown scope
  scopeOptions: { value: string; label: string }[] = [];

  // Opciones para el dropdown de rol base
  baseRoleOptions: { value: string; label: string }[] = [];

  // constructor(private fb: FormBuilder, private azureApiService: AzureApiService) {} // Descomentar cuando se use backend
  constructor(private fb: FormBuilder) {} // borrar o comentar cuando se pase a un entorno real

  ngOnInit() {
    this.roleForm = this.fb.group({
      scope: ['', Validators.required],  // control para el scope dropdown
      roleName: ['', Validators.required],  // nombre del rol
      roleDescription: ['', Validators.required],  // descripción (puede ser opcional)
      baseRoles: this.fb.array([])
    });

    this.loadOptions(); // Cargar scopes y roles base
  }

  loadOptions(): void {
    if (this.isMock) {
      // Simulación de Scope, eliminar o comentar cuando se use el backend
      const mockScopes = [
        '/providers/Microsoft.Management/managementGroups/mock-mg',
        '/providers/Microsoft.Management/managementGroups/security-group',
        '/providers/Microsoft.Management/managementGroups/dev-group'
      ];

      // Convertir mockScopes a { label, value } (comentar o eliminar cuando se conecte el backend)
      this.scopeOptions = mockScopes.map(scope => ({
        label: scope.split('/').pop() ?? scope, // Ej: 'mock-mg'
        value: scope // ID completo
      }));

      // Datos simulados para dropdown de roles base (comentar o eliminar cuando se conecte el backend
      const mockBaseRoles = [
        { name: 'Owner', id: 'owner' },
        { name: 'Contributor', id: 'contributor' },
        { name: 'Reader', id: 'reader' }
      ];

      // Convertir mockBaseRoles a { label, value } (comentar o eliminar cuando se conecte el backend
      this.baseRoleOptions = mockBaseRoles.map(role => ({
        label: role.name,
        value: role.id
      }));

      // Inicializar baseRoles con 3 controles usando el primer valor (comentar o eliminar cuando se conecte el backend
      const formArray = this.roleForm.get('baseRoles') as FormArray;
      for (let i = 0; i < 3; i++) {
        formArray.push(this.fb.control(this.baseRoleOptions[0].value, Validators.required ));
      }
      //aqui termina la simulacion del scope

    } else {

    // Llamada real a backend que se conecta con Azure <---descomentar y adaptar
    const tokenReal = 'TOKEN_REAL'; // Aquí iría tu token válido

    // Ejemplo de carga desde backend con Azure
    // this.azureApiService.getBaseRoles(tokenReal).subscribe({
    //   next: (res) => {
    //     this.baseRoleOptions = res.value.map((role: any) => ({
    //       label: role.name,
    //       value: role.id
    //     }));

    //     // Supongamos que el backend también envía los roles asignables al usuario:
    //     const rolesDesdeApi = res.userAssignableRoles; // por ejemplo: ['reader', 'contributor']

    //     const formArray = this.roleForm.get('baseRoles') as FormArray;
    //     rolesDesdeApi.forEach((roleId: string) => {
    //       formArray.push(this.fb.control(roleId));
    //     });
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar roles base:', err);
    //   }
    // });
    }
  }

  onSubmit() {
    if (this.roleForm.valid) {
      console.log('Formulario enviado:', this.roleForm.value);
      // Aquí puedes hacer lo que necesites (llamar API, etc)
    } else {
      console.log('Formulario inválido');
    }
  }
}
