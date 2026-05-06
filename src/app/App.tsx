import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { BottomNav } from './components/BottomNav';
import { AddTaskModal } from './components/AddTaskModal';
import { LoginView } from './components/LoginView';
import { SlidingTabViewport } from './components/SlidingTabViewport';
import { Settings } from './components/Settings';
import { supabase } from '@/lib/supabase';
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
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const previousTabRef = useRef<TabId>(activeTab);
  const activeTabDefinition = getTabDefinition(activeTab);
  const slideDirection = getTabDirection(previousTabRef.current, activeTab);

  useEffect(() => {
    previousTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!supabase) {
      setIsAuthReady(true);
      return;
    }

    let isActive = true;

    const initializeSession = async () => {
      if (supabase === null)
        throw new Error("Environnement variables are not set !");
      const { data } = await supabase.auth.getSession();

      if (isActive) {
        setSession(data.session);
        setIsAuthReady(true);
      }
    };

    void initializeSession();

    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isActive) {
        setSession(currentSession);
      }
    });

    return () => {
      isActive = false;
      data.subscription.unsubscribe();
    };
  }, []);

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

  if (!isAuthReady) {
    return <div className="size-full bg-background" />;
  }

  if (!session) {
    return <LoginView />;
  }

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
