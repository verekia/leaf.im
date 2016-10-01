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

const connectHTML = `<!doctype html>
<html>
  <head>
    <script src="https://connect.soundcloud.com/sdk/sdk-3.1.2.js"></script>
    <script>
      SC.initialize({
        client_id: 'bb00ef3aa833887211ec2eebc049ae7a',
        redirect_uri: 'http://leaf.im/gate-follow/'
      });

      SC.connect().then(function(){
        return SC.put('/me/followings/21200711');
      }).then(function(user){
        alert('You are now following ' + user.username);
      }).catch(function(error){
        alert('Error: ' + error.message);
      });
    </script>
  </head>
  <body>
  </body>
</html>
`

const callbackHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Connect with SoundCloud</title>
  </head>
  <body onload="window.setTimeout(window.opener.SC.connectCallback, 1)">
    <b style="text-align: center;">This popup should automatically close in a few seconds</b>
  </body>
</html>
`

fs.emptyDirSync('docs')
fs.outputFileSync('docs/CNAME', 'leaf.im\n')
fs.outputFileSync('docs/gate-auth/index.html', connectHTML)
fs.outputFileSync('docs/gate-follow/index.html', callbackHTML)
fs.outputFileSync('docs/index.html', redirectHTML('https://soundcloud.com/leafadventure'))

redirs.forEach((redir) => {
  redir.urls.forEach((url) => {
    fs.outputFileSync(`docs/${url}/index.html`, redirectHTML(redir.dest))
  })
})
