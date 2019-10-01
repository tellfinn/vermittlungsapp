const fs = require('fs').promises

function saveFile(filename, data) {
  return fs.writeFile(
    __dirname + '/data/' + filename,
    JSON.stringify(data, null, 2)
  )
}

module.exports = saveFile
