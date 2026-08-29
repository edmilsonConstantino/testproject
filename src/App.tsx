import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MapHeroSection } from './components/MapHeroSection';
import { FeaturedCountriesSection } from './components/FeaturedCountriesSection';
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
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Header */}
        <Header
          onOpenSearch={() => setIsSearchModalOpen(true)}
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenAuth={handleOpenAuth}
          onOpenAiChat={() => setIsAiModalOpen(true)}
        />

        {/* Scrollable Main Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {currentTab === 'inicio' ? (
            <>
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
                onSelectCountry={handleSelectCountry}
                onExploreCountry={handleExploreCountry}
                onViewAllCountries={() => {
                  setCurrentTab('explorar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAiAssistant={() => setIsAiModalOpen(true)}
              />
            </>
          ) : (
            /* Subview Render for Other Sidebar Tabs */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Back to Home Breadcrumb */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#0F1E3D] font-['Outfit'] capitalize">
                    {currentTab === 'explorar' && 'Explorar o Mundo'}
                    {currentTab === 'movimento' && 'Mundo em Movimento'}
                    {currentTab === 'eventos' && 'Eventos Globais'}
                    {currentTab === 'comunidade' && 'Comunidade Global'}
                    {currentTab === 'ia' && 'VILA AI'}
                    {currentTab === 'impacto' && 'Impacto Global'}
                    {currentTab === 'parceiros' && 'Parceiros Globais'}
                    {currentTab === 'sobre' && 'Sobre a VILA'}
                    {currentTab === 'definicoes' && 'Definições da Plataforma'}
                  </h1>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Painel de gestão e monitorização contínua do ecossistema VILA.
                  </p>
                </div>

                <button
                  onClick={() => setCurrentTab('inicio')}
                  className="px-4 py-2 text-xs font-bold text-[#2563EB] bg-white border border-[#E2E8F0] hover:bg-slate-50 rounded-xl transition-colors shadow-2xs"
                >
                  ← Voltar ao Início
                </button>
              </div>

              {/* Tab Specific Content */}
              {currentTab === 'explorar' && (
                <div className="space-y-6">
                  {/* Grid of all countries */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {COUNTRIES_DATA.map((country) => (
                      <div
                        key={country.id}
                        onClick={() => handleExploreCountry(country)}
                        className="bg-white rounded-2xl border border-[#E2E8F0] p-4 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{country.flag}</span>
                            <div>
                              <h3 className="text-sm font-bold text-[#0F1E3D] group-hover:text-[#2563EB]">
                                {country.name}
                              </h3>
                              <span className="text-[10px] text-[#94A3B8]">{country.region}</span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase ${
                              country.status === 'active'
                                ? 'bg-[#DCFCE7] text-[#16A34A]'
                                : country.status === 'with-activity'
                                ? 'bg-blue-50 text-[#2563EB]'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {country.statusLabel || (country.status === 'active' ? 'ATIVO' : 'COM ATIVIDADE')}
                          </span>
                        </div>

                        <p className="text-xs text-[#475569] line-clamp-2 mb-3">
                          {country.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                          <div>
                            <span className="text-[#94A3B8] block">Projetos:</span>
                            <span className="font-bold text-[#0F1E3D]">
                              {country.projectsCount.toLocaleString('pt-PT')}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#94A3B8] block">Comunidades:</span>
                            <span className="font-bold text-[#0F1E3D]">
                              {country.communitiesCount.toLocaleString('pt-PT')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
