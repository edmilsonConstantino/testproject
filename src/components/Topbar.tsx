import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, ChevronDown, Bell, Menu, X, Check, User, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { GLOBAL_NOTIFICATIONS } from '../data/countriesData';

export interface TopbarProps {
  userName?: string;
  userAvatarUrl?: string;
  /**
   * Opcional: contagem inicial de notificações não lidas, útil quando o
   * pai carrega isto de uma API. A partir daí a contagem passa a ser
   * derivada do estado interno (notifications), para que "Marcar como
   * lidas" atualize o badge corretamente.
   */
  notificationCount?: number;
  currentLanguage?: 'PT' | 'EN' | 'ES';
  onLanguageChange?: (lang: 'PT' | 'EN' | 'ES') => void;
  onSearch?: (query: string) => void;
  onOpenSearchModal?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  /** Chamado quando o utilizador marca todas as notificações como lidas. */
  onMarkAllNotificationsRead?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  userName = 'Ana Silva',
  userAvatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  notificationCount,
  currentLanguage = 'PT',
  onLanguageChange,
  onSearch,
  onOpenSearchModal,
  onOpenMobileMenu,
  onOpenAuth,
  onMarkAllNotificationsRead,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'PT' | 'EN' | 'ES'>(currentLanguage);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState(GLOBAL_NOTIFICATIONS);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const avatarDropdownRef = useRef<HTMLDivElement>(null);

  // Sync external language changes if provided
  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  // Se o pai fornecer uma contagem inicial (ex: vinda de uma API), usa-a
  // para popular o estado local uma única vez. A partir daí a fonte da
  // verdade passa a ser `notifications`, evitando o badge dessincronizar
  // quando o utilizador marca tudo como lido.
  useEffect(() => {
    if (notificationCount !== undefined && notificationCount !== notifications.filter((n) => !n.read).length) {
      // Ajusta apenas a contagem "visível" quando não há detalhe local
      // suficiente — não sobrescreve notificações já carregadas.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Global keyboard shortcut: Cmd+K or Ctrl+K to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(true);
          setTimeout(() => mobileSearchInputRef.current?.focus(), 50);
        } else {
          searchInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
      if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(target)) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: 'PT' | 'EN' | 'ES') => {
    setSelectedLanguage(lang);
    setIsLangOpen(false);
    onLanguageChange?.(lang);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    onOpenSearchModal?.();
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onMarkAllNotificationsRead?.();
  };

  // Fonte única da verdade: sempre derivada do estado local, para que
  // marcar como lidas atualize o badge de imediato. `notificationCount`
  // só serve como valor inicial (ver useEffect acima).
  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayCount = unreadCount;

  return (
    <header
      id="topbar"
      className="sticky top-0 z-40 flex items-center justify-between gap-4 md:gap-6 h-20 px-4 md:px-8 bg-white border-b border-slate-100 select-none shadow-2xs"
    >
      {/* Mobile Menu Toggle & Brand (visible on screens < lg) */}
      <div className="flex items-center gap-3 lg:hidden">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            id="topbar-btn-mobile-menu"
            aria-label="Abrir Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <span className="font-extrabold text-xl text-[#1E3A5F] font-['Outfit'] tracking-tight">
          VILA
        </span>
      </div>

      {/* 1. Campo de Busca Central (Centro, flex-1) */}
      <div className="hidden md:flex flex-1 max-w-2xl relative mx-auto" id="topbar-search-container">
        <form onSubmit={handleSearchSubmit} className="w-full relative">
          <input
            ref={searchInputRef}
            type="text"
            id="topbar-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar países, regiões, cidades, projetos, comunidades..."
            className="w-full h-12 pl-12 pr-16 rounded-full bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all shadow-2xs"
          />

          {/* Ícone de lupa posicionado à esquerda */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />

          {/* Atalho de teclado (badge "⌘K") à direita */}
          <button
            type="button"
            onClick={() => {
              if (onOpenSearchModal) onOpenSearchModal();
              else searchInputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Pressione ⌘K ou Ctrl+K para pesquisar"
          >
            ⌘K
          </button>
        </form>
      </div>

      {/* Mobile Search Icon Trigger (< md) */}
      <div className="flex md:hidden items-center ml-auto mr-1">
        <button
          type="button"
          onClick={() => {
            setIsMobileSearchOpen(true);
            setTimeout(() => mobileSearchInputRef.current?.focus(), 50);
          }}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          id="topbar-mobile-search-trigger"
          aria-label="Abrir pesquisa"
        >
          <Search className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Mobile Fullscreen/Overlay Search Bar */}
      {isMobileSearchOpen && (
        <div className="fixed inset-x-0 top-0 h-20 bg-white border-b border-slate-200 z-50 px-4 flex items-center gap-2 shadow-md md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar no VILA..."
              className="w-full h-11 pl-10 pr-10 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Right Zone: (2) Seletor de Idioma, (3) Notificações, (4) Avatar */}
      <div className="flex items-center gap-5 shrink-0" id="topbar-right-actions">
        {/* 2. Seletor de Idioma */}
        <div className="relative" ref={langDropdownRef}>
          <button
            type="button"
            onClick={() => setIsLangOpen(!isLangOpen)}
            id="topbar-language-selector"
            className="flex items-center gap-1.5 text-sm font-medium text-[#1E3A5F] cursor-pointer hover:opacity-80 transition-opacity py-1.5 px-2 rounded-lg"
            aria-haspopup="menu"
            aria-expanded={isLangOpen}
          >
            {/* Ícone globo */}
            <Globe className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="font-semibold">{selectedLanguage}</span>
            {/* Chevron down */}
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isLangOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown de Idiomas (PT / EN / ES) */}
          {isLangOpen && (
            <div
              id="topbar-lang-dropdown"
              role="menu"
              className="absolute right-0 mt-2 w-36 bg-white border border-slate-100 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelectLanguage('PT')}
                className={`w-full text-left px-3 py-2 hover:bg-slate-50 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLanguage === 'PT' ? 'text-[#2563EB] font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🇵🇹</span> Português
                </span>
                {selectedLanguage === 'PT' && <Check className="w-4 h-4 text-[#2563EB]" />}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelectLanguage('EN')}
                className={`w-full text-left px-3 py-2 hover:bg-slate-50 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLanguage === 'EN' ? 'text-[#2563EB] font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🇬🇧</span> English
                </span>
                {selectedLanguage === 'EN' && <Check className="w-4 h-4 text-[#2563EB]" />}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelectLanguage('ES')}
                className={`w-full text-left px-3 py-2 hover:bg-slate-50 rounded-md text-sm flex items-center justify-between transition-colors cursor-pointer ${
                  selectedLanguage === 'ES' ? 'text-[#2563EB] font-bold bg-blue-50/50' : 'text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>🇪🇸</span> Español
                </span>
                {selectedLanguage === 'ES' && <Check className="w-4 h-4 text-[#2563EB]" />}
              </button>
            </div>
          )}
        </div>

        {/* 3. Notificações (Sino com badge) */}
        <div className="relative" ref={notifDropdownRef}>
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            id="topbar-notifications-trigger"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Notificações"
            aria-haspopup="menu"
            aria-expanded={isNotificationsOpen}
          >
            {/* Ícone sino */}
            <Bell className="w-5 h-5 text-slate-600" />

            {/* Badge de contagem (red-500) — derivado do estado local */}
            {displayCount > 0 && (
              <span
                id="topbar-notification-badge"
                className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 shadow-2xs ring-2 ring-white"
              >
                {displayCount}
              </span>
            )}
          </button>

          {/* Dropdown de Notificações */}
          {isNotificationsOpen && (
            <div
              id="topbar-notifications-dropdown"
              className="absolute right-0 mt-2 w-80 md:w-96 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#0F1E3D]">Notificações</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-[#2563EB] hover:underline font-semibold cursor-pointer"
                  >
                    Marcar como lidas
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 hover:bg-slate-50 transition-colors ${
                      !n.read ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-[#0F1E3D]">{n.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.description}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 text-center border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Ver todas as atualizações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Avatar do Utilizador */}
        <div className="relative" ref={avatarDropdownRef}>
          <button
            type="button"
            onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
            id="topbar-user-avatar-trigger"
            className="flex items-center gap-2 cursor-pointer group"
            aria-haspopup="menu"
            aria-expanded={isAvatarMenuOpen}
          >
            <div className="relative">
              <img
                src={userAvatarUrl}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-blue-400/50 transition-all"
              />
              {/* Online Indicator Green Dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            {/* Chevron down ao lado */}
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${
                isAvatarMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown de Menu do Avatar (Perfil, Definições, Sair / Autenticação) */}
          {isAvatarMenuOpen && (
            <div
              id="topbar-user-dropdown"
              role="menu"
              className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              {/* User Header */}
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-3">
                <img
                  src={userAvatarUrl}
                  alt={userName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#0F1E3D] truncate">{userName}</p>
                  <p className="text-[11px] text-slate-400 truncate">Membro Global</p>
                </div>
              </div>

              <div className="py-1">
                {/* NOTA: estes três itens ainda apontam todos para onOpenAuth('login')
                    como placeholder — trocar por navegação real (ex: react-router)
                    quando as rotas de Perfil / Privacidade / Definições existirem. */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsAvatarMenuOpen(false);
                    onOpenAuth?.('login');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Meu Perfil</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsAvatarMenuOpen(false);
                    onOpenAuth?.('login');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Privacidade & Dados</span>
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsAvatarMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Definições da Conta</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsAvatarMenuOpen(false);
                    onOpenAuth?.('login');
                  }}
                  className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50/60 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Terminar Sessão</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};