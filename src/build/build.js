const fs = require('fs'),
    browserify = require('browserify')

browserify('./../express/frontend/script.js')
    .transform('babelify', {presets: ['@babel/preset-env']})
    .bundle()
    .pipe(fs.createWriteStream('./../express/static/js/bundle.js'))