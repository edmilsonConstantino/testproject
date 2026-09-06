import React, { useState } from 'react';
import {
  Users,
  Globe,
  Handshake,
  Star,
  ArrowRight,
  Plus,
  Leaf,
  Cpu,
  GraduationCap,
  Heart,
  ChevronRight,
  SlidersHorizontal,
  MoreHorizontal,
  Brain,
  Rocket,
  Building2,
  Wind,
  Flame,
  Clock,
  MessageSquare,
  Briefcase,
  Target,
  Sparkles,
  MapPin,
  Check,
  Share2,
  Bookmark,
} from 'lucide-react';

export interface GlobalCommunityViewProps {
  onOpenAiAssistant?: () => void;
  onExploreMap?: () => void;
  onOpenCreateCommunityModal?: () => void;
}

// 4 Métricas principais do topo
interface TopMetric {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  changeText: string;
}

const TOP_METRICS: TopMetric[] = [
  {
    id: 'membros',
    icon: Users,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-[#10B981]',
    value: '7.842.521',
    label: 'Membros ativos',
    changeText: '+12.5% este mês',
  },
  {
    id: 'paises',
    icon: Globe,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#2563EB]',
    value: '195',
    label: 'Países representados',
    changeText: '+4 desde ontem',
  },
  {
    id: 'comunidades',
    icon: Handshake,
    iconBg: 'bg-purple-50',
    iconColor: 'text-[#8B5CF6]',
    value: '45.230',
    label: 'Comunidades',
    changeText: '+320 este mês',
  },
  {
    id: 'interacoes',
    icon: Star,
    iconBg: 'bg-amber-50',
    iconColor: 'text-[#F59E0B]',
    value: '2.1M',
    label: 'Interações hoje',
    changeText: '+18.4% hoje',
  },
];

// Ícones SVG personalizados
const VenusIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8.5" r="5" />
    <path d="M12 13.5v7.5" />
    <path d="M8.5 17.5h7" />
  </svg>
);

const PlaneIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.5v19" />
    <path d="M4 11.5l8-4.5 8 4.5" />
    <path d="M8 19l4-2.5 4 2.5" />
  </svg>
);

const DoubleHeartIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 11c-.5-.7-1-1-1.75-1a2 2 0 0 0-2 2c0 .8.6 1.5 1.5 2.2l2.25 2.3 2.25-2.3c.9-.7 1.5-1.4 1.5-2.2a2 2 0 0 0-2-2c-.75 0-1.25.3-1.75 1Z" />
  </svg>
);

// Comunidades em destaque (4 cards)
interface FeaturedCommunity {
  id: string;
  name: string;
  category: string;
  categoryBg: string;
  categoryText: string;
  image: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBorder: string;
  iconColor: string;
  members: string;
  status: string;
  description: string;
  avatars: string[];
  extraMembers: string;
}

const FEATURED_COMMUNITIES: FeaturedCommunity[] = [
  {
    id: 'acao-climatica',
    name: 'Ação Climática Global',
    category: 'AMBIENTE',
    categoryBg: 'bg-[#10B981]',
    categoryText: 'text-white',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    icon: Leaf,
    iconBorder: 'border-[#10B981]',
    iconColor: 'text-[#10B981]',
    members: '128.540 membros',
    status: 'Ativa',
    description: 'Unindo vozes e soluções para proteger o nosso planeta.',
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    ],
    extraMembers: '+3.2K',
  },
  {
    id: 'inovacao-tecnologia',
    name: 'Inovação & Tecnologia',
    category: 'TECNOLOGIA',
    categoryBg: 'bg-[#6366F1]',
    categoryText: 'text-white',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    icon: Cpu,
    iconBorder: 'border-[#6366F1]',
    iconColor: 'text-[#6366F1]',
    members: '96.432 membros',
    status: 'Ativa',
    description: 'Explorando o futuro da tecnologia para o bem da humanidade.',
    avatars: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    ],
    extraMembers: '+2.1K',
  },
  {
    id: 'educacao-sem-fronteiras',
    name: 'Educação Sem Fronteiras',
    category: 'EDUCAÇÃO',
    categoryBg: 'bg-[#F59E0B]',
    categoryText: 'text-white',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    icon: GraduationCap,
    iconBorder: 'border-[#F59E0B]',
    iconColor: 'text-[#F59E0B]',
    members: '78.911 membros',
    status: 'Ativa',
    description: 'Educação inclusiva e de qualidade para transformar vidas.',
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    ],
    extraMembers: '+1.8K',
  },
  {
    id: 'direitos-humanos',
    name: 'Direitos Humanos',
    category: 'DIREITOS HUMANOS',
    categoryBg: 'bg-[#E11D48]',
    categoryText: 'text-white',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
    icon: DoubleHeartIcon,
    iconBorder: 'border-[#E11D48]',
    iconColor: 'text-[#E11D48]',
    members: '64.231 membros',
    status: 'Ativa',
    description: 'Promovendo dignidade, igualdade e justiça para todos.',
    avatars: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    ],
    extraMembers: '+1.8K',
  },
];

// Tendências de comunidades
interface TrendingCommunity {
  id: string;
  name: string;
  members: string;
  growth: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconColor: string;
  iconBg: string;
}

const TRENDING_COMMUNITIES: TrendingCommunity[] = [
  {
    id: 't-1',
    name: 'Saúde Mental Global',
    members: '45.2K membros',
    growth: '▲ 18%',
    icon: Brain,
    iconColor: 'text-[#EC4899]',
    iconBg: 'bg-pink-50',
  },
  {
    id: 't-2',
    name: 'Mulheres que Inspiram',
    members: '38.7K membros',
    growth: '▲ 15%',
    icon: VenusIcon,
    iconColor: 'text-[#F97316]',
    iconBg: 'bg-orange-50',
  },
  {
    id: 't-3',
    name: 'Energia Renovável',
    members: '32.1K membros',
    growth: '▲ 12%',
    icon: PlaneIcon,
    iconColor: 'text-[#0284C7]',
    iconBg: 'bg-sky-50',
  },
  {
    id: 't-4',
    name: 'Empreendedorismo Social',
    members: '28.9K membros',
    growth: '▲ 10%',
    icon: Rocket,
    iconColor: 'text-[#8B5CF6]',
    iconBg: 'bg-purple-50',
  },
  {
    id: 't-5',
    name: 'Cidades Sustentáveis',
    members: '26.3K membros',
    growth: '▲ 9%',
    icon: Building2,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-emerald-50',
  },
];

// Membros em destaque
interface FeaturedMember {
  id: string;
  name: string;
  location: string;
  role: string;
  avatar: string;
}

const FEATURED_MEMBERS: FeaturedMember[] = [
  {
    id: 'm-1',
    name: 'Dr. Amina Hassan',
    location: 'Quénia',
    role: 'Ativista Global',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-2',
    name: 'Carlos Méndez',
    location: 'Espanha',
    role: 'Empreendedor Social',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'm-3',
    name: 'Li Wei',
    location: 'Singapura',
    role: 'Especialista em IA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
];

// Próximos eventos
interface CommunityEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  dateTime: string;
  location: string;
}

const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: 'e-1',
    day: '22',
    month: 'MAI',
    title: 'Webinar: Justiça Climática',
    dateTime: '22 Mai 2024 • 15:00 (GMT)',
    location: 'Online',
  },
  {
    id: 'e-2',
    day: '25',
    month: 'MAI',
    title: 'Diálogo Intercultural',
    dateTime: '25 Mai 2024 • 10:00 (GMT)',
    location: 'Online',
  },
  {
    id: 'e-3',
    day: '30',
    month: 'MAI',
    title: 'Inovação para o Bem',
    dateTime: '30 Mai 2024 • 14:00 (GMT)',
    location: 'Online',
  },
];

// Publicações Estruturadas do Feed
interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    role: string;
    timeAgo: string;
  };
  title: string;
  content: string;
  image?: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
}

const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Ana Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: true,
      role: 'Membro em Ação Climática Global',
      timeAgo: 'Há 2 horas',
    },
    title: 'Soluções locais para um impacto global',
    content: 'Partilho convosco uma iniciativa da nossa comunidade que está a transformar resíduos plásticos em material de construção sustentável. Vamos escalar esta solução!',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
    tags: ['#Sustentabilidade', '#Inovação', '#Comunidade'],
    likesCount: 342,
    commentsCount: 56,
    sharesCount: 28,
  },
  {
    id: 'post-2',
    author: {
      name: 'Carlos Méndez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
      role: 'Empreendedor Social • Madrid',
      timeAgo: 'Há 4 horas',
    },
    title: 'Novo polo de tecnologia limpa e energia comunitária',
    content: 'Acabámos de inaugurar o nosso laboratório colaborativo para energias renováveis e projetos de mobilidade verde urbana. Aberto a voluntários e parceiros de todo o mundo!',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=80',
    tags: ['#EnergiaRenovavel', '#InovacaoSocial', '#Clima'],
    likesCount: 219,
    commentsCount: 34,
    sharesCount: 15,
  },
];

// Filtros do Feed
const FEED_FILTERS = [
  { id: 'para-si', label: 'Para si', icon: Star },
  { id: 'seguindo', label: 'Seguindo', icon: Users },
  { id: 'populares', label: 'Populares', icon: Flame },
  { id: 'novas', label: 'Novas', icon: Clock },
  { id: 'discussoes', label: 'Discussões', icon: MessageSquare },
  { id: 'projetos', label: 'Projetos', icon: Briefcase },
  { id: 'oportunidades', label: 'Oportunidades', icon: Target },
];

export const GlobalCommunityView: React.FC<GlobalCommunityViewProps> = ({
  onOpenAiAssistant,
  onExploreMap,
  onOpenCreateCommunityModal,
}) => {
  const [activeFeedFilter, setActiveFeedFilter] = useState<string>('para-si');
  const [followingMembers, setFollowingMembers] = useState<Set<string>>(new Set());
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['post-1']));

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  const toggleFollow = (id: string) => {
    setFollowingMembers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div id="comunidade-global-view" className="w-full bg-[#f5f7fb] min-h-full pb-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-7 py-5 sm:py-6 flex flex-col gap-4">
        {/* 1. Cabeçalho Principal */}
        <header className="flex flex-col gap-1.5">
          <h1 className="text-[30px] sm:text-[34px] font-extrabold text-[#14265f] leading-tight tracking-tight font-['Outfit']">
            Comunidade Global
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] max-w-3xl leading-relaxed font-normal">
            Conecte-se com pessoas, organizações e comunidades <br className="hidden sm:inline" />
            de todo o mundo. Compartilhe ideias, colabore e gere impacto.
          </p>
        </header>

        {/* 2. Quatro Indicadores Estatísticos Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TOP_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                className="bg-white rounded-[15px] border border-[#e6ebf4] p-4 shadow-[0_5px_18px_rgba(26,55,100,0.05)] flex items-center gap-3 hover:border-slate-300 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${metric.iconBg} ${metric.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-extrabold text-[#0F172A] font-['Outfit'] tracking-tight leading-none mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-[#64748B] mb-0.5 leading-tight">
                    {metric.label}
                  </div>
                  <div className="text-[11px] font-bold text-[#10B981]">
                    {metric.changeText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Hero Banner: "Um mundo de pessoas com um propósito." */}
        <section
          id="hero-community-banner"
          className="relative rounded-[15px] overflow-hidden min-h-[245px] sm:min-h-[270px] flex items-center p-5 sm:p-7 text-white shadow-md border border-slate-900/10 bg-[#030718]"
        >
          {/* Imagem de fundo: Terra curva azul no espaço com conexões douradas e digitais */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=85"
              alt="Terra vista do espaço com conexões globais"
              className="w-full h-full object-cover object-right opacity-90 scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Gradiente escuro lateral para legibilidade do texto à esquerda */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030718] via-[#030c24]/90 to-transparent" />
            {/* Brilho azul/ciano sutil na atmosfera da Terra */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          </div>

          {/* Conteúdo textual e botões */}
          <div className="relative z-10 max-w-2xl flex flex-col gap-3">
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white leading-tight font-['Outfit'] tracking-tight">
              Um mundo de pessoas <br />
              com um propósito.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-lg font-normal">
              Troque experiências, colabore em projetos <br className="hidden sm:inline" />
              e faça parte da mudança global.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              {/* Botão com gradiente azul para verde esmeralda idêntico à imagem de referência */}
              <button
                type="button"
                onClick={onExploreMap}
                id="btn-explorar-comunidades"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0052FF] via-[#0088FF] to-[#00D285] hover:opacity-95 text-white text-xs sm:text-[13px] font-bold transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Explorar Comunidades</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform stroke-[2.4]" />
              </button>

              {/* Botão translúcido com (+) no início e + no final conforme a imagem */}
              <button
                type="button"
                onClick={onOpenCreateCommunityModal}
                id="btn-criar-comunidade"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-[13px] font-semibold transition-all border border-white/25 backdrop-blur-md cursor-pointer"
              >
                <div className="w-4 h-4 rounded-full border border-white/80 flex items-center justify-center text-[11px] leading-none shrink-0 font-bold">
                  +
                </div>
                <span>Criar Comunidade +</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Seção: Comunidades em destaque (Imediatamente após o Hero) */}
        <section id="comunidades-em-destaque" className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-[20px] font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
              Comunidades em destaque
            </h3>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs sm:text-[13px] font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
            </button>
          </div>

          {/* Grid horizontal de 4 cards (com seta de navegação à direita) */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {FEATURED_COMMUNITIES.map((comm) => {
                const CommIcon = comm.icon;
                return (
                  <article
                    key={comm.id}
                    className="bg-white rounded-[15px] border border-[#e6ebf4] overflow-hidden shadow-[0_5px_18px_rgba(26,55,100,0.05)] hover:shadow-md transition-all duration-200 flex flex-col group"
                  >
                    {/* Imagem de Topo com Badge de Categoria e Ícone Circular Sobreposto */}
                    <div className="relative">
                      <div className="h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                        <img
                          src={comm.image}
                          alt={comm.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Badge da Categoria */}
                        <span
                          className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider ${comm.categoryBg} ${comm.categoryText} shadow-2xs`}
                        >
                          {comm.category}
                        </span>
                      </div>

                      {/* Ícone Circular Flutuante sobreposto na divisa da imagem */}
                      <div className="absolute -bottom-5 left-4">
                        <div
                          className={`w-11 h-11 rounded-full bg-white border border-slate-200/90 ${comm.iconColor} flex items-center justify-center shadow-xs`}
                        >
                          <CommIcon className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                      </div>
                    </div>

                    {/* Corpo do Card */}
                    <div className="pt-7 px-4 pb-4 flex flex-col justify-between flex-1">
                      <h4 className="text-[14px] sm:text-[15px] font-bold text-[#0F172A] font-['Outfit'] group-hover:text-[#0066FF] transition-colors leading-snug">
                        {comm.name}
                      </h4>

                      {/* Metadados: Membros na esquerda e Status Ativa na direita */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 pt-1">
                        <span className="font-semibold text-slate-600">{comm.members}</span>
                        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {comm.status}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Seta de navegação à direita */}
            <button
              type="button"
              aria-label="Próximas comunidades"
              className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:text-[#0066FF] hover:border-[#0066FF] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </section>

        {/* 3. Área de Feed e Widgets da Sidebar Direita */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start w-full">
          {/* COLUNA ESQUERDA: Feed de Posts (xl:col-span-8) */}
          <div className="xl:col-span-8 flex flex-col gap-3 w-full">
            {/* 3. Linha de tabs/pills de filtro do feed */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center gap-2 shrink-0">
                {FEED_FILTERS.map((filter) => {
                  const FilterIcon = filter.icon;
                  const isActive = activeFeedFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFeedFilter(filter.id)}
                      className={`inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#0066FF] text-white shadow-xs'
                          : 'bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 shadow-2xs'
                      }`}
                    >
                      <FilterIcon className="w-3.5 h-3.5" strokeWidth={2.2} />
                      <span>{filter.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Botão de Filtros alinhado à direita */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold bg-white border border-slate-200/90 text-[#334155] hover:bg-slate-50 shadow-2xs shrink-0 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2.2} />
                <span>Filtros</span>
              </button>
            </div>

            {/* 4. Feed de posts como cards completos e estruturados */}
            <div className="flex flex-col gap-4">
              {COMMUNITY_POSTS.map((post) => {
                const isLiked = likedPosts.has(post.id);
                const currentLikes = post.likesCount + (isLiked ? 1 : 0);
                return (
                  <article
                    key={post.id}
                    id={`feed-post-${post.id}`}
                    className="bg-white rounded-[15px] border border-[#e6ebf4] p-4 sm:p-5 shadow-[0_5px_18px_rgba(26,55,100,0.05)] hover:border-slate-300 transition-colors flex flex-col gap-3"
                  >
                    {/* Cabeçalho do Post: Avatar, Nome, Verificado, Cargo/Comunidade, Tempo */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#0F172A]">{post.author.name}</span>
                            {post.author.verified && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                                <span>Verificado</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {post.author.role} • {post.author.timeAgo}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Mais opções"
                        className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Corpo: Título e Texto da Publicação */}
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-base sm:text-[17px] font-bold text-[#0F172A] font-['Outfit'] leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Imagem Anexada da Publicação quando houver */}
                    {post.image && (
                      <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 shadow-2xs">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Rodapé: Hashtags */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-[#0066FF] hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rodapé de Ações Interativas: Curtir, Comentar, Partilhar, Guardar */}
                    <div className="border-t border-slate-100 pt-3 mt-1 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <button
                          type="button"
                          onClick={() => toggleLike(post.id)}
                          className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                          <span>{currentLikes}</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 hover:text-[#0066FF] transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.commentsCount}</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 hover:text-[#0066FF] transition-colors cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>{post.sharesCount}</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                        aria-label="Guardar publicação"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* COLUNA DIREITA (xl:col-span-4): Sidebar de Widgets (Ordenação estrita) */}
          <div className="xl:col-span-4 flex flex-col gap-4 w-full">
            {/* 1. Card: Comunidades em tendência */}
            <div
              id="comunidades-em-tendencia-card"
              className="bg-white rounded-[15px] border border-[#e6ebf4] p-4 shadow-[0_5px_18px_rgba(26,55,100,0.05)] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Comunidades em tendência
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista das 5 comunidades em tendência */}
              <div className="flex flex-col gap-3">
                {TRENDING_COMMUNITIES.map((trend) => {
                  const TrendIcon = trend.icon;
                  return (
                    <div
                      key={trend.id}
                      className="flex items-center justify-between p-1 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full ${trend.iconBg} ${trend.iconColor} flex items-center justify-center shrink-0`}
                        >
                          <TrendIcon className="w-4.5 h-4.5" strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-snug truncate">
                            {trend.name}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span>{trend.members}</span>
                            <span className="font-bold text-emerald-600">{trend.growth}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Card: Membros em destaque */}
            <div
              id="membros-em-destaque-card"
              className="bg-white rounded-[15px] border border-[#e6ebf4] p-4 shadow-[0_5px_18px_rgba(26,55,100,0.05)] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Membros em destaque
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                >
                  <span>Ver todos</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista dos 3 membros com botão Seguir */}
              <div className="flex flex-col gap-3">
                {FEATURED_MEMBERS.map((member) => {
                  const isFollowing = followingMembers.has(member.id);
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-1 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex flex-col">
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] truncate leading-tight">
                            {member.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                            {member.location}
                          </span>
                          <span className="text-[11px] text-slate-400 leading-tight">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFollow(member.id)}
                        className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer shrink-0 ${
                          isFollowing
                            ? 'bg-[#0066FF] text-white shadow-xs'
                            : 'bg-[#F0F5FF] hover:bg-[#E0EBFF] text-[#0066FF]'
                        }`}
                      >
                        {isFollowing ? 'Seguindo' : 'Seguir'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Card: Próximos eventos da comunidade (ABAIXO dos dois anteriores) */}
            <div
              id="proximos-eventos-card"
              className="bg-white rounded-[15px] border border-[#e6ebf4] p-4 shadow-[0_5px_18px_rgba(26,55,100,0.05)] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
                  Próximos eventos da comunidade
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer group"
                >
                  <span>Ver todas</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
                </button>
              </div>

              {/* Lista dos 3 eventos com bloco de data */}
              <div className="flex flex-col divide-y divide-slate-100">
                {COMMUNITY_EVENTS.map((event) => (
                  <div key={event.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
                    {/* Bloco de Data */}
                    <div className="w-11 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-extrabold text-rose-600 tracking-wider">
                        {event.month}
                      </span>
                      <span className="text-base font-extrabold text-[#0F172A] leading-tight font-['Outfit']">
                        {event.day}
                      </span>
                    </div>

                    {/* Informações do Evento */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-snug truncate">
                        {event.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {event.dateTime}
                      </p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <span>📍 {event.location}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
