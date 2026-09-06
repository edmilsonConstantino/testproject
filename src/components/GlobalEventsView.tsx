import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MapPin,
  Sparkles,
  Users,
  Calendar as CalendarIcon,
  Ticket,
  Globe,
  Cpu,
  Briefcase,
  Palette,
  Leaf,
  HeartPulse,
  GraduationCap,
  Trophy,
  MoreHorizontal,
  Clock,
  Radio
} from 'lucide-react';
import { GlobalWorldMapHero } from './GlobalWorldMapHero';
import { GlobalCalendarWidget } from './GlobalCalendarWidget';

interface GlobalEventsViewProps {
  onOpenAiAssistant?: () => void;
  onExploreMap?: () => void;
}

const CATEGORY_LEGEND = [
  { name: 'Conferências', color: 'bg-[#00B4D8]' },
  { name: 'Cultura', color: 'bg-[#EC4899]' },
  { name: 'Desporto', color: 'bg-[#10B981]' },
  { name: 'Tecnologia', color: 'bg-[#F97316]' },
  { name: 'Outros', color: 'bg-[#8B5CF6]' },
];

const FILTER_PILLS = [
  { id: 'todas', label: 'Todas', icon: Globe },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
  { id: 'negocios', label: 'Negócios', icon: Briefcase },
  { id: 'cultura', label: 'Cultura', icon: Palette },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf },
  { id: 'saude', label: 'Saúde', icon: HeartPulse },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
  { id: 'desporto', label: 'Desporto', icon: Trophy },
];

const RECOMMENDED_EVENTS = [
  {
    id: 1,
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-indigo-100 text-indigo-700',
    modality: 'ONLINE',
    modalityClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40',
    date: '21 – 23 Mai 2024',
    title: 'Web Summit Rio 2024',
    location: 'Rio de Janeiro, Brasil',
    description: 'O maior evento global de tecnologia, startups e inovação.',
    interested: '25.4K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    category: 'AMBIENTE',
    categoryBadgeClass: 'bg-emerald-100 text-emerald-700',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-amber-950/80 text-amber-300 border border-amber-500/40',
    date: '30 Mai – 5 Jun 2024',
    title: 'UN Climate Change Conference (SB60)',
    location: 'Bonn, Alemanha',
    description: 'Negociações globais para ações climáticas e sustentabilidade.',
    interested: '12.7K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    category: 'CULTURA',
    categoryBadgeClass: 'bg-purple-100 text-purple-700',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-amber-950/80 text-amber-300 border border-amber-500/40',
    date: '18 – 26 Mai 2024',
    title: 'Nuit des Musées 2024',
    location: 'Paris, França',
    description: 'Uma noite mágica de arte, cultura e património mundial.',
    interested: '8.9K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    category: 'NEGÓCIOS',
    categoryBadgeClass: 'bg-amber-100 text-amber-700',
    modality: 'ONLINE',
    modalityClass: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40',
    date: '3 – 6 Jun 2024',
    title: 'Global Business Forum 2024',
    location: 'Virtual',
    description: 'Líderes globais discutem o futuro dos negócios e da economia.',
    interested: '15.2K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80',
  },
];

const REGIONS = [
  {
    id: 'america-do-norte',
    name: 'América do Norte',
    count: '128 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'america-do-sul',
    name: 'América do Sul',
    count: '96 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'europa',
    name: 'Europa',
    count: '312 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'africa',
    name: 'África',
    count: '74 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'asia',
    name: 'Ásia',
    count: '208 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'oceania',
    name: 'Oceania',
    count: '56 eventos',
    imageUrl: 'https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=500&auto=format&fit=crop&q=80',
  },
];

const FEATURED_EVENTS = [
  {
    id: 1,
    category: 'DESPORTO',
    categoryBadgeClass: 'bg-[#FFF2EB] text-[#F97316]',
    title: 'UEFA Champions League Final 2024',
    info: '1 Jun 2024 · Londres, Reino Unido',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=320&auto=format&fit=crop&q=80',
    bgTone: 'bg-slate-900',
  },
  {
    id: 2,
    category: 'SAÚDE',
    categoryBadgeClass: 'bg-[#F5EEFF] text-[#9333EA]',
    title: 'World Health Assembly 77th Session',
    info: '27 Mai – 1 Jun 2024 · Genebra',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Flag_of_the_World_Health_Organization.svg/320px-Flag_of_the_World_Health_Organization.svg.png',
    bgTone: 'bg-[#0072BB]',
  },
  {
    id: 3,
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-[#EFF6FF] text-[#2563EB]',
    title: 'Apple WWDC24',
    info: '10 – 14 Jun 2024 · Apple Park, EUA',
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=320&auto=format&fit=crop&q=80',
    bgTone: 'bg-black',
  },
  {
    id: 4,
    category: 'CULTURA',
    categoryBadgeClass: 'bg-[#FDF2F8] text-[#DB2777]',
    title: 'Cannes Film Festival 2024',
    info: '14 – 25 Mai 2024 · Cannes, França',
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=320&auto=format&fit=crop&q=80',
    bgTone: 'bg-slate-900',
  },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    timeTag: 'EM 2 HORAS',
    tagClass: 'text-emerald-600 bg-emerald-50',
    title: 'AI for Good Global Summit',
    location: 'Online',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=240&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    timeTag: 'EM 5 HORAS',
    tagClass: 'text-blue-600 bg-blue-50',
    title: 'Global Education Summit',
    location: 'Londres, Reino Unido',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=240&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    timeTag: 'AMANHÃ',
    tagClass: 'text-slate-600 bg-slate-100',
    title: 'World Economic Forum Annual Meeting 2024',
    location: 'Davos, Suíça',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=240&auto=format&fit=crop&q=80',
  },
];

// Dias do calendário para Maio 2024
const CALENDAR_DAYS = [
  { day: 29, isCurrentMonth: false, hasEvent: false },
  { day: 30, isCurrentMonth: false, hasEvent: false },
  { day: 1, isCurrentMonth: true, hasEvent: false },
  { day: 2, isCurrentMonth: true, hasEvent: false },
  { day: 3, isCurrentMonth: true, hasEvent: false },
  { day: 4, isCurrentMonth: true, hasEvent: false },
  { day: 5, isCurrentMonth: true, hasEvent: false },
  { day: 6, isCurrentMonth: true, hasEvent: false },
  { day: 7, isCurrentMonth: true, hasEvent: false },
  { day: 8, isCurrentMonth: true, hasEvent: true },
  { day: 9, isCurrentMonth: true, hasEvent: false },
  { day: 10, isCurrentMonth: true, hasEvent: false },
  { day: 11, isCurrentMonth: true, hasEvent: false },
  { day: 12, isCurrentMonth: true, hasEvent: false },
  { day: 13, isCurrentMonth: true, hasEvent: false },
  { day: 14, isCurrentMonth: true, hasEvent: true },
  { day: 15, isCurrentMonth: true, hasEvent: true },
  { day: 16, isCurrentMonth: true, hasEvent: true, isSelected: true },
  { day: 17, isCurrentMonth: true, hasEvent: false },
  { day: 18, isCurrentMonth: true, hasEvent: false },
  { day: 19, isCurrentMonth: true, hasEvent: false },
  { day: 20, isCurrentMonth: true, hasEvent: false },
  { day: 21, isCurrentMonth: true, hasEvent: false },
  { day: 22, isCurrentMonth: true, hasEvent: false },
  { day: 23, isCurrentMonth: true, hasEvent: true },
  { day: 24, isCurrentMonth: true, hasEvent: false },
  { day: 25, isCurrentMonth: true, hasEvent: false },
  { day: 26, isCurrentMonth: true, hasEvent: false },
  { day: 27, isCurrentMonth: true, hasEvent: false },
  { day: 28, isCurrentMonth: true, hasEvent: false },
  { day: 29, isCurrentMonth: true, hasEvent: false },
  { day: 30, isCurrentMonth: true, hasEvent: true },
  { day: 31, isCurrentMonth: true, hasEvent: false },
  { day: 1, isCurrentMonth: false, hasEvent: false },
  { day: 2, isCurrentMonth: false, hasEvent: false },
];

export const GlobalEventsView: React.FC<GlobalEventsViewProps> = ({
  onOpenAiAssistant,
  onExploreMap
}) => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(16);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-[#F1F5F9] min-h-full">
      <div className="px-6 lg:px-8 pt-6 lg:pt-8 pb-12 max-w-[1600px] mx-auto">
        {/* Cabeçalho da Página: Título e Subtítulo (Alinhado acima do Grid) */}
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-['Outfit']">
            Eventos Globais
          </h1>
          <p className="text-sm text-[#475569] mt-1.5 leading-relaxed max-w-3xl">
            Descubra eventos que conectam pessoas, ideias e soluções.
            <br className="hidden sm:inline" />
            {' '}Participe presencialmente ou online de qualquer lugar do mundo.
          </p>
        </header>

        {/* Layout Principal com Duas Colunas: Principal e Lateral Direita alinhadas no topo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Coluna Principal (~72% da largura em telas grandes) */}
          <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6" aria-label="Conteúdo Principal de Eventos">
            {/* SEÇÃO HERO EM DUAS COLUNAS: MAPA MUNDI AMPLIADO (~70%-72%) E CALENDÁRIO COMPACTO (~28%-30%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* 1. Bloco Hero Ampliado com Mapa Mundi Noturno e Hotspots */}
              <GlobalWorldMapHero
                className="lg:col-span-8"
                onExploreMap={onExploreMap}
                title="O mundo está acontecendo agora."
                subtitle="Explore eventos em todo o planeta em tempo real."
              />

              {/* 2. Widget Lateral Direito: Calendário Global Compacto */}
              <GlobalCalendarWidget
                className="lg:col-span-4"
                onSelectDay={(day) => setSelectedDay(day)}
              />
            </div>

            {/* LINHA HORIZONTAL DE PILLS DE FILTRO DE CATEGORIA */}
            <div
              id="events-category-filters"
              className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
            >
              {FILTER_PILLS.map((pill) => {
                const Icon = pill.icon;
                const isActive = activeFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setActiveFilter(pill.id)}
                    className={`inline-flex items-center gap-2 py-2 px-4 rounded-full text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-[#0055FE] text-white shadow-sm border border-[#0055FE]'
                        : 'bg-white border border-[#E2E8F0] text-[#334155] hover:bg-slate-50 hover:text-[#0F172A] shadow-xs'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'} stroke-[2.2]`} />
                    <span>{pill.label}</span>
                  </button>
                );
              })}

              {/* Pill "Mais" */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-white border border-[#E2E8F0] text-[#334155] hover:bg-slate-50 hover:text-[#0F172A] text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-xs shrink-0"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                <span>Mais</span>
              </button>
            </div>

            {/* SEÇÃO: EVENTOS RECOMENDADOS PARA SI */}
            <div className="flex flex-col gap-4 pt-1">
              {/* Cabeçalho da Seção */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Eventos recomendados para si
                </h3>

                <div className="flex items-center gap-3">
                  {/* Setas de navegação do Carousel */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => scrollCarousel('left')}
                      aria-label="Eventos anteriores"
                      className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] text-slate-600 hover:text-[#0055FE] hover:border-[#0055FE] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCarousel('right')}
                      aria-label="Próximos eventos"
                      className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] text-slate-600 hover:text-[#0055FE] hover:border-[#0055FE] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Link Ver todos os eventos */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group/all"
                  >
                    <span>Ver todos os eventos</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/all:translate-x-0.5 transition-transform stroke-[2.2]" />
                  </button>
                </div>
              </div>

              {/* Grid / Carousel Horizontal de 4 Cards Visíveis */}
              <div
                ref={carouselRef}
                id="recommended-events-carousel"
                className="flex items-stretch gap-4.5 overflow-x-auto pb-3 pt-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
              >
                {RECOMMENDED_EVENTS.map((event) => {
                  const isBookmarked = bookmarkedIds.includes(event.id);

                  return (
                    <article
                      key={event.id}
                      className="w-[285px] sm:w-[calc(50%-10px)] lg:w-[calc(25%-14px)] min-w-[250px] shrink-0 bg-white rounded-[12px] border border-slate-100/90 shadow-[0_3px_14px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.09)] transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
                    >
                      {/* Top: Imagem com badges */}
                      <div className="relative h-[170px] w-full overflow-hidden bg-slate-100">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-t-[12px] group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Badge de Categoria (Canto superior esquerdo) */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold tracking-wider uppercase shadow-xs ${event.categoryBadgeClass}`}>
                            {event.category}
                          </span>
                        </div>

                        {/* Badge de Modalidade (Canto superior direito) */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider uppercase shadow-xs backdrop-blur-xs ${event.modalityClass}`}>
                            {event.modality}
                          </span>
                        </div>
                      </div>

                      {/* Corpo do Card */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Data do Evento */}
                          <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                            {event.date}
                          </span>

                          {/* Título do Evento */}
                          <h4
                            className="text-sm sm:text-[14.5px] font-bold text-[#0F172A] leading-snug line-clamp-1 group-hover:text-[#0055FE] transition-colors font-['Outfit']"
                            title={event.title}
                          >
                            {event.title}
                          </h4>

                          {/* Localização */}
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>

                          {/* Descrição em Cinza (2 linhas) */}
                          <p
                            className="text-xs text-[#64748B] leading-relaxed mt-2 line-clamp-2"
                            title={event.description}
                          >
                            {event.description}
                          </p>
                        </div>

                        {/* Rodapé do Card */}
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Users className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[11px] font-medium">
                              {event.interested}
                            </span>
                          </div>

                          {/* Botão Bookmark */}
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(event.id, e)}
                            title={isBookmarked ? 'Remover dos guardados' : 'Guardar evento'}
                            className="p-1 -mr-1 rounded-md text-slate-400 hover:text-[#0055FE] transition-colors cursor-pointer"
                          >
                            <Bookmark
                              className={`w-4 h-4 transition-transform active:scale-90 stroke-[2] ${
                                isBookmarked
                                  ? 'fill-[#0055FE] text-[#0055FE]'
                                  : 'hover:text-[#0055FE]'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO: EXPLORE POR REGIÃO */}
            <div className="flex flex-col gap-4 pt-1">
              {/* Cabeçalho da Seção */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Explore por região
                </h3>

                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group/regions"
                >
                  <span>Ver todas as regiões</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/regions:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Grid de 6 Colunas de Regiões */}
              <div
                id="events-regions-grid"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {REGIONS.map((region) => (
                  <div
                    key={region.id}
                    className="relative h-[120px] rounded-[12px] overflow-hidden group cursor-pointer shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_18px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 transition-all duration-200 select-none"
                  >
                    {/* Imagem de Fundo */}
                    <img
                      src={region.imageUrl}
                      alt={region.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Overlay Escuro Gradiente na parte inferior */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                    {/* Ícone no Canto Superior Esquerdo */}
                    <div className="absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white/90">
                      <MapPin className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>

                    {/* Textos Sobrepostos na Parte Inferior */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10">
                      <h4 className="text-[13.5px] font-bold text-white leading-tight font-['Outfit'] truncate">
                        {region.name}
                      </h4>
                      <p className="text-[11px] font-medium text-white/80 mt-0.5">
                        {region.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Coluna Lateral Direita: Card "Eventos em destaque" idêntico à referência visual */}
          <aside
            className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-6 self-start"
            aria-label="Sidebar de Eventos em Destaque"
          >
            {/* Card Unificado Branco com bordas arredondadas e sombra suave */}
            <div
              id="featured-events-card"
              className="bg-white rounded-[24px] border border-slate-100/90 shadow-[0_4px_24px_rgba(15,23,42,0.04)] p-5 sm:p-6 flex flex-col justify-between"
            >
              {/* Cabeçalho Interno do Card: "Eventos em destaque" + "Ver todos →" */}
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Eventos em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs sm:text-[12.5px] font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                </button>
              </div>

              {/* Lista dos 4 Itens em Destaque */}
              <div className="space-y-4">
                {FEATURED_EVENTS.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-start gap-3.5 group cursor-pointer"
                  >
                    {/* Thumbnail quadrada arredondada (~68x68px) */}
                    <div className={`w-[66px] h-[66px] sm:w-[70px] sm:h-[70px] rounded-[14px] overflow-hidden shrink-0 ${item.bgTone || 'bg-slate-900'} shadow-xs flex items-center justify-center relative p-0.5`}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* Informações do Evento à Direita */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[66px] py-0.5">
                      <div>
                        {/* Pill de Categoria */}
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase ${item.categoryBadgeClass}`}>
                          {item.category}
                        </span>

                        {/* Título do Evento */}
                        <h4
                          className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-snug line-clamp-2 mt-1 group-hover:text-[#0055FE] transition-colors font-['Outfit']"
                          title={item.title}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {/* Data e Localização */}
                      <p className="text-[11px] text-[#64748B] font-medium truncate mt-1">
                        {item.info}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Botão Inferior Interno do Card: "Ver todos os destaques →" */}
              <div className="pt-5 mt-2">
                <button
                  type="button"
                  className="w-full py-3 px-4 rounded-[14px] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0055FE] text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group shadow-xs"
                >
                  <Ticket className="w-4 h-4 text-[#0055FE] stroke-[2]" />
                  <span>Ver todos os destaques</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Botão Flutuante "VILA AI" no Canto Inferior Direito da Tela */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onOpenAiAssistant}
          id="fab-vila-ai-events"
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
    </div>
  );
};
