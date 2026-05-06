import { TaskPost } from './TaskPost';
import type { FeedTask } from '../data/mockContent';

interface FeedTabProps {
  tasks: FeedTask[];
}

export function FeedTab({ tasks }: FeedTabProps) {
  return (
    <div>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Questify
          </h1>
          <p className="text-xs text-gray-600">Transforme tes tâches en victoires 🏆</p>
        </div>
      </div>

      <div className="space-y-0">
        {tasks.map((task, index) => (
          <TaskPost key={index} {...task} />
        ))}
      </div>
    </div>
  );
}

