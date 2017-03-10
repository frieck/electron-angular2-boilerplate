'use strict';

var pathUtil = require('path');
var Q = require('q');
var gulp = require('gulp');
var gutil = require('gulp-util');
var npmCmd = require('npm-spawn');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var jetpack = require('fs-jetpack');
var webpack = require('webpack');
var bundle = require('./bundle');
var generateSpecImportsFile = require('./generate_spec_imports');
var utils = require('../utils');
var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var buildDir = projectDir.cwd('./app/build');
var destDir = projectDir.cwd('./build');

var errorHandler = function(title) {
    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};

// -------------------------------------
// Tasks
// -------------------------------------

var webpackElectronRendererTask = function() {
    return npmCmd(['run', 'build:electron.renderer'], { cwd: 'app' });
}
gulp.task('webpackElectronRenderer', ['bundle'], webpackElectronRendererTask);

var webpackElectronMainTask = function() {
    return npmCmd(['run', 'build:electron.main'], { cwd: 'app' });
}
gulp.task('webpackElectronMain', ['bundle', 'webpackElectronRenderer'], webpackElectronMainTask);

var webpackBundleTask = function() {
    projectDir.copy(buildDir.path('.'), destDir.path('.'), { overwrite: true });
};
gulp.task('webpackBundle', ['bundle', 'webpackClean', 'webpackElectronRenderer', 'webpackElectronMain'], webpackBundleTask);

gulp.task('webpackClean', function() {
    return buildDir.dirAsync('.', {
        empty: true
    });
});

gulp.task('clean', function() {
    return destDir.dirAsync('.', {
        empty: true
    });
});

var bundleApplication = function() {
    /*return Q.all([
        bundle(destDir.path('background.js'), destDir.path('background.js'))
    ]);*/
};

var bundleSpecs = function() {
    return generateSpecImportsFile().then(function(specEntryPointPath) {
        return bundle(specEntryPointPath, destDir.path('spec.js'));
    });
};

var bundleTask = function() {
    /*if (utils.getEnvName() === 'test') {
        return bundleSpecs();
    }
    return bundleApplication();*/
};
gulp.task('bundle', ['clean'], bundleTask);
gulp.task('bundle-watch', bundleTask);

gulp.task('environment', ['clean', 'webpackBundle'], function() {
    var configFile = 'config/env_' + utils.getEnvName() + '.json';
    projectDir.copy(configFile, destDir.path('env.json'));
});


gulp.task('package-json', ['clean', 'webpackBundle'], function() {
    var manifest = srcDir.read('package.json', 'json');

    // Add "dev" suffix to name, so Electron will write all data like cookies
    // and localStorage in separate places for production and development.
    if (utils.getEnvName() === 'development') {
        manifest.name += '-dev';
        manifest.productName += ' Dev';
    }

    destDir.write('package.json', manifest);
});


gulp.task('watch', function() {
    watch('app/**/*.js', batch(function(events, done) {
        gulp.start('bundle-watch', done);
    }));
});

gulp.task('build', ['bundle', 'webpackBundle', 'environment', 'package-json']);