const path = require("path");

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-favicon`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Nunito\:700`],
        display: "fallback"
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: `https://api.kevinshoodie.com/days/`,
        headers: {
          "Content-Type": "application/json"
        },
        name: `days`,
        entityLevel: `days`
      }
    }
  ]
};
