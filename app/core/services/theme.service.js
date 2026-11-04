/**
 * Med+Saúde - ThemeService (Angular Core Service Pattern)
 * Gerencia o estado de Dark Mode e Light Mode com Película Sépia Suave
 */

export class ThemeService {
  constructor() {
    this.THEME_STORAGE_KEY = 'medsaude_theme_preference';
  }

  init() {
    const temaSalvo = localStorage.getItem(this.THEME_STORAGE_KEY) || 'dark';
    this.aplicarTema(temaSalvo);
  }

  aplicarTema(tema) {
    const iconHeader = document.getElementById('theme-icon');
    const iconDrawer = document.getElementById('theme-icon-drawer');

    if (tema === 'light') {
      document.body.classList.add('light-theme');
      if (iconHeader) iconHeader.className = 'fa-solid fa-moon';
      if (iconDrawer) iconDrawer.className = 'fa-solid fa-moon';
    } else {
      document.body.classList.remove('light-theme');
      if (iconHeader) iconHeader.className = 'fa-solid fa-sun';
      if (iconDrawer) iconDrawer.className = 'fa-solid fa-sun';
    }

    localStorage.setItem(this.THEME_STORAGE_KEY, tema);
  }

  alternarTema() {
    const isLight = document.body.classList.contains('light-theme');
    const novoTema = isLight ? 'dark' : 'light';
    this.aplicarTema(novoTema);
  }
}

export const themeService = new ThemeService();
