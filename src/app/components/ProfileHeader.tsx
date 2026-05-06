import { Settings, Trophy, Sparkles, Crown } from 'lucide-react';

export function ProfileHeader() {
  const currentXP = 2847;
  const nextLevelXP = 3000;
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-6 text-white">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
              alt="Profile"
              className="size-20 rounded-full border-4 border-white object-cover"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-purple-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Crown className="size-3" />
              <span className="text-xs font-bold">Niveau 12</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Alex Martin</h2>
            <p className="text-white/90 text-sm">@alexrunner</p>
            <div className="flex items-center gap-1 mt-2 bg-white/20 backdrop-blur px-2 py-1 rounded-full">
              <Trophy className="size-3" />
              <span className="text-xs font-semibold">Maître du ménage</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <Settings className="size-6" />
        </button>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <Sparkles className="size-4" />
            <span className="text-sm font-semibold">{currentXP.toLocaleString()} XP</span>
          </div>
          <span className="text-sm text-white/80">Prochain niveau: {nextLevelXP.toLocaleString()} XP</span>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-white/80 mt-1 text-right">
          Plus que {(nextLevelXP - currentXP).toLocaleString()} XP
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">248</div>
          <div className="text-sm text-white/90">Tâches</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">1.2k</div>
          <div className="text-sm text-white/90">Abonnés</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">856</div>
          <div className="text-sm text-white/90">Suivi(e)s</div>
        </div>
      </div>
    </div>
  );
}
