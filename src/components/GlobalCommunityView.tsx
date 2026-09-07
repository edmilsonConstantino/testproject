import React, { useState, useEffect } from 'react';
import { CommunityOfficialHomeView } from './CommunityOfficialHomeView';
import { CommunityEnvironmentView } from './CommunityEnvironmentView';
import { CommunityEducationView } from './CommunityEducationView';
import { CommunityHumanRightsView } from './CommunityHumanRightsView';
import { CreateCommunityWizardView } from './CreateCommunityWizardView';

export interface GlobalCommunityViewProps {
  initialSubView?: 'official' | 'ambiente' | 'educacao' | 'direitos-humanos' | 'criar-comunidade';
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onExploreWorld?: () => void;
  onExploreMap?: () => void;
  onOpenCreateCommunityModal?: () => void;
}

export const GlobalCommunityView: React.FC<GlobalCommunityViewProps> = ({
  initialSubView = 'official',
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onExploreWorld,
  onExploreMap,
  onOpenCreateCommunityModal,
}) => {
  const [currentSubView, setCurrentSubView] = useState<'official' | 'ambiente' | 'educacao' | 'direitos-humanos' | 'criar-comunidade'>(initialSubView);

  // Sincronizar se initialSubView mudar
  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  const handleNavigateCategory = (catId: string) => {
    if (catId === 'ambiente') {
      setCurrentSubView('ambiente');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'educacao') {
      setCurrentSubView('educacao');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'direitos-humanos') {
      setCurrentSubView('direitos-humanos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'todas') {
      setCurrentSubView('official');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCreateCommunity = () => {
    setCurrentSubView('criar-comunidade');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Página de Ação Exclusiva: Criar Comunidade (UI CRIAR COMUNIDADE.png)
  if (currentSubView === 'criar-comunidade') {
    return (
      <CreateCommunityWizardView
        onBackToCommunity={() => {
          setCurrentSubView('official');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
      />
    );
  }

  // Categoria 3: Direitos Humanos (UI DIREITOS HUMANOS.png)
  if (currentSubView === 'direitos-humanos') {
    return (
      <CommunityHumanRightsView
        onBackToOfficial={() => {
          setCurrentSubView('official');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 2: Educação (UI EDUCACAO.png)
  if (currentSubView === 'educacao') {
    return (
      <CommunityEducationView
        onBackToOfficial={() => {
          setCurrentSubView('official');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Categoria 1: Ambiente (UI AMBIENTE.png)
  if (currentSubView === 'ambiente') {
    return (
      <CommunityEnvironmentView
        onBackToOfficial={() => {
          setCurrentSubView('official');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleNavigateCategory}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onExploreWorld={onExploreWorld || onExploreMap}
        onOpenCreateCommunity={handleOpenCreateCommunity}
      />
    );
  }

  // Nível 1: Página Oficial da Comunidade Global (UI COMUNIDADE GLOBAL.png)
  return (
    <CommunityOfficialHomeView
      onNavigateToAmbiente={() => {
        setCurrentSubView('ambiente');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onNavigateToEducacao={() => {
        setCurrentSubView('educacao');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onNavigateToTab={onNavigateToTab}
      onOpenAuth={onOpenAuth}
      onOpenAiAssistant={onOpenAiAssistant}
      onOpenCreateCommunityModal={handleOpenCreateCommunity}
    />
  );
};

export default GlobalCommunityView;
