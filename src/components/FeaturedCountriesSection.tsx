import React, { useEffect, useRef } from 'react';
import { ArrowRight, Eye, Sparkles, Clock, Globe2 } from 'lucide-react';
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
  const isInteractingRef = useRef(false);

  // Exact featured countries list
  const featuredCountries = COUNTRIES_DATA.filter((c) =>
    ['portugal', 'espanha', 'quenia', 'brasil', 'alemanha', 'japao', 'angola', 'cabo-verde'].includes(c.id)
  );

  // Dados complementares para simular a estética exata dos cards da imagem (preços de apoio/início, status, tempo, visualizações e licitações/iniciativas)
  const countryCardMeta: Record<string, {
    statusBadge: string;
    subStatus: string;
    timer: string;
    startLabel: string;
    valueFormatted: string;
    views: number;
    bids: number;
  }> = {
    portugal: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 1.250',
      views: 74,
      bids: 18,
    },
    espanha: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 980',
      views: 60,
      bids: 14,
    },
    quenia: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 550',
      views: 33,
      bids: 8,
    },
    brasil: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 1.800',
      views: 96,
      bids: 24,
    },
    alemanha: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 2.100',
      views: 48,
      bids: 12,
    },
    japao: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 1.450',
      views: 52,
      bids: 15,
    },
    angola: {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 620',
      views: 41,
      bids: 9,
    },
    'cabo-verde': {
      statusBadge: 'Em Destaque',
      subStatus: 'Ativo',
      timer: '00h 00m 00s',
      startLabel: 'Iniciativas',
      valueFormatted: '€ 390',
      views: 29,
      bids: 6,
    },
  };

  // Carrossel suave e pausável
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!container || isInteractingRef.current) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      if (container.scrollLeft >= maxScroll - 6) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 240, behavior: 'smooth' });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const pauseAutoScroll = () => {
    isInteractingRef.current = true;
  };

  const resumeAutoScroll = () => {
    isInteractingRef.current = false;
  };

  return (
    <section
      id="featured-countries-section"
      className="bg-[#FFF9F3]/70 rounded-[28px] border border-[#F6E6D7] shadow-[0_4px_30px_rgba(235,160,80,0.05)] p-5 sm:p-6 lg:p-7 relative mb-6 overflow-hidden"
    >
      {/* Section Header estilizado com badge / botão Explorar igual à imagem de referência */}
      <div className="flex flex-row items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">🏛️</span>
          <div>
            <h2 className="text-base sm:text-xl font-extrabold text-[#1E293B] tracking-tight font-['Outfit'] flex items-center gap-2">
              Países em Destaque
            </h2>
            <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5">
              Descubra nações ativas, iniciativas e oportunidades de participação global.
            </p>
          </div>
        </div>

        <button
          onClick={onViewAllCountries}
          id="btn-view-all-countries"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs sm:text-[13px] font-bold text-[#0D6EFD] hover:bg-slate-50 hover:border-blue-300 transition-all shadow-2xs group shrink-0 cursor-pointer"
        >
          <span>Explorar Países</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Carrossel de Cards com a Estilização Exata da Imagem */}
      <div className="relative -mx-5 sm:-mx-6 lg:-mx-7">
        <div
          ref={scrollContainerRef}
          id="featured-countries-carousel"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
          onTouchStart={pauseAutoScroll}
          onTouchEnd={resumeAutoScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 pl-5 sm:pl-6 lg:pl-7 pr-4 scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-proximity"
        >
          {featuredCountries.map((country) => {
            const isSelected = selectedCountry?.id === country.id || (!selectedCountry && country.id === 'portugal');
            const meta = countryCardMeta[country.id] || {
              statusBadge: 'Em Destaque',
              subStatus: 'Ativo',
              timer: '00h 00m 00s',
              startLabel: 'Iniciativas',
              valueFormatted: '€ 750',
              views: 35,
              bids: 5,
            };

            return (
              <div
                key={country.id}
                id={`country-card-${country.id}`}
                onClick={() => onSelectCountry(country)}
                className={`min-w-[215px] sm:min-w-[230px] max-w-[230px] bg-white rounded-xl border flex flex-col justify-between cursor-pointer group shrink-0 snap-start transition-all duration-200 hover:-translate-y-1 relative shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-[#0D6EFD] ring-2 ring-[#0D6EFD]/20'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* 1. Top Section com Badge Verde ("Upcoming" / "Ativo") */}
                <div className="relative p-2.5 pb-0">
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2.5 py-1 rounded-sm bg-[#198754] text-white text-[10px] font-bold tracking-tight inline-block shadow-2xs">
                      {meta.statusBadge}
                    </span>
                  </div>

                  {/* Imagem do Produto/País em moldura limpa com fundo claro */}
                  <div className="w-full h-36 sm:h-38 rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center relative p-1.5">
                    <img
                      src={country.imageUrl}
                      alt={`Imagem de ${country.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-md group-hover:scale-104 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Faixa com Substatus ("Closed / Ativo") e Timer vermelho ("00h 00m 00s") */}
                  <div className="flex items-center justify-between mt-2.5 px-0.5 text-[11px] font-medium text-slate-600 border-b border-slate-100 pb-2">
                    <span className="text-slate-700 font-semibold">{meta.subStatus}</span>
                    <div className="flex items-center gap-1 text-[#E02424] font-semibold text-[11px]">
                      <Clock className="w-3 h-3 stroke-[2.5]" />
                      <span>{meta.timer}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Conteúdo Central: Título com Reticências, Preço/Valor */}
                <div className="p-3 pt-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-sm leading-none shrink-0">{country.flag}</span>
                    <h3
                      className="text-[13.5px] font-bold text-slate-800 truncate leading-snug group-hover:text-[#0D6EFD] transition-colors"
                      title={country.name}
                    >
                      {country.name}
                    </h3>
                  </div>

                  {/* Linha de "Start Price / Valor" */}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[11px] text-slate-400 font-normal">
                      {meta.startLabel}
                    </span>
                    <span className="text-[15px] font-extrabold text-[#0D6EFD] tracking-tight">
                      {country.projectsCount.toLocaleString('pt-PT')}
                    </span>
                  </div>

                  {/* 3. Rodapé com Visualizações, Martelo/Iniciativas e Botão Azul "Participate" */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2.5 text-slate-600 text-[11px]">
                      {/* Visualizações */}
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{meta.views}</span>
                      </span>

                      {/* Ícone de Ação / Projetos */}
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{meta.bids}</span>
                      </span>
                    </div>

                    {/* Botão Azul Escuro Pílula "Participate" */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreCountry(country);
                      }}
                      id={`card-btn-participate-${country.id}`}
                      className="px-3 py-1 rounded-md bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white text-[11.5px] font-bold tracking-tight shadow-xs hover:shadow transition-all cursor-pointer inline-flex items-center justify-center"
                    >
                      Participar
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

