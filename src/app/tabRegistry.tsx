import type { LucideIcon } from 'lucide-react';
import { Bell, Compass, Home, PlusCircle, User } from 'lucide-react';
import type { ReactNode } from 'react';

import { ExploreTab } from './components/ExploreTab';
import { FeedTab } from './components/FeedTab';
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

export interface TabRenderContext {
  onSettingsClick: () => void;
}

interface TabDefinitionShape {
  id: string;
  label: string;
  icon: LucideIcon;
  render: (context: TabRenderContext) => ReactNode;
}

export type TabDefinition = (typeof tabDefinitions)[number];
export type TabId = TabDefinition['id'];
export type TabDirection = 1 | -1;
export type NavigationSelection = TabId | 'add';

export interface NavigationTabItem {
  kind: 'tab';
  id: TabId;
  label: string;
  icon: LucideIcon;
}

export interface NavigationActionItem {
  kind: 'action';
  id: 'add';
  label: string;
  icon: LucideIcon;
}

export type NavigationItem = NavigationTabItem | NavigationActionItem;

export const tabDefinitions = [
  {
    id: 'feed',
    label: 'Feed',
    icon: Home,
    render: () => <FeedTab tasks={feedTasks} />,
  },
  {
    id: 'explore',
    label: 'Explorer',
    icon: Compass,
    render: () => (
      <ExploreTab
        categories={categories}
        leaderboardUsers={leaderboardUsers}
        trendingTopics={trendingTopics}
      />
    ),
  },
  {
    id: 'notifications',
    label: 'Alertes',
    icon: Bell,
    render: () => <NotificationsTab notifications={notificationItems} />,
  },
  {
    id: 'profile',
    label: 'Profil',
    icon: User,
    render: ({ onSettingsClick }) => (
      <ProfileTab
        achievements={achievements}
        recentTasks={recentTasks}
        onSettingsClick={onSettingsClick}
      />
    ),
  },
] as const satisfies readonly TabDefinitionShape[];

const navigationActionItem: NavigationActionItem = {
  kind: 'action',
  id: 'add',
  label: 'Ajouter',
  icon: PlusCircle,
};

export const navigationItems = buildNavigationItems(tabDefinitions);

const tabIndexById = new Map<TabId, number>(tabDefinitions.map((tab, index) => [tab.id, index]));

function buildNavigationItems(tabs: readonly TabDefinition[]): NavigationItem[] {
  const items: NavigationItem[] = tabs.map(({ id, label, icon }) => ({
    kind: 'tab',
    id,
    label,
    icon,
  }));

  items.splice(Math.ceil(items.length / 2), 0, navigationActionItem);

  return items;
}

export function getTabDefinition(tabId: TabId): TabDefinition {
  return tabDefinitions.find((tab) => tab.id === tabId) ?? tabDefinitions[0];
}

export function getTabDirection(previousTab: TabId, nextTab: TabId): TabDirection {
  const previousIndex = tabIndexById.get(previousTab) ?? 0;
  const nextIndex = tabIndexById.get(nextTab) ?? 0;

  return nextIndex >= previousIndex ? 1 : -1;
}





