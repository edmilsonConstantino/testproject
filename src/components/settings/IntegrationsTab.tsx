import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  Clock,
  Zap,
  RefreshCw,
  Search,
  ExternalLink,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface IntegrationTool {
  id: string;
  name: string;
  category: 'Comunicação' | 'Financeiro' | 'Marketing' | 'Produtividade' | 'Automação';
  description: string;
  status: 'Conectado' | 'Disponível';
  icon: string;
  lastSync?: string;
  actionsCount?: string;
}

export const IntegrationsTab: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const [tools, setTools] = useState<IntegrationTool[]>([
    {
      id: 'slack',
      name: 'Slack',
      category: 'Comunicação',
      description: 'Envie notificações automáticas de novas doações e projetos para canais dedicados da equipa.',
      status: 'Conectado',
      icon: '💬',
      lastSync: 'Há 4 minutos',
      actionsCount: '340 mensagens enviadas',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'Financeiro',
      description: 'Processamento global de doações por cartão, Apple Pay e emissão automática de recibos fiscais.',
      status: 'Conectado',
      icon: '💳',
      lastSync: 'Em tempo real (Webhook)',
      actionsCount: '€14.280 processados',
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      category: 'Marketing',
      description: 'Sincronização de voluntários e doadores em audiências segmentadas para envio de newsletters.',
      status: 'Conectado',
      icon: '🐵',
      lastSync: 'Hoje às 04:00',
      actionsCount: '1.240 contactos sincronizados',
    },
    {
      id: 'zoom',
      name: 'Zoom Video',
      category: 'Comunicação',
      description: 'Criação automática de salas de videoconferência para assembleias comunitárias e webinars.',
      status: 'Conectado',
      icon: '📹',
      lastSync: 'Ontem',
      actionsCount: '12 reuniões agendadas',
    },
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      category: 'Produtividade',
      description: 'Sincronize relatórios de impacto no Google Drive e eventos no Google Calendar comunitário.',
      status: 'Disponível',
      icon: '📁',
    },
    {
      id: 'microsoft-365',
      name: 'Microsoft 365 / Teams',
      category: 'Produtividade',
      description: 'Integração corporativa com Microsoft Teams para alertas de governança e OneDrive.',
      status: 'Disponível',
      icon: '🏢',
    },
    {
      id: 'hubspot',
      name: 'HubSpot CRM',
      category: 'Marketing',
      description: 'Gestão de relacionamento institucional com grandes doadores, fundações e parceiros corporativos.',
      status: 'Disponível',
      icon: '🟧',
    },
    {
      id: 'trello',
      name: 'Trello',
      category: 'Produtividade',
      description: 'Crie cartões de tarefas automáticas quando novos voluntários aderirem a uma iniciativa.',
      status: 'Disponível',
      icon: '📋',
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      category: 'Produtividade',
      description: 'Armazenamento em nuvem para arquivos fotográficos de evidência de campo e auditorias.',
      status: 'Disponível',
      icon: '📦',
    },
    {
      id: 'salesforce',
      name: 'Salesforce Non-Profit',
      category: 'Marketing',
      description: 'Pacote de sucesso para ONGs (NPSP) para acompanhamento aprofundado de donativos.',
      status: 'Disponível',
      icon: '☁️',
    },
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'Automação',
      description: 'Conecte a API da VILA com mais de 5.000 aplicações com fluxos no-code customizáveis.',
      status: 'Disponível',
      icon: '⚡',
    },
  ]);

  const toggleConnection = (toolId: string) => {
    setTools((prev) =>
      prev.map((t) =>
        t.id === toolId
          ? {
              ...t,
              status: t.status === 'Conectado' ? 'Disponível' : 'Conectado',
              lastSync: t.status === 'Conectado' ? undefined : 'Agora mesmo',
            }
          : t
      )
    );
  };

  const connectedCount = tools.filter((t) => t.status === 'Conectado').length;
  const availableCount = tools.filter((t) => t.status === 'Disponível').length;

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      filterCategory === 'Todas' || tool.category === filterCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-6">
      {/* 1. Métricas Gerais das Ferramentas de Produtividade */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            {connectedCount}
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#0F172A]">Ativas</h3>
            <p className="text-[11px] text-slate-500">Ferramentas sincronizadas</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
            {availableCount}
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#0F172A]">Disponíveis</h3>
            <p className="text-[11px] text-slate-500">Prontas para conectar</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
            1.420
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#0F172A]">Automações</h3>
            <p className="text-[11px] text-slate-500">Executadas este mês</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
            99.8%
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#0F172A]">Uptime Sinc</h3>
            <p className="text-[11px] text-slate-500">Taxa de sucesso</p>
          </div>
        </div>
      </div>

      {/* 2. Catálogo de Ferramentas de Produtividade */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Catálogo de Ferramentas de Produtividade & Workflow
            </h2>
            <p className="text-xs text-slate-500">
              Conecte ferramentas de trabalho externas para automatizar processos e sincronizar dados com a VILA.
            </p>
          </div>

          {/* Busca e Filtro */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar ferramentas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-800 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
              />
            </div>

            <div className="flex gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['Todas', 'Comunicação', 'Financeiro', 'Marketing', 'Produtividade', 'Automação'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Ferramentas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const isConnected = tool.status === 'Conectado';
            return (
              <div
                key={tool.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isConnected
                    ? 'border-blue-200 bg-blue-50/20 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <h3 className="text-xs font-bold text-[#0F172A]">{tool.name}</h3>
                        <span className="text-[10px] text-slate-400 font-medium">{tool.category}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isConnected
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  {tool.lastSync && (
                    <div className="mt-3 pt-2 border-t border-slate-100/80 text-[10px] text-slate-400 space-y-0.5">
                      <div className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 text-blue-500" />
                        <span>Sinc: {tool.lastSync}</span>
                      </div>
                      {tool.actionsCount && (
                        <p className="text-slate-600 font-semibold">{tool.actionsCount}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleConnection(tool.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isConnected
                        ? 'border border-red-200 text-red-600 hover:bg-red-50'
                        : 'bg-[#2563EB] text-white hover:bg-blue-700'
                    }`}
                  >
                    {isConnected ? 'Desconectar' : 'Conectar'}
                  </button>

                  {isConnected && (
                    <button
                      type="button"
                      onClick={() => alert(`Configurações de integração com ${tool.name}`)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Configurar →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Feed de Logs de Sincronização Recente */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Registo Recente de Automações
            </h2>
          </div>
          <span className="text-[11px] text-slate-500">Últimas 24 horas</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {[
            {
              time: 'Há 4 min',
              icon: '💬',
              tool: 'Slack',
              text: 'Alerta enviado para #impacto-algarve sobre 12 novas subscrições de voluntariado.',
              status: 'Sucesso',
            },
            {
              time: 'Há 28 min',
              icon: '💳',
              tool: 'Stripe',
              text: 'Donativo recorrente de €50 recebido com sucesso de membro de Coimbra.',
              status: 'Sucesso',
            },
            {
              time: 'Hoje, 04:00',
              icon: '🐵',
              tool: 'Mailchimp',
              text: 'Lista sincronizada: 14 novos membros adicionados à audiência "Clima & Oceanos".',
              status: 'Sucesso',
            },
            {
              time: 'Ontem, 18:30',
              icon: '📹',
              tool: 'Zoom',
              text: 'Reunião de alinhamento com líderes regionais gerada com link único.',
              status: 'Sucesso',
            },
          ].map((log, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-50 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{log.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0F172A]">{log.tool}</span>
                    <span className="text-[10px] text-slate-400">• {log.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{log.text}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
