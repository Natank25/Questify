import { ArrowLeft, Moon, Sun, Bell, Globe, Shield, Info, LogOut, Palette, Volume2, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { supabase } from '@/lib/supabase';

interface SettingsProps {
  onClose: () => void;
}

const sectionCardClassName = 'bg-card rounded-2xl overflow-hidden border border-border text-card-foreground';
const sectionHeaderClassName = 'px-4 py-3 border-b border-border';
const sectionItemClassName = 'w-full px-4 py-4 text-left hover:bg-accent transition-colors';
const mutedTextClassName = 'text-sm text-muted-foreground';
const toggleTrackClassName = 'relative w-14 h-8 rounded-full transition-colors';
const toggleKnobClassName = 'absolute top-1 left-1 size-6 rounded-full transition-transform bg-background';

export function Settings({ onClose }: SettingsProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let isActive = true;

    const verifyConnection = async () => {
      const connected = Boolean(
        supabase && !(await supabase.from('task_posts').select('id', { head: true }).limit(1)).error,
      );

      if (isActive) {
        setIsSupabaseConnected(connected);
      }
    };

    void verifyConnection();

    return () => {
      isActive = false;
    };
  }, []);

  const isDarkMode = isMounted ? resolvedTheme === 'dark' : false;

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <div className="size-full bg-background text-foreground overflow-y-auto">
      <div className="sticky top-0 z-10 bg-gradient-to-br from-purple-600 to-pink-500 p-4 text-white">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-white/20">
            <ArrowLeft className="size-6" />
          </button>
          <h1 className="text-xl font-bold">Paramètres</h1>
        </div>
      </div>

      <div className="space-y-4 p-4 pb-24">
        <div className={sectionCardClassName}>
          <div className={sectionHeaderClassName}>
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-purple-600" />
              <h2 className="font-bold">Apparence</h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="size-5 text-foreground/80" /> : <Sun className="size-5 text-foreground/80" />}
                  <div>
                    <div className="font-medium">Thème sombre</div>
                    <div className={mutedTextClassName}>Mode nuit pour tes yeux</div>
                  </div>
                </div>
                <button
                  onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                  className={`${toggleTrackClassName} ${isDarkMode ? 'bg-purple-600' : 'bg-muted'}`}
                >
                  <span className={`${toggleKnobClassName} ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={sectionCardClassName}>
          <div className={sectionHeaderClassName}>
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-purple-600" />
              <h2 className="font-bold">Notifications</h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Bell className="size-5 text-foreground/80" />
                  <div>
                    <div className="font-medium">Notifications push</div>
                    <div className={mutedTextClassName}>Recevoir les notifications</div>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`${toggleTrackClassName} ${notifications ? 'bg-purple-600' : 'bg-muted'}`}
                >
                  <span className={`${toggleKnobClassName} ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Volume2 className="size-5 text-foreground/80" />
                  <div>
                    <div className="font-medium">Sons</div>
                    <div className={mutedTextClassName}>Sons de notification</div>
                  </div>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`${toggleTrackClassName} ${soundEnabled ? 'bg-purple-600' : 'bg-muted'}`}
                >
                  <span className={`${toggleKnobClassName} ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-foreground/80" />
                  <div>
                    <div className="font-medium">Notifications email</div>
                    <div className={mutedTextClassName}>Recevoir des emails</div>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`${toggleTrackClassName} ${emailNotifications ? 'bg-purple-600' : 'bg-muted'}`}
                >
                  <span className={`${toggleKnobClassName} ${emailNotifications ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={sectionCardClassName}>
          <div className={sectionHeaderClassName}>
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-purple-600" />
              <h2 className="font-bold">Langue</h2>
            </div>
          </div>

          <div className="px-4 py-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="it">🇮🇹 Italiano</option>
            </select>
          </div>
        </div>

        <div className={sectionCardClassName}>
          <div className={sectionHeaderClassName}>
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-purple-600" />
              <h2 className="font-bold">Confidentialité et sécurité</h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            <button className={sectionItemClassName}>
              <div className="font-medium">Compte privé</div>
              <div className={`${mutedTextClassName} mt-1`}>Seuls tes abonnés peuvent voir tes tâches</div>
            </button>

            <button className={sectionItemClassName}>
              <div className="font-medium">Comptes bloqués</div>
              <div className={`${mutedTextClassName} mt-1`}>Gérer la liste des utilisateurs bloqués</div>
            </button>

            <button className={sectionItemClassName}>
              <div className="font-medium">Modifier le mot de passe</div>
              <div className={`${mutedTextClassName} mt-1`}>Changer ton mot de passe</div>
            </button>
          </div>
        </div>

        <div className={sectionCardClassName}>
          <div className={sectionHeaderClassName}>
            <div className="flex items-center gap-2">
              <Info className="size-5 text-purple-600" />
              <h2 className="font-bold">À propos</h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            <button className={sectionItemClassName}>
              <div className="font-medium">Conditions d'utilisation</div>
            </button>

            <button className={sectionItemClassName}>
              <div className="font-medium">Politique de confidentialité</div>
            </button>

            <button className={sectionItemClassName}>
              <div className="font-medium">Aide et support</div>
            </button>

            <div className="flex items-center justify-between px-4 py-4">
              <div>
                <div className="font-medium">Supabase</div>
                <div className={mutedTextClassName}>Statut de connexion</div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isSupabaseConnected === null
                    ? 'bg-muted text-muted-foreground'
                    : isSupabaseConnected
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {isSupabaseConnected === null ? 'Vérification' : isSupabaseConnected ? 'Connecté' : 'Déconnecté'}
              </span>
            </div>

            <div className="px-4 py-4">
              <div className="text-sm text-muted-foreground">Version 1.0.0</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => void handleSignOut()}
          disabled={!supabase}
          className="w-full rounded-2xl border border-border bg-card p-4 text-card-foreground transition-colors hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="flex items-center justify-center gap-2 text-red-600">
            <LogOut className="size-5" />
            <span className="font-medium">Se déconnecter</span>
          </div>
        </button>

        <button className="w-full p-4 text-center text-red-600 text-sm hover:underline">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}
