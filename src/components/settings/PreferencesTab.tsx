import React, { useState } from 'react';
import {
  Globe,
  Coins,
  Calendar,
  Clock,
  Ruler,
  Compass,
  CheckCircle2,
  Sliders,
  Check,
  Eye,
  Minimize2,
  Sparkles,
  MapPin,
  Tag,
  ChevronDown,
} from 'lucide-react';

export const PreferencesTab: React.FC = () => {
  // General platform settings
  const [platformLanguage, setPlatformLanguage] = useState('pt-PT');
  const [contentLanguage, setContentLanguage] = useState('pt');
  const [currency, setCurrency] = useState('EUR');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [regionOfInterest, setRegionOfInterest] = useState('europa-sul');

  // Experience Mode
  const [experienceMode, setExperienceMode] = useState<'equilibrada' | 'local' | 'global' | 'personalizado'>('equilibrada');

  // Categories of Interest (Theme Checklist)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'ambiente',
    'educacao',
    'saude',
    'direitos',
    'empreendedorismo',
  ]);

  // Accessibility
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'padrao' | 'medio' | 'grande'>('padrao');

  // Save notice state
  const [showSavedToast, setShowSavedToast] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast de Confirmação */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2563EB] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-blue-600 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-blue-200" />
          <span className="text-xs sm:text-sm font-semibold">Preferências atualizadas com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Secção: Localização, Idioma e Formatação */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                Idioma, Região e Formatos
              </h2>
              <p className="text-xs text-slate-500">
                Configure os padrões numéricos, regionais e linguísticos da sua experiência na VILA.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Idioma da Interface */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Idioma da interface
              </label>
              <div className="relative">
                <select
                  value={platformLanguage}
                  onChange={(e) => setPlatformLanguage(e.target.value)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
                >
                  <option value="pt-PT">Português (Portugal)</option>
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (United States)</option>
                  <option value="es-ES">Español (España)</option>
                  <option value="fr-FR">Français</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Idioma de Conteúdo Preferencial */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Idioma dos conteúdos e projetos
              </label>
              <div className="relative">
                <select
                  value={contentLanguage}
                  onChange={(e) => setContentLanguage(e.target.value)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
                >
                  <option value="pt">Priorizar conteúdos em Português</option>
                  <option value="all">Multilíngue (Exibir no idioma original)</option>
                  <option value="en">Priorizar conteúdos em Inglês</option>
                  <option value="es">Priorizar conteúdos em Espanhol</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Região de Interesse Primária */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Região de interesse principal
              </label>
              <div className="relative">
                <select
                  value={regionOfInterest}
                  onChange={(e) => setRegionOfInterest(e.target.value)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
                >
                  <option value="europa-sul">Europa do Sul (Portugal, Espanha, Itália)</option>
                  <option value="africa-palop">África Austral & Lusófona (Moçambique, Angola)</option>
                  <option value="america-sul">América do Sul (Brasil e Cone Sul)</option>
                  <option value="global">Todas as Regiões (Visão Global Aberta)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Moeda Padrão */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Moeda preferida
              </label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
                >
                  <option value="EUR">EUR (€) – Euro</option>
                  <option value="USD">USD ($) – Dólar Americano</option>
                  <option value="BRL">BRL (R$) – Real Brasileiro</option>
                  <option value="MZN">MZN (MT) – Metical Moçambicano</option>
                  <option value="AOA">AOA (Kz) – Kwanza Angolano</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Formato de Data */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Formato de data
              </label>
              <div className="relative">
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none cursor-pointer"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (Ex: 08/09/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (Ex: 09/08/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (ISO 8601)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Formato de Hora & Unidades */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Formato de hora e unidades
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={timeFormat}
                  onChange={(e) => setTimeFormat(e.target.value)}
                  className="bg-white text-xs sm:text-sm text-slate-800 px-2.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="24h">24 horas</option>
                  <option value="12h">12 horas (AM/PM)</option>
                </select>

                <select
                  value={unitSystem}
                  onChange={(e) => setUnitSystem(e.target.value)}
                  className="bg-white text-xs sm:text-sm text-slate-800 px-2.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="metric">Métrico (km, ºC)</option>
                  <option value="imperial">Imperial (mi, ºF)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Secção: Personalização da Experiência */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                Personalização da experiência
              </h2>
              <p className="text-xs text-slate-500">
                Escolha como a plataforma calibra o feed inicial, os destaques e as recomendações de impacto.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                id: 'equilibrada',
                title: 'Vista equilibrada',
                badge: 'Recomendado',
                desc: 'Combinação inteligente de iniciativas da sua região com os maiores movimentos globais.',
              },
              {
                id: 'local',
                title: 'Foco local',
                badge: 'Comunitário',
                desc: 'Prioriza projetos, voluntariado e eventos perto da sua cidade ou país de residência.',
              },
              {
                id: 'global',
                title: 'Foco global',
                badge: 'Internacional',
                desc: 'Destaque para cimeiras internacionais, ODS da ONU e projetos transfronteiriços.',
              },
              {
                id: 'personalizado',
                title: 'Personalizado',
                badge: 'Avançado',
                desc: 'Permite controle cirúrgico de filtros por país, categoria e objetivos específicos.',
              },
            ].map((mode) => {
              const isSelected = experienceMode === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => setExperienceMode(mode.id as any)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/40 ring-2 ring-blue-600/10 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {mode.badge}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>

                    <h3 className="text-xs font-bold text-[#0F172A] font-['Outfit'] mb-1">
                      {mode.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Secção: Categorias de Interesse (Checklist de Temas) */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                  Categorias de interesse
                </h2>
                <p className="text-xs text-slate-500">
                  Selecione os temas que mais ressoam com os seus valores para personalizar o seu ecossistema.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500">
              {selectedCategories.length} selecionadas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { id: 'ambiente', label: 'Clima & Ambiente', icon: '🌿' },
              { id: 'educacao', label: 'Educação para Todos', icon: '📚' },
              { id: 'saude', label: 'Saúde & Bem-Estar', icon: '❤️' },
              { id: 'direitos', label: 'Direitos Humanos', icon: '⚖️' },
              { id: 'empreendedorismo', label: 'Empreendedorismo Social', icon: '🚀' },
              { id: 'cultura', label: 'Arte & Cultura', icon: '🎭' },
              { id: 'tecnologia', label: 'Tecnologia Cívica', icon: '💻' },
              { id: 'agua', label: 'Água Limpa & Saneamento', icon: '💧' },
              { id: 'igualdade', label: 'Igualdade de Gênero', icon: '👥' },
              { id: 'fome-zero', label: 'Combate à Fome & Pobreza', icon: '🌱' },
            ].map((theme) => {
              const isChecked = selectedCategories.includes(theme.id);
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => toggleCategory(theme.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                    isChecked
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm shrink-0">{theme.icon}</span>
                    <span className="text-xs truncate">{theme.label}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                    isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Secção: Acessibilidade */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                Acessibilidade e usabilidade
              </h2>
              <p className="text-xs text-slate-500">
                Ajuste a legibilidade, movimento e densidade para uma navegação confortável.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Modo de Acessibilidade / Leitor de Ecrã */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0F172A] leading-tight">
                  Modo de acessibilidade otimizado
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aprimora as tags ARIA e simplifica elementos visuais para tecnologias assistivas.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={accessibilityMode}
                  onChange={(e) => setAccessibilityMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
              </label>
            </div>

            {/* Reduzir Animações */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0F172A] leading-tight">
                  Reduzir animações e transições
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diminui transições de ecrã e desliga rotações no globo 3D.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={(e) => setReduceMotion(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
              </label>
            </div>

            {/* Modo Compacto */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0F172A] leading-tight">
                  Modo compacto
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aumenta a densidade de informação reduzindo margens e preenchimentos.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={compactMode}
                  onChange={(e) => setCompactMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
              </label>
            </div>

            {/* Escala de Tipografia */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0F172A] leading-tight">
                  Tamanho da fonte do texto
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ajuste a escala base das tipografias em todo o aplicativo.
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'padrao', label: 'Padrão' },
                  { id: 'medio', label: 'Médio (+10%)' },
                  { id: 'grande', label: 'Grande (+20%)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontSize(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      fontSize === f.id
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Botão de Submissão */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            Guardar preferências
          </button>
        </div>
      </form>
    </div>
  );
};
