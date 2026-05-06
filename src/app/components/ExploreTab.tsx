import type { CategoryItem, LeaderboardUser, TrendItem } from '../data/mockContent';

interface ExploreTabProps {
  categories: CategoryItem[];
  leaderboardUsers: LeaderboardUser[];
  trendingTopics: TrendItem[];
}

export function ExploreTab({ categories, leaderboardUsers, trendingTopics }: ExploreTabProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Explorer</h2>
        <input
          type="text"
          placeholder="Rechercher des tâches, personnes..."
          className="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <div key={category.title} className={`bg-gradient-to-br ${category.gradientClassName} rounded-2xl p-6 text-white`}>
            <div className="text-3xl mb-2">{category.emoji}</div>
            <div className="font-bold text-lg">{category.title}</div>
            <div className="text-sm opacity-90">{category.count}</div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">🏆 Top de la semaine</h3>
        <div className="bg-card rounded-2xl overflow-hidden border border-border text-card-foreground">
          {leaderboardUsers.map((user) => (
            <div key={user.rank} className="px-4 py-3 border-b border-border last:border-0 hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className={`size-8 rounded-full flex items-center justify-center font-bold ${
                    user.rank === 1 ? 'bg-yellow-400 text-yellow-900' : user.rank === 2 ? 'bg-muted text-foreground' : 'bg-orange-300 text-orange-900'
                  }`}
                >
                  {user.rank}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">Niveau {user.level} • {user.xp} XP</div>
                </div>
                <div className="text-2xl">{user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">🔥 Tendances</h3>
        <div className="bg-card rounded-2xl overflow-hidden border border-border text-card-foreground">
          {trendingTopics.map((trend) => (
            <div key={trend.challenge} className="px-4 py-3 border-b border-border last:border-0 hover:bg-accent transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-purple-600">{trend.challenge}</div>
                  <div className="text-sm text-muted-foreground">{trend.count} participants</div>
                </div>
                <div className="text-2xl">🔥</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

