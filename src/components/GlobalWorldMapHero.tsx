import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface MapHeroCategory {
  name: string;
  color: string;
  glow?: string;
}

interface GlobalWorldMapHeroProps {
  onButtonClick?: () => void;
  onExploreMap?: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  categories?: MapHeroCategory[];
  secondaryCategory?: MapHeroCategory | null;
  className?: string;
}

const DEFAULT_EVENT_CATEGORIES: MapHeroCategory[] = [
  { name: 'Conferências', color: 'bg-[#00C49F]', glow: 'shadow-[0_0_8px_#00C49F]' },
  { name: 'Cultura', color: 'bg-[#F43F5E]', glow: 'shadow-[0_0_8px_#F43F5E]' },
  { name: 'Desporto', color: 'bg-[#86EFAC]', glow: 'shadow-[0_0_8px_#86EFAC]' },
  { name: 'Tecnologia', color: 'bg-[#F59E0B]', glow: 'shadow-[0_0_8px_#F59E0B]' },
];

const DEFAULT_SECONDARY_CATEGORY: MapHeroCategory = {
  name: 'Outros',
  color: 'bg-[#8B5CF6]',
  glow: 'shadow-[0_0_8px_#8B5CF6]',
};

export const GlobalWorldMapHero: React.FC<GlobalWorldMapHeroProps> = ({
  onButtonClick,
  onExploreMap,
  title = 'O mundo está acontecendo agora.',
  subtitle = 'Explore eventos em todo o planeta em tempo real.',
  buttonText = 'Explorar mapa interativo',
  categories = DEFAULT_EVENT_CATEGORIES,
  secondaryCategory = DEFAULT_SECONDARY_CATEGORY,
  className = '',
}) => {
  const handleAction = onButtonClick || onExploreMap;

  return (
    <div
      id="global-world-map-hero"
      className={`rounded-[20px] bg-[#050B1A] p-5 sm:p-6 lg:p-7 min-h-[280px] lg:min-h-[300px] flex flex-col text-white shadow-[0_12px_40px_rgba(5,11,26,0.35)] border border-slate-800/80 relative overflow-hidden group ${className}`}
    >
      {/* 1. Imagem de Alta Resolução do Mapa Mundi Noturno com Luzes das Cidades */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none scale-100 group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('/eventos-globais.png')`,
        }}
      />

      {/* Gradiente Escuro Suave para Garantir Contraste WCAG do Texto no Lado Esquerdo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050B1A]/95 via-[#050B1A]/70 to-[#050B1A]/20 pointer-events-none" />

      {/* Brilho atmosférico sutil no topo */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Coluna única de conteúdo: título/subtítulo descem um pouco do topo, e a legenda + botão
          ficam agrupados e "empurrados" para o rodapé do card via mt-auto */}
      <div className="relative z-10 flex flex-col flex-1 max-w-sm sm:max-w-md lg:max-w-lg">
        {/* 3. Conteúdo Textual Superior */}
        <div className="mt-3 sm:mt-5">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white leading-tight font-['Outfit'] tracking-tight">
            {title === 'O mundo está acontecendo agora.' ? (
              <>
                O mundo está
                <br />
                acontecendo agora.
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-slate-200 text-xs sm:text-[13.5px] lg:text-sm mt-2 leading-relaxed font-normal max-w-[210px]">
            {subtitle}
          </p>
        </div>

        {/* 4. Rodapé agrupado: Legenda de categorias + Botão logo abaixo dela */}
        <div className="mt-auto pt-6">
          {((categories && categories.length > 0) || secondaryCategory) && (
            <div className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-6 bg-[#0A1325]/85 border border-slate-700/60 rounded-full px-4 sm:px-6 py-2.5 text-xs backdrop-blur-md shadow-inner max-w-full">
              {[...(categories || []), ...(secondaryCategory ? [secondaryCategory] : [])].map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${item.color} ${item.glow || ''} shrink-0`} />
                  <span className="font-medium text-slate-200 text-[11px] sm:text-[12px] whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Botão Pill Gradiente Azul/Esmeralda — agora logo abaixo da legenda */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleAction}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052FE] via-[#007AFE] to-[#00C99E] hover:from-[#0042CC] hover:via-[#006CE0] hover:to-[#00A885] text-white text-xs sm:text-[13.5px] font-bold transition-all shadow-[0_4px_20px_rgba(0,201,158,0.35)] hover:shadow-[0_6px_24px_rgba(0,201,158,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
