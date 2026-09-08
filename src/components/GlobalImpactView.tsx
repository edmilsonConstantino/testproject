import React, { useState, useEffect } from 'react';
import { MainImpactGlobalView } from './MainImpactGlobalView';
import { EnvironmentImpactView, EnvironmentImpactViewProps } from './EnvironmentImpactView';
import { HealthImpactView } from './HealthImpactView';
import { TechnologyImpactView } from './TechnologyImpactView';
import { EntrepreneurshipImpactView } from './EntrepreneurshipImpactView';

export interface GlobalImpactViewProps extends EnvironmentImpactViewProps {
  initialSubView?: 'todas' | 'ambiente' | 'saude' | 'tecnologia' | 'empreendedorismo';
}

export const GlobalImpactView: React.FC<GlobalImpactViewProps> = ({
  initialSubView = 'todas',
  onOpenAiAssistant,
  onExploreWorld,
  onExploreCommunity,
  onOpenMobileMenu,
  onOpenAuth,
  onNavigateToTab,
  onNavigateToCategory,
  ...restProps
}) => {
  const [currentSubView, setCurrentSubView] = useState<'todas' | 'ambiente' | 'saude' | 'tecnologia' | 'empreendedorismo'>(initialSubView);

  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  const handleCategoryNavigation = (categoryId: string) => {
    if (categoryId === 'todas' || categoryId === 'impacto' || categoryId === 'impacto-global') {
      setCurrentSubView('todas');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'empreendedorismo') {
      setCurrentSubView('empreendedorismo');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'tecnologia') {
      setCurrentSubView('tecnologia');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'saude') {
      setCurrentSubView('saude');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'ambiente') {
      setCurrentSubView('ambiente');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (categoryId === 'cultura' || categoryId === 'educacao' || categoryId === 'direitos-humanos') {
      if (onNavigateToTab) {
        onNavigateToTab(categoryId);
      }
    } else if (onNavigateToCategory) {
      onNavigateToCategory(categoryId);
    }
  };

  if (currentSubView === 'empreendedorismo') {
    return (
      <EntrepreneurshipImpactView
        onBackToImpact={() => {
          setCurrentSubView('todas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleCategoryNavigation}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  if (currentSubView === 'tecnologia') {
    return (
      <TechnologyImpactView
        onBackToImpact={() => {
          setCurrentSubView('todas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleCategoryNavigation}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  if (currentSubView === 'saude') {
    return (
      <HealthImpactView
        onBackToImpact={() => {
          setCurrentSubView('todas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToCategory={handleCategoryNavigation}
        onNavigateToTab={onNavigateToTab}
        onOpenAuth={onOpenAuth}
        onOpenAiAssistant={onOpenAiAssistant}
        onOpenMobileMenu={onOpenMobileMenu}
      />
    );
  }

  if (currentSubView === 'ambiente') {
    return (
      <EnvironmentImpactView
        onOpenAiAssistant={onOpenAiAssistant}
        onExploreWorld={onExploreWorld}
        onExploreCommunity={onExploreCommunity}
        onOpenMobileMenu={onOpenMobileMenu}
        onOpenAuth={onOpenAuth}
        onNavigateToTab={onNavigateToTab}
        onNavigateToCategory={handleCategoryNavigation}
        {...restProps}
      />
    );
  }

  return (
    <MainImpactGlobalView
      onNavigateToCategory={handleCategoryNavigation}
      onNavigateToTab={onNavigateToTab}
      onOpenAuth={onOpenAuth}
      onOpenAiAssistant={onOpenAiAssistant}
      onOpenMobileMenu={onOpenMobileMenu}
    />
  );
};

export default GlobalImpactView;
