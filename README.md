# 🏥 Med+Saúde — Portal do Beneficiário & Guia Médico Omnichannel

## 🎓 Projeto em Equipe • Curso de Amazon Connect promovido pela Escola da Nuvem (Squad Grupo 6)

![Amazon Connect](https://img.shields.io/badge/AWS-Amazon%20Connect-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)
![Amazon Lex V2](https://img.shields.io/badge/AWS-Amazon%20Lex%20V2-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)
![Amazon S3](https://img.shields.io/badge/AWS-Amazon%20S3-232F3E?style=for-the-badge&logo=amazon-s3&logoColor=FF9900)
![Amazon CloudFront](https://img.shields.io/badge/AWS-CloudFront-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)
![Stack Web](https://img.shields.io/badge/Frontend-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-0284c7?style=for-the-badge&logo=javascript&logoColor=white)
![Demo Online](https://img.shields.io/badge/Demo%20Online-GitHub%20Pages-2563eb?style=for-the-badge&logo=githubpages&logoColor=white)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-10b981?style=for-the-badge)

> 🌐 **Acesse a Demonstração Online no GitHub Pages:** [https://luci-jr.github.io/amazon-connect-medsaude/](https://luci-jr.github.io/amazon-connect-medsaude/)

---

## 📌 Sobre o Projeto

Este portal web é o resultado do trabalho prático e integrado desenvolvido pela **Squad Grupo 6** durante o curso de especialização em **Amazon Connect**, promovido pela **Escola da Nuvem**.

A aplicação foi desenhada para materializar o **Case 1 da Med+Saúde** (operadora de planos de saúde fictícia com atuação prioritária em Belém, Ananindeua e região norte do Brasil), simulando em tempo real uma jornada completa de atendimento ao beneficiário:

- 🩺 **Guia Médico Interativo:** Consulta rápida de especialistas clínicos credenciados por especialidade, cidade e bairro com filtros em tempo real.
- 🤖 **Assistente Conversacional Arwen:** Chatbot com inteligência conversacional (NLU) integrada aos fluxos do **Amazon Lex V2** e acoplamento dinâmico do widget oficial do **Amazon Connect**.
- 📞 **Canal de Voz Inteligente (0800):** Telefonia em nuvem com reconhecimento de fala contínuo (ASR), reduzindo o Tempo Médio de Atendimento (TMA) de 14 para 3 minutos.
- 📚 **Base de Conhecimento Amazon Q in Connect:** Motor de pesquisa documental sobre regras de carência, procedimentos da ANS e demonstrativos de coparticipação.
- 🔄 **Transbordo Humanizado para Agente N1:** Encaminhamento de chamadas e conversas para atendentes humanos com preservação de 100% do contexto histórico.

---

## 🏛️ Arquitetura da Solução Omnichannel

```text
+-----------------------------------------------------------------------------------+
|                        BENEFICIÁRIO (PORTAL MED+SAÚDE)                            |
|       [Guia Médico]       [Planos & Coberturas]       [Acessibilidade A-/A+]      |
+-----------------------------------------------------------------------------------+
                  |                                                   |
        (Chat Web Arwen)                                      (Telefonia 0800)
                  |                                                   |
                  v                                                   v
+-----------------------------------------------------------------------------------+
|                           AMAZON CONNECT (CONTACT CENTER)                         |
|   - Contact Flows Dinâmicos                       - Filas de Atendimento Agente N1|
|   - Síntese Neural de Voz (Amazon Polly)          - Transbordo Humanizado Contextual|
+-----------------------------------------------------------------------------------+
                  |                                                   |
        (Compreensão NLU)                                    (Busca de Dados)
                  |                                                   |
                  v                                                   v
+-------------------------------+                   +-------------------------------+
|         AMAZON LEX V2         |                   |      CATÁLOGO MÉDICO S3       |
| - Intent: ConsultarEspecialid |                   | - Base de Especialistas JSON  |
| - Intent: AgendarConsulta     |                   | - Clínicas Credenciadas (PA)  |
| - Intent: AmazonQ_Knowledge   |                   | - Regras de Carência ANS      |
+-------------------------------+                   +-------------------------------+
```

---

## ✨ Destaques de Engenharia & Acessibilidade

- 🎨 **Design System Médico & Moderno:** Interface de alta densidade visual com glassmorphism, tipografia refinada e micro-animações suaves.
- 🌓 **Tema Dinâmico (Modo Escuro & Claro):** Alternador inteligente com persistência das preferências no `localStorage` e película anti-fadiga ocular.
- 🔠 **Acessibilidade Tipográfica (A- / A / A+):** Controle dinâmico da escala de fontes no elemento raiz (`html`), com botão de reset (`A`) para retornar ao tamanho padrão ideal (16px / 100%).
- 📱 **Mobile First & PWA Ready:** Navegação adaptativa com tab bar inferior nativa tátil e suporte a instalação como web app na tela inicial.
- 🪟 **Modais & Diálogos Ergonômicos:** Acabamento com cantos suavemente arredondados (`border-radius: 20px`), sombras de profundidade e fechamento rápido.

---

## 👥 Integrantes da Squad (Grupo 6 — Escola da Nuvem)

O projeto foi planejado e executado de forma colaborativa pela squad, com distribuição de papéis e entregas gerenciadas via **Trello**:

| Integrante | Função / Papel Técnico (Trello) | Responsabilidades & Atribuições no Case | Conexões & Portfólio |
| :--- | :--- | :--- | :--- |
| **Jessica** | **Admin da Squad • Especialista em Bot Lex V2** | Liderança e governança da squad no programa Escola da Nuvem, gestão do fluxo ágil no Trello, modelagem de intenções, slots e prompts no Amazon Lex V2. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jessieviana/) |
| **Lucivaldo Junior** | **Tech Lead, Arquiteto Cloud & Engenheiro de Software** | Liderança técnica da squad, arquitetura da jornada omnichannel no Amazon Connect, engenharia de software do portal Med+Saúde e integração dos serviços AWS (Connect, Lex, Lambda e S3). | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucivaldojr/) [![Portfólio](https://img.shields.io/badge/Portf%C3%B3lio-0284c7?style=flat&logo=google-chrome&logoColor=white)](https://portifolio.lucivaldo.cloud/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/luci-jr) |
| **Beth Nascimento** | **Engenharia Cloud & Amazon Connect** | Desenho dos Contact Flows no Amazon Connect, canais de telefonia com IA de voz agêntica, testes de filas de atendimento e regras de horário de operação. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Camila Landy** | **Experiência do Paciente & Contact Flow** | Estruturação da jornada do beneficiário no portal e no contact center, alinhamento de acessibilidade, fluxos conversacionais humanizados e redução de atritos. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Daniel Villegas** | **Engenharia de Dados & Amazon S3** | Modelagem e estruturação do catálogo médico e clínicas credenciadas no Amazon S3, esquemas JSON para integração rápida e curadoria do Amazon Q in Connect. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Felipe** | **DevOps, Infraestrutura & CloudWatch** | Telemetria e observabilidade da arquitetura AWS, rastreamento de Contact Trace Records (CTR), métricas de latência e alarmes de monitoramento no Amazon CloudWatch. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Paula Lopes** | **Especialista em Bot Lex & Treinamento NLU** | Desenvolvimento de utterances regionais do Pará, slots de especialidades médicas e calibração das intenções do chatbot Arwen para resolução em autoatendimento. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Rebeca** | **QA Lead & Transbordo Humanizado N1** | Homologação de ponta a ponta dos canais de voz e chat, testes de estresse de chamadas simultâneas, validação do transbordo N1 e garantia de qualidade clínica. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |

---

## 📂 Estrutura do Repositório

```text
Med+Saude/
├── package.json               # Dependências do projeto e scripts npm
├── server.js                  # Servidor local Node.js / Express
├── build.js                   # Pipeline de automação (src/ -> public/)
├── README.md                  # Documentação executiva do case
│
├── src/                       # CÓDIGO FONTE DA APLICAÇÃO
│   ├── index.html             # Estrutura SPA com todas as abas e modais
│   ├── styles.css             # Folha de estilos, temas dark/light e tokens
│   ├── main.js                # Inicializador da aplicação
│   └── assets/
│       ├── data/              # Bases de conhecimento (CSV, JSON e MD)
│       ├── js/                # Lógica do Guia Médico, acessibilidade e chat
│       └── images/            # Fotografias, avatares da equipe e assets visuais
│
└── public/                    # BUNDLE COMPILADO (Pronto para Deploy no S3 e GitHub Pages)
    ├── index.html
    ├── css/style.css
    ├── js/
    └── images/
```

---

## 🚀 Como Executar Localmente & Deploy

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior instalada
- Gerenciador de pacotes `npm`
- Git instalado e configurado

### Executando Localmente

```bash
# 1. Clonar ou acessar a pasta do repositório
cd "Med+Saude"

# 2. Instalar as dependências do projeto
npm install

# 3. Compilar os assets para a pasta de distribuição (public/)
npm run build

# 4. Iniciar o servidor local de desenvolvimento
npm run dev

# 5. Acessar no seu navegador:
# http://localhost:3000
```

### 🌐 Deploy no GitHub Pages

O projeto conta com automação para build e deploy contínuo via script no `package.json`:

```bash
# Compilar e publicar automaticamente na branch gh-pages
npm run deploy
```

> **Como funciona:** O script `npm run deploy` executa `node build.js` (sincronizando `src/` para `public/`) e em seguida realiza o comando `git push origin $(git subtree split --prefix public main):gh-pages --force`, mantendo a versão online sempre atualizada no GitHub Pages.

---

## ☁️ Hospedagem Estática no Amazon S3 & CloudFront

Como o portal é 100% estático (JAMstack), ele pode ser publicado no **Amazon S3** em menos de 2 minutos:

1. Execute a compilação:

   ```bash
   npm run build
   ```

2. Crie um bucket no **Amazon S3** e habilite o recurso **Static website hosting** apontando o documento de índice para `index.html`.
3. Sincronize a pasta `public/` diretamente para a raiz do bucket via AWS CLI:

   ```bash
   aws s3 sync ./public s3://seu-bucket-medsaude --delete
   ```

4. *(Recomendado)* Configure uma distribuição no **Amazon CloudFront** com certificado SSL (ACM) para borda global e HTTPS nativo.

---

## 🧠 Matriz de Intenções do Amazon Lex V2

| Intenção (Intent) | Frase Exemplo do Beneficiário | Slots Mapeados | Ação Orquestrada |
| :--- | :--- | :--- | :--- |
| `ConsultarEspecialidade` | *"Quero consultar um cardiologista em Belém"* | `{Especialidade}`, `{Cidade}` | Filtra médicos no S3 e exibe cards interativos |
| `BuscarPorLocalidade` | *"Clínicas credenciadas em Ananindeua"* | `{Cidade}`, `{Bairro}` | Lista endereços de pronto-atendimento e clínicas |
| `AgendarConsulta` | *"Agendar com o Dr. Carlos Mendes"* | `{MedicoId}`, `{Data}`, `{Hora}` | Abre o modal ergonômico e emite protocolo |
| `AmazonQ_KnowledgeSearch` | *"Qual a carência para exames de alta complexidade?"* | `{TermoBusca}` | Consulta base documental com IA generativa |
| `TransbordoAgenteN1` | *"Preciso falar com um atendente humano"* | `{MotivoTransbordo}` | Transfere para a fila mantendo histórico do chat |

---

&copy; 2026 **Med+Saúde** • Projeto em Equipe — Curso de Amazon Connect (Escola da Nuvem • Grupo 6)  
Desenvolvido por | [**Lucivaldo Junior • Engenheiro de Software**](https://portifolio.lucivaldo.cloud/)
