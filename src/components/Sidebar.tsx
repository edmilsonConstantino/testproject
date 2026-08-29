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
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 h-screen bg-white border-r border-slate-200 p-4 pb-5 flex flex-col justify-between overflow-hidden select-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-xs`}
      >
        {/* Top Section: Logo + Navigation Links */}
        <div className="flex flex-col gap-2.5 min-h-0">
          {/* 1. Header da Logo */}
          <div className="flex items-start justify-between px-1">
            <Logo />
            {isMobileOpen && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2. Navegação Principal (10 itens com altura compacta) */}
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
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-semibold shadow-sm shadow-blue-500/25'
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
        <div className="space-y-2.5 pt-2.5 border-t border-slate-100 shrink-0">
          {/* 3. Card do Globo Terrestre */}
          <div
            id="sidebar-promo-card"
            className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200/80 relative overflow-hidden flex flex-col items-center text-center"
          >
            {/* Illustrated 3D Dotted Blue Earth Globe */}
            <div className="relative w-16 h-16 mb-1 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="globe-grad-land" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                </defs>

                {/* Ambient glow circle */}
                <circle cx="50" cy="50" r="48" fill="url(#globe-glow)" />

                {/* Dotted globe outline & background */}
                <circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />

                {/* Graticule latitude/longitude curve lines */}
                <path d="M12 50 A 38 12 0 0 0 88 50" fill="none" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="1.5,1.5" />
                <path d="M12 50 A 38 12 0 0 1 88 50" fill="none" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="1.5,1.5" />
                <ellipse cx="50" cy="50" rx="18" ry="38" fill="none" stroke="#E2E8F0" strokeWidth="0.75" strokeDasharray="1.5,1.5" />

                {/* Continents */}
                <path
                  d="M32 28c3-4 8-6 14-4 4 1 6 5 5 9-1 4-5 6-9 7-4 1-9-1-10-5v-7z"
                  fill="url(#globe-grad-land)"
                />
                <path
                  d="M48 40c4-2 9-1 12 2 3 3 3 8 0 11-3 3-8 4-12 2-3-2-4-7-2-11l2-4z"
                  fill="#2563EB"
                />
                <path
                  d="M28 50c2-3 6-4 9-2 3 2 4 6 2 9-2 3-6 4-9 2-3-2-4-6-2-9z"
                  fill="#60A5FA"
                />
                <path
                  d="M62 26c3-2 7-1 9 2s1 7-2 9-7 1-9-2 0-7 2-9z"
                  fill="#3B82F6"
                />
                <path
                  d="M66 52c2-2 5-1 7 1s1 5-1 7-5 1-7-1 0-5 1-7z"
                  fill="#2563EB"
                />

                {/* Orbiting particles */}
                <circle cx="20" cy="36" r="1.5" fill="#3B82F6" />
                <circle cx="80" cy="42" r="1.5" fill="#2563EB" />
                <circle cx="42" cy="16" r="1.5" fill="#60A5FA" />
                <circle cx="58" cy="84" r="1.5" fill="#3B82F6" />
              </svg>
            </div>

            <p className="text-[11px] font-bold text-[#0F1E3D] leading-tight">
              Juntos, construímos
            </p>
            <p className="text-[11px] font-bold text-[#0F1E3D] leading-tight">
              um mundo melhor.
            </p>

            <button
              onClick={onOpenImpactModal}
              className="mt-1 inline-flex items-center gap-1 text-[10.5px] font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer group/impact"
            >
              <span>Ver impacto global</span>
              <ArrowRight className="w-3 h-3 transform group-hover/impact:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 4. Controls: Seletor de Idioma e Alternador de Tema */}
          <div className="flex items-center justify-between px-0.5">
            {/* Seletor de Idioma */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-1.5 py-0.5 text-[11px] font-bold text-[#0F1E3D] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                id="sidebar-lang-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-slate-500" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>{selectedLang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLangOpen && (
                <div className="absolute bottom-full mb-1 left-0 w-24 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30">
                  <button
                    onClick={() => { setSelectedLang('PT'); setIsLangOpen(false); }}
                    className="w-full text-left px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🇵🇹</span> PT
                  </button>
                  <button
                    onClick={() => { setSelectedLang('EN'); setIsLangOpen(false); }}
                    className="w-full text-left px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🇬🇧</span> EN
                  </button>
                  <button
                    onClick={() => { setSelectedLang('ES'); setIsLangOpen(false); }}
                    className="w-full text-left px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>🇪🇸</span> ES
                  </button>
                </div>
              )}
            </div>

            {/* Alternador de Tema */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-medium text-[#0F1E3D] flex items-center gap-1">
                <Sun className="w-3 h-3 text-slate-600" />
                Tema Claro
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isLightMode}
                onClick={() => setIsLightMode(!isLightMode)}
                id="theme-toggle-switch"
                className={`relative inline-flex h-4 w-7.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isLightMode ? 'bg-[#2563EB]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isLightMode ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 5. Botões de Ação ("Entrar" e "Criar Conta") */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              id="sidebar-btn-login"
              onClick={() => onOpenAuth('login')}
              className="w-full py-2 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-[#0F1E3D] transition-colors text-center cursor-pointer shadow-2xs"
            >
              Entrar
            </button>
            <button
              id="sidebar-btn-register"
              onClick={() => onOpenAuth('register')}
              className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:opacity-95 text-white font-semibold text-xs transition-all shadow-xs text-center cursor-pointer"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
