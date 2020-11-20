require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const newsletterFeed = require(`./src/utils/newsletterFeed`)

module.exports = {
  siteMetadata: {
    siteTitle: `Asta`,
    siteTitleAlt: `Asta`,
    siteHeadline: `Asta`,
    siteUrl: `https://asta.li`,
    siteDescription: `Asta Li's personal website.`,
    siteLanguage: `en`,
    siteImage: `site-image.png`,
    author: `Asta Li`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog-core`,
      options: {
        navigation: [
          {
            title: `Articles`,
            slug: `/blog`,
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

