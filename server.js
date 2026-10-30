const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false,
  maxAge: 0,
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
}));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Caminhos dos dados (Arquitetura Angular / Assets)
const DATA_DIR = fs.existsSync(path.join(__dirname, 'src', 'assets', 'data'))
  ? path.join(__dirname, 'src', 'assets', 'data')
  : path.join(__dirname, 'public', 'data');

const ESPECIALISTAS_FILE = path.join(DATA_DIR, 'especialistas.json');
const AGENDAMENTOS_FILE = path.join(DATA_DIR, 'agendamentos.json');
const FAQ_FILE = path.join(DATA_DIR, 'faq_conhecimento.json');

// Helpers de leitura/escrita
function lerArquivoJson(caminho, defaultValue = []) {
  try {
    if (!fs.existsSync(caminho)) return defaultValue;
    const raw = fs.readFileSync(caminho, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Erro ao ler ${caminho}:`, err.message);
    return defaultValue;
  }
}

function salvarArquivoJson(caminho, dados) {
  try {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Erro ao salvar ${caminho}:`, err.message);
    return false;
  }
}

// ----------------- ROTAS DA API -----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    servico: 'Med+Saúde API - Demonstração Amazon Connect & Lex',
    turma: 'Escola da Nuvem - Grupo 6',
    horario: new Date().toISOString()
  });
});

// Listar especialistas com filtros
app.get('/api/especialistas', (req, res) => {
  const { especialidade, cidade, busca } = req.query;
  let lista = lerArquivoJson(ESPECIALISTAS_FILE);

  if (especialidade && especialidade !== 'todas') {
    lista = lista.filter(med => 
      med.especialidade.toLowerCase() === especialidade.toLowerCase()
    );
  }

  if (cidade && cidade !== 'todas') {
    lista = lista.filter(med => 
      med.cidade.toLowerCase() === cidade.toLowerCase()
    );
  }

  if (busca) {
    const q = busca.toLowerCase();
    lista = lista.filter(med => 
      med.nome.toLowerCase().includes(q) ||
      med.especialidade.toLowerCase().includes(q) ||
      med.bairro.toLowerCase().includes(q) ||
      med.cidade.toLowerCase().includes(q)
    );
  }

  res.json(lista);
});

// Listar especialidades únicas
app.get('/api/especialidades', (req, res) => {
  const lista = lerArquivoJson(ESPECIALISTAS_FILE);
  const esp = [...new Set(lista.map(m => m.especialidade))].sort();
  res.json(esp);
});

// Listar cidades únicas
app.get('/api/cidades', (req, res) => {
  const lista = lerArquivoJson(ESPECIALISTAS_FILE);
  const cidades = [...new Set(lista.map(m => m.cidade))].sort();
  res.json(cidades);
});

// Realizar agendamento
app.post('/api/agendamentos', (req, res) => {
  const { medicoId, pacienteNome, cpf, telefone, dataHorario, canalOrigem } = req.body;

  if (!medicoId || !pacienteNome || !dataHorario) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const especialistas = lerArquivoJson(ESPECIALISTAS_FILE);
  const medico = especialistas.find(m => m.id === medicoId);

  if (!medico) {
    return res.status(404).json({ error: 'Especialista não encontrado.' });
  }

  const agendamentos = lerArquivoJson(AGENDAMENTOS_FILE);
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
    canalOrigem: canalOrigem || 'Portal Web Med+Saúde',
    criadoEm: new Date().toISOString()
  };

  agendamentos.unshift(novoAgendamento);
  salvarArquivoJson(AGENDAMENTOS_FILE, agendamentos);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Consulta agendada com sucesso!',
    protocolo: `PROT-${Math.floor(100000 + Math.random() * 900000)}`,
    agendamento: novoAgendamento
  });
});

// Listar agendamentos recentes
app.get('/api/agendamentos', (req, res) => {
  const agendamentos = lerArquivoJson(AGENDAMENTOS_FILE);
  res.json(agendamentos);
});

// ----------------- MOTOR NLU DO CHATBOT (SIMULA AMAZON LEX + AMAZON Q) -----------------
app.post('/api/chat/message', (req, res) => {
  const { message, context } = req.body;
  const texto = (message || '').toLowerCase().trim();
  const especialistas = lerArquivoJson(ESPECIALISTAS_FILE);
  const faqs = lerArquivoJson(FAQ_FILE);

  let responseData = {
    intent: 'Fallback',
    reply: '',
    cards: [],
    requiresTransfer: false,
    context: context || {}
  };

  // 1. Intenção: Transbordo para Agente Humano N1
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
    return res.json(responseData);
  }

  // 2. Intenção: AgendarConsulta
  if (
    texto.includes('agendar') ||
    texto.includes('marcar') ||
    texto.includes('agendamento') ||
    texto.includes('marcar consulta')
  ) {
    responseData.intent = 'AgendarConsulta';

    // Se informou um médico específico pelo nome ou especialidade
    let medMatch = especialistas.find(m => texto.includes(m.nome.toLowerCase().split(' ')[1]?.toLowerCase() || 'xyz'));
    if (!medMatch) {
      // Pega qualquer cardiologista ou ortopedista se citado
      if (texto.includes('cardio')) medMatch = especialistas.find(m => m.especialidade === 'Cardiologia');
      else if (texto.includes('ortop')) medMatch = especialistas.find(m => m.especialidade === 'Ortopedia');
      else medMatch = especialistas[0];
    }

    responseData.reply = `Com certeza! Localizei horários disponíveis para agendamento com **${medMatch.nome}** (${medMatch.especialidade}). Escolha um dos horários abaixo para confirmarmos seu agendamento:`;
    responseData.cards = [medMatch];
    return res.json(responseData);
  }

  // 3. Intenção: ConsultarEspecialidade ou BuscarPorLocalidade
  let especialidadeDetectada = null;
  if (texto.includes('cardio') || texto.includes('coração')) especialidadeDetectada = 'Cardiologia';
  else if (texto.includes('ortop') || texto.includes('osso') || texto.includes('fratura')) especialidadeDetectada = 'Ortopedia';
  else if (texto.includes('pediat') || texto.includes('criança')) especialidadeDetectada = 'Pediatria';
  else if (texto.includes('derma') || texto.includes('pele')) especialidadeDetectada = 'Dermatologia';
  else if (texto.includes('gineco') || texto.includes('mulher')) especialidadeDetectada = 'Ginecologia e Obstetrícia';
  else if (texto.includes('clinico') || texto.includes('geral')) especialidadeDetectada = 'Clínica Geral';

  // Detecção de cidade
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
    return res.json(responseData);
  }

  // 4. Intenção: Amazon Q in Connect (Base de conhecimento)
  const faqMatch = faqs.find(f => 
    f.palavrasChave.some(k => texto.includes(k.toLowerCase()))
  );

  if (faqMatch) {
    responseData.intent = 'AmazonQ_KnowledgeSearch';
    responseData.reply = `ℹ️ **Base de Conhecimento Med+Saúde (Amazon Q in Connect):**\n\n${faqMatch.resposta}\n\n*Precisa de mais alguma informação ou deseja localizar um médico no Guia?*`;
    return res.json(responseData);
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
    responseData.reply = `Olá! Sou a **Arwen**, assistente virtual inteligente da **Med+Saúde** integrada ao **Amazon Connect & Amazon Lex**.\n\nComo posso ajudar você hoje?\n- 🩺 Consultar Guia Médico (ex: *"Preciso de cardiologista em Belém"*)\n- 📅 Agendar uma consulta médica\n- ❓ Tirar dúvidas de cobertura, carência ou boletos\n- 👤 Falar com um Atendente Humano N1`;
    return res.json(responseData);
  }

  // Fallback padrão
  responseData.reply = `Desculpe, não compreendi completamente a sua solicitação. Você pode me dizer qual especialidade médica procura (ex: *"cardiologista"* ou *"ortopedista"*), a cidade desejada, ou se preferir, digite **"humano"** para transferirmos para um atendente N1 no Amazon Connect.`;
  return res.json(responseData);
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🏥 Med+Saúde - Portal & Guia Médico Inteligente`);
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`🤖 Amazon Connect & Lex Hub: Online e Ativo`);
  console.log(`=======================================================`);
});
