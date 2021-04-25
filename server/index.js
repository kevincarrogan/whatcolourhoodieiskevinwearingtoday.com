const gatsyExpress = require("gatsby-plugin-express");
const express = require("express");
const app = express();

// serve static files before gatsbyExpress
app.use(express.static("public/"));
app.use(
  gatsyExpress("config/gatsby-express.json", {
    publicDir: "public/",
    template: "public/404/index.html",

    // redirects all /path/ to /path
    // should be used with gatsby-plugin-remove-trailing-slashes
    redirectSlashes: true
  })
);

const port = 80;
app.listen(port, () => {
  console.log(`Running: ${port}`);
});
