const redirs = require('./redirs')

const location = process.argv[2]

let newLocation = ''
redirs.forEach((redir) => {
  redir.urls.forEach((url) => {
    if (location === url) {
      newLocation = redir.dest
    }
  })
})

if (location === 'gate-auth') {
  // TODO
  console.log('GATE AUTH')
}

if (location === 'gate-follow') {
  // TODO
  console.log('GATE FOLLOW')
}

if (location === '') {
  newLocation = 'https://soundcloud.com/leafadventure'
}

console.log(newLocation)
