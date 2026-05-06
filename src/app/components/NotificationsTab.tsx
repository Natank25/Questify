import type { NotificationItem } from '../data/mockContent';

interface NotificationsTabProps {
  notifications: NotificationItem[];
}

export function NotificationsTab({ notifications }: NotificationsTabProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                {notification.user[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-semibold">{notification.user}</span>{' '}
                  <span className="text-gray-600">{notification.task}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  {notification.xp > 0 && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                      +{notification.xp} XP
                    </span>
                  )}
                </div>
              </div>
              {notification.type === 'like' && <span className="text-xl">👍</span>}
              {notification.type === 'comment' && <span className="text-xl">💬</span>}
              {notification.type === 'level' && <span className="text-xl">⬆️</span>}
              {notification.type === 'achievement' && <span className="text-xl">🏆</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

