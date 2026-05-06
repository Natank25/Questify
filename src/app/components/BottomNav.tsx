import { Home, Compass, PlusCircle, Bell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'explore', icon: Compass, label: 'Explorer' },
    { id: 'add', icon: PlusCircle, label: 'Ajouter' },
    { id: 'notifications', icon: Bell, label: 'Alertes' },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-4 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-colors"
            >
              <Icon
                className={`size-6 ${
                  isActive ? 'text-purple-600' : 'text-gray-600'
                } ${item.id === 'add' ? 'size-7' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${
                isActive ? 'text-purple-600 font-medium' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
