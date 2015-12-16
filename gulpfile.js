var gulp = require('gulp');
var concat = require('gulp-concat');
var iife = require("gulp-iife");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var scripts = [
    './src/init.js',
    './src/getBrowserInfo.js',
    './src/getOSName.js',
    './src/checkDeviceSupport.js',
    './src/checkGetUserMedia.js',
    './src/checkRTCPeerConnection.js',
    './src/checkDataChannel.js',
    './src/RTCDetect.js'
];

gulp.task('concat', function () {
    return gulp.src(scripts)
        .pipe(concat('rtc-detect.js'))
        .pipe(iife({
            useStrict: true,
            trimCode: true,
            prependSemicolon: false,
            bindThis: false,
            params: ["window"],
            args: ["window"]
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function () {
    return gulp.src(scripts)
        .pipe(concat('rtc-detect.js'))
        .pipe(iife({
            useStrict: true,
            trimCode: true,
            prependSemicolon: false,
            bindThis: false,
            params: ["window"],
            args: ["window"]
        }))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['concat', 'compress']);