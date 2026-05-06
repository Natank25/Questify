import { useState } from 'react';
import { TaskPost } from './components/TaskPost';
import { StatsCard } from './components/StatsCard';
import { WeeklyChart } from './components/WeeklyChart';
import { BottomNav } from './components/BottomNav';
import { ProfileHeader } from './components/ProfileHeader';
import { AddTaskModal } from './components/AddTaskModal';
import { CheckCircle2, ThumbsUp, Sparkles, Trophy } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === 'add') {
      setShowAddModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const mockTasks = [
    {
      user: {
        name: 'Sophie Leblanc',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        level: 15
      },
      task: {
        type: 'cleaning' as const,
        title: 'Grand ménage de printemps',
        description: 'Toute la maison nickel ! 3h de travail',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
        difficulty: 'hard' as const,
        xpGained: 125
      },
      stats: {
        likes: 245,
        dislikes: 12,
        comments: 18
      },
      timestamp: 'il y a 2h'
    },
    {
      user: {
        name: 'Marc Dupont',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        level: 8
      },
      task: {
        type: 'cooking' as const,
        title: 'Lasagnes maison pour 6',
        description: 'Recette de ma grand-mère 👌',
        image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
        difficulty: 'medium' as const,
        xpGained: 120
      },
      stats: {
        likes: 412,
        dislikes: 8,
        comments: 32
      },
      timestamp: 'il y a 5h'
    },
    {
      user: {
        name: 'Emma Bernard',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        level: 22
      },
      task: {
        type: 'dishes' as const,
        title: 'Vaisselle après la fête',
        description: 'Soirée d\'hier, beaucoup de vaisselle !',
        image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
        difficulty: 'medium' as const,
        xpGained: 45
      },
      stats: {
        likes: 189,
        dislikes: 5,
        comments: 12
      },
      timestamp: 'il y a 1j'
    },
    {
      user: {
        name: 'Thomas Petit',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        level: 11
      },
      task: {
        type: 'laundry' as const,
        title: 'Lessive + repassage',
        description: 'Toutes les chemises de la semaine',
        image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800',
        difficulty: 'easy' as const,
        xpGained: 40
      },
      stats: {
        likes: 156,
        dislikes: 3,
        comments: 8
      },
      timestamp: 'il y a 1j'
    }
  ];

  return (
    <div className="size-full bg-gray-50 overflow-hidden flex flex-col max-w-lg mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'feed' && (
          <div>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="px-4 py-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  TaskQuest
                </h1>
                <p className="text-xs text-gray-600">Transforme tes tâches en victoires 🏆</p>
              </div>
            </div>

            {/* Feed */}
            <div className="space-y-0">
              {mockTasks.map((task, index) => (
                <TaskPost key={index} {...task} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Explorer</h2>
              <input
                type="text"
                placeholder="Rechercher des tâches, personnes..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-2">🧹</div>
                <div className="font-bold text-lg">Ménage</div>
                <div className="text-sm opacity-90">24.3k tâches</div>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-2">🍽️</div>
                <div className="font-bold text-lg">Vaisselle</div>
                <div className="text-sm opacity-90">32.1k tâches</div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-2">👨‍🍳</div>
                <div className="font-bold text-lg">Cuisine</div>
                <div className="text-sm opacity-90">18.7k tâches</div>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
                <div className="text-3xl mb-2">🧺</div>
                <div className="font-bold text-lg">Lessive</div>
                <div className="text-sm opacity-90">15.2k tâches</div>
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <h3 className="font-bold text-lg mb-3">🏆 Top de la semaine</h3>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {[
                  { name: 'Marie L.', level: 34, xp: 3420, rank: 1 },
                  { name: 'Jean P.', level: 31, xp: 3180, rank: 2 },
                  { name: 'Lucas M.', level: 28, xp: 2950, rank: 3 },
                ].map((user, i) => (
                  <div key={i} className="px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                        user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                        'bg-orange-300 text-orange-900'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">Niveau {user.level} • {user.xp} XP</div>
                      </div>
                      <div className="text-2xl">
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div>
              <h3 className="font-bold text-lg mb-3">🔥 Tendances</h3>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {[
                  { challenge: '#DéfiMénageMai', count: 2847 },
                  { challenge: '#CuisineMaison', count: 1923 },
                  { challenge: '#ZeroDéchet', count: 1456 }
                ].map((trend, i) => (
                  <div key={i} className="px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-purple-600">{trend.challenge}</div>
                        <div className="text-sm text-gray-600">{trend.count} participants</div>
                      </div>
                      <div className="text-2xl">🔥</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <div className="space-y-3">
              {[
                { type: 'like', user: 'Sophie', task: 'a aimé ton ménage', time: 'il y a 5min', xp: 5 },
                { type: 'comment', user: 'Marc', task: 'a commenté ta cuisine', time: 'il y a 1h', xp: 0 },
                { type: 'follow', user: 'Emma', task: 'a commencé à te suivre', time: 'il y a 2h', xp: 0 },
                { type: 'level', user: 'Tu', task: 'es passé niveau 13 !', time: 'il y a 3h', xp: 0 },
                { type: 'achievement', user: 'Tu', task: 'as débloqué "Roi du rangement"', time: 'il y a 5h', xp: 100 },
              ].map((notif, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      {notif.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-semibold">{notif.user}</span>
                        {' '}
                        <span className="text-gray-600">{notif.task}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{notif.time}</span>
                        {notif.xp > 0 && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                            +{notif.xp} XP
                          </span>
                        )}
                      </div>
                    </div>
                    {notif.type === 'like' && <span className="text-xl">👍</span>}
                    {notif.type === 'comment' && <span className="text-xl">💬</span>}
                    {notif.type === 'level' && <span className="text-xl">⬆️</span>}
                    {notif.type === 'achievement' && <span className="text-xl">🏆</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <ProfileHeader />

            <div className="p-4 space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  icon={CheckCircle2}
                  label="Tâches complétées"
                  value="248"
                  subtitle="Ce mois-ci"
                  color="bg-green-600"
                />
                <StatsCard
                  icon={Sparkles}
                  label="XP total"
                  value="12.4k"
                  subtitle="Tous les temps"
                  color="bg-purple-600"
                />
                <StatsCard
                  icon={ThumbsUp}
                  label="Likes reçus"
                  value="3.2k"
                  subtitle="Total"
                  color="bg-blue-500"
                />
                <StatsCard
                  icon={Trophy}
                  label="Achievements"
                  value="23/50"
                  subtitle="Débloqués"
                  color="bg-yellow-500"
                />
              </div>

              {/* Weekly Chart */}
              <WeeklyChart />

              {/* Achievements */}
              <div>
                <h3 className="font-bold text-lg mb-3">🏆 Derniers achievements</h3>
                <div className="space-y-2">
                  {[
                    { emoji: '👑', title: 'Roi du rangement', desc: '100 tâches de rangement', rarity: 'legendary' },
                    { emoji: '🔥', title: 'Série de 7 jours', desc: 'Une tâche par jour', rarity: 'rare' },
                    { emoji: '⭐', title: 'Maître chef', desc: '50 repas cuisinés', rarity: 'epic' },
                  ].map((achievement, i) => (
                    <div key={i} className={`rounded-xl p-4 border-2 flex items-center gap-3 ${
                      achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400' :
                      achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400' :
                      'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400'
                    }`}>
                      <div className="text-3xl">{achievement.emoji}</div>
                      <div className="flex-1">
                        <div className="font-bold">{achievement.title}</div>
                        <div className="text-sm text-gray-600">{achievement.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Tasks */}
              <div>
                <h3 className="font-bold text-lg mb-3">Tâches récentes</h3>
                <div className="space-y-2">
                  {[
                    { emoji: '🧹', title: 'Ménage salon', xp: 75, date: 'Aujourd\'hui' },
                    { emoji: '🍽️', title: 'Vaisselle', xp: 45, date: 'Hier' },
                    { emoji: '🧺', title: 'Lessive', xp: 40, date: 'Il y a 2j' },
                  ].map((task, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                      <div className="text-3xl">{task.emoji}</div>
                      <div className="flex-1">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-purple-600">+{task.xp} XP</div>
                      </div>
                      <div className="text-xs text-gray-500">{task.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Add Task Modal */}
      {showAddModal && (
        <AddTaskModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}