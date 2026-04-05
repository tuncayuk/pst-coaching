import mockDataJson from '../../../artifacts/mock/mock_data.json';

type MockDataFixture = typeof mockDataJson;

let mockDataEnabled = true;

export const isMockDataEnabled = () => mockDataEnabled;

export const setMockDataEnabled = (enabled: boolean) => {
  mockDataEnabled = enabled;
};

export const getMockData = (): MockDataFixture | null => (mockDataEnabled ? mockDataJson : null);

export const getMockDataMeta = () => mockDataJson.meta;
