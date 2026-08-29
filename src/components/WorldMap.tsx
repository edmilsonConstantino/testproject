import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import { Plus, Minus, Compass, Box, ArrowRight } from 'lucide-react';
import { CountryData } from '../types';

interface WorldMapProps {
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
  onExploreCountry: (country: CountryData) => void;
}

// Coordinates configured to align with Natural Earth 1 projection matching the reference UI
export const MAP_PINS = [
  // Active (Green)
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
  // Blue (With Activity)
  {
    id: 'usa-east',
    name: 'Estados Unidos (Leste)',
    flag: '🇺🇸',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 840,
    communitiesCount: 310000,
    lng: -84.0,
    lat: 42.0,
  },
  {
    id: 'brazil',
    name: 'Brasil',
    flag: '🇧🇷',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 1542,
    communitiesCount: 892130,
    lng: -44.0,
    lat: -15.0,
  },
  {
    id: 'middle-east',
    name: 'Médio Oriente / Golfo',
    flag: '🇦🇪',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 290,
    communitiesCount: 95000,
    lng: 54.0,
    lat: 25.0,
  },
  {
    id: 'south-africa',
    name: 'África do Sul',
    flag: '🇿🇦',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 512,
    communitiesCount: 180000,
    lng: 25.0,
    lat: -29.0,
  },
  {
    id: 'china-east',
    name: 'Ásia Oriental',
    flag: '🇨🇳',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 680,
    communitiesCount: 240000,
    lng: 118.0,
    lat: 32.0,
  },
  {
    id: 'australia',
    name: 'Austrália',
    flag: '🇦🇺',
    status: 'with-activity' as const,
    statusLabel: 'COM ATIVIDADE',
    projectsCount: 340,
    communitiesCount: 124000,
    lng: 138.0,
    lat: -34.0,
  },
  // Gray (Inactive / Observation)
  {
    id: 'usa-northwest',
    name: 'Estados Unidos (Oeste)',
    flag: '🇺🇸',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 45,
    communitiesCount: 12000,
    lng: -120.0,
    lat: 47.0,
  },
  {
    id: 'canada',
    name: 'Canadá',
    flag: '🇨🇦',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 18,
    communitiesCount: 6500,
    lng: -100.0,
    lat: 55.0,
  },
  {
    id: 'south-america-nw',
    name: 'América do Sul (Noroeste)',
    flag: '🇵🇪',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 38,
    communitiesCount: 14200,
    lng: -75.0,
    lat: -6.0,
  },
  {
    id: 'nordics',
    name: 'Norte da Europa',
    flag: '🇸🇪',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 65,
    communitiesCount: 22000,
    lng: 20.0,
    lat: 62.0,
  },
  {
    id: 'russia-central',
    name: 'Rússia Central',
    flag: '🇷🇺',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 22,
    communitiesCount: 8900,
    lng: 75.0,
    lat: 58.0,
  },
  {
    id: 'russia-east',
    name: 'Sibéria Oriental',
    flag: '🇷🇺',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 8,
    communitiesCount: 2300,
    lng: 125.0,
    lat: 58.0,
  },
  {
    id: 'west-africa',
    name: 'África Ocidental',
    flag: '🇬🇭',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 42,
    communitiesCount: 18000,
    lng: 8.0,
    lat: 12.0,
  },
  {
    id: 'east-africa',
    name: 'África Oriental',
    flag: '🇰🇪',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 756,
    communitiesCount: 278910,
    lng: 38.0,
    lat: 6.0,
  },
  {
    id: 'india',
    name: 'Índia',
    flag: '🇮🇳',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 110,
    communitiesCount: 48000,
    lng: 78.0,
    lat: 21.0,
  },
  {
    id: 'central-asia',
    name: 'Ásia Central',
    flag: '🇰🇿',
    status: 'inactive' as const,
    statusLabel: 'INATIVO',
    projectsCount: 15,
    communitiesCount: 5400,
    lng: 68.0,
    lat: 45.0,
  },
];

export const WorldMap: React.FC<WorldMapProps> = ({
  selectedCountry,
  onSelectCountry,
  onExploreCountry,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [is3DMode, setIs3DMode] = useState(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.85));
  const handleReset = () => {
    setZoomLevel(1);
    setIs3DMode(false);
  };
  const toggle3D = () => setIs3DMode((prev) => !prev);

  // SVG Geometry generation with Natural Earth projection
  const { landPath, bordersPath, portugalPath, projectedPins, portugalPos } = useMemo(() => {
    const width = 1180;
    const height = 580;

    // Matches the visual layout in the reference screenshot
    const projection = geoNaturalEarth1()
      .scale(185)
      .translate([620, 290]);

    const pathGenerator = geoPath(projection);

    // Extract TopoJSON features
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const landFeature = feature(topology, topology.objects.land);
    const countriesFeature = feature(topology, topology.objects.countries);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bordersMesh = mesh(topology, topology.objects.countries, (a: any, b: any) => a !== b);

    // Find Portugal (ISO 620)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ptFeature = (countriesFeature as any).features?.find(
      (f: { id: string | number }) => f.id === '620' || f.id === 620
    );

    const landD = pathGenerator(landFeature) || '';
    const bordersD = pathGenerator(bordersMesh) || '';
    const ptD = ptFeature ? pathGenerator(ptFeature) || '' : '';

    // Calculate projected positions for all pins
    const pins = MAP_PINS.map((pin) => {
      const coords = projection([pin.lng, pin.lat]);
      return {
        ...pin,
        x: coords ? coords[0] : 0,
        y: coords ? coords[1] : 0,
      };
    });

    const ptCoords = projection([-8.2245, 39.3999]) || [599, 161];

    return {
      landPath: landD,
      bordersPath: bordersD,
      portugalPath: ptD,
      projectedPins: pins,
      portugalPos: { x: ptCoords[0], y: ptCoords[1] },
    };
  }, []);

  return (
    <div
      id="interactive-world-map-wrapper"
      className="relative w-full h-[540px] sm:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden select-none bg-gradient-to-b from-[#F9FBFE] via-[#F3F7FC] to-[#ECF2F9] border border-[#E2E8F0] shadow-sm"
      style={{
        perspective: is3DMode ? '1200px' : 'none',
      }}
    >
      {/* Background Soft Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#94A3B8 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* SVG Map Canvas with Zoom & 3D Transform */}
      <div
        id="world-map-canvas"
        className="w-full h-full relative transition-all duration-700 ease-out"
        style={{
          transform: `scale(${zoomLevel}) ${is3DMode ? 'rotateX(22deg) rotateY(-6deg) translateZ(10px)' : ''}`,
          transformOrigin: '60% 40%',
        }}
      >
        <svg
          viewBox="0 0 1180 580"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Continent Gradient (Clean White to Soft Blue-Gray) */}
            <linearGradient id="geoContinentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E6EFF8" />
            </linearGradient>

            {/* Elevation Drop Shadow for Natural Continents */}
            <filter id="geoElevationShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#0F1E3D" floodOpacity="0.10" />
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F1E3D" floodOpacity="0.05" />
            </filter>

            {/* Portugal Radial Glow Aura */}
            <radialGradient id="ptAuraGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#10B981" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>

            {/* Soft Pin Drop Shadow */}
            <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F1E3D" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* High-Precision Continents Base Layer with Multi-Layer Shadow */}
          <g id="geo-landmass" filter="url(#geoElevationShadow)">
            <path
              d={landPath}
              fill="url(#geoContinentGrad)"
              stroke="#CBD8E6"
              strokeWidth="0.85"
            />
          </g>

          {/* Internal Country Borders */}
          <g id="geo-borders">
            <path
              d={bordersPath}
              fill="none"
              stroke="#DEE9F4"
              strokeWidth="0.65"
              strokeLinejoin="round"
            />
          </g>

          {/* Highlighted Portugal Territory & Radiating Concentric Pulse Waves */}
          <g id="geo-portugal-highlight">
            {/* Concentric expanding wave rings matching image */}
            <circle
              cx={portugalPos.x}
              cy={portugalPos.y}
              r="24"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.5"
              opacity="0.65"
              className="animate-ping origin-center"
              style={{ animationDuration: '3.5s' }}
            />
            <circle
              cx={portugalPos.x}
              cy={portugalPos.y}
              r="46"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              opacity="0.4"
            />
            <circle
              cx={portugalPos.x}
              cy={portugalPos.y}
              r="68"
              fill="none"
              stroke="#10B981"
              strokeWidth="1"
              opacity="0.25"
            />
            <circle
              cx={portugalPos.x}
              cy={portugalPos.y}
              r="92"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.8"
              opacity="0.15"
            />

            {/* Soft Green Glow Behind Portugal */}
            <circle
              cx={portugalPos.x}
              cy={portugalPos.y}
              r="55"
              fill="url(#ptAuraGrad)"
            />

            {/* Portugal Country Polygon Fill in Vibrant Emerald Green */}
            {portugalPath && (
              <path
                d={portugalPath}
                fill="#10B981"
                stroke="#059669"
                strokeWidth="1.5"
                className="transition-all duration-300"
              />
            )}
          </g>
        </svg>

        {/* Dynamic Map Pins Layer matching precise geographic coordinates */}
        {projectedPins.map((pin) => {
          const isSelected = selectedCountry.id === pin.id || (pin.id === 'portugal' && selectedCountry.id === 'portugal');
          const isActiveGreen = pin.status === 'active';
          const isActivityBlue = pin.status === 'with-activity';

          return (
            <div
              key={pin.id}
              style={{
                left: `${(pin.x / 1180) * 100}%`,
                top: `${(pin.y / 580) * 100}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => {
                const matched = {
                  ...selectedCountry,
                  id: pin.id,
                  name: pin.name,
                  flag: pin.flag,
                  status: pin.status,
                  statusLabel: pin.statusLabel,
                  projectsCount: pin.projectsCount,
                  communitiesCount: pin.communitiesCount,
                };
                onSelectCountry(matched);
              }}
              id={`map-pin-${pin.id}`}
            >
              {isActiveGreen ? (
                /* Active Green Teardrop Map Pin Icon matching screenshot */
                <div className="relative flex flex-col items-center -translate-y-2">
                  <div className="w-6 h-7 text-[#10B981] drop-shadow-md transition-transform duration-300 group-hover:scale-115">
                    <svg viewBox="0 0 24 28" fill="none" className="w-full h-full">
                      <path
                        d="M12 0C5.37 0 0 5.37 0 12c0 8.5 12 16 12 16s12-7.5 12-16c0-6.63-5.37-12-12-12z"
                        fill="#10B981"
                      />
                      <circle cx="12" cy="11" r="4.5" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>
              ) : isActivityBlue ? (
                /* Solid Blue Pin (País com Atividade) matching screenshot */
                <div className="relative flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center shadow-md shadow-blue-500/40 ring-2.5 ring-white transition-transform duration-200 group-hover:scale-125">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              ) : (
                /* Neutral Gray Pin (País Inativo) matching screenshot */
                <div className="relative flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#94A3B8] ring-2 ring-white shadow-xs transition-transform duration-200 group-hover:scale-125" />
                </div>
              )}

              {/* Hover Quick Name Capsule */}
              {!isActiveGreen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#0F1E3D] text-white text-[11px] font-semibold py-1 px-2 rounded-lg whitespace-nowrap shadow-lg z-40">
                  {pin.flag} {pin.name}
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Tooltip Card over Portugal matching reference screenshot exactly */}
        <div
          style={{
            left: `${(portugalPos.x / 1180) * 100 + 7}%`,
            top: `${(portugalPos.y / 580) * 100 - 4}%`,
          }}
          id="country-card-pin-tooltip"
          className="absolute -translate-x-0 -translate-y-1/2 z-30 min-w-[240px] sm:min-w-[260px] bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header with Flag, Name & Badge */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">🇵🇹</span>
              <h3 className="text-sm sm:text-base font-bold text-[#0F1E3D]">
                Portugal
              </h3>
            </div>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#DCFCE7] text-[#16A34A]">
              PAÍS ATIVO
            </span>
          </div>

          {/* Stats List */}
          <div className="py-3 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Projetos ativos</span>
              <span className="font-bold text-[#0F1E3D] text-sm">
                1.284
              </span>
            </div>
            <div className="flex items-center justify-between text-[#64748B]">
              <span>Comunidades</span>
              <span className="font-bold text-[#0F1E3D] text-sm">
                532.760
              </span>
            </div>
          </div>

          {/* Explore Action Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => onExploreCountry(selectedCountry)}
              className="w-full flex items-center justify-start gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors py-1 group/btn cursor-pointer"
            >
              <span>Explorar Portugal</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Map Controls (Right-aligned vertical stack matching screenshot) */}
      <div
        id="map-floating-controls"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-25 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-[#E2E8F0] space-y-1"
      >
        <button
          onClick={handleZoomIn}
          title="Aumentar Zoom"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0F1E3D] hover:bg-slate-100 hover:text-[#2563EB] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleZoomOut}
          title="Diminuir Zoom"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0F1E3D] hover:bg-slate-100 hover:text-[#2563EB] transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-5 h-px bg-slate-200 my-0.5" />

        <button
          onClick={handleReset}
          title="Redefinir Visão"
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0F1E3D] hover:bg-slate-100 hover:text-[#2563EB] transition-colors cursor-pointer"
        >
          <Compass className="w-4 h-4" />
        </button>

        <button
          onClick={toggle3D}
          title={is3DMode ? 'Visão 2D' : 'Visão 3D'}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
            is3DMode
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'text-[#0F1E3D] hover:bg-slate-100 hover:text-[#2563EB]'
          }`}
        >
          <Box className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
