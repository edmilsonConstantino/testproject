import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GlobalWorldMapHeroProps {
  onExploreMap?: () => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

const PRIMARY_CATEGORIES = [
  { name: 'Conferências', color: 'bg-[#00C49F]', glow: 'shadow-[0_0_8px_#00C49F]' },
  { name: 'Cultura', color: 'bg-[#F43F5E]', glow: 'shadow-[0_0_8px_#F43F5E]' },
  { name: 'Desporto', color: 'bg-[#86EFAC]', glow: 'shadow-[0_0_8px_#86EFAC]' },
  { name: 'Tecnologia', color: 'bg-[#F59E0B]', glow: 'shadow-[0_0_8px_#F59E0B]' },
];

export const GlobalWorldMapHero: React.FC<GlobalWorldMapHeroProps> = ({
  onExploreMap,
  title = 'O mundo está acontecendo agora.',
  subtitle = 'Explore eventos em todo o planeta em tempo real.',
  className = '',
}) => {
  return (
    <div
      id="global-world-map-hero"
      className={`rounded-[20px] bg-[#050B1A] p-6 sm:p-8 lg:p-9 min-h-[340px] sm:min-h-[370px] lg:min-h-[400px] flex flex-col justify-between text-white shadow-[0_12px_40px_rgba(5,11,26,0.35)] border border-slate-800/80 relative overflow-hidden group ${className}`}
    >
      {/* 1. Imagem de Alta Resolução do Mapa Mundi Noturno com Luzes das Cidades */}
      <div
        className="absolute inset-0 bg-cover bg-[position:55%_42%] opacity-85 mix-blend-screen pointer-events-none scale-100 group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/1920px-The_earth_at_night.jpg')`,
        }}
      />

      {/* Gradiente Escuro Suave para Garantir Contraste WCAG do Texto no Lado Esquerdo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050B1A]/95 via-[#050B1A]/70 to-[#050B1A]/20 pointer-events-none" />

      {/* Brilho atmosférico sutil no topo */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Pontos Geográficos Brilhantes (Hotspots) idênticos à Imagem de Referência */}
      {/* América do Norte (Califórnia / Oeste) - Âmbar */}
      <div className="absolute top-[26%] left-[36%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="absolute w-5 h-5 -top-1.5 -left-1.5 rounded-full bg-amber-400/35 animate-ping" />
        <span className="relative block w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
      </div>

      {/* América do Norte (Nova York / Costa Leste) - Lavanda com Aura Suave */}
      <div className="absolute top-[34%] left-[40.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="absolute w-8 h-8 -top-3 -left-3 rounded-full bg-indigo-400/25 blur-sm" />
        <span className="relative block w-2.5 h-2.5 rounded-full bg-indigo-200 shadow-[0_0_14px_#a5b4fc]" />
      </div>

      {/* América do Sul (Brasil / Brasília-SP) - Ponto Destaque Laranja/Âmbar Radiante */}
      <div className="absolute top-[58%] left-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="absolute w-9 h-9 -top-3 -left-3 rounded-full bg-amber-500/35 blur-sm animate-pulse" />
        <span className="relative block w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_16px_#f59e0b]" />
      </div>

      {/* Europa Ocidental (Londres/Paris) - Ponto Destaque Ciano Brilhante */}
      <div className="absolute top-[25%] left-[64%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="absolute w-9 h-9 -top-3 -left-3 rounded-full bg-cyan-400/35 blur-sm" />
        <span className="relative block w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_16px_#38bdf8]" />
      </div>

      {/* Eurásia / Moscou-Oriente - Âmbar */}
      <div className="absolute top-[32%] left-[76%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="absolute w-7 h-7 -top-2.5 -left-2.5 rounded-full bg-amber-500/30 blur-xs" />
        <span className="relative block w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]" />
      </div>

      {/* Ásia Oriental (China / Pequim) - Âmbar Laranja */}
      <div className="absolute top-[38%] left-[85.5%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="relative block w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
      </div>

      {/* Oceania (Austrália / Sydney) - Ponto Violeta/Púrpura */}
      <div className="absolute top-[62%] left-[90%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
        <span className="absolute w-8 h-8 -top-2.5 -left-2.5 rounded-full bg-purple-500/35 blur-sm" />
        <span className="relative block w-2.5 h-2.5 rounded-full bg-purple-300 shadow-[0_0_14px_#c084fc]" />
      </div>

      {/* 3. Conteúdo Textual Superior */}
      <div className="relative z-10 max-w-sm sm:max-w-md lg:max-w-lg">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-white leading-[1.2] font-['Outfit'] tracking-tight">
          {title}
        </h2>
        <p className="text-slate-300 text-xs sm:text-[13.5px] lg:text-sm mt-2.5 leading-relaxed font-normal max-w-sm">
          {subtitle}
        </p>

        {/* Botão Pill Gradiente Azul/Esmeralda */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onExploreMap}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052FE] via-[#007AFE] to-[#00C99E] hover:from-[#0042CC] hover:via-[#006CE0] hover:to-[#00A885] text-white text-xs sm:text-[13.5px] font-bold transition-all shadow-[0_4px_20px_rgba(0,201,158,0.35)] hover:shadow-[0_6px_24px_rgba(0,201,158,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
          >
            <span>Explorar mapa interativo</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 4. Rodapé: DUAS Cápsulas Translúcidas conforme Imagem de Referência */}
      <div className="relative z-10 pt-6 mt-4 flex flex-wrap items-center gap-3">
        {/* Cápsula Principal: Conferências, Cultura, Desporto, Tecnologia */}
        <div className="bg-[#0A1325]/85 border border-slate-700/60 rounded-full px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-4 sm:gap-6 text-xs backdrop-blur-md shadow-inner">
          {PRIMARY_CATEGORIES.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color} ${item.glow} shrink-0`} />
              <span className="font-medium text-slate-200 text-[11px] sm:text-[12px] whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Cápsula Secundária: Outros (separada à direita como na imagem) */}
        <div className="bg-[#0A1325]/85 border border-slate-700/60 rounded-full px-5 py-2.5 flex items-center gap-2 text-xs backdrop-blur-md shadow-inner">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6] shrink-0" />
          <span className="font-medium text-slate-200 text-[11px] sm:text-[12px] whitespace-nowrap">
            Outros
          </span>
        </div>
      </div>
    </div>
  );
};
