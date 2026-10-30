/**
 * Med+Saúde - main.js (Angular Bootstrap Entry Point)
 * Inicializa a aplicação quando o DOM estiver pronto
 */

import { appComponent } from './app/app.component.js';

document.addEventListener('DOMContentLoaded', () => {
  appComponent.ngOnInit();
});
