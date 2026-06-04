// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome Media Docs',
  tagline: 'Documentation technique interne',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // ⚠️ À modifier avec ton vrai GitHub org/repo
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
          // Lien "Modifier cette page" → pointe vers ton repo
          editUrl: 'https://github.com/valentin-durand-git/welcome-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false, // pas utile pour de la doc technique
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Welcome Media Docs',
        logo: {
          alt: 'Welcome Media Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/welcoming-group/welcome-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { label: 'Architecture', to: '/docs/architecture/intro' },
              { label: 'APIs', to: '/docs/apis/intro' },
              { label: 'Onboarding', to: '/docs/onboarding/intro' },
            ],
          },
          {
            title: 'Liens utiles',
            items: [
              { label: 'GitHub', href: 'https://github.com/welcoming-group' },
              { label: 'Notion', href: 'https://notion.so' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Welcome Media / Welcoming Group`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
  }),
};

export default config;