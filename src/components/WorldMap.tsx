import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { Plus, Minus, Crosshair, Box, ArrowRight, X } from 'lucide-react';
import { CountryData } from '../types';
import { COUNTRIES_DATA } from '../data/countriesData';

interface WorldMapProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
  className?: string;
  showLegend?: boolean;
  controlsPosition?: 'bottom-left' | 'bottom-right' | 'lateral-right' | 'bottom-left-stacked';
}

// Geographic coordinates for accurate pins and projection matching the global map
export const MAP_PINS = [
  // 1. Active (Green) - Portugal is the primary featured active country with animated ripple
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    status: 'active' as const,
    statusLabel: 'PAÍS ATIVO',
    projectsCount: 1284,
    communitiesCount: 532760,
    lng: -8.2245,
    lat: 39.3999,
  },
  // 2. Blue (País com Atividade) - As visible in screenshot: USA, Brasil, África do Sul, Japão, Austrália
  {
    id: 'eua',
    name: 'Estados Unidos (Leste)',
    flag: '🇺🇸',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 1120,
    communitiesCount: 420000,
    lng: -86.0,
    lat: 41.5,
  },
  {
    id: 'brasil',
    name: 'Brasil',
    flag: '🇧🇷',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 1542,
    communitiesCount: 892130,
    lng: -48.0,
    lat: -14.5,
  },
  {
    id: 'africa-sul',
    name: 'África do Sul',
    flag: '🇿🇦',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 280,
    communitiesCount: 95000,
    lng: 24.5,
    lat: -29.5,
  },
  {
    id: 'japao',
    name: 'Japão',
    flag: '🇯🇵',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 432,
    communitiesCount: 156320,
    lng: 138.2529,
    lat: 36.2048,
  },
  {
    id: 'australia',
    name: 'Austrália',
    flag: '🇦🇺',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 340,
    communitiesCount: 124000,
    lng: 145.0,
    lat: -33.5,
  },
  // 3. Gray (País Inativo) - Neutral dots matching the screenshot across continents
  {
    id: 'alasca',
    name: 'Canadá',
    flag: '🇨🇦',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 18,
    communitiesCount: 6500,
    lng: -115.0,
    lat: 56.0,
  },
  {
    id: 'eua-oeste',
    name: 'Estados Unidos (Oeste)',
    flag: '🇺🇸',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 45,
    communitiesCount: 12000,
    lng: -118.0,
    lat: 44.0,
  },
  {
    id: 'eua-central',
    name: 'Estados Unidos (Centro)',
    flag: '🇺🇸',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 30,
    communitiesCount: 9000,
    lng: -100.0,
    lat: 36.0,
  },
  {
    id: 'colombia',
    name: 'Colômbia',
    flag: '🇨🇴',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 35,
    communitiesCount: 11000,
    lng: -74.0,
    lat: 4.5,
  },
  {
    id: 'argentina',
    name: 'Argentina',
    flag: '🇦🇷',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 38,
    communitiesCount: 14200,
    lng: -64.0,
    lat: -34.0,
  },
  {
    id: 'norte-africa',
    name: 'Norte de África',
    flag: '🇲🇦',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 22,
    communitiesCount: 8000,
    lng: 18.0,
    lat: 26.0,
  },
  {
    id: 'africa-central',
    name: 'África Central',
    flag: '🇨🇩',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 28,
    communitiesCount: 10500,
    lng: 22.0,
    lat: 0.0,
  },
  {
    id: 'escandinavia',
    name: 'Escandinávia',
    flag: '🇸🇪',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 65,
    communitiesCount: 22000,
    lng: 16.0,
    lat: 62.0,
  },
  {
    id: 'russia-ocidental',
    name: 'Rússia Ocidental',
    flag: '🇷🇺',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 22,
    communitiesCount: 8900,
    lng: 78.0,
    lat: 58.0,
  },
  {
    id: 'siberia-central',
    name: 'Ásia Central',
    flag: '🇰🇿',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 15,
    communitiesCount: 5400,
    lng: 72.0,
    lat: 44.0,
  },
  {
    id: 'india',
    name: 'Índia',
    flag: '🇮🇳',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 940,
    communitiesCount: 380000,
    lng: 78.9629,
    lat: 20.5937,
  },
  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 50,
    communitiesCount: 19000,
    lng: 104.0,
    lat: 35.0,
  },
  {
    id: 'sudeste-asiatico',
    name: 'Sudeste Asiático',
    flag: '🇹🇭',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 32,
    communitiesCount: 12000,
    lng: 102.0,
    lat: 14.0,
  },
  {
    id: 'australia-oeste',
    name: 'Austrália Ocidental',
    flag: '🇦🇺',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 18,
    communitiesCount: 6200,
    lng: 122.0,
    lat: -26.0,
  },
];

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreCountry,
  className = '',
  showLegend = true,
  controlsPosition = 'bottom-left',
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);

  // Whenever selectedCountry changes, re-open popup
  React.useEffect(() => {
    setIsPopupDismissed(false);
  }, [selectedCountry.id]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.85));
  const handleReset = () => {
    setZoomLevel(1);
    setIs3DMode(false);
  };
  const toggle3D = () => setIs3DMode((prev) => !prev);

  // SVG Geometry generation with Natural Earth projection
  const { landPath, bordersPath, portugalPath, projectedPins, portugalPos, projection } = useMemo(() => {
    // Natural Earth 1 projection matching the visual reference
    const proj = geoNaturalEarth1()
      .scale(185)
      .translate([620, 290]);

    const pathGenerator = geoPath(proj);

    // Extract TopoJSON features and exclude Antarctica (code 010 / 10 / ATA)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countriesFeature = feature(topology, topology.objects.countries);

    // Filter out Antarctica
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredCountries = {
      type: 'FeatureCollection',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      features: ((countriesFeature as any).features || []).filter((f: any) => {
        const id = String(f.id);
        const name = f.properties?.name;
        if (id === '010' || id === '10' || id === 'ATA' || name === 'Antarctica') {
          return false;
        }
        return true;
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bordersMesh = mesh(topology, topology.objects.countries, (a: any, b: any) => {
      const isAntarcticaA = String(a.id) === '010' || String(a.id) === '10' || a.id === 'ATA';
      const isAntarcticaB = String(b.id) === '010' || String(b.id) === '10' || b.id === 'ATA';
      if (isAntarcticaA || isAntarcticaB) return false;
      return a !== b;
    });

    // Find Portugal (ISO 620)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ptFeature = (countriesFeature as any).features?.find(
      (f: { id: string | number }) => f.id === '620' || f.id === 620
    );

    const landD = pathGenerator(filteredCountries as any) || '';
    const bordersD = pathGenerator(bordersMesh) || '';
    const ptD = ptFeature ? pathGenerator(ptFeature) || '' : '';

    // Calculate projected positions for all pins
    const pins = MAP_PINS.map((pin) => {
      const coords = proj([pin.lng, pin.lat]);
      return {
        ...pin,
        x: coords ? coords[0] : 0,
        y: coords ? coords[1] : 0,
      };
    });

    const ptCoords = proj([-8.2245, 39.3999]) || [599, 161];

    return {
      landPath: landD,
      bordersPath: bordersD,
      portugalPath: ptD,
      projectedPins: pins,
      portugalPos: { x: ptCoords[0], y: ptCoords[1] },
      projection: proj,
    };
  }, []);

  // Compute active target pin position for wave pulses & popup
  const activePinPos = useMemo(() => {
    // 1. Direct match by ID in projected pins
    const found = projectedPins.find(
      (p) => p.id === selectedCountry.id || p.name.toLowerCase() === selectedCountry.name.toLowerCase()
    );
    if (found) {
      return { x: found.x, y: found.y };
    }

    // 2. Try mapPos percentage in selectedCountry
    if (selectedCountry.mapPos) {
      return {
        x: (selectedCountry.mapPos.x / 100) * 1180,
        y: (selectedCountry.mapPos.y / 100) * 580,
      };
    }

    // Fallback to Portugal
    return { x: portugalPos.x, y: portugalPos.y };
  }, [selectedCountry, projectedPins, portugalPos]);

  // Determine pulse ring color based on selectedCountry status
  const ringColor = useMemo(() => {
    if (selectedCountry.status === 'active') return '#10B981';
    if (selectedCountry.status === 'with-activity') return '#1264FF';
    return '#94A3B8';
  }, [selectedCountry.status]);

  // Determine popup coordinates:
  // If pin is in the right area (x > 720), position popup on the LEFT of the pin with right-facing arrow
  // If pin is in the left/center, position popup on the RIGHT of the pin with left-facing arrow
  const isPinOnRight = activePinPos.x > 720;
  const pinXPercent = (activePinPos.x / 1180) * 100;
  const pinYPercent = (activePinPos.y / 580) * 100;
  // Clamped Y position so popup stays visible inside SVG bounds
  const clampedYPercent = Math.max(16, Math.min(84, pinYPercent));

  return (
    <div
      id="interactive-world-map-wrapper"
      className={`relative w-full h-[460px] sm:h-[500px] lg:h-[520px] select-none bg-transparent overflow-hidden ${className}`}
      style={{
        perspective: is3DMode ? '1200px' : 'none',
      }}
    >
      {/* 3. Fixed Legend Pill (Verde: País Ativo | Azul: País com Atividade | Cinza: País Inativo) */}
      {showLegend && (
        <div
          id="world-map-fixed-legend"
          className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-25 bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 sm:py-3 border border-slate-100/90 shadow-[0_4px_16px_rgba(15,30,61,0.08),0_2px_6px_rgba(0,0,0,0.04)] flex items-center gap-3.5 sm:gap-5 select-none animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-emerald-200 shrink-0" />
            <span className="text-[#0D1E3A] font-bold text-xs sm:text-[12px] whitespace-nowrap font-['Outfit']">
              País Ativo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1264FF] ring-2 ring-blue-200 shrink-0" />
            <span className="text-[#0D1E3A] font-bold text-xs sm:text-[12px] whitespace-nowrap font-['Outfit']">
              País com Atividade
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8] ring-2 ring-slate-200 shrink-0" />
            <span className="text-[#0D1E3A] font-bold text-xs sm:text-[12px] whitespace-nowrap font-['Outfit']">
              País Inativo
            </span>
          </div>
        </div>
      )}

      {/* SVG Map Canvas with Zoom & 3D Transform */}
      <div
        id="world-map-canvas"
        className="w-full h-full relative transition-all duration-700 ease-out"
        style={{
          transform: `scale(${zoomLevel}) ${is3DMode ? 'rotateX(22deg) rotateY(-6deg) translateZ(10px)' : ''}`,
          transformOrigin: '55% 45%',
        }}
      >
        <svg
          viewBox="0 0 1180 580"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Continent Gradient (Clean White to Light Embossed Soft Gray-Blue) */}
            <linearGradient id="geoContinentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F8FAFD" />
              <stop offset="100%" stopColor="#EDF3FB" />
            </linearGradient>

            {/* Elevation Drop Shadow for Natural Continents */}
            <filter id="geoElevationShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0F1E3D" floodOpacity="0.06" />
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F1E3D" floodOpacity="0.03" />
            </filter>

            {/* Radiant Aura Gradient - soft mint glow */}
            <radialGradient id="activeAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="55%" stopColor="#10B981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* High-Precision Continents Base Layer with Multi-Layer Shadow */}
          <g id="geo-landmass" filter="url(#geoElevationShadow)">
            <path
              d={landPath}
              fill="url(#geoContinentGrad)"
              stroke="#DDE6F4"
              strokeWidth="0.75"
            />
          </g>

          {/* Internal Country Borders */}
          <g id="geo-borders">
            <path
              d={bordersPath}
              fill="none"
              stroke="#E2EBF7"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Concentric wave rings radiating gently from the active country (Portugal) */}
          <g id="geo-active-waves">
            {/* Soft subtle mint aura */}
            <circle
              cx={activePinPos.x}
              cy={activePinPos.y}
              r="68"
              fill="url(#activeAuraGrad)"
            />
            {/* Inner Ring */}
            <circle
              cx={activePinPos.x}
              cy={activePinPos.y}
              r="28"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.1"
              opacity="0.45"
            />
            {/* Middle Ring */}
            <circle
              cx={activePinPos.x}
              cy={activePinPos.y}
              r="48"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.95"
              opacity="0.3"
            />
            {/* Outer Ring */}
            <circle
              cx={activePinPos.x}
              cy={activePinPos.y}
              r="74"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.8"
              opacity="0.18"
            />
          </g>
        </svg>

        {/* Dynamic Map Pins Layer matching precise geographic coordinates */}
        {projectedPins.map((pin) => {
          const isSelected = selectedCountry.id === pin.id || selectedCountry.name.toLowerCase() === pin.name.toLowerCase();
          const isActiveGreen = pin.status === 'active';
          const isActivityBlue = pin.status === 'with-activity';

          return (
            <div
              key={pin.id}
              style={{
                left: `${(pin.x / 1180) * 100}%`,
                top: `${(pin.y / 580) * 100}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform duration-200 ${
                isSelected ? 'z-30 scale-105' : 'z-20 hover:scale-115'
              }`}
              onClick={() => {
                const matched = COUNTRIES_DATA.find(
                  (c) => c.id === pin.id || c.name.toLowerCase() === pin.name.toLowerCase()
                ) || {
                  id: pin.id,
                  name: pin.name,
                  code: pin.id.slice(0, 2).toUpperCase(),
                  flag: pin.flag,
                  status: pin.status,
                  statusLabel: pin.statusLabel,
                  projectsCount: pin.projectsCount,
                  communitiesCount: pin.communitiesCount,
                  citizensCount: pin.communitiesCount * 2,
                  imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80',
                  description: `Iniciativas de sustentabilidade e desenvolvimento comunitário em ${pin.name}.`,
                  capital: pin.name,
                  region: 'Global',
                  mapPos: { x: (pin.x / 1180) * 100, y: (pin.y / 580) * 100 },
                  initiatives: ['Desenvolvimento Local Sustentável', 'Educação Comunitária'],
                };
                onSelectCountry(matched);
              }}
              id={`map-pin-${pin.id}`}
              title={`${pin.name} (${pin.statusLabel})`}
            >
              {isActiveGreen ? (
                /* Active Green Teardrop Map Pin with Center White Circle */
                <div className="relative flex flex-col items-center -translate-y-6 select-none pointer-events-auto">
                  <div className={`w-7 h-8.5 text-[#10B981] drop-shadow-[0_4px_10px_rgba(16,185,129,0.35)] transition-all duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <svg viewBox="0 0 28 34" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 1C6.82 1 1 6.82 1 14C1 23.5 14 33 14 33C14 33 27 23.5 27 14C27 6.82 21.18 1 14 1Z"
                        fill="#10B981"
                        stroke="#059669"
                        strokeWidth="0.6"
                      />
                      <circle cx="14" cy="13.5" r="4.8" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              ) : isActivityBlue ? (
                /* Solid Blue Pin with White Ring (País com Atividade) */
                <div className="relative flex items-center justify-center">
                  <div className={`w-3.5 h-3.5 rounded-full bg-[#0055FE] ring-2 ring-white shadow-[0_2px_6px_rgba(0,85,254,0.35)] transition-transform duration-200 ${isSelected ? 'ring-3 ring-blue-300 scale-125' : 'group-hover:scale-125'}`} />
                </div>
              ) : (
                /* Neutral Gray Pin with White Ring (País Inativo) */
                <div className="relative flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full bg-[#94A3B8] ring-2 ring-white shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-transform duration-200 ${isSelected ? 'ring-3 ring-slate-400 scale-125' : 'group-hover:scale-125'}`} />
                </div>
              )}

              {/* Hover Quick Name Capsule for non-selected pins */}
              {!isSelected && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#0F1E3D] text-white text-[10px] font-semibold py-0.5 px-2 rounded-md whitespace-nowrap shadow-lg z-40">
                  {pin.flag} {pin.name}
                </div>
              )}
            </div>
          );
        })}

        {/* 4. Floating Popup / Card Flutuante sobre o mapa (Portugal e países selecionados) */}
        {!isPopupDismissed && (
          <div
            style={{
              left: isPinOnRight
                ? `${pinXPercent - 3}%`
                : `${pinXPercent + 4}%`,
              top: `${clampedYPercent}%`,
              transform: isPinOnRight
                ? 'translate(-100%, -50%)'
                : 'translate(0%, -50%)',
            }}
            id="country-card-pin-tooltip"
            className="absolute z-35 min-w-[220px] sm:min-w-[238px] bg-white rounded-[22px] p-4 sm:p-4.5 shadow-[0_16px_38px_rgba(15,30,61,0.09),0_4px_12px_rgba(15,30,61,0.03)] border-0 animate-in fade-in zoom-in-95 duration-200 select-none"
          >
            {/* Card Header: Code/Flag + Country Name + Status Badge */}
            <div className="relative flex items-center justify-between gap-2 pb-3">
              <div className="flex items-center gap-2 min-w-0">
                {selectedCountry.id === 'portugal' ? (
                  <span className="text-[13px] font-semibold text-slate-400 shrink-0">
                    PT
                  </span>
                ) : (
                  <span className="text-base leading-none shrink-0" role="img" aria-label={selectedCountry.name}>
                    {selectedCountry.flag}
                  </span>
                )}

                <h3 className="text-[15px] font-bold text-[#0D1E3A] tracking-tight font-['Outfit'] truncate">
                  {selectedCountry.name}
                </h3>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span
                  className={`text-[9.5px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider ${
                    selectedCountry.status === 'active'
                      ? 'bg-[#E8FAF2] text-[#10B981]'
                      : selectedCountry.status === 'with-activity'
                      ? 'bg-[#EBF2FE] text-[#0055FE]'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {selectedCountry.status === 'active'
                    ? 'PAÍS ATIVO'
                    : selectedCountry.status === 'with-activity'
                    ? 'COM ATIVIDADE'
                    : 'INATIVO'}
                </span>
              </div>
            </div>

            {/* Stats List */}
            <div className="relative space-y-2 text-[12.5px]">
              <div className="flex items-center justify-between">
                <span className="font-normal text-slate-500">Projetos ativos</span>
                <span className="font-bold text-[#0D1E3A] text-[13px] tracking-tight font-['Outfit']">
                  {selectedCountry.projectsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-normal text-slate-500">Comunidades</span>
                <span className="font-bold text-[#0D1E3A] text-[13px] tracking-tight font-['Outfit']">
                  {selectedCountry.communitiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </span>
              </div>
            </div>

            {/* Explore Action Button */}
            <div className="relative pt-3">
              <button
                type="button"
                onClick={() => onExploreCountry(selectedCountry)}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#0055FE] hover:text-[#0042CC] transition-colors py-0.5 group/btn cursor-pointer"
              >
                <span>Explorar {selectedCountry.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform stroke-[2.2]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Floating Map Controls (Zoom +/-, Localization - 3 icons total) */}
      <div
        id="map-floating-controls"
        className={`absolute z-25 flex flex-col items-center bg-white rounded-2xl p-1 shadow-[0_8px_24px_rgba(15,30,61,0.08),0_2px_6px_rgba(15,30,61,0.03)] border-0 space-y-0.5 select-none ${
          controlsPosition === 'lateral-right'
            ? 'right-4 sm:right-5 top-1/2 -translate-y-1/2'
            : controlsPosition === 'bottom-right'
            ? 'right-4 sm:right-5 bottom-4 sm:bottom-5'
            : controlsPosition === 'bottom-left-stacked'
            ? 'left-4 sm:left-5 bottom-[68px] sm:bottom-[76px]'
            : 'left-4 sm:left-5 bottom-4 sm:bottom-5'
        }`}
      >
        <button
          onClick={handleZoomIn}
          title="Aumentar Zoom (+)"
          type="button"
          className="w-8.5 h-8.5 flex items-center justify-center rounded-xl text-[#0D1E3A] hover:bg-slate-50 hover:text-[#0055FE] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.2]" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Diminuir Zoom (-)"
          type="button"
          className="w-8.5 h-8.5 flex items-center justify-center rounded-xl text-[#0D1E3A] hover:bg-slate-50 hover:text-[#0055FE] transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4 stroke-[2.2]" />
        </button>

        <button
          onClick={handleReset}
          title="Localização / Redefinir Visão"
          type="button"
          className="w-8.5 h-8.5 flex items-center justify-center rounded-xl text-[#0D1E3A] hover:bg-slate-50 hover:text-[#0055FE] transition-colors cursor-pointer"
        >
          <Crosshair className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
};

