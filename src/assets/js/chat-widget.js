/**
 * MED+SAÚDE - ASSISTENTE VIRTUAL IARA & INTEGRAÇÃO AMAZON CONNECT (100% CLIENT-SIDE)
 * Simulação das 8 Intenções Oficiais do Amazon Lex V2 (bot-G6, alias prod) + Amazon Q in Connect
 * Em conformidade com ANS RN 623 (Protocolo Inicial), Novo Decreto do SAC 13.135/2026 e LGPD
 */

let chatAberto = false;
let historicoChat = [];
let protocoloSessaoAtiva = null;

// Gerador de protocolo curto humanizado no padrão ANS RN 623 (YYYYMMDD-XXXX)
function gerarProtocoloCurto() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  const sufixo = Math.floor(1000 + Math.random() * 9000);
  return `${ano}${mes}${dia}-${sufixo}`;
}

function obterOuCriarProtocoloSessao() {
  if (!protocoloSessaoAtiva) {
    protocoloSessaoAtiva = gerarProtocoloCurto();
  }
  return protocoloSessaoAtiva;
}

// 1. Abrir e Fechar Widget
function toggleChatWidget() {
  const panel = document.getElementById('chat-panel');
  const launcher = document.getElementById('chat-launcher');
  if (!panel) return;
  chatAberto = !chatAberto;
  if (chatAberto) {
    panel.classList.remove('hidden');
    launcher?.classList.add('chat-open');
    document.body.classList.add('chat-is-open');
    document.getElementById('chat-input')?.focus();
    garantirMensagemAbertura();
  } else {
    panel.classList.add('hidden');
    launcher?.classList.remove('chat-open');
    document.body.classList.remove('chat-is-open');
  }
}

function abrirChatWidget() {
  const panel = document.getElementById('chat-panel');
  const launcher = document.getElementById('chat-launcher');
  if (!panel) return;
  chatAberto = true;
  panel.classList.remove('hidden');
  launcher?.classList.add('chat-open');
  document.body.classList.add('chat-is-open');
  document.getElementById('chat-input')?.focus();
  garantirMensagemAbertura();
}

function abrirChatComMensagem(texto) {
  abrirChatWidget();
  enviarMensagemRapida(texto);
}

function abrirChatComMedico(medicoId) {
  const medicos = window.ESPECIALISTAS_DATA || [];
  const medico = medicos.find(m => m.id === medicoId);
  if (!medico) return;
  abrirChatWidget();
  enviarMensagemRapida(`Gostaria de agendar consulta com ${medico.nome} (${medico.especialidade} em ${medico.cidade})`);
}

function garantirMensagemAbertura() {
  const container = document.getElementById('chat-messages');
  if (!container || container.children.length > 0) return;
  const protocolo = obterOuCriarProtocoloSessao();
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot';
  msgDiv.innerHTML = `
    <div class="msg-bubble">
      Olá! Sou a <strong>Iara</strong>, sua assistente virtual da <strong>Med+Saúde</strong>.<br><br>
      📌 <strong>Protocolo de Atendimento:</strong> <code>#${protocolo}</code><br>
      <small style="color: var(--text-muted); font-size: 0.75rem;">(Conforme Resolução Normativa ANS RN 623)</small><br><br>
      Como posso te ajudar hoje? Você pode buscar especialistas (ex: <em>Cardiologia</em> ou <em>Ortopedia em Curitiba</em>), agendar consultas ou tirar dúvidas sobre o plano.
    </div>
    <span class="msg-timestamp">${hora}</span>
  `;
  container.appendChild(msgDiv);
}

// 2. Tratar envio de mensagem
function tratarEnvioMensagem(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  // Renderiza mensagem do usuário
  adicionarMensagemUsuario(texto);
  input.value = '';

  // Efeito digitando
  mostrarIndicadorDigitando();

  // Processa resposta NLU local (simulando Amazon Lex V2 / Amazon Q in Connect) em 450ms
  setTimeout(() => {
    removerIndicadorDigitando();
    const resposta = processarMensagemLexClientSide(texto);
    adicionarRespostaBot(resposta);
  }, 450);
}

function enviarMensagemRapida(texto) {
  const input = document.getElementById('chat-input');
  if (input) input.value = texto;
  tratarEnvioMensagem(new Event('submit'));
}

// 3. Motor NLU Client-Side: 8 Intenções Oficiais do Amazon Lex V2 (bot-G6, alias prod)
function processarMensagemLexClientSide(textoOriginal) {
  const texto = (textoOriginal || '').toLowerCase().trim();
  const especialistas = window.ESPECIALISTAS_DATA || [];
  const faqs = window.FAQ_CONHECIMENTO_DATA || [];
  const protocolo = obterOuCriarProtocoloSessao();

  let responseData = {
    intent: 'FallbackIntent',
    reply: '',
    cards: [],
    requiresTransfer: false,
    prioridadeTransbordo: null
  };

  // INTENÇÃO 1: SinaisDeUrgencia (Triagem clínica imediata -> SAMU 192 + Transbordo Prioridade 1)
  if (
    texto.includes('infarto') ||
    texto.includes('infartando') ||
    texto.includes('dor no peito forte') ||
    texto.includes('aperto forte no peito') ||
    texto.includes('falta de ar severa') ||
    texto.includes('desmaio') ||
    texto.includes('avc') ||
    texto.includes('derrame') ||
    texto.includes('emergência') ||
    texto.includes('urgencia') ||
    texto.includes('socorro')
  ) {
    responseData.intent = 'SinaisDeUrgencia';
    responseData.requiresTransfer = true;
    responseData.prioridadeTransbordo = 1;
    responseData.reply = `🚨 **ALERTA DE EMERGÊNCIA MÉDICA (Protocolo Prioritário #${protocolo})**\n\nIdentifiquei sintomas clínicos de urgência. Se houver risco iminente à vida, ligue imediatamente para o **SAMU (192)** ou dirija-se ao pronto-socorro mais próximo.\n\nEm conformidade com o **Novo Decreto do SAC (13.135/2026)** e normas de segurança do paciente, estou transferindo seu contato com **Prioridade 1** para um médico regulador / atendente humano na fila **AgenteN1**. Por favor, permaneça na linha!`;
    return responseData;
  }

  // INTENÇÃO 2: FalarComAtendente (Transbordo explícito para AgenteN1 com contexto preservado)
  if (
    texto.includes('humano') ||
    texto.includes('atendente') ||
    texto.includes('falar com pessoa') ||
    texto.includes('falar com atendente') ||
    texto.includes('atendente humano') ||
    texto.includes('operador') ||
    texto.includes('reclamação') ||
    texto.includes('transbordo') ||
    texto.includes('atendente n1') ||
    texto.includes('falar com alguém')
  ) {
    responseData.intent = 'FalarComAtendente';
    responseData.requiresTransfer = true;
    responseData.prioridadeTransbordo = 2;
    responseData.reply = `Com certeza! Estou transferindo seu atendimento para a fila unificada **AgenteN1** no Amazon Connect.\n\n📌 **Protocolo ANS:** \`#${protocolo}\`\n📋 **Contexto Preservado:** Todo o seu histórico e parâmetros da sessão já estão carregados na tela do atendente humano (sem necessidade de repetir informações, conforme Decreto do SAC 13.135/2026). Aguarde um instante! 🎧`;
    return responseData;
  }

  // INTENÇÃO 3: AgendarConsulta (Agendamento conversacional com prompt de confirmação do Lex)
  if (
    texto.includes('agendar') ||
    texto.includes('marcar') ||
    texto.includes('agendamento') ||
    texto.includes('marcar consulta') ||
    texto.includes('quero marcar')
  ) {
    responseData.intent = 'AgendarConsulta';
    
    // Identifica médico pelo nome ou especialidade
    let medMatch = null;
    if (texto.includes('ana carolina') || texto.includes('ana')) {
      medMatch = especialistas.find(m => m.nome.includes('Ana Carolina'));
    } else if (texto.includes('carlos eduardo') || texto.includes('carlos') || texto.includes('mendonça')) {
      medMatch = especialistas.find(m => m.nome.includes('Carlos Eduardo'));
    } else if (texto.includes('cardio') || texto.includes('coração')) {
      medMatch = especialistas.find(m => m.especialidade === 'Cardiologia' && m.cidade === 'Curitiba') || especialistas.find(m => m.especialidade === 'Cardiologia');
    } else if (texto.includes('ortop') || texto.includes('osso') || texto.includes('joelho')) {
      medMatch = especialistas.find(m => m.especialidade === 'Ortopedia' && m.cidade === 'Curitiba') || especialistas.find(m => m.especialidade === 'Ortopedia');
    } else {
      medMatch = especialistas.find(m => m.cidade === 'Curitiba') || especialistas[0];
    }

    const horarioExemplo = (medMatch?.proximosHorarios && medMatch.proximosHorarios[0]) || 'Amanhã às 08:30';

    responseData.reply = `Perfeito! Encontrei horários para agendamento com **${medMatch.nome}** (${medMatch.especialidade} • ${medMatch.cidade}-${medMatch.uf}).\n\n🗓️ **Confirmando agendamento:** consulta de ${medMatch.especialidade} no dia ${horarioExemplo}. Posso marcar? Escolha o horário abaixo ou confirme pelo botão:`;
    responseData.cards = [medMatch];
    return responseData;
  }

  // INTENÇÃO 4: ConsultarEspecialidade e BuscarPorLocalidade
  let especialidadeDetectada = null;
  if (texto.includes('cardio') || texto.includes('coração') || texto.includes('cardiologista')) {
    especialidadeDetectada = 'Cardiologia';
  } else if (texto.includes('ortop') || texto.includes('osso') || texto.includes('joelho') || texto.includes('espinhaço') || texto.includes('ortopedista')) {
    especialidadeDetectada = 'Ortopedia';
  } else if (texto.includes('pediat') || texto.includes('criança')) {
    especialidadeDetectada = 'Pediatria';
  } else if (texto.includes('derma') || texto.includes('pele')) {
    especialidadeDetectada = 'Dermatologia';
  } else if (texto.includes('gineco') || texto.includes('mulher')) {
    especialidadeDetectada = 'Ginecologia e Obstetrícia';
  } else if (texto.includes('clinico') || texto.includes('geral')) {
    especialidadeDetectada = 'Clínica Geral';
  }

  let cidadeDetectada = null;
  if (texto.includes('curitiba') || texto.includes('cwb') || texto.includes('paraná') || texto.includes('pr')) {
    cidadeDetectada = 'Curitiba';
  } else if (texto.includes('belém') || texto.includes('belem') || texto.includes('pará') || texto.includes('pa')) {
    cidadeDetectada = 'Belém';
  } else if (texto.includes('são paulo') || texto.includes('sao paulo') || texto.includes('sp')) {
    cidadeDetectada = 'São Paulo';
  } else if (texto.includes('salvador') || texto.includes('bahia') || texto.includes('ba')) {
    cidadeDetectada = 'Salvador';
  } else if (texto.includes('recife') || texto.includes('pe')) {
    cidadeDetectada = 'Recife';
  }

  if (especialidadeDetectada || cidadeDetectada) {
    responseData.intent = cidadeDetectada ? 'BuscarPorLocalidade' : 'ConsultarEspecialidade';

    let filtrados = especialistas;
    if (especialidadeDetectada) {
      filtrados = filtrados.filter(m => m.especialidade.toLowerCase() === especialidadeDetectada.toLowerCase());
    }
    if (cidadeDetectada) {
      filtrados = filtrados.filter(m => m.cidade.toLowerCase() === cidadeDetectada.toLowerCase());
    }

    // Se buscou especialidade sem cidade, prioriza Curitiba (cenário da demo do case)
    if (!cidadeDetectada && filtrados.some(m => m.cidade === 'Curitiba')) {
      const emCuritiba = filtrados.filter(m => m.cidade === 'Curitiba');
      if (emCuritiba.length > 0) filtrados = emCuritiba;
    }

    if (filtrados.length > 0) {
      const termoEsp = especialidadeDetectada ? `de **${especialidadeDetectada}**` : 'especialistas';
      const termoCid = cidadeDetectada ? ` em **${cidadeDetectada}**` : ' em Curitiba (PR)';
      responseData.reply = `Certo! Localizei ${filtrados.length} ${filtrados.length > 1 ? 'médicos credenciados' : 'médico credenciado'} ${termoEsp}${termoCid} no Guia Médico Med+Saúde (consulta via Amazon Q in Connect):\n\nVocê pode agendar diretamente clicando abaixo ou digitando o horário desejado:`;
      responseData.cards = filtrados;
    } else {
      responseData.reply = `Não localizei especialistas com esses critérios exatos no momento. Posso pesquisar em capitais próximas ou transferir para a fila **AgenteN1**. Deseja falar com um atendente humano?`;
    }
    return responseData;
  }

  // INTENÇÃO 5: OutrosAssuntos (Dúvidas gerais, FAQ da operadora via Amazon Q in Connect)
  const faqMatch = faqs.find(f => 
    f.palavrasChave && f.palavrasChave.some(k => texto.includes(k.toLowerCase()))
  );

  if (
    faqMatch ||
    texto.includes('plano') ||
    texto.includes('carência') ||
    texto.includes('carencia') ||
    texto.includes('boleto') ||
    texto.includes('carteirinha') ||
    texto.includes('reembolso') ||
    texto.includes('cobertura')
  ) {
    responseData.intent = 'OutrosAssuntos';
    const respostaFaq = faqMatch 
      ? faqMatch.resposta 
      : 'Os planos Med+Saúde oferecem cobertura ambulatorial e hospitalar com obstetrícia regulamentada pela ANS, acesso a telemedicina 24h e carência reduzida para consultas e exames simples.';
    
    responseData.reply = `ℹ️ **Base de Conhecimento Med+Saúde (Amazon Q in Connect):**\n\n${respostaFaq}\n\n*Posso te ajudar a localizar um especialista no Guia Médico ou você prefere agendar uma consulta?*`;
    return responseData;
  }

  // INTENÇÃO 6: DespedidaEncerramento (Finalização cordial)
  if (
    texto.includes('obrigado') ||
    texto.includes('obrigada') ||
    texto.includes('valeu') ||
    texto.includes('tchau') ||
    texto.includes('até logo') ||
    texto.includes('era só isso') ||
    texto.includes('nada mais') ||
    texto.includes('encerra')
  ) {
    responseData.intent = 'DespedidaEncerramento';
    responseData.reply = `A **Med+Saúde** agradece o seu contato! Seu protocolo foi registrado sob o número **#${protocolo}**.\n\nSe precisar de novos agendamentos ou informações sobre credenciados, estarei sempre à disposição por aqui ou pelo nosso telefone 24h. Tenha um excelente dia! 🩺💙`;
    return responseData;
  }

  // Saudações gerais
  if (
    texto.includes('olá') ||
    texto.includes('ola') ||
    texto.includes('oi') ||
    texto.includes('bom dia') ||
    texto.includes('boa tarde') ||
    texto.includes('boa noite') ||
    texto === 'começar' ||
    texto === 'inicio'
  ) {
    responseData.intent = 'ConsultarEspecialidade';
    responseData.reply = `Olá! Sou a **Iara**, sua assistente virtual da **Med+Saúde**.\n\n📌 **Protocolo:** \`#${protocolo}\` (ANS RN 623)\n\nPor aqui consigo te ajudar com **Cardiologia** e **Ortopedia** (cenários oficiais do case) e diversas outras especialidades. Qual especialidade ou cidade você procura hoje?`;
    return responseData;
  }

  // INTENÇÃO 8: FallbackIntent (Reprompt gentil ou oferta de transbordo)
  responseData.intent = 'FallbackIntent';
  responseData.reply = `Desculpe, não compreendi com clareza a sua solicitação. Por aqui consigo te ajudar com **Cardiologia** e **Ortopedia**, além de agendamentos e informações do plano.\n\nVocê pode me dizer qual médico ou cidade procura (ex: *"cardiologista em Curitiba"* ou *"médico de osso"*), ou se preferir, diga **"falar com atendente"** para eu te encaminhar para o suporte humano N1 no Amazon Connect.`;
  return responseData;
}

// 4. Renderização de Mensagens no Chat
function adicionarMensagemUsuario(texto) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg user';
  msgDiv.innerHTML = `
    <div class="msg-bubble">${escaparHtml(texto)}</div>
    <span class="msg-timestamp">${hora}</span>
  `;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
  historicoChat.push({ role: 'user', content: texto });
}

function formatarMarkdown(texto) {
  return texto
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background: rgba(0,0,0,0.15); padding: 2px 6px; border-radius: 4px; font-weight: 600;">$1</code>')
    .replace(/\n/g, '<br>');
}

function adicionarRespostaBot(data) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const protocolo = obterOuCriarProtocoloSessao();

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot';

  let conteudoHtml = `<div class="msg-bubble">${formatarMarkdown(data.reply)}`;

  // Transbordo para Agente N1
  if (data.requiresTransfer) {
    const prioridadeTxt = data.prioridadeTransbordo === 1 ? 'Prioridade 1 (Emergência Clínica - SAMU 192)' : 'Prioridade 2 (Fila AgenteN1)';
    const prioridadeCor = data.prioridadeTransbordo === 1 ? '#ef4444' : '#0284c7';
    conteudoHtml += `
      <div class="transfer-alert-box" style="background: rgba(2, 132, 199, 0.08); border: 1px solid ${prioridadeCor}; border-radius: 8px; padding: 0.75rem; margin-top: 0.75rem; font-size: 0.8rem; line-height: 1.5;">
        <strong style="display: block; color: ${prioridadeCor}; margin-bottom: 0.25rem;"><i class="fa-solid fa-headset"></i> Transbordo Amazon Connect Ativado</strong>
        • <strong>Protocolo ANS RN 623:</strong> <code>#${protocolo}</code><br>
        • <strong>Fila de Destino:</strong> AgenteN1 (${prioridadeTxt})<br>
        • <strong>Preservação de Contexto:</strong> Atributos de sessão e histórico copiados para a tela do atendente<br>
        • <strong>Status:</strong> Transferindo contato humanizado...
      </div>
    `;
  }

  // Cards de especialistas recomendados
  if (data.cards && data.cards.length > 0) {
    conteudoHtml += `<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">`;
    data.cards.slice(0, 3).forEach(med => {
      const horarioDisponivel = (med.proximosHorarios && med.proximosHorarios.length > 0) ? med.proximosHorarios[0] : 'Amanhã às 08:30';
      conteudoHtml += `
        <div style="background: var(--card-bg-subtle, rgba(255,255,255,0.05)); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
            <div>
              <strong style="color: var(--primary); font-size: 0.9rem;">${med.nome}</strong>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">${med.especialidade} • CRM ${med.crm || 'N/A'}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin: 0.2rem 0;">${med.cidade}/${med.uf} (${med.bairro}) • ${med.endereco}</div>
            </div>
          </div>
          <div style="font-size: 0.76rem; color: #10b981; font-weight: 700; margin-top: 0.25rem;">
            <i class="fa-regular fa-clock"></i> Horário Disponível: ${horarioDisponivel}
          </div>
          <div style="display: flex; gap: 0.4rem; margin-top: 0.5rem;">
            <button class="quick-btn" style="background: var(--primary); color: #ffffff; font-weight: 700; flex: 1;" onclick="agendarDiretoViaChat('${med.id}', '${med.nome}', '${horarioDisponivel}')">
              Confirmar ${horarioDisponivel}
            </button>
            <button class="quick-btn" onclick="abrirModalAgendamento('${med.id}')">
              Ver Mais Horários
            </button>
          </div>
        </div>
      `;
    });
    conteudoHtml += `</div>`;
  }

  conteudoHtml += `</div><span class="msg-timestamp">${hora}</span>`;
  msgDiv.innerHTML = conteudoHtml;

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
  historicoChat.push({ role: 'bot', content: data.reply });
}

// 5. Indicador de digitando
function mostrarIndicadorDigitando() {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const typingDiv = document.createElement('div');
  typingDiv.id = 'bot-typing-indicator';
  typingDiv.className = 'chat-msg bot';
  typingDiv.innerHTML = `
    <div class="msg-bubble" style="font-style: italic; color: var(--text-muted); font-size: 0.8rem;">
      <i class="fa-solid fa-circle-notch fa-spin"></i> Iara está consultando a base de conhecimento no Amazon Q in Connect...
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function removerIndicadorDigitando() {
  const el = document.getElementById('bot-typing-indicator');
  if (el) el.remove();
}

// 6. Agendar consulta direto pelos botões do chat
function agendarDiretoViaChat(medicoId, medicoNome, horario) {
  const nomePaciente = prompt("Por favor, informe seu Nome Completo para confirmar o agendamento:", "Beneficiário Med+Saúde");
  if (!nomePaciente) return;

  const protocolo = obterOuCriarProtocoloSessao();
  const novoAgendamento = {
    id: `agend-${Date.now().toString().slice(-6)}`,
    medicoId,
    medicoNome,
    pacienteNome: nomePaciente,
    cpf: "123.456.789-00",
    telefone: '(41) 99123-4501',
    dataHorario: horario,
    canalOrigem: 'Chat Bot Iara (Amazon Connect & Lex)',
    protocolo,
    criadoEm: new Date().toISOString()
  };

  const historico = JSON.parse(localStorage.getItem('medsaude_agendamentos') || '[]');
  historico.unshift(novoAgendamento);
  localStorage.setItem('medsaude_agendamentos', JSON.stringify(historico));

  adicionarRespostaBot({
    reply: `🎉 **Agendamento Confirmado com Sucesso!**\n\n- **Protocolo ANS:** \`#${protocolo}\`\n- **Médico Credenciado:** ${medicoNome}\n- **Data/Horário Confirmado:** ${horario}\n- **Beneficiário:** ${nomePaciente}\n\nOs detalhes foram registrados em nosso sistema. Deseja realizar outra consulta no Guia Médico ou tirar alguma dúvida?`
  });
}

// 7. Injeção do Snippet Oficial do Amazon Connect
function toggleAwsConfigDrawer() {
  const drawer = document.getElementById('aws-config-drawer');
  if (drawer) drawer.classList.toggle('hidden');
}

function salvarEInjetarSnippetAws() {
  const snippet = document.getElementById('aws-snippet-input').value.trim();
  if (!snippet) {
    alert('Cole o código do widget gerado no console do Amazon Connect.');
    return;
  }

  localStorage.setItem('medsaude_aws_connect_snippet', snippet);
  injetarSnippetNoDocumento(snippet);
  toggleAwsConfigDrawer();
  alert('Snippet oficial do Amazon Connect injetado com sucesso!');
}

function injetarSnippetNoDocumento(snippetHtml) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = snippetHtml;
  const scripts = tempDiv.getElementsByTagName('script');

  for (let s of scripts) {
    const novoScript = document.createElement('script');
    if (s.src) {
      novoScript.src = s.src;
    } else {
      novoScript.textContent = s.textContent;
    }
    if (s.type) novoScript.type = s.type;
    document.body.appendChild(novoScript);
  }
}

// Inicialização de snippet salvo
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('medsaude_aws_connect_snippet');
  if (saved) {
    const input = document.getElementById('aws-snippet-input');
    if (input) input.value = saved;
    try {
      injetarSnippetNoDocumento(saved);
    } catch (e) {
      console.warn('Erro ao carregar snippet salvo:', e);
    }
  }
});

function escaparHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// Exportações Globais
window.toggleChatWidget = toggleChatWidget;
window.abrirChatWidget = abrirChatWidget;
window.abrirChatComMensagem = abrirChatComMensagem;
window.abrirChatComMedico = abrirChatComMedico;
window.tratarEnvioMensagem = tratarEnvioMensagem;
window.enviarMensagemRapida = enviarMensagemRapida;
window.agendarDiretoViaChat = agendarDiretoViaChat;
window.toggleAwsConfigDrawer = toggleAwsConfigDrawer;
window.salvarEInjetarSnippetAws = salvarEInjetarSnippetAws;
