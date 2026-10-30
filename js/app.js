/**
 * MED+SAÚDE - LÓGICA DO PORTAL WEB & GUIA MÉDICO (100% ESTÁTICO)
 * Escola da Nuvem - Grupo 6 (Amazon Connect)
 * Funciona no navegador direto ou via S3 Static Hosting sem necessidade de backend
 */

let todosMedicos = [];
let especialidadeAtiva = 'todas';
let nivelFonteAtual = 1; // 0: 14px, 1: 16px (padrão), 2: 18px, 3: 20px, 4: 22px
const escalasFonte = ['14px', '16px', '18px', '20px', '22px'];

// Função utilitária para normalizar texto (sem acentos e em minúsculas)
function normalizarTexto(txt) {
  if (!txt) return '';
  return txt.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function iniciarApp() {
  inicializarTema();
  inicializarTamanhoFonte();
  inicializarTodosCustomSelects();
  carregarDadosEstaticos();
  inicializarRoteadorSPA();
  inicializarScrollSpyDocumentacao();

  // Fechar dropdowns ao clicar fora ou apertar Escape
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-wrapper.open').forEach(w => w.classList.remove('open'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => w.classList.remove('open'));
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
  iniciarApp();
}

// 1. Gerenciamento de Tema (Dark / Light)
function inicializarTema() {
  const temaSalvo = localStorage.getItem('medsaude_theme') || 'dark';
  aplicarTema(temaSalvo);
}

// 1.1 Gerenciamento de Acessibilidade: Tamanho da Fonte (A- / A+)
function inicializarTamanhoFonte() {
  const salvo = localStorage.getItem('medsaude_font_level');
  if (salvo !== null) {
    const idx = parseInt(salvo, 10);
    if (!isNaN(idx) && idx >= 0 && idx < escalasFonte.length) {
      nivelFonteAtual = idx;
    }
  }
  aplicarTamanhoFonte(nivelFonteAtual);
}

function ajustarTamanhoFonte(delta) {
  nivelFonteAtual = Math.max(0, Math.min(escalasFonte.length - 1, nivelFonteAtual + delta));
  aplicarTamanhoFonte(nivelFonteAtual);
}

function resetarTamanhoFonte() {
  nivelFonteAtual = 1;
  aplicarTamanhoFonte(nivelFonteAtual);
}

function aplicarTamanhoFonte(nivel) {
  const tamanho = escalasFonte[nivel] || '16px';
  document.documentElement.style.fontSize = tamanho;
  localStorage.setItem('medsaude_font_level', nivel);

  // Destaca suavemente quando estiver no tamanho padrão (16px / index 1)
  document.querySelectorAll('.font-btn-reset').forEach(btn => {
    if (nivel === 1) {
      btn.classList.add('font-btn-active');
    } else {
      btn.classList.remove('font-btn-active');
    }
  });
}

function alternarTema() {
  const temaAtual = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  const novoTema = temaAtual === 'light' ? 'dark' : 'light';
  aplicarTema(novoTema);
  localStorage.setItem('medsaude_theme', novoTema);
}

function aplicarTema(tema) {
  const icon = document.getElementById('theme-icon');
  const iconDrawer = document.getElementById('theme-icon-drawer');
  if (tema === 'light') {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    if (icon) {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '#0284c7';
    }
    if (iconDrawer) {
      iconDrawer.className = 'fa-solid fa-moon';
      iconDrawer.style.color = '#0284c7';
    }
  } else {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    if (icon) {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#f59e0b';
    }
    if (iconDrawer) {
      iconDrawer.className = 'fa-solid fa-sun';
      iconDrawer.style.color = '#f59e0b';
    }
  }
}

// 1.2 Dropdowns Customizados com Bordas Arredondadas (Glassmorphism)
function sincronizarCustomSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  let wrapper = select.closest('.custom-select-wrapper');
  if (!wrapper) {
    inicializarCustomSelect(selectId);
    return;
  }

  const triggerSpan = wrapper.querySelector('.custom-select-trigger span');
  const menu = wrapper.querySelector('.custom-select-menu');
  if (!menu) return;

  menu.innerHTML = '';
  const options = Array.from(select.options);

  options.forEach((opt) => {
    const item = document.createElement('li');
    item.className = 'custom-select-item' + (opt.selected ? ' selected' : '');
    item.dataset.value = opt.value;
    item.textContent = opt.textContent;

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      select.value = opt.value;
      if (triggerSpan) triggerSpan.textContent = opt.textContent;

      menu.querySelectorAll('.custom-select-item').forEach(it => it.classList.remove('selected'));
      item.classList.add('selected');
      wrapper.classList.remove('open');

      select.dispatchEvent(new Event('change', { bubbles: true }));
      if (typeof aplicarFiltros === 'function' && (selectId === 'select-especialidade' || selectId === 'select-cidade')) {
        aplicarFiltros();
      }
      if (typeof filtrarGuiaMedico === 'function' && (selectId === 'select-regiao-guia' || selectId === 'select-cidade-guia')) {
        filtrarGuiaMedico();
      }
      if (typeof simularPrecoPlano === 'function' && (selectId === 'simulador-plano' || selectId === 'simulador-faixa')) {
        simularPrecoPlano();
      }
      if (typeof select.onchange === 'function') {
        select.onchange();
      }
    });

    menu.appendChild(item);
  });

  const selectedOpt = Array.from(select.options).find(o => o.selected) || select.options[select.selectedIndex] || options[0];
  if (triggerSpan && selectedOpt) {
    triggerSpan.textContent = selectedOpt.textContent;
  }
}

function inicializarCustomSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  if (select.closest('.custom-select-wrapper')) {
    sincronizarCustomSelect(selectId);
    return;
  }

  const parent = select.parentElement;
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select-wrapper';

  parent.insertBefore(wrapper, select);
  wrapper.appendChild(select);

  // Ocultar visualmente o select nativo preservando total funcionalidade e acessibilidade
  select.style.position = 'absolute';
  select.style.opacity = '0';
  select.style.pointerEvents = 'none';
  select.style.width = '0';
  select.style.height = '0';
  select.style.margin = '0';
  select.style.padding = '0';

  const trigger = document.createElement('div');
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-haspopup', 'listbox');

  const selectedOpt = Array.from(select.options).find(o => o.selected) || select.options[select.selectedIndex] || select.options[0];
  const label = document.createElement('span');
  label.textContent = selectedOpt?.textContent || 'Selecione...';

  const arrow = document.createElement('i');
  arrow.className = 'fa-solid fa-chevron-down custom-select-arrow';

  trigger.appendChild(label);
  trigger.appendChild(arrow);
  wrapper.appendChild(trigger);

  const menu = document.createElement('ul');
  menu.className = 'custom-select-menu';
  menu.setAttribute('role', 'listbox');
  wrapper.appendChild(menu);

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.contains('open');
    document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
      if (w !== wrapper) w.classList.remove('open');
    });
    wrapper.classList.toggle('open', !isOpen);
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    }
  });

  sincronizarCustomSelect(selectId);
}

function inicializarTodosCustomSelects() {
  const ids = [
    'select-especialidade',
    'select-cidade',
    'select-regiao-guia',
    'select-cidade-guia',
    'simulador-plano',
    'simulador-faixa',
    'agend-horario'
  ];
  ids.forEach(id => {
    inicializarCustomSelect(id);
  });
}

// 2. Carregar Especialistas e Cidades a partir do data.js
function carregarDadosEstaticos() {
  todosMedicos = window.ESPECIALISTAS_DATA || [];

  // Preencher Especialidades no Select da Home
  const selectEsp = document.getElementById('select-especialidade');
  if (selectEsp) {
    const especialidades = [...new Set(todosMedicos.map(m => m.especialidade))].sort();
    selectEsp.innerHTML = '<option value="todas">Todas as Especialidades</option>';
    especialidades.forEach(esp => {
      const opt = document.createElement('option');
      opt.value = esp;
      opt.textContent = esp;
      selectEsp.appendChild(opt);
    });
  }

  // Preencher Cidades nos Selects da Home e do Guia Médico
  const cidades = [...new Set(todosMedicos.map(m => m.cidade))].sort();
  
  const selectCid = document.getElementById('select-cidade');
  if (selectCid) {
    selectCid.innerHTML = '<option value="todas">Todas as Cidades</option>';
    cidades.forEach(cid => {
      const opt = document.createElement('option');
      opt.value = cid;
      opt.textContent = cid;
      selectCid.appendChild(opt);
    });
  }

  const selectCidGuia = document.getElementById('select-cidade-guia');
  if (selectCidGuia) {
    selectCidGuia.innerHTML = '<option value="todas">Todas as Cidades (Brasil • 5 Regiões)</option>';
    cidades.forEach(cid => {
      const opt = document.createElement('option');
      opt.value = cid;
      const medEx = todosMedicos.find(m => m.cidade === cid);
      const uf = medEx ? medEx.uf : '';
      const reg = medEx ? medEx.regiao : '';
      opt.textContent = `${cid} (${uf}) • Região ${reg}`;
      selectCidGuia.appendChild(opt);
    });
  }

  // Renderizar Médicos inicialmente
  renderizarMedicos(todosMedicos);

  // Sincronizar Custom Selects com as opções recém-populadas
  sincronizarCustomSelect('select-especialidade');
  sincronizarCustomSelect('select-cidade');
  sincronizarCustomSelect('select-cidade-guia');
  sincronizarCustomSelect('select-regiao-guia');
}

// 3. Renderizar Cards de Médicos
function renderizarMedicos(lista) {
  const container = document.getElementById('doctors-container');
  const contador = document.getElementById('contador-medicos');
  if (contador) contador.textContent = lista.length;
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3.5rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-user-doctor" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem; opacity: 0.8;"></i>
        <h3 style="margin-bottom: 0.5rem;">Nenhum especialista encontrado</h3>
        <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem auto;">
          Não encontramos profissionais para os critérios informados. Tente limpar os filtros ou faça uma busca mais ampla.
        </p>
        <button class="btn btn-primary btn-sm" onclick="limparFiltrosGuia()">
          <i class="fa-solid fa-rotate-left"></i> Ver Todos os Profissionais
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = lista.map(med => {
    const iniciais = med.nome.split(' ').map(p => p[0]).slice(0, 2).join('');
    const zapNumeros = (med.whatsapp || med.telefone || '').replace(/\D/g, '');
    const linkWhatsApp = zapNumeros ? `https://wa.me/55${zapNumeros}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20agendamento%20com%20${encodeURIComponent(med.nome)}%20via%20Med%2BSa%C3%BAde.` : '#';

    const corRegiao = {
      'Sul': '#0284c7',
      'Sudeste': '#2563eb',
      'Norte': '#059669',
      'Nordeste': '#d97706',
      'Centro-Oeste': '#7c3aed'
    }[med.regiao] || '#0284c7';

    const acessibilidadeHtml = med.acessibilidade && med.acessibilidade.acessivel_pne ? `
      <div style="margin: 0.75rem 0 0.5rem 0; padding: 0.5rem 0.75rem; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; font-size: 0.78rem; line-height: 1.4; color: #10b981; display: flex; align-items: flex-start; gap: 0.45rem;">
        <i class="fa-solid fa-wheelchair" style="margin-top: 2px;"></i>
        <span><strong>Acessível PNE & Idosos:</strong> ${med.acessibilidade.descricao || 'Edifício adaptado para macas e cadeirantes'}</span>
      </div>
    ` : '';

    const examesHtml = med.exames_e_procedimentos && med.exames_e_procedimentos.length ? `
      <div style="margin: 0.5rem 0; font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">
        <span style="font-weight: 600; color: var(--text-primary);"><i class="fa-solid fa-stethoscope" style="color: var(--primary);"></i> Exames no local:</span>
        ${med.exames_e_procedimentos.slice(0, 2).join(' • ')}${med.exames_e_procedimentos.length > 2 ? '...' : ''}
      </div>
    ` : '';

    return `
      <div class="doctor-card" id="card-${med.id}">
        <div class="doctor-header">
          <div class="doctor-avatar">${iniciais}</div>
          <div class="doctor-info" style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
              <h3 style="margin: 0;">${med.nome}</h3>
              <span style="font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.55rem; border-radius: 999px; background: ${corRegiao}22; color: ${corRegiao}; border: 1px solid ${corRegiao}55;">
                ${med.regiao || 'Brasil'}
              </span>
            </div>
            <span class="doctor-specialty">${med.especialidade}</span>
            <div class="doctor-crm">CRM: ${med.crm} ${med.rqe ? `• ${med.rqe}` : ''}</div>
          </div>
        </div>

        ${acessibilidadeHtml}

        <div class="doctor-meta-list">
          <div class="meta-item">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>${med.cidade} - ${med.uf}</strong> (${med.bairro})<br>
              <span style="font-size: 0.8rem; color: var(--text-muted);">${med.endereco}</span>
              ${med.ponto_referencia ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;"><em>Ref: ${med.ponto_referencia}</em></div>` : ''}
            </div>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-phone"></i>
            <span>${med.telefone}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-video"></i>
            <span>${med.modalidade_atendimento || 'Presencial e Telemedicina'}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-clock"></i>
            <span>${med.disponibilidade}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-star" style="color: #f59e0b;"></i>
            <span><strong>${med.avaliacao || '4.9'}</strong> / 5.0 no Guia Nacional</span>
          </div>
        </div>

        ${examesHtml}

        <div class="doctor-schedule-box">
          <div class="schedule-title"><i class="fa-regular fa-calendar-check"></i> Próximos horários disponíveis:</div>
          <div class="schedule-pills">
            ${(med.proximosHorarios || []).map(h => `<span class="schedule-pill">${h}</span>`).join('')}
          </div>
        </div>

        <div class="doctor-card-footer">
          <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="abrirModalAgendamento('${med.id}')">
            <i class="fa-solid fa-calendar-plus"></i> Agendar Consulta
          </button>
          ${zapNumeros ? `
            <a href="${linkWhatsApp}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" title="Conversar no WhatsApp" style="color: #10b981; border-color: rgba(16, 185, 129, 0.4); display: inline-flex; align-items: center; justify-content: center; width: 38px;">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.05rem;"></i>
            </a>
          ` : ''}
          <button class="btn btn-outline btn-sm" onclick="abrirChatComMedico('${med.id}')" title="Agendar via Chat Arwen" style="width: 38px; display: inline-flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-comment-dots"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 4. Filtrar Guia Médico (Totalmente Interativo e Independente)
function filtrarGuiaMedico() {
  const buscaInput = document.getElementById('input-busca-guia')?.value || '';
  const buscaGeral = document.getElementById('input-busca-geral')?.value || '';
  const termoBusca = (buscaInput || buscaGeral).trim();
  const termoNorm = normalizarTexto(termoBusca);

  const regGuia = document.getElementById('select-regiao-guia')?.value || 'todas';
  const cidGuia = document.getElementById('select-cidade-guia')?.value;
  const cidGeral = document.getElementById('select-cidade')?.value;
  const cidadeSelecionada = (cidGuia && cidGuia !== 'todas') ? cidGuia : ((cidGeral && cidGeral !== 'todas') ? cidGeral : 'todas');

  // Especialidade ativa: prioriza o chip clicado ou o valor selecionado no dropdown de especialidade
  let espParaFiltrar = especialidadeAtiva;
  const selectEsp = document.getElementById('select-especialidade');
  if ((!espParaFiltrar || espParaFiltrar === 'todas') && selectEsp && selectEsp.value && selectEsp.value !== 'todas') {
    espParaFiltrar = selectEsp.value;
  }
  const espAlvoNorm = normalizarTexto(espParaFiltrar);

  let filtrados = todosMedicos.filter(med => {
    // 1. Filtro por Região
    if (regGuia !== 'todas') {
      if (normalizarTexto(med.regiao) !== normalizarTexto(regGuia)) {
        return false;
      }
    }

    // 2. Filtro por Especialidade (tolerante a variações, acentos e subespecialidades)
    if (espParaFiltrar && espParaFiltrar !== 'todas') {
      const espMedNorm = normalizarTexto(med.especialidade);
      const subEspNorm = (med.subespecialidades || []).map(s => normalizarTexto(s)).join(' ');
      const bateEspecialidade = espMedNorm === espAlvoNorm ||
                                espMedNorm.includes(espAlvoNorm) || 
                                espAlvoNorm.includes(espMedNorm) ||
                                subEspNorm.includes(espAlvoNorm);
      if (!bateEspecialidade) return false;
    }

    // 3. Filtro por Cidade
    if (cidadeSelecionada !== 'todas') {
      if (normalizarTexto(med.cidade) !== normalizarTexto(cidadeSelecionada)) {
        return false;
      }
    }

    // 4. Filtro por Texto Livre Abrangente
    if (termoNorm) {
      const nomeNorm = normalizarTexto(med.nome);
      const crmNorm = normalizarTexto(med.crm);
      const rqeNorm = normalizarTexto(med.rqe);
      const espNorm = normalizarTexto(med.especialidade);
      const subNorm = (med.subespecialidades || []).map(s => normalizarTexto(s)).join(' ');
      const bairroNorm = normalizarTexto(med.bairro);
      const cidNorm = normalizarTexto(med.cidade);
      const regNorm = normalizarTexto(med.regiao);
      const endNorm = normalizarTexto(med.endereco);
      const sintomasNorm = ((med.sintomas_e_queixas || med.sintomas_atendidos || []).map(s => normalizarTexto(s))).join(' ');
      const examesNorm = (med.exames_e_procedimentos || []).map(e => normalizarTexto(e)).join(' ');
      const conveniosNorm = (med.convenios_atendidos || []).map(c => normalizarTexto(c)).join(' ');
      
      const match = nomeNorm.includes(termoNorm) ||
                    crmNorm.includes(termoNorm) ||
                    rqeNorm.includes(termoNorm) ||
                    espNorm.includes(termoNorm) ||
                    subNorm.includes(termoNorm) ||
                    bairroNorm.includes(termoNorm) ||
                    cidNorm.includes(termoNorm) ||
                    regNorm.includes(termoNorm) ||
                    endNorm.includes(termoNorm) ||
                    sintomasNorm.includes(termoNorm) ||
                    examesNorm.includes(termoNorm) ||
                    conveniosNorm.includes(termoNorm);
      if (!match) return false;
    }

    return true;
  });

  renderizarMedicos(filtrados);
}

// 5. Filtro por Chip com Ativação Visual Instantânea
function filtrarPorChip(especialidade, elementoBtn) {
  especialidadeAtiva = especialidade || 'todas';

  // Atualizar classe ativa visual nos chips
  const chips = document.querySelectorAll('#chips-especialidades .filter-chip');
  chips.forEach(btn => btn.classList.remove('active'));

  if (elementoBtn) {
    elementoBtn.classList.add('active');
  } else {
    chips.forEach(btn => {
      const txt = normalizarTexto(btn.textContent);
      if (txt.includes(normalizarTexto(especialidade)) || (especialidade === 'todas' && txt.includes('todas'))) {
        btn.classList.add('active');
      }
    });
  }

  // Sincronizar select da home se existir
  const selectHome = document.getElementById('select-especialidade');
  if (selectHome) {
    if (especialidade === 'todas') {
      selectHome.value = 'todas';
    } else {
      let achou = false;
      for (let i = 0; i < selectHome.options.length; i++) {
        if (normalizarTexto(selectHome.options[i].value).includes(normalizarTexto(especialidade))) {
          selectHome.selectedIndex = i;
          achou = true;
          break;
        }
      }
      if (!achou) {
        selectHome.value = especialidade;
      }
    }
  }

  if (typeof sincronizarCustomSelect === 'function') {
    sincronizarCustomSelect('select-especialidade');
  }

  filtrarGuiaMedico();
}

// 6. Limpar Filtros do Guia
function limparFiltrosGuia() {
  especialidadeAtiva = 'todas';
  
  const inputBusca = document.getElementById('input-busca-guia');
  if (inputBusca) inputBusca.value = '';

  const inputGeral = document.getElementById('input-busca-geral');
  if (inputGeral) inputGeral.value = '';

  const selectReg = document.getElementById('select-regiao-guia');
  if (selectReg) selectReg.value = 'todas';

  const selectCid = document.getElementById('select-cidade-guia');
  if (selectCid) selectCid.value = 'todas';

  const selectCidHome = document.getElementById('select-cidade');
  if (selectCidHome) selectCidHome.value = 'todas';

  const selectEspHome = document.getElementById('select-especialidade');
  if (selectEspHome) selectEspHome.value = 'todas';

  const chips = document.querySelectorAll('#chips-especialidades .filter-chip');
  chips.forEach((btn, index) => {
    if (index === 0 || btn.textContent.toLowerCase().includes('todas')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (typeof sincronizarCustomSelect === 'function') {
    sincronizarCustomSelect('select-especialidade');
    sincronizarCustomSelect('select-cidade');
    sincronizarCustomSelect('select-regiao-guia');
    sincronizarCustomSelect('select-cidade-guia');
  }

  filtrarGuiaMedico();
}

// 7. Manter aplicarFiltros() atualizando especialidadeAtiva e sincronizando visualmente
function aplicarFiltros() {
  const selectEspHome = document.getElementById('select-especialidade');
  if (selectEspHome && selectEspHome.value) {
    especialidadeAtiva = selectEspHome.value;

    // Sincronizar classes ativas nos chips visuais do guia
    const chips = document.querySelectorAll('#chips-especialidades .filter-chip');
    chips.forEach(btn => {
      const txt = normalizarTexto(btn.textContent);
      if (especialidadeAtiva === 'todas') {
        if (txt.includes('todas')) btn.classList.add('active');
        else btn.classList.remove('active');
      } else {
        if (txt.includes(normalizarTexto(especialidadeAtiva))) btn.classList.add('active');
        else btn.classList.remove('active');
      }
    });
  }

  filtrarGuiaMedico();
}

// 6. Modal de Agendamento
function abrirModalAgendamento(medicoId) {
  const medico = todosMedicos.find(m => m.id === medicoId);
  if (!medico) return;

  document.getElementById('agend-medico-id').value = medico.id;
  document.getElementById('modal-medico-detalhes').innerHTML = `
    <strong>${medico.nome}</strong> — ${medico.especialidade}<br>
    <span style="color: var(--text-muted);">CRM: ${medico.crm} | ${medico.cidade}/${medico.uf} (${medico.bairro})</span>
  `;

  const selectHorario = document.getElementById('agend-horario');
  selectHorario.innerHTML = medico.proximosHorarios.map(h => `
    <option value="${h}">${h}</option>
  `).join('');

  if (typeof sincronizarCustomSelect === 'function') {
    sincronizarCustomSelect('agend-horario');
  }

  document.getElementById('modal-agendamento').classList.add('active');
}

function fecharModalAgendamento() {
  document.getElementById('modal-agendamento').classList.remove('active');
}

// Confirmar Agendamento (Salva localmente no localStorage)
function confirmarAgendamento(e) {
  e.preventDefault();
  const medicoId = document.getElementById('agend-medico-id').value;
  const pacienteNome = document.getElementById('agend-paciente-nome').value;
  const cpf = document.getElementById('agend-cpf').value;
  const telefone = document.getElementById('agend-telefone').value;
  const dataHorario = document.getElementById('agend-horario').value;

  const medico = todosMedicos.find(m => m.id === medicoId);
  if (!medico) return;

  const protocolo = `PROT-${Math.floor(100000 + Math.random() * 900000)}`;
  const novoAgendamento = {
    id: `agend-${Date.now().toString().slice(-6)}`,
    medicoId: medico.id,
    medicoNome: medico.nome,
    especialidade: medico.especialidade,
    pacienteNome,
    cpf: cpf || 'Não informado',
    telefone: telefone || '(91) 99999-0000',
    dataHorario,
    status: 'Confirmado',
    canalOrigem: 'Portal Web Med+Saúde (Client-side)',
    protocolo,
    criadoEm: new Date().toISOString()
  };

  // Salvar no localStorage
  const historico = JSON.parse(localStorage.getItem('medsaude_agendamentos') || '[]');
  historico.unshift(novoAgendamento);
  localStorage.setItem('medsaude_agendamentos', JSON.stringify(historico));

  fecharModalAgendamento();
  alert(`🎉 Agendamento Confirmado com Sucesso!\n\nProtocolo: ${protocolo}\nPaciente: ${pacienteNome}\nEspecialista: ${medico.nome}\nData/Horário: ${dataHorario}\n\nUm SMS de confirmação foi simulado.`);
  document.getElementById('form-agendamento').reset();
}

// 7. Simulação do Canal de Voz do Amazon Connect
function simularLigacaoVoz() {
  alert(`📞 [CANAL VOZ AMAZON CONNECT - ESCOLA DA NUVEM]\n\nIniciando chamada para a Central de Voz 0800 770 2026:\n\n1. O fluxo do Amazon Connect atende a chamada via voz com IA conversacional agêntica.\n2. Exemplo do Case: Um beneficiário idoso diz: "Minha perna tá doendo, preciso de um médico de ossos perto da minha casa".\n3. O Amazon Lex ASR/NLU interpreta a intenção (Ortopedia) sem menus numéricos rígidos.\n4. O bot consulta a base no Amazon S3 e indica os ortopedistas disponíveis.\n5. O beneficiário confirma o agendamento apenas pela voz ou solicita transferência para agente humano N1!`);
}

function simularLoginBeneficiario() {
  const cpf = prompt("Área do Beneficiário Med+Saúde\n\nDigite seu CPF para consultar suas guias ou histórico de consultas:", "123.456.789-00");
  if (cpf) {
    const agends = JSON.parse(localStorage.getItem('medsaude_agendamentos') || '[]');
    const total = agends.length;
    alert(`Acesso validado!\n\nBeneficiário ativo na Med+Saúde.\nConsultas agendadas nesta sessão: ${total}\n\nPara agendamentos rápidos via inteligência artificial, converse com a Arwen no chat!`);
  }
}

// 8. Roteador de Múltiplas Páginas (SPA Views) e Tópicos Internos
const TOPIC_PAGE_MAP_JS = {
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

function navegarPara(target) {
  if (!target) target = 'inicio';
  const cleanTarget = target.replace('#', '');

  const rotasPrincipais = ['inicio', 'guia-medico', 'planos', 'sobre-nos', 'documentacao', 'omnichannel-case'];
  let pageId = cleanTarget;
  let subElementId = null;

  if (TOPIC_PAGE_MAP_JS[cleanTarget]) {
    pageId = TOPIC_PAGE_MAP_JS[cleanTarget];
    subElementId = cleanTarget;
  } else if (!rotasPrincipais.includes(cleanTarget)) {
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

  // 1. Alternar visualização da página ativa de forma instantânea e absoluta
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => {
    v.classList.remove('active');
    v.style.setProperty('display', 'none', 'important');
  });

  const targetView = document.getElementById(`view-${pageId}`);
  if (targetView) {
    targetView.classList.add('active');
    targetView.style.setProperty('display', 'block', 'important');
  }

  // 2. Atualizar contorno ativo na navbar desktop
  const links = document.querySelectorAll('.nav-links .nav-link-pill');
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === `#${pageId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 3. Atualizar Drawer Mobile
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');
  drawerLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === `#${pageId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Atualizar Bottom Tab Bar Mobile (suporta ion-tab-button e classes nativas)
  const bottomTabs = document.querySelectorAll('.bottom-tab-item, ion-tab-button');
  bottomTabs.forEach(tab => {
    const href = tab.getAttribute('href') || '';
    const tabName = tab.getAttribute('tab') || tab.getAttribute('data-target') || '';
    if (href === `#${pageId}` || tabName === pageId) {
      tab.classList.add('active');
      tab.setAttribute('selected', 'true');
    } else {
      tab.classList.remove('active');
      tab.removeAttribute('selected');
    }
  });

  // 5. Atualizar URL com histórico
  const finalHash = subElementId ? `#${subElementId}` : `#${pageId}`;
  if (window.location.hash !== finalHash) {
    history.pushState(null, null, finalHash);
  }

  // 6. Rolar para o subtópico específico ou para o topo da página
  if (subElementId) {
    setTimeout(() => {
      const el = document.getElementById(subElementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

window.navegarPara = navegarPara;

function inicializarRoteadorSPA() {
  const links = document.querySelectorAll('.nav-links .nav-link-pill, .footer-col a');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const pageId = href.replace('#', '');
        navegarPara(pageId);
      }
    });
  });

  // Suporte a cliques nos links dos submenus da barra de navegação
  document.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        const target = href.replace('#', '');
        navegarPara(target);
      }
    });
  });

  // Garantir que retirar o mouse recolha imediatamente qualquer submenu aberto
  document.querySelectorAll('.nav-has-dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseleave', () => {
      if (document.activeElement && dropdown.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    });
  });

  // Suporte a hash na URL inicial ou navegação pelo histórico (Voltar / Avançar)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    navegarPara(hash);
  });

  const hashInicial = window.location.hash.replace('#', '') || 'inicio';
  navegarPara(hashInicial);
}

// 9. Funções da Página de Documentação Técnica
function copiarSnippet(elementId, btn) {
  const codeEl = document.getElementById(elementId);
  if (!codeEl) return;

  const texto = codeEl.innerText;
  navigator.clipboard.writeText(texto).then(() => {
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
    btn.style.background = 'var(--secondary)';
    btn.style.color = '#ffffff';

    setTimeout(() => {
      btn.innerHTML = textoOriginal;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Falha ao copiar:', err);
  });
}

function filtrarEIrParaGuia() {
  aplicarFiltros();
  navegarPara('guia-medico');
}

// 10. Funções do Menu Lateral Mobile (Drawer Estilo App)
function toggleMenuMobile() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (drawer && backdrop) {
    drawer.classList.toggle('open');
    backdrop.classList.toggle('open');
  }
}

function fecharMenuMobile() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function navegarDrawer(pageId) {
  navegarPara(pageId);
  fecharMenuMobile();
}

// 11. Simulador Interativo de Preço dos Planos de Saúde (Dados Fictícios)
function simularPrecoPlano() {
  const planoSelect = document.getElementById('simulador-plano');
  const faixaSelect = document.getElementById('simulador-faixa');
  const valorDisplay = document.getElementById('simulador-resultado-valor');
  const descDisplay = document.getElementById('simulador-resultado-desc');

  if (!planoSelect || !faixaSelect || !valorDisplay) return;

  const plano = planoSelect.value;
  const faixa = faixaSelect.value;

  // Tabela fictícia de preços ANS Med+Saúde (Valores em Reais)
  const tabelaPrecos = {
    'basico': {
      '0-18': 189.90, '19-23': 219.50, '24-28': 249.90, '29-33': 289.00,
      '34-38': 329.50, '39-43': 389.00, '44-48': 469.90, '49-53': 589.00,
      '54-58': 729.00, '59+': 989.90
    },
    'especial': {
      '0-18': 349.90, '19-23': 399.00, '24-28': 459.50, '29-33': 529.00,
      '34-38': 619.00, '39-43': 739.50, '44-48': 889.00, '49-53': 1099.00,
      '54-58': 1380.00, '59+': 1890.00
    },
    'premium': {
      '0-18': 599.90, '19-23': 689.00, '24-28': 799.00, '29-33': 920.00,
      '34-38': 1080.00, '39-43': 1290.00, '44-48': 1580.00, '49-53': 1950.00,
      '54-58': 2480.00, '59+': 3290.00
    }
  };

  const valor = tabelaPrecos[plano] && tabelaPrecos[plano][faixa] ? tabelaPrecos[plano][faixa] : 189.90;
  valorDisplay.innerText = `R$ ${valor.toFixed(2).replace('.', ',')}`;

  const nomesPlanos = {
    'basico': 'Med+ Básico (Enfermaria Regional PA)',
    'especial': 'Med+ Especial (Apartamento Individual Nacional)',
    'premium': 'Med+ Premium (VIP & Concierge Internacional)'
  };

  if (descDisplay) {
    descDisplay.innerText = `${nomesPlanos[plano]} • Faixa: ${faixa} anos • Carência zero para consultas online`;
  }
}

// 10. ScrollSpy & Indicador do Tópico Ativo na Documentação Técnica
function inicializarScrollSpyDocumentacao() {
  const docBlocks = document.querySelectorAll('.docs-block');
  const indicatorLabel = document.getElementById('currentDocTopicTitle');
  const navBtns = document.querySelectorAll('.docs-nav-btn');

  if (!docBlocks.length) return;

  function atualizarTopicoAtivo() {
    let topicoAtivo = null;
    const scrollPos = window.scrollY + 220;

    docBlocks.forEach(block => {
      const top = block.offsetTop;
      const height = block.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        topicoAtivo = block;
      }
    });

    // Se estiver no topo ou no final
    if (!topicoAtivo && window.scrollY < 200) {
      topicoAtivo = docBlocks[0];
    } else if (!topicoAtivo && window.innerHeight + window.scrollY >= document.body.offsetHeight - 150) {
      topicoAtivo = docBlocks[docBlocks.length - 1];
    }

    if (topicoAtivo) {
      const id = topicoAtivo.getAttribute('id');
      const h3 = topicoAtivo.querySelector('h3');
      const titulo = h3 ? h3.innerText.trim() : 'Tópico da Documentação';

      if (indicatorLabel) {
        indicatorLabel.innerText = titulo;
      }

      navBtns.forEach(btn => {
        if (btn.getAttribute('href') === `#${id}`) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', atualizarTopicoAtivo, { passive: true });
  atualizarTopicoAtivo();
}

// 11. Exportações Globais para o Window
window.filtrarPorChip = filtrarPorChip;
window.filtrarGuiaMedico = filtrarGuiaMedico;
window.limparFiltrosGuia = limparFiltrosGuia;
window.aplicarFiltros = aplicarFiltros;
window.abrirModalAgendamento = abrirModalAgendamento;
window.fecharModalAgendamento = fecharModalAgendamento;
window.confirmarAgendamento = confirmarAgendamento;
if (typeof abrirChatComMedico === 'function') window.abrirChatComMedico = abrirChatComMedico;
window.simularPrecoPlano = simularPrecoPlano;
window.alternarTema = alternarTema;
window.ajustarTamanhoFonte = ajustarTamanhoFonte;
window.resetarTamanhoFonte = resetarTamanhoFonte;

