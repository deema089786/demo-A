import { StorybookConfig } from '@storybook/react-vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.docs.mdx',
    '../../../libs/app-design-system/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../libs/app-design-system/src/**/*.docs.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    'storybook-addon-remix-react-router',
  ],
  staticDirs: ['../static'],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    return {
      ...mergeConfig(config, {
        plugins: [nxViteTsPaths()],
      }),
    };
  },
  features: {
    experimentalRSC: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
    },
  },
};

export default config;
