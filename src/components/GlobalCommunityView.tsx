import React from 'react';
import { CommunityEnvironmentView, CommunityEnvironmentViewProps } from './CommunityEnvironmentView';

export interface GlobalCommunityViewProps extends CommunityEnvironmentViewProps {
  onExploreMap?: () => void;
  onOpenCreateCommunityModal?: () => void;
}

export const GlobalCommunityView: React.FC<GlobalCommunityViewProps> = ({
  onNavigateToTab,
  onOpenAuth,
  onOpenAiAssistant,
  onOpenMobileMenu,
  onExploreWorld,
  onExploreMap,
  onOpenCreateCommunityModal,
}) => {
  return (
    <CommunityEnvironmentView
      onNavigateToTab={onNavigateToTab}
      onOpenAuth={onOpenAuth}
      onOpenAiAssistant={onOpenAiAssistant}
      onOpenMobileMenu={onOpenMobileMenu}
      onExploreWorld={onExploreWorld || onExploreMap}
    />
  );
};

export default GlobalCommunityView;
