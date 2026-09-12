import React, { useState } from 'react';
import {
  Shield,
  Users,
  MapPin,
  ArrowRight,
  Sliders,
  BarChart3,
  Globe,
  ArrowLeft,
  Eye,
  Heart,
  Package,
  HelpCircle,
  UserCheck,
  LifeBuoy,
  Cpu,
  RefreshCw,
  FolderKanban,
  MessageSquareMore,
  Calendar,
  Send,
  Boxes,
  Settings,
  PlusCircle,
  MessageSquarePlus,
  CalendarPlus,
  FileText,
  AlertTriangle,
  Clock,
  HardDrive,
  Activity,
  CheckCircle2,
  TrendingUp,
  Radio,
  Share2,
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';

interface PainelGestaoPlaceholderViewProps {
  currentUser: DemoUser;
  currentSection?: string;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
  onOpenSupportModal?: () => void;
}

export const PainelGestaoPlaceholderView: React.FC<PainelGestaoPlaceholderViewProps> = ({
  currentUser,
  currentSection = 'painel-gestao',
  onNavigateToTab,
  onBreadcrumbChange,
  onOpenSupportModal,
}) => {
  const [timeFilter, setTimeFilter] = useState('Últimas 24 horas');
  const [alertFilter, setAlertFilter] = useState('Todos');
  const [lastUpdated, setLastUpdated] = useState('10:32:45');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString('pt-PT'));
      setIsRefreshing(false);
    }, 400);
  };

  const getSectionMetadata = () => {
    switch (currentSection) {
      case 'visao-geral':
        return {
          title: 'Visão Geral da Plataforma',
          breadcrumb: 'Visão Geral',
          subtitle: 'Indicadores macro, mapa de operações ativas e tendências de crescimento territorial.',
          badge: 'Módulo: Visão Geral',
          icon: <Globe className="w-5 h-5 text-indigo-400" />,
        };
      case 'gestao-utilizadores':
      case 'utilizadores-comunidades':
      case 'membros':
        return {
          title: 'Utilizadores e Comunidades',
          breadcrumb: 'Utilizadores e Comunidades',
          subtitle: 'Supervisão de contas, assembleias cívicas, moderação comunitária e validação de identidades.',
          badge: 'Módulo: Utilizadores',
          icon: <Users className="w-5 h-5 text-blue-400" />,
        };
      case 'territorios-paises':
      case 'gestao-territorios':
        return {
          title: 'Territórios e Países',
          breadcrumb: 'Territórios e Países',
          subtitle: 'Gestão de divisões administrativas, bairros, freguesias, municípios e conectividade territorial.',
          badge: 'Módulo: Territórios',
          icon: <MapPin className="w-5 h-5 text-cyan-400" />,
        };
      case 'projetos-iniciativas':
      case 'gestao-projetos':
        return {
          title: 'Projetos e Iniciativas',
          breadcrumb: 'Projetos e Iniciativas',
          subtitle: 'Acompanhamento, aprovação e impacto de projetos submetidos pelos cidadãos e comunidades.',
          badge: 'Módulo: Projetos',
          icon: <FolderKanban className="w-5 h-5 text-amber-400" />,
        };
      case 'participacao-consultas':
      case 'gestao-consultas':
        return {
          title: 'Participação e Consultas',
          breadcrumb: 'Participação e Consultas',
          subtitle: 'Orçamentos participativos, consultas públicas, votações cívicas e propostas legislativas locais.',
          badge: 'Módulo: Consultas',
          icon: <MessageSquareMore className="w-5 h-5 text-rose-400" />,
        };
      case 'eventos-globais-admin':
      case 'gestao-eventos':
        return {
          title: 'Eventos Globais',
          breadcrumb: 'Eventos Globais',
          subtitle: 'Calendário institucional, moderação de cimeiras e conferências cívicas territoriais.',
          badge: 'Módulo: Eventos',
          icon: <Calendar className="w-5 h-5 text-emerald-400" />,
        };
      case 'gestao-parceiros':
      case 'parceiros-colaboracoes':
        return {
          title: 'Parceiros e Colaborações',
          breadcrumb: 'Parceiros e Colaborações',
          subtitle: 'Alianças institucionais, governos locais, universidades, ONGs e setor privado sustentável.',
          badge: 'Módulo: Parceiros',
          icon: <Send className="w-5 h-5 text-pink-400" />,
        };
      case 'gestao-recursos':
      case 'recursos-infraestrutura':
      case 'recursos':
        return {
          title: 'Recursos e Infraestrutura',
          breadcrumb: 'Recursos e Infraestrutura',
          subtitle: 'Monitorização técnica em tempo real: servidores, consumo de IA, APIs e telemetria.',
          badge: 'Módulo: Recursos',
          icon: <Boxes className="w-5 h-5 text-purple-400" />,
        };
      case 'relatorios-dados':
      case 'gestao-relatorios':
        return {
          title: 'Relatórios e Dados',
          breadcrumb: 'Relatórios e Dados',
          subtitle: 'Exportação de dados cívicos abertos, relatórios de impacto territorial e inteligência estatística.',
          badge: 'Módulo: Relatórios',
          icon: <BarChart3 className="w-5 h-5 text-teal-400" />,
        };
      case 'configuracoes-plataforma':
      case 'gestao-configuracoes':
        return {
          title: 'Configurações da Plataforma',
          breadcrumb: 'Configurações',
          subtitle: 'Políticas de segurança, parâmetros de governança, permissões de administradores e integrações.',
          badge: 'Módulo: Configurações',
          icon: <Settings className="w-5 h-5 text-slate-400" />,
        };
      case 'impacto-global-plataforma':
      case 'gestao-impacto':
      case 'impacto-plataforma':
        return {
          title: 'Impacto Global da Plataforma VILA',
          breadcrumb: 'Impacto Global',
          subtitle: 'Visão geral do impacto coletivo gerado pela plataforma VILA e pela sua rede global de pessoas, comunidades e territórios.',
          badge: 'Módulo: Impacto Global',
          icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
        };
      case 'gestao-suporte':
      case 'suporte':
        return {
          title: 'Suporte e Atendimento da Plataforma',
          breadcrumb: 'Suporte',
          subtitle: 'Canal direto e prioritário de assistência técnica para administradores e moderadores.',
          badge: 'Módulo: Suporte Operacional',
          icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
        };
      case 'painel-gestao':
      case 'gestao':
      case 'admin':
      default:
        return {
          title: 'Painel de Gestão',
          breadcrumb: 'Painel de Gestão',
          subtitle: 'Monitorização operacional em tempo real da plataforma VILA. Acompanhe atividades, serviços, alertas e ações em curso.',
          badge: 'Painel Principal',
          icon: <UserCheck className="w-5 h-5 text-purple-400" />,
        };
    }
  };

  const meta = getSectionMetadata();
  const onBreadcrumbChangeRef = React.useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = React.useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  React.useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Plataforma VILA', onClick: () => onNavigateToTabRef.current('painel-gestao') },
      { label: meta.breadcrumb },
    ]);
  }, [meta.breadcrumb]);

  // Se não for o Painel de Gestão principal, exibe a visualização de gestão específica
  if (currentSection !== 'painel-gestao' && currentSection !== 'gestao' && currentSection !== 'admin') {
    return (
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header do Módulo Administrativo */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>{meta.badge}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              {meta.title}
            </h1>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              {meta.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {(currentSection === 'gestao-suporte' || currentSection === 'suporte') && onOpenSupportModal && (
              <button
                type="button"
                onClick={onOpenSupportModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5B21B6] hover:bg-purple-700 shadow-xs transition-colors cursor-pointer"
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Abrir Modal de Suporte</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigateToTab('painel-gestao')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Painel de Gestão</span>
            </button>
          </div>
        </div>

        {/* Conteúdo Contextual do Módulo */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                {meta.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900">Operações e Gestão Ativa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Módulo integrado à infraestrutura da Plataforma VILA com autoridade no escopo <strong>{currentUser.scope}</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Sincronização em Tempo Real</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As alterações realizadas pelos administradores refletem imediatamente em todas as assembleias e vilas ativas.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Privilégios de Administrador</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sessão autorizada para <strong>{currentUser.name}</strong> ({currentUser.roleLabel}).
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visualização Principal: Painel de Gestão (exatamente como na referência UI PAINEL DE GESTAO.png)
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      {/* 1. Header do Painel de Gestão */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Quadrant Icon */}
          <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] border border-purple-200/80 flex items-center justify-center text-[#5B21B6] shrink-0 shadow-2xs">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <rect x="3" y="3" width="7" height="7" rx="2" />
              <rect x="14" y="3" width="7" height="7" rx="2" />
              <rect x="3" y="14" width="7" height="7" rx="2" />
              <rect x="14" y="14" width="7" height="7" rx="2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Painel de Gestão
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              Monitorização operacional em tempo real da plataforma VILA. Acompanhe atividades, serviços, alertas e ações em curso.
            </p>
          </div>
        </div>

        {/* Status em tempo real + Botão Atualizar */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <div className="text-right text-xs">
            <span className="text-slate-400">Última atualização: </span>
            <strong className="text-slate-700">{lastUpdated}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">Dados em tempo real</span>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            id="btn-refresh-painel"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* 2. 7 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Card 1: Utilizadores Online */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Utilizadores Online</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">4.382</div>
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 mt-0.5">
              <span>↑ 12%</span>
              <span className="text-slate-400 font-normal">vs ontem</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('gestao-utilizadores')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>

        {/* Card 2: Novos Utilizadores (Hoje) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <UserCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Novos Utilizadores (Hoje)</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">1.248</div>
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 mt-0.5">
              <span>↑ 18%</span>
              <span className="text-slate-400 font-normal">vs ontem</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('gestao-utilizadores')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>

        {/* Card 3: Novas Comunidades (Hoje) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Novas Comunidades (Hoje)</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">14</div>
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 mt-0.5">
              <span>↑ 7%</span>
              <span className="text-slate-400 font-normal">vs ontem</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('gestao-utilizadores')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>

        {/* Card 4: Novos Projetos (Hoje) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <FolderKanban className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Novos Projetos (Hoje)</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">28</div>
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 mt-0.5">
              <span>↑ 22%</span>
              <span className="text-slate-400 font-normal">vs ontem</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('projetos-iniciativas')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>

        {/* Card 5: Consultas Ativas */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <MessageSquareMore className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Consultas Ativas</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">25</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('participacao-consultas')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>

        {/* Card 6: Eventos Ativos */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-600">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Eventos Ativos</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">12</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('eventos-globais-admin')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>

        {/* Card 7: Tarefas Pendentes */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium leading-tight">Tarefas Pendentes</span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">36</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('painel-gestao')}
            className="mt-2 text-[10.5px] font-bold text-purple-600 hover:text-purple-800 text-left cursor-pointer"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      {/* 3. Middle Row: Atividade em Tempo Real, Atividades Recentes, Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Atividade em Tempo Real */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Atividade em Tempo Real</h2>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 cursor-pointer"
              >
                <option>Últimas 24 horas</option>
                <option>Últimos 7 dias</option>
                <option>Último mês</option>
              </select>
            </div>

            {/* Legenda */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                Utilizadores
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Comunidades
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Projetos
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Consultas
              </span>
            </div>

            {/* Gráfico SVG vetorial multi-linhas suave */}
            <div className="mt-4 relative h-40 w-full">
              <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
                {/* Linhas de grelha horizontal */}
                <line x1="40" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="60" x2="390" y2="60" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="100" x2="390" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="390" y2="140" stroke="#E2E8F0" strokeWidth="1" />

                {/* Eixo Y */}
                <text x="10" y="24" fontSize="9" fill="#94A3B8">2.5K</text>
                <text x="10" y="64" fontSize="9" fill="#94A3B8">2K</text>
                <text x="10" y="104" fontSize="9" fill="#94A3B8">1.5K</text>
                <text x="10" y="144" fontSize="9" fill="#94A3B8">500</text>

                {/* Curva 1: Utilizadores (Roxo) */}
                <path
                  d="M 50 110 Q 100 100 150 70 T 250 65 T 320 50 T 380 40"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2.2"
                />
                <circle cx="50" cy="110" r="3" fill="#7C3AED" />
                <circle cx="150" cy="70" r="3" fill="#7C3AED" />
                <circle cx="250" cy="65" r="3" fill="#7C3AED" />
                <circle cx="320" cy="50" r="3" fill="#7C3AED" />
                <circle cx="380" cy="40" r="3" fill="#7C3AED" />

                {/* Curva 2: Comunidades (Verde) */}
                <path
                  d="M 50 135 Q 100 120 150 110 T 250 95 T 320 90 T 380 85"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <circle cx="50" cy="135" r="2.5" fill="#10B981" />
                <circle cx="150" cy="110" r="2.5" fill="#10B981" />
                <circle cx="250" cy="95" r="2.5" fill="#10B981" />
                <circle cx="380" cy="85" r="2.5" fill="#10B981" />

                {/* Curva 3: Projetos (Azul) */}
                <path
                  d="M 50 145 Q 100 135 150 125 T 250 115 T 320 105 T 380 95"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
                <circle cx="50" cy="145" r="2.5" fill="#3B82F6" />
                <circle cx="150" cy="125" r="2.5" fill="#3B82F6" />
                <circle cx="250" cy="115" r="2.5" fill="#3B82F6" />
                <circle cx="380" cy="95" r="2.5" fill="#3B82F6" />

                {/* Curva 4: Consultas (Laranja) */}
                <path
                  d="M 50 150 Q 100 140 150 130 T 250 125 T 320 120 T 380 115"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <circle cx="50" cy="150" r="2.5" fill="#F59E0B" />
                <circle cx="250" cy="125" r="2.5" fill="#F59E0B" />
                <circle cx="380" cy="115" r="2.5" fill="#F59E0B" />
              </svg>
            </div>

            {/* Eixo X */}
            <div className="flex justify-between pl-8 text-[9.5px] text-slate-400 mt-1">
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('relatorios-dados')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver relatório completo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Atividades Recentes</h2>

            <div className="mt-3.5 space-y-3">
              {[
                {
                  title: 'Nova comunidade criada',
                  desc: 'Jovens pelo Clima - México',
                  time: 'há 2 min',
                  icon: <Users className="w-3.5 h-3.5 text-emerald-600" />,
                  bg: 'bg-emerald-50',
                },
                {
                  title: 'Projeto submetido para aprovação',
                  desc: 'Mobilidade Urbana Sustentável - Lisboa',
                  time: 'há 5 min',
                  icon: <FolderKanban className="w-3.5 h-3.5 text-blue-600" />,
                  bg: 'bg-blue-50',
                },
                {
                  title: 'Consulta pública criada',
                  desc: 'Plano de Ação Climática - Porto',
                  time: 'há 7 min',
                  icon: <MessageSquareMore className="w-3.5 h-3.5 text-cyan-600" />,
                  bg: 'bg-cyan-50',
                },
                {
                  title: 'Evento publicado',
                  desc: 'Fórum de Inovação Social - Online',
                  time: 'há 9 min',
                  icon: <Calendar className="w-3.5 h-3.5 text-amber-600" />,
                  bg: 'bg-amber-50',
                },
                {
                  title: 'Novo utilizador registado',
                  desc: 'João Silva - Portugal',
                  time: 'há 10 min',
                  icon: <UserCheck className="w-3.5 h-3.5 text-indigo-600" />,
                  bg: 'bg-indigo-50',
                },
              ].map((act, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg ${act.bg} shrink-0 mt-0.5`}>
                      {act.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">{act.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{act.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10.5px] text-slate-400 whitespace-nowrap shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('painel-gestao')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todas as atividades</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alertas e Notificações */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Alertas e Notificações</h2>
              <select
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 cursor-pointer"
              >
                <option>Todos</option>
                <option>Críticos</option>
                <option>Pendentes</option>
              </select>
            </div>

            <div className="mt-3.5 space-y-3">
              {[
                {
                  title: 'Serviço de IA com alta utilização',
                  desc: 'Utilização acima de 90%',
                  badge: '2',
                  badgeBg: 'bg-rose-100 text-rose-700',
                  icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
                },
                {
                  title: 'Consultas a terminar em breve',
                  desc: '3 consultas terminam nas próximas 24h',
                  badge: '3',
                  badgeBg: 'bg-amber-100 text-amber-700',
                  icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
                },
                {
                  title: 'Projetos aguardando aprovação',
                  desc: '8 projetos pendentes de revisão',
                  badge: '8',
                  badgeBg: 'bg-amber-100 text-amber-700',
                  icon: <FolderKanban className="w-3.5 h-3.5 text-amber-600" />,
                },
                {
                  title: 'Eventos com inscrições abertas',
                  desc: '5 eventos com inscrições a fechar',
                  badge: '5',
                  badgeBg: 'bg-blue-100 text-blue-700',
                  icon: <Calendar className="w-3.5 h-3.5 text-blue-600" />,
                },
                {
                  title: 'Relatórios agendados',
                  desc: '2 relatórios prontos para gerar',
                  badge: '2',
                  badgeBg: 'bg-purple-100 text-purple-700',
                  icon: <FileText className="w-3.5 h-3.5 text-purple-600" />,
                },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="p-1 rounded-md bg-slate-50 shrink-0 mt-0.5">
                      {alert.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">{alert.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{alert.desc}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${alert.badgeBg}`}>
                    {alert.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('painel-gestao')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todos os alertas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Saúde da Plataforma, Uso de Recursos, Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Saúde da Plataforma */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Saúde da Plataforma</h2>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span>Sistema Operacional</span>
                <CheckCircle2 className="w-3 h-3" />
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-4 text-center">
              <div>
                <div className="text-[10px] text-slate-500">Disponibilidade</div>
                <div className="text-sm font-black text-slate-900 mt-1 font-['Outfit']">99,98%</div>
                <div className="text-[9.5px] text-emerald-600 font-semibold">↑ 0,02%</div>
                {/* Mini sparkline */}
                <div className="mt-1 h-3 flex items-end justify-center">
                  <span className="w-1 h-2 bg-emerald-400 mx-0.5 rounded-xs" />
                  <span className="w-1 h-3 bg-emerald-500 mx-0.5 rounded-xs" />
                  <span className="w-1 h-2.5 bg-emerald-400 mx-0.5 rounded-xs" />
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Tempo de Resposta</div>
                <div className="text-sm font-black text-slate-900 mt-1 font-['Outfit']">120ms</div>
                <div className="text-[9.5px] text-emerald-600 font-semibold">↓ 15ms</div>
                <div className="mt-1 h-3 flex items-end justify-center">
                  <span className="w-1 h-3 bg-blue-400 mx-0.5 rounded-xs" />
                  <span className="w-1 h-2 bg-blue-500 mx-0.5 rounded-xs" />
                  <span className="w-1 h-2.5 bg-blue-400 mx-0.5 rounded-xs" />
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Serviços Operacionais</div>
                <div className="text-sm font-black text-slate-900 mt-1 font-['Outfit']">98%</div>
                <div className="text-[9.5px] text-emerald-600 font-semibold">↑ 2%</div>
                <div className="mt-1 h-3 flex items-end justify-center">
                  <span className="w-1 h-2 bg-emerald-400 mx-0.5 rounded-xs" />
                  <span className="w-1 h-3 bg-emerald-500 mx-0.5 rounded-xs" />
                  <span className="w-1 h-2.5 bg-emerald-400 mx-0.5 rounded-xs" />
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">Incidentes Abertos</div>
                <div className="text-sm font-black text-slate-900 mt-1 font-['Outfit']">2</div>
                <div className="text-[9.5px] text-rose-600 font-semibold">↑ 1</div>
                <div className="mt-1 h-3 flex items-end justify-center">
                  <span className="w-1 h-1 bg-rose-400 mx-0.5 rounded-xs" />
                  <span className="w-1 h-3 bg-rose-500 mx-0.5 rounded-xs" />
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500">APIs Ativas</div>
                <div className="text-sm font-black text-slate-900 mt-1 font-['Outfit']">44 / 50</div>
                <div className="text-[9.5px] text-slate-600 font-semibold">88%</div>
                <div className="mt-1 h-3 flex items-end justify-center">
                  <span className="w-1 h-2.5 bg-purple-400 mx-0.5 rounded-xs" />
                  <span className="w-1 h-3 bg-purple-500 mx-0.5 rounded-xs" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('gestao-recursos')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver monitorização completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Uso de Recursos (Atual) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Uso de Recursos (Atual)</h2>

            <div className="mt-3.5 space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between items-center text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-slate-500" />
                    CPU
                  </span>
                  <span className="font-bold text-slate-800">68%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-500" />
                    Memória
                  </span>
                  <span className="font-bold text-slate-800">62%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '62%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                    Armazenamento
                  </span>
                  <span className="font-bold text-slate-800">71% <span className="text-[10px] text-slate-400 font-normal">(6,8 TB / 10 TB)</span></span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '71%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-slate-500" />
                    Banda de Rede
                  </span>
                  <span className="font-bold text-slate-800">52% <span className="text-[10px] text-slate-400 font-normal">(5,2 TB / 10 TB)</span></span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '52%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-slate-600 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-slate-500" />
                    Serviços de IA
                  </span>
                  <span className="font-bold text-rose-600">94%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('gestao-recursos')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todos os recursos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Ações Rápidas</h2>

            <div className="grid grid-cols-2 gap-2.5 mt-3.5">
              <button
                type="button"
                onClick={() => onNavigateToTab('projetos-iniciativas')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-700 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="p-1 rounded-md bg-purple-100 text-purple-700">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                <span>Adicionar Projeto</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('participacao-consultas')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-700 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                </div>
                <span>Criar Consulta</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('eventos-globais-admin')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-slate-700 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="p-1 rounded-md bg-amber-100 text-amber-700">
                  <CalendarPlus className="w-3.5 h-3.5" />
                </div>
                <span>Publicar Evento</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('gestao-utilizadores')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="p-1 rounded-md bg-blue-100 text-blue-700">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Adicionar Comunidade</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('relatorios-dados')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="p-1 rounded-md bg-indigo-100 text-indigo-700">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span>Gerar Relatório</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('painel-gestao')}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 text-slate-700 text-xs font-bold transition-all text-left cursor-pointer"
              >
                <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <span>Enviar Comunicado</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('painel-gestao')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todas as ações</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Row de Tabelas: Consultas Públicas Ativas, Projetos Pendentes de Aprovação, Eventos Ativos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Consultas Públicas Ativas */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Consultas Públicas Ativas</h2>

            <div className="overflow-x-auto no-scrollbar mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10.5px] text-slate-400 font-semibold">
                    <th className="pb-2">Consulta</th>
                    <th className="pb-2">Território</th>
                    <th className="pb-2">Fim</th>
                    <th className="pb-2 text-right">Participantes</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Plano de Ação Climática 2030</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Porto, Portugal</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">25 Mai 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">1.248</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Em curso
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Orçamento Participativo 2025</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Lisboa, Portugal</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">28 Mai 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">2.156</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Em curso
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Mobilidade Urbana Sustentável</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Barcelona, Espanha</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">30 Mai 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">856</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Em curso
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Estratégia Digital Municipal</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Curitiba, Brasil</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">01 Jun 2025</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">542</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Em análise
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('participacao-consultas')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todas as consultas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Projetos Pendentes de Aprovação */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Projetos Pendentes de Aprovação</h2>

            <div className="overflow-x-auto no-scrollbar mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10.5px] text-slate-400 font-semibold">
                    <th className="pb-2">Projeto</th>
                    <th className="pb-2">Submetido por</th>
                    <th className="pb-2">Data</th>
                    <th className="pb-2 text-right">Prioridade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Parque Verde Comunitário</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Mun. de Guimarães</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">24 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        Alta
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Educação para Todos</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Associação Saber</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">24 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Média
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Energia Solar nas Escolas</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Mun. de Lagos</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">23 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Média
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Centro de Inovação Social</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">VILA Labs</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">23 Mai 2025</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200">
                        Baixa
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('projetos-iniciativas')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todos os projetos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Eventos Ativos */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Eventos Ativos</h2>

            <div className="overflow-x-auto no-scrollbar mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10.5px] text-slate-400 font-semibold">
                    <th className="pb-2">Evento</th>
                    <th className="pb-2">Data</th>
                    <th className="pb-2">Local</th>
                    <th className="pb-2 text-right">Inscritos</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Fórum Global de Comunidades</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">26 Mai 2025</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Lisboa, PT</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">1.532</td>
                    <td className="py-2.5 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Ao vivo
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Semana da Sustentabilidade</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">02 Jun 2025</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Online</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">2.378</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        Em breve
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Cimeira de Inovação Social</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">15 Jun 2025</td>
                    <td className="py-2.5 text-slate-500 text-[11px]">Nairóbi, Quênia</td>
                    <td className="py-2.5 font-bold text-slate-700 text-right">864</td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        Inscrições abertas
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToTab('eventos-globais-admin')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-end gap-1 cursor-pointer"
          >
            <span>Ver todos os eventos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PainelGestaoPlaceholderView;
