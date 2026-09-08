import React, { useState } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Moon,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  Volume2,
  Calendar,
} from 'lucide-react';

interface NotificationMatrixRow {
  id: string;
  category: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  mobile: boolean;
}

export const NotificationsTab: React.FC = () => {
  // Canais principais
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [mobileEnabled, setMobileEnabled] = useState(true);

  // Horário de Silêncio
  const [quietHoursActive, setQuietHoursActive] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');
  const [allowEmergencies, setAllowEmergencies] = useState(true);
  const [quietDays, setQuietDays] = useState<'todos' | 'semana' | 'fimdesemana'>('todos');

  // Matriz de Tipos de Notificação x Canal
  const [matrix, setMatrix] = useState<NotificationMatrixRow[]>([
    {
      id: 'novos_projetos',
      category: 'Novas iniciativas na minha área de interesse',
      description: 'Avisos quando são lançados projetos alinhados aos seus temas favoritos.',
      email: true,
      push: true,
      sms: false,
      mobile: true,
    },
    {
      id: 'atualizacoes_seguidas',
      category: 'Atualizações de projetos que sigo',
      description: 'Relatórios de progresso, marcos alcançados e novas fases de implementação.',
      email: true,
      push: true,
      sms: false,
      mobile: true,
    },
    {
      id: 'atividades_comunidade',
      category: 'Atividades da comunidade e eventos locais',
      description: 'Encontros presenciais, fóruns regionais e voluntariado comunitário.',
      email: false,
      push: true,
      sms: false,
      mobile: true,
    },
    {
      id: 'mensagens_mencoes',
      category: 'Mensagens diretas e menções',
      description: 'Quando outro membro envia mensagem direta ou menciona o seu perfil.',
      email: true,
      push: true,
      sms: true,
      mobile: true,
    },
    {
      id: 'impacto_financeiro',
      category: 'Impacto financeiro e comprovativos de doação',
      description: 'Recibos fiscais, prestação de contas de fundos e metas de financiamento.',
      email: true,
      push: false,
      sms: false,
      mobile: true,
    },
    {
      id: 'alertas_criticos',
      category: 'Alertas críticos e emergências humanitárias',
      description: 'Situações urgentes de socorro climático ou apelos de ação imediata.',
      email: true,
      push: true,
      sms: true,
      mobile: true,
    },
  ]);

  // Preview format: desktop vs mobile
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('mobile');
  const [showSavedToast, setShowSavedToast] = useState(false);

  const toggleCell = (rowId: string, channel: 'email' | 'push' | 'sms' | 'mobile') => {
    setMatrix((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, [channel]: !row[channel] } : row
      )
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
          <span className="text-xs sm:text-sm font-semibold">Configuração de notificações atualizada!</span>
        </div>
      )}

      {/* 1. Canais de Envio (Cards Superiores) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Canais de Comunicação
            </h2>
            <p className="text-xs text-slate-500">
              Ative ou pause cada um dos canais disponíveis para entrega de alertas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Canal: E-mail */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">E-mail</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                divan@vilaglobal.org
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {emailEnabled ? 'Verificado & Ativo' : 'Pausado'}
            </div>
          </div>

          {/* Canal: Push Notificações */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushEnabled}
                    onChange={(e) => setPushEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">Navegador Web / Push</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Google Chrome (macOS)
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {pushEnabled ? 'Autorizado' : 'Silenciado'}
            </div>
          </div>

          {/* Canal: SMS */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsEnabled}
                    onChange={(e) => setSmsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">SMS / Mensagens de Texto</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                +351 912 345 678
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${smsEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              {smsEnabled ? 'Ativo para emergências' : 'Desativado'}
            </div>
          </div>

          {/* Canal: App Mobile VILA */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col justify-between transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mobileEnabled}
                    onChange={(e) => setMobileEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">App Mobile VILA</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                iPhone 15 Pro (iOS 18)
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {mobileEnabled ? 'Sincronizado' : 'Silenciado'}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Matriz de Notificações por Canal */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Matriz de Notificações × Canal
            </h2>
            <p className="text-xs text-slate-500">
              Defina com precisão por onde cada tipo de notificação será entregue.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMatrix((prev) =>
                prev.map((row) => ({
                  ...row,
                  email: true,
                  push: true,
                  sms: row.id === 'alertas_criticos',
                  mobile: true,
                }))
              );
            }}
            className="text-xs font-semibold text-blue-600 hover:underline self-start sm:self-auto cursor-pointer"
          >
            Restaurar recomendadas
          </button>
        </div>

        {/* Tabela Responsiva */}
        <div className="overflow-x-auto -mx-5 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 font-bold">Tipo de Notificação</th>
                <th className="py-3 px-3 text-center font-bold">E-mail</th>
                <th className="py-3 px-3 text-center font-bold">Web Push</th>
                <th className="py-3 px-3 text-center font-bold">SMS</th>
                <th className="py-3 px-3 text-center font-bold">Mobile App</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {matrix.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-[#0F172A] leading-tight">
                      {row.category}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {row.description}
                    </p>
                  </td>

                  {/* E-mail cell */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      type="button"
                      disabled={!emailEnabled}
                      onClick={() => toggleCell(row.id, 'email')}
                      className={`w-6 h-6 rounded-md mx-auto flex items-center justify-center transition-all cursor-pointer ${
                        !emailEnabled
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-300'
                          : row.email
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'border border-slate-300 bg-white text-transparent hover:border-slate-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </td>

                  {/* Web Push cell */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      type="button"
                      disabled={!pushEnabled}
                      onClick={() => toggleCell(row.id, 'push')}
                      className={`w-6 h-6 rounded-md mx-auto flex items-center justify-center transition-all cursor-pointer ${
                        !pushEnabled
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-300'
                          : row.push
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'border border-slate-300 bg-white text-transparent hover:border-slate-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </td>

                  {/* SMS cell */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      type="button"
                      disabled={!smsEnabled}
                      onClick={() => toggleCell(row.id, 'sms')}
                      className={`w-6 h-6 rounded-md mx-auto flex items-center justify-center transition-all cursor-pointer ${
                        !smsEnabled
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-300'
                          : row.sms
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'border border-slate-300 bg-white text-transparent hover:border-slate-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </td>

                  {/* Mobile App cell */}
                  <td className="py-3.5 px-3 text-center">
                    <button
                      type="button"
                      disabled={!mobileEnabled}
                      onClick={() => toggleCell(row.id, 'mobile')}
                      className={`w-6 h-6 rounded-md mx-auto flex items-center justify-center transition-all cursor-pointer ${
                        !mobileEnabled
                          ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-300'
                          : row.mobile
                          ? 'bg-[#2563EB] text-white shadow-2xs'
                          : 'border border-slate-300 bg-white text-transparent hover:border-slate-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Horário de Silêncio & Pré-visualização Lado a Lado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Horário de Silêncio (Não Incomodar) */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                  Horário de Silêncio (Não Incomodar)
                </h2>
                <p className="text-xs text-slate-500">
                  Suspender notificações automáticas e sons durante o período de descanso.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={quietHoursActive}
                onChange={(e) => setQuietHoursActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
            </label>
          </div>

          {quietHoursActive && (
            <div className="space-y-4 animate-in fade-in duration-200 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Início do silêncio
                  </label>
                  <input
                    type="time"
                    value={quietStart}
                    onChange={(e) => setQuietStart(e.target.value)}
                    className="w-full bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Fim do silêncio
                  </label>
                  <input
                    type="time"
                    value={quietEnd}
                    onChange={(e) => setQuietEnd(e.target.value)}
                    className="w-full bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Dias aplicáveis
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'todos', label: 'Todos os dias' },
                    { id: 'semana', label: 'Dias úteis (Seg–Sex)' },
                    { id: 'fimdesemana', label: 'Fins de semana' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setQuietDays(d.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        quietDays === d.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-transparent'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">
                    Permitir alertas de emergência humanitária crítica
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={allowEmergencies}
                  onChange={(e) => setAllowEmergencies(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}
        </section>

        {/* Pré-visualização ao Vivo */}
        <section className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                Pré-visualização do Aviso
              </h2>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  previewDevice === 'mobile'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Mobile
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  previewDevice === 'desktop'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Desktop
              </button>
            </div>
          </div>

          {/* Render do Mock de Notificação */}
          {previewDevice === 'mobile' ? (
            <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-md space-y-2 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-[9px]">
                    V
                  </div>
                  <span className="font-bold text-slate-200">VILA APP</span>
                </div>
                <span>agora mesmo</span>
              </div>
              <h4 className="text-xs font-bold text-white">
                Novo Marco Alcançado no Algarve! 🌊
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                O projeto "Ria Formosa Regenerativa" completou 100% da sua meta de limpeza costeira com 42 voluntários.
              </p>
              <div className="pt-2 flex gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold cursor-pointer">
                  Ver Projeto
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-medium cursor-pointer">
                  Dispensar
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-white border border-slate-300 shadow-lg space-y-2 max-w-sm ml-auto">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-black text-xs">
                    VILA
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">
                      Mensagem de Ana Silveira
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      "Olá Divan, atualizámos os indicadores da iniciativa de microcrédito comunitário."
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">12:42</span>
              </div>
              <div className="text-[11px] text-blue-600 font-semibold text-right pt-1">
                Responder na VILA →
              </div>
            </div>
          )}

          <p className="text-[11px] text-slate-400 text-center">
            As notificações respeitam o idioma da interface ({previewDevice === 'mobile' ? 'iOS / Android' : 'Chrome / Safari'}).
          </p>
        </section>
      </div>

      {/* Botão de Guardar */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
        >
          Guardar preferências de avisos
        </button>
      </div>
    </div>
  );
};
