module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
