export type TaskType = 'cleaning' | 'dishes' | 'cooking' | 'laundry' | 'shopping' | 'organizing';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface FeedTask {
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  task: {
    type: TaskType;
    title: string;
    description?: string;
    image: string;
    difficulty: TaskDifficulty;
    xpGained: number;
  };
  stats: {
    likes: number;
    dislikes: number;
    comments: number;
  };
  timestamp: string;
}

export interface CategoryItem {
  emoji: string;
  title: string;
  count: string;
  gradientClassName: string;
}

export interface LeaderboardUser {
  name: string;
  level: number;
  xp: number;
  rank: 1 | 2 | 3;
}

export interface TrendItem {
  challenge: string;
  count: number;
}

export type NotificationType = 'like' | 'comment' | 'follow' | 'level' | 'achievement';

export interface NotificationItem {
  type: NotificationType;
  user: string;
  task: string;
  time: string;
  xp: number;
}

export interface AchievementItem {
  emoji: string;
  title: string;
  desc: string;
  rarity: 'legendary' | 'rare' | 'epic';
}

export interface RecentTaskItem {
  emoji: string;
  title: string;
  xp: number;
  date: string;
}

export const feedTasks: FeedTask[] = [
  {
    user: {
      name: 'Sophie Leblanc',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      level: 15,
    },
    task: {
      type: 'cleaning',
      title: 'Grand ménage de printemps',
      description: 'Toute la maison nickel ! 3h de travail',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      difficulty: 'hard',
      xpGained: 125,
    },
    stats: {
      likes: 245,
      dislikes: 12,
      comments: 18,
    },
    timestamp: 'il y a 2h',
  },
  {
    user: {
      name: 'Marc Dupont',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      level: 8,
    },
    task: {
      type: 'cooking',
      title: 'Lasagnes maison pour 6',
      description: 'Recette de ma grand-mère 👌',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
      difficulty: 'medium',
      xpGained: 120,
    },
    stats: {
      likes: 412,
      dislikes: 8,
      comments: 32,
    },
    timestamp: 'il y a 5h',
  },
  {
    user: {
      name: 'Emma Bernard',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      level: 22,
    },
    task: {
      type: 'dishes',
      title: 'Vaisselle après la fête',
      description: "Soirée d'hier, beaucoup de vaisselle !",
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
      difficulty: 'medium',
      xpGained: 45,
    },
    stats: {
      likes: 189,
      dislikes: 5,
      comments: 12,
    },
    timestamp: 'il y a 1j',
  },
  {
    user: {
      name: 'Thomas Petit',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      level: 11,
    },
    task: {
      type: 'laundry',
      title: 'Lessive + repassage',
      description: 'Toutes les chemises de la semaine',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800',
      difficulty: 'easy',
      xpGained: 40,
    },
    stats: {
      likes: 156,
      dislikes: 3,
      comments: 8,
    },
    timestamp: 'il y a 1j',
  },
];

export const categories: CategoryItem[] = [
  {
    emoji: '🧹',
    title: 'Ménage',
    count: '24.3k tâches',
    gradientClassName: 'from-blue-400 to-cyan-500',
  },
  {
    emoji: '🍽️',
    title: 'Vaisselle',
    count: '32.1k tâches',
    gradientClassName: 'from-orange-400 to-pink-500',
  },
  {
    emoji: '👨‍🍳',
    title: 'Cuisine',
    count: '18.7k tâches',
    gradientClassName: 'from-purple-400 to-indigo-500',
  },
  {
    emoji: '🧺',
    title: 'Lessive',
    count: '15.2k tâches',
    gradientClassName: 'from-green-400 to-emerald-500',
  },
];

export const leaderboardUsers: LeaderboardUser[] = [
  { name: 'Marie L.', level: 34, xp: 3420, rank: 1 },
  { name: 'Jean P.', level: 31, xp: 3180, rank: 2 },
  { name: 'Lucas M.', level: 28, xp: 2950, rank: 3 },
];

export const trendingTopics: TrendItem[] = [
  { challenge: '#DéfiMénageMai', count: 2847 },
  { challenge: '#CuisineMaison', count: 1923 },
  { challenge: '#ZeroDéchet', count: 1456 },
];

export const notifications: NotificationItem[] = [
  { type: 'like', user: 'Sophie', task: 'a aimé ton ménage', time: 'il y a 5min', xp: 5 },
  { type: 'comment', user: 'Marc', task: 'a commenté ta cuisine', time: 'il y a 1h', xp: 0 },
  { type: 'follow', user: 'Emma', task: 'a commencé à te suivre', time: 'il y a 2h', xp: 0 },
  { type: 'level', user: 'Tu', task: 'es passé niveau 13 !', time: 'il y a 3h', xp: 0 },
  { type: 'achievement', user: 'Tu', task: 'as débloqué "Roi du rangement"', time: 'il y a 5h', xp: 100 },
];

export const achievements: AchievementItem[] = [
  { emoji: '👑', title: 'Roi du rangement', desc: '100 tâches de rangement', rarity: 'legendary' },
  { emoji: '🔥', title: 'Série de 7 jours', desc: 'Une tâche par jour', rarity: 'rare' },
  { emoji: '⭐', title: 'Maître chef', desc: '50 repas cuisinés', rarity: 'epic' },
];

export const recentTasks: RecentTaskItem[] = [
  { emoji: '🧹', title: 'Ménage salon', xp: 75, date: "Aujourd'hui" },
  { emoji: '🍽️', title: 'Vaisselle', xp: 45, date: 'Hier' },
  { emoji: '🧺', title: 'Lessive', xp: 40, date: 'Il y a 2j' },
];

