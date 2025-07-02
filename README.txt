Proyecto: roles-framework (Angular 18)

==============================================
📦 Requisitos para levantar el proyecto localmente
==============================================

✅ Requisitos previos:
- Node.js (versión 18.x recomendada)
- Angular CLI (versión 18)
- npm (v9 o superior)

Puedes instalar Angular CLI ejecutando:
> npm install -g @angular/cli

==============================================
🚀 Pasos para iniciar el proyecto
==============================================

1. Extrae el contenido del archivo .zip en tu computadora.

2. Abre una terminal en la carpeta del proyecto descomprimido.

3. Ejecuta el siguiente comando para instalar las dependencias:
> npm install

4. Inicia el servidor de desarrollo con:
> ng serve

Esto levantará la aplicación en:
http://localhost:4200

==============================================
🔐 Autenticación con Azure AD (MSAL)
==============================================

Este proyecto usa Microsoft Authentication Library (MSAL) para autenticación con Azure Active Directory (Azure AD).

Estas librerías se instalarán automáticamente con `npm install`:

- @azure/msal-angular (^4.0.12)
- @azure/msal-browser (^4.12.0)

==============================================
📄 Notas adicionales
==============================================

- Si recibes errores, asegúrate de tener la versión correcta de Node.js.
Puedes verificarla ejecutando:
> node -v