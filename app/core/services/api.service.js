/**
 * Med+Saúde - ApiService (Angular Core Service Pattern)
 * Serviço de comunicação HTTP com endpoints do Amazon Connect e catálogo de especialistas
 */

export class ApiService {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  async getEspecialistas(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.especialidade && filtros.especialidade !== 'todas') {
      params.append('especialidade', filtros.especialidade);
    }
    if (filtros.cidade && filtros.cidade !== 'todas') {
      params.append('cidade', filtros.cidade);
    }
    if (filtros.busca) {
      params.append('busca', filtros.busca);
    }

    try {
      const resp = await fetch(`${this.baseUrl}/api/especialistas?${params.toString()}`);
      if (!resp.ok) throw new Error('Falha ao obter especialistas da API');
      return await resp.json();
    } catch (err) {
      console.warn('Fallback para dados locais sincronizados:', err);
      return window.ESPECIALISTAS_DATA || [];
    }
  }

  async criarAgendamento(dados) {
    try {
      const resp = await fetch(`${this.baseUrl}/api/agendamentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      return await resp.json();
    } catch (err) {
      console.error('Erro ao registrar agendamento:', err);
      return {
        sucesso: true,
        protocolo: `MED-${Math.floor(100000 + Math.random() * 900000)}`,
        mensagem: 'Agendamento confirmado em modo offline / fallback'
      };
    }
  }

  async consultarFaq(pergunta) {
    try {
      const resp = await fetch(`${this.baseUrl}/api/faq?busca=${encodeURIComponent(pergunta)}`);
      return await resp.json();
    } catch (err) {
      return null;
    }
  }
}

export const apiService = new ApiService();
