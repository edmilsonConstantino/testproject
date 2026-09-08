import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MapHeroSection } from './components/MapHeroSection';
import { FeaturedCountriesSection } from './components/FeaturedCountriesSection';
import { ExploreWorldView } from './components/ExploreWorldView';
import { GlobalNewsView } from './components/GlobalNewsView';
import { GlobalEventsView } from './components/GlobalEventsView';
import { GlobalCommunityView } from './components/GlobalCommunityView';
import { GlobalImpactView } from './components/GlobalImpactView';
import { AboutVilaView } from './components/AboutVilaView';
import { SettingsView } from './components/SettingsView';
import { CountryDetailModal } from './components/CountryDetailModal';
import { VideoModal } from './components/VideoModal';
import { SearchCommandModal } from './components/SearchCommandModal';
import { VilaAiChatModal } from './components/VilaAiChatModal';
import { AuthModal } from './components/AuthModal';
import { ImpactModal } from './components/ImpactModal';
import { COUNTRIES_DATA } from './data/countriesData';
import { CountryData } from './types';
import {
  Globe2,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  HeartHandshake,
  Info,
  Settings,
  ArrowRight,
  CheckCircle2,
  Filter,
  Flame,
} from 'lucide-react';

const getInitialTab = (): string => {
  if (typeof window === 'undefined') return 'inicio';
  const hash = window.location.hash.replace('#', '').toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab')?.toLowerCase();
  const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
  const target = tabParam || hash || pathname;

  if (
    target === 'noticias' ||
    target === 'movimento' ||
    target === 'mundo-em-movimento' ||
    target.includes('movimento') ||
    target.includes('noticia')
  ) {
    return 'noticias';
  } else if (target === 'comunidade' || target === 'comunidade-global' || target.includes('comunidade')) {
    return 'comunidade';
  } else if (target === 'eventos' || target === 'eventos-globais') {
    return 'eventos';
  } else if (target === 'explorar' || target === 'explorar-o-mundo') {
    return 'explorar';
  } else if (target === 'impacto' || target === 'impacto-global') {
    return 'impacto';
  } else if (target === 'sobre' || target === 'sobre-a-vila' || target.includes('sobre')) {
    return 'sobre';
  } else if (target === 'definicoes' || target === 'settings' || target === 'preferencias' || target === 'configuracoes' || target === 'privacidade' || target === 'seguranca') {
    return 'definicoes';
  } else if (target === 'inicio') {
    return 'inicio';
  } else if (target === 'comunidade' || target === 'comunidade-global') {
    return 'comunidade';
  }
  return 'definicoes';
};

export default function App() {
  const [currentTab, setCurrentTab] = useState(getInitialTab);
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(COUNTRIES_DATA[0]); // Portugal by default
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // URL hash, query parameter and pathname router sync
  useEffect(() => {
    const handleSyncRoute = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab')?.toLowerCase();
      const pathname = window.location.pathname.replace(/^\//, '').toLowerCase();
      const target = tabParam || hash || pathname;

      if (
        target === 'noticias' ||
        target === 'movimento' ||
        target === 'mundo-em-movimento' ||
        target.includes('movimento') ||
        target.includes('noticia')
      ) {
        setCurrentTab('noticias');
      } else if (target === 'comunidade' || target === 'comunidade-global' || target.includes('comunidade') || target === 'ambiente' || target === 'explorar-comunidade') {
        setCurrentTab('comunidade');
      } else if (target === 'eventos' || target === 'eventos-globais') {
        setCurrentTab('eventos');
      } else if (target === 'explorar' || target === 'explorar-o-mundo') {
        setCurrentTab('explorar');
      } else if (target === 'empreendedorismo' || target === 'tecnologia' || target === 'saude') {
        setCurrentTab(target);
      } else if (target === 'impacto' || target === 'impacto-global') {
        setCurrentTab('impacto');
      } else if (target === 'sobre' || target === 'sobre-a-vila' || target.includes('sobre')) {
        setCurrentTab('sobre');
      } else if (target === 'definicoes' || target === 'settings' || target === 'preferencias' || target === 'configuracoes') {
        setCurrentTab('definicoes');
      } else if (target === 'inicio' || target === 'home' || target === '') {
        setCurrentTab('inicio');
      }
    };

    handleSyncRoute();
    window.addEventListener('hashchange', handleSyncRoute);
    window.addEventListener('popstate', handleSyncRoute);
    return () => {
      window.removeEventListener('hashchange', handleSyncRoute);
      window.removeEventListener('popstate', handleSyncRoute);
    };
  }, []);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country);
  };

  const handleExploreCountry = (country: CountryData) => {
    setSelectedCountry(country);
    setIsCountryModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  return (
    <>
      <AppLayout
        currentTab={currentTab}
        onSelectTab={(tabId) => {
          if (tabId === 'ia') {
            setIsAiModalOpen(true);
            return;
          }
          setCurrentTab(tabId);
          window.location.hash = tabId;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenImpactModal={() => setIsImpactModalOpen(true)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        searchPlaceholder={
          currentTab === 'comunidade'
            ? 'Pesquisar pessoas, comunidades, temas, organizações...'
            : currentTab === 'eventos'
            ? 'Pesquisar eventos, temas, locais, organizações...'
            : currentTab === 'noticias' || currentTab === 'movimento'
            ? 'Pesquisar temas, países, pessoas, organizações...'
            : 'Pesquisar países, regiões, cidades, projetos, comunidades...'
        }
        showTopbar={
          currentTab === 'inicio' ||
          currentTab === 'noticias' ||
          currentTab === 'movimento' ||
          currentTab === 'eventos' ||
          currentTab === 'comunidade'
        }
      >
        {currentTab === 'inicio' ? (
          <div className="px-3.5 sm:px-5 lg:px-6 pt-1 pb-10 flex flex-col gap-6 lg:gap-8 max-w-[1600px] mx-auto">
            {/* Hero Section with Interactive Vector World Map */}
            <MapHeroSection
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              onExploreWorld={() => {
                setCurrentTab('explorar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onWatchTour={() => setIsVideoModalOpen(true)}
              onExploreCountry={handleExploreCountry}
            />

            {/* Featured Countries Section Carousel */}
            <FeaturedCountriesSection
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              onExploreCountry={handleExploreCountry}
              onViewAllCountries={() => {
                setCurrentTab('explorar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
            />
          </div>
        ) : currentTab === 'explorar' ? (
          <div className="px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 pb-10 flex flex-col gap-6 lg:gap-8 max-w-[1600px] mx-auto">
            {/* Explorar o Mundo View with 3 Columns and Map */}
            <ExploreWorldView
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
              onExploreCountry={handleExploreCountry}
              onBackToHome={() => {
                setCurrentTab('inicio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            />
          </div>
        ) : (currentTab === 'noticias' || currentTab === 'movimento' || currentTab === 'mundo-em-movimento') ? (
          /* Notícias Globais / Mundo em Movimento View */
          <GlobalNewsView
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onExploreMap={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : currentTab === 'eventos' ? (
          /* Eventos Globais View */
          <GlobalEventsView 
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onExploreMap={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (currentTab === 'comunidade' || currentTab === 'comunidade-global' || currentTab === 'ambiente' || currentTab === 'educacao' || currentTab === 'direitos-humanos' || currentTab === 'cultura' || currentTab === 'criar-comunidade' || currentTab === 'explorar-comunidade') ? (
          /* Comunidade Global (Página Oficial, Categorias e Criar Comunidade UI CRIAR COMUNIDADE.png) */
          <GlobalCommunityView
            initialSubView={
              currentTab === 'ambiente' || currentTab === 'explorar-comunidade'
                ? 'ambiente'
                : currentTab === 'educacao'
                ? 'educacao'
                : currentTab === 'direitos-humanos'
                ? 'direitos-humanos'
                : currentTab === 'cultura'
                ? 'cultura'
                : currentTab === 'criar-comunidade'
                ? 'criar-comunidade'
                : 'official'
            }
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onOpenAuth={handleOpenAuth}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreMap={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreWorld={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCreateCommunityModal={() => {
              setAuthModal({ isOpen: true, mode: 'register' });
            }}
          />
        ) : (currentTab === 'impacto' || currentTab === 'impacto-global' || currentTab === 'saude' || currentTab === 'tecnologia' || currentTab === 'empreendedorismo' || currentTab === 'ambiente') ? (
          /* Impacto Global (UI IMPACTO GLOBAL.png) / Ambiente / Saúde / Tecnologia / Empreendedorismo */
          <GlobalImpactView
            initialSubView={currentTab === 'empreendedorismo' ? 'empreendedorismo' : currentTab === 'tecnologia' ? 'tecnologia' : currentTab === 'saude' ? 'saude' : currentTab === 'ambiente' ? 'ambiente' : 'todas'}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onOpenAuth={handleOpenAuth}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreWorld={() => {
              setCurrentTab('explorar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreCommunity={() => {
              setCurrentTab('comunidade');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (currentTab === 'sobre' || currentTab === 'sobre-a-vila') ? (
          /* Sobre a VILA View matching exact reference UI SOBRE.png */
          <SettingsView
            initialTab="sobre"
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          />
        ) : (currentTab === 'definicoes' || currentTab === 'preferencias' || currentTab === 'settings' || currentTab === 'configuracoes' || currentTab === 'privacidade' || currentTab === 'seguranca') ? (
          /* Definições / Preferências Master Section matching PERFIL.png and 7 Tabs Specification */
          <SettingsView
            initialTab="sobre"
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onNavigateToTab={(tabId) => {
              setCurrentTab(tabId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiAssistant={() => setIsAiModalOpen(true)}
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          />
        ) : (
          /* Subview Render for Other Sidebar Tabs */
          <div className="px-3.5 sm:px-5 lg:px-6 pt-4 sm:pt-6 pb-10 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-200 overflow-y-auto pr-1">
            {/* Back to Home Breadcrumb */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-[#0F1E3D] font-['Outfit'] capitalize">
                  {currentTab === 'comunidade' && 'Comunidade Global'}
                  {currentTab === 'indicadores' && 'Indicadores Globais'}
                  {currentTab === 'ia' && 'VILA AI'}
                  {currentTab === 'impacto' && 'Impacto Global'}
                  {currentTab === 'parceiros' && 'Parceiros'}
                  {currentTab === 'sobre' && 'Sobre a VILA'}
                  {currentTab === 'definicoes' && 'Definições da Plataforma'}
                </h1>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Painel de gestão e monitorização contínua do ecossistema VILA.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab('inicio')}
                className="px-4 py-2 text-xs font-bold text-[#2563EB] bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                ← Voltar ao Início
              </button>
            </div>

            {currentTab === 'ia' && (
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 text-center max-w-xl mx-auto space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#10B981] mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#0F1E3D] font-['Outfit']">
                  VILA AI Assistant
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Converse com a nossa inteligência coletiva para encontrar oportunidades de voluntariado, parceiros de projetos e financiamento de impacto.
                </p>
                <button
                  onClick={() => setIsAiModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
                >
                  Iniciar Conversa com VILA AI
                </button>
              </div>
            )}

            {['comunidade', 'impacto', 'parceiros', 'sobre'].includes(
              currentTab
            ) &&
              currentTab !== 'ia' &&
              currentTab !== 'explorar' && (
                <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F1E3D]">Módulo Sincronizado</h3>
                      <p className="text-xs text-[#64748B]">
                        Todos os dados desta secção são atualizados em tempo real pelos servidores da VILA.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-[#475569]">
                      Pretende aceder ao relatório completo e interativo de impacto global?
                    </span>
                    <button
                      onClick={() => setIsImpactModalOpen(true)}
                      className="px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
                    >
                      Abrir Relatório
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </AppLayout>

      {/* 3. Interactive Modals */}
      <CountryDetailModal
        country={selectedCountry}
        onClose={() => setIsCountryModalOpen(false)}
        isOpen={isCountryModalOpen}
        onJoinCommunity={(countryName) => {
          alert(`Inscrição realizada com sucesso na comunidade de ${countryName}!`);
        }}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <SearchCommandModal
        isOpen={isSearchModalOpen}
        placeholder={
          currentTab === 'noticias'
            ? 'Pesquisar temas, países, pessoas, organizações...'
            : currentTab === 'eventos'
            ? 'Pesquisar eventos, temas, locais, organizações...'
            : 'Pesquisar países, regiões, projetos ou iniciativas...'
        }
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCountry={(country) => {
          setSelectedCountry(country);
          setIsCountryModalOpen(true);
        }}
      />

      <VilaAiChatModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onLoginSuccess={() => setIsLoggedIn(true)}
      />

      <ImpactModal
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
      />
    </>
  );
}
