'use strict';

var
    Ramda = require('ramda'),
    Promise = require('bluebird'),
    childProcess = require('child_process'),
    logger = require('npmlog'),
    sprintf = require('sprintf-js').sprintf,

    MongoError = require('../error/errors').MongoError,

    mongoProcess,
    DEFAULT_PORT = '27017',
    PARAMETER_EVAL_SHUTDOWN = 'localhost:%s/admin --eval "db.shutdownServer()"',

    MESSAGE_MONGO_WAITING = '[initandlisten] waiting for connections on port',
    MESSAGE_MONGO_INIT_EXCEPTION = '[initandlisten] exception in initAndListen',
    MESSAGE_MONGO_BAD_PORT = 'bad --port number',
    MESSAGE_MONGO_ADDR_IN_USE = 'addr already in use',
    MESSAGE_MONGO_CONNECTION_FAILED = 'exception: connect failed',
    MESSAGE_MONGO_DOWN = 'server should be down',

    ERROR_MESSAGE_MONGO_START_FAILED = 'could not start mongo process: ',
    ERROR_MESSAGE_MONGO_SHUTDOWN = 'could not create child process to stop mongo process',
    ERROR_MESSAGE_MONGO_INSTANCE_EXIST = 'Is a mongod instance already running?',
    ERROR_MESSAGE_MONGO_BAD_PORT = 'The port you used is not allowed. See mongodb docs.',
    ERROR_MESSAGE_MONGO_ADDR_IN_USE = 'The port you used is already in use.',
    ERROR_MESSAGE_MONGO_CONNECTION_FAILED = 'The connection to the server failed. You may have no server running or the port is incorrect.';

function getMongodBinaryName(isDeamon) {
    return process.platform === 'win32' ? isDeamon ? 'mongod.exe' : 'mongo.exe' : isDeamon ? 'mongod' : 'mongo';
}

function getSeperator() {
    return process.platform === 'win32' ? '\\' : '/';
}

function createMongoProcess(execCommand, resolve, reject) {
    if (mongoProcess) {
        resolve(mongoProcess.pid);
    }

    mongoProcess = childProcess.exec(execCommand);

    mongoProcess.stderr.on('data', function(err) {
        reject(new MongoError(ERROR_MESSAGE_MONGO_START_FAILED + err));
    });
    mongoProcess.stdout.on('data', function(data) {
        if (data.toString().indexOf(MESSAGE_MONGO_INIT_EXCEPTION) >= 0) {
            reject(new MongoError(ERROR_MESSAGE_MONGO_START_FAILED + ERROR_MESSAGE_MONGO_INSTANCE_EXIST));
        }
        if (data.toString().indexOf(MESSAGE_MONGO_BAD_PORT) >= 0) {
            reject(new MongoError(ERROR_MESSAGE_MONGO_START_FAILED + ERROR_MESSAGE_MONGO_BAD_PORT));
        }
        if (data.toString().indexOf(MESSAGE_MONGO_ADDR_IN_USE) >= 0) {
            reject(new MongoError(ERROR_MESSAGE_MONGO_START_FAILED + ERROR_MESSAGE_MONGO_ADDR_IN_USE));
        }
        if (data.toString().indexOf(MESSAGE_MONGO_WAITING) >= 0) {
            resolve(mongoProcess.pid);
        }
    });
    mongoProcess.stdout.on('message', function(message) {
        logger.info('nems', message);
    });
}

function shutdownMongoProcess(execCommand, resolve, reject) {
    var cp = childProcess.exec(execCommand);
    if (!cp) {
        reject(new MongoError(ERROR_MESSAGE_MONGO_SHUTDOWN));
    }

    cp.stderr.on('data', function(err) {
        if (err.toString().indexOf(MESSAGE_MONGO_CONNECTION_FAILED) >= 0) {
            reject(new MongoError(ERROR_MESSAGE_MONGO_CONNECTION_FAILED));
        }
    });

    cp.stdout.on('data', function(data) {
        if (data.toString().indexOf(MESSAGE_MONGO_DOWN) >= 0) {
            mongoProcess = undefined;
            resolve(MESSAGE_MONGO_DOWN);
        }
    });
}

function start(dbPath, port, noprealloc, nojournal) {
    var execCommand = getMongodBinaryName(true);

    if (!!dbPath) {
        execCommand = [dbPath.concat(getSeperator(), execCommand), '--dbpath', dbPath].join(' ');
    }
    if (!!port) {
        execCommand = [execCommand, '--port', port].join(' ');
    }
    if (!!noprealloc) {
        execCommand = execCommand.concat(' --noprealloc');
    }
    if (!!nojournal) {
        execCommand = execCommand.concat(' --nojournal');
    }

    return new Promise(Ramda.partial(createMongoProcess, [execCommand]));
}

function stop(dbPath, port) {
    var execCommand = [getMongodBinaryName(false), PARAMETER_EVAL_SHUTDOWN].join(' ');

    if (!!dbPath) {
        execCommand = dbPath.concat(getSeperator(), execCommand);
    }

    execCommand = sprintf(execCommand, (!!port) ? port : DEFAULT_PORT);

    console.log('execCommand', execCommand);

    return new Promise(Ramda.partial(shutdownMongoProcess, [execCommand]));
}

module.exports.start = start;
module.exports.stop = stop;