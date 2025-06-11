/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // 移除 globals 配置
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      useESM: true,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },
  testPathIgnorePatterns: ['.history\\'],
  moduleNameMapper: {
    '.(css|less|scss|sass)$': 'identity-obj-proxy',
    // 修改映射规则，避免强制将 .js 文件转为 .mjs 文件
    // '^(.+\.js)$': '$1.mjs',
    // '^(\.{1,2}/.*)\.js$': '$1.mjs',
    '^(.+.js)$': '$1',
    '^(.{1,2}/.*).js$': '$1',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['node_modules/(?!(.*.mjs$|.*.esm$))'],
};

export default config;
