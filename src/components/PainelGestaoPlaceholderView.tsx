import React from 'react';
import {
  Building2,
  Shield,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  Sliders,
  FileCheck,
  BarChart3,
  Globe,
  Lock,
  ArrowLeft,
  Eye,
  Heart,
  Package,
  HelpCircle,
  UserCheck,
  ExternalLink,
  LifeBuoy,
  Cpu,
  Handshake,
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
  const getSectionMetadata = () => {
    switch (currentSection) {
      case 'gestao-utilizadores':
      case 'membros':
        return {
          title: 'Utilizadores e Comunidades (Membros)',
          breadcrumb: 'Membros',
          subtitle: 'Atalho da Sidebar do Cidadão para gestão de contas, perfis cívicos, comunidades e moderação local.',
          badge: 'Mapeado: Membros',
          icon: <Eye className="w-5 h-5 text-blue-300" />,
        };
      case 'gestao-parceiros':
        return {
          title: 'Parceiros e Colaborações',
          breadcrumb: 'Parceiros',
          subtitle: 'Atalho da Sidebar do Cidadão para governança de alianças institucionais, municípios e ONGs parceiras.',
          badge: 'Mapeado: Parceiros',
          icon: <Heart className="w-5 h-5 text-pink-300" />,
        };
      case 'gestao-recursos':
      case 'recursos':
        return {
          title: 'Recursos e Infraestrutura',
          breadcrumb: 'Recursos',
          subtitle: 'Atalho da Sidebar do Cidadão para monitorização de servidores, consumo de IA, APIs e capacidade técnica.',
          badge: 'Mapeado: Recursos',
          icon: <Package className="w-5 h-5 text-emerald-300" />,
        };
      case 'gestao-suporte':
      case 'suporte':
        return {
          title: 'Suporte e Atendimento da Plataforma',
          breadcrumb: 'Suporte',
          subtitle: 'Atalho da Sidebar do Cidadão para suporte técnico e assistência aos administradores e moderadores.',
          badge: 'Mapeado: Suporte (Em Validação)',
          icon: <HelpCircle className="w-5 h-5 text-amber-300" />,
        };
      case 'painel-gestao':
      default:
        return {
          title: 'Painel de Gestão da Plataforma',
          breadcrumb: 'Painel de Gestão',
          subtitle: 'Ambiente de governança, moderação, publicação institucional e acompanhamento de impacto territorial.',
          badge: 'Mapeado: Painel de Gestão',
          icon: <UserCheck className="w-5 h-5 text-blue-300" />,
        };
    }
  };

  const meta = getSectionMetadata();

  React.useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Início', onClick: () => onNavigateToTab('inicio') },
      { label: 'Plataforma', onClick: () => onNavigateToTab('painel-gestao') },
      { label: meta.breadcrumb },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab, meta.breadcrumb]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 5 Atalhos de Navegação Interna para alternar rapidamente entre as 5 telas mapeadas */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl overflow-x-auto no-scrollbar border border-slate-200/80">
        {[
          { id: 'painel-gestao', label: 'Painel de Gestão', icon: <UserCheck className="w-3.5 h-3.5" /> },
          { id: 'gestao-utilizadores', label: 'Membros', icon: <Eye className="w-3.5 h-3.5" /> },
          { id: 'gestao-parceiros', label: 'Parceiros', icon: <Heart className="w-3.5 h-3.5" /> },
          { id: 'gestao-recursos', label: 'Recursos', icon: <Package className="w-3.5 h-3.5" /> },
          { id: 'gestao-suporte', label: 'Suporte', icon: <HelpCircle className="w-3.5 h-3.5" /> },
        ].map((tab) => {
          const isActive =
            currentSection === tab.id ||
            (tab.id === 'gestao-utilizadores' && currentSection === 'membros') ||
            (tab.id === 'gestao-recursos' && currentSection === 'recursos') ||
            (tab.id === 'gestao-suporte' && currentSection === 'suporte');
          return (
            <button
              key={tab.id}
              type="button"
              id={`tab-plataforma-shortcut-${tab.id}`}
              onClick={() => {
                if ((tab.id === 'gestao-suporte' || tab.id === 'suporte') && onOpenSupportModal) {
                  onOpenSupportModal();
                } else {
                  onNavigateToTab(tab.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-[#0055FE] shadow-2xs border border-blue-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Header do Painel */}
      <div className="bg-gradient-to-r from-[#0F1E3D] via-[#162B56] to-[#0055FE] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
              <Shield className="w-3.5 h-3.5 text-blue-300" />
              <span>Acesso Administrativo Autorizado</span>
              <span className="text-white/40">•</span>
              <span className="text-white font-bold">{meta.badge}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
                {meta.icon}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight">
                {meta.title}
              </h1>
            </div>

            <p className="text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              {meta.subtitle}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3.5 shrink-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/40"
            />
            <div>
              <div className="text-xs font-medium text-blue-200">Administrador Ativo</div>
              <div className="text-sm font-bold text-white">{currentUser.name}</div>
              <div className="inline-block text-[11px] font-semibold text-blue-100 bg-blue-600/50 px-2 py-0.5 rounded mt-0.5">
                {currentUser.roleLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Escopo da Autoridade */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-blue-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-300" />
            <span>Escopo Territorial Ativo:</span>
            <strong className="text-white px-2 py-0.5 rounded bg-white/15 border border-white/20">
              {currentUser.scope}
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>5 Atalhos Mapeados a partir da UI de Referência</span>
          </div>
        </div>
      </div>

      {/* Seção Condicional por Atalho Ativo */}
      {(currentSection === 'gestao-suporte' || currentSection === 'suporte') ? (
        /* Opção 2: Central de Atendimento & Modal Rápido de Suporte */
        <div className="bg-white border border-blue-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0055FE] border border-blue-200 text-xs font-bold">
                <LifeBuoy className="w-3.5 h-3.5 text-[#0055FE]" />
                <span>Atalho de Suporte Operacional (Opção 2 Ativa)</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                Central de Atendimento & Suporte Técnico
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Canal direto e prioritário de assistência técnica para administradores municipais, regionais e globais da plataforma VILA.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onOpenSupportModal && (
                <button
                  type="button"
                  id="btn-open-support-modal-direct"
                  onClick={onOpenSupportModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0055FE] hover:bg-blue-600 shadow-xs transition-colors cursor-pointer"
                >
                  <LifeBuoy className="w-4 h-4" />
                  <span>Abrir Modal de Atendimento</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigateToTab('painel-gestao')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <span>Painel Principal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/50 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-blue-600" />
                Modal Rápido Integrado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Envio imediato de tíquetes operacionais com categoria de incidentes, dúvidas de moderação e solicitação de permissões territoriais.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-slate-600" />
                E-mail & SLA Prioritário
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contacto institucional direto em <strong className="text-slate-800">suporte@vilaglobal.org</strong> com resposta média inferior a 2 horas.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Escopo {currentUser.scope}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                As ocorrências são automaticamente vinculadas ao seu território de autoridade para resolução ágil.
              </p>
            </div>
          </div>
        </div>
      ) : (currentSection === 'gestao-utilizadores' || currentSection === 'membros') ? (
        /* Tela de Membros -> Utilizadores e Comunidades */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-2">
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span>Atalho Mapeado para "Utilizadores e Comunidades"</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                Supervisão de Membros, Comunidades e Moderação
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                O atalho <strong>Membros</strong> da Sidebar do Cidadão liga diretamente ao módulo operacional de utilizadores da Plataforma VILA.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab('inicio')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Início</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Gestão de Cidadãos</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Listagem, filtros por território ({currentUser.scope}), reputação cívica e estado de validação de conta.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Moderadores Comunitários</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Atribuição de direitos de moderação para causas temáticas e assembleias locais.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Comunidades Ativas</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aprovação e monitorização de novos polos comunitários e assembleias cívicas.
              </p>
            </div>
          </div>
        </div>
      ) : (currentSection === 'gestao-parceiros') ? (
        /* Tela de Parceiros -> Parceiros e Colaborações */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 text-pink-800 border border-pink-200 text-xs font-bold mb-2">
                <Heart className="w-3.5 h-3.5 text-pink-600" />
                <span>Atalho Mapeado para "Parceiros e Colaborações"</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                Alianças Estratégicas & Institucionais
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                O atalho <strong>Parceiros</strong> da Sidebar do Cidadão aponta para o gerenciamento de acordos intermunicipais, universidades, ONGs e organismos internacionais.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab('inicio')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Início</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Entidades Governamentais</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Câmaras Municipais, Juntas de Freguesia e Ministérios com protocolos ativos na VILA.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Fundações & ONGs</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Projetos co-financiados, alianças climáticas e iniciativas sociais globais.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Setor Privado Sustentável</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empresas com programas de responsabilidade corporativa integrados à rede cívica.
              </p>
            </div>
          </div>
        </div>
      ) : (currentSection === 'gestao-recursos' || currentSection === 'recursos') ? (
        /* Tela de Recursos -> Recursos e Infraestrutura */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <Package className="w-3.5 h-3.5 text-emerald-600" />
                <span>Atalho Mapeado para "Recursos e Infraestrutura"</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                Infraestrutura Técnica, APIs e Capacidade
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                O atalho <strong>Recursos</strong> da Sidebar do Cidadão liga à monitorização em tempo real de servidores, modelos de IA e serviços essenciais.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab('inicio')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Início</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Consumo de VILA AI</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monitorização de requisições de agentes cívicos, moderação automática e sínteses.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">APIs & Dados Abertos</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                44/50 APIs ativas, latência média de 120ms e disponibilidade global de 99,98%.
              </p>
            </div>
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Banda & Armazenamento</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Armazenamento de anexos cívicos e sincronização distribuída de vilas.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Tela Padrão: Painel de Gestão */
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold mb-2">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Visão Executiva do Administrador</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
                Painel de Gestão Central
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl">
                Monitorização operacional em tempo real da plataforma VILA conforme a referência <code>UI PAINEL DE GESTAO.png</code>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab('inicio')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Início</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0055FE] flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Moderação de Ideias</h3>
                <p className="text-xs text-slate-500">
                  Aprovação, revisão e mediação de propostas cívicas submetidas pelos cidadãos.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 mt-4">Próximo Passo</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Gestão Territorial</h3>
                <p className="text-xs text-slate-500">
                  Parametrização de divisões administrativas, bairros, vilas e dados geoespaciais.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 mt-4">Próximo Passo</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Métricas & Participação</h3>
                <p className="text-xs text-slate-500">
                  Taxas de adesão cívica, orçamentos participativos e engajamento comunitário.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 mt-4">Próximo Passo</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Configurações do Escopo</h3>
                <p className="text-xs text-slate-500">
                  Políticas de participação, regulamentos e canais oficiais de comunicação institucional.
                </p>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 mt-4">Próximo Passo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
