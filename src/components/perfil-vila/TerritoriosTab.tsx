import React from 'react';
import { MapPin } from 'lucide-react';

interface TabProps {
  onNavigateToTab?: (tabId: string) => void;
}

export const TerritoriosTab: React.FC<TabProps> = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
        <MapPin className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">Os Meus Territórios</h3>
      <p className="text-xs text-slate-500 max-w-md mx-auto">
        Gerencie os territórios onde participa, contribui e gera impacto.
      </p>
    </div>
  );
};
