import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  ShieldCheck,
  MapPin,
  Heart,
  Compass,
  Sparkles,
  Users,
  Lightbulb,
  Award,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { PerfilVilaTabId } from './types';
import { VilaPerfilTab } from './VilaPerfilTab';
import { IdentidadeVilaTab } from './IdentidadeVilaTab';
import { TerritoriosTab } from './TerritoriosTab';
import { InteressesVisaoGeralTab } from './InteressesVisaoGeralTab';
import { InteressesTemasTab } from './InteressesTemasTab';
import { InteressesCausasTab } from './InteressesCausasTab';
import { InteressesComunidadesTab } from './InteressesComunidadesTab';
import { InteressesOportunidadesTab } from './InteressesOportunidadesTab';
import { BreadcrumbItem } from '../Topbar';
import { DemoUser } from '../../data/demoUsers';

interface PerfilVilaViewProps {
  initialTab?: PerfilVilaTabId;
  currentUser?: DemoUser;
  onNavigateToTab?: (tabId: string) => void;
  onOpenAiAssistant?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
}

export const PerfilVilaView: React.FC<PerfilVilaViewProps> = ({
  initialTab = 'perfil',
  currentUser,
  onNavigateToTab,
  onOpenAiAssistant,
  onOpenAuth,
  onBreadcrumbChange,
}) => {
  const [activeTab, setActiveTab] = useState<PerfilVilaTabId>(initialTab);

  // Sincroniza initialTab se alterado externamente
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Definição oficial das 8 abas solicitadas
  const tabs: { id: PerfilVilaTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'identidade', label: 'Identidade VILA', icon: ShieldCheck },
    { id: 'territorios', label: 'Territórios', icon: MapPin },
    { id: 'interesses-geral', label: 'Interesses', icon: Heart },
    { id: 'interesses-temas', label: 'Temas', icon: Compass },
    { id: 'interesses-causas', label: 'Causas', icon: Sparkles },
    { id: 'interesses-comunidades', label: 'Comunidades', icon: Users },
    { id: 'interesses-oportunidades', label: 'Oportunidades', icon: Lightbulb },
  ];

  // Metadados dinâmicos por aba
  const tabMetadata: Record<
    PerfilVilaTabId,
    { title: string; subtitle: string; breadcrumb: string }
  > = {
    perfil: {
      title: 'A Minha Conta',
      subtitle: 'Gerencie o seu perfil, preferências e participação na VILA.',
      breadcrumb: 'Perfil',
    },
    identidade: {
      title: 'Identidade VILA',
      subtitle: 'Esta é a sua identidade cívica global na VILA.',
      breadcrumb: 'Identidade VILA',
    },
    territorios: {
      title: 'Os Meus Territórios',
      subtitle: 'Gerencie os territórios onde participa, contribui e gera impacto.',
      breadcrumb: 'Territórios',
    },
    'interesses-geral': {
      title: 'Interesses e Causas',
      subtitle: 'Os seus interesses conectam-no a comunidades, territórios, projetos e oportunidades para gerar impacto positivo.',
      breadcrumb: 'Interesses e Causas',
    },
    'interesses-temas': {
      title: 'Interesses e Causas — Temas',
      subtitle: 'Escolha os temas que o movem e personalize a sua experiência na VILA.',
      breadcrumb: 'Temas',
    },
    'interesses-causas': {
      title: 'Causas que Apoio',
      subtitle: 'Apoie as causas que mais importam para si e receba informações e oportunidades.',
      breadcrumb: 'Causas',
    },
    'interesses-comunidades': {
      title: 'Comunidades que Faço Parte',
      subtitle: 'Participe nas comunidades que partilham os seus interesses e causas.',
      breadcrumb: 'Comunidades',
    },
    'interesses-oportunidades': {
      title: 'Oportunidades para Agir',
      subtitle: 'Descubra oportunidades alinhadas com os seus interesses e causas.',
      breadcrumb: 'Oportunidades',
    },
  };

  const onBreadcrumbChangeRef = useRef(onBreadcrumbChange);
  onBreadcrumbChangeRef.current = onBreadcrumbChange;
  const onNavigateToTabRef = useRef(onNavigateToTab);
  onNavigateToTabRef.current = onNavigateToTab;

  // Atualiza breadcrumb global
  useEffect(() => {
    onBreadcrumbChangeRef.current?.([
      { label: 'Início', onClick: () => onNavigateToTabRef.current?.('inicio') },
      { label: 'A Minha Conta', onClick: () => setActiveTab('perfil') },
      { label: tabMetadata[activeTab].breadcrumb },
    ]);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* 1. Header do Perfil VILA (Padrão visual de SettingsView) */}
      <div className="bg-white border-b border-slate-200/80 sticky top-14 z-20 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-5 sm:pt-6 space-y-4">
          {/* Título e Subtítulo dinâmico */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] font-['Outfit'] tracking-tight">
              {tabMetadata[activeTab].title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              {tabMetadata[activeTab].subtitle}
            </p>
          </div>

          {/* Barra de Navegação das 8 Abas (Padrão de SettingsView com linha sublinhada) */}
          <div className="border-t border-slate-100 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-6 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-2 flex items-center gap-2 text-xs sm:text-[13px] font-semibold transition-all relative cursor-pointer ${
                      isActive
                        ? 'text-[#0055FE]'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0055FE]' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>

                    {/* Linha azul sublinhada para aba ativa */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0055FE] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Conteúdo da Aba Ativa */}
      <main className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 pt-5 sm:pt-6">
        {activeTab === 'perfil' && (
          <VilaPerfilTab
            currentUser={currentUser}
            onNavigateToSubTab={(subTab) => setActiveTab(subTab)}
            onOpenAiAssistant={onOpenAiAssistant}
            onNavigateToTab={onNavigateToTab}
          />
        )}
        {activeTab === 'identidade' && (
          <IdentidadeVilaTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'territorios' && (
          <TerritoriosTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-geral' && (
          <InteressesVisaoGeralTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-temas' && (
          <InteressesTemasTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-causas' && (
          <InteressesCausasTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-comunidades' && (
          <InteressesComunidadesTab onNavigateToTab={onNavigateToTab} />
        )}
        {activeTab === 'interesses-oportunidades' && (
          <InteressesOportunidadesTab onNavigateToTab={onNavigateToTab} />
        )}
      </main>
    </div>
  );
};
