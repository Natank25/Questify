import { useEffect, useRef, useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { AddTaskModal } from './components/AddTaskModal';
import { SlidingTabViewport } from './components/SlidingTabViewport';
import { Settings } from './components/Settings';
import {
  getAdjacentTabId,
  getTabDefinition,
  getTabDirection,
  type NavigationSelection,
  type TabId,
} from './tabRegistry';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('feed');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const previousTabRef = useRef<TabId>(activeTab);
  const activeTabDefinition = getTabDefinition(activeTab);
  const slideDirection = getTabDirection(previousTabRef.current, activeTab);

  useEffect(() => {
    previousTabRef.current = activeTab;
  }, [activeTab]);

  const handleTabChange = (tab: NavigationSelection) => {
    if (tab === 'add') {
      setShowAddModal(true);
    } else {
      setShowSettings(false);
      setActiveTab(tab);
    }
  };

  const handleSwipeTabChange = (offset: -1 | 1) => {
    setShowSettings(false);
    setActiveTab((currentTab) => getAdjacentTabId(currentTab, offset));
  };

  return (
    <div className="size-full bg-background text-foreground overflow-hidden flex flex-col max-w-lg mx-auto">
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'profile' && showSettings ? (
          <Settings onClose={() => setShowSettings(false)} />
        ) : (
          <SlidingTabViewport
            activeTab={activeTabDefinition}
            direction={slideDirection}
            renderContext={{ onSettingsClick: () => setShowSettings(true) }}
            onSwipeTabChange={handleSwipeTabChange}
          />
        )}
      </div>

      {!showSettings && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showAddModal && (
        <AddTaskModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
