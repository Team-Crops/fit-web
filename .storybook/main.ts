import type { StorybookConfig } from '@storybook/nextjs';

import { join, dirname } from 'path';
import type { RuleSetRule } from 'webpack';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  babel: async (config) => {
    return {
      ...config,
      plugins: [...config.plugins, '@emotion'],
    };
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    const rules = config?.module?.rules as RuleSetRule[];
    const imageRule = rules.find((rule) => rule?.test instanceof RegExp && rule.test.test('.svg'));
    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }
    rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
export default config;
