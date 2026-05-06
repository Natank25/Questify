import { X, Camera, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AddTaskModalProps {
  onClose: () => void;
}

export function AddTaskModal({ onClose }: AddTaskModalProps) {
  const [taskType, setTaskType] = useState('cleaning');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const taskTypes = [
    { id: 'cleaning', label: 'Ménage', emoji: '🧹', baseXP: 50 },
    { id: 'dishes', label: 'Vaisselle', emoji: '🍽️', baseXP: 30 },
    { id: 'cooking', label: 'Cuisine', emoji: '👨‍🍳', baseXP: 80 },
    { id: 'laundry', label: 'Lessive', emoji: '🧺', baseXP: 40 },
    { id: 'shopping', label: 'Courses', emoji: '🛒', baseXP: 60 },
    { id: 'organizing', label: 'Rangement', emoji: '📦', baseXP: 70 },
  ];

  const difficultyMultipliers = {
    easy: 1,
    medium: 1.5,
    hard: 2.5
  };

  const selectedTask = taskTypes.find(t => t.id === taskType);
  const estimatedXP = selectedTask ? Math.round(selectedTask.baseXP * difficultyMultipliers[difficulty]) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-0">
      <div className="bg-white rounded-t-3xl w-full max-w-lg animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Publier une tâche</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Task Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Type de tâche</label>
            <div className="grid grid-cols-3 gap-3">
              {taskTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTaskType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    taskType === type.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{type.emoji}</div>
                  <div className="text-xs font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Difficulté</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setDifficulty('easy')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  difficulty === 'easy'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">😊 Facile</div>
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  difficulty === 'medium'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">😅 Moyen</div>
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  difficulty === 'hard'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-medium">😰 Difficile</div>
              </button>
            </div>
          </div>

          {/* XP Preview */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-purple-600" />
                <span className="font-medium">XP estimés</span>
              </div>
              <span className="text-2xl font-bold text-purple-600">+{estimatedXP} XP</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Les vrais XP dépendront des likes/dislikes
            </p>
          </div>

          {/* Task Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre</label>
              <input
                type="text"
                placeholder="Ex: Grand ménage de printemps"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description (optionnelle)</label>
              <textarea
                placeholder="Décris ce que tu as fait..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photo (preuve !)</label>
              <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-purple-400 hover:bg-purple-50 transition-all">
                <Camera className="size-8 mx-auto text-gray-400 mb-2" />
                <div className="text-sm text-gray-600">Ajouter une photo</div>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
