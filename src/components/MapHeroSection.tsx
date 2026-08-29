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
    <section id="map-hero-section" className="relative space-y-4">
      {/* 1. Hero World Canvas Container */}
      <div className="relative rounded-3xl overflow-hidden bg-transparent">
        {/* Real World Vector Map Component with Natural Earth Projection */}
        <WorldMap
          selectedCountry={selectedCountry}
          onSelectCountry={onSelectCountry}
          onExploreCountry={onExploreCountry}
        />

        {/* Hero Title & Text Overlay (Positioned on the left matching image.png) */}
        <div
          id="hero-intro-overlay"
          className="lg:absolute lg:left-8 xl:left-10 lg:top-10 xl:top-12 lg:max-w-md xl:max-w-lg z-25 p-6 lg:p-0 pointer-events-auto"
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-[54px] font-extrabold text-[#0F1E3D] tracking-tight font-['Outfit'] leading-[1.08]">
            O mundo <br />
            é uma vila. <br />
            E nós somos <span className="text-[#10B981]">um.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-sm sm:max-w-md font-normal">
            Explore territórios. Descubra comunidades. Participe em iniciativas que transformam vidas em todo o planeta.
          </p>

          {/* Call to Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {/* Primary Gradient CTA */}
            <button
              id="hero-cta-explore-world"
              onClick={onExploreWorld}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#10B981] text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explorar o Mundo</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            {/* Secondary Video Action */}
            <button
              id="hero-cta-watch-video"
              onClick={onWatchTour}
              className="inline-flex items-center justify-center gap-2.5 px-4 py-3 text-xs sm:text-sm font-semibold text-[#0F1E3D] hover:text-[#2563EB] transition-colors rounded-xl hover:bg-white/60 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center shadow-xs">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Ver como funciona (2:14)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Floating Bottom Global Metrics & Map Legend Capsule Cards matching image.png */}
      <div
        id="global-metrics-floating-banner"
        className="w-full flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4"
      >
        {/* Left Card: 4 Primary Stats in White Pill Container */}
        <div className="bg-white rounded-2xl p-4 md:px-6 md:py-3.5 border border-[#E2E8F0] shadow-sm flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 items-center">
            {/* 1. Países ativos */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <Globe className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-base md:text-lg font-extrabold text-[#0F1E3D] leading-none">128</p>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-0.5 whitespace-nowrap">Países ativos</p>
              </div>
            </div>

            {/* 2. Cidadãos ativos */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-base md:text-lg font-extrabold text-[#0F1E3D] leading-none">7.842.521</p>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-0.5 whitespace-nowrap">Cidadãos ativos</p>
              </div>
            </div>

            {/* 3. Projetos ativos */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center shrink-0">
                <FolderKanban className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-base md:text-lg font-extrabold text-[#0F1E3D] leading-none">24.651</p>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-0.5 whitespace-nowrap">Projetos ativos</p>
              </div>
            </div>

            {/* 4. Parceiros globais */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-base md:text-lg font-extrabold text-[#0F1E3D] leading-none">3.412</p>
                <p className="text-[11px] font-medium text-[#94A3B8] mt-0.5 whitespace-nowrap">Parceiros globais</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Map Legend Pill Container matching image.png */}
        <div className="bg-white rounded-2xl px-6 py-3.5 border border-[#E2E8F0] shadow-sm flex items-center justify-center sm:justify-start gap-5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-emerald-100" />
            <span className="text-[#334155] font-semibold text-xs whitespace-nowrap">País Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] ring-2 ring-blue-100" />
            <span className="text-[#334155] font-semibold text-xs whitespace-nowrap">País com Atividade</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8] ring-2 ring-slate-100" />
            <span className="text-[#334155] font-semibold text-xs whitespace-nowrap">País Inativo</span>
          </div>
        </div>
      </div>
    </section>
  );
};
