import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { angularOutputTargetFix } from './src/angular-output-target-fix';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { inlineSvg } from 'stencil-inline-svg';

const angularValueAccessorBindings: ValueAccessorConfig[] = [];

export const config: Config = {
  namespace: 'nexus',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@nexus/core',
      directivesProxyFile: '../nexus-angular/projects/nexus-angular/src/lib/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings
    }),
    angularOutputTargetFix({
      directivesUtilsFile: '../nexus-angular/projects/nexus-angular/src/lib/directives/angular-component-lib/utils.ts'
    }),
    reactOutputTarget({
      componentCorePackage: '@nexus/core',
      proxiesFile: '../nexus-react/src/components.ts',
      includeDefineCustomElements: true,
      includePolyfills: true
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      dir: 'dist'
    },
    {
      type: 'docs-readme',
      footer: '',
      strict: true
    },
    {
      type: 'docs-json',
      file: '../../playbook/stories/props.json'
    },
    {
      type: 'www',
      dir: '../../target/www/playbook/stencil/',
      copy: [
        { src: 'temp' },
        { src: 'assets', dest: 'assets' },
        { src: 'assets', dest: 'build/assets' },
        { src: 'assets', dest: 'temp/assets' },
        { src: 'assets', dest: 'build/temp/assets' }
      ],
      serviceWorker: null // disable service workers
    },
    {
      type: 'www',
      dir: 'dist/',
      copy: [
        { src: 'temp' },
        { src: 'assets', dest: 'assets' },
        { src: 'styles', dest: 'styles' },
        { src: 'styles.scss', dest: 'styles.scss' },
        { src: 'assets', dest: 'temp/assets' },
        { src: 'assets', dest: 'build/temp/assets' },
        { src: 'styles.scss', dest: 'temp/styles.scss' }
      ],
      serviceWorker: null // disable service workers
    }
  ],
  buildDist: true,
  plugins: [sass(), inlineSvg()],
  globalStyle: 'src/styles.scss',
  autoprefixCss: true,
  extras: {
    cloneNodeFix: true,
    cssVarsShim: false,
    shadowDomShim: false
  },
  testing: {
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 85,
        lines: 85,
        statements: 85
      }
    },
    coverageDirectory: '../../target/www/playbook',
    coverageReporters: ['cobertura', 'lcov'],
    moduleNameMapper: {
      '.+\\.(svg|png|jpg)$': 'identity-obj-proxy'
    }
  }
};
