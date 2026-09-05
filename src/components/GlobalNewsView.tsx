import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Globe, 
  Landmark, 
  TrendingUp, 
  Cpu, 
  Leaf, 
  Users, 
  HeartPulse, 
  Palette, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MapPin,
  Sparkles
} from 'lucide-react';
import { GlobalWorldMapHero } from './GlobalWorldMapHero';
import { GlobalCalendarWidget } from './GlobalCalendarWidget';

interface GlobalNewsViewProps {
  onOpenAiAssistant?: () => void;
}

const CATEGORIES = [
  { name: 'Política', color: 'bg-[#3B82F6]' },
  { name: 'Economia', color: 'bg-[#F59E0B]' },
  { name: 'Tecnologia', color: 'bg-[#8B5CF6]' },
  { name: 'Ambiente', color: 'bg-[#10B981]' },
  { name: 'Sociedade', color: 'bg-[#EC4899]' },
];

const FILTER_PILLS = [
  { id: 'todas', label: 'Todas', icon: Globe },
  { id: 'politica', label: 'Política', icon: Landmark },
  { id: 'economia', label: 'Economia', icon: TrendingUp },
  { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
  { id: 'ambiente', label: 'Ambiente', icon: Leaf },
  { id: 'sociedade', label: 'Sociedade', icon: Users },
  { id: 'saude', label: 'Saúde', icon: HeartPulse },
  { id: 'cultura', label: 'Cultura', icon: Palette },
];

const RECOMMENDED_NEWS = [
  {
    id: 1,
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-purple-100 text-purple-700',
    urgencyBadge: { text: 'ÚLTIMA HORA', badgeClass: 'bg-red-500 text-white' },
    title: 'Nova arquitetura quântica atinge supremacia em simulações biológicas complexas',
    summary: 'Investigadores internacionais confirmam marco que pode reduzir anos de pesquisa no desenvolvimento de novos medicamentos essenciais.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    source: 'Tech Review',
    time: 'Há 45 min',
  },
  {
    id: 2,
    category: 'AMBIENTE',
    categoryBadgeClass: 'bg-emerald-100 text-emerald-700',
    urgencyBadge: { text: 'EXCLUSIVO', badgeClass: 'bg-amber-500 text-white' },
    title: 'Tratado dos Oceanos entra em vigor com adesão recorde de 82 nações',
    summary: 'Acordo histórico estabelece as primeiras zonas marinhas de proteção integral e monitorização contínua em águas internacionais até 2030.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    source: 'Reuters',
    time: 'Há 2h',
  },
  {
    id: 3,
    category: 'ECONOMIA',
    categoryBadgeClass: 'bg-amber-100 text-amber-700',
    title: 'Bancos centrais aceleram implementação de corredores transfronteiriços digitais',
    summary: 'Novo consórcio prevê liquidações instantâneas com redução substancial de custos e taxas operacionais para remessas e transações globais.',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
    source: 'Financial Times',
    time: 'Há 3h',
  },
  {
    id: 4,
    category: 'POLÍTICA',
    categoryBadgeClass: 'bg-blue-100 text-blue-700',
    title: 'Cimeira de Genebra firma pacto preliminar sobre governança ética de inteligência artificial',
    summary: 'Delegações de cinco continentes acordam salvaguardas conjuntas para transparência algorítmica, mitigação de riscos e soberania de dados.',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    source: 'BBC News',
    time: 'Há 5h',
  },
];

const REGIONS = [
  {
    id: 'america-do-norte',
    name: 'América do Norte',
    newsCount: '342 notícias',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'america-do-sul',
    name: 'América do Sul',
    newsCount: '218 notícias',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'europa',
    name: 'Europa',
    newsCount: '489 notícias',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'africa',
    name: 'África',
    newsCount: '194 notícias',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'asia',
    name: 'Ásia',
    newsCount: '425 notícias',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'oceania',
    name: 'Oceania',
    newsCount: '112 notícias',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&auto=format&fit=crop&q=80',
  },
];

const LATEST_UPDATES = [
  {
    id: 1,
    time: 'Há 12 min',
    title: 'Cimeira do Clima aprova novo fundo de transição ecológica',
    dotColor: 'bg-[#10B981]',
  },
  {
    id: 2,
    time: 'Há 45 min',
    title: 'Avanço quântico promete acelerar descoberta de materiais',
    dotColor: 'bg-[#8B5CF6]',
  },
  {
    id: 3,
    time: 'Há 1h',
    title: 'Conselho Europeu debate novas diretrizes para cooperação global',
    dotColor: 'bg-[#3B82F6]',
  },
  {
    id: 4,
    time: 'Há 3h',
    title: 'Relatório aponta estabilização nos mercados de capitais',
    dotColor: 'bg-[#F59E0B]',
  },
  {
    id: 5,
    time: 'Há 5h',
    title: 'Iniciativas de educação digital ganham escala em 40 países',
    dotColor: 'bg-[#EC4899]',
  },
];

const HIGHLIGHTED_NEWS = [
  {
    id: 1,
    category: 'POLÍTICA',
    categoryBadgeClass: 'bg-blue-100 text-blue-700',
    title: 'Cimeira de Segurança Global reforça cooperação e tratados no Atlântico',
    info: 'Genebra • Há 1h',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=240&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    category: 'TECNOLOGIA',
    categoryBadgeClass: 'bg-purple-100 text-purple-700',
    title: 'Algoritmo de rede neural atinge precisão pioneira em diagnóstico precoce',
    info: 'Tóquio • Há 3h',
    imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=240&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    category: 'ECONOMIA',
    categoryBadgeClass: 'bg-amber-100 text-amber-700',
    title: 'Pacto bilateral viabiliza incentivos para transição energética e renováveis',
    info: 'Lisboa • Há 4h',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=240&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    category: 'AMBIENTE',
    categoryBadgeClass: 'bg-emerald-100 text-emerald-700',
    title: 'Monitorização orbital revela regeneração contínua de bacias fluviais',
    info: 'Nairobi • Há 6h',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=240&auto=format&fit=crop&q=80',
  },
];

const MOST_READ_NEWS = [
  {
    rank: 1,
    title: 'Lançamento da primeira rede internacional de energia solar orbital',
    readers: '54.8K leitores',
  },
  {
    rank: 2,
    title: 'Grandes capitais aprovam plano de descarbonização integral do transporte',
    readers: '42.1K leitores',
  },
  {
    rank: 3,
    title: 'Revolução na agricultura vertical reduz em 90% o consumo de água doce',
    readers: '31.6K leitores',
  },
];

export const GlobalNewsView: React.FC<GlobalNewsViewProps> = ({ onOpenAiAssistant }) => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
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
        {/* Layout Geral em Duas Colunas: Principal (~66%) e Lateral Direita (~33%) com gap de ~24px */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Coluna Principal (~75% da largura em telas grandes para dar maior destaque ao mapa mundi) */}
          <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6" aria-label="Conteúdo Principal de Notícias">
            {/* Cabeçalho da Página: Título e Subtítulo */}
            <div>
              <h1 className="text-[32px] font-extrabold text-[#0F172A] leading-tight tracking-tight font-['Outfit']">
                Notícias Globais
              </h1>
              <p className="text-base text-[#64748B] max-w-[500px] mt-1.5 leading-relaxed font-normal">
                Fique por dentro das notícias que moldam o mundo. Informação verificada, de qualquer lugar do planeta.
              </p>
            </div>

            {/* SEÇÃO HERO EM DUAS COLUNAS: MAPA EXPANDIDO (~70%-72%) E CALENDÁRIO COMPACTO (~28%-30%) */}
            <div className="flex flex-col lg:flex-row gap-5 items-stretch">
              {/* 1. Bloco Hero Ampliado com Mapa Mundi e Hotspots Luminosos */}
              <GlobalWorldMapHero
                className="lg:w-[70%] xl:w-[72%]"
                title="O mundo está acontecendo agora."
                subtitle="Explore eventos e notícias em todo o planeta em tempo real."
              />

              {/* 2. Widget Lateral Direito: Calendário Global Compacto */}
              <GlobalCalendarWidget
                className="lg:w-[30%] xl:w-[28%]"
              />
            </div>

            {/* LINHA HORIZONTAL DE PILLS DE FILTRO DE CATEGORIA */}
            <div 
              id="news-category-filters"
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
                        ? 'bg-[#0F172A] text-white shadow-sm border border-[#0F172A]'
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
                <span>Mais</span>
                <MoreHorizontal className="w-4 h-4 text-slate-500 stroke-[2.2]" />
              </button>
            </div>

            {/* SEÇÃO: NOTÍCIAS RECOMENDADAS PARA SI */}
            <div className="flex flex-col gap-4 pt-1">
              {/* Cabeçalho da Seção */}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Notícias recomendadas para si
                </h3>

                <div className="flex items-center gap-3">
                  {/* Setas de navegação do Carousel */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => scrollCarousel('left')}
                      aria-label="Notícias anteriores"
                      className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] text-slate-600 hover:text-[#0055FE] hover:border-[#0055FE] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollCarousel('right')}
                      aria-label="Próximas notícias"
                      className="w-7 h-7 rounded-full bg-white border border-[#E2E8F0] text-slate-600 hover:text-[#0055FE] hover:border-[#0055FE] hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.2]" />
                    </button>
                  </div>

                  {/* Link Ver todas as notícias */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group/all"
                  >
                    <span>Ver todas as notícias</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/all:translate-x-0.5 transition-transform stroke-[2.2]" />
                  </button>
                </div>
              </div>

              {/* Grid / Carousel Horizontal de 4 Cards Visíveis */}
              <div
                ref={carouselRef}
                id="recommended-news-carousel"
                className="flex items-stretch gap-4.5 overflow-x-auto pb-3 pt-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
              >
                {RECOMMENDED_NEWS.map((news) => {
                  const isBookmarked = bookmarkedIds.includes(news.id);

                  return (
                    <article
                      key={news.id}
                      className="w-[285px] sm:w-[calc(50%-10px)] lg:w-[calc(25%-14px)] min-w-[250px] shrink-0 bg-white rounded-[12px] border border-slate-100/90 shadow-[0_3px_14px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.09)] transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
                    >
                      {/* Top: Imagem com badges */}
                      <div className="relative h-[180px] w-full overflow-hidden bg-slate-100">
                        <img
                          src={news.imageUrl}
                          alt={news.title}
                          className="w-full h-full object-cover rounded-t-[12px] group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />

                        {/* Badge de Categoria (Canto superior esquerdo) */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase shadow-xs ${news.categoryBadgeClass}`}>
                            {news.category}
                          </span>
                        </div>

                        {/* Badge de Urgência (Canto superior direito, se aplicável) */}
                        {news.urgencyBadge && (
                          <div className="absolute top-3 right-3">
                            <span className={`px-2 py-0.5 rounded-md text-[9.5px] font-extrabold tracking-wider uppercase shadow-xs ${news.urgencyBadge.badgeClass}`}>
                              {news.urgencyBadge.text}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Corpo do Card */}
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Título da Notícia em Bold (2 linhas max, truncar) */}
                          <h4 
                            className="text-sm sm:text-[14.5px] font-bold text-[#0F172A] leading-snug line-clamp-2 group-hover:text-[#0055FE] transition-colors font-['Outfit']"
                            title={news.title}
                          >
                            {news.title}
                          </h4>

                          {/* Texto de Resumo em Cinza (2 linhas max) */}
                          <p 
                            className="text-xs text-[#64748B] leading-relaxed mt-2 line-clamp-2"
                            title={news.summary}
                          >
                            {news.summary}
                          </p>
                        </div>

                        {/* Rodapé do Card */}
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="font-semibold text-slate-700">
                              {news.source}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[11px] text-slate-400">
                              {news.time}
                            </span>
                          </div>

                          {/* Botão Bookmark */}
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(news.id, e)}
                            title={isBookmarked ? "Remover dos guardados" : "Guardar notícia"}
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
                id="news-regions-grid"
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
                        {region.newsCount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* O conteúdo de cards de notícias será adicionado nas próximas etapas */}
          </section>

          {/* Coluna Lateral Direita (~33% da largura, sticky no scroll) */}
          {/* Coluna Lateral Direita (~25% da largura em telas grandes, mais fina e elegante) */}
          <aside 
            className="lg:col-span-4 xl:col-span-3 flex flex-col gap-2.5 lg:sticky lg:top-6 self-start lg:pt-[56px]" 
            aria-label="Sidebar de Destaques e Mais Lidas"
          >
            {/* Cabeçalho FORA do card: "Notícias em destaque" + "Ver todas →" */}
            <div className="flex items-center justify-between pb-0.5">
              <h3 className="text-[15px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                Notícias em destaque
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group"
              >
                <span>Ver todas</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
              </button>
            </div>

            {/* Card 1 — "Notícias em destaque" afinado e compacto */}
            <div 
              id="featured-news-card"
              className="bg-white rounded-[14px] border border-slate-100/90 shadow-[0_4px_16px_rgba(15,23,42,0.03)] p-3.5 sm:p-4 flex flex-col justify-between"
            >
              {/* Lista de 4 Itens com espaçamento refinado */}
              <div className="divide-y divide-slate-100/80">
                {HIGHLIGHTED_NEWS.map((item) => (
                  <article
                    key={item.id}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-2.5 group cursor-pointer"
                  >
                    {/* Thumbnail quadrada afinada (~56x56px) */}
                    <div className="w-14 h-14 rounded-[8px] overflow-hidden shrink-0 bg-slate-100 shadow-xs">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    {/* Conteúdo à direita */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[56px]">
                      <div>
                        {/* Badge de categoria pequena */}
                        <span className={`inline-block px-1.5 py-0.5 rounded-full text-[8.5px] font-extrabold tracking-wider uppercase ${item.categoryBadgeClass}`}>
                          {item.category}
                        </span>

                        {/* Título da notícia (2 linhas, bold, truncar) */}
                        <h4
                          className="text-xs sm:text-[12.5px] font-bold text-[#0F172A] leading-snug line-clamp-2 mt-0.5 group-hover:text-[#0055FE] transition-colors font-['Outfit']"
                          title={item.title}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {/* Data/local ou fonte abaixo em cinza claro */}
                      <p className="text-[10.5px] text-[#64748B] font-medium truncate mt-0.5">
                        {item.info}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Botão full-width no rodapé afinado */}
            <button
              type="button"
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-200/90 hover:border-[#0055FE] hover:bg-slate-50 text-[#0055FE] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group"
            >
              <span>Ver todos os destaques</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
            </button>

            {/* Cabeçalho FORA do card: "Mais lidas" + "Ver todas →" */}
            <div className="flex items-center justify-between pt-1 pb-0.5">
              <h3 className="text-[15px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                Mais lidas
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors cursor-pointer group"
              >
                <span>Ver todas</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2]" />
              </button>
            </div>

            {/* Card 2 — "Mais lidas" afinado */}
            <div 
              id="most-read-news-card"
              className="bg-white rounded-[14px] border border-slate-100/90 shadow-[0_4px_16px_rgba(15,23,42,0.03)] p-3.5 sm:p-4 flex flex-col justify-between"
            >
              {/* Lista de 3 Itens */}
              <div className="divide-y divide-slate-100/80">
                {MOST_READ_NEWS.map((item) => (
                  <article
                    key={item.rank}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3 group cursor-pointer"
                  >
                    {/* Número de ranking à esquerda */}
                    <span className="text-xl sm:text-2xl font-black text-slate-300 group-hover:text-[#0055FE] transition-colors w-6 shrink-0 font-['Outfit'] select-none leading-none pt-0.5">
                      {item.rank}
                    </span>

                    {/* Título da notícia + contagem de leitores */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs sm:text-[12.5px] font-bold text-[#0F172A] leading-snug line-clamp-2 group-hover:text-[#0055FE] transition-colors font-['Outfit']"
                        title={item.title}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[10.5px] text-[#64748B] font-medium mt-0.5">
                        {item.readers}
                      </p>
                    </div>
                  </article>
                ))}
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
          id="fab-vila-ai-news"
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
