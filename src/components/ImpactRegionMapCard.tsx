import React, { useState, useMemo } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { ArrowRight } from 'lucide-react';

export type RegionCategoryTheme =
  | 'direitos-humanos'
  | 'ambiente'
  | 'saude'
  | 'tecnologia'
  | 'empreendedorismo'
  | 'educacao'
  | 'cultura'
  | 'global';

export interface RegionImpactItem {
  id: string;
  name: string;
  percent: number;
  projectsCount?: number;
  highlight?: boolean;
}

export interface ImpactRegionMapCardProps {
  category?: RegionCategoryTheme;
  title?: string;
  onOpenReport?: () => void;
  onSeeAll?: () => void;
  customRegions?: RegionImpactItem[];
  className?: string;
  showFooterButton?: boolean;
}

// Mapeamento preciso de países para continentes geográficos
const COUNTRY_TO_REGION: Record<string, string> = {
  // América do Norte
  'Canada': 'north-america',
  'United States of America': 'north-america',
  'Greenland': 'north-america',

  // América Latina & Caribe
  'Mexico': 'latin-america',
  'Guatemala': 'latin-america',
  'Belize': 'latin-america',
  'El Salvador': 'latin-america',
  'Honduras': 'latin-america',
  'Nicaragua': 'latin-america',
  'Costa Rica': 'latin-america',
  'Panama': 'latin-america',
  'Cuba': 'latin-america',
  'Jamaica': 'latin-america',
  'Haiti': 'latin-america',
  'Dominican Rep.': 'latin-america',
  'Puerto Rico': 'latin-america',
  'Trinidad and Tobago': 'latin-america',
  'Bahamas': 'latin-america',
  'Colombia': 'latin-america',
  'Venezuela': 'latin-america',
  'Guyana': 'latin-america',
  'Suriname': 'latin-america',
  'Ecuador': 'latin-america',
  'Peru': 'latin-america',
  'Brazil': 'latin-america',
  'Bolivia': 'latin-america',
  'Paraguay': 'latin-america',
  'Chile': 'latin-america',
  'Argentina': 'latin-america',
  'Uruguay': 'latin-america',
  'Falkland Is.': 'latin-america',

  // Europa
  'Portugal': 'europe',
  'Spain': 'europe',
  'France': 'europe',
  'United Kingdom': 'europe',
  'Ireland': 'europe',
  'Belgium': 'europe',
  'Netherlands': 'europe',
  'Germany': 'europe',
  'Switzerland': 'europe',
  'Austria': 'europe',
  'Italy': 'europe',
  'Poland': 'europe',
  'Czechia': 'europe',
  'Slovakia': 'europe',
  'Hungary': 'europe',
  'Slovenia': 'europe',
  'Croatia': 'europe',
  'Bosnia and Herz.': 'europe',
  'Serbia': 'europe',
  'Montenegro': 'europe',
  'Kosovo': 'europe',
  'Albania': 'europe',
  'Macedonia': 'europe',
  'Greece': 'europe',
  'Bulgaria': 'europe',
  'Romania': 'europe',
  'Moldova': 'europe',
  'Ukraine': 'europe',
  'Belarus': 'europe',
  'Lithuania': 'europe',
  'Latvia': 'europe',
  'Estonia': 'europe',
  'Finland': 'europe',
  'Sweden': 'europe',
  'Norway': 'europe',
  'Denmark': 'europe',
  'Iceland': 'europe',
  'Luxembourg': 'europe',

  // África
  'Morocco': 'africa',
  'Algeria': 'africa',
  'Tunisia': 'africa',
  'Libya': 'africa',
  'Egypt': 'africa',
  'Sudan': 'africa',
  'S. Sudan': 'africa',
  'Chad': 'africa',
  'Niger': 'africa',
  'Mali': 'africa',
  'Mauritania': 'africa',
  'Senegal': 'africa',
  'Gambia': 'africa',
  'Guinea-Bissau': 'africa',
  'Guinea': 'africa',
  'Sierra Leone': 'africa',
  'Liberia': 'africa',
  'Ivory Coast': 'africa',
  "Côte d'Ivoire": 'africa',
  'Ghana': 'africa',
  'Togo': 'africa',
  'Benin': 'africa',
  'Nigeria': 'africa',
  'Cameroon': 'africa',
  'Central African Rep.': 'africa',
  'Eq. Guinea': 'africa',
  'Gabon': 'africa',
  'Congo': 'africa',
  'Dem. Rep. Congo': 'africa',
  'Angola': 'africa',
  'Namibia': 'africa',
  'South Africa': 'africa',
  'Lesotho': 'africa',
  'eSwatini': 'africa',
  'Botswana': 'africa',
  'Zimbabwe': 'africa',
  'Zambia': 'africa',
  'Malawi': 'africa',
  'Mozambique': 'africa',
  'Madagascar': 'africa',
  'Tanzania': 'africa',
  'Burundi': 'africa',
  'Rwanda': 'africa',
  'Uganda': 'africa',
  'Kenya': 'africa',
  'Somalia': 'africa',
  'Somaliland': 'africa',
  'Ethiopia': 'africa',
  'Eritrea': 'africa',
  'Djibouti': 'africa',
  'Burkina Faso': 'africa',
  'W. Sahara': 'africa',

  // Oceania
  'Australia': 'oceania',
  'New Zealand': 'oceania',
  'Papua New Guinea': 'oceania',
  'Fiji': 'oceania',
  'Solomon Is.': 'oceania',
  'Vanuatu': 'oceania',
  'New Caledonia': 'oceania',
};

// Coordenadas geográficas dos centros das regiões para os pontos de pulso e tooltips
const REGION_COORDINATES: Record<string, [number, number]> = {
  'africa': [20, 4],
  'latin-america': [-58, -14],
  'asia': [95, 34],
  'europe': [16, 50],
  'north-america': [-100, 42],
  'oceania': [135, -25],
};

// Cores temáticas para cada categoria
const THEME_STYLES: Record<
  RegionCategoryTheme,
  {
    primaryDark: string;
    primaryMedium: string;
    border: string;
    hoverPin: string;
    btnText: string;
    btnHover: string;
    palette: Record<string, { fill: string; stroke: string; dot: string }>;
  }
> = {
  'empreendedorismo': {
    primaryDark: '#064E3B',
    primaryMedium: '#059669',
    border: '#A7F3D0',
    hoverPin: '#064E3B',
    btnText: '#064E3B',
    btnHover: '#043d2e',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'ambiente': {
    primaryDark: '#064E3B',
    primaryMedium: '#059669',
    border: '#A7F3D0',
    hoverPin: '#064E3B',
    btnText: '#064E3B',
    btnHover: '#043d2e',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'global': {
    primaryDark: '#064E3B',
    primaryMedium: '#059669',
    border: '#A7F3D0',
    hoverPin: '#064E3B',
    btnText: '#064E3B',
    btnHover: '#043d2e',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'direitos-humanos': {
    primaryDark: '#312E81',
    primaryMedium: '#6D28D9',
    border: '#C4B5FD',
    hoverPin: '#4C1D95',
    btnText: '#312E81',
    btnHover: '#26246a',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'saude': {
    primaryDark: '#115E59',
    primaryMedium: '#0D9488',
    border: '#99F6E4',
    hoverPin: '#115E59',
    btnText: '#115E59',
    btnHover: '#0f4f4b',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'tecnologia': {
    primaryDark: '#1E3A8A',
    primaryMedium: '#2563EB',
    border: '#BFDBFE',
    hoverPin: '#1E3A8A',
    btnText: '#1D4ED8',
    btnHover: '#1e40af',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'educacao': {
    primaryDark: '#0369A1',
    primaryMedium: '#0284C7',
    border: '#BAE6FD',
    hoverPin: '#0369A1',
    btnText: '#0284C7',
    btnHover: '#0369a1',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
  'cultura': {
    primaryDark: '#831843',
    primaryMedium: '#BE185D',
    border: '#FBCFE8',
    hoverPin: '#831843',
    btnText: '#BE185D',
    btnHover: '#831843',
    palette: {
      'africa': { fill: '#CEE594', stroke: '#B8DB7D', dot: 'bg-amber-500' },
      'asia': { fill: '#047857', stroke: '#065F46', dot: 'bg-[#047857]' },
      'latin-america': { fill: '#22C55E', stroke: '#16A34A', dot: 'bg-[#22C55E]' },
      'europe': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
      'north-america': { fill: '#A7F3D0', stroke: '#86EFAC', dot: 'bg-[#86EFAC]' },
      'oceania': { fill: '#059669', stroke: '#047857', dot: 'bg-[#059669]' },
    },
  },
};

const DEFAULT_REGIONS: RegionImpactItem[] = [
  { id: 'africa', name: 'África', percent: 34, projectsCount: 428, highlight: true },
  { id: 'asia', name: 'Ásia', percent: 26, projectsCount: 312 },
  { id: 'latin-america', name: 'América Latina', percent: 20, projectsCount: 245 },
  { id: 'europe', name: 'Europa', percent: 12, projectsCount: 168 },
  { id: 'north-america', name: 'América do Norte', percent: 8, projectsCount: 94 },
];

export const ImpactRegionMapCard: React.FC<ImpactRegionMapCardProps> = ({
  category = 'direitos-humanos',
  title = 'Impacto por região',
  onOpenReport,
  onSeeAll,
  customRegions,
  className = '',
  showFooterButton = false,
}) => {
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  const theme = THEME_STYLES[category] || THEME_STYLES['direitos-humanos'];
  const regions = customRegions || DEFAULT_REGIONS;

  // Gerar projeção geoNaturalEarth1 e caminhos vetoriais autênticos da Terra
  const { countryPaths, bordersPath, pinCoords } = useMemo(() => {
    // Escala e translação calibradas para viewBox 350x170 (apenas massa terrestre sem Antártida)
    const proj = geoNaturalEarth1()
      .scale(58)
      .translate([170, 95]);

    const pathGen = geoPath(proj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countriesFeature = feature(topology, topology.objects.countries);

    // Mapear cada país para sua região e gerar o SVG path real
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paths = ((countriesFeature as any).features || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((f: any) => {
        const name = f.properties?.name;
        const id = String(f.id);
        return name !== 'Antarctica' && name !== 'Fr. S. Antarctic Lands' && id !== '010' && id !== '10' && id !== 'ATA';
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((f: any) => {
        const name = f.properties?.name || '';
        const regionId = COUNTRY_TO_REGION[name] || 'asia'; // default para Ásia se não estiver listado
        const d = pathGen(f) || '';
        return {
          id: String(f.id),
          name,
          regionId,
          d,
        };
      });

    // Malha interna de fronteiras
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bordersMesh = mesh(topology, topology.objects.countries, (a: any, b: any) => {
      const isAntarcticaA = String(a.id) === '010' || a.properties?.name === 'Antarctica';
      const isAntarcticaB = String(b.id) === '010' || b.properties?.name === 'Antarctica';
      if (isAntarcticaA || isAntarcticaB) return false;
      return a !== b;
    });
    const bordersD = pathGen(bordersMesh) || '';

    // Coordenadas projetadas para os pinos de cada região
    const pins: Record<string, { x: number; y: number }> = {};
    Object.entries(REGION_COORDINATES).forEach(([regId, coords]) => {
      const p = proj(coords);
      if (p) {
        pins[regId] = { x: p[0], y: p[1] };
      }
    });

    return {
      countryPaths: paths,
      bordersPath: bordersD,
      pinCoords: pins,
    };
  }, []);

  // Região ativa para o pino pulsante (por defeito África ou a região com maior percentual)
  const activeRegion = useMemo(() => {
    if (hoveredRegionId) {
      return regions.find((r) => r.id === hoveredRegionId) || regions[0];
    }
    return regions.find((r) => r.highlight) || regions[0];
  }, [hoveredRegionId, regions]);

  const activePinPos = pinCoords[activeRegion.id] || { x: 187, y: 95 };

  return (
    <div
      className={`bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col justify-between ${className}`}
    >
      {/* 1. Header com Título e Ação "Ver todas" */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-100">
        <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit'] tracking-tight">
          {title}
        </h3>
        <button
          type="button"
          onClick={onSeeAll || onOpenReport}
          className="text-[11px] font-bold inline-flex items-center gap-0.5 cursor-pointer transition-colors group"
          style={{ color: theme.btnText }}
        >
          <span>Ver todas</span>
          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 2. Mapa Mundi Autêntico com Projeção e Cores Fiéis ao Mockup */}
      <div className="relative py-2 flex items-center justify-center group/map">
        <svg
          viewBox="0 0 350 170"
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Filtro sutil de relevo */}
            <filter id={`map-shadow-${category}`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#064E3B" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Camada Base de Países Geográficos Reais com Cores Fiéis */}
          <g filter={`url(#map-shadow-${category})`}>
            {countryPaths.map((country) => {
              const regPalette = theme.palette[country.regionId] || theme.palette['oceania'];
              const isHovered = hoveredRegionId === country.regionId;
              const isDimmed = hoveredRegionId !== null && !isHovered;

              return (
                <path
                  key={country.id}
                  d={country.d}
                  fill={regPalette.fill}
                  stroke={regPalette.stroke}
                  strokeWidth={isHovered ? 0.8 : 0.35}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: isDimmed ? 0.45 : isHovered ? 1 : 0.95,
                    filter: isHovered ? 'brightness(1.08)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredRegionId(country.regionId)}
                  onMouseLeave={() => setHoveredRegionId(null)}
                >
                  <title>{`${country.name} (${regions.find((r) => r.id === country.regionId)?.name || 'Região'})`}</title>
                </path>
              );
            })}
          </g>

          {/* Fronteiras Internas Nacionais Suaves em Branco */}
          <path
            d={bordersPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.35"
            strokeOpacity="0.55"
            strokeLinejoin="round"
            className="pointer-events-none"
          />

          {/* Ponto Interativo Sutil na Região em Foco ao passar o mouse */}
          {hoveredRegionId && (
            <g className="pointer-events-none transition-all duration-300">
              <circle
                cx={activePinPos.x}
                cy={activePinPos.y}
                r="7"
                fill="none"
                stroke={theme.primaryDark}
                strokeWidth="1"
                opacity="0.4"
                className="animate-ping"
              />
              <circle
                cx={activePinPos.x}
                cy={activePinPos.y}
                r="3.5"
                fill={theme.primaryDark}
                stroke="#FFFFFF"
                strokeWidth="0.8"
              />
            </g>
          )}
        </svg>

        {/* Tooltip flutuante ao passar o cursor na região */}
        {hoveredRegionId && (
          <div className="absolute bottom-1 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs text-[10.5px] font-bold text-slate-800 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            {regions.find((r) => r.id === hoveredRegionId)?.name}:{' '}
            <span style={{ color: theme.btnText }}>
              {regions.find((r) => r.id === hoveredRegionId)?.percent}%
            </span>
          </div>
        )}
      </div>

      {/* 3. Legenda Vertical com Pontos Coloridos (África, Ásia, América Latina, Europa, América do Norte) */}
      <div className="flex flex-col gap-1 text-[11px] pt-1">
        {regions.slice(0, 5).map((reg) => {
          const regPalette = theme.palette[reg.id] || theme.palette['oceania'];
          const isHovered = hoveredRegionId === reg.id;

          return (
            <div
              key={reg.id}
              onMouseEnter={() => setHoveredRegionId(reg.id)}
              onMouseLeave={() => setHoveredRegionId(null)}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                isHovered ? 'font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${regPalette.dot}`} />
              <span className="truncate">{reg.name}</span>
            </div>
          );
        })}
      </div>

      {/* 4. Botão Opcional de Ação */}
      {showFooterButton && (
        <button
          type="button"
          onClick={onOpenReport}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer group mt-2"
          style={{ color: theme.btnText }}
        >
          <span>Ver relatório completo</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
};
