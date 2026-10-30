/**
 * MED+SAÚDE - BASE DE CONHECIMENTO NACIONAL & GUIA MÉDICO (CLIENT-SIDE)
 * Sincronizado com os dados oficiais do Amazon S3, Amazon Connect e Amazon Q
 * Base Oficial 5 Regiões do Brasil (25 Especialistas Credenciados)
 */

window.ESPECIALISTAS_DATA = [
  {
    "id": "MED-001",
    "nome": "Dra. Ana Carolina Silva",
    "crm": "CRM-PR 28.490",
    "rqe": "RQE 18.230",
    "especialidade": "Cardiologia",
    "regiao": "Sul",
    "subespecialidades": [
      "Cardiologia Clínica",
      "Arritmias Cardíacas",
      "Hipertensão Arterial Resistente",
      "Avaliação de Risco Cirúrgico",
      "Prevenção Coronariana"
    ],
    "endereco": "Av. Cândido de Abreu, 526 - Torre Corporate, Sala 804 - Centro Cívico",
    "bairro": "Centro Cívico",
    "cidade": "Curitiba",
    "uf": "PR",
    "cep": "80530-000",
    "localidade": "Curitiba - PR",
    "ponto_referencia": "Em frente ao Palácio das Araucárias e a 200m do Shopping Mueller",
    "telefone": "(41) 3254-8900",
    "whatsapp": "(41) 99123-4501",
    "disponibilidade": "Segunda a Quinta: 08:15, 08:30, 09:00, 09:30, 10:15, 11:00, 14:15, 15:30",
    "proximosHorarios": [
      "Amanhã às 08:30",
      "Amanhã às 10:15",
      "Quinta-feira às 14:15"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Edifício 100% acessível, rampa frontal suave, elevadores para macas e cadeiras de rodas, sanitários adaptados e serviço de auxílio na portaria."
    },
    "exames_e_procedimentos": [
      "Eletrocardiograma (ECG de repouso) com laudo imediato",
      "Teste Ergométrico Computadorizado em Esteira",
      "Holter 24 Horas Digital",
      "MAPA 24 Horas (Monitorização Ambulatorial da Pressão Arterial)",
      "Ecocardiograma Transtorácico com Doppler Colorido"
    ],
    "sintomas_e_queixas": [
      "dor no peito",
      "aperto no coração",
      "palpitação",
      "taquicardia",
      "coração acelerado",
      "pressão alta",
      "hipertensão",
      "cansaço fácil ao caminhar",
      "falta de ar aos esforços",
      "tontura ao levantar",
      "inchaço nos tornozelos e pernas",
      "check-up cardiológico preventivo",
      "risco cirúrgico pré-operatório"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed",
      "Bradesco Saúde",
      "Amil",
      "SulAmérica"
    ],
    "preparo_consulta": "Chegar com 15 minutos de antecedência. Trazer documento oficial com foto, carteirinha do convênio e exames cardiológicos anteriores (ECG, exames de sangue recentes). Para o Teste Ergométrico: vir com roupas esportivas leves e tênis, e não ingerir cafeína nas 4 horas anteriores.",
    "avaliacao": 4.9
  },
  {
    "id": "MED-002",
    "nome": "Dr. Carlos Eduardo Mendonça",
    "crm": "CRM-PR 22.115",
    "rqe": "RQE 14.508",
    "especialidade": "Ortopedia",
    "regiao": "Sul",
    "subespecialidades": [
      "Ortopedia Geral e Traumatologia",
      "Cirurgia do Joelho e Artroscopia",
      "Ortopedia Geriátrica (Artrose e Osteoporose)",
      "Patologias da Coluna Vertebral",
      "Trauma do Idoso e Prevenção de Quedas"
    ],
    "endereco": "Rua XV de Novembro, 1280 - Centro Médico Curitiba, 3º Andar - Centro",
    "bairro": "Centro",
    "cidade": "Curitiba",
    "uf": "PR",
    "cep": "80060-000",
    "localidade": "Curitiba - PR",
    "ponto_referencia": "Próximo à Praça Osório e em frente ao Edifício Avenida, com estacionamento conveniado ao lado",
    "telefone": "(41) 3322-7711",
    "whatsapp": "(41) 99123-4502",
    "disponibilidade": "Terça e Quinta: 08:15, 08:45, 09:15, 10:30 | Sábado: 08:30, 09:00, 09:30, 10:15",
    "proximosHorarios": [
      "Terça-feira às 08:45",
      "Terça-feira às 10:30",
      "Quinta-feira às 09:15"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Especialmente adaptado para idosos e pacientes com mobilidade reduzida: vaga de parada rápida para desembarque em frente à portaria, cadeiras de rodas higienizadas disponíveis, sem degraus até os elevadores duplos."
    },
    "exames_e_procedimentos": [
      "Radiografia Digital (Raio-X de ossos e articulações no próprio andar)",
      "Imobilizações Ortopédicas (gesso tradicional, sintético leve e talas)",
      "Infiltração Intra-articular de Joelho e Ombro (Ácido Hialurônico e Corticoide)",
      "Punção Articular Diagnóstica e Alívio de Derrame (Artrocentese)",
      "Prescrição e Ajuste de Órteses, Bengalas e Andadores"
    ],
    "sintomas_e_queixas": [
      "dor no joelho",
      "estalo no joelho ao dobrar",
      "dificuldade para andar",
      "dor na coluna lombar",
      "lombalgia",
      "bico de papagaio",
      "dor no quadril ao sentar ou levantar",
      "queda de idoso",
      "suspeita de fratura",
      "dor no ombro",
      "bursite",
      "tendinite",
      "artrose e osteoartrite",
      "osteoporose",
      "inchaço articular"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed",
      "Bradesco Saúde",
      "Amil",
      "SulAmérica"
    ],
    "preparo_consulta": "Trazer exames de imagem prévios (Radiografias, Tomografias ou Ressonâncias Magnéticas), lista de remédios habituais e documento oficial com foto. Para queixas de membros inferiores (joelho/quadril), usar bermuda ou roupa confortável para exame físico.",
    "avaliacao": 4.95
  },
  {
    "id": "MED-003",
    "nome": "Dra. Juliana Mendes",
    "crm": "CRM-PR 31.020",
    "rqe": "RQE 20.145",
    "especialidade": "Pediatria",
    "regiao": "Sul",
    "subespecialidades": [
      "Puericultura e Crescimento Infantil",
      "Alergias Respiratórias na Infância",
      "Infectologia Pediátrica",
      "Vacinação e Imunização"
    ],
    "endereco": "Rua Sete de Setembro, 4200 - Batel Medical Plaza, Conjunto 401 - Batel",
    "bairro": "Batel",
    "cidade": "Curitiba",
    "uf": "PR",
    "cep": "80240-000",
    "localidade": "Curitiba - PR",
    "ponto_referencia": "A 100m da Praça do Japão e próximo ao Hospital Pequeno Príncipe",
    "telefone": "(41) 3018-9200",
    "whatsapp": "(41) 99123-4503",
    "disponibilidade": "Segunda a Sexta: 08:00, 08:15, 08:30, 09:15, 10:00, 13:30, 14:15, 15:00",
    "proximosHorarios": [
      "Amanhã às 08:15",
      "Amanhã às 10:00",
      "Quarta-feira às 13:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": false,
      "descricao": "Espaço kids lúdico, trocador infantil, rampa de acesso para carrinhos de bebê e elevadores amplos."
    },
    "exames_e_procedimentos": [
      "Avaliação Antropométrica e Curvas de Crescimento OMS",
      "Oto-oftalmoscopia pediátrica",
      "Orientação Nutricional e Introdução Alimentar",
      "Aplicação e Atualização da Caderneta de Vacinação"
    ],
    "sintomas_e_queixas": [
      "febre em bebê e criança",
      "tosse e chiado no peito",
      "dificuldade para respirar",
      "vômito e diarreia infantil",
      "manchas vermelhas na pele (brotoejas/alergia)",
      "falta de apetite",
      "atraso no desenvolvimento ou fala",
      "consulta de rotina de recém-nascido (puericultura)"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Trazer a Caderneta de Saúde da Criança (Vacinação), exames do pré-natal/parto caso seja recém-nascido e documento do responsável legal.",
    "avaliacao": 4.88
  },
  {
    "id": "MED-004",
    "nome": "Dr. Marcelo Dornelles",
    "crm": "CRM-RS 29.814",
    "rqe": "RQE 17.650",
    "especialidade": "Pneumologia",
    "regiao": "Sul",
    "subespecialidades": [
      "Pneumologia Geral",
      "Asma e Bronquite Crônica",
      "DPOC e Enfisema Pulmonar",
      "Apneia Obstrutiva do Sono",
      "Infecções Respiratórias Pós-Virais"
    ],
    "endereco": "Av. Ipiranga, 6681 - Centro Clínico PUCRS, Prédio 32, Sala 504 - Partenon",
    "bairro": "Partenon",
    "cidade": "Porto Alegre",
    "uf": "RS",
    "cep": "90619-900",
    "localidade": "Porto Alegre - RS",
    "ponto_referencia": "Complexo da PUCRS, próximo ao Hospital São Lucas",
    "telefone": "(51) 3320-3000",
    "whatsapp": "(51) 98114-5501",
    "disponibilidade": "Segunda a Quinta: 08:30, 09:15, 10:00, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:15",
      "Quinta-feira às 14:00",
      "Sexta-feira às 10:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Complexo hospitalar universitário com acessibilidade total, sanitários adaptados e transporte interno de macas."
    },
    "exames_e_procedimentos": [
      "Espirometria Computadorizada (Prova de Função Pulmonar com broncodilatador)",
      "Oximetria Noturna e Teste de Caminhada de 6 Minutos",
      "Titulação de CPAP para Apneia do Sono",
      "Nebulização Terapêutica com broncodilatadores"
    ],
    "sintomas_e_queixas": [
      "falta de ar constante",
      "tosse seca persistente há mais de 3 semanas",
      "tosse com catarro",
      "chiado no peito",
      "cansaço ao subir escadas",
      "fumante com falta de ar",
      "ronco alto e sonolência diurna",
      "sequelas pulmonares respiratórias"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed Porto Alegre",
      "Bradesco Saúde",
      "SulAmérica"
    ],
    "preparo_consulta": "Não utilizar broncodilatadores de alívio rápido (bombinhas) 6 horas antes da consulta caso vá realizar espirometria, exceto sob orientação médica urgente. Trazer Raio-X ou Tomografia de Tórax anteriores.",
    "avaliacao": 4.92
  },
  {
    "id": "MED-005",
    "nome": "Dra. Fernanda Becker",
    "crm": "CRM-SC 24.110",
    "rqe": "RQE 16.920",
    "especialidade": "Dermatologia",
    "regiao": "Sul",
    "subespecialidades": [
      "Dermatologia Clínica e Oncológica",
      "Mapeamento de Pintas e Nevos",
      "Dermatite de Contato e Alergias Cutâneas",
      "Tratamento de Psoríase e Vitiligo"
    ],
    "endereco": "Rua Menino Deus, 63 - Baía Sul Medical Center, Sala 302 - Centro",
    "bairro": "Centro",
    "cidade": "Florianópolis",
    "uf": "SC",
    "cep": "88020-210",
    "localidade": "Florianópolis - SC",
    "ponto_referencia": "Ao lado do Hospital de Caridade e próximo à Ponte Hercílio Luz",
    "telefone": "(48) 3229-8000",
    "whatsapp": "(48) 98455-7722",
    "disponibilidade": "Segunda, Quarta e Sexta: 08:30, 09:30, 11:00, 14:15, 16:00",
    "proximosHorarios": [
      "Amanhã às 09:30",
      "Quarta-feira às 14:15",
      "Sexta-feira às 11:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Centro médico moderno com estacionamento rotativo coberto, acesso plano sem degraus e elevadores amplos."
    },
    "exames_e_procedimentos": [
      "Dermatoscopia Digital e Mapeamento Corporal",
      "Biópsia de Pele por Punch e Shaving",
      "Crioterapia com Nitrogênio Líquido para Ceratoses",
      "Eletrocoagulação de Lesões Benignas"
    ],
    "sintomas_e_queixas": [
      "pinta crescendo ou sangrando",
      "mancha escura irregular na pele",
      "coceira crônica",
      "alergia a protetor solar ou produtos",
      "placas vermelhas descamativas (psoríase)",
      "queda acentuada de cabelo e alopecia",
      "micoses de unhas e pés"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Grande Florianópolis",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Comparecer sem maquiagem facial ou esmaltes escuros nas unhas para facilitar a inspeção clínica de lesões.",
    "avaliacao": 4.87
  },
  {
    "id": "MED-006",
    "nome": "Dr. Ricardo Kenji Takahashi",
    "crm": "CRM-SP 145.890",
    "rqe": "RQE 78.410",
    "especialidade": "Cardiologia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Cardiologia Intervencionista",
      "Doença Coronariana e Pós-Infarto",
      "Insuficiência Cardíaca Avançada",
      "Check-up Executivo Preventivo"
    ],
    "endereco": "Av. Paulista, 1842 - Edifício Cetenco Plaza, Torre Norte, 12º Andar - Bela Vista",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "01310-200",
    "localidade": "São Paulo - SP",
    "ponto_referencia": "A 100m da Estação Trianon-Masp do Metrô e em frente ao Parque Tenente Siqueira Campos",
    "telefone": "(11) 3145-9000",
    "whatsapp": "(11) 99887-1001",
    "disponibilidade": "Segunda a Sexta: 07:30, 08:30, 10:00, 13:30, 15:00, 16:30",
    "proximosHorarios": [
      "Hoje às 15:00",
      "Amanhã às 08:30",
      "Amanhã às 13:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Torre corporativa AAA com acesso facilitado para cadeirantes, heliponto, elevadores inteligentes e equipe de socorristas no condomínio."
    },
    "exames_e_procedimentos": [
      "Ecocardiograma Transtorácico e Transesofágico 3D",
      "Teste Ergométrico Computadorizado com Eletrodos Digitais",
      "Monitorização Ambulatorial da Pressão Arterial (MAPA)",
      "Avaliação e Programação de Marcapasso Cardíaco"
    ],
    "sintomas_e_queixas": [
      "dor no peito irradiando para o braço esquerdo",
      "falta de ar ao deitar",
      "palpitações fortes no peito",
      "pressão alta sem controle",
      "histórico familiar de infarto precoce",
      "inchaço nas pernas e abdômen",
      "liberação para atividades físicas de alto rendimento"
    ],
    "convenios_atendidos": [
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Bradesco Saúde Top Nacional",
      "SulAmérica Especial",
      "Amil One",
      "Omint"
    ],
    "preparo_consulta": "Trazer exames cardiológicos anteriores (cateterismo, angiotomografia, ecocardiogramas e exames de sangue recentes de perfil lipídico). Jejum de 4h caso realize ecocardiograma com Doppler.",
    "avaliacao": 4.98
  },
  {
    "id": "MED-007",
    "nome": "Dra. Beatriz Helena Toledo",
    "crm": "CRM-SP 162.340",
    "rqe": "RQE 89.120",
    "especialidade": "Neurologia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Neurologia Geral e Cognitiva",
      "Doença de Alzheimer e Outras Demências",
      "Doença de Parkinson e Tremores",
      "Enxaqueca e Cefaleias Crônicas",
      "AVC e Prevenção Secundária"
    ],
    "endereco": "Rua Oscar Freire, 2250 - Jardins Medical Hub, Sala 701 - Cerqueira César",
    "bairro": "Jardins",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "05409-012",
    "localidade": "São Paulo - SP",
    "ponto_referencia": "Próximo ao Hospital das Clínicas (FMUSP) e à Estação Clínicas do Metrô",
    "telefone": "(11) 3060-4400",
    "whatsapp": "(11) 99887-1002",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:30, 11:00, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:30",
      "Quinta-feira às 11:00",
      "Sexta-feira às 14:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Consultório projetado para pacientes neurológicos e idosos, iluminação suave anti-enxaqueca, piso antiderrapante e apoio para marcha."
    },
    "exames_e_procedimentos": [
      "Eletroneuromiografia de Membros Superiores e Inferiores",
      "Eletroencefalograma Digital em Vigília e Sono",
      "Aplicação de Toxina Botulínica Terapêutica para Espasticidade e Enxaqueca",
      "Avaliação Neurocognitiva Breve (MEEM, MoCA)"
    ],
    "sintomas_e_queixas": [
      "esquecimento frequente e perda de memória",
      "dor de cabeça forte com náusea e intolerância à luz",
      "tremor nas mãos em repouso",
      "tontura e desequilíbrio ao caminhar",
      "dormência ou fraqueza súbita em um lado do corpo",
      "crises convulsivas e desmaios",
      "dificuldade para articular palavras"
    ],
    "convenios_atendidos": [
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed Central Nacional",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Trazer Tomografias ou Ressonâncias Magnéticas de Crânio em mídia digital ou filmes. Caso seja paciente idoso com perda de memória, é indispensável a presença de um familiar ou cuidador próximo.",
    "avaliacao": 4.96
  },
  {
    "id": "MED-008",
    "nome": "Dr. Fernando Rocha",
    "crm": "CRM-SP 151.720",
    "rqe": "RQE 72.800",
    "especialidade": "Ortopedia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Cirurgia da Coluna Vertebral",
      "Hérnia de Disco e Escoliose",
      "Tratamento da Dor Crônica Lombar",
      "Traumatologia do Esporte"
    ],
    "endereco": "Rua Domingos de Morais, 2187 - Vila Mariana Medical Center, Sala 410 - Vila Mariana",
    "bairro": "Vila Mariana",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "04035-000",
    "localidade": "São Paulo - SP",
    "ponto_referencia": "A 50m da Estação Santa Cruz do Metrô e Shopping Santa Cruz",
    "telefone": "(11) 5080-6000",
    "whatsapp": "(11) 99887-1003",
    "disponibilidade": "Terça e Sexta: 08:00, 09:00, 10:30, 13:30, 15:00",
    "proximosHorarios": [
      "Terça-feira às 09:00",
      "Terça-feira às 13:30",
      "Sexta-feira às 10:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Infraestrutura adaptada para macas e cadeirantes, maca hospitalar articulada elétrica para exame físico da coluna."
    },
    "exames_e_procedimentos": [
      "Bloqueio Epidural Lombar Guiado por Fluoroscopia para Dor",
      "Rizotomia por Radiofrequência de Coluna",
      "Infiltração Sacroilíaca com Corticoide de Depósito",
      "Raio-X de Coluna Total com Carga no Local"
    ],
    "sintomas_e_queixas": [
      "dor no meio das costas",
      "dor na lombar descendo para a perna (ciático)",
      "hérnia de disco com queimação",
      "travamento de coluna ao abaixar",
      "formigamento nos pés e perda de força",
      "dor no pescoço irradiando para os braços (cervicobraquialgia)"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Bradesco Saúde",
      "SulAmérica",
      "Porto Seguro Saúde"
    ],
    "preparo_consulta": "Trazer exames de Ressonância Magnética ou Tomografia da Coluna Vertebral recentes (menos de 1 ano). Vir com roupas confortáveis para mobilização articular.",
    "avaliacao": 4.91
  },
  {
    "id": "MED-009",
    "nome": "Dr. André Luiz Vasconcelos",
    "crm": "CRM-RJ 65.412",
    "rqe": "RQE 33.109",
    "especialidade": "Gastroenterologia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Gastroenterologia Clínica",
      "Doença do Refluxo Gastroesofágico (DRGE)",
      "Síndrome do Intestino Irritável (SII)",
      "Doenças Inflamatórias Intestinais (Crohn e Retocolite)",
      "Endoscopia Digestiva Alta e Colonoscopia"
    ],
    "endereco": "Av. das Américas, 3500 - Le Monde Office, Edifício Hong Kong, Sala 512 - Barra da Tijuca",
    "bairro": "Barra da Tijuca",
    "cidade": "Rio de Janeiro",
    "uf": "RJ",
    "cep": "22640-102",
    "localidade": "Rio de Janeiro - RJ",
    "ponto_referencia": "Próximo ao BarraShopping e à Estação BRT Lourenço Jorge",
    "telefone": "(21) 3540-7700",
    "whatsapp": "(21) 98765-2001",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:00, 10:30, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:00",
      "Quarta-feira às 14:00",
      "Quinta-feira às 10:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Condomínio comercial com acessibilidade PNE plena, suítes de recuperação pós-sedação e estacionamento com manobrista."
    },
    "exames_e_procedimentos": [
      "Endoscopia Digestiva Alta com Biópsia para Helicobacter pylori",
      "Colonoscopia Diagnóstica e Terapêutica (Polipectomia)",
      "Teste Respiratório para Intolerância a Lactose e Frutose",
      "Ultrassonografia de Abdômen Total"
    ],
    "sintomas_e_queixas": [
      "azia e queimação no peito/estômago",
      "refluxo de comida ácida",
      "dor de estômago e gastrite",
      "inchaço na barriga e gases excessivos",
      "diarreia crônica ou prisão de ventre persistente",
      "sangramento nas fezes",
      "náuseas recorrentes pós-refeição"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Bradesco Saúde",
      "SulAmérica",
      "Amil",
      "Unimed Rio"
    ],
    "preparo_consulta": "Caso vá agendar Endoscopia ou Colonoscopia no mesmo dia, é obrigatório seguir o protocolo de preparo prévio com dieta líquida e jejum absoluto de 8h com acompanhante maior de idade.",
    "avaliacao": 4.89
  },
  {
    "id": "MED-010",
    "nome": "Dra. Camila Guimarães Oliveira",
    "crm": "CRM-RJ 78.901",
    "rqe": "RQE 41.502",
    "especialidade": "Ginecologia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Ginecologia Geral e Preventiva",
      "Obstetrícia e Pré-Natal de Alto Risco",
      "Endometriose e Dor Pélvica Crônica",
      "Climatério e Menopausa (Terapia de Reposição Hormonal)"
    ],
    "endereco": "Rua Visconde de Pirajá, 550 - Edifício Top Center Ipanema, Sala 903 - Ipanema",
    "bairro": "Ipanema",
    "cidade": "Rio de Janeiro",
    "uf": "RJ",
    "cep": "22410-002",
    "localidade": "Rio de Janeiro - RJ",
    "ponto_referencia": "Em frente à Praça Nossa Senhora da Paz e ao lado do Metrô Ipanema",
    "telefone": "(21) 2512-8800",
    "whatsapp": "(21) 98765-2002",
    "disponibilidade": "Segunda a Sexta: 08:30, 09:30, 11:00, 13:30, 15:00",
    "proximosHorarios": [
      "Amanhã às 08:30",
      "Quarta-feira às 11:00",
      "Quinta-feira às 15:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": false,
      "descricao": "Ambiente acolhedor, consultório privativo para coleta de preventivo, rampa suave de acesso ao hall e elevadores duplos."
    },
    "exames_e_procedimentos": [
      "Coleta de Preventivo (Papanicolau em Meio Líquido)",
      "Colposcopia e Vulvoscopia com Biópsia",
      "Inserção e Retirada de DIU (Mirena, Kyleena e Cobre/Prata)",
      "Ultrassonografia Transvaginal e Pélvica Ginecológica",
      "Cardiotocografia Fetal de Repouso"
    ],
    "sintomas_e_queixas": [
      "menstruação irregular ou ausente",
      "cólica menstrual incapacitante",
      "dor pélvica durante relações sexuais",
      "calores da menopausa (fogachos)",
      "corrimento com coceira ou odor",
      "consulta de rotina preventiva anual",
      "acompanhamento de gravidez e pré-natal"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Bradesco Saúde",
      "Amil",
      "SulAmérica"
    ],
    "preparo_consulta": "Para exame preventivo Papanicolau: não estar no período menstrual, evitar relações sexuais e cremes vaginais nas 48h anteriores.",
    "avaliacao": 4.93
  },
  {
    "id": "MED-011",
    "nome": "Dr. Lucas Meireles Prado",
    "crm": "CRM-MG 89.440",
    "rqe": "RQE 45.109",
    "especialidade": "Clínica Geral",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Medicina Interna e Clínica Geral",
      "Acompanhamento de Doenças Crônicas",
      "Prevenção e Rastreio de Câncer",
      "Avaliação Pré-Operatória e Risco Cirúrgico"
    ],
    "endereco": "Av. do Contorno, 6200 - Pronto Atendimento Savassi Care, 4º Andar - Savassi",
    "bairro": "Savassi",
    "cidade": "Belo Horizonte",
    "uf": "MG",
    "cep": "30110-042",
    "localidade": "Belo Horizonte - MG",
    "ponto_referencia": "A duas quadras da Praça Diogo de Vasconcelos (Praça da Savassi) e ao lado do Pátio Savassi",
    "telefone": "(31) 3280-9900",
    "whatsapp": "(31) 99233-3001",
    "disponibilidade": "Segunda a Sexta: 07:30, 08:30, 09:30, 11:00, 13:30, 15:00, 16:30",
    "proximosHorarios": [
      "Hoje às 16:30",
      "Amanhã às 08:30",
      "Amanhã às 11:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Unidade ambulatorial com acesso em nível, triagem com poltronas confortáveis, elevadores de alta capacidade e equipe médica multidisciplinar."
    },
    "exames_e_procedimentos": [
      "Hemoglicoteste (Glicemia Capilar Imediata)",
      "Aferição de Pressão Arterial e Oximetria Digital",
      "Lavagem Otológica e Remoção de Cerúmen",
      "Curativos de Pequeno Porte e Suturas Simples",
      "Eletrocardiograma de Repouso com Laudo"
    ],
    "sintomas_e_queixas": [
      "cansaço crônico e fadiga",
      "dor no corpo e febre",
      "dor de garganta e resfriado",
      "infecção urinária (dor ao urinar)",
      "check-up anual de rotina",
      "controle de pressão alta e diabetes",
      "perda de peso sem motivo aparente",
      "laudo de saúde para trabalho ou academia"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed BH",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Trazer lista detalhada de medicamentos de uso contínuo com dosagens e exames laboratoriais realizados nos últimos 6 meses.",
    "avaliacao": 4.9
  },
  {
    "id": "MED-012",
    "nome": "Dra. Larissa Fonseca",
    "crm": "CRM-MG 76.510",
    "rqe": "RQE 38.920",
    "especialidade": "Endocrinologia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Endocrinologia e Metabologia",
      "Diabetes Mellitus Tipo 1 e Tipo 2",
      "Doenças da Tireoide (Hipotireoidismo, Nódulos)",
      "Obesidade e Síndrome Metabólica",
      "Osteoporose e Distúrbios do Cálcio"
    ],
    "endereco": "Rua Bernardo Guimarães, 2045 - Lourdes Medical Center, Sala 602 - Lourdes",
    "bairro": "Lourdes",
    "cidade": "Belo Horizonte",
    "uf": "MG",
    "cep": "30140-082",
    "localidade": "Belo Horizonte - MG",
    "ponto_referencia": "Próximo à Basílica de Nossa Senhora de Lourdes e Praça Marília de Dirceu",
    "telefone": "(31) 3335-5500",
    "whatsapp": "(31) 99233-3002",
    "disponibilidade": "Terça a Quinta: 08:30, 09:30, 10:30, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:30",
      "Quinta-feira às 10:30",
      "Sexta-feira às 14:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Edifício acessível, balança digital para pacientes bariátricos até 300kg com bioimpedância e recepção climatizada."
    },
    "exames_e_procedimentos": [
      "Bioimpedância Tetrapolar Computadorizada Médica (Composição Corporal)",
      "Punção Aspirativa por Agulha Fina (PAAF) de Tireoide",
      "Ajuste e Calibração de Sensores Contínuos de Glicemia (FreeStyle Libre)",
      "Mapeamento Metabólico Basal"
    ],
    "sintomas_e_queixas": [
      "sede excessiva e muita vontade de urinar",
      "dificuldade severa para emagrecer",
      "cansaço extremo e sono o dia todo (tireoide)",
      "queda de cabelo e unhas fracas",
      "ganho de peso rápido sem alteração na dieta",
      "nódulo palpável no pescoço",
      "glicemia alta em exames de rotina"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed BH",
      "Bradesco Saúde",
      "SulAmérica"
    ],
    "preparo_consulta": "Trazer exames laboratoriais recentes (Glicemia de jejum, Hemoglobina Glicada, TSH, T4 Livre, Perfil Lipídico) e caderno de monitorização de glicemia caso seja diabético.",
    "avaliacao": 4.94
  },
  {
    "id": "MED-013",
    "nome": "Dr. Rodrigo Calmon",
    "crm": "CRM-ES 12.440",
    "rqe": "RQE 9.870",
    "especialidade": "Oftalmologia",
    "regiao": "Sudeste",
    "subespecialidades": [
      "Oftalmologia Geral e Cirurgia de Catarata",
      "Cirurgia Refrativa a Laser (Miopia, Astigmatismo)",
      "Glaucoma Clínico e Cirúrgico",
      "Retina Clínica"
    ],
    "endereco": "Av. Nossa Senhora da Penha, 570 - Centro da Praia Shopping, Torre B, Sala 405 - Praia do Canto",
    "bairro": "Praia do Canto",
    "cidade": "Vitória",
    "uf": "ES",
    "cep": "29055-130",
    "localidade": "Vitória - ES",
    "ponto_referencia": "Em frente à Praça dos Namorados e próximo à Ponte Ayrton Senna",
    "telefone": "(27) 3325-1100",
    "whatsapp": "(27) 99911-4401",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:00, 10:15, 13:45, 15:00",
    "proximosHorarios": [
      "Amanhã às 09:00",
      "Quarta-feira às 13:45",
      "Quinta-feira às 10:15"
    ],
    "modalidade_atendimento": "Presencial",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Shopping com infraestrutura de estacionamento coberto, esteiras rolantes, elevadores e clínica adaptada para cadeirantes."
    },
    "exames_e_procedimentos": [
      "Tonometria de Aplanação (Medição de Pressão Intraocular)",
      "Mapeamento de Retina com Oftalmoscopia Indireta",
      "Topografia e Paquimetria Corneana Computadorizada",
      "Refração Computadorizada (Exame de Grau dos Óculos)",
      "Capsulotomia com Yag Laser para Limpeza de Lente Pós-Catarata"
    ],
    "sintomas_e_queixas": [
      "visão embaçada para longe ou perto",
      "dificuldade para ler de perto (vista cansada)",
      "olhos vermelhos, coceira e sensação de areia",
      "dor de cabeça após trabalhar no computador",
      "manchas escuras ou feixes de luz na visão",
      "histórico familiar de glaucoma e cegueira",
      "renovação de receita de óculos e lentes de contato"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Vitória",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Caso haja dilatação pupilar para mapeamento de retina, a visão ficará embaçada por 3 a 5 horas. É obrigatório vir com acompanhante e levar óculos escuros. Não dirigir após o exame.",
    "avaliacao": 4.88
  },
  {
    "id": "MED-014",
    "nome": "Dr. Thiago Barata Guimarães",
    "crm": "CRM-PA 14.892",
    "rqe": "RQE 9.140",
    "especialidade": "Cardiologia",
    "regiao": "Norte",
    "subespecialidades": [
      "Cardiologia Clínica e Ergometria",
      "Hipertensão Arterial e Síndrome Metabólica",
      "Ecocardiografia Avançada",
      "Reabilitação Cardiopulmonar"
    ],
    "endereco": "Av. Governador José Malcher, 1120 - Edifício Medical Center, Sala 604 - Nazaré",
    "bairro": "Nazaré",
    "cidade": "Belém",
    "uf": "PA",
    "cep": "66055-260",
    "localidade": "Belém - PA",
    "ponto_referencia": "A 200m da Basílica Santuário de Nossa Senhora de Nazaré e ao lado da Praça Santuário",
    "telefone": "(91) 3244-8800",
    "whatsapp": "(91) 98122-9001",
    "disponibilidade": "Segunda a Sexta: 08:00, 09:00, 10:15, 11:30, 14:00, 15:30",
    "proximosHorarios": [
      "Hoje às 15:30",
      "Amanhã às 09:00",
      "Amanhã às 10:15"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Edifício médico tradicional com rampa de acesso frontal na Av. José Malcher, elevadores amplos e área para embarque/desembarque de idosos."
    },
    "exames_e_procedimentos": [
      "Eletrocardiograma de Repouso com Emissão Imediata",
      "Ecocardiograma Transtorácico com Doppler",
      "Teste Ergométrico Computadorizado",
      "MAPA 24 Horas e Holter Digital de Ritmo Cardíaco"
    ],
    "sintomas_e_queixas": [
      "pressão alta resistente",
      "dor no peito e pontadas",
      "coração disparado sem esforço",
      "cansaço fácil no calor úmido",
      "falta de ar ao caminhar",
      "inchaço nos pés",
      "check-up anual do coração"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed Belém",
      "Bradesco Saúde",
      "SulAmérica",
      "Hapvida"
    ],
    "preparo_consulta": "Trazer exames laboratoriais anteriores e eletrocardiogramas prévios. Para o teste ergométrico, trajar roupas leves e tênis confortável.",
    "avaliacao": 4.97
  },
  {
    "id": "MED-015",
    "nome": "Dra. Mariana Vasconcelos Pinheiro",
    "crm": "CRM-PA 16.320",
    "rqe": "RQE 11.200",
    "especialidade": "Pediatria",
    "regiao": "Norte",
    "subespecialidades": [
      "Pediatria Geral e Neonatologia",
      "Doenças Febris da Infância",
      "Alergias e Rinite Pediátrica",
      "Acompanhamento de Crescimento e Puericultura"
    ],
    "endereco": "Travessa Dom Romualdo de Seixas, 1476 - Edifício Evolution, Sala 802 - Umarizal",
    "bairro": "Umarizal",
    "cidade": "Belém",
    "uf": "PA",
    "cep": "66055-200",
    "localidade": "Belém - PA",
    "ponto_referencia": "Esquina com a Rua Antônio Barreto, próximo ao Supermercado Líder Doca",
    "telefone": "(91) 3222-4411",
    "whatsapp": "(91) 98122-9002",
    "disponibilidade": "Segunda a Quinta: 08:30, 09:30, 10:30, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 08:30",
      "Amanhã às 14:00",
      "Quarta-feira às 09:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": false,
      "descricao": "Espaço kids humanizado e acolhedor, trocador infantil higienizado e rampa para carrinhos de bebê."
    },
    "exames_e_procedimentos": [
      "Avaliação de Desenvolvimento Físico e Psicomotor",
      "Aferição Antropométrica (Peso, Estatura, Perímetro Cefálico)",
      "Orientação Nutricional e Aleitamento Materno",
      "Revisão da Caderneta de Vacinação"
    ],
    "sintomas_e_queixas": [
      "febre alta em criança",
      "tosse com secreção e catarro",
      "crises de vômito e desidratação",
      "manchas e alergias na pele",
      "falta de ganho de peso em bebês",
      "gripe, sinusite e viroses infantis"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Belém",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Trazer a Caderneta de Vacinação da Criança e exames recentes de sangue ou fezes caso tenham sido solicitados anteriormente.",
    "avaliacao": 4.91
  },
  {
    "id": "MED-016",
    "nome": "Dr. Raimundo Nonato Farias",
    "crm": "CRM-PA 12.180",
    "rqe": "RQE 8.450",
    "especialidade": "Ortopedia",
    "regiao": "Norte",
    "subespecialidades": [
      "Traumatologia Geral",
      "Cirurgia do Joelho e Artroscopia",
      "Artrose e Lesões Ligamentares",
      "Trauma do Idoso"
    ],
    "endereco": "Av. Generalíssimo Deodoro, 1620 - Hospital Porto Dias / Centro Clínico - Nazaré",
    "bairro": "Nazaré",
    "cidade": "Belém",
    "uf": "PA",
    "cep": "66055-240",
    "localidade": "Belém - PA",
    "ponto_referencia": "Complexo Hospitalar Porto Dias, próximo à Praça Brasil",
    "telefone": "(91) 3084-3000",
    "whatsapp": "(91) 98122-9003",
    "disponibilidade": "Terça, Quinta e Sábado: 08:00, 09:00, 10:15, 14:00",
    "proximosHorarios": [
      "Terça-feira às 08:00",
      "Terça-feira às 10:15",
      "Quinta-feira às 09:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Acesso direto para macas e cadeirantes com vaga reservada para embarque/desembarque rápido de pacientes idosos."
    },
    "exames_e_procedimentos": [
      "Raio-X Digital Ortopédico no Local",
      "Infiltração Intra-articular com Ácido Hialurônico (Viscossuplementação)",
      "Punção de Derrame Articular (Artrocentese)",
      "Imobilização com Talas Ortopédicas e Gesso Sintético Leve"
    ],
    "sintomas_e_queixas": [
      "dor no joelho ao subir escadas",
      "inchaço e falseio no joelho",
      "dor no ombro e tendinite",
      "dor na lombar e costas",
      "queda em paciente idoso",
      "fraturas e torções articulares"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed Belém",
      "Bradesco Saúde",
      "SulAmérica"
    ],
    "preparo_consulta": "Trazer exames de Raio-X, Tomografia ou Ressonância Magnética prévios e usar vestimentas confortáveis que facilitem o exame físico da articulação afetada.",
    "avaliacao": 4.96
  },
  {
    "id": "MED-017",
    "nome": "Dra. Tatiana Amazonas Cruz",
    "crm": "CRM-AM 8.920",
    "rqe": "RQE 6.110",
    "especialidade": "Infectologia",
    "regiao": "Norte",
    "subespecialidades": [
      "Infectologia Clínica e Medicina Tropical",
      "Doenças Febris e Arboviroses (Dengue, Malária, Chikungunya)",
      "Infecções Respiratórias Crônicas",
      "Medicina do Viajante"
    ],
    "endereco": "Av. Djalma Batista, 1661 - Millennium Center, Torre Médica, Sala 905 - Chapada",
    "bairro": "Chapada",
    "cidade": "Manaus",
    "uf": "AM",
    "cep": "69050-010",
    "localidade": "Manaus - AM",
    "ponto_referencia": "Anexo ao Millennium Shopping e em frente ao Amazonas Shopping",
    "telefone": "(92) 3659-1000",
    "whatsapp": "(92) 98411-8800",
    "disponibilidade": "Segunda a Quinta: 08:30, 09:30, 11:00, 14:30, 16:00",
    "proximosHorarios": [
      "Amanhã às 09:30",
      "Quarta-feira às 14:30",
      "Quinta-feira às 11:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Condomínio comercial com elevadores amplos, sanitários adaptados e área para táxi/ambulância."
    },
    "exames_e_procedimentos": [
      "Testes Rápidos Imunológicos (Dengue, Malária, HIV, Hepatites)",
      "Coleta Sorológica e Microbiológica",
      "Prescrição e Atualização de Profilaxia Pré e Pós-Exposição",
      "Orientação de Vacinas para Regiões de Selva e Exterior"
    ],
    "sintomas_e_queixas": [
      "febre prolongada com dor no corpo e calafrios",
      "suspeita de malária ou dengue",
      "dores fortes nas articulações após febre",
      "feridas que não cicatrizam",
      "vacinação para viagens internacionais",
      "infecções recorrentes e baixa imunidade"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Manaus",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Trazer exames de hemograma, sorologias prévias e cartão de vacinação.",
    "avaliacao": 4.93
  },
  {
    "id": "MED-018",
    "nome": "Dr. Antônio Jorge Peixoto",
    "crm": "CRM-BA 21.440",
    "rqe": "RQE 14.120",
    "especialidade": "Cardiologia",
    "regiao": "Nordeste",
    "subespecialidades": [
      "Cardiologia Clínica e Hipertensão",
      "Avaliação de Risco Coronariano",
      "Cardiopatia em Idosos",
      "Insuficiência Cardíaca"
    ],
    "endereco": "Av. Tancredo Neves, 2539 - Edifício CEO Salvador Shopping, Torre Londres, Sala 1402 - Caminho das Árvores",
    "bairro": "Caminho das Árvores",
    "cidade": "Salvador",
    "uf": "BA",
    "cep": "41820-021",
    "localidade": "Salvador - BA",
    "ponto_referencia": "Integrado ao Salvador Shopping e próximo à Estação de Metrô Pernambués",
    "telefone": "(71) 3038-7000",
    "whatsapp": "(71) 98844-3301",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:15, 10:30, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 08:00",
      "Amanhã às 10:30",
      "Quinta-feira às 14:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Empreendimento com selo de acessibilidade total, múltiplos elevadores inteligentes, vagas preferenciais e serviço de cadeira de rodas."
    },
    "exames_e_procedimentos": [
      "Eletrocardiograma Digital com Laudo na Hora",
      "MAPA 24 Horas e Holter Digital",
      "Ecocardiograma Transtorácico com Doppler",
      "Risco Cirúrgico Cardiológico Rápido"
    ],
    "sintomas_e_queixas": [
      "dor ou queimação no peito",
      "pressão alta persistente",
      "palpitação no peito",
      "cansaço rápido e pernas pesadas",
      "tontura ao se levantar",
      "avaliação cardiológica antes de operar"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Bradesco Saúde",
      "SulAmérica",
      "Amil"
    ],
    "preparo_consulta": "Trazer exames laboratoriais prévios e lista com os remédios de uso diário.",
    "avaliacao": 4.95
  },
  {
    "id": "MED-019",
    "nome": "Dra. Cláudia Maria Cerqueira",
    "crm": "CRM-BA 19.820",
    "rqe": "RQE 12.980",
    "especialidade": "Geriatria",
    "regiao": "Nordeste",
    "subespecialidades": [
      "Geriatria Clínica e Medicina Preventiva do Idoso",
      "Prevenção de Quedas e Fragilidade",
      "Avaliação Geriátrica Ampla (AGA)",
      "Demências e Apoio Familiar"
    ],
    "endereco": "Av. Anita Garibaldi, 1133 - Centro Médico Alexander Fleming, Sala 501 - Ondina",
    "bairro": "Ondina",
    "cidade": "Salvador",
    "uf": "BA",
    "cep": "40170-130",
    "localidade": "Salvador - BA",
    "ponto_referencia": "Próximo ao Hospital Jorge Valente e à UFBA Garibaldi",
    "telefone": "(71) 3245-6600",
    "whatsapp": "(71) 98844-3302",
    "disponibilidade": "Segunda, Quarta e Sexta: 08:30, 09:45, 11:00, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:45",
      "Quarta-feira às 14:00",
      "Sexta-feira às 11:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Projetado exclusivamente para idosos: piso antiderrapante, barras de apoio, poltronas altas com braço, portas largas e sem degraus."
    },
    "exames_e_procedimentos": [
      "Avaliação Geriátrica Ampla Multidimensional (Cognição, Marcha e Humor)",
      "Teste de Velocidade de Marcha e Equilíbrio (Tinetti)",
      "Rastreamento de Sarcopenia e Perda de Massa Muscular",
      "Conciliação Medicamentosa e Redução de Polifarmácia"
    ],
    "sintomas_e_queixas": [
      "idoso com quedas frequentes e fraqueza nas pernas",
      "esquecimento e confusão mental",
      "perda de peso involuntária no idoso",
      "muitos remédios diferentes causando sonolência ou tontura",
      "tristeza, isolamento e desânimo no idoso",
      "planejamento de cuidados geriátricos continuados"
    ],
    "convenios_atendidos": [
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Bradesco Saúde",
      "SulAmérica"
    ],
    "preparo_consulta": "É altamente recomendável que o paciente idoso compareça acompanhado de um familiar ou cuidador principal, trazendo a 'sacola de medicamentos' com todas as caixas de remédios em uso.",
    "avaliacao": 4.97
  },
  {
    "id": "MED-020",
    "nome": "Dr. Eduardo Cavalcanti de Albuquerque",
    "crm": "CRM-PE 18.750",
    "rqe": "RQE 11.450",
    "especialidade": "Ortopedia",
    "regiao": "Nordeste",
    "subespecialidades": [
      "Cirurgia do Joelho e Artroplastia (Prótese)",
      "Lesões Meniscais e Ligamentares",
      "Ortopedia Regenerativa",
      "Artrose Severa"
    ],
    "endereco": "Rua Frei Matias Teves, 280 - Ilha do Leite Medical Center, 8º Andar - Ilha do Leite",
    "bairro": "Ilha do Leite",
    "cidade": "Recife",
    "uf": "PE",
    "cep": "50070-450",
    "localidade": "Recife - PE",
    "ponto_referencia": "Maior polo médico do Nordeste, ao lado do Hospital Esperança e Real Hospital Português",
    "telefone": "(81) 3421-9900",
    "whatsapp": "(81) 98722-1100",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:00, 10:30, 13:30, 15:00",
    "proximosHorarios": [
      "Amanhã às 09:00",
      "Quarta-feira às 13:30",
      "Quinta-feira às 10:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Polo médico com estacionamento rotativo, acesso nivelado para macas e cadeirantes e elevadores para transporte hospitalar."
    },
    "exames_e_procedimentos": [
      "Raio-X Digital Panorâmico de Membros Inferiores no Local",
      "Infiltração de Ácido Hialurônico e Corticoides no Joelho",
      "Artrocentese para Drenagem de Derrame Articular",
      "Curativos Pós-Cirúrgicos e Imobilizações Especiais"
    ],
    "sintomas_e_queixas": [
      "dor aguda no joelho ao dobrar ou agachar",
      "joelho travando ou estalando",
      "artrose avançada com perda de movimento",
      "inchaço crônico articular",
      "avaliação para prótese de joelho (artroplastia)"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Med+ Sênior Prata",
      "Unimed Recife",
      "Bradesco Saúde",
      "SulAmérica",
      "Amil"
    ],
    "preparo_consulta": "Trazer exames de imagem anteriores (Ressonância Magnética ou Radiografias). Vir com bermuda ou calça larga para exame clínico do joelho.",
    "avaliacao": 4.94
  },
  {
    "id": "MED-021",
    "nome": "Dr. Francisco Diogo Bezerra",
    "crm": "CRM-CE 16.990",
    "rqe": "RQE 10.330",
    "especialidade": "Otorrinolaringologia",
    "regiao": "Nordeste",
    "subespecialidades": [
      "Rinologia e Cirurgia Sinusal",
      "Desvio de Septo e Rinite Alérgica",
      "Tratamento de Ronco e Apneia",
      "Labirintite e Tonturas"
    ],
    "endereco": "Av. Santos Dumont, 5753 - Complexo São Mateus, Torre Office, Sala 1104 - Papicu",
    "bairro": "Papicu",
    "cidade": "Fortaleza",
    "uf": "CE",
    "cep": "60175-047",
    "localidade": "Fortaleza - CE",
    "ponto_referencia": "Próximo ao Shopping Riomar Fortaleza e ao Hospital São Mateus",
    "telefone": "(85) 3265-8000",
    "whatsapp": "(85) 98133-7700",
    "disponibilidade": "Segunda a Sexta: 08:30, 09:30, 11:00, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 08:30",
      "Quarta-feira às 11:00",
      "Quinta-feira às 14:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Complexo médico com recepção integrada, elevadores amplos, sanitários acessíveis e acesso plano direto."
    },
    "exames_e_procedimentos": [
      "Videonasolaringoscopia com Óptica Rígida e Flexível",
      "Remoção de Rolha de Cerúmen com Aspiração e Lavagem",
      "Audiometria Tonal e Vocal em Cabine Acústica",
      "Manobra de Reposicionamento Otolítico para Labirintite (Vppb)"
    ],
    "sintomas_e_queixas": [
      "nariz entupido constante e respiração bucal",
      "dor de cabeça e secreção amarelada (sinusite)",
      "ronco alto e sensação de sufocamento noturno",
      "tontura rotatória e zumbido no ouvido",
      "dor de garganta e rouquidão persistente"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Fortaleza",
      "Bradesco Saúde",
      "Amil",
      "Hapvida"
    ],
    "preparo_consulta": "Caso realize exame de videonasofibroscopia, jejum de 2 horas para evitar reflexo de vômito.",
    "avaliacao": 4.9
  },
  {
    "id": "MED-022",
    "nome": "Dr. Gustavo Henrique Lima",
    "crm": "CRM-DF 24.510",
    "rqe": "RQE 15.820",
    "especialidade": "Otorrinolaringologia",
    "regiao": "Centro-Oeste",
    "subespecialidades": [
      "Otorrinolaringologia Clínica e Cirúrgica",
      "Medicina do Sono e Ronco",
      "Cirurgia Endoscópica Nasossinusal",
      "Tratamento da Rinite Seca do Cerrado"
    ],
    "endereco": "SMHN Quadra 2, Bloco C - Edifício Dr. Crispim, 5º Andar - Asa Norte",
    "bairro": "Asa Norte",
    "cidade": "Brasília",
    "uf": "DF",
    "cep": "70710-149",
    "localidade": "Brasília - DF",
    "ponto_referencia": "Setor Médico Hospitalar Norte (SMHN), atrás do HRAN e próximo ao Shopping Conjunto Nacional",
    "telefone": "(61) 3328-7000",
    "whatsapp": "(61) 99188-4401",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:00, 10:30, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:00",
      "Quarta-feira às 10:30",
      "Quinta-feira às 14:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Edifício totalmente médico em Brasília com rampas adequadas à norma NBR 9050, elevadores com aviso sonoro e vagas reservadas."
    },
    "exames_e_procedimentos": [
      "Videonasofibroscopia Digital Flexível de Alta Definição",
      "Videoestroboscopia de Laringe para Avaliação de Cordas Vocais",
      "Cauterização Química e Eletrocautério para Sangramento Nasal (Epistaxe)",
      "Polissonografia Domiciliar Noturna"
    ],
    "sintomas_e_queixas": [
      "sangramento no nariz no período seco de Brasília",
      "congestão nasal crônica e rinite alérgica",
      "dificuldade para respirar e desvio de septo",
      "ronco alto, engasgos noturnos e apneia",
      "perda de olfato e paladar",
      "dor e pressão na testa/face"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Bradesco Saúde",
      "SulAmérica",
      "Amil",
      "Saúde Caixa",
      "Geap"
    ],
    "preparo_consulta": "Trazer Tomografia de Seios da Face caso possua. Evitar descongestionantes nasais tópicos 4 horas antes da consulta.",
    "avaliacao": 4.92
  },
  {
    "id": "MED-023",
    "nome": "Dra. Helena Albuquerque Siqueira",
    "crm": "CRM-DF 26.190",
    "rqe": "RQE 17.400",
    "especialidade": "Psiquiatria",
    "regiao": "Centro-Oeste",
    "subespecialidades": [
      "Psiquiatria Geral e da Infância/Adolescência",
      "Transtornos de Ansiedade e Síndrome do Pânico",
      "Depressão Maior e Transtorno Bipolar",
      "TDAH no Adulto e Burnout"
    ],
    "endereco": "SGAS 915, Lote 68A - Centro Clínico Advance 1, Sala 208 - Asa Sul",
    "bairro": "Asa Sul",
    "cidade": "Brasília",
    "uf": "DF",
    "cep": "70390-150",
    "localidade": "Brasília - DF",
    "ponto_referencia": "Atrás do Colégio Marista e próximo à Estação 114 Sul do Metrô",
    "telefone": "(61) 3443-8800",
    "whatsapp": "(61) 99188-4402",
    "disponibilidade": "Segunda a Sexta: 08:30, 10:00, 13:30, 15:00, 16:30",
    "proximosHorarios": [
      "Amanhã às 10:00",
      "Quarta-feira às 15:00",
      "Quinta-feira às 13:30"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Ambiente tranquilo, isolamento acústico nas salas, iluminação aconchegante e estacionamento amplo com vagas PNE."
    },
    "exames_e_procedimentos": [
      "Avaliação Psiquiátrica e Diagnóstica Estruturada",
      "Ajuste e Otimização de Psicofármacos",
      "Emissão de Laudos Periciais e Relatórios Psiquiátricos",
      "Manejo Clínico de Insônia Refratária"
    ],
    "sintomas_e_queixas": [
      "crises de ansiedade e taquicardia súbita",
      "tristeza profunda, choro fácil e desânimo",
      "insônia severa ou sono agitado",
      "dificuldade extrema de concentração e foco (TDAH)",
      "exaustão mental e esgotamento profissional (Burnout)",
      "mudanças bruscas de humor e irritabilidade"
    ],
    "convenios_atendidos": [
      "Med+ Especial",
      "Med+ Premium",
      "Bradesco Saúde",
      "SulAmérica",
      "Amil",
      "Saúde Caixa"
    ],
    "preparo_consulta": "Trazer receitas de medicações psiquiátricas anteriores ou em uso atual. Para telemedicina, estar em local reservado e com conexão estável.",
    "avaliacao": 4.96
  },
  {
    "id": "MED-024",
    "nome": "Dr. Vinícius Bueno Camargo",
    "crm": "CRM-GO 17.840",
    "rqe": "RQE 11.950",
    "especialidade": "Urologia",
    "regiao": "Centro-Oeste",
    "subespecialidades": [
      "Urologia Geral e Cirurgia Robótica",
      "Saúde do Homem e Próstata",
      "Cálculo Renal (Pedra nos Rins) a Laser",
      "Incontinência Urinária no Idoso"
    ],
    "endereco": "Av. Portugal, 1148 - Órion Business & Health Complex, Torre Médica, 18º Andar - Setor Marista",
    "bairro": "Setor Marista",
    "cidade": "Goiânia",
    "uf": "GO",
    "cep": "74150-030",
    "localidade": "Goiânia - GO",
    "ponto_referencia": "Maior complexo de saúde de Goiás, próximo à Praça do Sol e Shopping Bougainville",
    "telefone": "(62) 3999-5000",
    "whatsapp": "(62) 98555-1200",
    "disponibilidade": "Segunda a Quinta: 08:00, 09:00, 10:15, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:00",
      "Quarta-feira às 14:00",
      "Quinta-feira às 10:15"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Complexo hospitalar e consultórios de alto padrão, heliponto médico, elevadores para macas e estacionamento coberto com manobrista."
    },
    "exames_e_procedimentos": [
      "Urofluxometria Computadorizada",
      "Ultrassonografia de Rins, Vias Urinárias e Próstata",
      "Litotripsia e Ureterolitotripsia a Laser para Cálculo Renal",
      "Biópsia de Próstata Guiada por Ultrassom e Fusão de Imagens"
    ],
    "sintomas_e_queixas": [
      "dificuldade ou jato fraco para urinar",
      "acordar várias vezes à noite para urinar",
      "dor lombar aguda em cólica (pedra no rim)",
      "sangue na urina (hematúria)",
      "check-up preventivo de próstata (PSA)",
      "infecções urinárias de repetição"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Goiânia",
      "Bradesco Saúde",
      "Amil",
      "SulAmérica"
    ],
    "preparo_consulta": "Para ultrassom de vias urinárias e urofluxometria: beber 4 copos de água 1 hora antes da consulta e não urinar, para estar de bexiga confortavelmente cheia.",
    "avaliacao": 4.93
  },
  {
    "id": "MED-025",
    "nome": "Dra. Luciana Rondon Paes",
    "crm": "CRM-MT 7.420",
    "rqe": "RQE 4.880",
    "especialidade": "Reumatologia",
    "regiao": "Centro-Oeste",
    "subespecialidades": [
      "Reumatologia Clínica",
      "Artrite Reumatoide e Espondilite",
      "Lúpus Eritematoso Sistêmico",
      "Fibromialgia e Dor Crônica",
      "Osteoartrite e Gota"
    ],
    "endereco": "Av. Historiador Rubens de Mendonça, 1756 - Centro Empresarial Cuiabá, Sala 704 - Bosque da Saúde",
    "bairro": "Bosque da Saúde",
    "cidade": "Cuiabá",
    "uf": "MT",
    "cep": "78050-000",
    "localidade": "Cuiabá - MT",
    "ponto_referencia": "Na Av. do CPA, próximo ao Hospital São Mateus e Parque das Águas",
    "telefone": "(65) 3644-2200",
    "whatsapp": "(65) 99611-3300",
    "disponibilidade": "Segunda a Quinta: 08:30, 09:30, 11:00, 14:00, 15:30",
    "proximosHorarios": [
      "Amanhã às 09:30",
      "Quarta-feira às 14:00",
      "Quinta-feira às 11:00"
    ],
    "modalidade_atendimento": "Presencial e Telemedicina",
    "acessibilidade": {
      "acessivel_pne": true,
      "elevador_amplo": true,
      "rampa_acesso": true,
      "cadeira_rodas_portaria": true,
      "vaga_desembarque_idoso": true,
      "descricao": "Acesso facilitado para pacientes com dor crônica e limitação motora, cadeiras acolchoadas e sem escadarias."
    },
    "exames_e_procedimentos": [
      "Punção e Infiltração Articular Guiada por Ultrassom",
      "Exame do Líquido Sinovial sob Microscopia",
      "Avaliação e Monitoramento de Terapia Imunobiológica",
      "Capilaroscopia Periungueal para Doenças Autoimunes"
    ],
    "sintomas_e_queixas": [
      "dor e inchaço nas juntas dos dedos, punhos e joelhos",
      "rigidez nas mãos ao acordar pela manhã",
      "dor generalizada no corpo e cansaço (fibromialgia)",
      "crises de dor aguda e vermelhidão no dedão do pé (gota)",
      "manchas avermelhadas no rosto com exposição ao sol (lúpus)"
    ],
    "convenios_atendidos": [
      "Med+ Básico",
      "Med+ Especial",
      "Med+ Premium",
      "Unimed Cuiabá",
      "Bradesco Saúde",
      "Amil"
    ],
    "preparo_consulta": "Trazer exames laboratoriais reumatológicos anteriores (Fator Reumatoide, FAN, VHS, PCR, Ácido Úrico) e radiografias das articulações dolorosas.",
    "avaliacao": 4.95
  }
];
