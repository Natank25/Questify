import { CheckCircle2, ThumbsUp, Sparkles, Trophy } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { StatsCard } from './StatsCard';
import { WeeklyChart } from './WeeklyChart';
import type { AchievementItem, RecentTaskItem } from '../data/mockContent';

interface ProfileTabProps {
  onSettingsClick: () => void;
  achievements: AchievementItem[];
  recentTasks: RecentTaskItem[];
}

export function ProfileTab({ onSettingsClick, achievements, recentTasks }: ProfileTabProps) {
  return (
    <div>
      <ProfileHeader onSettingsClick={onSettingsClick} />

      <div className="p-4 space-y-4">
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

        <WeeklyChart />

        <div>
          <h3 className="font-bold text-lg mb-3">🏆 Derniers achievements</h3>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`rounded-xl p-4 border-2 flex items-center gap-3 ${
                  achievement.rarity === 'legendary'
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400'
                    : achievement.rarity === 'epic'
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400'
                      : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400'
                }`}
              >
                <div className="text-3xl">{achievement.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Tâches récentes</h3>
          <div className="space-y-2">
            {recentTasks.map((task, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
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
  );
}

