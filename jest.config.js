module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/config/router/**/*',
    '!**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/cypress'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(scss)$': 'identity-obj-proxy'
  }
}
