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

## 📌 Sobre o Projeto & Nota Arquitetural de Escopo

> **⚠️ Escopo Técnico do Projeto:**  
> O produto central desenvolvido pela **Squad Grupo 6** é a solução de **Contact Center Omnichannel e Agente Inteligente na AWS (Amazon Connect + Lex V2 + Q in Connect + S3)**.  
> Este portal web foi concebido e desenvolvido integralmente por **Lucivaldo Junior** com base estrita nos requisitos do documento oficial do **Case 1 (`ca_1` - `Case_1_Guia_Medico_Chat_Online.pdf`)** da **Escola da Nuvem**. Ele atua como **showcase executivo**, simulador da jornada do paciente e central unificada de documentações técnicas de todas as 4 frentes de trabalho.

A aplicação foi desenhada para materializar o **Case 1 da Med+Saúde**, simulando em tempo real uma jornada completa de atendimento ao beneficiário com controles técnicos de segurança compatíveis com **HIPAA & LGPD**:

- 🩺 **Guia Médico Interativo:** Consulta rápida de especialistas clínicos credenciados por especialidade, cidade (destaque para Curitiba/PR) e rede nacional com filtros em tempo real.
- 🤖 **Assistente Conversacional Iara:** Chatbot com inteligência conversacional (NLU) integrada aos fluxos do **Amazon Lex V2** (bot `bot-G6`, alias `prod`) e protocolo imediato conforme **ANS RN 623**.
- 📞 **Canal de Voz Inteligente:** Telefonia em nuvem com reconhecimento de fala contínuo (ASR) e linguagem natural para idosos sem menus rígidos, reduzindo o TMA de 14 para 3 minutos (meta estimada).
- 📚 **Base de Conhecimento Amazon Q in Connect:** Motor de pesquisa RAG documental direto no arquivo Markdown consolidado do S3, evitando redundâncias.
- 🛡️ **Governança & Padrão HIPAA:** Criptografia em repouso com **AWS KMS (AES-256)**, dados em trânsito com **TLS 1.2+**, mascaramento de PHI nos fluxos do Contact Flow e logs do CloudWatch, além de políticas de IAM Least Privilege.
- 🔄 **Transbordo Humanizado para Agente N1:** Encaminhamento de chamadas e conversas para fila única `AgenteN1` com preservação de 100% do contexto histórico (Novo Decreto do SAC nº 13.135/2026 e LGPD).

---

## 🏛️ Arquitetura da Solução Omnichannel

```text
+-----------------------------------------------------------------------------------+
|                        BENEFICIÁRIO (PORTAL MED+SAÚDE)                            |
|       [Guia Médico]       [Planos & Coberturas]       [Acessibilidade A-/A+]      |
+-----------------------------------------------------------------------------------+
                  |                                                   |
         (Chat Web Iara)                                      (Canal Voz Telefone)
                  |                                                   |
                  v                                                   v
+-----------------------------------------------------------------------------------+
|                           AMAZON CONNECT (CONTACT CENTER)                         |
|   - Contact Flows Dinâmicos                       - Fila Única: AgenteN1          |
|   - Síntese Neural de Voz (Amazon Polly - Camila) - Transbordo com Contexto       |
|   - Protocolo Curto ANS RN 623 (#20261102-4571)   - Prioridade 1 (Emergência/SAMU)|
+-----------------------------------------------------------------------------------+
                  |                                                   |
         (Compreensão NLU)                                  (Busca RAG Direta)
                  |                                                   |
                  v                                                   v
+-------------------------------+                   +-------------------------------+
|    AMAZON LEX V2 (bot-G6)     |                   |       AMAZON Q IN CONNECT     |
| 1. ConsultarEspecialidade     |                   |  - Indexação direta no S3     |
| 2. BuscarPorLocalidade        |                   |  - Base única Markdown (.md)  |
| 3. AgendarConsulta            |                   |  - Especialistas Curitiba-PR  |
| 4. FalarComAtendente          |                   +---------------+---------------+
| 5. SinaisDeUrgencia           |                                   |
| 6. OutrosAssuntos             |                                   v
| 7. DespedidaEncerramento      |                   +-------------------------------+
| 8. FallbackIntent             |                   |       BUCKET AMAZON S3        |
+-------------------------------+                   | g6-medsaude-guia-medico-dados |
                                                    +-------------------------------+
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

O projeto foi planejado e executado de forma colaborativa pela squad, com distribuição de papéis em 4 Frentes de trabalho gerenciadas via **Trello**:

| Integrante | Frente de Atuação (Trello) | Responsabilidades & Atribuições no Case | Conexões & Portfólio |
| :--- | :--- | :--- | :--- |
| **Daniel Villegas** | 🔵 **Frente A — Fluxos Connect** | Pontos de entrada no Amazon Connect para Voz e Chat, arquitetura de voz para idosos (sem comandos rígidos) e transbordo para N1. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielvillegas63/) |
| **Rebeca Espinoza Alves** | 🔵 **Frente A — Fluxos Connect** | Contact Flows para Chat online, preservação dos atributos de contexto na tela do atendente e roteamento na fila única AgenteN1. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Jessie V** | 🟣 **Frente B — Bot Lex** | Governança ágil da squad, versionamento do bot Lex V2 (bot-G6, alias prod), especificação das 8 intenções, ASR e vocabulário customizado. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jessieviana/) |
| **Ana Paula Tavares Lopes** | 🟣 **Frente B — Bot Lex** | Mapeamento de utterances em linguagem natural, calibração dos slots de Especialidade e Localidade e prompts da assistente Iara. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Lucivaldo Junior** | 🟠 **Frente C — Dados & Conhecimento** | Provisionamento do bucket S3, governança da base única .md para o Amazon Q in Connect, engenharia de dados e portal Med+Saúde. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucivaldojr/) [![Portfólio](https://img.shields.io/badge/Portf%C3%B3lio-0284c7?style=flat&logo=google-chrome&logoColor=white)](https://portifolio.lucivaldo.cloud/) [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/luci-jr) |
| **Felipe Henrique Souza** | 🟠 **Frente C — Dados & Conhecimento** | Modelagem dos dados simulados dos especialistas (Curitiba-PR), conexão com a Knowledge Base do Amazon Q in Connect e indexação RAG. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Elizabeth Silva do Nascimento** | 🟢 **Frente D — Métricas & Testes** | Configuração do dashboard no Amazon Connect para TMA e volume, acompanhamento de contenção e roteiro de testes dos 3 cenários. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |
| **Camila Landy Fernandes** | 🟢 **Frente D — Testes & Apresentação** | Homologação ponta a ponta dos cenários de teste (Chat, Voz e Transbordo N1), conformidade com os critérios de aceite, deck e pitch. | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com) |

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
