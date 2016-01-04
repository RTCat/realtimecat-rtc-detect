var fs = require('fs');
var del = require('del'); //rm -rf
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var rename = require('gulp-rename');

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

gulp.task('clean', function () {
    return del(['dist/*']);
});


gulp.task('build', ['clean'], function () {

    // This browserify build be used by users of the module. It contains a
    // UMD (universal module definition) and can be used via an AMD module
    // loader like RequireJS or by simply placing a script tag in the page,
    // which registers mymodule as a global var
    var standalone = browserify({
        entries: './src/RTCDetect.js',
        debug: true,
        standalone: 'RTCDetect' //you can use 'RTCDetect' with requirejs or as a window object now
    })
        .bundle()
        .pipe(source(pkg.name + '.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'))
        .on('error', gutil.log);

    return standalone;

});

gulp.task('default', ['build']);