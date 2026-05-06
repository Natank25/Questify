import { ArrowLeft, Moon, Sun, Bell, Globe, Shield, Info, LogOut, Palette, Volume2, Mail } from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [language, setLanguage] = useState('fr');

  return (
    <div className="size-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-4 text-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6" />
          </button>
          <h1 className="text-xl font-bold">Paramètres</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Apparence */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Palette className="size-5 text-purple-600" />
              <h2 className="font-bold">Apparence</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="size-5 text-gray-700" /> : <Sun className="size-5 text-gray-700" />}
                  <div>
                    <div className="font-medium">Thème sombre</div>
                    <div className="text-sm text-gray-600">Mode nuit pour tes yeux</div>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    darkMode ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 size-6 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-purple-600" />
              <h2 className="font-bold">Notifications</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="size-5 text-gray-700" />
                  <div>
                    <div className="font-medium">Notifications push</div>
                    <div className="text-sm text-gray-600">Recevoir les notifications</div>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 size-6 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 className="size-5 text-gray-700" />
                  <div>
                    <div className="font-medium">Sons</div>
                    <div className="text-sm text-gray-600">Sons de notification</div>
                  </div>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    soundEnabled ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 size-6 bg-white rounded-full transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="size-5 text-gray-700" />
                  <div>
                    <div className="font-medium">Notifications email</div>
                    <div className="text-sm text-gray-600">Recevoir des emails</div>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    emailNotifications ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 size-6 bg-white rounded-full transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Langue */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-purple-600" />
              <h2 className="font-bold">Langue</h2>
            </div>
          </div>

          <div className="px-4 py-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="it">🇮🇹 Italiano</option>
            </select>
          </div>
        </div>

        {/* Confidentialité */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-purple-600" />
              <h2 className="font-bold">Confidentialité et sécurité</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="font-medium">Compte privé</div>
              <div className="text-sm text-gray-600 mt-1">Seuls tes abonnés peuvent voir tes tâches</div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="font-medium">Comptes bloqués</div>
              <div className="text-sm text-gray-600 mt-1">Gérer la liste des utilisateurs bloqués</div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="font-medium">Modifier le mot de passe</div>
              <div className="text-sm text-gray-600 mt-1">Changer ton mot de passe</div>
            </button>
          </div>
        </div>

        {/* À propos */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Info className="size-5 text-purple-600" />
              <h2 className="font-bold">À propos</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="font-medium">Conditions d'utilisation</div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="font-medium">Politique de confidentialité</div>
            </button>

            <button className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors">
              <div className="font-medium">Aide et support</div>
            </button>

            <div className="px-4 py-4">
              <div className="text-sm text-gray-600">Version 1.0.0</div>
            </div>
          </div>
        </div>

        {/* Déconnexion */}
        <button className="w-full bg-white rounded-2xl p-4 border border-gray-100 hover:bg-red-50 hover:border-red-200 transition-colors">
          <div className="flex items-center justify-center gap-2 text-red-600">
            <LogOut className="size-5" />
            <span className="font-medium">Se déconnecter</span>
          </div>
        </button>

        {/* Supprimer le compte */}
        <button className="w-full p-4 text-center text-red-600 text-sm hover:underline">
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
}
