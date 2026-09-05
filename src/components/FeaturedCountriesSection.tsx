import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';

interface FeaturedCountriesSectionProps {
  selectedCountry?: CountryData | null;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  onViewAllCountries: () => void;
  onOpenAiAssistant: () => void;
}

export const FeaturedCountriesSection: React.FC<FeaturedCountriesSectionProps> = ({
  selectedCountry,
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
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="featured-countries-section"
      className="bg-white rounded-[24px] sm:rounded-[28px] border border-slate-100/90 shadow-[0_4px_24px_rgba(15,30,61,0.03)] p-5 sm:p-6 lg:p-7 relative mb-6"
    >
      {/* Section Header */}
      <div className="flex flex-row items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0D1E3A] tracking-tight font-['Outfit']">
            Países em destaque
          </h2>
          <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
            Descubra países ativos e iniciativas que estão a gerar impacto global.
          </p>
        </div>

        <button
          onClick={onViewAllCountries}
          id="btn-view-all-countries"
          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0055FE] hover:text-[#0040CC] transition-colors py-1 group shrink-0 cursor-pointer"
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
          className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-100 shadow-[0_4px_16px_rgba(15,30,61,0.1)] flex items-center justify-center text-[#0D1E3A] hover:text-[#0055FE] hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
          aria-label="Rolar para a esquerda"
        >
          <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          id="btn-carousel-right"
          className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-slate-100 shadow-[0_4px_16px_rgba(15,30,61,0.1)] flex items-center justify-center text-[#0D1E3A] hover:text-[#0055FE] hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer"
          aria-label="Rolar para a direita"
        >
          <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          id="featured-countries-carousel"
          className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-1 pt-1 px-1 scroll-smooth no-scrollbar"
        >
          {featuredCountries.map((country) => {
            const isSelected = selectedCountry?.id === country.id || (!selectedCountry && country.id === 'portugal');

            return (
              <div
                key={country.id}
                id={`country-card-${country.id}`}
                onClick={() => onSelectCountry(country)}
                className={`min-w-[210px] sm:min-w-[225px] max-w-[225px] bg-white rounded-[20px] p-3.5 flex flex-col justify-between cursor-pointer group shrink-0 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-md ${
                  isSelected
                    ? 'border-2 border-[#60A5FA] shadow-[0_0_0_1px_rgba(96,165,250,0.3)]'
                    : 'border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Card Header & Country Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-base leading-none shrink-0">{country.flag}</span>
                    <h3 className="text-[13.5px] font-bold text-[#0D1E3A] group-hover:text-[#0055FE] transition-colors truncate">
                      {country.name}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wider rounded-full bg-[#DCFCE7] text-[#16A34A] uppercase shrink-0">
                    ATIVO
                  </span>
                </div>

                {/* Cover Image Inset with Rounded Corners */}
                <div className="relative h-26 sm:h-28 w-full rounded-[14px] overflow-hidden bg-slate-100 my-2.5">
                  <img
                    src={country.imageUrl}
                    alt={`Fotografia de ${country.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Metrics & Action Link Footer */}
                <div>
                  <div className="grid grid-cols-2 gap-2 text-xs pb-2.5">
                    <div>
                      <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Projetos</p>
                      <p className="text-[13.5px] font-extrabold text-[#0D1E3A] mt-1.5">
                        {country.projectsCount.toLocaleString('pt-PT')}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#94A3B8] font-medium leading-none">Comunidades</p>
                      <p className="text-[13.5px] font-extrabold text-[#0D1E3A] mt-1.5">
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
                      className="text-[12px] font-bold text-[#0055FE] group-hover:text-[#0040CC] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Explorar</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button (FAB) for VILA AI on bottom right */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={onOpenAiAssistant}
          id="fab-vila-ai"
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0055FE] to-[#3B82F6] text-white shadow-xl shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Abrir Assistente VILA AI"
          title="Assistente VILA AI"
        >
          <div className="flex flex-col items-center justify-center">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="text-[8.5px] font-extrabold tracking-tight uppercase leading-none mt-0.5">VILA AI</span>
          </div>
        </button>
      </div>
    </section>
  );
};
