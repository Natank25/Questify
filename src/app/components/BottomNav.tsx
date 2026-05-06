import { navigationItems, type NavigationSelection, type TabId } from '../tabRegistry';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: NavigationSelection) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border text-card-foreground safe-area-inset-bottom">
      <div
        className="mx-auto grid max-w-lg items-center px-4 py-2"
        style={{ gridTemplateColumns: `repeat(${navigationItems.length}, minmax(0, 1fr))` }}
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isAction = item.kind === 'action';
          const isActive = item.kind === 'tab' && activeTab === item.id;
          const iconClassName = isActive ? 'text-purple-600' : 'text-muted-foreground';
          const labelClassName = isActive ? 'text-purple-600 font-medium' : 'text-muted-foreground';

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 px-2 py-2 transition-colors"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={`${isAction ? 'size-7' : 'size-6'} ${iconClassName}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-xs ${labelClassName}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
