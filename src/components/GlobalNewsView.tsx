import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Landmark,
  TrendingUp,
  Leaf,
  Cpu,
  HeartPulse,
  Scale,
  Shield,
  Plus,
  ChevronDown,
  Check,
  ArrowRight,
  Bookmark,
  Share2,
  Users,
  Flame,
  Radio,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Building2,
  Stethoscope,
  Vote,
  LifeBuoy,
  MapPin,
  Eye,
  Activity,
  BarChart2,
} from 'lucide-react';

export interface GlobalNewsViewProps {
  onOpenAiAssistant?: () => void;
  onExploreMap?: () => void;
}

interface FilterPillItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  hasDropdown?: boolean;
  subcategories?: string[];
}

const CATEGORY_PILLS: FilterPillItem[] = [
  { id: 'todas', label: 'Todas', icon: Globe },
  { id: 'politica-global', label: 'Política Global', icon: Landmark },
  { id: 'economia', label: 'Economia', icon: TrendingUp },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
  { id: 'saude-global', label: 'Saúde Global', icon: HeartPulse },
  {
    id: 'direitos-humanos',
    label: 'Direitos Humanos',
    icon: Scale,
    hasDropdown: true,
    subcategories: [
      'Todos em Direitos Humanos',
      'Liberdade de Expressão',
      'Refugiados & Migrações',
      'Igualdade & Diversidade',
      'Justiça Social',
    ],
  },
  { id: 'seguranca', label: 'Segurança', icon: Shield },
  {
    id: 'mais',
    label: '+ Mais',
    icon: Plus,
    hasDropdown: true,
    subcategories: [
      'Cultura Global',
      'Educação & Futuro',
      'Inovação Social',
      'Ciência & Espaço',
    ],
  },
];

// 6 Cards da seção "Principais notícias" (exatamente como na imagem)
interface MainNewsCard {
  id: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  image: string;
  time: string;
  title: string;
  countries: string;
}

const MAIN_NEWS_LIST: MainNewsCard[] = [
  {
    id: 'main-1',
    category: 'ECONOMIA',
    categoryColor: 'text-blue-600',
    categoryBg: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
    time: 'Há 2 horas',
    title: 'Comércio global cresce 3,2% no primeiro trimestre de 2024',
    countries: '195 países',
  },
  {
    id: 'main-2',
    category: 'TECNOLOGIA',
    categoryColor: 'text-purple-600',
    categoryBg: 'bg-purple-50',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    time: 'Há 4 horas',
    title: 'IA generativa revoluciona educação em países em desenvolvimento',
    countries: '87 países',
  },
  {
    id: 'main-3',
    category: 'AMBIENTE',
    categoryColor: 'text-emerald-600',
    categoryBg: 'bg-emerald-50',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=80',
    time: 'Há 5 horas',
    title: 'Investimentos em energias renováveis atingem recorde de $2,1 trilhões',
    countries: '160 países',
  },
  {
    id: 'main-4',
    category: 'POLÍTICA GLOBAL',
    categoryColor: 'text-rose-600',
    categoryBg: 'bg-rose-50',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=600&auto=format&fit=crop&q=80',
    time: 'Há 6 horas',
    title: 'Conselho de Segurança da ONU aprova cessar-fogo global',
    countries: '75 países',
  },
  {
    id: 'main-5',
    category: 'SAÚDE GLOBAL',
    categoryColor: 'text-blue-600',
    categoryBg: 'bg-blue-50',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
    time: 'Há 8 horas',
    title: 'OMS declara fim da emergência internacional por nova cepa',
    countries: '150 países',
  },
  {
    id: 'main-6',
    category: 'SEGURANÇA',
    categoryColor: 'text-amber-600',
    categoryBg: 'bg-amber-50',
    image: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&auto=format&fit=crop&q=80',
    time: 'Há 9 horas',
    title: 'Esforços diplomáticos intensificam-se em regiões de conflito',
    countries: '60 países',
  },
];

// Itens da coluna lateral "Em destaque agora"
interface HighlightItem {
  id: string;
  category: string;
  categoryColor: string;
  image: string;
  title: string;
  time: string;
}

const HIGHLIGHT_ITEMS: HighlightItem[] = [
  {
    id: 'h-1',
    category: 'AMBIENTE',
    categoryColor: 'text-emerald-700 font-bold',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&auto=format&fit=crop&q=80',
    title: 'O planeta ultrapassa limite crítico de aquecimento em 2024',
    time: 'Há 1 hora',
  },
  {
    id: 'h-2',
    category: 'ECONOMIA',
    categoryColor: 'text-blue-700 font-bold',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&auto=format&fit=crop&q=80',
    title: 'Bancos centrais do mundo mantêm taxas de juros',
    time: 'Há 3 horas',
  },
  {
    id: 'h-3',
    category: 'SAÚDE GLOBAL',
    categoryColor: 'text-purple-700 font-bold',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    title: 'Nova vacina mostra 95% de eficácia contra vírus emergente',
    time: 'Há 5 horas',
  },
  {
    id: 'h-4',
    category: 'DIREITOS HUMANOS',
    categoryColor: 'text-amber-700 font-bold',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=300&auto=format&fit=crop&q=80',
    title: 'ONU aprova resolução histórica sobre migrações climáticas',
    time: 'Há 6 horas',
  },
];

// Lista de "Tendências globais"
interface GlobalTrendItem {
  rank: number;
  label: string;
  direction: 'up' | 'down';
}

const GLOBAL_TRENDS: GlobalTrendItem[] = [
  { rank: 1, label: 'IA Responsável', direction: 'up' },
  { rank: 2, label: 'Ação Climática', direction: 'up' },
  { rank: 3, label: 'Economia Global', direction: 'up' },
  { rank: 4, label: 'Saúde Mental', direction: 'down' },
  { rank: 5, label: 'Conflitos Regionais', direction: 'down' },
];

export const GlobalNewsView: React.FC<GlobalNewsViewProps> = ({
  onOpenAiAssistant,
  onExploreMap,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todas');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [savedNewsIds, setSavedNewsIds] = useState<Set<string>>(new Set());
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleSaveNews = (id: string) => {
    setSavedNewsIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  // Fecha dropdowns se clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePillClick = (pill: FilterPillItem) => {
    if (pill.hasDropdown) {
      setOpenDropdownId((prev) => (prev === pill.id ? null : pill.id));
    } else {
      setActiveFilter(pill.id);
      setSelectedSubcategory(null);
      setOpenDropdownId(null);
    }
  };

  const handleSubcategorySelect = (pillId: string, subcategory: string) => {
    setActiveFilter(pillId);
    setSelectedSubcategory(subcategory);
    setOpenDropdownId(null);
  };

  return (
    <div id="mundo-em-movimento-view" className="w-full bg-[#F1F5F9] min-h-full pb-14">
      <div className="max-w-[1600px] mx-auto px-3.5 sm:px-5 lg:px-6 py-5 sm:py-6 flex flex-col gap-6">
        {/* 1. Cabeçalho Principal da Página */}
        <header className="flex flex-col gap-1.5">
          <h1 className="text-[32px] sm:text-4xl font-extrabold text-[#0F172A] leading-tight tracking-tight font-['Outfit']">
            Mundo em Movimento
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed font-normal">
            As notícias e acontecimentos que têm impacto global. <br className="hidden sm:inline" />
            Essencial para entender o presente e construir o futuro.
          </p>
        </header>

        {/* 2. Pills de Filtro de Categoria */}
        <nav
          ref={containerRef}
          id="category-filter-pills"
          className="relative z-20 flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
          aria-label="Filtro de Categorias"
        >
          {CATEGORY_PILLS.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeFilter === pill.id;
            const isDropdownOpen = openDropdownId === pill.id;

            return (
              <div key={pill.id} className="relative shrink-0">
                <button
                  type="button"
                  id={`filter-pill-${pill.id}`}
                  onClick={() => handlePillClick(pill)}
                  className={`inline-flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#2563EB] text-white border border-[#2563EB] shadow-xs hover:bg-[#1D4ED8]'
                      : 'bg-white border border-[#E2E8F0] text-[#334155] hover:bg-slate-50 hover:text-[#0F172A] hover:border-slate-300 shadow-2xs'
                  }`}
                  aria-expanded={pill.hasDropdown ? isDropdownOpen : undefined}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500'
                    }`}
                    strokeWidth={2.2}
                  />

                  <span>
                    {pill.id === activeFilter && selectedSubcategory && selectedSubcategory !== pill.subcategories?.[0]
                      ? `${pill.label}: ${selectedSubcategory}`
                      : pill.label}
                  </span>

                  {pill.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.2] ${
                        isDropdownOpen ? 'rotate-180' : ''
                      } ${isActive ? 'text-white/90' : 'text-slate-400'}`}
                    />
                  )}
                </button>

                {/* Submenu Dropdown */}
                {pill.hasDropdown && isDropdownOpen && pill.subcategories && (
                  <div
                    id={`dropdown-menu-${pill.id}`}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200/90 shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100">
                      <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                        {pill.label}
                      </span>
                    </div>

                    <div className="py-1">
                      {pill.subcategories.map((subcat) => {
                        const isSelected = activeFilter === pill.id && selectedSubcategory === subcat;
                        return (
                          <button
                            key={subcat}
                            type="button"
                            onClick={() => handleSubcategorySelect(pill.id, subcat)}
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold transition-colors text-left cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 text-[#2563EB]'
                                : 'text-[#334155] hover:bg-slate-50 hover:text-[#0F172A]'
                            }`}
                          >
                            <span className="truncate">{subcat}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 3. Grade Principal em 2 Colunas: Área de Conteúdo à Esquerda + Barra Lateral à Direita */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full">
          {/* COLUNA ESQUERDA (xl:col-span-9 / ~75%) */}
          <div className="xl:col-span-9 flex flex-col gap-8 w-full">
            {/* Bloco Superior: Hero à esquerda + Impacto em números à direita */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch w-full">
              {/* Card Hero (~65% da coluna esquerda / lg:col-span-8) */}
              <article
                id="hero-news-card"
                className="lg:col-span-8 relative overflow-hidden rounded-[18px] min-h-[410px] lg:h-[430px] flex flex-col justify-between p-6 sm:p-8 text-white shadow-md group border border-slate-900/10"
              >
                {/* Imagem da Terra vista do espaço com iluminação noturna das cidades */}
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80"
                  alt="Terra vista do espaço à noite com cidades iluminadas"
                  className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Gradiente escuro para legibilidade perfeita */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

                {/* Topo do Hero: Badge e Metadados */}
                <div className="relative z-10 flex flex-wrap items-center gap-3">
                  <span
                    id="hero-badge-impacto"
                    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#E11D48] text-white shadow-xs"
                  >
                    IMPACTO MUNDIAL
                  </span>
                  <div className="text-xs text-slate-200/90 tracking-wide font-medium flex items-center gap-2">
                    <strong className="font-bold text-white uppercase tracking-wider">POLÍTICA GLOBAL</strong>
                    <span className="opacity-70">Há 2 horas</span>
                  </div>
                </div>

                {/* Centro do Hero: Título, Resumo e Ações */}
                <div className="relative z-10 flex flex-col gap-3 my-auto pt-4 pb-6 max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[31px] font-extrabold text-white leading-tight font-['Outfit'] tracking-tight">
                    Líderes mundiais chegam a acordo histórico sobre IA segura e responsável
                  </h2>
                  <p className="text-sm sm:text-[14.5px] text-slate-200 leading-relaxed font-normal">
                    Mais de 120 países assinam o primeiro tratado global para regular o desenvolvimento e uso ético da inteligência artificial.
                  </p>

                  {/* Botões de Ação */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      id="btn-ler-noticia-completa"
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs sm:text-[13px] font-bold transition-all shadow-md hover:shadow-lg cursor-pointer group/btn"
                    >
                      <span>Ler notícia completa</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform stroke-[2.2]" />
                    </button>

                    {/* Bookmark circular */}
                    <button
                      type="button"
                      onClick={() => toggleSaveNews('hero')}
                      aria-label="Salvar notícia"
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border ${
                        savedNewsIds.has('hero')
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-black/35 hover:bg-black/55 text-white/90 hover:text-white border-white/20'
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${savedNewsIds.has('hero') ? 'fill-current' : ''}`}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Compartilhar circular */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={handleShare}
                        aria-label="Compartilhar notícia"
                        className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/55 text-white/90 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                      {shareFeedback && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[11px] font-semibold bg-slate-900 text-white rounded-md whitespace-nowrap shadow-md z-30">
                          Link copiado!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dots de paginação no rodapé do Hero */}
                <div
                  id="hero-carousel-dots"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5"
                  aria-label="Controles do Carrossel"
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => {
                    const isCurrent = activeSlide === index;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Ir para notícia ${index + 1}`}
                        className={`transition-all duration-200 cursor-pointer ${
                          isCurrent
                            ? 'w-5 h-2 rounded-full bg-white shadow-sm'
                            : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    );
                  })}
                </div>
              </article>

              {/* Card "Impacto em números" (~35% da coluna esquerda / lg:col-span-4) */}
              <aside
                id="impacto-em-numeros-card"
                className="lg:col-span-4 bg-white rounded-[18px] border border-slate-200/80 shadow-xs min-h-[410px] lg:h-[430px] p-5 sm:p-6 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                    Impacto em números
                  </h3>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                  >
                    <span>Ver relatório completo</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                  </button>
                </div>

                {/* Grid 2x2 com os 4 Mini-Cards Estatísticos */}
                <div className="grid grid-cols-2 gap-3.5 my-auto py-2">
                  {/* Mini-Card 1: 195 Países afetados */}
                  <div className="bg-slate-50/90 rounded-2xl p-3.5 sm:p-4 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center mb-2">
                      <Users className="w-4.5 h-4.5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight leading-none mb-1">
                        195
                      </div>
                      <div className="text-xs font-medium text-[#64748B] mb-1.5 leading-tight">
                        Países afetados
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <span>+12 desde ontem</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini-Card 2: 28 Acontecimentos relevantes */}
                  <div className="bg-slate-50/90 rounded-2xl p-3.5 sm:p-4 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center mb-2">
                      <Globe className="w-4.5 h-4.5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight leading-none mb-1">
                        28
                      </div>
                      <div className="text-xs font-medium text-[#64748B] mb-1.5 leading-tight">
                        Acontecimentos relevantes
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <span>+5 desde ontem</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini-Card 3: 7,4B Pessoas impactadas */}
                  <div className="bg-slate-50/90 rounded-2xl p-3.5 sm:p-4 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-purple-100/80 text-purple-600 flex items-center justify-center mb-2">
                      <TrendingUp className="w-4.5 h-4.5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight leading-none mb-1">
                        7,4B
                      </div>
                      <div className="text-xs font-medium text-[#64748B] mb-1.5 leading-tight">
                        Pessoas impactadas
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <span>+1,2B desde ontem</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini-Card 4: 12 Crises ativas */}
                  <div className="bg-slate-50/90 rounded-2xl p-3.5 sm:p-4 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-orange-100/80 text-orange-600 flex items-center justify-center mb-2">
                      <Flame className="w-4.5 h-4.5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight leading-none mb-1">
                        12
                      </div>
                      <div className="text-xs font-medium text-[#64748B] mb-1.5 leading-tight">
                        Crises ativas
                      </div>
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                        <span>-1 desde ontem</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* Seção "Principais notícias" com 6 cards em grade horizontal */}
            <section id="principais-noticias-section" className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-[22px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Principais notícias
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Grid dos 6 Cards (3 por linha em telas médias / 6 por linha em telas ultra-largas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {MAIN_NEWS_LIST.map((item) => {
                  const isSaved = savedNewsIds.has(item.id);
                  return (
                    <article
                      key={item.id}
                      className="bg-white rounded-[16px] border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                    >
                      {/* Topo: Imagem com Badge da Categoria */}
                      <div>
                        <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <span
                            className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9.5px] font-extrabold uppercase tracking-wider ${item.categoryBg} ${item.categoryColor} shadow-2xs`}
                          >
                            {item.category}
                          </span>
                        </div>

                        {/* Conteúdo Central: Timestamp e Título */}
                        <div className="p-3 flex flex-col gap-1.5">
                          <span className="text-[11px] font-semibold text-slate-400">
                            {item.time}
                          </span>
                          <h4 className="text-xs sm:text-[12.5px] font-bold text-[#0F172A] leading-snug font-['Outfit'] line-clamp-3 group-hover:text-[#0066FF] transition-colors">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {/* Rodapé: Países e Ações (Bookmark / Share) */}
                      <div className="px-3 pb-3 pt-1 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="inline-flex items-center gap-1 font-medium truncate text-slate-600">
                          <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{item.countries}</span>
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleSaveNews(item.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-[#0066FF] transition-colors cursor-pointer"
                            aria-label="Salvar"
                          >
                            <Bookmark
                              className={`w-3.5 h-3.5 ${isSaved ? 'text-[#0066FF] fill-current' : ''}`}
                            />
                          </button>
                          <button
                            type="button"
                            onClick={handleShare}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            aria-label="Compartilhar"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA (xl:col-span-3 / ~25%) */}
          <div className="xl:col-span-3 flex flex-col gap-6 w-full">
            {/* Card 1: Em destaque agora */}
            <div
              id="em-destaque-agora-card"
              className="bg-white rounded-[18px] border border-slate-200/80 p-5 shadow-xs flex flex-col gap-4"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Em destaque agora
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista com as 4 notícias em destaque */}
              <div className="flex flex-col divide-y divide-slate-100">
                {HIGHLIGHT_ITEMS.map((item) => {
                  const isSaved = savedNewsIds.has(item.id);
                  return (
                    <article key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3 group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between h-16 py-0.5">
                        <span className={`text-[9.5px] font-extrabold uppercase tracking-wider ${item.categoryColor}`}>
                          {item.category}
                        </span>
                        <h4 className="text-[12px] font-bold text-[#0F172A] leading-snug line-clamp-2 group-hover:text-[#0066FF] transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{item.time}</span>
                          <button
                            type="button"
                            onClick={() => toggleSaveNews(item.id)}
                            className="text-slate-400 hover:text-[#0066FF] transition-colors cursor-pointer"
                            aria-label="Salvar"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-[#0066FF] fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Card 2: Tendências globais */}
            <div
              id="tendencias-globais-card"
              className="bg-white rounded-[18px] border border-slate-200/80 p-5 shadow-xs flex flex-col gap-4"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Tendências globais
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista dos 5 tópicos em tendência */}
              <div className="flex flex-col gap-2.5">
                {GLOBAL_TRENDS.map((trend) => (
                  <div
                    key={trend.rank}
                    className="flex items-center justify-between py-1 px-1 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center text-xs font-bold font-['Outfit'] shrink-0">
                        {trend.rank}
                      </div>
                      <span className="text-xs sm:text-[13px] font-bold text-[#0F172A] tracking-tight">
                        {trend.label}
                      </span>
                    </div>

                    <div className="shrink-0">
                      {trend.direction === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Linha Inferior de Largura Total: "Acompanhe o mundo ao vivo" */}
        <section
          id="acompanhe-o-mundo-ao-vivo-section"
          className="bg-white rounded-[20px] border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col gap-4 mt-2"
        >
          {/* Cabeçalho da Secção */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base sm:text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
              Acompanhe o mundo ao vivo
            </h3>
            <p className="text-xs sm:text-[13px] text-[#64748B]">
              Monitore acontecimentos em tempo real que estão moldando o nosso futuro.
            </p>
          </div>

          {/* Grade de Eventos ao Vivo + Card de Acesso ao Mapa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 items-stretch">
            {/* Evento 1: Cúpula do Clima 2024 */}
            <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white">
                  AO VIVO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-700 shadow-2xs">
                  <Landmark className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-tight truncate">
                    Cúpula do Clima 2024
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate flex items-center gap-1">
                    <span>📍 Dubai, Emirados Árabes</span>
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    • 2.4K assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Evento 2: Mercados Globais */}
            <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white">
                  AO VIVO
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-700 shadow-2xs">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-tight truncate">
                    Mercados Globais
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Atualizações contínuas
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    • 1.8K assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Evento 3: Eleições na Índia */}
            <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-800 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  EM DESENVOLVIMENTO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-700 shadow-2xs">
                  <Vote className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-tight truncate">
                    Eleições na Índia
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Resultados parciais
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    • 856 assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Evento 4: Crise Humanitária */}
            <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex flex-col justify-between hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-600 text-white">
                  AO VIVO
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-700 shadow-2xs">
                  <LifeBuoy className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-tight truncate">
                    Crise Humanitária
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    Ajuda internacional
                  </p>
                  <p className="text-[10.5px] text-slate-400 mt-0.5">
                    • 3.1K assistindo
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5: Link para o Mapa de Crises e Acontecimentos */}
            <div
              onClick={onExploreMap}
              className="bg-blue-50/50 hover:bg-blue-50/80 rounded-2xl p-3.5 border border-blue-100 flex items-center justify-center gap-3 transition-colors cursor-pointer group text-center"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-[13px] font-bold text-[#0066FF] group-hover:underline text-left leading-snug">
                Ver mapa de crises <br /> e acontecimentos
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Botão Flutuante VILA AI (canto inferior direito) */}
      <button
        type="button"
        onClick={onOpenAiAssistant}
        id="floating-vila-ai-btn"
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-tr from-[#0055FE] to-[#4338CA] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border-2 border-white/20 group"
        aria-label="Assistente VILA AI"
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-[9px] font-extrabold tracking-wider">VILA AI</span>
      </button>
    </div>
  );
};
