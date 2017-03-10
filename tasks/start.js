'use strict';

var childProcess = require('child_process');
var electron = require('electron-prebuilt');
var gulp = require('gulp');

gulp.task('start', ['build', 'watch'], function() {
    return startProcess();
});


gulp.task('startProcess', function() {
    return startProcess();
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