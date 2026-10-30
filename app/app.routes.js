/**
 * Med+Saúde - AppRoutes (Angular SPA Routing Pattern)
 * Gerenciador de rotas e transições suaves entre as 6 abas do portal
 */

export const ROUTES = [
  { path: 'inicio', title: 'Início • Med+Saúde', viewId: 'view-inicio' },
  { path: 'guia-medico', title: 'Guia Médico • Med+Saúde', viewId: 'view-guia-medico' },
  { path: 'planos', title: 'Planos de Saúde • Med+Saúde', viewId: 'view-planos' },
  { path: 'sobre-nos', title: 'Sobre Nós • Grupo 6 (Escola da Nuvem)', viewId: 'view-sobre-nos' },
  { path: 'documentacao', title: 'Documentação Técnica • Amazon Connect', viewId: 'view-documentacao' },
  { path: 'omnichannel-case', title: 'Arquitetura AWS • Med+Saúde', viewId: 'view-omnichannel-case' }
];

// Mapeamento de subtópicos e seções internas para suas respectivas páginas
const TOPIC_PAGE_MAP = {
  // Tópicos da Documentação Técnica
  'doc-visao-geral': 'documentacao',
  'doc-lex-intents': 'documentacao',
  'doc-s3-data': 'documentacao',
  'doc-contact-flow': 'documentacao',
  'doc-widget-aws': 'documentacao',
  'doc-s3-deploy': 'documentacao',
  'doc-lambda-event': 'documentacao',
  'doc-faq-banca': 'documentacao',

  // Tópicos da Arquitetura AWS
  'aws-canais': 'omnichannel-case',
  'aws-metricas': 'omnichannel-case',
  'aws-telemetria': 'omnichannel-case',
  'aws-finops': 'omnichannel-case',

  // Tópicos de Planos de Saúde
  'planos-cards': 'planos',
  'planos-simulador': 'planos',
  'planos-tabela': 'planos',

  // Tópicos de Sobre Nós
  'sobre-nos-integrantes': 'sobre-nos',
  'sobre-nos-timeline': 'sobre-nos',

  // Tópicos do Guia Médico
  'guia-busca': 'guia-medico',
  'guia-lista': 'guia-medico'
};

export class RouterService {
  constructor() {
    this.currentRoute = 'inicio';
  }

  init() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'inicio';
      this.navegarPara(hash);
    });

    const hashInicial = window.location.hash.replace('#', '') || 'inicio';
    this.navegarPara(hashInicial);
  }

  navegarPara(target) {
    if (!target) target = 'inicio';
    const cleanTarget = target.replace('#', '');

    let pageId = cleanTarget;
    let subElementId = null;

    if (TOPIC_PAGE_MAP[cleanTarget]) {
      pageId = TOPIC_PAGE_MAP[cleanTarget];
      subElementId = cleanTarget;
    } else {
      const routeExists = ROUTES.some(r => r.path === cleanTarget);
      if (!routeExists) {
        const el = document.getElementById(cleanTarget);
        if (el) {
          const parentView = el.closest('.page-view');
          if (parentView && parentView.id) {
            pageId = parentView.id.replace('view-', '');
            subElementId = cleanTarget;
          } else {
            pageId = 'inicio';
          }
        } else {
          pageId = 'inicio';
        }
      }
    }

    const route = ROUTES.find(r => r.path === pageId) || ROUTES[0];
    this.currentRoute = route.path;

    // 1. Alterna a visualização ativa da página
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(route.viewId);
    if (targetView) {
      targetView.classList.add('active');
    }

    // 2. Atualiza estado ativo na Floating Navbar
    document.querySelectorAll('.nav-link-pill').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${route.path}`) {
        link.classList.add('active');
      }
    });

    // 3. Atualiza estado ativo no Drawer Mobile
    document.querySelectorAll('.drawer-nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${route.path}`) {
        link.classList.add('active');
      }
    });

    // 4. Atualiza estado ativo na Bottom Tab Bar (suportando ion-tab-button e classes nativas)
    document.querySelectorAll('.bottom-tab-item, ion-tab-button').forEach(tab => {
      const tabHref = tab.getAttribute('href') || '';
      const tabName = tab.getAttribute('tab') || tab.getAttribute('data-target') || '';
      if (tabHref === `#${route.path}` || tabName === route.path) {
        tab.classList.add('active');
        tab.setAttribute('selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.removeAttribute('selected');
      }
    });

    // 5. Atualiza o título do documento
    document.title = route.title;

    // 6. Atualiza hash no histórico sem duplicar
    const finalHash = subElementId ? `#${subElementId}` : `#${route.path}`;
    if (window.location.hash !== finalHash) {
      history.pushState(null, null, finalHash);
    }

    // 7. Rolagem inteligente (para subtópico ou topo)
    if (subElementId) {
      setTimeout(() => {
        const el = document.getElementById(subElementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Atualiza links de sidebar ativa se for na documentação
          document.querySelectorAll('.docs-nav-btn').forEach(btn => {
            if (btn.getAttribute('href') === `#${subElementId}`) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

export const routerService = new RouterService();
