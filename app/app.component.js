/**
 * Med+Saúde - AppComponent (Angular Standalone Component Pattern)
 * Orquestrador principal da aplicação, inicialização de serviços e eventos
 */

import { themeService } from './core/services/theme.service.js';
import { routerService } from './app.routes.js';
import { apiService } from './core/services/api.service.js';

export class AppComponent {
  constructor() {
    this.themeService = themeService;
    this.routerService = routerService;
    this.apiService = apiService;
  }

  ngOnInit() {
    console.log('🚀 Med+Saúde App Initialized [Angular Architecture Pattern]');
    this.themeService.init();
    this.routerService.init();
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Integração global para chamadas inline nos templates
    window.alternarTema = () => this.themeService.alternarTema();
    if (typeof window.navegarPara !== 'function') {
      window.navegarPara = (pageId) => this.routerService.navegarPara(pageId);
    }
    window.navegarDrawer = (pageId) => {
      window.navegarPara(pageId);
      this.fecharMenuMobile();
    };
    window.toggleMenuMobile = () => this.toggleMenuMobile();
    window.fecharMenuMobile = () => this.fecharMenuMobile();
  }

  toggleMenuMobile() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.toggle('open');
      backdrop.classList.toggle('open');
    }
  }

  fecharMenuMobile() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
  }
}

export const appComponent = new AppComponent();
