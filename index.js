const fs = require('fs-extra')

const redirs = require('./redirs')

const redirectHTML = url => `<!doctype html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; URL='${url}'" />
  </head>
  <body>
  </body>
</html>
`

fs.emptyDirSync('docs')
fs.outputFileSync('docs/CNAME', 'leafadventure.com\n')
fs.outputFileSync('docs/index.html', redirectHTML('https://soundcloud.com/leafadventure'))

redirs.forEach((redir) => {
  redir.urls.forEach((url) => {
    fs.outputFileSync(`docs/${url}/index.html`, redirectHTML(redir.dest))
  })
})

// TODO Create gate-auth/index.html
// TODO Create gate-follow/index.html
