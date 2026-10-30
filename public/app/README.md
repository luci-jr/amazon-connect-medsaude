# 🅰️ Arquitetura Angular do Projeto Med+Saúde (Grupo 6 - Escola da Nuvem)

Esta pasta segue rigorosamente as melhores práticas e convenções de arquitetura de software recomendadas pelo time oficial do **Angular** (Angular 17/18+ com Standalone Components):

```text
src/
├── app/
│   ├── core/                      # Singleton Services, Estado e Conectividade
│   │   ├── services/
│   │   │   ├── api.service.js     # Comunicação com backend / Amazon Connect API
│   │   │   └── theme.service.js   # Gestão de tema Dark/Light com película sépia
│   ├── shared/                    # Componentes e diretivas reutilizáveis
│   │   └── components/
│   │       ├── navbar/            # Floating Header com atalhos de rotas
│   │       ├── footer/            # Rodapé institucional e contatos
│   │       ├── drawer/            # Menu lateral mobile estilo aplicativo
│   │       ├── bottom-tabs/       # Tab Bar inferior nativa mobile (Ionic-like)
│   │       ├── chat-widget/       # Widget oficial do Bot Arwen (Amazon Lex V2)
│   │       └── appointment-modal/ # Modal de agendamento de consultas
│   ├── pages/                     # Módulos de rota / Views do portal
│   │   ├── inicio/                # Hero, estatísticas, rede hospitalar do Pará
│   │   ├── guia-medico/           # Filtros, cards de especialistas e busca S3
│   │   ├── omnichannel-case/      # Arquitetura AWS, Live NLU Log, FinOps
│   │   ├── planos/                # Cards de planos, simulador e cobertura
│   │   ├── sobre-nos/             # Squad Grupo 6, métricas e bios
│   │   └── documentacao/          # Manual técnico, payloads Lambda e FAQ
│   ├── app.routes.js              # Roteador SPA com navegação por hash
│   └── app.component.js           # Orquestrador raiz da aplicação
├── assets/                        # Recursos Estáticos
│   ├── images/                    # Logotipos, fotografias e avatares
│   └── data/                      # Catálogo JSON dos especialistas (S3 Mock)
├── index.html                     # HTML raiz da aplicação
├── styles.css                     # Design System global, variáveis e temas
├── manifest.json                  # Manifesto PWA para instalação no celular
└── main.js                        # Ponto de entrada de bootstrap
```

### ⚡ Build & Distribuição
- Para gerar a distribuição estática pronta para o **Amazon S3**:
  ```bash
  npm run build
  ```
  O comando compila e sincroniza todos os módulos na pasta `public/` (consumida pelo `server.js` e enviada para o bucket S3).
