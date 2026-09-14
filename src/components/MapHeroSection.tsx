import React from 'react';
import { Globe, Users, FolderKanban, HeartHandshake, ArrowRight, Play } from 'lucide-react';
import { CountryData } from '../types';
import { WorldMap } from './WorldMap';

interface MapHeroSectionProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreWorld: () => void;
  onWatchTour: () => void;
  onExploreCountry: (country: CountryData) => void;
}

export const MapHeroSection: React.FC<MapHeroSectionProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreWorld,
  onWatchTour,
  onExploreCountry,
}) => {
  return (
    <section id="map-hero-section" className="relative flex flex-col">
      {/* Hero World Canvas Container with content inside - 16px radius, unified background */}
      <div className="relative rounded-2xl overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] shadow-xs bg-[#F8FAFD] border border-slate-200/70">
        {/* Real World Vector Map Component with Natural Earth Projection */}
        <WorldMap
          selectedCountry={selectedCountry}
          onSelectCountry={onSelectCountry}
          onExploreCountry={onExploreCountry}
          showLegend={false}
          controlsPosition="top-right"
        />

        {/* Hero Title & Text Overlay (Positioned inside the card on the left) */}
        <div
          id="hero-intro-overlay"
          className="lg:absolute lg:left-8 xl:left-10 lg:top-8 xl:top-10 lg:max-w-[480px] z-25 p-5 sm:p-6 lg:p-0 pointer-events-auto select-none"
        >
          {/* Main Headline with Fraunces serif typography */}
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[43px] font-semibold text-[#0F172A] tracking-[-0.02em] font-serif leading-[1.12]">
            Conectando pessoas, <br />
            comunidades e <br />
            oportunidades em <br />
            <span className="text-[#1E4FD6] font-bold italic">todos os continentes.</span>
          </h1>

          {/* Subtitle with clean Public Sans typography */}
          <p className="mt-3.5 text-sm sm:text-[15px] text-[#64748B] leading-[1.55] max-w-[430px] font-normal">
            Descubra comunidades, projetos e iniciativas em Portugal e no mundo.
          </p>

          {/* Call to Actions - 8px radius, no unnecessary pill glassmorphism */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-3.5">
            {/* Primary Brand CTA */}
            <button
              id="hero-cta-explore-world"
              onClick={onExploreWorld}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0055FE] hover:bg-[#1E4FD6] active:bg-[#0040CC] text-white font-medium text-[13.5px] shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <span>Explorar o Mundo</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Secondary Video Action - Clean border and 8px radius */}
            <button
              id="hero-cta-watch-video"
              onClick={onWatchTour}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[13.5px] font-medium text-[#0F172A] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="w-4 h-4 rounded-full bg-slate-100 group-hover:bg-[#1E4FD6]/10 flex items-center justify-center transition-colors shrink-0">
                <Play className="w-2 h-2 text-[#0F172A] group-hover:text-[#1E4FD6] fill-current ml-0.5 transition-colors" />
              </div>
              <span>Ver como funciona (2:14)</span>
            </button>
          </div>
        </div>

        {/* Floating Bottom Global Metrics & Map Legend - Non-repetitive editorial stats without decorative colorful squares */}
        <div
          id="global-metrics-floating-banner"
          className="p-3 lg:p-0 lg:absolute lg:bottom-4 lg:left-6 lg:right-6 z-25 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pointer-events-auto select-none"
        >
          {/* Left Card: 4 Primary Stats - Clean numerical data with IBM Plex Mono and subtle dividers */}
          <div className="bg-white rounded-xl px-5 sm:px-6 py-3 shadow-[0_4px_16px_rgba(15,30,61,0.06)] border border-slate-200/80">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* 1. Países ativos */}
              <div className="pt-1 sm:pt-0">
                <p className="text-[17px] font-bold text-[#0D1E3A] leading-none font-mono tracking-tight">128</p>
                <p className="text-[11px] font-medium text-[#64748B] mt-1 whitespace-nowrap">Países ativos</p>
              </div>

              {/* 2. Cidadãos */}
              <div className="pt-1 sm:pt-0 sm:pl-6">
                <p className="text-[17px] font-bold text-[#0D1E3A] leading-none font-mono tracking-tight">7.842.521</p>
                <p className="text-[11px] font-medium text-[#64748B] mt-1 whitespace-nowrap">Cidadãos</p>
              </div>

              {/* 3. Projetos ativos */}
              <div className="pt-1 sm:pt-0 sm:pl-6">
                <p className="text-[17px] font-bold text-[#0D1E3A] leading-none font-mono tracking-tight">24.651</p>
                <p className="text-[11px] font-medium text-[#64748B] mt-1 whitespace-nowrap">Projetos ativos</p>
              </div>

              {/* 4. Parceiros globais */}
              <div className="pt-1 sm:pt-0 sm:pl-6">
                <p className="text-[17px] font-bold text-[#0D1E3A] leading-none font-mono tracking-tight">3.412</p>
                <p className="text-[11px] font-medium text-[#64748B] mt-1 whitespace-nowrap">Parceiros globais</p>
              </div>
            </div>
          </div>

          {/* Right Card: Map Legend - 12px container with semantic color dots */}
          <div className="bg-white rounded-xl px-4 sm:px-5 py-2.5 shadow-[0_4px_16px_rgba(15,30,61,0.06)] border border-slate-200/80 flex items-center justify-center sm:justify-start gap-3.5 sm:gap-4 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
              <span className="text-[#0D1E3A] font-semibold text-[11.5px] whitespace-nowrap">País Ativo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0055FE] shrink-0" />
              <span className="text-[#0D1E3A] font-semibold text-[11.5px] whitespace-nowrap">Com Atividade</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] shrink-0" />
              <span className="text-[#0D1E3A] font-semibold text-[11.5px] whitespace-nowrap">Inativo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
