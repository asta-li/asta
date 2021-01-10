require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const newsletterFeed = require(`./src/utils/newsletterFeed`)

module.exports = {
  siteMetadata: {
    siteTitle: `Asta Li`,
    siteTitleAlt: `Asta`,
    siteHeadline: `Asta`,
    siteUrl: `https://asta.li`,
    siteDescription: `Asta Li's personal website.`,
    siteLanguage: `en`,
    siteImage: `/site-image.png`,
    author: `Asta Li`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: '@bonobolabs/gatsby-remark-images-custom-widths',
            options: {
              maxWidth: 750,
              quality: 100,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`,
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
              quality: 100,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          `gatsby-remark-smartypants`,
        ],
        plugins: [
          '@bonobolabs/gatsby-remark-images-custom-widths',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
              quality: 100,
              linkImagesToOriginal: false,
              backgroundColor: `transparent`,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog-core`,
      options: {
        mdx: false,
        blogPath: "/articles",
        formatString: "MMMM DD, YYYY",
        navigation: [
          {
            title: `Articles`,
            slug: `/articles`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `Github`,
            url: `https://github.com/asta-li`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/yanastali`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: newsletterFeed(`Asta Li Feed`),
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `asta-li`,
        short_name: `asta-li`,
        description: `Asta Li's personal website`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-sitemap`,
  ].filter(Boolean),
}

