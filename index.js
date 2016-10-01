const fs = require('fs-extra')

const redirs = require('./redirs')

redirs.forEach((redir) => {
  redir.urls.forEach((url) => {
    fs.outputFileSync(`docs/${url}/index.html`, `
      <!doctype html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0; URL='${redir.dest}'" />
        </head>
        <body>
        </body>
      </html>
    `)
  })
})

// TODO Create gate-auth/index.html
// TODO Create gate-follow/index.html
// TODO Make the root index.html redirect to 'https://soundcloud.com/leafadventure'
