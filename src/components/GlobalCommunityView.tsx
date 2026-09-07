import React, { useState, useEffect } from 'react';
import { CommunityOfficialHomeView } from './CommunityOfficialHomeView';
import { CommunityEnvironmentView } from './CommunityEnvironmentView';
import { CommunityEducationView } from './CommunityEducationView';

export interface GlobalCommunityViewProps {
  initialSubView?: 'official' | 'ambiente' | 'educacao';
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
  const [currentSubView, setCurrentSubView] = useState<'official' | 'ambiente' | 'educacao'>(initialSubView);

  // Sincronizar se initialSubView mudar
  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  // Categoria 1: Educação (UI EDUCACAO.png)
  if (currentSubView === 'educacao') {
    return (
      <CommunityEducationView
        onBackToOfficial={() => {
          setCurrentSubView('official');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={(catId) => {
          if (catId === 'ambiente') {
            setCurrentSubView('ambiente');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (catId === 'todas') {
            setCurrentSubView('official');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  // Categoria 2: Ambiente (UI AMBIENTE.png)
  if (currentSubView === 'ambiente') {
    return (
      <CommunityEnvironmentView
        onBackToOfficial={() => {
          setCurrentSubView('official');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={(catId) => {
          if (catId === 'educacao') {
            setCurrentSubView('educacao');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (catId === 'todas') {
            setCurrentSubView('official');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
        onExploreWorld={onExploreWorld || onExploreMap}
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
      onOpenCreateCommunityModal={onOpenCreateCommunityModal}
    />
  );
};

export default GlobalCommunityView;
