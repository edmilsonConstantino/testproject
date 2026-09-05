import React from 'react';
import { Compass, Play, Globe, Users, FolderKanban, HeartHandshake, ArrowRight } from 'lucide-react';
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
      {/* 1. Hero World Canvas Container */}
      <div className="relative bg-transparent min-h-[460px] sm:min-h-[500px] lg:min-h-[520px]">
        {/* Real World Vector Map Component with Natural Earth Projection */}
        <WorldMap
          selectedCountry={selectedCountry}
          onSelectCountry={onSelectCountry}
          onExploreCountry={onExploreCountry}
        />

        {/* Hero Title & Text Overlay (Positioned on the left matching dashboard screenshot) */}
        <div
          id="hero-intro-overlay"
          className="lg:absolute lg:left-8 xl:left-10 lg:top-8 xl:top-10 lg:max-w-[460px] z-25 p-4 lg:p-0 pointer-events-auto select-none"
        >
          {/* Main Headline with exact 3-line layout and typographic weights */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-[#0D1E3A] tracking-[-0.03em] font-['Outfit'] leading-[1.12]">
            O mundo <br />
            é uma vila. <br />
            E nós somos <span className="text-[#00C29A] font-extrabold">um.</span>
          </h1>

          {/* Subtitle with exact line-wrap and clean typography */}
          <p className="mt-3.5 text-sm sm:text-[15px] text-[#4B5563] leading-[1.55] max-w-[420px] font-normal">
            Explore territórios. Descubra comunidades. Participe em iniciativas que transformam vidas em todo o planeta.
          </p>

          {/* Call to Actions */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary Gradient Pill CTA */}
            <button
              id="hero-cta-explore-world"
              onClick={onExploreWorld}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0055FE] to-[#00C29A] text-white font-bold text-[14px] shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:opacity-98 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <div className="w-4.5 h-4.5 rounded-full border border-white/80 flex items-center justify-center">
                <Compass className="w-3 h-3 text-white stroke-[2.2]" />
              </div>
              <span className="tracking-tight">Explorar o Mundo</span>
              <ArrowRight className="w-4 h-4 ml-0.5 stroke-[2.5]" />
            </button>

            {/* Secondary Video Action */}
            <button
              id="hero-cta-watch-video"
              onClick={onWatchTour}
              className="inline-flex items-center justify-center gap-2 text-[14px] font-bold text-[#0D1E3A] hover:text-[#0055FE] transition-colors py-2 px-1 cursor-pointer group"
            >
              <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-[#0D1E3A] group-hover:border-l-[#0055FE] transition-colors inline-block" />
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
          <div className="bg-white/95 backdrop-blur-md rounded-[20px] px-5 py-2.5 border border-slate-100/90 shadow-[0_4px_20px_rgba(15,30,61,0.06)]">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* 1. Países ativos (Globo - Azul) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0052FF] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#122244] leading-tight">128</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Países ativos</p>
                </div>
              </div>

              {/* 2. Cidadãos (Pessoas - Roxo) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0 sm:pl-6">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#122244] leading-tight">7.842.521</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Cidadãos</p>
                </div>
              </div>

              {/* 3. Projetos ativos (Usuários/Grupo - Laranja) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0 sm:pl-6">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center shrink-0">
                  <FolderKanban className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#122244] leading-tight">24.651</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Projetos ativos</p>
                </div>
              </div>

              {/* 4. Parceiros globais (Coração - Vermelho/Rosa) */}
              <div className="flex items-center gap-2.5 pt-1 sm:pt-0 sm:pl-6">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#F43F5E] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-[15px] font-black text-[#122244] leading-tight">3.412</p>
                  <p className="text-[10px] font-medium text-[#64748B] whitespace-nowrap">Parceiros globais</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Map Legend Pill Container matching screenshot */}
          <div className="bg-white/95 backdrop-blur-md rounded-[20px] px-5 py-2.5 border border-slate-100/90 shadow-[0_4px_20px_rgba(15,30,61,0.06)] flex items-center justify-center sm:justify-start gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-[#122244] font-bold text-[11px] whitespace-nowrap">País Ativo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF]" />
              <span className="text-[#122244] font-bold text-[11px] whitespace-nowrap">País com Atividade</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
              <span className="text-[#122244] font-bold text-[11px] whitespace-nowrap">País Inativo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
