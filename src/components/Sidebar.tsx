import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Users,
  Sparkles,
  HeartHandshake,
  Info,
  Settings,
  ChevronDown,
  ArrowRight,
  Sun,
  X
} from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenImpactModal?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenAuth,
  onOpenImpactModal,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [selectedLang, setSelectedLang] = useState<'PT' | 'EN' | 'ES'>('PT');
  const [isLangOpen, setIsLangOpen] = useState(false);

  // 10 navigation items matching exact reference design
  const navItems = [
    {
      id: 'inicio',
      label: 'Início',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    { id: 'explorar', label: 'Explorar o Mundo', icon: Compass },
    {
      id: 'movimento',
      label: 'Mundo em Movimento',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
      ),
      badge: 'NOVO'
    },
    { id: 'eventos', label: 'Eventos Globais', icon: Calendar },
    { id: 'comunidade', label: 'Comunidade Global', icon: Users },
    { id: 'ia', label: 'VILA AI', icon: Sparkles },
    {
      id: 'impacto',
      label: 'Impacto Global',
      customIcon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.9 9.2A7 7 0 0 1 11 20Z" />
          <path d="m2 22 10-10" />
        </svg>
      )
    },
    { id: 'parceiros', label: 'Parceiros Globais', icon: HeartHandshake },
    { id: 'sobre', label: 'Sobre a VILA', icon: Info },
    { id: 'definicoes', label: 'Definições', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Container - Strict Fit-to-screen layout */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 h-screen bg-white border-r border-slate-200 p-4 pb-4 flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-xs`}
      >
        {/* Top Section: Logo + Navigation Links */}
        <div className="flex flex-col gap-2 min-h-0">
          {/* 1. Header da Logo */}
          <div className="flex items-start justify-between px-1">
            <Logo />
            {isMobileOpen && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2. Navegação Principal (10 itens) */}
          <nav className="flex flex-col gap-0.5 overflow-y-auto no-scrollbar" aria-label="Navegação Principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[13px] leading-tight transition-all duration-150 group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold shadow-sm shadow-blue-500/25'
                      : 'text-[#0F1E3D] hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-[#0F1E3D] group-hover:text-[#2563EB]'
                      }`}
                    >
                      {item.customIcon ? item.customIcon : Icon ? <Icon className="w-4 h-4" /> : null}
                    </span>
                    <span className="truncate tracking-tight">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 text-[8.5px] font-extrabold tracking-wider rounded uppercase shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#DCFCE7] text-[#16A34A]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Promo Globe Card + Language/Theme + Auth Buttons */}
        <div className="space-y-3 pt-2.5 border-t border-slate-100 shrink-0">
          {/* 3. Card do Globo Terrestre com Esfera Pontilhada e Nós Azuis */}
          <div
            id="sidebar-promo-card"
            className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-100/90 relative overflow-hidden flex flex-col items-center text-center shadow-2xs"
          >
            {/* Illustrated 3D Global Network Sphere matching screenshot */}
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Globe White Circular Sphere */}
                <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

                {/* Delicate Dotted Longitude and Latitude Graticules */}
                <ellipse cx="50" cy="50" rx="44" ry="16" fill="none" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 2" />
                <ellipse cx="50" cy="50" rx="20" ry="44" fill="none" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="50" y1="6" x2="50" y2="94" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="6" y1="50" x2="94" y2="50" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Spherical Blue Data Nodes / Blobs matching exact positions */}
                {/* Top-Left Big Node */}
                <circle cx="45" cy="30" r="8" fill="#2563EB" />
                {/* Top-Right Medium Node */}
                <circle cx="68" cy="32" r="5.5" fill="#3B82F6" />
                {/* Center Node */}
                <circle cx="53" cy="46" r="7" fill="#2563EB" />
                {/* Bottom-Left Node */}
                <circle cx="38" cy="50" r="5" fill="#60A5FA" />
                {/* Bottom-Right Node */}
                <circle cx="68" cy="52" r="4" fill="#2563EB" />
                {/* Top Accent Dot */}
                <circle cx="48" cy="18" r="2" fill="#2563EB" />
                {/* Far Left Dot */}
                <circle cx="28" cy="38" r="1.5" fill="#3B82F6" />
                {/* Far Right Dot */}
                <circle cx="78" cy="42" r="1.8" fill="#2563EB" />
                {/* Bottom Center Dot */}
                <circle cx="54" cy="74" r="2.5" fill="#3B82F6" />
              </svg>
            </div>

            <p className="text-[13px] font-bold text-[#0F1E3D] leading-tight font-['Outfit']">
              Juntos, construímos
            </p>
            <p className="text-[13px] font-bold text-[#0F1E3D] leading-tight font-['Outfit']">
              um mundo melhor.
            </p>

            <button
              onClick={onOpenImpactModal}
              className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer group/impact"
            >
              <span>Ver impacto global</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover/impact:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 4. Controls: Seletor de Idioma e Alternador de Tema */}
          <div className="flex items-center justify-between px-1">
            {/* Seletor de Idioma: Globe Icon + PT + Down Chevron */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0F1E3D] hover:text-[#2563EB] transition-colors cursor-pointer py-1"
                id="sidebar-lang-btn"
              >
                {/* Globe Icon */}
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#334155]" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="font-['Outfit']">{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangOpen && (
                <div className="absolute bottom-full mb-1 left-0 w-28 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30">
                  <button
                    onClick={() => { setSelectedLang('PT'); setIsLangOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🇵🇹</span> PT
                  </button>
                  <button
                    onClick={() => { setSelectedLang('EN'); setIsLangOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🇬🇧</span> EN
                  </button>
                  <button
                    onClick={() => { setSelectedLang('ES'); setIsLangOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🇪🇸</span> ES
                  </button>
                </div>
              )}
            </div>

            {/* Alternador de Tema: Sun Icon + Tema Claro + Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#0F1E3D] flex items-center gap-1.5">
                {/* Sun with Rays Icon */}
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-slate-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                Tema Claro
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isLightMode}
                onClick={() => setIsLightMode(!isLightMode)}
                id="theme-toggle-switch"
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isLightMode ? 'bg-[#2563EB]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isLightMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 5. Botões de Ação: "Entrar" e "Criar Conta" */}
          <div className="grid grid-cols-2 gap-2.5 pt-0.5">
            <button
              id="sidebar-btn-login"
              onClick={() => onOpenAuth('login')}
              className="w-full py-2.5 px-3 rounded-2xl border border-[#E2E8F0] hover:bg-slate-50 font-bold text-xs sm:text-sm text-[#0F1E3D] transition-colors text-center cursor-pointer shadow-2xs font-['Outfit']"
            >
              Entrar
            </button>
            <button
              id="sidebar-btn-register"
              onClick={() => onOpenAuth('register')}
              className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:opacity-95 text-white font-bold text-xs sm:text-sm transition-all shadow-xs text-center cursor-pointer font-['Outfit']"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
