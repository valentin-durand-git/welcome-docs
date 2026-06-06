// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Valentin Durand Docs',
  tagline: 'Documentation technique',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://valentin-durand-git.github.io',
  baseUrl: '/welcome-docs/',
  organizationName: 'valentin-durand-git',
  projectName: 'welcome-docs',
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/valentin-durand-git/welcome-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'velotaf',
        path: 'velotaf-docs',
        routeBasePath: 'velotaf',
        sidebarPath: './sidebars-velotaf.js',
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
    ],
  ],

  themeConfig: ({
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Valentin Durand Docs',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Taff',
        },
        {
          type: 'docSidebar',
          sidebarId: 'velotafSidebar',
          docsPluginId: 'velotaf',
          position: 'left',
          label: '🚲 VéloTaf',
        },
        {
          href: 'https://github.com/valentin-durand-git',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Liens utiles',
          items: [
            { label: 'GitHub', href: 'https://github.com/valentin-durand-git' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Valentin Durand`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['dart', 'bash', 'sql'],
    },
  }),
};

export default config;
