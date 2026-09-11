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
} from 'lucide-react';
import { DemoUser } from '../data/demoUsers';
import { BreadcrumbItem } from './Topbar';

interface PainelGestaoPlaceholderViewProps {
  currentUser: DemoUser;
  onNavigateToTab: (tabId: string) => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const PainelGestaoPlaceholderView: React.FC<PainelGestaoPlaceholderViewProps> = ({
  currentUser,
  onNavigateToTab,
  onBreadcrumbChange,
}) => {
  React.useEffect(() => {
    onBreadcrumbChange?.([
      { label: 'Início', onClick: () => onNavigateToTab('inicio') },
      { label: 'Plataforma' },
      { label: 'Painel de Gestão' },
    ]);
  }, [onBreadcrumbChange, onNavigateToTab]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header do Painel */}
      <div className="bg-gradient-to-r from-[#0F1E3D] via-[#162B56] to-[#0055FE] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
              <Shield className="w-3.5 h-3.5 text-blue-300" />
              <span>Acesso Administrativo Autorizado</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight">
              Painel de Gestão da Plataforma
            </h1>
            <p className="text-sm text-blue-100/80 max-w-2xl leading-relaxed">
              Ambiente de governança, moderação, publicação institucional e acompanhamento de impacto territorial.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3.5 shrink-0">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/40"
            />
            <div>
              <div className="text-xs font-medium text-blue-200">Sessão Ativa</div>
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
            <span>Permissões em vigor: Nível de Administrador</span>
          </div>
        </div>
      </div>

      {/* Cartão de Estado & Próximos Módulos */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Em Preparação para Construção</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-['Outfit']">
              Estrutura de Gestão Pronta para Implementação
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              O sistema de papéis e o seletor de utilizadores demo estão configurados e ativos. As telas completas do Painel de Gestão serão construídas a seguir para permitir aos administradores gerir conteúdos, territórios e consultas públicas de acordo com o seu escopo.
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

        {/* Grade com Módulos que farão parte do Painel de Gestão */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0055FE] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Moderação de Ideias & Projetos</h3>
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
              <h3 className="text-sm font-bold text-slate-900">Gestão Territorial & Vilas</h3>
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
                Taxas de adesão cívica, orçamentos participativos e índices de engajamento comunitário.
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
    </div>
  );
};
