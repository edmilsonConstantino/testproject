import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export interface AppLayoutProps {
  currentTab?: string;
  onSelectTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenImpactModal?: () => void;
  isMobileSidebarOpen?: boolean;
  onCloseMobileSidebar?: () => void;
  onOpenMobileSidebar?: () => void;
  onOpenSearchModal?: () => void;
  searchPlaceholder?: string;
  showTopbar?: boolean;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab = 'noticias',
  onSelectTab = () => {},
  onOpenAuth = () => {},
  onOpenImpactModal = () => {},
  isMobileSidebarOpen = false,
  onCloseMobileSidebar = () => {},
  onOpenMobileSidebar = () => {},
  onOpenSearchModal = () => {},
  searchPlaceholder,
  showTopbar = true,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#475569] flex antialiased">
      {/* 1. Sidebar de navegação fixa à esquerda (Logo VILA, menu, widget de impacto, idioma, tema, login) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        onOpenAuth={onOpenAuth}
        onOpenImpactModal={onOpenImpactModal}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={onCloseMobileSidebar}
      />

      {/* 2. Área principal de conteúdo à direita da Sidebar */}
      <div className="flex-1 md:pl-[258px] flex flex-col min-w-0 min-h-screen transition-all duration-300">
        {/* Barra superior Topbar */}
        {showTopbar && (
          <Topbar
            searchPlaceholder={searchPlaceholder}
            onOpenSearchModal={onOpenSearchModal}
            onOpenMobileMenu={onOpenMobileSidebar}
            onOpenAuth={onOpenAuth}
          />
        )}

        {/* Viewport com scroll e padding consistente com todas as páginas */}
        <main
          id="app-main-viewport"
          className="flex-1 w-full overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
