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
      {/* Hero World Canvas Container with content inside */}
      <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] shadow-xs bg-[#F8FAFD] border border-slate-200/60">
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
          {/* Main Headline with exact 4-line layout and typographic weights */}
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold text-[#0F172A] tracking-[-0.03em] font-['Outfit'] leading-[1.14]">
            Conectando pessoas, <br />
            comunidades e <br />
            oportunidades em <br />
            <span className="text-[#1E4FD6] font-extrabold">todos os continentes.</span>
          </h1>

          {/* Subtitle with exact line-wrap and clean typography */}
          <p className="mt-3.5 text-sm sm:text-[15px] text-[#64748B] leading-[1.55] max-w-[430px] font-normal">
            Descubra comunidades, projetos e iniciativas que fazem a diferença em Portugal e no mundo.
          </p>

          {/* Call to Actions */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3.5 sm:gap-4">
            {/* Primary Brand Solid Pill CTA */}
            <button
              id="hero-cta-explore-world"
              onClick={onExploreWorld}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0055FE] hover:bg-[#1E4FD6] active:bg-[#0040CC] text-white font-semibold text-[14px] shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Explorar o Mundo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>

            {/* Secondary Video Action - Pill with outline, soft translucent bg, and play icon in circle */}
            <button
              id="hero-cta-watch-video"
              onClick={onWatchTour}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-white/85 hover:bg-white border border-slate-200/90 hover:border-slate-300 text-[14px] font-semibold text-[#0F172A] shadow-xs hover:shadow transition-all cursor-pointer group backdrop-blur-xs"
            >
              <div className="w-5 h-5 rounded-full bg-[#0F172A]/5 group-hover:bg-[#1E4FD6]/10 flex items-center justify-center transition-colors shrink-0">
                <Play className="w-2.5 h-2.5 text-[#0F172A] group-hover:text-[#1E4FD6] fill-current ml-0.5 transition-colors" />
              </div>
              <span>Ver como funciona (2:14)</span>
            </button>
          </div>
        </div>

        {/* Floating Bottom Global Metrics & Map Legend Capsule Cards (Positioned over the bottom of the map canvas) */}
        <div
          id="global-metrics-floating-banner"
          className="p-3 lg:p-0 lg:absolute lg:bottom-4 lg:left-6 lg:right-6 z-25 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pointer-events-auto select-none"
        >
          {/* Left Card: 4 Primary Stats in White Pill Container */}
          <div className="bg-white rounded-[22px] px-5 sm:px-6 py-3 shadow-[0_6px_22px_rgba(15,30,61,0.08),0_2px_6px_rgba(0,0,0,0.03)] border-0">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* 1. Países ativos (Globo - Azul) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0055FE] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#0D1E3A] leading-tight font-['Outfit']">128</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Países ativos</p>
                </div>
              </div>

              {/* 2. Cidadãos (Pessoas - Roxo) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0 sm:pl-6">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#0D1E3A] leading-tight font-['Outfit']">7.842.521</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Cidadãos</p>
                </div>
              </div>

              {/* 3. Projetos ativos (Usuários/Grupo - Laranja) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0 sm:pl-6">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                  <FolderKanban className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#0D1E3A] leading-tight font-['Outfit']">24.651</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Projetos ativos</p>
                </div>
              </div>

              {/* 4. Parceiros globais (Coração - Vermelho/Rosa) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0 sm:pl-6">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#F43F5E] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#0D1E3A] leading-tight font-['Outfit']">3.412</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Parceiros globais</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Map Legend Pill Container matching screenshot */}
          <div className="bg-white rounded-full px-6 py-3 shadow-[0_6px_22px_rgba(15,30,61,0.08),0_2px_6px_rgba(0,0,0,0.03)] border-0 flex items-center justify-center sm:justify-start gap-4 sm:gap-5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="text-[#0D1E3A] font-bold text-[12px] whitespace-nowrap font-['Outfit']">País Ativo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0055FE] shrink-0" />
              <span className="text-[#0D1E3A] font-bold text-[12px] whitespace-nowrap font-['Outfit']">País com Atividade</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8] shrink-0" />
              <span className="text-[#0D1E3A] font-bold text-[12px] whitespace-nowrap font-['Outfit']">País Inativo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
