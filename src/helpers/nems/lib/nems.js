'use strict';

var
  downloadService = require('./distributer/downloadService'),
  extractionService = require('./distributer/extractionService'),
  mongoService = require('./process/mongoService');

function getSeperator() {
  return process.platform === 'win32' ? '\\' : '/';
}

function distribute(version, dir) {
  return downloadService
    .download(version, dir)
    .then(function (file) {
      return extractionService.extract(file, version, dir);
    });
}

function download(version, dir) {
  return downloadService.download(version, dir);
}

function extract(file, version, dir) {
  return extractionService.extract(file, version, dir);
}

function startMongo(dbPath, port, noprealloc, nojournal) {
  return mongoService.start(dbPath, port, noprealloc, nojournal);
}

function start(version, dir, port, noprealloc, nojournal) {
  return distribute(version, dir).then(function(path) {
    var dbPath = path.concat(getSeperator(), 'bin');
    return mongoService.start(dbPath, port, noprealloc, nojournal);
  });
}

function stop(dbPath, port) {
  return mongoService.stop(dbPath, port);
}


module.exports.distribute = distribute;
module.exports.download = download;
module.exports.extract = extract;
module.exports.startMongo = startMongo;
module.exports.start = start;
module.exports.stop = stop;
