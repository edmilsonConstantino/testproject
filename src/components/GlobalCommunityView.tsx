import React, { useState, useEffect } from 'react';
import { CommunityOfficialHomeView } from './CommunityOfficialHomeView';
import { CommunityEnvironmentView } from './CommunityEnvironmentView';
import { CommunityEducationView } from './CommunityEducationView';
import { CommunityHumanRightsView } from './CommunityHumanRightsView';
import { CommunityCultureView } from './CommunityCultureView';
import { CommunityHealthView } from './CommunityHealthView';
import { CommunityTechnologyView } from './CommunityTechnologyView';
import { CommunityEntrepreneurshipView } from './CommunityEntrepreneurshipView';
import { CreateCommunityWizardView } from './CreateCommunityWizardView';
import { BreadcrumbItem } from './Topbar';

export interface GlobalCommunityViewProps {
  initialSubView?: 'official' | 'ambiente' | 'educacao' | 'direitos-humanos' | 'cultura' | 'saude' | 'tecnologia' | 'empreendedorismo' | 'criar-comunidade';
  onNavigateToTab?: (tabId: string) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAiAssistant?: () => void;
  onOpenMobileMenu?: () => void;
  onExploreWorld?: () => void;
  onExploreMap?: () => void;
  onOpenCreateCommunityModal?: () => void;
  onBreadcrumbChange?: (items: BreadcrumbItem[]) => void;
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
  onBreadcrumbChange,
}) => {
  const [currentSubView, setCurrentSubView] = useState<'official' | 'ambiente' | 'educacao' | 'direitos-humanos' | 'cultura' | 'saude' | 'tecnologia' | 'empreendedorismo' | 'criar-comunidade'>(initialSubView);

  // Sincronizar se initialSubView mudar
  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  // Emitir breadcrumb para o Topbar compartilhado conforme a subview ativa
  // Trilha confirmada pelo mockup de referência (UI AMBIENTE.png etc.): as páginas de categoria
  // ficam sob "Explorar Comunidade", entre o hub e o nome da categoria.
  useEffect(() => {
    const goToOfficial = () => {
      setCurrentSubView('official');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const goToExplorar = () => {
      setCurrentSubView('ambiente');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const CATEGORY_LABELS: Record<string, string> = {
      ambiente: 'Ambiente',
      educacao: 'Educação',
      'direitos-humanos': 'Direitos Humanos',
      cultura: 'Cultura',
      saude: 'Saúde',
      tecnologia: 'Tecnologia',
      empreendedorismo: 'Empreendedorismo',
    };

    if (currentSubView === 'official') {
      onBreadcrumbChange?.([]);
    } else if (currentSubView === 'criar-comunidade') {
      onBreadcrumbChange?.([
        { label: 'Comunidade Global', onClick: goToOfficial },
        { label: 'Criar Comunidade' },
      ]);
    } else {
      onBreadcrumbChange?.([
        { label: 'Comunidade Global', onClick: goToOfficial },
        { label: 'Explorar Comunidade', onClick: goToExplorar },
        { label: CATEGORY_LABELS[currentSubView] },
      ]);
    }
  }, [currentSubView, onBreadcrumbChange]);

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
    } else if (catId === 'cultura') {
      setCurrentSubView('cultura');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'saude') {
      setCurrentSubView('saude');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'tecnologia') {
      setCurrentSubView('tecnologia');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (catId === 'empreendedorismo') {
      setCurrentSubView('empreendedorismo');
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

  // Categoria 4: Cultura (UI CULTURA.png)
  if (currentSubView === 'cultura') {
    return (
      <CommunityCultureView
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

  // Categoria 5: Saúde (UI SAUDE.png)
  if (currentSubView === 'saude') {
    return (
      <CommunityHealthView
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

  // Categoria 6: Tecnologia (UI TECNOLOGIA.png)
  if (currentSubView === 'tecnologia') {
    return (
      <CommunityTechnologyView
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

  // Categoria 7: Empreendedorismo (UI EMPREENDEDORISMO.png)
  if (currentSubView === 'empreendedorismo') {
    return (
      <CommunityEntrepreneurshipView
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
