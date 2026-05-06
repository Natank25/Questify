import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { AddTaskModal } from './components/AddTaskModal';
import { Settings } from './components/Settings';
import { FeedTab } from './components/FeedTab';
import { ExploreTab } from './components/ExploreTab';
import { NotificationsTab } from './components/NotificationsTab';
import { ProfileTab } from './components/ProfileTab';
import {
  achievements,
  categories,
  feedTasks,
  leaderboardUsers,
  notifications as notificationItems,
  recentTasks,
  trendingTopics,
} from './data/mockContent';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === 'add') {
      setShowAddModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="size-full bg-background text-foreground overflow-hidden flex flex-col max-w-lg mx-auto">
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'feed' && (
          <FeedTab tasks={feedTasks} />
        )}

        {activeTab === 'explore' && (
          <ExploreTab
            categories={categories}
            leaderboardUsers={leaderboardUsers}
            trendingTopics={trendingTopics}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationsTab notifications={notificationItems} />
        )}

        {activeTab === 'profile' && !showSettings && (
          <ProfileTab
            onSettingsClick={() => setShowSettings(true)}
            achievements={achievements}
            recentTasks={recentTasks}
          />
        )}

        {activeTab === 'profile' && showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
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
