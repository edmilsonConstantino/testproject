import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';

interface FeaturedCountriesSectionProps {
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  onViewAllCountries: () => void;
  onOpenAiAssistant: () => void;
}

export const FeaturedCountriesSection: React.FC<FeaturedCountriesSectionProps> = ({
  onSelectCountry,
  onExploreCountry,
  onViewAllCountries,
  onOpenAiAssistant,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Exact 6 featured countries shown in reference image:
  // Portugal, Espanha, Quénia, Brasil, Alemanha, Japão
  const featuredCountries = COUNTRIES_DATA.filter((c) =>
    ['portugal', 'espanha', 'quenia', 'brasil', 'alemanha', 'japao'].includes(c.id)
  );

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="featured-countries-section" className="relative mt-10 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F1E3D] tracking-tight font-['Outfit']">
            Países em destaque
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
            Descubra países ativos e iniciativas que estão a gerar impacto global.
          </p>
        </div>

        <button
          onClick={onViewAllCountries}
          id="btn-view-all-countries"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors py-1 group shrink-0"
        >
          <span>Ver todos os países</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Carousel Container with Overlaid Circle Navigation Arrows */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeft}
          id="btn-carousel-left"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#0F1E3D] hover:text-[#2563EB] hover:scale-105 transition-all focus:outline-none cursor-pointer"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          id="btn-carousel-right"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-md flex items-center justify-center text-[#0F1E3D] hover:text-[#2563EB] hover:scale-105 transition-all focus:outline-none cursor-pointer"
          aria-label="Rolar para a direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          id="featured-countries-carousel"
          className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth no-scrollbar"
        >
          {featuredCountries.map((country) => (
            <div
              key={country.id}
              id={`country-card-${country.id}`}
              onClick={() => onSelectCountry(country)}
              className="min-w-[240px] sm:min-w-[260px] md:min-w-[270px] max-w-[270px] bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between cursor-pointer group"
            >
              {/* Card Header & Country Badge */}
              <div className="p-3.5 pb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{country.flag}</span>
                  <h3 className="text-sm font-bold text-[#0F1E3D] group-hover:text-[#2563EB] transition-colors">
                    {country.name}
                  </h3>
                </div>
                <span className="px-2 py-0.5 text-[9.5px] font-extrabold tracking-wide rounded-md bg-[#DCFCE7] text-[#16A34A] uppercase">
                  ATIVO
                </span>
              </div>

              {/* Cover Image */}
              <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                <img
                  src={country.imageUrl}
                  alt={`Fotografia de ${country.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Metrics & Action Link Footer */}
              <div className="p-3.5 pt-3">
                <div className="grid grid-cols-2 gap-2 text-xs pb-2.5">
                  <div>
                    <p className="text-[10px] text-[#94A3B8] font-medium">Projetos</p>
                    <p className="text-xs font-extrabold text-[#0F1E3D]">
                      {country.projectsCount.toLocaleString('pt-PT')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#94A3B8] font-medium">Comunidades</p>
                    <p className="text-xs font-extrabold text-[#0F1E3D]">
                      {country.communitiesCount.toLocaleString('pt-PT')}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-start">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExploreCountry(country);
                    }}
                    id={`card-btn-explore-${country.id}`}
                    className="text-xs font-bold text-[#2563EB] group-hover:text-[#1D4ED8] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Explorar</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB) for VILA AI on bottom right matching screenshot */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onOpenAiAssistant}
          id="fab-vila-ai"
          className="relative group flex items-center justify-center gap-2 w-14 h-14 rounded-full bg-[#2563EB] text-white shadow-xl shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Abrir Assistente VILA AI"
          title="Assistente VILA AI"
        >
          <div className="flex flex-col items-center justify-center">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-[9px] font-extrabold tracking-tighter uppercase leading-none mt-0.5">VILA AI</span>
          </div>
        </button>
      </div>
    </section>
  );
};
