'use strict';

var childProcess = require('child_process');
var npmCmd = require('npm-spawn');
var electron = require('electron-prebuilt');
var gulp = require('gulp');

gulp.task('start', ['pre:startProcess'], function() {
    gulp.start('build:watch');
    return startProcess();
});


gulp.task('startProcess', ['pre:startProcess'], function() {
    return startProcess();
});

gulp.task('pre:startProcess', function() {
    return npmCmd(['run', 'build:electron.main'], { cwd: '.' });
});

function startProcess() {

    return childProcess.spawn(electron, ['./build'], {
            stdio: 'inherit'
        })
        .on('close', function() {
            // User closed the app. Kill the host process.
            process.exit();
        });
}