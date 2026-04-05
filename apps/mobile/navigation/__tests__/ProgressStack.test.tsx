import { ProgressStackParamList, progressStackScreens } from '../ProgressStack';

describe('Progress stack routes', () => {
  it('registers all progress routes', () => {
    const expected: Array<keyof ProgressStackParamList> = [
      'ProgressDashboard',
      'ProgressEmotionalMap',
      'ProgressWeeklySummary',
      'ProgressStrengths',
      'ProgressReportExport',
      'ContentPaywall'
    ];

    const names = progressStackScreens.map(screen => screen.name);
    expect(names).toEqual(expected);
  });

  it('marks report export as modal', () => {
    const reportExport = progressStackScreens.find(screen => screen.name === 'ProgressReportExport');
    expect(reportExport?.options?.presentation).toBe('modal');
  });
});
