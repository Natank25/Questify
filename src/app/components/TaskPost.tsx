import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface TaskPostProps {
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  task: {
    type: 'cleaning' | 'dishes' | 'cooking' | 'laundry' | 'shopping' | 'organizing';
    title: string;
    description?: string;
    image: string;
    difficulty: 'easy' | 'medium' | 'hard';
    xpGained: number;
  };
  stats: {
    likes: number;
    dislikes: number;
    comments: number;
  };
  timestamp: string;
}

export function TaskPost({ user, task, stats, timestamp }: TaskPostProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const taskIcons = {
    cleaning: '🧹',
    dishes: '🍽️',
    cooking: '👨‍🍳',
    laundry: '🧺',
    shopping: '🛒',
    organizing: '📦'
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700'
  };

  const difficultyLabels = {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile'
  };

  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  return (
    <div className="bg-card border-b border-border text-card-foreground">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="size-10 rounded-full object-cover ring-2 ring-purple-400"
            />
            <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-xs font-bold size-5 rounded-full flex items-center justify-center">
              {user.level}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{user.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[task.difficulty]}`}>
                {difficultyLabels[task.difficulty]}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{taskIcons[task.type]}</span>
              <span className="capitalize">{task.type === 'dishes' ? 'Vaisselle' : task.type === 'cleaning' ? 'Ménage' : task.type === 'cooking' ? 'Cuisine' : task.type === 'laundry' ? 'Lessive' : task.type === 'shopping' ? 'Courses' : 'Organisation'}</span>
              <span>•</span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-purple-500/10 px-2 py-1 rounded-full">
          <Sparkles className="size-3 text-purple-600" />
          <span className="text-xs font-bold text-purple-600">+{task.xpGained} XP</span>
        </div>
      </div>

      <div className="relative">
        <img
          src={task.image}
          alt={task.title}
          className="w-full aspect-square object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{task.title}</h3>
          {task.description && (
            <p className="text-white/90 text-sm mt-1">{task.description}</p>
          )}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 transition-transform active:scale-90"
            >
              <ThumbsUp
                className={`size-6 ${liked ? 'fill-green-500 text-green-500' : 'text-foreground'}`}
              />
              <span className={`text-sm font-semibold ${liked ? 'text-green-500' : 'text-foreground'}`}>
                {stats.likes + (liked ? 1 : 0)}
              </span>
            </button>

            <button
              onClick={handleDislike}
              className="flex items-center gap-1.5 transition-transform active:scale-90"
            >
              <ThumbsDown
                className={`size-6 ${disliked ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              />
              <span className={`text-sm font-semibold ${disliked ? 'text-red-500' : 'text-foreground'}`}>
                {stats.dislikes + (disliked ? 1 : 0)}
              </span>
            </button>

            <button className="flex items-center gap-1.5 transition-transform active:scale-90">
              <MessageCircle className="size-6" />
              <span className="text-sm font-semibold">{stats.comments}</span>
            </button>
          </div>

          <button className="transition-transform active:scale-90">
            <Share2 className="size-6" />
          </button>
        </div>

        {stats.likes > 0 && (
          <div className="text-sm text-foreground/80">
            <span className="font-semibold">{stats.likes}</span> personnes trouvent ça bien fait 👏
          </div>
        )}
      </div>
    </div>
  );
}
