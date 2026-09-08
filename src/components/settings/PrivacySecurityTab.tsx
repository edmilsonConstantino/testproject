import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  Lock,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  KeyRound,
  Smartphone,
  History,
  Radio,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export const PrivacySecurityTab: React.FC = () => {
  // Visibilidade e Privacidade
  const [profileVisibility, setProfileVisibility] = useState<'publico' | 'membros' | 'conexoes'>('publico');
  const [whoCanContact, setWhoCanContact] = useState<'todos' | 'membros' | 'admin'>('membros');
  const [activityVisibility, setActivityVisibility] = useState<'publica' | 'resumida' | 'privada'>('publica');
  const [searchAppear, setSearchAppear] = useState(true);

  // Histórico e Retenção
  const [trackHistory, setTrackHistory] = useState(true);
  const [dataRetention, setDataRetention] = useState('1ano');

  // Privacidade de Comunicações
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [partnerInvites, setPartnerInvites] = useState(true);
  const [researchSurveys, setResearchSurveys] = useState(true);

  // Segurança da Conta (foco em Proteger Meus Dados)
  const [autoSecurityAlerts, setAutoSecurityAlerts] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // Apps de terceiros autorizadas
  const [authorizedApps, setAuthorizedApps] = useState([
    {
      id: 'vila-mobile',
      name: 'VILA Mobile iOS',
      accessDate: 'Conectado há 12 dias',
      scope: 'Acesso total de leitura e escrita ao perfil',
    },
    {
      id: 'global-impact-widget',
      name: 'Global Impact Embed Widget',
      accessDate: 'Conectado há 2 meses',
      scope: 'Acesso de leitura a métricas públicas de projetos',
    },
  ]);

  const [showToast, setShowToast] = useState(false);

  const handleRevokeApp = (appId: string) => {
    if (confirm('Tem certeza de que deseja revogar o acesso deste aplicativo?')) {
      setAuthorizedApps((prev) => prev.filter((app) => app.id !== appId));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2563EB] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-blue-600 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-5 h-5 text-blue-200" />
          <span className="text-xs sm:text-sm font-semibold">Configurações de privacidade guardadas!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Visibilidade do Perfil e Atividades */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                Visibilidade e Controlo de Perfil
              </h2>
              <p className="text-xs text-slate-500">
                Determine quem tem permissão para visualizar suas ações, informações e contactá-lo na rede.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Quem pode ver o perfil */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Quem pode ver o meu perfil público
              </label>
              <div className="relative">
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value as any)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="publico">Público (Qualquer visitante da internet)</option>
                  <option value="membros">Apenas membros registados na VILA</option>
                  <option value="conexoes">Apenas minhas conexões diretas</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Quem pode contactar diretamente */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Quem pode enviar-me mensagens diretas
              </label>
              <div className="relative">
                <select
                  value={whoCanContact}
                  onChange={(e) => setWhoCanContact(e.target.value as any)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="todos">Qualquer membro verificado da comunidade</option>
                  <option value="membros">Apenas membros com projetos em comum</option>
                  <option value="admin">Apenas a equipa de coordenação da VILA</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Visibilidade das atividades de impacto */}
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Visibilidade das minhas doações e voluntariado
              </label>
              <div className="relative">
                <select
                  value={activityVisibility}
                  onChange={(e) => setActivityVisibility(e.target.value as any)}
                  className="w-full appearance-none bg-white text-xs sm:text-sm text-slate-800 px-3.5 py-2.5 pr-9 rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
                >
                  <option value="publica">Pública (Exibir no feed de impacto global)</option>
                  <option value="resumida">Resumida (Sem valores financeiros, apenas iniciativas)</option>
                  <option value="privada">Privada (Apenas visível para mim)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Aparecer em pesquisas */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <h3 className="text-xs font-semibold text-[#0F172A]">
                  Aparecer nas pesquisas da plataforma
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Permite que líderes comunitários o encontrem para voluntariado.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={searchAppear}
                  onChange={(e) => setSearchAppear(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
              </label>
            </div>
          </div>
        </section>

        {/* 2. Histórico, Retenção e Exportação de Dados */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
                Histórico de Navegação e Retenção de Dados
              </h2>
              <p className="text-xs text-slate-500">
                Conformidade com o RGPD (Regulamento Geral sobre a Proteção de Dados).
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {/* Histórico de navegação */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0F172A] leading-tight">
                  Guardar histórico de navegação e buscas na VILA
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Usado apenas para sugerir projetos relevantes na sua área de residência.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Histórico de buscas limpo com sucesso.')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Limpar histórico
                </button>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={trackHistory}
                    onChange={(e) => setTrackHistory(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
            </div>

            {/* Retenção de Logs */}
            <div className="py-3 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#0F172A] leading-tight">
                  Período de retenção de logs de atividade
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Após este período, registros analíticos são permanentemente anonimizados.
                </p>
              </div>
              <select
                value={dataRetention}
                onChange={(e) => setDataRetention(e.target.value)}
                className="bg-slate-50 text-xs text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
              >
                <option value="90dias">90 dias</option>
                <option value="1ano">1 ano (Padrão)</option>
                <option value="2anos">2 anos</option>
              </select>
            </div>

            {/* Exportar e Eliminar Dados */}
            <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <div>
                  <h3 className="font-semibold text-[#0F172A]">
                    Download integral dos meus dados
                  </h3>
                  <p className="text-xs text-slate-500">
                    Obtenha um arquivo seguro (.zip) com todo o seu histórico, publicações e votos.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Download do arquivo de dados solicitado.')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Exportar Dados (JSON / CSV)
              </button>
            </div>
          </div>
        </section>

        {/* 3. Privacidade de Comunicações & Alertas de Segurança */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Comunicações */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit'] pb-2 border-b border-slate-100">
              Privacidade de Comunicações
            </h2>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">E-mails com novidades institucionais</p>
                  <p className="text-[11px] text-slate-500">Newsletter mensal e relatórios da VILA</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEmails}
                  onChange={(e) => setMarketingEmails(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">Convites para eventos de parceiros</p>
                  <p className="text-[11px] text-slate-500">Cimeiras e workshops de ONGs parceiras</p>
                </div>
                <input
                  type="checkbox"
                  checked={partnerInvites}
                  onChange={(e) => setPartnerInvites(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">Inquéritos de medição de impacto</p>
                  <p className="text-[11px] text-slate-500">Ajudar a avaliar resultados de projetos</p>
                </div>
                <input
                  type="checkbox"
                  checked={researchSurveys}
                  onChange={(e) => setResearchSurveys(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>
            </div>
          </section>

          {/* Proteção dos Dados e Alertas de Segurança */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit'] pb-2 border-b border-slate-100">
              Alertas de Segurança Automáticos
            </h2>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-900">Monitorização Ativa</h4>
                  <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
                    A sua conta está protegida com cifra AES-256 e monitorizada contra acessos anómalos.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2">
                <div>
                  <p className="font-semibold text-slate-800">Aviso imediato de novo dispositivo</p>
                  <p className="text-[11px] text-slate-500">Receber e-mail urgente se houver login desconhecido</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={autoSecurityAlerts}
                    onChange={(e) => setAutoSecurityAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]" />
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* 4. Permissões de Aplicativos de Terceiros */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Aplicações de Terceiros Autorizadas
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              {authorizedApps.length} autorizações ativas
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {authorizedApps.map((app) => (
              <div key={app.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{app.name}</h4>
                  <p className="text-[11px] text-slate-500">{app.scope}</p>
                  <span className="text-[10px] text-slate-400">{app.accessDate}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRevokeApp(app.id)}
                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Revogar Acesso
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Botão Salvar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            Guardar definições de privacidade
          </button>
        </div>
      </form>
    </div>
  );
};
