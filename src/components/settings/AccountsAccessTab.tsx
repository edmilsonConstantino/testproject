import React, { useState } from 'react';
import {
  Users,
  Key,
  Shield,
  Smartphone,
  Laptop,
  CheckCircle2,
  Plus,
  Trash2,
  Mail,
  UserCheck,
  Clock,
  LogOut,
  Fingerprint,
  ChevronDown,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Proprietário' | 'Editor' | 'Visualizador';
  status: 'Ativo' | 'Pendente';
  addedDate: string;
  avatar?: string;
}

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export const AccountsAccessTab: React.FC = () => {
  // OAuth Connected Accounts (Social Login)
  const [socialLogins, setSocialLogins] = useState([
    {
      provider: 'Google',
      connected: true,
      email: 'divan.mellert@gmail.com',
      icon: '🌐',
    },
    {
      provider: 'Microsoft',
      connected: false,
      email: '',
      icon: '🪟',
    },
    {
      provider: 'Apple ID',
      connected: false,
      email: '',
      icon: '🍎',
    },
    {
      provider: 'LinkedIn',
      connected: true,
      email: 'divan-mellert',
      icon: '💼',
    },
  ]);

  // Team Access (Multi-user)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Divan Mellert',
      email: 'divan@vilaglobal.org',
      role: 'Proprietário',
      status: 'Ativo',
      addedDate: 'Criador da Conta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      name: 'Beatriz Vasconcelos',
      email: 'beatriz.v@vilaglobal.org',
      role: 'Editor',
      status: 'Ativo',
      addedDate: '14 Jan 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      name: 'Carlos Ndlovu',
      email: 'carlos.impact@ong.org',
      role: 'Visualizador',
      status: 'Pendente',
      addedDate: '02 Fev 2026',
    },
  ]);

  // Modal para convidar membro
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Editor' | 'Visualizador'>('Editor');

  // Sessões ativas
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: 'sess-1',
      device: 'MacBook Pro 16"',
      browser: 'Chrome 124 (macOS Sonoma)',
      location: 'Faro, Portugal',
      ip: '194.65.12.89',
      lastActive: 'Sessão atual (Ativa agora)',
      isCurrent: true,
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro',
      browser: 'VILA App iOS 18.2',
      location: 'Lisboa, Portugal',
      ip: '85.240.110.4',
      lastActive: 'Há 2 horas',
      isCurrent: false,
    },
  ]);

  // Passkeys & 2FA
  const [passkeysEnabled, setPasskeysEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const toggleSocialLogin = (provider: string) => {
    setSocialLogins((prev) =>
      prev.map((item) =>
        item.provider === provider
          ? {
              ...item,
              connected: !item.connected,
              email: !item.connected ? `${provider.toLowerCase()}@user.com` : '',
            }
          : item
      )
    );
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setTeamMembers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: 'Pendente',
        addedDate: 'Hoje',
      },
    ]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRevokeSession = (sessionId: string) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Métodos de Autenticação Pessoal */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Métodos de Autenticação Pessoal
            </h2>
            <p className="text-xs text-slate-500">
              Configure credenciais de acesso, palavras-passe e chaves biométricas (Passkeys).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* E-mail & Palavra-passe */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0F172A]">E-mail & Palavra-passe</span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Principal
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Utilizado para acesso padrão. Última alteração há 32 dias.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Formulário de alteração de senha')}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline text-left cursor-pointer"
            >
              Alterar palavra-passe →
            </button>
          </div>

          {/* Autenticação de Dois Fatores (2FA) */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0F172A]">2FA (App Autenticador)</span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Ativado
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Códigos de 6 dígitos via Google Authenticator ou 1Password.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline text-left cursor-pointer"
            >
              Gerir chaves de backup →
            </button>
          </div>

          {/* Passkeys / Biometria */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0F172A]">Passkeys / Biometria</span>
                <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                  Touch ID / Windows
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Entrada sem palavra-passe com hardware biométrico seguro (FIDO2).
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Passkey registada com sucesso!')}
              className="mt-3 text-xs font-semibold text-blue-600 hover:underline text-left cursor-pointer"
            >
              Adicionar nova Passkey →
            </button>
          </div>
        </div>
      </section>

      {/* 2. Contas Conectadas via OAuth (Login Social) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Contas Conectadas (Login Social OAuth)
            </h2>
            <p className="text-xs text-slate-500">
              Utilizadas exclusivamente para início de sessão rápido com provedores de identidade confiáveis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLogins.map((item) => (
            <div
              key={item.provider}
              className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{item.provider}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.connected ? item.email : 'Não associado'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleSocialLogin(item.provider)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  item.connected
                    ? 'border border-red-200 text-red-600 hover:bg-red-50'
                    : 'bg-[#2563EB] text-white hover:bg-blue-700'
                }`}
              >
                {item.connected ? 'Desconectar' : 'Conectar'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Gestão de Acessos de Equipa (Multi-usuário) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Gestão de Acessos de Equipa (Multi-usuário)
            </h2>
            <p className="text-xs text-slate-500">
              Conceda permissões a colaboradores para gerir iniciativas e relatórios na plataforma.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Convidar utilizador
          </button>
        </div>

        {/* Modal de Convite */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
              <h3 className="text-base font-bold text-[#0F172A]">Convidar novo membro para a equipa</h3>
              <p className="text-xs text-slate-500">
                O utilizador receberá um convite por e-mail com instruções para ativar o acesso.
              </p>
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-mail corporativo ou pessoal
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="exemplo@organizacao.org"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Papel / Nível de Acesso
                  </label>
                  <div className="relative">
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as any)}
                      className="w-full appearance-none px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 outline-none cursor-pointer"
                    >
                      <option value="Editor">Editor (Pode criar projetos, publicar eventos e gerir voluntários)</option>
                      <option value="Visualizador">Visualizador (Apenas leitura e visualização de dados)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-blue-700"
                  >
                    Enviar Convite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabela de Membros */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3 font-bold">Membro</th>
                <th className="py-2.5 px-3 font-bold">Papel</th>
                <th className="py-2.5 px-3 font-bold">Estado</th>
                <th className="py-2.5 px-3 font-bold">Data</th>
                <th className="py-2.5 px-3 text-right font-bold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                          {member.name[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#0F172A]">{member.name}</p>
                        <p className="text-[11px] text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      member.role === 'Proprietário'
                        ? 'bg-purple-100 text-purple-800'
                        : member.role === 'Editor'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-[11px] font-semibold ${
                      member.status === 'Ativo' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      ● {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">{member.addedDate}</td>
                  <td className="py-3 px-3 text-right">
                    {member.role !== 'Proprietário' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Remover acesso de ${member.name}?`)) {
                            setTeamMembers((prev) => prev.filter((m) => m.id !== member.id));
                          }
                        }}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Remover utilizador"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Sessões Ativas por Dispositivo */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] font-['Outfit']">
              Sessões Ativas por Dispositivo
            </h2>
            <p className="text-xs text-slate-500">
              Dispositivos com acesso concedido à sua conta pessoal da VILA.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (confirm('Deseja encerrar todas as outras sessões com exceção da atual?')) {
                setActiveSessions((prev) => prev.filter((s) => s.isCurrent));
              }
            }}
            className="text-xs font-bold text-red-600 hover:underline cursor-pointer self-start sm:self-auto"
          >
            Encerrar todas as outras sessões
          </button>
        </div>

        <div className="space-y-3">
          {activeSessions.map((sess) => (
            <div
              key={sess.id}
              className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  {sess.device.includes('iPhone') ? (
                    <Smartphone className="w-4 h-4" />
                  ) : (
                    <Laptop className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#0F172A]">{sess.device}</h4>
                    {sess.isCurrent && (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Esta Sessão
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {sess.browser} • {sess.location} (IP: {sess.ip})
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{sess.lastActive}</p>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  type="button"
                  onClick={() => handleRevokeSession(sess.id)}
                  className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                >
                  Encerrar
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
