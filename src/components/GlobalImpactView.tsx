import React from 'react';
import { EnvironmentImpactView, EnvironmentImpactViewProps } from './EnvironmentImpactView';

export interface GlobalImpactViewProps extends EnvironmentImpactViewProps {}

export const GlobalImpactView: React.FC<GlobalImpactViewProps> = (props) => {
  return <EnvironmentImpactView {...props} />;
};

export default GlobalImpactView;
