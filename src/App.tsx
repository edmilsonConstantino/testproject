import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { MapHeroSection } from './components/MapHeroSection';
import { FeaturedCountriesSection } from './components/FeaturedCountriesSection';
import { ExploreWorldView } from './components/ExploreWorldView';
import { GlobalNewsView } from './components/GlobalNewsView';
import { GlobalEventsView } from './components/GlobalEventsView';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState('inicio');
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
    <div className="min-h-screen bg-[#F1F5F9] text-[#475569] flex antialiased">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tabId) => {
          setCurrentTab(tabId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
        onOpenImpactModal={() => setIsImpactModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area (Right of Sidebar) */}
      <div className="flex-1 md:pl-[230px] flex flex-col min-w-0 min-h-screen transition-all duration-300">
        {/* Topbar Navigation - Presente nas páginas Início, Notícias Globais e Eventos Globais */}
        {(currentTab === 'inicio' || currentTab === 'noticias' || currentTab === 'eventos') && (
          <Topbar
            searchPlaceholder={
              currentTab === 'eventos'
                ? 'Pesquisar eventos, temas, locais, organizações...'
                : currentTab === 'noticias'
                ? 'Pesquisar notícias, temas, fontes, autores...'
                : 'Pesquisar países, regiões, cidades, projetos, comunidades...'
            }
            onOpenSearchModal={() => setIsSearchModalOpen(true)}
            onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {/* Scrollable Dashboard Viewport */}
        <main className={`flex-1 w-full overflow-y-auto ${
          currentTab === 'noticias' || currentTab === 'eventos'
            ? 'p-0'
            : `px-3.5 sm:px-5 lg:px-6 pb-10 flex flex-col gap-6 lg:gap-8 max-w-[1600px] mx-auto ${
                currentTab === 'inicio' ? 'pt-1' : 'pt-4 sm:pt-6'
              }`
        }`}>
          {currentTab === 'inicio' ? (
            <div className="flex flex-col gap-6 lg:gap-8">
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
            /* Explorar o Mundo View with 3 Columns and Map */
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
          ) : currentTab === 'noticias' ? (
            /* Notícias Globais View */
            <GlobalNewsView onOpenAiAssistant={() => setIsAiModalOpen(true)} />
          ) : currentTab === 'eventos' ? (
            /* Eventos Globais View */
            <GlobalEventsView 
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              onExploreMap={() => {
                setCurrentTab('explorar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            /* Subview Render for Other Sidebar Tabs */
            <div className="space-y-6 animate-in fade-in duration-200 overflow-y-auto pr-1 pb-8">
              {/* Back to Home Breadcrumb */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0F1E3D] font-['Outfit'] capitalize">
                    {currentTab === 'movimento' && 'Notícias Globais'}
                    {currentTab === 'eventos' && 'Eventos Globais'}
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

              {/* Tab Specific Content */}
              {currentTab === 'movimento' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#0F1E3D]">Atividade em Tempo Real</h3>
                        <p className="text-xs text-[#64748B]">
                          Atualizações ao vivo enviadas por líderes de projetos ao redor do mundo.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full animate-pulse">
                      Ao Vivo
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E2E8F0] divide-y divide-slate-100 overflow-hidden">
                    <div className="p-4 flex items-start gap-4">
                      <span className="text-2xl">🇵🇹</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#0F1E3D]">
                            Vila de Monsanto • Portugal
                          </h4>
                          <span className="text-[10px] text-[#94A3B8]">Há 4 min</span>
                        </div>
                        <p className="text-xs text-[#475569] mt-0.5">
                          Conclusão da primeira fase da rede comunitária de energia solar em telhados de granito.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-start gap-4">
                      <span className="text-2xl">🇧🇷</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#0F1E3D]">
                            Santarém, Pará • Brasil
                          </h4>
                          <span className="text-[10px] text-[#94A3B8]">Há 18 min</span>
                        </div>
                        <p className="text-xs text-[#475569] mt-0.5">
                          Inauguração da casa de sementes nativas com 45 famílias ribeirinhas cadastradas.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-start gap-4">
                      <span className="text-2xl">🇰🇪</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-[#0F1E3D]">
                            Narok • Quénia
                          </h4>
                          <span className="text-[10px] text-[#94A3B8]">Há 42 min</span>
                        </div>
                        <p className="text-xs text-[#475569] mt-0.5">
                          Novo poço com bomba alimentada por energia solar entrega água potável para 3 vilarejos Maasai.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

              {['eventos', 'comunidade', 'impacto', 'parceiros', 'sobre', 'definicoes'].includes(
                currentTab
              ) &&
                currentTab !== 'ia' &&
                currentTab !== 'movimento' &&
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
        </main>
      </div>

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
      />

      <ImpactModal
        isOpen={isImpactModalOpen}
        onClose={() => setIsImpactModalOpen(false)}
      />
    </div>
  );
}
