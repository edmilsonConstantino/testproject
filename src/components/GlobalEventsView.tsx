import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MapPin,
  Sparkles,
  Users,
  Calendar,
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
  Radio,
  X,
  Share2,
  ExternalLink,
  Check
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
    categoryId: 'tecnologia',
    regionId: 'america-do-sul',
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-[#0055FE] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-black/60 text-emerald-300 border border-emerald-500/40 backdrop-blur-md',
    date: '21 – 23 Mai 2024',
    title: 'Web Summit Rio 2024',
    location: 'Rio de Janeiro, Brasil',
    description: 'O maior evento global de tecnologia, startups e inovação reunindo fundadores e investidores.',
    interested: '25.4K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'O Web Summit Rio reúne mais de 30.000 participantes e as empresas que estão a redefinir o ecossistema tecnológico global. Conecte-se com fundadores de topo, investidores de capital de risco e líderes de pensamento em inteligência artificial, clima, fintech e sustentabilidade.',
  },
  {
    id: 2,
    categoryId: 'ambiente',
    regionId: 'europa',
    category: 'AMBIENTE',
    categoryBadgeClass: 'bg-[#10B981] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-black/60 text-amber-300 border border-amber-500/40 backdrop-blur-md',
    date: '30 Mai – 5 Jun 2024',
    title: 'UN Climate Change Conference (SB60)',
    location: 'Bonn, Alemanha',
    description: 'Negociações globais para ações climáticas e implementação do Acordo de Paris.',
    interested: '12.7K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'A 60ª sessão dos órgãos subsidiários da UNFCCC reúne delegações de 190 países para avançar nas diretrizes operacionais de financiamento climático, transição energética justa e mitigação de perdas e danos globais.',
  },
  {
    id: 3,
    categoryId: 'cultura',
    regionId: 'europa',
    category: 'CULTURA',
    categoryBadgeClass: 'bg-[#8B5CF6] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-black/60 text-amber-300 border border-amber-500/40 backdrop-blur-md',
    date: '18 – 26 Mai 2024',
    title: 'Nuit des Musées 2024',
    location: 'Paris, França',
    description: 'Uma noite mágica de arte, cultura e património em mais de 3.000 museus europeus.',
    interested: '8.9K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'Durante a Noite Europeia dos Museus, centenas de instituições culturais de prestígio abrem as suas portas gratuitamente ao público à noite, com instalações luminosas, concertos imersivos e percursos guiados inéditos.',
  },
  {
    id: 4,
    categoryId: 'negocios',
    regionId: 'america-do-norte',
    category: 'NEGÓCIOS',
    categoryBadgeClass: 'bg-[#F59E0B] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-black/60 text-emerald-300 border border-emerald-500/40 backdrop-blur-md',
    date: '3 – 6 Jun 2024',
    title: 'Global Business Forum 2024',
    location: 'Virtual / Nova Iorque',
    description: 'Líderes mundiais debatem tendências macroeconómicas e a transformação do comércio.',
    interested: '15.2K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'Com conferencistas executivos de corporações Fortune 500, o fórum proporciona painéis interativos sobre cadeias de abastecimento resilientes, finanças sustentáveis e automação empresarial orientada por IA.',
  },
  {
    id: 5,
    categoryId: 'saude',
    regionId: 'europa',
    category: 'SAÚDE',
    categoryBadgeClass: 'bg-[#EC4899] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-black/60 text-amber-300 border border-amber-500/40 backdrop-blur-md',
    date: '27 Mai – 1 Jun 2024',
    title: 'World Health Assembly (WHA77)',
    location: 'Genebra, Suíça',
    description: 'O órgão de decisão supremo da OMS definindo prioridades sanitárias globais.',
    interested: '18.3K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'A 77ª Assembleia Mundial da Saúde reúne ministros da saúde e peritos de todo o mundo para debater o acordo global sobre pandemias, cobertura universal de saúde e resiliência sanitária.',
  },
  {
    id: 6,
    categoryId: 'educacao',
    regionId: 'europa',
    category: 'EDUCAÇÃO',
    categoryBadgeClass: 'bg-[#6366F1] text-white',
    modality: 'ONLINE',
    modalityClass: 'bg-black/60 text-emerald-300 border border-emerald-500/40 backdrop-blur-md',
    date: '19 – 22 Mai 2024',
    title: 'World Education Forum 2024',
    location: 'Londres, Reino Unido',
    description: 'O maior encontro anual de ministros da educação e inovadores pedagógicos globais.',
    interested: '14.1K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'Debatendo o impacto da IA nas salas de aula, metodologias STEM e inclusão educacional em países em desenvolvimento.',
  },
  {
    id: 7,
    categoryId: 'desporto',
    regionId: 'europa',
    category: 'DESPORTO',
    categoryBadgeClass: 'bg-[#10B981] text-white',
    modality: 'PRESENCIAL',
    modalityClass: 'bg-black/60 text-amber-300 border border-amber-500/40 backdrop-blur-md',
    date: '10 – 14 Jun 2024',
    title: 'Global Sports Summit 2024',
    location: 'Madrid, Espanha',
    description: 'Reunindo federações desportivas internacionais, atletas e marcas globais.',
    interested: '11.8K interessados',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    fullDescription: 'Focado em sustentabilidade desportiva, tecnologia em estádios inteligentes e a evolução das transmissões desportivas ao vivo.',
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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(16);
  const [selectedEventModal, setSelectedEventModal] = useState<typeof RECOMMENDED_EVENTS[0] | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredEvents = RECOMMENDED_EVENTS.filter((event) => {
    const matchesCategory = activeFilter === 'todas' || event.categoryId === activeFilter;
    const matchesRegion = !selectedRegion || event.regionId === selectedRegion;
    return matchesCategory && matchesRegion;
  });

  const handleToggleRegion = (regionId: string, regionName: string) => {
    if (selectedRegion === regionId) {
      setSelectedRegion(null);
      setShareToast('Filtro por região removido');
    } else {
      setSelectedRegion(regionId);
      setShareToast(`Filtrando por: ${regionName}`);
    }
    setTimeout(() => setShareToast(null), 2200);
  };

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

  const toggleRegister = (id: number) => {
    setRegisteredEvents((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleShare = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - Confira na plataforma VILA!`);
    }
    setShareToast('Link copiado para a área de transferência!');
    setTimeout(() => setShareToast(null), 2500);
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
            <div className="flex flex-col lg:flex-row gap-5 items-stretch">
              {/* 1. Bloco Hero Ampliado com Mapa Mundi Noturno e Hotspots */}
              <GlobalWorldMapHero
                className="lg:w-[70%] xl:w-[72%] h-full"
                onExploreMap={onExploreMap}
                title="O mundo está acontecendo agora."
                subtitle="Explore eventos em todo o planeta em tempo real."
              />

              {/* 2. Widget Lateral Direito: Calendário Global Compacto */}
              <GlobalCalendarWidget
                className="lg:w-[30%] xl:w-[28%] h-full"
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
                        ? 'bg-[#0055FE] text-white shadow-xs border border-[#0055FE]'
                        : 'bg-white border border-slate-200/80 text-[#334155] hover:border-slate-300 hover:bg-slate-50/80 hover:text-[#0F172A] shadow-2xs'
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
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-white border border-slate-200/80 text-[#334155] hover:border-slate-300 hover:bg-slate-50/80 hover:text-[#0F172A] text-xs sm:text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer shadow-2xs shrink-0"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-500 stroke-[2.2]" />
                <span>Mais</span>
              </button>
            </div>

            {/* SEÇÃO: EVENTOS RECOMENDADOS PARA SI */}
            <div className="flex flex-col gap-4 pt-1">
              {/* Cabeçalho da Seção */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                    Eventos recomendados para si
                  </h3>
                  {(activeFilter !== 'todas' || selectedRegion) && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('todas');
                        setSelectedRegion(null);
                      }}
                      className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0055FE] text-[11px] font-bold hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <span>Limpar filtro</span>
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Setas de navegação circulares do Carrossel */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => scrollCarousel('left')}
                      aria-label="Eventos anteriores"
                      className="w-7 h-7 rounded-full bg-white border border-slate-200/80 hover:border-slate-300 text-slate-500 hover:text-[#0055FE] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCarousel('right')}
                      aria-label="Próximos eventos"
                      className="w-7 h-7 rounded-full bg-white border border-slate-200/80 hover:border-slate-300 text-slate-500 hover:text-[#0055FE] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Botão Ver todos os eventos em pílula com borda idêntico a Mundo em Movimento */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFilter('todas');
                      setSelectedRegion(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 hover:border-[#0055FE]/40 hover:bg-blue-50/40 text-xs sm:text-[13px] font-medium text-[#0055FE] hover:text-[#0040CC] transition-all shadow-2xs cursor-pointer group ml-1"
                  >
                    <span>Ver todos os eventos</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                  </button>
                </div>
              </div>

              {/* Grid / Carousel Horizontal de 4 Cards Visíveis */}
              {filteredEvents.length === 0 ? (
                <div className="w-full py-12 px-4 bg-white rounded-[16px] border border-slate-200/80 text-center flex flex-col items-center justify-center shadow-xs">
                  <Calendar className="w-8 h-8 text-slate-300 mb-2 stroke-[1.8]" />
                  <p className="text-sm font-semibold text-slate-700">Nenhum evento encontrado para este filtro.</p>
                  <p className="text-xs text-slate-400 mt-0.5">Experimente selecionar "Todas" as categorias ou escolher outra região.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFilter('todas');
                      setSelectedRegion(null);
                    }}
                    className="mt-3.5 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#0055FE] text-xs font-bold hover:bg-[#DBEAFE] transition-colors cursor-pointer"
                  >
                    Mostrar todos os eventos
                  </button>
                </div>
              ) : (
                <div
                  ref={carouselRef}
                  id="recommended-events-carousel"
                  className="flex items-stretch gap-4.5 overflow-x-auto pb-3 pt-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
                >
                  {filteredEvents.map((event) => {
                    const isBookmarked = bookmarkedIds.includes(event.id);

                    return (
                      <article
                        key={event.id}
                        onClick={() => setSelectedEventModal(event)}
                        className="w-[285px] sm:w-[calc(50%-10px)] lg:w-[calc(25%-14px)] min-w-[250px] shrink-0 bg-white rounded-[16px] border border-slate-200/80 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
                      >
                        {/* Top: Imagem com badges */}
                        <div className="relative h-[165px] w-full overflow-hidden bg-slate-100">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-t-[15px] group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />

                          {/* Badge de Categoria (Canto superior esquerdo) */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase shadow-xs ${event.categoryBadgeClass}`}>
                              {event.category}
                            </span>
                          </div>

                          {/* Badge de Modalidade (Canto superior direito) */}
                          <div className="absolute top-3 right-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase shadow-xs backdrop-blur-md ${event.modalityClass}`}>
                              {event.modality}
                            </span>
                          </div>
                        </div>

                        {/* Corpo do Card */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Data do Evento */}
                            <span className="text-[11.5px] font-semibold text-slate-500 block mb-1">
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
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
                              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="text-[11px] font-medium text-slate-500">
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
              )}
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
                  onClick={() => {
                    setSelectedRegion(null);
                    setShareToast('Mostrando todas as regiões');
                    setTimeout(() => setShareToast(null), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200/90 hover:border-[#0055FE]/40 hover:bg-blue-50/40 text-xs sm:text-[13px] font-medium text-[#0055FE] hover:text-[#0040CC] transition-all shadow-2xs cursor-pointer group ml-1"
                >
                  <span>Ver todas as regiões</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Grid de 6 Colunas de Regiões */}
              <div
                id="events-regions-grid"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {REGIONS.map((region) => {
                  const isSelected = selectedRegion === region.id;
                  return (
                    <div
                      key={region.id}
                      onClick={() => handleToggleRegion(region.id, region.name)}
                      className={`relative h-[125px] sm:h-[135px] rounded-[16px] overflow-hidden group cursor-pointer border shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 select-none ${
                        isSelected
                          ? 'ring-2 ring-[#0055FE] border-transparent shadow-md -translate-y-0.5'
                          : 'border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Imagem de Fundo */}
                      <img
                        src={region.imageUrl}
                        alt={region.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />

                      {/* Overlay Escuro Gradiente na parte inferior */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

                      {/* Ícone no Canto Superior Esquerdo */}
                      <div className={`absolute top-2.5 left-2.5 z-10 w-6 h-6 rounded-full backdrop-blur-xs flex items-center justify-center text-white/90 border transition-colors ${
                        isSelected ? 'bg-[#0055FE] border-white/40' : 'bg-black/40 border-white/10'
                      }`}>
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
                  );
                })}
              </div>
            </div>
          </section>

          {/* Coluna Lateral Direita: Cards "Eventos em destaque" e "Próximos a começar" no padrão Mundo em Movimento */}
          <aside
            className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-6 self-start flex flex-col gap-5"
            aria-label="Barra Lateral de Eventos"
          >
            {/* Card 1: Eventos em destaque */}
            <div
              id="featured-events-card"
              className="bg-white rounded-[18px] border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
            >
              {/* Cabeçalho do Card: "Eventos em destaque" + "Ver todos" em pílula com borda */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Eventos em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/90 hover:border-[#0055FE]/40 hover:bg-blue-50/40 text-xs font-medium text-[#0055FE] hover:text-[#0040CC] transition-all shadow-2xs cursor-pointer group"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                </button>
              </div>

              {/* Lista dos 4 Itens em Destaque */}
              <div className="flex flex-col divide-y divide-slate-100/80 pt-2">
                {FEATURED_EVENTS.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-start gap-3 py-3 first:pt-1 last:pb-1 group cursor-pointer hover:bg-slate-50/60 -mx-2 px-2 rounded-xl transition-colors"
                  >
                    {/* Thumbnail quadrada arredondada (~64x64px) com borda suave */}
                    <div className={`w-16 h-16 rounded-[12px] overflow-hidden shrink-0 ${item.bgTone || 'bg-slate-900'} shadow-2xs flex items-center justify-center relative border border-slate-100`}>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-[11px] group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* Informações do Evento à Direita */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[64px] py-0.5">
                      <div>
                        {/* Pill de Categoria */}
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase ${item.categoryBadgeClass}`}>
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

              {/* Botão Inferior do Card: "Ver todos os destaques →" */}
              <div className="pt-4 mt-1 border-t border-slate-100">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-[12px] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0055FE] text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group shadow-2xs"
                >
                  <Ticket className="w-4 h-4 text-[#0055FE] stroke-[2]" />
                  <span>Ver todos os destaques</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                </button>
              </div>
            </div>

            {/* Card 2: Próximos a começar (Idêntico à referência visual da imagem) */}
            <div
              id="upcoming-events-card"
              className="bg-white rounded-[18px] border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between"
            >
              {/* Cabeçalho do Card: "Próximos a começar" + "Ver todos" em pílula */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Próximos a começar
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/90 hover:border-[#0055FE]/40 hover:bg-blue-50/40 text-xs font-medium text-[#0055FE] hover:text-[#0040CC] transition-all shadow-2xs cursor-pointer group"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                </button>
              </div>

              {/* Lista dos 3 Itens Próximos */}
              <div className="flex flex-col divide-y divide-slate-100/80 pt-2">
                {UPCOMING_EVENTS.map((item) => (
                  <article
                    key={item.id}
                    className="flex items-start gap-3 py-3 first:pt-1 last:pb-1 group cursor-pointer hover:bg-slate-50/60 -mx-2 px-2 rounded-xl transition-colors"
                  >
                    {/* Thumbnail quadrada arredondada (~56x56px) */}
                    <div className="w-14 h-14 rounded-[12px] overflow-hidden shrink-0 bg-slate-100 shadow-2xs relative border border-slate-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-[11px] group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* Informações do Evento Próximo */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[56px] py-0.5">
                      <div>
                        {/* Tag de Tempo: EM 2 HORAS, EM 5 HORAS, AMANHÃ */}
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider uppercase border ${
                          item.timeTag.includes('2 HORAS')
                            ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
                            : item.timeTag.includes('5 HORAS')
                            ? 'text-blue-700 bg-blue-50 border-blue-200/60'
                            : 'text-slate-600 bg-slate-100 border-slate-200/60'
                        }`}>
                          {item.timeTag}
                        </span>

                        {/* Título do Evento */}
                        <h4
                          className="text-xs sm:text-[12.5px] font-bold text-[#0F172A] leading-snug line-clamp-2 mt-1 group-hover:text-[#0055FE] transition-colors font-['Outfit']"
                          title={item.title}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {/* Localização / Modalidade */}
                      <div className="flex items-center gap-1 text-[11px] text-[#64748B] font-medium truncate mt-1">
                        {item.location.toLowerCase().includes('online') ? (
                          <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                        ) : (
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        )}
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Botão Inferior do Card: "Ver agenda completa →" */}
              <div className="pt-4 mt-1 border-t border-slate-100">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-[12px] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0055FE] text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group shadow-2xs"
                >
                  <CalendarIcon className="w-4 h-4 text-[#0055FE] stroke-[2]" />
                  <span>Ver agenda completa</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal de Detalhes do Evento */}
      {selectedEventModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="bg-white rounded-[20px] max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Topo: Imagem com botão de fechar */}
            <div className="relative h-48 sm:h-56 w-full bg-slate-900 shrink-0">
              <img
                src={selectedEventModal.imageUrl}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
                aria-label="Fechar"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>

              {/* Badges no Canto Inferior Esquerdo da Foto */}
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${selectedEventModal.categoryBadgeClass}`}>
                  {selectedEventModal.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold tracking-wider uppercase ${selectedEventModal.modalityClass}`}>
                  {selectedEventModal.modality}
                </span>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              {/* Título e Data */}
              <div>
                <span className="text-xs font-semibold text-[#0055FE] uppercase tracking-wide">
                  {selectedEventModal.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-['Outfit'] mt-1 leading-snug">
                  {selectedEventModal.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedEventModal.location}</span>
                  <span className="text-slate-300">•</span>
                  <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedEventModal.interested}</span>
                </div>
              </div>

              {/* Descrição Completa */}
              <div className="border-t border-slate-100 pt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-['Outfit']">
                  Sobre o Evento
                </h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {selectedEventModal.fullDescription || selectedEventModal.description}
                </p>
              </div>

              {/* Barra de Ações Rápidas */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleRegister(selectedEventModal.id)}
                  className={`flex-1 py-2.5 px-4 rounded-[12px] text-xs sm:text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    registeredEvents.includes(selectedEventModal.id)
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-[#0055FE] text-white hover:bg-[#0042CC]'
                  }`}
                >
                  {registeredEvents.includes(selectedEventModal.id) ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Inscrição Confirmada</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 stroke-[2]" />
                      <span>Inscrever-se no Evento</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleShare(selectedEventModal.title)}
                  title="Partilhar"
                  className="p-2.5 rounded-[12px] border border-slate-200/80 hover:bg-slate-50 text-slate-600 hover:text-[#0055FE] transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 stroke-[2]" />
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedEventModal.id, e)}
                  title={bookmarkedIds.includes(selectedEventModal.id) ? 'Guardado' : 'Guardar'}
                  className="p-2.5 rounded-[12px] border border-slate-200/80 hover:bg-slate-50 text-slate-600 hover:text-[#0055FE] transition-colors cursor-pointer"
                >
                  <Bookmark
                    className={`w-4 h-4 stroke-[2] ${
                      bookmarkedIds.includes(selectedEventModal.id)
                        ? 'fill-[#0055FE] text-[#0055FE]'
                        : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast de Feedback */}
      {shareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
          <span>{shareToast}</span>
        </div>
      )}

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
