interface IPane {
  tabName: string;
  component: string;
}

interface IPaneMemoryControl extends IPane {
  tabName: 'Profile.MemoryControl';
  component: 'PMemoryPane';
}

interface IPaneLimitControl extends IPane {
  tabName: 'Profile.LimitControl';
  component: 'PLimitPane';
}

interface IPaneStatistic extends IPane {
  tabName: 'Profile.MemoryUsageStatistic';
  component: 'PMemoryStatistic';
}

type TPane = IPaneLimitControl | IPaneMemoryControl | IPaneStatistic

export const panes: TPane[] = [
  {
    tabName: 'Profile.MemoryControl',
    component: 'PMemoryPane',
  },
  {
    tabName: 'Profile.LimitControl',
    component: 'PLimitPane',
  },
  {
    tabName: 'Profile.MemoryUsageStatistic',
    component: 'PMemoryStatistic',
  },
]
