/**
 * MED+SAÚDE - CHATBOT ARWEN & INTEGRAÇÃO AMAZON CONNECT (100% CLIENT-SIDE)
 * Motor NLU simulando Amazon Lex + Amazon Q in Connect
 * Permite execução estática pura (HTML/CSS/JS) sem necessidade de servidor
 */

let chatAberto = false;
let historicoChat = [];

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
  enviarMensagemRapida(`Gostaria de agendar consulta com ${medico.nome} (${medico.especialidade})`);
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

  // Processa resposta NLU local (simulando Amazon Lex / Amazon Q) em 450ms
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

// 3. Motor NLU Client-Side (Amazon Lex + Amazon Q)
function processarMensagemLexClientSide(textoOriginal) {
  const texto = (textoOriginal || '').toLowerCase().trim();
  const especialistas = window.ESPECIALISTAS_DATA || [];
  const faqs = window.FAQ_CONHECIMENTO_DATA || [];

  let responseData = {
    intent: 'Fallback',
    reply: '',
    cards: [],
    requiresTransfer: false
  };

  // 1. Transbordo Agente N1
  if (
    texto.includes('humano') ||
    texto.includes('atendente') ||
    texto.includes('falar com pessoa') ||
    texto.includes('reclamação') ||
    texto.includes('transbordo') ||
    texto.includes('atendente n1') ||
    texto.includes('falar com alguém')
  ) {
    responseData.intent = 'TransbordoAgenteN1';
    responseData.requiresTransfer = true;
    responseData.reply = `Entendido! Estou transferindo o seu atendimento para um **Agente Humano N1** no Amazon Connect. Todo o seu histórico e contexto da conversa foram preservados para o atendente. Por favor, aguarde na linha. 🎧`;
    return responseData;
  }

  // 2. Agendar Consulta
  if (
    texto.includes('agendar') ||
    texto.includes('marcar') ||
    texto.includes('agendamento') ||
    texto.includes('marcar consulta')
  ) {
    responseData.intent = 'AgendarConsulta';
    let medMatch = especialistas.find(m => texto.includes(m.nome.toLowerCase().split(' ')[1]?.toLowerCase() || 'xyz'));
    if (!medMatch) {
      if (texto.includes('cardio')) medMatch = especialistas.find(m => m.especialidade === 'Cardiologia');
      else if (texto.includes('ortop')) medMatch = especialistas.find(m => m.especialidade === 'Ortopedia');
      else medMatch = especialistas[0];
    }

    responseData.reply = `Com certeza! Localizei horários disponíveis para agendamento com **${medMatch.nome}** (${medMatch.especialidade}). Escolha um dos horários abaixo para confirmarmos seu agendamento:`;
    responseData.cards = [medMatch];
    return responseData;
  }

  // 3. ConsultarEspecialidade e BuscarPorLocalidade
  let especialidadeDetectada = null;
  if (texto.includes('cardio') || texto.includes('coração')) especialidadeDetectada = 'Cardiologia';
  else if (texto.includes('ortop') || texto.includes('osso') || texto.includes('fratura')) especialidadeDetectada = 'Ortopedia';
  else if (texto.includes('pediat') || texto.includes('criança')) especialidadeDetectada = 'Pediatria';
  else if (texto.includes('derma') || texto.includes('pele')) especialidadeDetectada = 'Dermatologia';
  else if (texto.includes('gineco') || texto.includes('mulher')) especialidadeDetectada = 'Ginecologia e Obstetrícia';
  else if (texto.includes('clinico') || texto.includes('geral')) especialidadeDetectada = 'Clínica Geral';

  let cidadeDetectada = null;
  if (texto.includes('belém') || texto.includes('belem') || texto.includes('pará') || texto.includes('para')) cidadeDetectada = 'Belém';
  else if (texto.includes('são paulo') || texto.includes('sao paulo') || texto.includes('sp')) cidadeDetectada = 'São Paulo';
  else if (texto.includes('rio') || texto.includes('rj')) cidadeDetectada = 'Rio de Janeiro';
  else if (texto.includes('belo horizonte') || texto.includes('bh')) cidadeDetectada = 'Belo Horizonte';
  else if (texto.includes('brasília') || texto.includes('brasilia') || texto.includes('df')) cidadeDetectada = 'Brasília';

  if (especialidadeDetectada || cidadeDetectada) {
    responseData.intent = especialidadeDetectada && cidadeDetectada ? 'BuscarPorLocalidadeEEspecialidade' : (especialidadeDetectada ? 'ConsultarEspecialidade' : 'BuscarPorLocalidade');

    let filtrados = especialistas;
    if (especialidadeDetectada) {
      filtrados = filtrados.filter(m => m.especialidade.toLowerCase() === especialidadeDetectada.toLowerCase());
    }
    if (cidadeDetectada) {
      filtrados = filtrados.filter(m => m.cidade.toLowerCase() === cidadeDetectada.toLowerCase());
    }

    if (filtrados.length > 0) {
      const termoEsp = especialidadeDetectada ? `de **${especialidadeDetectada}**` : 'especialistas';
      const termoCid = cidadeDetectada ? ` em **${cidadeDetectada}**` : '';
      responseData.reply = `Encontrei ${filtrados.length} ${filtrados.length > 1 ? 'médicos credenciados' : 'médico credenciado'} ${termoEsp}${termoCid} no Guia Médico Med+Saúde. Você pode agendar diretamente clicando abaixo:`;
      responseData.cards = filtrados;
    } else {
      responseData.reply = `Não localizei especialistas com esses filtros específicos no momento. Posso sugerir profissionais em cidades próximas ou transferir para nossa central humana N1.`;
    }
    return responseData;
  }

  // 4. Amazon Q in Connect (Base de conhecimento)
  const faqMatch = faqs.find(f => 
    f.palavrasChave.some(k => texto.includes(k.toLowerCase()))
  );

  if (faqMatch) {
    responseData.intent = 'AmazonQ_KnowledgeSearch';
    responseData.reply = `ℹ️ **Base de Conhecimento Med+Saúde (Amazon Q in Connect):**\n\n${faqMatch.resposta}\n\n*Precisa de mais alguma informação ou deseja localizar um médico no Guia?*`;
    return responseData;
  }

  // 5. Saudações
  if (
    texto.includes('olá') ||
    texto.includes('ola') ||
    texto.includes('oi') ||
    texto.includes('bom dia') ||
    texto.includes('boa tarde') ||
    texto.includes('boa noite') ||
    texto === 'começar'
  ) {
    responseData.intent = 'Saudacao';
    responseData.reply = `Olá! Sou a **Arwen**, sua assistente virtual da **Med+Saúde**.\n\nComo posso lhe ajudar hoje?`;
    return responseData;
  }

  // Fallback
  responseData.reply = `Desculpe, não compreendi completamente a sua solicitação. Você pode me dizer qual especialidade médica procura (ex: *"cardiologista"* ou *"ortopedista"*), a cidade desejada, ou se preferir, digite **"humano"** para transferirmos para um atendente N1 no Amazon Connect.`;
  return responseData;
}

// 4. Renderização de Mensagens
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
    .replace(/`(.*?)`/g, '<code style="background: rgba(0,0,0,0.1); padding: 2px 4px; border-radius: 4px;">$1</code>')
    .replace(/\n/g, '<br>');
}

function adicionarRespostaBot(data) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot';

  let conteudoHtml = `<div class="msg-bubble">${formatarMarkdown(data.reply)}`;

  // Transbordo N1
  if (data.requiresTransfer) {
    conteudoHtml += `
      <div class="transfer-alert-box" style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.4); border-radius: 6px; padding: 0.75rem; margin-top: 0.5rem; font-family: var(--font-tech); font-size: 0.78rem;">
        <strong style="display: block; color: #fda4af;"><i class="fa-solid fa-headset"></i> Transbordo N1 Ativado</strong>
        Preservando parâmetros da conversa:
        <br>• Protocolo Connect: #AC-${Date.now().toString().slice(-5)}
        <br>• Fila: Suporte N1 Especialidades
        <br>• Status: Chamando operador humano...
      </div>
    `;
  }

  // Cards de especialistas
  if (data.cards && data.cards.length > 0) {
    conteudoHtml += `<div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">`;
    data.cards.forEach(med => {
      const horarioDisponivel = (med.proximosHorarios && med.proximosHorarios.length > 0) ? med.proximosHorarios[0] : 'Hoje';
      conteudoHtml += `
        <div style="background: var(--card-bg-subtle); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.65rem;">
          <strong style="color: var(--primary); font-size: 0.85rem; font-family: var(--font-retro);">${med.nome}</strong>
          <div style="font-size: 0.78rem; color: var(--text-secondary); font-family: var(--font-tech);">${med.especialidade} • CRM ${med.crm || 'N/A'}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin: 0.2rem 0;">${med.cidade || ''}/${med.uf || ''} (${med.bairro || 'Centro'})</div>
          <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; font-family: var(--font-tech);">Disponível: ${horarioDisponivel}</div>
          <div style="display: flex; gap: 0.4rem; margin-top: 0.45rem;">
            <button class="quick-btn" style="background: var(--primary); color: #ffffff; font-weight: 700;" onclick="agendarDiretoViaChat('${med.id}', '${med.nome}', '${horarioDisponivel}')">
              Confirmar ${horarioDisponivel}
            </button>
            <button class="quick-btn" onclick="abrirModalAgendamento('${med.id}')">
              Outros Horários
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
      <i class="fa-solid fa-circle-notch fa-spin"></i> Arwen está consultando o Guia Médico...
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
  const nomePaciente = prompt("Por favor, digite seu Nome Completo para confirmar o agendamento:", "Beneficiário Fictício");
  if (!nomePaciente) return;

  const protocolo = `PROT-${Math.floor(100000 + Math.random() * 900000)}`;
  const novoAgendamento = {
    id: `agend-${Date.now().toString().slice(-6)}`,
    medicoId,
    medicoNome,
    pacienteNome: nomePaciente,
    cpf: "123.456.789-00",
    telefone: '(91) 98765-4321',
    dataHorario: horario,
    canalOrigem: 'Chat Bot Arwen (Client-side)',
    protocolo,
    criadoEm: new Date().toISOString()
  };

  const historico = JSON.parse(localStorage.getItem('medsaude_agendamentos') || '[]');
  historico.unshift(novoAgendamento);
  localStorage.setItem('medsaude_agendamentos', JSON.stringify(historico));

  adicionarRespostaBot({
    reply: `🎉 **Agendamento Confirmado via Chatbot!**\n\n- **Protocolo:** \`${protocolo}\`\n- **Médico:** ${medicoNome}\n- **Data/Horário:** ${horario}\n- **Beneficiário:** ${nomePaciente}\n\nLembrete registrado com sucesso. Deseja consultar mais alguma especialidade no Guia?`
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
  alert('Snippet do Amazon Connect injetado com sucesso!');
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
